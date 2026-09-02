#!/usr/bin/env node
/**
 * Управление деплоем в Coolify из терминала.
 *
 *   npm run coolify -- apps           список приложений и их UUID
 *   npm run coolify -- status         состояние текущего приложения
 *   npm run coolify -- env            переменные окружения (значения скрыты)
 *   npm run coolify -- env --show     то же, но со значениями
 *   npm run coolify -- logs           последние 100 строк лога
 *   npm run coolify -- logs 300       последние 300 строк
 *   npm run coolify -- deploy         запустить деплой
 *
 * Нужны COOLIFY_URL, COOLIFY_TOKEN и COOLIFY_APP_UUID в .env.local.
 */

import { fetchRetry, loadEnv, preferIPv4 } from "./lib/load-env.mjs";

loadEnv();
preferIPv4();

const baseUrl = (process.env.COOLIFY_URL || "").replace(/\/+$/, "");
const token = process.env.COOLIFY_TOKEN;
const appUuid = process.env.COOLIFY_APP_UUID;

if (!baseUrl || !token) {
  console.error(
    "\n  Не заданы COOLIFY_URL и/или COOLIFY_TOKEN.\n\n" +
      "  Токен: панель Coolify → Keys & Tokens → API tokens.\n" +
      "  Положи оба значения в .env.local (см. .env.example).\n",
  );
  process.exit(1);
}

async function api(path, { raw = false } = {}) {
  const res = await fetchRetry(`${baseUrl}/api/v1${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}\n${body}`);
  }

  if (raw) return body;
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}

function requireUuid() {
  if (!appUuid) {
    console.error(
      "\n  Не задан COOLIFY_APP_UUID.\n" +
        "  Узнать его:  npm run coolify -- apps\n",
    );
    process.exit(1);
  }
  return appUuid;
}

function mask(value) {
  if (!value) return "—";
  if (value.length <= 8) return "•".repeat(value.length);
  return `${value.slice(0, 3)}${"•".repeat(8)}${value.slice(-3)}`;
}

const commands = {
  async apps() {
    const apps = await api("/applications");
    const list = Array.isArray(apps) ? apps : [apps];

    console.log("\n  ПРИЛОЖЕНИЯ\n");
    for (const app of list) {
      console.log(`    ${app.name ?? "без имени"}`);
      console.log(`      UUID    ${app.uuid}`);
      console.log(`      Статус  ${app.status ?? "неизвестен"}`);
      if (app.fqdn) console.log(`      Адрес   ${app.fqdn}`);
      console.log("");
    }
    console.log("  Нужный UUID пропиши в .env.local как COOLIFY_APP_UUID.\n");
  },

  async status() {
    const app = await api(`/applications/${requireUuid()}`);
    console.log("\n  СОСТОЯНИЕ ПРИЛОЖЕНИЯ\n");
    console.log(`    Имя      ${app.name ?? "—"}`);
    console.log(`    Статус   ${app.status ?? "—"}`);
    console.log(`    Адрес    ${app.fqdn ?? "—"}`);
    console.log(`    Ветка    ${app.git_branch ?? "—"}`);
    console.log(`    Коммит   ${app.git_commit_sha ?? "—"}\n`);
  },

  async env() {
    const show = process.argv.includes("--show");
    const vars = await api(`/applications/${requireUuid()}/envs`);
    const list = Array.isArray(vars) ? vars : [vars];

    console.log(
      `\n  ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ${show ? "" : "  (значения скрыты, добавь --show)"}\n`,
    );

    for (const isPreview of [false, true]) {
      const group = list.filter((item) => Boolean(item.is_preview) === isPreview);
      if (group.length === 0) continue;

      console.log(`    ── ${isPreview ? "preview" : "production"} ──`);

      // Предупреждаем, если одно и то же имя различается между окружениями —
      // например, заявки с preview могут молча уходить на другую почту.
      for (const item of group) {
        const value = item.value ?? item.real_value ?? "";
        console.log(`    ${String(item.key).padEnd(24)} ${show ? value : mask(value)}`);
      }
      console.log("");
    }

    const byKey = new Map();
    for (const item of list) {
      const arr = byKey.get(item.key) ?? [];
      arr.push(item.value ?? item.real_value ?? "");
      byKey.set(item.key, arr);
    }
    const mismatched = [...byKey.entries()].filter(
      ([, values]) => new Set(values).size > 1,
    );
    if (mismatched.length > 0) {
      console.log("    ⚠ Отличаются между production и preview:");
      for (const [key] of mismatched) console.log(`      ${key}`);
      console.log("");
    }
  },

  async logs() {
    const lines = Number(process.argv[3]) || 100;
    const output = await api(
      `/applications/${requireUuid()}/logs?lines=${lines}`,
      { raw: true },
    );

    console.log(`\n  ЛОГИ · последние ${lines} строк\n`);
    try {
      const parsed = JSON.parse(output);
      console.log(parsed.logs ?? output);
    } catch {
      console.log(output);
    }
    console.log("");
  },

  async deploy() {
    const uuid = requireUuid();
    const result = await api(`/deploy?uuid=${uuid}`);
    console.log("\n  Деплой запущен.");
    if (result?.deployments?.[0]?.deployment_uuid) {
      console.log(`  ID: ${result.deployments[0].deployment_uuid}`);
    }
    console.log("  Следить за ходом:  npm run coolify -- logs\n");
  },
};

const command = process.argv[2];
const handler = commands[command];

if (!handler) {
  console.log(
    "\n  Доступные команды:\n\n" +
      "    apps      список приложений и их UUID\n" +
      "    status    состояние текущего приложения\n" +
      "    env       переменные окружения (--show чтобы раскрыть)\n" +
      "    logs [N]  последние N строк лога, по умолчанию 100\n" +
      "    deploy    запустить деплой\n\n" +
      "  Пример:  npm run coolify -- logs 300\n",
  );
  process.exit(command ? 1 : 0);
}

handler().catch((err) => {
  console.error(`\n  Ошибка обращения к API Coolify:\n  ${err.message}\n`);
  process.exit(1);
});
