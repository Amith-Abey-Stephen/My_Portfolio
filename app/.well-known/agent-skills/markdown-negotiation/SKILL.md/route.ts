import { MARKDOWN_NEGOTIATION_SKILL } from "@/content/agent-skills";

export const dynamic = "force-static";

export function GET() {
  return new Response(MARKDOWN_NEGOTIATION_SKILL, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
