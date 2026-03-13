import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const PAGE_NAMES: Record<string, string> = {
  "/": "Главная",
  "/uslugi": "Услуги",
  "/katalog-kamnya": "Каталог камня",
  "/portfolio": "Портфолио",
  "/o-kompanii": "О компании",
  "/kontakty": "Контакты",
};

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ===== SMTP TRANSPORT =====
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.yandex.ru",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ===== RATE LIMITING =====
const requestLog = new Map<string, number[]>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = requestLog.get(ip) || [];
  const recentRequests = requests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return false;
}

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }

  return "unknown";
}

export async function POST(req: NextRequest) {
  const clientIP = getClientIP(req);
  if (checkRateLimit(clientIP)) {
    console.warn(`[lead] Rate limit exceeded for IP: ${clientIP}`);
    return NextResponse.json(
      { error: "Слишком много запросов. Пожалуйста, попробуйте позже." },
      { status: 429 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[lead] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }

  let body: {
    name?: string;
    phone?: string;
    comment?: string;
    page?: string;
    website?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, comment, page, website } = body;

  if (website) {
    console.warn(`[lead] Honeypot triggered for IP: ${clientIP}`);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!name || !phone) {
    return NextResponse.json(
      { error: "name and phone are required" },
      { status: 400 },
    );
  }

  const pageName = PAGE_NAMES[page ?? ""] ?? page ?? "—";

  // === Telegram ===
  const tgLines = [
    "📋 <b>Новая заявка с сайта</b>",
    "",
    `👔 Имя: ${esc(name)}`,
    `📞 Телефон: ${esc(phone)}`,
  ];
  if (comment?.trim()) {
    tgLines.push(`💬 Комментарий: ${esc(comment.trim())}`);
  }
  tgLines.push(`📄 Страница: ${esc(pageName)}`);

  const telegramPromise = fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: tgLines.join("\n"),
        parse_mode: "HTML",
      }),
    },
  );

  // === Email ===
  const commentRow = comment?.trim()
    ? `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;">Комментарий</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(comment.trim())}</td></tr>`
    : "";

  const emailHtml = `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;color:#333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:20px auto;">
    <tr>
      <td style="padding:20px 24px;background:#2c2c2c;color:#fff;font-size:18px;font-weight:bold;border-radius:8px 8px 0 0;">
        Новая заявка с сайта Камвек
      </td>
    </tr>
    <tr>
      <td style="padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-top:none;">
          <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;">Имя</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(name)}</td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;">Телефон</td><td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="tel:${esc(phone)}" style="color:#1a73e8;text-decoration:none;">${esc(phone)}</a></td></tr>
          ${commentRow}
          <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;">Страница</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(pageName)}</td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 24px;background:#f9f9f9;color:#999;font-size:12px;border-radius:0 0 8px 8px;border:1px solid #eee;border-top:none;">
        Отправлено автоматически с сайта kamen-veka.ru
      </td>
    </tr>
  </table>
</body>
</html>`;

  const plainLines = [
    `Новая заявка с сайта Камвек`,
    ``,
    `Имя: ${name}`,
    `Телефон: ${phone}`,
  ];
  if (comment?.trim()) plainLines.push(`Комментарий: ${comment.trim()}`);
  plainLines.push(`Страница: ${pageName}`);

  const smtpUser = process.env.SMTP_USER;
  const emailTo = process.env.LEAD_EMAIL_TO;

  const emailPromise =
    smtpUser && emailTo
      ? transporter.sendMail({
          from: { name: "Камвек", address: smtpUser },
          to: emailTo,
          replyTo: smtpUser,
          subject: `Заявка: ${name}, ${phone}`,
          text: plainLines.join("\n"),
          html: emailHtml,
          headers: {
            "X-Mailer": "Kamvek Website",
            "List-Unsubscribe": `<mailto:${smtpUser}?subject=unsubscribe>`,
          },
        })
      : Promise.resolve(null);

  // Отправляем параллельно — сбой одного канала не блокирует другой
  const [tgResult, emailResult] = await Promise.allSettled([
    telegramPromise,
    emailPromise,
  ]);

  if (tgResult.status === "rejected") {
    console.error("[lead] Telegram send failed:", tgResult.reason);
  } else {
    const tgRes = tgResult.value;
    if (!tgRes.ok) {
      console.error("[lead] Telegram API error:", await tgRes.text());
    }
  }

  if (emailResult.status === "rejected") {
    console.error("[lead] Email send failed:", emailResult.reason);
  } else if (emailResult.value === null) {
    console.warn("[lead] Email skipped: SMTP_USER or LEAD_EMAIL_TO not set");
  }

  const tgOk =
    tgResult.status === "fulfilled" && tgResult.value.ok;
  const emailOk =
    emailResult.status === "fulfilled" && emailResult.value !== null;

  if (!tgOk && !emailOk) {
    return NextResponse.json(
      { error: "Failed to deliver lead" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
