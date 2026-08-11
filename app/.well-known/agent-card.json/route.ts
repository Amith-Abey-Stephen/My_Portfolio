import { site, bio } from "@/content/site";

export const dynamic = "force-static";

/**
 * A2A Agent Card
 * Served at /.well-known/agent-card.json per A2A Protocol Specification.
 */
export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const agentCard = {
    name: `${site.author} Portfolio Agent`,
    version: "1.0.0",
    description: `${site.purpose} ${bio}`,
    url: siteUrl,
    supportedInterfaces: [
      {
        url: `${siteUrl}/api/contact`,
        protocol: "HTTP",
        description: "Submit contact form messages and inquiries",
      },
      {
        url: `${siteUrl}/api/markdown-negotiation`,
        protocol: "HTTP",
        description: "Content negotiation interface returning Markdown representations",
      },
    ],
    capabilities: [
      {
        id: "markdown-negotiation",
        name: "Markdown Negotiation",
        description: "Delivers clean, formatting-stripped Markdown to AI agents via Accept: text/markdown.",
      },
      {
        id: "api-catalog",
        name: "RFC 9727 API Catalog",
        description: "Exposes machine-readable API catalog at /.well-known/api-catalog.",
      },
    ],
    skills: [
      {
        id: "content-signals",
        name: "Content Signals",
        description: "Signals AI usage preferences (ai-train=no, search=yes, ai-input=yes) in robots.txt.",
      },
      {
        id: "markdown-negotiation",
        name: "Markdown Content Negotiation",
        description: "Returns markdown page representations with x-markdown-tokens token count headers.",
      },
      {
        id: "api-catalog",
        name: "API Catalog Discovery",
        description: "Publishes RFC 9727 Linkset documents describing available API services.",
      },
    ],
  };

  return new Response(JSON.stringify(agentCard, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
