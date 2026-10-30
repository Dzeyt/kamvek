import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServicePageClient } from "@/app/uslugi/[slug]/ServicePageClient";
import { SERVICE_COPY } from "@/data/service-copy";
import { SERVICES } from "@/data/services";
import { PORTFOLIO_ITEMS, type PortfolioCategory } from "@/data/portfolio";
import { CATEGORY_PRIORITY_IDS } from "@/data/portfolio-order";

const SITE = "https://kamen-veka.ru";
const PHOTO_LIMIT = 10;

const PHOTO_CATEGORY: Record<string, PortfolioCategory> = {
  "lestnitsy-i-stupeni": "Лестницы и ступени",
  kaminy: "Камины",
  stoleshnitsy: "Столешницы",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function copyBySlug(slug: string) {
  return SERVICE_COPY.find((item) => item.slug === slug);
}

function pageTitle(seoTitle: string) {
  return seoTitle.replace(/\s*\|\s*Камвек\s*$/, "");
}

function priorityIds(category: PortfolioCategory): readonly string[] {
  const direct = CATEGORY_PRIORITY_IDS[category];
  if (direct && direct.length > 0) return direct;
  // Отдельного списка «Камины» нет: приоритет задан в «Камины и барбекю».
  if (category === "Камины") return CATEGORY_PRIORITY_IDS["Камины и барбекю"] ?? [];
  return [];
}

function photoAlt(h1: string, index: number) {
  const title = h1.split(":")[0].trim();
  return `${title} — работа КАМВЕК, фото ${index + 1}`;
}

function photosFor(category: PortfolioCategory, h1: string) {
  const priority = priorityIds(category);
  const rank = new Map(priority.map((id, index) => [id, index]));

  return PORTFOLIO_ITEMS.filter((item) => item.categories.includes(category))
    .sort((a, b) => {
      const aRank = rank.get(a.id);
      const bRank = rank.get(b.id);
      if (aRank === undefined && bRank === undefined) return 0;
      if (aRank === undefined) return 1;
      if (bRank === undefined) return -1;
      return aRank - bRank;
    })
    .slice(0, PHOTO_LIMIT)
    .map((item, index) => ({
      id: item.id,
      src: item.src,
      alt: photoAlt(h1, index),
    }));
}

function breadcrumbJsonLd(slug: string, label: string) {
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
        name: "Услуги",
        item: `${SITE}/uslugi`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: label,
        item: `${SITE}/uslugi/${slug}`,
      },
    ],
  };
}

function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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

export function generateStaticParams() {
  return SERVICE_COPY.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const copy = copyBySlug(slug);
  if (!copy) return {};

  const title = pageTitle(copy.seoTitle);
  const url = `${SITE}/uslugi/${copy.slug}`;

  return {
    title,
    description: copy.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | КАМВЕК`,
      description: copy.seoDescription,
      type: "website",
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
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const copy = copyBySlug(slug);
  const category = copy ? PHOTO_CATEGORY[copy.slug] : undefined;
  if (!copy || !category) notFound();

  const crumbLabel =
    SERVICES.find((item) => item.id === copy.serviceId)?.title ?? copy.h1;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(copy.slug, crumbLabel)} />
      <JsonLd data={faqJsonLd(copy.faq)} />
      <ServicePageClient
        copy={copy}
        crumbLabel={crumbLabel}
        photos={photosFor(category, copy.h1)}
      />
    </>
  );
}
