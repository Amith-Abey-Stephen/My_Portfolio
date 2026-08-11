import { site } from "@/content/site";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const openapiSpec = {
    openapi: "3.1.0",
    info: {
      title: `${site.author} API`,
      version: "1.0.0",
      description: `Public API endpoints for ${site.name}`,
    },
    servers: [
      {
        url: siteUrl,
      },
    ],
    paths: {
      "/api/contact": {
        post: {
          summary: "Send a contact message",
          description: "Submits a message to the site author with rate-limiting and honeypot validation.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", description: "Sender's full name" },
                    email: { type: "string", format: "email", description: "Sender's email address" },
                    message: { type: "string", description: "Message body text" },
                    company: { type: "string", description: "Honeypot field (must remain empty)" },
                  },
                  required: ["name", "email", "message"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Message delivered successfully",
            },
            "400": {
              description: "Validation error or invalid payload",
            },
            "429": {
              description: "Rate limit exceeded",
            },
          },
        },
      },
      "/api/health": {
        get: {
          summary: "API Health Check",
          description: "Returns health status of the API services.",
          responses: {
            "200": {
              description: "Service is operating normally",
            },
          },
        },
      },
    },
  };

  return new Response(JSON.stringify(openapiSpec, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
