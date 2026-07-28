import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const routes = [
    "",
    "/about",
    "/story",
    "/work",
    "/journey",
    "/capabilities",
    "/writing",
    "/resume",
    "/now",
    "/uses",
    "/playground",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
