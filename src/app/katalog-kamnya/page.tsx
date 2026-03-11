import type { Metadata } from "next";
import { Suspense } from "react"
import { KatalogKamnyaClient } from "./KatalogKamnyaClient";

export const metadata: Metadata = {
  title: "Каталог натурального камня — Мрамор, Гранит",
  description:
    "Каталог натурального камня: мрамор, гранит, кварцит, оникс и травертин. Подберём материал для вашего проекта — столешницы, ступени, облицовка и другие изделия.",
  keywords: [
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
    title: "Каталог камня | КАМВЕК",
    description:
      "Коллекция натурального камня для ваших проектов. Мрамор, гранит, кварцит, оникс и травертин.",
    type: "website",
    locale: "ru_RU",
    siteName: "КАМВЕК",
    images: [{ url: "https://kamvek.ru/images/og-default.jpg", width: 1200, height: 630, alt: "КАМВЕК — изделия из натурального камня под ключ" }],
  },
  alternates: {
    canonical: "https://kamvek.ru/katalog-kamnya",
  },
};

export default function KatalogKamnyaPage() {
  return (
    <Suspense>
      <KatalogKamnyaClient />
    </Suspense>
  );
}
