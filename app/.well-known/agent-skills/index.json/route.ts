import { site } from "@/content/site";
import { CONTENT_SIGNALS_SKILL, MARKDOWN_NEGOTIATION_SKILL } from "@/content/agent-skills";
import crypto from "crypto";

export const dynamic = "force-static";

/**
 * Agent Skills Discovery Index Endpoint
 * Served at /.well-known/agent-skills/index.json per Agent Skills Discovery RFC v0.2.0.
 */
export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const contentSignalsDigest =
    "sha256:" + crypto.createHash("sha256").update(CONTENT_SIGNALS_SKILL).digest("hex");

  const markdownNegotiationDigest =
    "sha256:" + crypto.createHash("sha256").update(MARKDOWN_NEGOTIATION_SKILL).digest("hex");

  const indexPayload = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "content-signals",
        type: "skill-md",
        description: "Declare AI content usage preferences in robots.txt using Content Signals.",
        url: `${siteUrl}/.well-known/agent-skills/content-signals/SKILL.md`,
        digest: contentSignalsDigest,
      },
      {
        name: "markdown-negotiation",
        type: "skill-md",
        description: "Support Accept: text/markdown content negotiation for clean markdown versions.",
        url: `${siteUrl}/.well-known/agent-skills/markdown-negotiation/SKILL.md`,
        digest: markdownNegotiationDigest,
      },
    ],
  };

  return new Response(JSON.stringify(indexPayload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
