"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";
import { useCallRequestModal } from "@/components/CallRequestModalContext";

export function PortfolioPageClient() {
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
      <section className="relative overflow-hidden bg-background-dark py-24 md:py-36">
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
              Портфолио
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground-on-dark/70 leading-relaxed">
              Реальные фото наших работ — более 500 реализованных проектов.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ГАЛЕРЕЯ ── */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <PortfolioGallery items={PORTFOLIO_ITEMS} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20 bg-marble-light/30">
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto rounded-2xl border border-marble-vein/30 bg-background-dark text-foreground-on-dark px-6 py-10 md:px-12 md:py-14 shadow-[var(--shadow-lg)] text-center"
            {...reveal}
          >
            <h2
              className="text-2xl md:text-3xl font-semibold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Хотите такой же результат?
            </h2>
            <p className="text-foreground-on-dark/65 mb-8 leading-relaxed max-w-md mx-auto">
              Обсудим ваш проект, подберём камень и рассчитаем стоимость. Бесплатная консультация.
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
