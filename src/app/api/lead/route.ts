import { NextRequest, NextResponse } from "next/server";

const PAGE_NAMES: Record<string, string> = {
  "/": "Главная",
  "/uslugi": "Услуги",
  "/katalog-kamnya": "Каталог камня",
  "/portfolio": "Портфолио",
  "/o-kompanii": "О компании",
  "/kontakty": "Контакты",
};

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ===== RATE LIMITING =====
// In-memory хранилище запросов: Map<IP, timestamp[]>
const requestLog = new Map<string, number[]>();

// Настройки rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 минута
const RATE_LIMIT_MAX_REQUESTS = 3; // максимум 3 запроса в минуту с одного IP

/**
 * Проверяет rate limit для IP-адреса
 * @returns true если лимит превышен, false если можно продолжать
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = requestLog.get(ip) || [];

  // Удаляем старые запросы (старше RATE_LIMIT_WINDOW)
  const recentRequests = requests.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW);

  // Проверяем лимит
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true; // лимит превышен
  }

  // Добавляем текущий запрос
  recentRequests.push(now);
  requestLog.set(ip, recentRequests);

  return false; // лимит не превышен
}

/**
 * Получает IP-адрес клиента из запроса
 */
function getClientIP(req: NextRequest): string {
  // Проверяем заголовки от прокси/CDN (Vercel, Cloudflare и т.д.)
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }

  // Fallback на "unknown" если не удалось определить IP
  return "unknown";
}
// ===== END RATE LIMITING =====

export async function POST(req: NextRequest) {
  // Rate limiting проверка
  const clientIP = getClientIP(req);
  if (checkRateLimit(clientIP)) {
    console.warn(`[lead] Rate limit exceeded for IP: ${clientIP}`);
    return NextResponse.json(
      { error: "Слишком много запросов. Пожалуйста, попробуйте позже." },
      { status: 429 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[lead] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  let body: { name?: string; phone?: string; comment?: string; page?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, comment, page, website } = body;

  // Honeypot check — если поле "website" заполнено, это бот
  if (website) {
    console.warn(`[lead] Honeypot triggered for IP: ${clientIP}`);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!name || !phone) {
    return NextResponse.json({ error: "name and phone are required" }, { status: 400 });
  }

  const pageName = PAGE_NAMES[page ?? ""] ?? page ?? "—";
  const lines = [
    "📋 <b>Новая заявка с сайта</b>",
    "",
    `👔 Имя: ${esc(name)}`,
    `📞 Телефон: ${esc(phone)}`,
  ];
  if (comment?.trim()) {
    lines.push(`💬 Комментарий: ${esc(comment.trim())}`);
  }
  lines.push(`📄 Страница: ${esc(pageName)}`);

  const text = lines.join("\n");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const tgRes = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });

  if (!tgRes.ok) {
    const err = await tgRes.text();
    console.error("[lead] Telegram API error:", err);
    return NextResponse.json({ error: "Telegram error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
