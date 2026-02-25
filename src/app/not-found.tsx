import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена | КАМВЕК",
};

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-var(--header-height))] relative flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-background-dark">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_10%,rgba(201,169,98,0.28),transparent_55%),radial-gradient(900px_circle_at_85%_20%,rgba(92,74,61,0.24),transparent_55%)]" />
        <div className="absolute inset-0 opacity-15 bg-marble" />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 via-background-dark/45 to-background-dark/75" />
      </div>
      <div className="relative z-10 container py-24 text-center">
        <div
          className="text-8xl sm:text-9xl font-semibold text-gold/30 leading-none mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          404
        </div>

        <h1
          className="text-2xl sm:text-3xl font-semibold text-foreground-on-dark mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Страница не найдена
        </h1>

        <p className="text-foreground-on-dark/50 mb-10 max-w-sm mx-auto">
          Вернитесь на главную или перейдите в нужный раздел.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover transition-colors font-medium w-full sm:w-auto text-center"
          >
            На главную
          </Link>
          <Link
            href="/kontakty"
            className="px-8 py-4 rounded-md border border-foreground-on-dark/20 text-foreground-on-dark/60 hover:border-foreground-on-dark/40 hover:text-foreground-on-dark transition-colors font-medium w-full sm:w-auto text-center"
          >
            Контакты
          </Link>
        </div>
      </div>
    </main>

  );
}
