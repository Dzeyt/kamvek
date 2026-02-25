"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { TargetAndTransition, Transition } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";

import { STONES, STONE_GROUPS, type StoneGroup, type StoneItem } from "@/data/stones";
import { useCallRequestModal } from "@/components/CallRequestModalContext";

export function KatalogKamnyaClient() {
  const { open } = useCallRequestModal();
  const shouldReduceMotion = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState<StoneGroup>("Мрамор");

  const filteredStones = useMemo(() => {
    return STONES.filter((stone) => stone.group === activeGroup);
  }, [activeGroup]);

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.5 },
      };

  const cardHover: TargetAndTransition = shouldReduceMotion ? {} : { scale: 1.02 };
  const cardTransition: Transition = shouldReduceMotion ? {} : { duration: 0.2 };

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
              Каталог камня
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground-on-dark/70 leading-relaxed">
              Мрамор, гранит, кварцит, оникс и травертин — натуральный камень для любого проекта.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ТАБЫ + СЕТКА ── */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          {/* Tabs */}
          <motion.div className="flex flex-wrap gap-2 mb-8 md:mb-10" {...reveal}>
            {STONE_GROUPS.map((group) => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={clsx(
                  "px-5 py-2.5 rounded-md text-sm font-medium transition-colors",
                  activeGroup === group
                    ? "bg-accent text-foreground-on-dark"
                    : "bg-surface border border-marble-vein/60 text-foreground hover:border-accent/40"
                )}
              >
                {group}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
            >
              {filteredStones.map((stone) => (
                <StoneCard
                  key={stone.id}
                  stone={stone}
                  cardHover={cardHover}
                  cardTransition={cardTransition}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredStones.length === 0 && (
            <div className="text-center py-16 text-foreground-muted">
              Камни данной категории скоро появятся.
            </div>
          )}
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
              Понравился материал?
            </h2>
            <p className="text-foreground-on-dark/65 mb-8 leading-relaxed max-w-md mx-auto">
              Привезём образцы, поможем подобрать камень под проект и рассчитаем стоимость.
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

/* ===== Stone Card ===== */
type StoneCardProps = {
  stone: StoneItem;
  cardHover: TargetAndTransition;
  cardTransition: Transition;
};

function StoneCard({ stone, cardHover, cardTransition }: StoneCardProps) {
  return (
    <motion.article
      whileHover={cardHover}
      transition={cardTransition}
      className="group relative flex flex-col rounded-lg border border-marble-vein/60 bg-surface overflow-hidden transition-all hover:shadow-[var(--shadow-md)] hover:border-accent/40"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="relative aspect-square">
        {stone.imageSrc ? (
          <Image
            src={stone.imageSrc}
            alt={stone.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-marble-light via-marble-vein/20 to-marble-light flex items-center justify-center">
            <svg className="w-10 h-10 text-marble-vein/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-3.5 text-center">
        <span className="text-[15px] font-medium text-foreground leading-tight block line-clamp-2">
          {stone.name}
        </span>
      </div>
    </motion.article>
  );
}
