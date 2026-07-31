import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { getPosts, getTags } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  // Build-time timestamp: signals freshness on each deploy for pages that
  // have no per-record date (static pages and code-driven project entries).
  const lastModified = new Date();

  const routes = [
    "",
    "/about",
    "/story",
    "/resume",
    "/now",
    "/uses",
    "/playground",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const [posts, tags] = await Promise.all([getPosts(), getTags()]);

  const articleRoutes = posts.map((p) => ({
    url: `${base}/writing/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const tagRoutes = tags.map((t) => ({
    url: `${base}/writing/tag/${t.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  return [...routes, ...projectRoutes, ...articleRoutes, ...tagRoutes];
}
