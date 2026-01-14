export const metadata = {
  title: "Услуги",
  description:
    "Изготовление изделий из натурального камня: столешницы, ступени, подоконники, камины, облицовка и другие работы.",
};

export default function UslugiPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-20">
        <div className="container">
          <h1
            className="text-4xl md:text-6xl font-semibold text-foreground mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Услуги
          </h1>
          <p className="text-foreground-muted max-w-2xl">
            Страница в разработке — здесь будут карточки направлений и быстрые CTA.
          </p>
        </div>
      </section>
    </main>
  );
}

