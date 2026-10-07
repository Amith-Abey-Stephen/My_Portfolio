import { site } from "@/content/site";

export const dynamic = "force-static";

// Search engines & AI crawlers we explicitly welcome (GEO / AI SEO): being
// indexable by these is how the content shows up in web search and AI answers.
const braveBots = [
  "Bravebot",
  "bravebot",
  "BraveSearch",
];

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
  const rawBase = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const base = rawBase.replace(/^https?:\/\/www\./, "https://").replace(/\/$/, "");

  const braveBotRules = braveBots.map((bot) => `User-agent: ${bot}`).join("\n");
  const aiBotRules = aiBots.map((bot) => `User-agent: ${bot}`).join("\n");

  const body = `User-agent: *
Allow: /
Disallow: /api/

# Brave Search crawler & Brave AI indexing
${braveBotRules}
Allow: /
Disallow: /api/

# AI Answer Engines & Crawlers
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
