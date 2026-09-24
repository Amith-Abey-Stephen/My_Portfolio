import { site as rawSite, bio, education, seoKeywords } from "./index";

export const site = {
  ...rawSite,
  url: (process.env.NEXT_PUBLIC_SITE_URL || rawSite.url)
    .replace(/^https?:\/\/www\./, "https://")
    .replace(/\/$/, ""),
};

export { bio, education, seoKeywords };
