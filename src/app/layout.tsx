import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { CallRequestModalProvider } from "@/components/CallRequestModalContext";
import { Header } from "@/components/Header";
import { FloatingContacts } from "@/components/FloatingContacts";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "КАМВЕК — Изделия из мрамора и гранита | Москва и МО",
    template: "%s | КАМВЕК",
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
        url: "https://kamen-veka.ru/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "КАМВЕК — изделия из натурального камня под ключ",
      },
    ],
  },
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
