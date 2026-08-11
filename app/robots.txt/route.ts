import { site } from "@/content/site";

export const dynamic = "force-static";

// Answer engines & AI crawlers we explicitly welcome (GEO / AI SEO): being
// indexable by these is how the content shows up in AI answers.
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "Meta-ExternalAgent",
  "cohere-ai",
  "YouBot",
  "DuckAssistBot",
  "Diffbot",
];

export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const aiBotRules = aiBots.map((bot) => `User-agent: ${bot}`).join("\n");

  const body = `User-agent: *
Allow: /
Disallow: /api/
Content-Signal: ai-train=no, search=yes, ai-input=yes

${aiBotRules}
Allow: /
Disallow: /api/
Content-Signal: ai-train=no, search=yes, ai-input=yes

Host: ${base}
Sitemap: ${base}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
