import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";

/**
 * Author byline — author portrait + name + date.
 * Formatted with semantic Schema.org microdata for Google E-E-A-T and AEO.
 */
export function ArticleByline({ date }: { date: string }) {
  return (
    <div
      className="flex items-center gap-3.5"
      itemProp="author"
      itemScope
      itemType="https://schema.org/Person"
    >
      <Link
        href="/about"
        className="group relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border bg-surface ring-1 ring-border/50 transition-all duration-200 hover:scale-105 hover:ring-burgundy/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
        aria-label={`About ${site.author}`}
      >
        <Image
          src="/portrait.png"
          alt={`${site.author} — ${site.role}`}
          itemProp="image"
          fill
          sizes="44px"
          priority
          quality={85}
          className="object-cover object-top transition-transform duration-200 group-hover:scale-105"
        />
      </Link>
      <div>
        <Link
          href="/about"
          rel="author"
          itemProp="url"
          className="text-sm font-medium text-foreground transition-colors hover:text-burgundy-light focus-visible:outline-none focus-visible:underline"
        >
          <span itemProp="name">{site.author}</span>
        </Link>
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <time dateTime={date} itemProp="datePublished">
            {formatDate(date)}
          </time>
          <span aria-hidden className="text-muted/50">
            ·
          </span>
          <span itemProp="jobTitle">{site.role}</span>
        </div>
      </div>
    </div>
  );
}
