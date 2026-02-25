"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

import type { PortfolioCategory, PortfolioItem } from "@/data/portfolio";
import { PORTFOLIO_CATEGORIES } from "@/data/portfolio";
import { CATEGORY_PRIORITY_IDS } from "@/data/portfolio-order";

type Props = {
  items: PortfolioItem[];
};

const PAGE_SIZE = 24;

export function PortfolioGallery({ items }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const [category, setCategory] = useState<PortfolioCategory>("Все");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (category === "Все") return items;
    if (category === "Камины и барбекю") {
      return items.filter(
        (x) =>
          x.categories.includes("Камины и барбекю") ||
          x.categories.includes("Камины") ||
          x.categories.includes("Барбекю")
      );
    }
    return items.filter((x) => x.categories.includes(category));
  }, [items, category]);

  const ordered = useMemo(() => {
    const priority = CATEGORY_PRIORITY_IDS[category];
    if (!priority || priority.length === 0) return filtered;

    const rank = new Map(priority.map((id, index) => [id, index]));
    return [...filtered].sort((a, b) => {
      const aRank = rank.get(a.id);
      const bRank = rank.get(b.id);
      if (aRank === undefined && bRank === undefined) return 0;
      if (aRank === undefined) return 1;
      if (bRank === undefined) return -1;
      return aRank - bRank;
    });
  }, [filtered, category]);

  const visible = useMemo(() => ordered.slice(0, visibleCount), [ordered, visibleCount]);

  const canLoadMore = visibleCount < ordered.length;

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setActiveIndex(null);
  }, [category]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
    document.body.style.overflow = "";
  }, [activeIndex]);

  // Lightbox keyboard controls (circular navigation)
  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return (prev + 1) % visible.length;
        });
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return (prev - 1 + visible.length) % visible.length;
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, visible.length]);

  const activeItem = activeIndex !== null ? visible[activeIndex] : null;

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {PORTFOLIO_CATEGORIES.map((c) => {
          const isActive = c === category;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={clsx(
                "px-4 py-2 rounded-full border text-sm transition-colors",
                isActive
                  ? "bg-accent text-foreground-on-dark border-accent"
                  : "bg-surface text-foreground border-marble-vein hover:border-accent"
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {visible.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className="group relative overflow-hidden rounded-lg bg-marble-light"
              style={{ boxShadow: "var(--shadow-sm)" }}
              aria-label={item.title ? item.title : "Открыть фото"}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.title || "Работа КАМВЕК"}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            </button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Load more */}
      <div className="flex justify-center">
        {canLoadMore ? (
          <button
            onClick={() => setVisibleCount((x) => x + PAGE_SIZE)}
            className="px-6 py-3 rounded-md bg-surface border border-marble-vein hover:border-accent transition-colors"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            Показать ещё ({ordered.length - visibleCount})
          </button>
        ) : (
          <p className="text-foreground-muted text-sm">
            Показано {visible.length} из {ordered.length}
          </p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/92 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            {/* Top bar: counter + close */}
            <div
              className="w-full flex items-center justify-between px-4 py-3 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-white/60 text-sm tabular-nums">
                {activeIndex! + 1} / {visible.length}
              </span>
              <button
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center"
                onClick={() => setActiveIndex(null)}
                aria-label="Закрыть"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image area with swipe */}
            <motion.div
              key={activeIndex}
              className="relative w-full flex-1 min-h-0 flex items-center justify-center px-2 md:px-16"
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -60) {
                  setActiveIndex((i) => (i === null ? i : (i + 1) % visible.length));
                } else if (info.offset.x > 60) {
                  setActiveIndex((i) => (i === null ? i : (i - 1 + visible.length) % visible.length));
                }
              }}
            >
              <div
                className="relative w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={activeItem.src}
                  alt={activeItem.title || "Работа КАМВЕК"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="object-contain select-none"
                  priority
                  draggable={false}
                />
              </div>

              {/* Prev — desktop only */}
              <button
                className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-12 h-14 rounded-lg bg-black/40 hover:bg-black/60 text-white transition-colors items-center justify-center"
                onClick={() => setActiveIndex((i) => (i === null ? i : (i - 1 + visible.length) % visible.length))}
                aria-label="Предыдущее фото"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Next — desktop only */}
              <button
                className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-12 h-14 rounded-lg bg-black/40 hover:bg-black/60 text-white transition-colors items-center justify-center"
                onClick={() => setActiveIndex((i) => (i === null ? i : (i + 1) % visible.length))}
                aria-label="Следующее фото"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </motion.div>

            {/* Bottom bar: title + swipe hint on mobile */}
            <div
              className="w-full shrink-0 px-4 py-3 flex items-center justify-between gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white/70 text-sm truncate">
                {activeItem.title ? activeItem.title : activeItem.categories[0]}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

