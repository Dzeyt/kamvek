import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { KatalogGroupBrowser, KatalogKamnyaClient } from "./KatalogKamnyaClient";

export const metadata: Metadata = {
  title: "Натуральный камень: слэбы мрамора, гранита, кварцита, оникса",
  description:
    "Слэбы натурального камня: мрамор Каррара, Крема Марфил, Неро Маркина, гранит Абсолют Блэк, кварцит Тадж Махал и Патагония, оникс и травертин. Подберём слэб под столешницу, ступени или камин.",
  keywords: [
    "слэб камня",
    "слэб мрамора",
    "натуральный камень слэбы",
    "каталог камня",
    "мрамор",
    "гранит",
    "кварцит",
    "оникс",
    "травертин",
    "натуральный камень",
    "КАМВЕК",
  ],
  openGraph: {
    title: "Натуральный камень в слэбах | КАМВЕК",
    description:
      "Слэбы мрамора, гранита, кварцита, оникса и травертина для изделий на заказ.",
    type: "website",
    locale: "ru_RU",
    siteName: "КАМВЕК",
    images: [{ url: "https://kamen-veka.ru/images/og-default.jpg", width: 1200, height: 630, alt: "КАМВЕК — изделия из натурального камня под ключ" }],
  },
  alternates: {
    canonical: "https://kamen-veka.ru/katalog-kamnya",
  },
};

export default function KatalogKamnyaPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-background-dark py-24 md:py-36">
        <Image
          src="/images/hero/marble-dark-texture.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-background-dark/60" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_0%,rgba(201,169,98,0.22),transparent_55%),radial-gradient(700px_circle_at_85%_80%,rgba(92,74,61,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/30 to-background-dark/70" />

        <div className="container relative z-10">
          <h1
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground-on-dark leading-tight tracking-tight max-w-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Каталог натурального камня
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-foreground-on-dark/70 leading-relaxed">
            Слэбы мрамора, гранита, кварцита и оникса. Нужный слэб мрамора можно выбрать лично или мы подберём его под ваш заказ.
          </p>
        </div>
      </section>

      <Suspense fallback={<section className="py-12 md:py-16 bg-background" aria-hidden="true" />}>
        <KatalogGroupBrowser />
      </Suspense>

      <KatalogKamnyaClient />
    </main>
  );
}
