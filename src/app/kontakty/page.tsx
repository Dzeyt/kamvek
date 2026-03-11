import { Metadata } from "next";
import { ContactsPageClient } from "@/app/kontakty/ContactsPageClient";

export const metadata: Metadata = {
  title: "Контакты — адрес, телефон, схема проезда",
  description:
    "Контакты камнеобрабатывающего предприятия КАМВЕК в Воскресенске МО. Телефоны: +7 (916) 358-85-79, +7 (926) 684-48-20. Связь в мессенджерах, схема проезда.",
  keywords: [
    "контакты КАМВЕК",
    "телефон камнеобработка",
    "адрес Воскресенск",
    "как связаться",
  ],
  openGraph: {
    title: "Контакты КАМВЕК — адрес, телефон, схема проезда",
    description:
      "Телефоны: +7 (916) 358-85-79, +7 (926) 684-48-20. Воскресенск МО, ул. Гаражная, д. 1-А.",
    type: "website",
    locale: "ru_RU",
    siteName: "КАМВЕК",
    images: [{ url: "https://kamvek.ru/images/og-default.jpg", width: 1200, height: 630, alt: "КАМВЕК — изделия из натурального камня под ключ" }],
  },
  alternates: {
    canonical: "https://kamvek.ru/kontakty",
  },
};

export default function ContactsPage() {
  return <ContactsPageClient />;
}

