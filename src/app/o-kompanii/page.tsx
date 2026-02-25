import { Metadata } from "next";
import { AboutPageClient } from "@/app/o-kompanii/AboutPageClient";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "ООО «Камвек» — камнеобрабатывающее предприятие с 2007 года. Полный цикл работ от замера до монтажа.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}

