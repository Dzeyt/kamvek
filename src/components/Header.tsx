"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useCallRequestModal } from "@/components/CallRequestModalContext";

type NavItem = {
  href: string;
  label: string;
};

const NAV: NavItem[] = [
  { href: "/", label: "Главная" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/katalog-kamnya", label: "Каталог камня" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const { open } = useCallRequestModal();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeHref = useMemo(() => {
    // simple active matching: exact for "/", prefix for others
    if (pathname === "/") return "/";
    const found = NAV.find((x) => x.href !== "/" && pathname?.startsWith(x.href));
    return found?.href ?? null;
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-marble-vein">
      <div className="container h-[var(--header-height)] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-[72px] h-[72px] relative overflow-hidden">
            <Image
              src="/logo/logo-primary.jpg"
              alt="КАМВЕК"
              fill
              sizes="72px"
              className="object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <div
              className="text-xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              КАМВЕК
            </div>
            <div className="text-xs text-foreground-muted -mt-0.5">
              Мрамор • Гранит • Кварцит • Оникс
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map((item) => {
            const isActive = item.href === activeHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-foreground-muted"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={open}
            className="hidden sm:inline-flex px-5 py-3 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover transition-colors"
          >
            Заказать звонок
          </button>

          {/* Mobile burger */}
          <button
            className="lg:hidden w-11 h-11 rounded-md border border-marble-vein hover:border-accent transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen ? (
        <div className="lg:hidden border-t border-marble-vein bg-background">
          <div className="container py-4 flex flex-col gap-2">
            {NAV.map((item) => {
              const isActive = item.href === activeHref;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "px-3 py-3 rounded-md transition-colors",
                    isActive
                      ? "bg-marble-light text-foreground"
                      : "text-foreground-muted hover:bg-marble-light hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={open}
              className="mt-2 px-5 py-4 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover transition-colors"
            >
              Заказать звонок
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

