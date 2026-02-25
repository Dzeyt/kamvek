"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

import { useCallRequestModal } from "@/components/CallRequestModalContext";
import { SERVICES } from "@/data/services";

const PROCESS_STEPS = [
  {
    title: "Замер",
    description: "Выезжаем на объект, фиксируем геометрию и обсуждаем задачи проекта.",
  },
  {
    title: "Подбор",
    description: "Подбираем камень, фактуры и кромки, согласовываем эскиз и смету.",
  },
  {
    title: "Изготовление",
    description: "Производим изделия на собственном оборудовании с контролем качества.",
  },
  {
    title: "Монтаж",
    description: "Доставляем, устанавливаем и аккуратно сдаём объект заказчику.",
  },
];

export function UslugiPageClient() {
  const { open } = useCallRequestModal();
  const shouldReduceMotion = useReducedMotion();

  const services = useMemo(() => {
    return [...SERVICES].sort((a, b) => {
      if (a.priority === b.priority) return 0;
      return a.priority ? -1 : 1;
    });
  }, []);

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.5 },
      };

  const stagger = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.05 },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
        },
      };

  const staggerChild = shouldReduceMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        },
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground-on-dark leading-tight tracking-tight max-w-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Услуги
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground-on-dark/70 leading-relaxed">
              Изготавливаем изделия из мрамора, гранита, кварцита, оникса и травертина.
            </p>
            <div className="mt-8">
              <button
                onClick={open}
                className="px-8 py-4 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover transition-colors font-medium text-lg max-[440px]:w-full"
              >
                Заказать консультацию
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── КАТАЛОГ УСЛУГ ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div className="mb-10 md:mb-12" {...reveal}>
            <h2
              className="text-2xl md:text-3xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Каталог услуг
            </h2>
          </motion.div>

          <motion.div
            className="grid gap-5 md:gap-6 md:grid-cols-2 xl:grid-cols-3"
            {...stagger}
          >
            {services.map((service) => (
              <motion.article
                key={service.id}
                {...staggerChild}
                className={clsx(
                  "group relative flex h-full flex-col rounded-xl border bg-surface p-6 transition-[box-shadow,border-color] hover:shadow-[var(--shadow-lg)]",
                  service.priority
                    ? "border-gold/40 hover:border-gold/70"
                    : "border-marble-vein/60 hover:border-accent/40"
                )}
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <div className="flex-1">
                  <div className="h-px w-10 bg-gold/60 mb-4" />
                  <h3
                    className="text-lg font-semibold text-foreground leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-3 text-foreground-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-marble-vein/60 pt-4">
                  <button
                    onClick={open}
                    className="text-sm px-5 py-2.5 rounded-md border border-accent/60 text-foreground hover:bg-accent hover:text-foreground-on-dark transition-colors max-[440px]:w-full"
                  >
                    Заказать консультацию
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── КАК МЫ РАБОТАЕМ ── */}
      <section className="py-16 md:py-24 bg-marble-light/30">
        <div className="container">
          <motion.div className="text-center mb-12 md:mb-14" {...reveal}>
            <h2
              className="text-2xl md:text-3xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Как мы работаем
            </h2>
            <p className="mt-3 text-foreground-muted max-w-xl mx-auto">
              Прозрачный процесс от первого звонка до готового изделия
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            {...stagger}
          >
            {PROCESS_STEPS.map((step, index) => (
              <motion.div key={step.title} className="relative" {...staggerChild}>
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+1.75rem)] w-[calc(100%-3.5rem)] h-px bg-gold/30" />
                )}
                <div className="text-center">
                  <div
                    className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent text-foreground-on-dark text-xl font-semibold flex items-center justify-center"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {index + 1}
                  </div>
                  <h3
                    className="text-lg font-semibold text-foreground mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <motion.div
            className="rounded-2xl border border-marble-vein bg-background-dark px-6 py-8 md:px-10 md:py-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-foreground-on-dark shadow-[var(--shadow-lg)]"
            {...reveal}
          >
            <div>
              <h2
                className="text-2xl md:text-3xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Нужна консультация по проекту?
              </h2>
              <p className="mt-2 text-foreground-on-dark/70 max-w-lg">
                Опишите задачу — подберём камень, рассчитаем стоимость и сроки.
              </p>
            </div>
            <button
              onClick={open}
              className="shrink-0 px-8 py-4 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover transition-colors font-medium"
            >
              Заказать консультацию
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
