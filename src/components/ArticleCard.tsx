import Image from "next/image";
import Link from "next/link";

import type { ArticleCopy } from "@/data/article-stoleshnitsa";

type Props = {
  article: ArticleCopy;
  titleAs?: "h2" | "h3";
  clampLead?: boolean;
};

export function ArticleCard({ article, titleAs = "h2", clampLead = false }: Props) {
  const Title = titleAs;

  return (
    <Link
      href={article.path}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-marble-vein/60 bg-surface transition-[box-shadow,border-color] hover:border-accent/40 hover:shadow-[var(--shadow-lg)]"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={article.cover.src}
          alt={article.cover.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Title
          className="text-xl font-semibold text-foreground leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {article.h1}
        </Title>
        <p
          className={`mt-3 text-foreground-muted leading-relaxed${clampLead ? " line-clamp-2" : ""}`}
        >
          {article.lead}
        </p>
        <span className="mt-5 text-accent group-hover:underline">Читать</span>
      </div>
    </Link>
  );
}
