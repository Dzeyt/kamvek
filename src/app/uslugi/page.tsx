import { Metadata } from "next";
import { UslugiPageClient } from "./UslugiPageClient";
import { SERVICE_COPY } from "@/data/service-copy";

const pageHrefById = Object.fromEntries(
  SERVICE_COPY.map((item) => [item.serviceId, `/uslugi/${item.slug}`])
);

export const metadata: Metadata = {
  title: "Обработка натурального камня: изделия на заказ",
  description:
    "Обработка натурального камня и изготовление изделий на заказ: столешницы, ступени, камины, подоконники, облицовка. Мрамор, гранит, кварцит, оникс, травертин. Собственный цех в Воскресенске.",
  keywords: [
    "обработка натурального камня",
    "изготовление изделий из камня",
    "услуги камнеобработка",
    "изготовление из камня",
    "столешницы на заказ",
    "ступени из мрамора",
    "облицовка камнем",
    "услуги КАМВЕК",
  ],
  openGraph: {
    title: "Обработка натурального камня | КАМВЕК",
    description:
      "Столешницы, ступени, камины, облицовка из мрамора, гранита, кварцита, оникса и травертина. От замера до монтажа.",
    type: "website",
    locale: "ru_RU",
    siteName: "КАМВЕК",
    images: [{ url: "https://kamen-veka.ru/images/og-default.jpg", width: 1200, height: 630, alt: "КАМВЕК — изделия из натурального камня под ключ" }],
  },
  alternates: {
    canonical: "https://kamen-veka.ru/uslugi",
  },
};

export default function UslugiPage() {
  return <UslugiPageClient pageHrefById={pageHrefById} />;
}

