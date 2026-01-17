"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import type { PortfolioCategory, PortfolioItem } from "@/data/portfolio";
import { PORTFOLIO_CATEGORIES } from "@/data/portfolio";

type Props = {
  items: PortfolioItem[];
};

const PAGE_SIZE = 24;

export function PortfolioGallery({ items }: Props) {
  const [category, setCategory] = useState<PortfolioCategory>("Все");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (category === "Все") return items;
    return items.filter((x) => x.categories.includes(category));
  }, [items, category]);

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  const canLoadMore = visibleCount < filtered.length;

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setActiveIndex(null);
  }, [category]);

  // Lightbox keyboard controls
  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return Math.min(prev + 1, visible.length - 1);
        });
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return Math.max(prev - 1, 0);
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
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
      </div>

      {/* Load more */}
      <div className="flex justify-center">
        {canLoadMore ? (
          <button
            onClick={() => setVisibleCount((x) => x + PAGE_SIZE)}
            className="px-6 py-3 rounded-md bg-surface border border-marble-vein hover:border-accent transition-colors"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            Показать ещё ({filtered.length - visibleCount})
          </button>
        ) : (
          <p className="text-foreground-muted text-sm">
            Показано {visible.length} из {filtered.length}
          </p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[16/10] bg-black rounded-lg overflow-hidden">
                <Image
                  src={activeItem.src}
                  alt={activeItem.title || "Работа КАМВЕК"}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex items-center justify-between gap-2 mt-3 text-white/80 text-sm">
                <div className="truncate">
                  {activeItem.title ? activeItem.title : activeItem.categories[0]}
                </div>
                <div className="shrink-0">
                  {activeIndex! + 1} / {visible.length}
                </div>
              </div>

              {/* Controls */}
              <button
                className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                onClick={() => setActiveIndex(null)}
                aria-label="Закрыть"
              >
                ✕
              </button>

              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-r-lg bg-black/40 hover:bg-black/60 text-white transition-colors"
                onClick={() => setActiveIndex((i) => (i === null ? i : Math.max(i - 1, 0)))}
                aria-label="Предыдущее фото"
                disabled={activeIndex === 0}
              >
                ‹
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-l-lg bg-black/40 hover:bg-black/60 text-white transition-colors"
                onClick={() =>
                  setActiveIndex((i) =>
                    i === null ? i : Math.min(i + 1, visible.length - 1)
                  )
                }
                aria-label="Следующее фото"
                disabled={activeIndex === visible.length - 1}
              >
                ›
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

