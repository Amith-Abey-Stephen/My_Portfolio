import type { Metadata } from "next";
import { site, seoKeywords } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/** Build consistent per-page metadata with canonical, OpenGraph, and Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} — ${site.author}`;
  const canonicalUrl = `${siteUrl}${path}`;

  return {
    title,
    description,
    keywords: keywords ?? seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: site.name,
      locale: "en_US",
      type,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors: authors ?? [site.author],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
