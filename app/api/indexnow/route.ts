import { NextResponse } from "next/server";
import { submitToIndexNow, INDEXNOW_KEY } from "@/lib/indexnow";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { getPosts, getTags } from "@/lib/api";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/^https?:\/\/www\./, "https://").replace(/\/$/, "");

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const secret = body.secret || new URL(req.url).searchParams.get("secret");

    // Optional authentication if INDEXNOW_SECRET is configured
    const configuredSecret = process.env.INDEXNOW_SECRET;
    if (configuredSecret && secret !== configuredSecret) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid secret" },
        { status: 401 },
      );
    }

    let urlsToSubmit: string[] = body.urls;

    // If no explicit URLs provided, collect all site URLs automatically
    if (!urlsToSubmit || !Array.isArray(urlsToSubmit) || urlsToSubmit.length === 0) {
      const [posts, tags] = await Promise.all([getPosts(), getTags()]);

      const staticRoutes = [
        "",
        "/work",
        "/about",
        "/story",
        "/resume",
        "/capabilities",
        "/now",
        "/contact",
        "/writing",
      ].map((p) => `${siteUrl}${p}`);

      const projectRoutes = projects.map((p) => `${siteUrl}/work/${p.slug}`);
      const postRoutes = posts.map((p) => `${siteUrl}/writing/${p.slug}`);
      const tagRoutes = tags.map((t) => `${siteUrl}/writing/tag/${t.slug}`);

      urlsToSubmit = [
        ...staticRoutes,
        ...projectRoutes,
        ...postRoutes,
        ...tagRoutes,
      ];
    }

    const result = await submitToIndexNow(urlsToSubmit);
    return NextResponse.json(result, { status: result.success ? 200 : 502 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal error",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  const configuredSecret = process.env.INDEXNOW_SECRET;

  if (configuredSecret && secret !== configuredSecret) {
    return NextResponse.json(
      {
        error:
          "Unauthorized: Pass ?secret=YOUR_INDEXNOW_SECRET to trigger IndexNow sync.",
      },
      { status: 401 },
    );
  }

  // Trigger full sync
  const [posts, tags] = await Promise.all([getPosts(), getTags()]);

  const staticRoutes = [
    "",
    "/work",
    "/about",
    "/story",
    "/resume",
    "/capabilities",
    "/now",
    "/contact",
    "/writing",
  ].map((p) => `${siteUrl}${p}`);

  const projectRoutes = projects.map((p) => `${siteUrl}/work/${p.slug}`);
  const postRoutes = posts.map((p) => `${siteUrl}/writing/${p.slug}`);
  const tagRoutes = tags.map((t) => `${siteUrl}/writing/tag/${t.slug}`);

  const allUrls = [
    ...staticRoutes,
    ...projectRoutes,
    ...postRoutes,
    ...tagRoutes,
  ];

  const result = await submitToIndexNow(allUrls);
  return NextResponse.json(result, { status: result.success ? 200 : 502 });
}
