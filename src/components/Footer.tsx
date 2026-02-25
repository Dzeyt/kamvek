"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallRequestModal } from "@/components/CallRequestModalContext";
import { CONTACTS } from "@/data/contacts";

const TelegramIcon = (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50Zm21.977-68.056c.386-4.38-4.24-2.576-4.24-2.576-3.415 1.414-6.937 2.85-10.497 4.302-11.04 4.503-22.444 9.155-32.159 13.734-5.268 1.932-2.184 3.864-2.184 3.864l8.351 2.577c3.855 1.16 5.91-.129 5.91-.129l17.988-12.238c6.424-4.38 4.882-.773 3.34.773l-13.49 12.882c-2.056 1.804-1.028 3.35-.129 4.123 2.55 2.249 8.82 6.364 11.557 8.16.712.467 1.185.778 1.292.858.642.515 4.111 2.834 6.424 2.319 2.313-.516 2.57-3.479 2.57-3.479l3.083-20.226c.462-3.511.993-6.886 1.417-9.582.4-2.546.705-4.485.767-5.362Z"
      fill="#1A1614"
    />
  </svg>
);

const MaxIcon = (
  <svg className="w-full h-full" viewBox="0 0 1000 1000" aria-hidden="true">
    <rect width="1000" height="1000" fill="#1A1614" ry="249.681" />
    <g transform="translate(500 500) scale(0.75) translate(-500 -500)">
      <path fill="#fff" fillRule="evenodd" clipRule="evenodd" d="M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.785 0 375.947 171.001 375.947 381.604.707 207.346-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574Z" />
    </g>
  </svg>
);

const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/katalog-kamnya", label: "Каталог камня" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
];

export function Footer() {
  const { open } = useCallRequestModal();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <footer className="bg-background-dark text-foreground-on-dark border-t border-marble-vein">
      <div className="container !px-6 min-[720px]:!px-8 py-12 md:py-16 grid grid-cols-1 min-[680px]:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Колонка 1: Бренд */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-14 h-14 relative overflow-hidden rounded-md bg-surface-dark/40 shrink-0">
              <Image
                src="/logo/logo-primary.jpg"
                alt="КАМВЕК"
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <div className="leading-tight">
              <div
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                КАМВЕК
              </div>
              <div className="text-xs text-foreground-on-dark/70">
                Натуральный камень
              </div>
            </div>
          </Link>
          <p className="text-sm text-foreground-on-dark/70 leading-relaxed">
            Собственное производство с 2007 года.<br />
            Полный цикл: от замера до монтажа.
          </p>
          <button
            onClick={open}
            className="px-5 py-3 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover transition-colors"
          >
            Заказать звонок
          </button>
        </div>

        {/* Колонка 2: Навигация */}
        <div className="hidden lg:block">
          <h3 className="text-sm font-medium uppercase tracking-wider text-foreground-on-dark/50 mb-4">
            Разделы
          </h3>
          <nav className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              if (active) {
                return (
                  <span
                    key={link.href}
                    className="text-sm text-foreground-on-dark cursor-default w-fit"
                    aria-current="page"
                  >
                    {link.label}
                  </span>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground-on-dark/50 hover:text-foreground-on-dark transition-colors w-fit"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Колонка 3: Контакты */}
        <div className="min-[680px]:justify-self-end lg:justify-self-auto">
          <h3 className="text-sm font-medium uppercase tracking-wider text-foreground-on-dark/50 mb-4">
            Контакты
          </h3>
          <div className="text-sm text-foreground-on-dark/80 space-y-2.5">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 shrink-0 mt-0.5 text-foreground-on-dark/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{CONTACTS.address.line}</span>
            </div>
            <a
              href={CONTACTS.phone.href}
              className="flex items-center gap-2 text-foreground-on-dark/90 hover:text-accent transition-colors w-fit"
            >
              <svg className="w-4 h-4 shrink-0 text-foreground-on-dark/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.82.37 1.6.72 2.33a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.73-1.28a2 2 0 0 1 2.11-.45c.73.35 1.51.6 2.33.72A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{CONTACTS.phone.display}</span>
            </a>
            <a
              href={CONTACTS.email.href}
              className="flex items-center gap-2 text-foreground-on-dark/90 hover:text-accent transition-colors w-fit"
            >
              <svg className="w-4 h-4 shrink-0 text-foreground-on-dark/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{CONTACTS.email.display}</span>
            </a>
            <div className="flex items-center gap-2 text-foreground-on-dark/75">
              <svg className="w-4 h-4 shrink-0 text-foreground-on-dark/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{CONTACTS.workingHours}</span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              {CONTACTS.messengers.map((m) => (
                <a
                  key={m.name}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full overflow-hidden bg-white border border-marble-vein/70 hover:opacity-80 transition-opacity"
                  aria-label={m.label}
                >
                  {m.name === "Telegram" ? TelegramIcon : MaxIcon}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-marble-vein/50">
        <div className="container py-4 text-xs text-foreground-on-dark/50 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>© {year} КАМВЕК. Все права защищены.</span>
          <Link
            href="/politika-konfidencialnosti"
            className="hover:text-foreground-on-dark/80 transition-colors"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
