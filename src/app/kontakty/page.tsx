import { Metadata } from "next";
import { ContactsPageClient } from "@/app/kontakty/ContactsPageClient";

export const metadata: Metadata = {
  title: "Контакты — адрес, телефон, схема проезда",
  description:
    "Контакты камнеобрабатывающего предприятия КАМВЕК в Воскресенске МО. Телефон: +7 (916) 380-50-90. Связь в мессенджерах, схема проезда.",
  keywords: [
    "контакты КАМВЕК",
    "телефон камнеобработка",
    "адрес Воскресенск",
    "как связаться",
  ],
  openGraph: {
    title: "Контакты КАМВЕК — адрес, телефон, схема проезда",
    description:
      "Телефон: +7 (916) 380-50-90. Воскресенск МО, ул. Гаражная, д. 1-А.",
    type: "website",
    locale: "ru_RU",
    siteName: "КАМВЕК",
    images: [{ url: "https://kamen-veka.ru/images/og-default.jpg", width: 1200, height: 630, alt: "КАМВЕК — изделия из натурального камня под ключ" }],
  },
  alternates: {
    canonical: "https://kamen-veka.ru/kontakty",
  },
};

export default function ContactsPage() {
  return <ContactsPageClient />;
}

