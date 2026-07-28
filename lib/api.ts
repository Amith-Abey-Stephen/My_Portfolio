import { projects } from "@/content/projects";
import { now } from "@/content/now";
import { uses } from "@/content/uses";
import type { Post } from "@/types";

interface GhostPost {
  title: string;
  excerpt: string;
  published_at: string;
  url: string;
  feature_image: string | null;
  reading_time?: number;
  tags?: { name: string }[];
}

/** Fetch the latest writing from the Ghost Content API. */
export async function getPosts(limit = 4): Promise<Post[]> {
  const base = process.env.BLOG_API_URL ?? "https://blog.inovuslabs.org";
  const key = process.env.BLOG_API_KEY;
  const author = process.env.BLOG_AUTHOR ?? "amith";

  if (!key) return [];

  const params = new URLSearchParams({
    key,
    filter: `authors:${author}`,
    fields: "title,excerpt,published_at,url,feature_image,reading_time",
    include: "tags",
    limit: String(limit),
  });

  try {
    const res = await fetch(
      `${base}/ghost/api/content/posts/?${params.toString()}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];

    const data = (await res.json()) as { posts?: GhostPost[] };
    return (data.posts ?? []).map((p) => ({
      title: p.title,
      excerpt: p.excerpt,
      publishedAt: p.published_at,
      url: p.url,
      featureImage: p.feature_image,
      readingTime: p.reading_time ? `${p.reading_time} min read` : "",
      tags: (p.tags ?? []).map((t) => t.name),
    }));
  } catch {
    return [];
  }
}

export function getProjects() {
  return projects;
}

export function getNow() {
  return now;
}

export function getUses() {
  return uses;
}
