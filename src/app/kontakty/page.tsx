export const metadata = {
  title: "Контакты",
  description: "Контакты компании КАМВЕК. Связь по телефону и в мессенджерах.",
};

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-20">
        <div className="container">
          <h1
            className="text-4xl md:text-6xl font-semibold text-foreground mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Контакты
          </h1>
          <p className="text-foreground-muted max-w-2xl">
            Страница в разработке — позже подключим реальные контакты, карту и форму.
          </p>
        </div>
      </section>
    </main>
  );
}

