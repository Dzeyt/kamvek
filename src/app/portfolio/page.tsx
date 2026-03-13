import { Metadata } from "next";
import { PortfolioPageClient } from "@/app/portfolio/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Портфолио работ из камня — мрамор, гранит, кварцит",
  description:
    "Более 500 реализованных проектов: столешницы, ступени, камины из мрамора, гранита, кварцита, оникса и травертина. Фото работ КАМВЕК в Москве и МО.",
  keywords: [
    "портфолио работ из камня",
    "фото изделий из мрамора",
    "примеры работ из гранита",
    "работы из кварцита",
    "изделия из оникса",
    "работы КАМВЕК",
  ],
  openGraph: {
    title: "Портфолио работ из камня | КАМВЕК",
    description:
      "Более 500 реализованных проектов из мрамора, гранита, кварцита, оникса и травертина. Фото готовых работ.",
    type: "website",
    locale: "ru_RU",
    siteName: "КАМВЕК",
    images: [{ url: "https://kamen-veka.ru/images/og-default.jpg", width: 1200, height: 630, alt: "КАМВЕК — изделия из натурального камня под ключ" }],
  },
  alternates: {
    canonical: "https://kamen-veka.ru/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}

