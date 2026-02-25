import type { Metadata } from "next";
import { KatalogKamnyaClient } from "./KatalogKamnyaClient";

export const metadata: Metadata = {
  title: "Каталог камня — Мрамор, Гранит, Кварцит, Оникс, Травертин | КАМВЕК",
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
  },
};

export default function KatalogKamnyaPage() {
  return <KatalogKamnyaClient />;
}
