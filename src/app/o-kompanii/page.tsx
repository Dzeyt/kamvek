import { Metadata } from "next";
import { AboutPageClient } from "@/app/o-kompanii/AboutPageClient";

export const metadata: Metadata = {
  title: "О компании — производство изделий из камня",
  description:
    "Камнеобрабатывающее предприятие с 2007 года в Воскресенске МО. Опыт работы с натуральным камнем с 1995 года. Собственное производство, полный цикл работ.",
  keywords: [
    "КАМВЕК",
    "о компании",
    "производство камня Воскресенск",
    "камнеобработка",
    "история компании",
  ],
  openGraph: {
    title: "О компании КАМВЕК — мы строим вечность",
    description:
      "Камнеобрабатывающее предприятие с 2007 года. Опыт работы с натуральным камнем с 1995 года. Собственное производство, полный цикл работ.",
    type: "website",
    locale: "ru_RU",
    siteName: "КАМВЕК",
    images: [{ url: "https://kamen-veka.ru/images/og-default.jpg", width: 1200, height: 630, alt: "КАМВЕК — изделия из натурального камня под ключ" }],
  },
  alternates: {
    canonical: "https://kamen-veka.ru/o-kompanii",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}

