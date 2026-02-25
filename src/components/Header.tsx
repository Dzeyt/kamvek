"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [mobileOpen]);

  return (
    <>
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
                Натуральный камень
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden header:flex items-center gap-6">
            {NAV.map((item) => {
              const isActive = item.href === activeHref;
              if (isActive) {
                return (
                  <span
                    key={item.href}
                    className="relative text-sm text-foreground cursor-default whitespace-nowrap after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-accent"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-foreground-muted hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden header:flex items-center gap-3">
              <button
                onClick={open}
                className="px-5 py-3 rounded-md transition-colors bg-accent text-foreground-on-dark hover:bg-accent-hover"
              >
                Заказать звонок
              </button>
            </div>

          {/* Mobile burger */}
          <button
            className="header:hidden relative w-9 h-9 flex items-center justify-center"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
          >
            <span
              className={clsx(
                "absolute block h-[1.5px] w-5 bg-foreground transition-all duration-300 origin-center",
                mobileOpen ? "rotate-45" : "-translate-y-[7px]"
              )}
            />
            <span
              className={clsx(
                "absolute block h-[1.5px] bg-foreground transition-all duration-300 origin-center",
                mobileOpen ? "w-0 opacity-0" : "w-5 opacity-100"
              )}
            />
            <span
              className={clsx(
                "absolute block h-[1.5px] w-5 bg-foreground transition-all duration-300 origin-center",
                mobileOpen ? "-rotate-45" : "translate-y-[7px]"
              )}
            />
          </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="header:hidden">
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 top-[var(--header-height)] bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-[var(--header-height)] right-0 bottom-0 w-full max-w-full min-[440px]:max-w-sm bg-background-dark text-foreground-on-dark z-50 flex flex-col shadow-[var(--shadow-lg)] border-l border-marble-vein/40"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.32, 0, 0.67, 0] }}
            >
              <nav className="flex-1 overflow-y-auto px-6 pt-8 pb-4 flex flex-col gap-1">
                {NAV.map((item, i) => {
                  const isActive = item.href === activeHref;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                    >
                      {isActive ? (
                        <span
                          className="block px-3 py-3.5 text-lg font-medium text-foreground-on-dark border-b border-marble-vein/30 cursor-default"
                          style={{ fontFamily: "var(--font-heading)" }}
                          aria-current="page"
                        >
                          {item.label}
                        </span>
                      ) : (
                        <Link
                          href={item.href}
                          className="block px-3 py-3.5 text-lg text-foreground-on-dark/60 hover:text-foreground-on-dark border-b border-marble-vein/20 transition-colors"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              <div className="px-6 py-6 border-t border-marble-vein/30">
                <button
                  onClick={() => { open(); setMobileOpen(false); }}
                  className="w-full px-5 py-4 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover transition-colors font-medium"
                >
                  Заказать звонок
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

