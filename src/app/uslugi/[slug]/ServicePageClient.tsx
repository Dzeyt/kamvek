"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { ArticleCard } from "@/components/ArticleCard";
import { useCallRequestModal } from "@/components/CallRequestModalContext";
import { ARTICLE_STOLESHNITSA } from "@/data/article-stoleshnitsa";
import type { ServiceCopy } from "@/data/service-copy";

type Photo = {
  id: string;
  src: string;
  alt: string;
};

type Props = {
  copy: ServiceCopy;
  crumbLabel: string;
  photos: Photo[];
};

export function ServicePageClient({ copy, crumbLabel, photos }: Props) {
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
      <section className="relative overflow-hidden bg-background-dark py-14 md:py-20">
        <Image
          src="/images/hero/marble-dark-texture.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center opacity-20"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_0%,rgba(201,169,98,0.22),transparent_55%),radial-gradient(700px_circle_at_85%_80%,rgba(92,74,61,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/10 via-background-dark/50 to-background-dark/80" />

        <div className="container relative z-10">
          <nav aria-label="Хлебные крошки">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground-on-dark/70">
              <li>
                <Link href="/" className="hover:text-foreground-on-dark transition-colors">
                  Главная
                </Link>
              </li>
              <li aria-hidden="true" className="text-foreground-on-dark/40">
                /
              </li>
              <li>
                <Link href="/uslugi" className="hover:text-foreground-on-dark transition-colors">
                  Услуги
                </Link>
              </li>
              <li aria-hidden="true" className="text-foreground-on-dark/40">
                /
              </li>
              <li aria-current="page" className="text-foreground-on-dark">
                {crumbLabel}
              </li>
            </ol>
          </nav>

          <h1
            className="mt-6 text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground-on-dark leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {copy.h1}
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-foreground-on-dark/70 leading-relaxed">
            {copy.intro}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="space-y-10">
            {copy.body.map((section) => (
              <div key={section.heading}>
                <h2
                  className="text-2xl md:text-[30px] font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-foreground-muted leading-relaxed">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {copy.slug === "stoleshnitsy" ? (
            <div className="mt-16">
              <h2
                className="text-2xl md:text-[30px] font-semibold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Полезно прочитать
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <ArticleCard article={ARTICLE_STOLESHNITSA} titleAs="h3" clampLead />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-marble-light/30">
        <div className="container">
          <motion.div {...reveal}>
            <h2
              className="text-[30px] md:text-3xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Примеры работ
            </h2>
            <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
              {photos.map((photo) => (
                <li
                  key={photo.id}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg bg-marble-light"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2
            className="text-[30px] md:text-3xl font-semibold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Вопросы и ответы
          </h2>
          <div className="mt-8 space-y-4">
            {copy.faq.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-marble-vein/60 bg-surface p-6"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <h3
                  className="text-lg font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.question}
                </h3>
                <p className="mt-3 text-foreground-muted leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto rounded-2xl border border-marble-vein/30 bg-background-dark text-foreground-on-dark px-6 py-10 md:px-12 md:py-14 shadow-[var(--shadow-lg)] text-center">
            <h2
              className="text-[28px] md:text-3xl font-semibold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Нужна консультация по проекту?
            </h2>
            <p className="text-foreground-on-dark/65 mb-8 leading-relaxed max-w-md mx-auto">
              Опишите задачу — подберём камень, рассчитаем стоимость и сроки.
            </p>
            <button
              type="button"
              onClick={open}
              className="px-8 py-3.5 sm:px-10 sm:py-4 bg-accent text-foreground-on-dark rounded-md hover:bg-accent-hover transition-colors font-medium text-base sm:text-lg max-[440px]:w-full"
            >
              Заказать консультацию
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
