import { site } from "@/content/site";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const content = `# auth.md — Agent Authentication & Registration for ${site.name}

> Standard specification for AI agent authentication and discovery on ${site.name}.

## Agent Audience & Purpose
This document defines access policies and authentication requirements for automated AI agents and crawlers interacting with ${site.url}.

Public content on ${site.name} (including LLM knowledge contexts at \`/llms.txt\` and \`/llms-full.txt\`, as well as Markdown Content Negotiation via \`Accept: text/markdown\`) is available without authentication.

## Discovery Endpoints
- **API Catalog**: \`${siteUrl}/.well-known/api-catalog\`
- **OpenAPI Specification**: \`${siteUrl}/openapi.json\`
- **Agent Skills Index**: \`${siteUrl}/.well-known/agent-skills/index.json\`

## Supported Authentication Methods
1. **Anonymous / Unauthenticated Access (\`anonymous\`)**:
   - **Access**: Full read-only access to site content, Markdown representations, and documentation.
   - **Rate Limiting**: Monitored per IP address to prevent abuse.

No credentials are required or issued. For partnership inquiries or rate-limit questions, use the contact API at \`${siteUrl}/api/contact\`.
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
