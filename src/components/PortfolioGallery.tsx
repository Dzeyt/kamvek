"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";

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
  const [activeIndex, setActiveIndex] = useState(-1);

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

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setActiveIndex(-1);
  }, [category]);

  const slides = useMemo(
    () =>
      visible.map((item) => ({
        src: item.src,
        alt: item.title || item.categories[0] || "Работа КАМВЕК",
        description: item.title || item.categories[0] || "",
      })),
    [visible]
  );

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
      <Lightbox
        open={activeIndex >= 0}
        close={() => setActiveIndex(-1)}
        index={activeIndex}
        slides={slides}
        plugins={[Zoom, Counter, Captions]}
        on={{ view: ({ index }) => setActiveIndex(index) }}
        render={{ buttonZoom: () => null }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.93)" },
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
        }}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
      />
    </div>
  );
}
