#!/usr/bin/env node
/**
 * Отчёт из Яндекс Вебмастера в терминал — без захода в интерфейс.
 *
 *   npm run webmaster         # за последние 30 дней
 *   npm run webmaster -- 7    # за последние 7 дней
 *
 * Нужен METRIKA_OAUTH_TOKEN с правом webmaster:hostinfo (см. .env.example).
 */

import { fetchRetry, loadEnv, preferIPv4, requireEnv } from "./lib/load-env.mjs";

const SITE = "kamen-veka.ru";
const API = "https://api.webmaster.yandex.net/v4";

loadEnv();
preferIPv4();

const token = requireEnv(
  "METRIKA_OAUTH_TOKEN",
  "  Токен: https://oauth.yandex.ru/ — приложению нужно право\n" +
    "  webmaster:hostinfo («Получение информации о сайтах пользователя»).\n" +
    "  Положи токен в .env.local:  METRIKA_OAUTH_TOKEN=...",
);

const days = Number(process.argv[2]) || 30;

async function api(path, params = {}) {
  const url = new URL(API + path);
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) url.searchParams.append(key, item);
    } else {
      url.searchParams.set(key, value);
    }
  }

  const res = await fetchRetry(url, {
    headers: { Authorization: `OAuth ${token}` },
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} — ${await res.text()}`);
  }
  return res.json();
}

/** Секция отчёта не должна ронять весь отчёт. */
async function section(title, fn) {
  console.log(`\n  ${title}`);
  try {
    await fn();
  } catch (err) {
    console.log(`    Не удалось получить данные: ${err.message}`);
  }
}

const num = (value) => Math.round(Number(value) || 0).toLocaleString("ru-RU");
const isoDate = (date) => date.toISOString().slice(0, 10);

const SEVERITY = {
  FATAL: "Фатальная",
  CRITICAL: "Критичная",
  POSSIBLE_PROBLEM: "Возможная",
  RECOMMENDATION: "Рекомендация",
};

async function main() {
  const { user_id: userId } = await api("/user/");
  const { hosts } = await api(`/user/${userId}/hosts/`);

  const host =
    hosts.find((h) => h.unicode_host_url?.includes(SITE)) ??
    hosts.find((h) => h.host_id?.includes(SITE));

  if (!host) {
    console.error(
      `\n  Сайт ${SITE} не найден в Вебмастере под этим аккаунтом.\n` +
        `  Доступные: ${hosts.map((h) => h.unicode_host_url).join(", ") || "нет"}\n`,
    );
    process.exit(1);
  }

  const hostId = host.host_id;
  const base = `/user/${userId}/hosts/${encodeURIComponent(hostId)}`;

  console.log(`\n  Яндекс Вебмастер · ${SITE} · за ${days} дн.`);

  await section("ИНДЕКСАЦИЯ", async () => {
    const summary = await api(`${base}/summary/`);
    console.log(`    Страниц в поиске     ${num(summary.searchable_pages_count)}`);
    console.log(`    Исключено страниц    ${num(summary.excluded_pages_count)}`);
    console.log(`    Индекс качества ИКС  ${num(summary.sqi)}`);
  });

  await section("ФАЙЛЫ SITEMAP", async () => {
    const { sitemaps = [] } = await api(`${base}/sitemaps/`);
    if (sitemaps.length === 0) {
      console.log("    Обработанных файлов пока нет.");
      return;
    }
    for (const item of sitemaps) {
      console.log(`    ${item.sitemap_url}`);
      console.log(
        `      Ссылок ${num(item.urls_count)}` +
          `   ошибок ${num(item.errors_count)}` +
          `   обход ${item.last_access_date?.slice(0, 10) ?? "—"}`,
      );
    }
  });

  await section("ДИАГНОСТИКА", async () => {
    // API отдаёт объект { НАЗВАНИЕ_ПРОБЛЕМЫ: { severity, state, ... } }
    const { problems = {} } = await api(`${base}/diagnostics/`);
    const active = Object.entries(problems).filter(
      ([, p]) => p.state === "PRESENT",
    );

    if (active.length === 0) {
      console.log("    Активных проблем нет.");
      return;
    }
    for (const [type, problem] of active) {
      const level = SEVERITY[problem.severity] ?? problem.severity;
      console.log(`    [${level}] ${type}`);
    }
  });

  await section("ПОИСКОВЫЕ ЗАПРОСЫ", async () => {
    const to = new Date();
    const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);

    const { queries = [] } = await api(`${base}/search-queries/popular/`, {
      order_by: "TOTAL_SHOWS",
      query_indicator: ["TOTAL_SHOWS", "TOTAL_CLICKS"],
      date_from: isoDate(from),
      date_to: isoDate(to),
      limit: 15,
    });

    if (queries.length === 0) {
      console.log("    Данных пока нет — сайт ещё не набрал показов.");
      return;
    }

    console.log(`    ${"Запрос".padEnd(40)} Показы  Клики`);
    for (const item of queries) {
      const text = (item.query_text ?? "").slice(0, 39).padEnd(40);
      const shows = String(num(item.indicators?.TOTAL_SHOWS)).padStart(6);
      const clicks = String(num(item.indicators?.TOTAL_CLICKS)).padStart(6);
      console.log(`    ${text}${shows}${clicks}`);
    }
  });

  console.log("");
}

main().catch((err) => {
  console.error(`\n  Ошибка обращения к API Вебмастера:\n  ${err.message}\n`);
  process.exit(1);
});
