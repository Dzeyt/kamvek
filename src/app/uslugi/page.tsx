import { Metadata } from "next";
import { UslugiPageClient } from "./UslugiPageClient";

export const metadata: Metadata = {
  title: "Услуги по изготовлению изделий из камня",
  description:
    "Полный цикл работ с натуральным камнем: столешницы, подоконники, ступени, камины, облицовка. Мрамор, гранит, кварцит, оникс, травертин. Воскресенск МО.",
  keywords: [
    "услуги камнеобработка",
    "изготовление из камня",
    "столешницы на заказ",
    "ступени из мрамора",
    "облицовка камнем",
    "услуги КАМВЕК",
  ],
  openGraph: {
    title: "Услуги по изготовлению изделий из камня | КАМВЕК",
    description:
      "Полный цикл работ: столешницы, ступени, камины, облицовка. Мрамор, гранит, кварцит, оникс, травертин. Срок от 3 рабочих дней.",
    type: "website",
    locale: "ru_RU",
    siteName: "КАМВЕК",
    images: [{ url: "https://kamvek.ru/images/og-default.jpg", width: 1200, height: 630, alt: "КАМВЕК — изделия из натурального камня под ключ" }],
  },
  alternates: {
    canonical: "https://kamvek.ru/uslugi",
  },
};

export default function UslugiPage() {
  return <UslugiPageClient />;
}

