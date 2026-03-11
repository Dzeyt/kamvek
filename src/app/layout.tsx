import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { CallRequestModalProvider } from "@/components/CallRequestModalContext";
import { Header } from "@/components/Header";
import { FloatingContacts } from "@/components/FloatingContacts";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

/*
  ========================================
  📖 ЧТО ТАКОЕ LAYOUT?
  ========================================
  
  Layout — это "обёртка" для всех страниц.
  
  Всё что здесь — будет на КАЖДОЙ странице:
  - <html> и <body> теги
  - Шрифты
  - Мета-теги (SEO)
  - Header и Footer (добавим позже)
  
  Структура:
  Layout (Header + Footer)
    └── page.tsx (контент страницы)
*/

// Шрифт для заголовков — элегантный, премиальный
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"], // cyrillic для русского!
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap", // Показываем текст сразу, шрифт подгрузится
});

// Шрифт для текста — чистый, современный
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
  display: "swap",
});

// Мета-данные по умолчанию (SEO)
// Каждая страница может переопределить свои
export const metadata: Metadata = {
  title: {
    default: "КАМВЕК — Изделия из мрамора и гранита | Москва и МО",
    template: "%s | КАМВЕК", // %s заменится на title страницы
  },
  description:
    "Производство изделий из натурального камня: столешницы, подоконники, лестницы, камины. Собственное производство в Воскресенске.",
  keywords: [
    "изделия из мрамора",
    "изделия из гранита",
    "столешницы из камня",
    "подоконники из мрамора",
    "лестницы из гранита",
    "камины из мрамора",
    "натуральный камень Москва",
    "камнеобработка",
  ],
  authors: [{ name: "КАМВЕК" }],
  creator: "КАМВЕК",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "КАМВЕК",
    images: [
      {
        url: "https://kamvek.ru/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "КАМВЕК — изделия из натурального камня под ключ",
      },
    ],
  },
  // Разрешаем индексацию
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang="ru" — важно для SEO и accessibility
    <html lang="ru" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <StructuredData />
        <CallRequestModalProvider>
          <Header />
          {children}
          <Footer />
          <FloatingContacts />
        </CallRequestModalProvider>
      </body>
    </html>
  );
}
