import type { Metadata } from "next";
import { site, seoKeywords } from "@/content/site";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const siteUrl = rawSiteUrl.replace(/^https?:\/\/www\./, "https://").replace(/\/$/, "");

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
  const canonicalUrl = `${siteUrl}${path}`;
  const authorSuffix = ` — ${site.author}`;
  const maxTitleLen = 60;

  // Ensure title never exceeds SEO threshold (60 characters)
  let pageTitle: string | { absolute: string };
  let fullTitle: string;

  if (title.length + authorSuffix.length <= maxTitleLen) {
    pageTitle = title;
    fullTitle = `${title}${authorSuffix}`;
  } else {
    // For long article titles or custom pages, use absolute to avoid template bloat
    fullTitle = title.length > maxTitleLen ? `${title.slice(0, 57).trim()}…` : title;
    pageTitle = { absolute: fullTitle };
  }

  // Ensure description is cleanly formatted and within the 120-158 character sweet spot
  let cleanDesc = description.replace(/\s+/g, " ").trim();
  if (cleanDesc.length > 158) {
    cleanDesc = `${cleanDesc.slice(0, 155).trim()}…`;
  }

  return {
    metadataBase: new URL(siteUrl),
    title: pageTitle,
    description: cleanDesc,
    keywords: keywords ?? seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: cleanDesc,
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
      description: cleanDesc,
    },
  };
}
