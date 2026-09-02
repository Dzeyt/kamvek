#!/usr/bin/env node
/**
 * Отчёт из Яндекс Метрики в терминал — без захода в интерфейс.
 *
 *   npm run metrika            # за последние 30 дней
 *   npm run metrika -- 7       # за последние 7 дней
 *
 * Нужен METRIKA_OAUTH_TOKEN в .env.local (см. .env.example).
 */

import { fetchRetry, loadEnv, preferIPv4, requireEnv } from "./lib/load-env.mjs";

const COUNTER_ID = 110069807;
const API = "https://api-metrika.yandex.net";

loadEnv();
preferIPv4();

const token = requireEnv(
  "METRIKA_OAUTH_TOKEN",
  "  1. Открой https://oauth.yandex.ru/ и создай приложение\n" +
    "     с правом «Получение статистики... » (metrika:read)\n" +
    "  2. Положи токен в .env.local:  METRIKA_OAUTH_TOKEN=...",
);

const days = Number(process.argv[2]) || 30;

async function api(path, params = {}) {
  const url = new URL(path, API);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetchRetry(url, {
    headers: { Authorization: `OAuth ${token}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${res.statusText}\n${body}`);
  }
  return res.json();
}

const num = (value) => Math.round(Number(value) || 0).toLocaleString("ru-RU");
const pct = (value) => `${(Number(value) || 0).toFixed(1)}%`;

const SOURCE_NAMES = {
  organic: "Поиск",
  direct: "Прямые заходы",
  referral: "Переходы по ссылкам",
  ad: "Реклама",
  social: "Соцсети",
  internal: "Внутренние переходы",
  recommend: "Рекомендательные системы",
  email: "Почтовые рассылки",
  saved: "Сохранённые страницы",
};

async function main() {
  const period = { date1: `${days}daysAgo`, date2: "today" };

  console.log(`\n  Яндекс Метрика · счётчик ${COUNTER_ID} · за ${days} дн.\n`);

  // ── Посещаемость ───────────────────────────────────────────────────
  const summary = await api("/stat/v1/data", {
    ids: COUNTER_ID,
    metrics: "ym:s:visits,ym:s:users,ym:s:pageviews,ym:s:bounceRate",
    ...period,
  });

  const [visits, users, pageviews, bounce] = summary.totals;

  console.log("  ПОСЕЩАЕМОСТЬ");
  console.log(`    Визиты            ${num(visits)}`);
  console.log(`    Посетители        ${num(users)}`);
  console.log(`    Просмотры страниц ${num(pageviews)}`);
  console.log(`    Отказы            ${pct(bounce)}`);

  // ── Заявки ─────────────────────────────────────────────────────────
  const { goals = [] } = await api(
    `/management/v1/counter/${COUNTER_ID}/goals`,
  );

  if (goals.length === 0) {
    console.log("\n  ЗАЯВКИ\n    Цели в Метрике не настроены.");
  } else {
    const metrics = goals.map((g) => `ym:s:goal${g.id}reaches`).join(",");
    const conversions = await api("/stat/v1/data", {
      ids: COUNTER_ID,
      metrics,
      ...period,
    });

    const width = Math.max(...goals.map((g) => g.name.length));

    console.log("\n  ЗАЯВКИ");
    goals.forEach((goal, i) => {
      const reaches = Number(conversions.totals[i]) || 0;
      const rate = Number(visits) > 0 ? (reaches / Number(visits)) * 100 : 0;
      console.log(
        `    ${goal.name.padEnd(width)} ${String(num(reaches)).padStart(6)}` +
          `   (конверсия ${pct(rate)})`,
      );
    });
  }

  // ── Источники ──────────────────────────────────────────────────────
  const sources = await api("/stat/v1/data", {
    ids: COUNTER_ID,
    metrics: "ym:s:visits",
    dimensions: "ym:s:lastTrafficSource",
    sort: "-ym:s:visits",
    limit: 10,
    ...period,
  });

  console.log("\n  ИСТОЧНИКИ ТРАФИКА");
  if (sources.data.length === 0) {
    console.log("    Данных пока нет.");
  } else {
    for (const row of sources.data) {
      const source = row.dimensions[0];
      // В id лежит машинный код (organic, direct...), в name — английское название
      const label = SOURCE_NAMES[source.id] ?? source.name ?? "Не определён";
      console.log(`    ${label.padEnd(28)} ${String(num(row.metrics[0])).padStart(5)}`);
    }
  }

  // ── Популярные страницы ────────────────────────────────────────────
  const pages = await api("/stat/v1/data", {
    ids: COUNTER_ID,
    metrics: "ym:pv:pageviews",
    dimensions: "ym:pv:URLPath",
    sort: "-ym:pv:pageviews",
    limit: 10,
    ...period,
  });

  console.log("\n  ПОПУЛЯРНЫЕ СТРАНИЦЫ");
  if (pages.data.length === 0) {
    console.log("    Данных пока нет.");
  } else {
    for (const row of pages.data) {
      const path = row.dimensions[0].name || "/";
      console.log(`    ${path.padEnd(28)} ${String(num(row.metrics[0])).padStart(5)}`);
    }
  }

  console.log("");
}

main().catch((err) => {
  console.error(`\n  Ошибка обращения к API Метрики:\n  ${err.message}\n`);
  process.exit(1);
});
