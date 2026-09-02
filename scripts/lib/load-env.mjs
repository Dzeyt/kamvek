import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { setDefaultResultOrder } from "node:dns";

/**
 * По умолчанию Node ходит сначала по IPv6. На российских сетях он часто
 * не работает, и запрос падает с ECONNRESET ещё до установки TLS —
 * например, к api.webmaster.yandex.net. Принудительно ставим IPv4 первым.
 */
export function preferIPv4() {
  setDefaultResultOrder("ipv4first");
}

/**
 * Соединение с API Яндекса нередко обрывается на первой попытке
 * (ECONNRESET до установки TLS). Повторяем несколько раз с паузой.
 * Повтор только на сетевых сбоях — ответ сервера возвращаем как есть.
 */
export async function fetchRetry(url, options, attempts = 10) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fetch(url, options);
    } catch (err) {
      lastError = err;
      if (attempt < attempts) {
        const pause = Math.min(attempt * 400, 2000);
        await new Promise((done) => setTimeout(done, pause));
      }
    }
  }

  throw new Error(
    `соединение не установлено после ${attempts} попыток ` +
      `(${lastError?.cause?.code ?? lastError?.message})`,
  );
}

/**
 * Читает .env.local и .env без внешних зависимостей.
 * Уже заданные переменные окружения не перезаписывает.
 */
export function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    let raw;
    try {
      raw = readFileSync(resolve(process.cwd(), file), "utf8");
    } catch {
      continue; // файла нет — не страшно
    }

    for (const line of raw.split("\n")) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (!match) continue;
      const key = match[1];
      if (process.env[key]) continue;
      process.env[key] = (match[2] ?? "").replace(/^["']|["']$/g, "").trim();
    }
  }
}

/**
 * Возвращает значение переменной либо завершает процесс с подсказкой.
 */
export function requireEnv(name, hint) {
  const value = process.env[name];
  if (!value) {
    console.error(`\n  Не задана переменная ${name}.\n\n${hint}\n`);
    process.exit(1);
  }
  return value;
}
