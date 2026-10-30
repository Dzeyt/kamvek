"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { useCallRequestModal } from "@/components/CallRequestModalContext";
import type { ArticleCopy, ArticleSample } from "@/data/article-stoleshnitsa";

const INLINE_LINK = /\[([^\]]+)\]\((\/(?!\/)[^)\s]*)\)/g;
const PAGE_GRID = "lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-x-12";
const HEADING_OFFSET = "scroll-mt-[calc(var(--header-height)+1rem)]";

function sectionId(heading: string) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[\s—–-]+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/^-|-$/g, "");
}

function Paragraph({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE_LINK)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push(text.slice(cursor, index));

    const label = match[1];
    const href = match[2];
    parts.push(
      <Link key={`${index}-${href}`} href={href} className="text-accent hover:underline">
        {label}
      </Link>,
    );
    cursor = index + match[0].length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));

  return <p>{parts}</p>;
}

function SampleCards({ items }: { items: ArticleSample[] }) {
  return (
    <ul className="mt-6 grid grid-cols-3 gap-3">
      {items.map((item) => (
        <li
          key={`${item.group}-${item.name}`}
          className="overflow-hidden rounded-lg border border-marble-vein/60 bg-surface"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <div className="relative aspect-square">
            <Image
              src={item.imageSrc}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 30vw, 240px"
              className="object-cover"
            />
          </div>
          <div className="p-2.5 text-center">
            <p className="text-sm font-medium text-foreground leading-tight">{item.name}</p>
            <p className="mt-1 text-xs text-foreground-muted">{item.group}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Contents({ headings }: { headings: string[] }) {
  return (
    <nav aria-label="Содержание">
      <p
        className="text-lg font-semibold text-foreground"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Содержание
      </p>
      <ol className="mt-3 space-y-2">
        {headings.map((heading) => (
          <li key={heading}>
            <a href={`#${sectionId(heading)}`} className="text-sm text-foreground-muted leading-snug hover:text-accent">
              {heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function PricePlate({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-gold/40 bg-marble-light/50 px-4 py-4 text-foreground font-semibold leading-snug hover:border-accent/60"
    >
      {label}
    </Link>
  );
}

export function ArticlePageClient({ copy }: { copy: ArticleCopy }) {
  const { open } = useCallRequestModal();
  const headings = copy.sections.map((section) => section.heading);

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

        <div className={`container relative z-10 ${PAGE_GRID}`}>
          <div className="mx-auto max-w-3xl lg:mx-0">
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
                  <Link href="/stati" className="hover:text-foreground-on-dark transition-colors">
                    Статьи
                  </Link>
                </li>
                <li aria-hidden="true" className="text-foreground-on-dark/40">
                  /
                </li>
                <li aria-current="page" className="text-foreground-on-dark">
                  {copy.h1}
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
              {copy.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className={`container ${PAGE_GRID}`}>
          <div className="mx-auto max-w-3xl min-w-0 space-y-10 lg:mx-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={copy.cover.src}
                alt={copy.cover.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>

            {copy.sections.map((section) => (
              <div key={section.heading}>
                <h2
                  id={sectionId(section.heading)}
                  className={`${HEADING_OFFSET} text-2xl md:text-[30px] font-semibold text-foreground`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-foreground-muted leading-relaxed">
                  {section.paragraphs.map((paragraph) => (
                    <Paragraph key={paragraph} text={paragraph} />
                  ))}
                </div>
                {section.heading === copy.samples.section ? (
                  <SampleCards items={copy.samples.items} />
                ) : null}
                {section.heading === copy.sectionImage.section ? (
                  <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={copy.sectionImage.image.src}
                      alt={copy.sectionImage.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>
            ))}

            <p className="text-foreground-muted leading-relaxed">{copy.closing}</p>

            <Link
              href={copy.serviceCard.path}
              className="group block rounded-xl border border-marble-vein/60 bg-surface p-6 transition-[box-shadow,border-color] hover:border-accent/40 hover:shadow-[var(--shadow-lg)]"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <p
                className="text-2xl font-semibold text-foreground leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copy.serviceCard.title}
              </p>
              <p className="mt-3 text-foreground-muted leading-relaxed">{copy.serviceCard.description}</p>
              <span className="mt-5 inline-block text-accent group-hover:underline">Подробнее</span>
            </Link>
          </div>

          <aside className="sticky top-[calc(var(--header-height)+1.25rem)] hidden lg:block space-y-6">
            <Contents headings={headings} />
            <PricePlate label={copy.pricePlate} href={copy.relatedServicePath} />
            <button
              type="button"
              onClick={open}
              className="w-full px-4 py-3 bg-accent text-foreground-on-dark rounded-md hover:bg-accent-hover transition-colors font-medium"
            >
              Рассчитать стоимость
            </button>
          </aside>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-marble-vein/30 bg-background-dark text-foreground-on-dark px-6 py-10 md:px-12 md:py-14 shadow-[var(--shadow-lg)] text-center">
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
        </div>
      </section>
    </main>
  );
}
