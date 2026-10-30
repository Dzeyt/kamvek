"use client";

import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/ArticleCard";
import { ARTICLES } from "@/data/article-stoleshnitsa";

export function StatiPageClient() {
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
              <li aria-current="page" className="text-foreground-on-dark">
                Статьи
              </li>
            </ol>
          </nav>
          <h1
            className="mt-6 max-w-3xl text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground-on-dark leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Статьи о натуральном камне
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
