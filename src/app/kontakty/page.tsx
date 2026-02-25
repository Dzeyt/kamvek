import { Metadata } from "next";
import { ContactsPageClient } from "@/app/kontakty/ContactsPageClient";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты компании КАМВЕК. Связь по телефону и в мессенджерах.",
};

export default function ContactsPage() {
  return <ContactsPageClient />;
}

