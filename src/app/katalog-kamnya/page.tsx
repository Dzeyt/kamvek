export const metadata = {
  title: "Каталог камня",
  description: "Каталог образцов мрамора и гранита. Компактная сетка, быстрый просмотр.",
};

export default function KatalogKamnyaPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-20">
        <div className="container">
          <h1
            className="text-4xl md:text-6xl font-semibold text-foreground mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Каталог камня
          </h1>
          <p className="text-foreground-muted max-w-2xl">
            Страница в разработке — здесь будут образцы мрамора и гранита.
          </p>
        </div>
      </section>
    </main>
  );
}

