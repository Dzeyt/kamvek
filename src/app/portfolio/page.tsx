import { PortfolioGallery } from "@/components/PortfolioGallery";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";

export const metadata = {
  title: "Портфолио работ",
  description:
    "Фото выполненных работ КАМВЕК: столешницы, ступени, камины, облицовка и другие изделия из натурального камня.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-20">
        <div className="container">
          <h1
            className="text-4xl md:text-6xl font-semibold text-foreground mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Портфолио
          </h1>
          <p className="text-foreground-muted max-w-2xl mb-10">
            Реальные фото наших работ. Используйте фильтр, чтобы быстро найти нужный тип
            изделий.
          </p>

          <PortfolioGallery items={PORTFOLIO_ITEMS} />
        </div>
      </section>
    </main>
  );
}

