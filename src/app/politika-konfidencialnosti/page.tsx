import { Metadata } from "next";
import { PrivacyPageClient } from "@/app/politika-konfidencialnosti/PrivacyPageClient";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности ООО «Камвек». Порядок обработки и защиты персональных данных пользователей сайта в соответствии с Федеральным законом № 152-ФЗ.",
  alternates: {
    canonical: "https://kamen-veka.ru/politika-konfidencialnosti",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
