import { Metadata } from "next";
import { PortfolioPageClient } from "@/app/portfolio/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Портфолио работ",
  description:
    "Фото выполненных работ КАМВЕК: столешницы, ступени, камины, облицовка и другие изделия из натурального камня.",
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}

