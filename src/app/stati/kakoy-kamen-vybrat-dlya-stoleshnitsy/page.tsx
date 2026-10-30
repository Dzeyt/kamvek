import type { Metadata } from "next";

import { ArticlePageClient } from "@/app/stati/kakoy-kamen-vybrat-dlya-stoleshnitsy/ArticlePageClient";
import { ARTICLE_STOLESHNITSA } from "@/data/article-stoleshnitsa";

const SITE = "https://kamen-veka.ru";
const url = `${SITE}${ARTICLE_STOLESHNITSA.path}`;

export const metadata: Metadata = {
  title: ARTICLE_STOLESHNITSA.seoTitle,
  description: ARTICLE_STOLESHNITSA.seoDescription,
  alternates: { canonical: url },
  openGraph: {
    title: `${ARTICLE_STOLESHNITSA.seoTitle} | КАМВЕК`,
    description: ARTICLE_STOLESHNITSA.seoDescription,
    type: "article",
    locale: "ru_RU",
    siteName: "КАМВЕК",
    url,
    images: [
      {
        url: `${SITE}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "КАМВЕК — изделия из натурального камня под ключ",
      },
    ],
  },
};

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: `${SITE}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Статьи",
        item: `${SITE}/stati`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: ARTICLE_STOLESHNITSA.h1,
        item: url,
      },
    ],
  };
}

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function ArticlePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd()} />
      <ArticlePageClient copy={ARTICLE_STOLESHNITSA} />
    </>
  );
}
