import type { Metadata } from "next";
import { Suspense } from "react"
import { KatalogKamnyaClient } from "./KatalogKamnyaClient";

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
    <Suspense>
      <KatalogKamnyaClient />
    </Suspense>
  );
}
