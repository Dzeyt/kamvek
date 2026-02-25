"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useCallRequestModal } from "@/components/CallRequestModalContext";
import { CONTACTS } from "@/data/contacts";

const PhoneIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.82.37 1.6.72 2.33a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.73-1.28a2 2 0 0 1 2.11-.45c.73.35 1.51.6 2.33.72A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TelegramIcon = (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50Zm21.977-68.056c.386-4.38-4.24-2.576-4.24-2.576-3.415 1.414-6.937 2.85-10.497 4.302-11.04 4.503-22.444 9.155-32.159 13.734-5.268 1.932-2.184 3.864-2.184 3.864l8.351 2.577c3.855 1.16 5.91-.129 5.91-.129l17.988-12.238c6.424-4.38 4.882-.773 3.34.773l-13.49 12.882c-2.056 1.804-1.028 3.35-.129 4.123 2.55 2.249 8.82 6.364 11.557 8.16.712.467 1.185.778 1.292.858.642.515 4.111 2.834 6.424 2.319 2.313-.516 2.57-3.479 2.57-3.479l3.083-20.226c.462-3.511.993-6.886 1.417-9.582.4-2.546.705-4.485.767-5.362Z"
      fill="currentColor"
    />
  </svg>
);

const MaxIcon = (
  <svg className="w-full h-full" viewBox="0 0 1000 1000" aria-hidden="true">
    <rect width="1000" height="1000" fill="currentColor" ry="249.681" />
    <g transform="translate(500 500) scale(0.75) translate(-500 -500)">
      <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.785 0 375.947 171.001 375.947 381.604.707 207.346-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574Z" />
    </g>
  </svg>
);

const MESSENGER_ICONS: Record<string, React.ReactNode> = {
  Telegram: TelegramIcon,
  MAX: MaxIcon,
};

export function ContactsPageClient() {
  const { open } = useCallRequestModal();
  const shouldReduceMotion = useReducedMotion();

  const reveal = shouldReduceMotion
    ? {}
    : {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.1 },
      transition: { duration: 0.5 },
    };

  return (
    <main className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-background-dark py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_0%,rgba(201,169,98,0.22),transparent_55%),radial-gradient(700px_circle_at_85%_80%,rgba(92,74,61,0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-10 bg-marble" />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/10 via-background-dark/50 to-background-dark/80" />

        <div className="container relative z-10">
          <motion.div
            {...(shouldReduceMotion
              ? {}
              : {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.65 },
              })}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground-on-dark leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Контакты
            </h1>
            <p className="mt-5 text-lg md:text-xl text-foreground-on-dark/70 leading-relaxed">
              Свяжитесь с нами любым удобным способом.<br className="hidden sm:block" /> Ответим в течение рабочего дня.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ОСНОВНОЙ БЛОК ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

            {/* Левая колонка — контакты */}
            <motion.div className="space-y-4" {...reveal}>
              <a
                href={`https://yandex.ru/maps/?text=${encodeURIComponent(CONTACTS.address.line)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 rounded-xl border border-marble-vein/60 bg-surface p-5 transition-all hover:border-gold/50 hover:shadow-[var(--shadow-md)]"
              >
                <span className="mt-0.5 text-gold group-hover:text-accent transition-colors"><MapPinIcon /></span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-1">Адрес</p>
                  <p className="text-foreground font-medium leading-snug">{CONTACTS.address.line}</p>
                  <span className="mt-1.5 inline-block text-sm text-accent border-b border-accent/40 group-hover:border-accent transition-colors">
                    Открыть на карте →
                  </span>
                </div>
              </a>

              <a
                href={CONTACTS.phone.href}
                className="group flex gap-4 rounded-xl border border-marble-vein/60 bg-surface p-5 transition-all hover:border-gold/50 hover:shadow-[var(--shadow-md)]"
              >
                <span className="mt-0.5 text-gold group-hover:text-accent transition-colors"><PhoneIcon /></span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-1">Телефон</p>
                  <p className="text-foreground font-medium text-lg">{CONTACTS.phone.display}</p>
                </div>
              </a>

              <a
                href={CONTACTS.email.href}
                className="group flex gap-4 rounded-xl border border-marble-vein/60 bg-surface p-5 transition-all hover:border-gold/50 hover:shadow-[var(--shadow-md)]"
              >
                <span className="mt-0.5 text-gold group-hover:text-accent transition-colors"><EmailIcon /></span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-1">Email</p>
                  <p className="text-foreground font-medium break-all">{CONTACTS.email.display}</p>
                </div>
              </a>

              <div className="flex gap-4 rounded-xl border border-marble-vein/60 bg-surface p-5">
                <span className="mt-0.5 text-gold"><ClockIcon /></span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-1">Режим работы</p>
                  <p className="text-foreground font-medium">{CONTACTS.workingHours}</p>
                </div>
              </div>

              {/* Мессенджеры */}
              <div className="pt-2">
                <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-3">Мессенджеры</p>
                <div className="flex flex-wrap gap-3">
                  {CONTACTS.messengers.map((m) => (
                    <a
                      key={m.name}
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full overflow-hidden text-accent transition-all hover:opacity-80 hover:shadow-[var(--shadow-sm)]"
                      aria-label={m.label}
                    >
                      {MESSENGER_ICONS[m.name]}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Правая колонка — карта */}
            <motion.div {...reveal}>
              <div className="rounded-xl border border-marble-vein/60 overflow-hidden shadow-[var(--shadow-md)] bg-marble-light/30">
                <iframe
                  title="КАМВЕК на карте"
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A67e2d18674bf3b3e27cc5f9003c3cf390930906d9da9c00859c420c87bb651d8&source=constructor"
                  width="100%"
                  height="480"
                  frameBorder="0"
                  allowFullScreen
                  className="block w-full min-h-[360px] md:min-h-[480px]"
                />
              </div>
              <a
                href={`https://yandex.ru/maps/?text=${encodeURIComponent(CONTACTS.address.line)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-accent border-b border-accent/40 hover:border-accent transition-colors"
              >
                Открыть в Яндекс.Картах →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-24 bg-marble-light/30">
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto rounded-2xl border border-marble-vein/30 bg-background-dark text-foreground-on-dark px-6 py-10 md:px-12 md:py-14 shadow-[var(--shadow-lg)] text-center"
            {...reveal}
          >
            <h2
              className="text-2xl md:text-3xl font-semibold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Предпочитаете, чтобы мы перезвонили?
            </h2>
            <p className="text-foreground-on-dark/65 mb-8 leading-relaxed max-w-md mx-auto">
              Оставьте заявку — свяжемся в течение рабочего дня. Бесплатная консультация и расчёт стоимости.
            </p>
            <button
              onClick={open}
              className="px-10 py-4 bg-accent text-foreground-on-dark rounded-md hover:bg-accent-hover transition-colors font-medium text-lg max-[440px]:w-full"
            >
              Заказать звонок
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
