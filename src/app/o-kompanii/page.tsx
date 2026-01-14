export const metadata = {
  title: "О компании",
  description:
    "ООО «Камвек» — камнеобрабатывающее предприятие с 2007 года. Полный цикл работ от замера до монтажа.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-20">
        <div className="container">
          <h1
            className="text-4xl md:text-6xl font-semibold text-foreground mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            О компании
          </h1>

          <div className="prose prose-zinc max-w-none">
            <p className="text-foreground-muted">
              ООО «Камвек» — камнеобрабатывающее предприятие, основанное в мае 2007 года в
              г. Воскресенск Московской области. В нашей компании работают сотрудники с
              огромным опытом работы по камню с 1995 года.
            </p>

            <p className="text-foreground-muted mt-4">
              Компания «Камвек» — это современное производство, где многовековая прочность
              гранита, изысканность мрамора, глубина кварцита и магия оникса обретают новую
              жизнь. Мы создаём не просто изделия, а фундаментальные элементы интерьера и
              экстерьера, которые переживут поколения.
            </p>

            <p className="text-foreground-muted mt-4">
              «Камвек» — это полный цикл услуг: от проектирования и точного замера на
              объекте, до изготовления на нашем производстве и профессионального монтажа
              нашими специалистами. Мы гарантируем высокую скорость работы — от 3 рабочих
              дней — и безупречное качество.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

