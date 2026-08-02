import { projects } from "@/content/projects";
import { now } from "@/content/now";
import type { Post, PostTag, Tag } from "@/types";

/**
 * API layer (docs/05_BUILD_SPECIFICATION.md).
 * A single seam between the site and its data sources. Writing is sourced
 * from the Ghost Content API and rendered on-site (headless).
 */

const BASE = process.env.BLOG_API_URL ?? "https://blog.inovuslabs.org/author/amith/";
const KEY = process.env.BLOG_API_KEY;
const AUTHOR = process.env.BLOG_AUTHOR ?? "amith";

interface GhostTag {
  name: string;
  slug: string;
}

interface GhostPost {
  slug: string;
  title: string;
  excerpt: string;
  html?: string;
  published_at: string;
  updated_at?: string;
  url: string;
  feature_image: string | null;
  feature_image_caption?: string | null;
  reading_time?: number;
  tags?: GhostTag[];
  primary_tag?: GhostTag | null;
  meta_title?: string | null;
  meta_description?: string | null;
}

function toTag(t: GhostTag): PostTag {
  return { name: t.name, slug: t.slug };
}

/** Map a Ghost post to our shape. `withHtml` keeps the body for single views. */
function mapPost(p: GhostPost, withHtml: boolean): Post {
  const tags = (p.tags ?? []).map(toTag);
  const primary = p.primary_tag ? toTag(p.primary_tag) : (tags[0] ?? null);
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    html: withHtml ? (p.html ?? "") : "",
    publishedAt: p.published_at,
    updatedAt: p.updated_at ?? p.published_at,
    url: p.url,
    featureImage: p.feature_image,
    featureImageCaption: p.feature_image_caption ?? null,
    readingTime: p.reading_time ? `${p.reading_time} min read` : "",
    tags,
    primaryTag: primary,
    metaTitle: p.meta_title ?? null,
    metaDescription: p.meta_description ?? null,
  };
}

async function ghost(
  path: string,
  params: Record<string, string>,
): Promise<{ posts?: GhostPost[] } | null> {
  if (!KEY) return null;
  const usp = new URLSearchParams({ key: KEY, ...params });
  try {
    const res = await fetch(`${BASE}/ghost/api/content/${path}/?${usp}`, {
      next: { revalidate: 3600, tags: ["posts"] },
    });
    if (!res.ok) return null;
    return (await res.json()) as { posts?: GhostPost[] };
  } catch {
    return null;
  }
}

/**
 * List posts (newest first). We fetch full documents so Ghost computes
 * `reading_time`, then drop the html so list payloads stay lean.
 */
export async function getPosts(limit?: number): Promise<Post[]> {
  const data = await ghost("posts", {
    filter: `authors:${AUTHOR}`,
    include: "tags",
    order: "published_at desc",
    limit: limit ? String(limit) : "all",
  });
  return (data?.posts ?? []).map((p) => mapPost(p, false));
}

/** A single post with its rendered html. */
export async function getPost(slug: string): Promise<Post | null> {
  const data = await ghost(`posts/slug/${slug}`, { include: "tags,authors" });
  const p = data?.posts?.[0];
  return p ? mapPost(p, true) : null;
}

/** Tags used across the author's posts, with usage counts, most-used first. */
export async function getTags(): Promise<Tag[]> {
  const posts = await getPosts();
  const bySlug = new Map<string, Tag>();
  for (const post of posts) {
    for (const t of post.tags) {
      const existing = bySlug.get(t.slug);
      if (existing) existing.count += 1;
      else bySlug.set(t.slug, { ...t, count: 1 });
    }
  }
  return [...bySlug.values()].sort((a, b) => b.count - a.count);
}

/** Up to `limit` posts sharing the given post's primary tag (excluding self). */
export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  if (!post.primaryTag) return [];
  const posts = await getPosts();
  return posts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.tags.some((t) => t.slug === post.primaryTag!.slug),
    )
    .slice(0, limit);
}

/** Previous (newer) and next (older) posts around a slug, by date. */
export async function getAdjacentPosts(
  slug: string,
): Promise<{ prev: Post | null; next: Post | null }> {
  const posts = await getPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return { prev: posts[i - 1] ?? null, next: posts[i + 1] ?? null };
}

export function getProjects() {
  return projects;
}

export function getNow() {
  return now;
}
