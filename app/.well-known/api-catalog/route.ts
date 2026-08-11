import { site } from "@/content/site";

export const dynamic = "force-static";

/**
 * RFC 9727 API Catalog Well-Known URI (/.well-known/api-catalog)
 * Provides machine-readable API catalog in RFC 9264 linkset format.
 */
export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const catalog = {
    linkset: [
      {
        anchor: `${siteUrl}/api/contact`,
        "service-desc": [
          {
            href: `${siteUrl}/openapi.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: `${siteUrl}/about`,
            type: "text/html",
          },
        ],
        status: [
          {
            href: `${siteUrl}/api/health`,
            type: "application/json",
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
