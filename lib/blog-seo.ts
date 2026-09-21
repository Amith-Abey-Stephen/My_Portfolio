import type { Post } from "@/types";
import { site } from "@/content/site";

/**
 * Known high-intent technical keywords mapped to common article topics
 * for maximum algorithmic search relevance and AI discovery.
 */
const TECH_DICTIONARY: Record<string, string[]> = {
  postgresql: [
    "PostgreSQL",
    "PostgreSQL security",
    "Postgres Docker setup",
    "Database backup automation",
    "Cloudflare R2 backup",
    "pg_dump",
    "Database self-hosting",
    "SQL database hardening",
  ],
  docker: [
    "Docker containerization",
    "Docker security best practices",
    "Docker compose",
    "Linux containers",
    "Self-hosted Docker",
    "Homelab container",
    "Container environment consistency",
  ],
  server: [
    "Self-hosted server",
    "Homelab architecture",
    "Linux server setup",
    "Remote server access",
    "Bare metal server",
    "Server migration",
    "Reverse proxy",
    "Sysadmin notes",
  ],
  cloudflare: [
    "Cloudflare R2",
    "Cloudflare tunnels",
    "Object storage backup",
    "Zero trust access",
    "S3 compatible storage",
  ],
  astro: [
    "Astro framework",
    "Astro SSG",
    "Static site generation",
    "Modern frontend architecture",
    "Content-focused web apps",
  ],
  opencode: [
    "OpenCode AI",
    "AI UI generation",
    "LLM UI prototyping",
    "AI-assisted frontend development",
  ],
  shopify: [
    "Shopify app development",
    "Shop Minis",
    "Shopify merchant tools",
    "E-commerce architecture",
  ],
  git: [
    "Git version control",
    "Git branching tutorial",
    "Git workflow for beginners",
    "Version control best practices",
  ],
  iot: [
    "IoT hardware development",
    "ESP32 microcontrollers",
    "Hardware prototyping",
    "Sensor telemetry",
  ],
  electronics: [
    "Electronics circuit testing",
    "Hardware debugging",
    "Capacitor testing",
    "Maker lab electronics",
  ],
  automation: [
    "Workflow automation",
    "Internal developer tools",
    "Webhook automation",
    "Engineering productivity",
  ],
};

/**
 * Generate a comprehensive list of high-intent SEO keywords and search queries
 * for an individual article.
 */
export function generateArticleKeywords(post: Post): string[] {
  const text = `${post.title} ${post.slug} ${post.tags.map((t) => t.name).join(" ")} ${post.excerpt}`.toLowerCase();
  const keywordSet = new Set<string>();

  // 1. Exact title and common search intent variations
  keywordSet.add(post.title);
  keywordSet.add(`${post.title} article`);
  keywordSet.add(`${post.title} guide`);
  keywordSet.add(`${post.title} tutorial`);
  keywordSet.add(`${post.title} ${site.author}`);

  // 2. Author and personal brand associations
  keywordSet.add(`${site.author} writing`);
  keywordSet.add(`${site.author} blog`);
  keywordSet.add(`${site.author} engineering`);
  keywordSet.add("Amith Stephen");
  keywordSet.add("Product Engineer Kerala");

  // 3. Tags and topic intent
  for (const tag of post.tags) {
    keywordSet.add(tag.name);
    keywordSet.add(`${tag.name} tutorial`);
    keywordSet.add(`${tag.name} guide`);
    keywordSet.add(`${tag.name} best practices`);
    keywordSet.add(`${site.author} ${tag.name}`);
  }

  // 4. Match technology dictionary triggers
  for (const [trigger, relatedKeywords] of Object.entries(TECH_DICTIONARY)) {
    if (text.includes(trigger)) {
      for (const kw of relatedKeywords) {
        keywordSet.add(kw);
      }
    }
  }

  // 5. Inovus Labs publication attribution
  keywordSet.add("Inovus Labs Blog");
  keywordSet.add("Inovus Labs IEDC");

  return Array.from(keywordSet);
}

/**
 * Calculate estimated word count from raw or processed HTML
 */
export function calculateWordCount(html: string): number {
  const plainText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!plainText) return 0;
  return plainText.split(" ").length;
}

/**
 * Format reading time into ISO 8601 duration format (e.g. "PT5M" for 5 minutes)
 * for Schema.org `timeRequired` property.
 */
export function formatIsoDuration(readingTimeStr?: string): string {
  if (!readingTimeStr) return "PT5M";
  const match = readingTimeStr.match(/\d+/);
  const minutes = match ? parseInt(match[0], 10) : 5;
  return `PT${Math.max(1, minutes)}M`;
}
