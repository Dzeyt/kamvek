import type { Metadata } from "next";

import { StatiPageClient } from "@/app/stati/StatiPageClient";

const SITE = "https://kamen-veka.ru";
const title = "Статьи о натуральном камне";
const description =
  "Статьи цеха Камвек о выборе натурального камня для столешницы: мрамор, гранит и кварцит.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE}/stati` },
  openGraph: {
    title: `${title} | КАМВЕК`,
    description,
    type: "website",
    locale: "ru_RU",
    siteName: "КАМВЕК",
    url: `${SITE}/stati`,
    images: [
      {
        url: `${SITE}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "КАМВЕК — изделия из натурального камня под ключ",
      },
    ],
  },
};

export default function StatiPage() {
  return <StatiPageClient />;
}
