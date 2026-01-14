"use client";

import Link from "next/link";
import { useCallRequestModal } from "@/components/CallRequestModalContext";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/katalog-kamnya", label: "Каталог камня" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
];

export function Footer() {
  const { open } = useCallRequestModal();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background-dark text-foreground-on-dark border-t border-marble-vein mt-16">
      <div className="container py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-md bg-background text-foreground flex items-center justify-center font-bold">
              K
            </div>
            <div className="leading-tight">
              <div
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                КАМВЕК
              </div>
              <div className="text-xs text-foreground-on-dark/70">
                Мрамор • Гранит • Кварцит • Оникс
              </div>
            </div>
          </div>
          <p className="text-sm text-foreground-on-dark/70">
            Собственное производство с 2007 года. Полный цикл: от замера до монтажа.
          </p>
          <button
            onClick={open}
            className="px-5 py-3 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover transition-colors"
          >
            Заказать звонок
          </button>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Навигация
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground-on-dark/80 hover:text-foreground-on-dark transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contacts (заглушки) */}
        <div>
          <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Контакты
          </h3>
          <div className="text-sm text-foreground-on-dark/80 space-y-2">
            <p>Телефон: будет подключено позже</p>
            <p>Email: будет подключено позже</p>
            <p>Адрес: Воскресенск, МО (уточним позже)</p>
            <p>Telegram / WhatsApp — кнопки снизу</p>
          </div>
        </div>

        {/* CTA / schedule */}
        <div>
          <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Свяжитесь с нами
          </h3>
          <p className="text-sm text-foreground-on-dark/80">
            Работаем с частными заказчиками, дизайнерами, архитекторами и строительными
            компаниями.
          </p>
          <button
            onClick={open}
            className="mt-4 px-5 py-3 rounded-md border border-accent text-foreground-on-dark hover:bg-accent hover:text-foreground-on-dark transition-colors"
          >
            Оставить заявку
          </button>
        </div>
      </div>

      <div className="border-t border-marble-vein/50">
        <div className="container py-4 text-xs text-foreground-on-dark/60 flex flex-wrap gap-4 justify-between">
          <div>© {year} КАМВЕК. Все права защищены.</div>
          <div>Сайт в разработке: контакты и отправка форм будут подключены позже.</div>
        </div>
      </div>
    </footer>
  );
}

