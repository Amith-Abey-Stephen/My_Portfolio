import { getPosts } from "@/lib/api";
import { site } from "@/content/site";

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const posts = await getPosts(20);

  const items = posts
    .map((p) => {
      const link = `${siteUrl}/writing/${p.slug}`;
      const categories = p.tags
        .map((t) => `<category>${esc(t.name)}</category>`)
        .join("");
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${esc(p.excerpt)}</description>
      ${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.author)} — Writing</title>
    <link>${siteUrl}/writing</link>
    <atom:link href="${siteUrl}/writing/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes from the build by ${esc(site.author)}.</description>
    <language>en</language>
    <lastBuildDate>${posts[0] ? new Date(posts[0].publishedAt).toUTCString() : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
