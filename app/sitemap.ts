import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { getPosts, getTags } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const lastModified = new Date();

  const [posts, tags] = await Promise.all([getPosts(), getTags()]);

  const routes = [
    "",
    "/work",
    "/writing",
    "/about",
    "/story",
    "/resume",
    "/capabilities",
    "/now",
    "/contact",
    "/llms.txt",
    "/llms-full.txt",
    "/geo.md",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/work" || path === "/writing" ? 0.9 : 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${base}/writing/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.publishedAt || lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const tagRoutes = tags.map((t) => ({
    url: `${base}/writing/tag/${t.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...projectRoutes, ...postRoutes, ...tagRoutes];
}
