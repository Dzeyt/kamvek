import { Metadata } from "next";
import { PrivacyPageClient } from "@/app/politika-konfidencialnosti/PrivacyPageClient";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности компании КАМВЕК. Обработка персональных данных.",
  alternates: {
    canonical: "https://kamvek.ru/politika-konfidencialnosti",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
