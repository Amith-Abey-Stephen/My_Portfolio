import { ImageResponse } from "next/og";
import { getPosts, getPost } from "@/lib/api";
import { site } from "@/content/site";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  const title = post?.title ?? "Article & Notes";
  const excerpt =
    post?.excerpt ??
    "Notes from the build: reflections on software engineering and systems.";
  const primaryTag = post?.primaryTag?.name ?? "Engineering";
  const readingTime = post?.readingTime || "Article";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0c0c0d 50%, #200a10 100%)",
          padding: "64px 76px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient burgundy glow */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 480,
            height: 480,
            borderRadius: 480,
            background: "rgba(122,36,53,0.32)",
            filter: "blur(60px)",
          }}
        />

        {/* Top Header / Wordmark + Tag Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <span style={{ color: "#F8F8F7", fontSize: 28, fontWeight: 700 }}>
              amith.site
            </span>
            <div
              style={{
                width: 10,
                height: 10,
                marginBottom: 5,
                marginLeft: 5,
                borderRadius: 3,
                background: "#7A2435",
              }}
            />
            <span
              style={{
                color: "#71717A",
                fontSize: 20,
                marginLeft: 14,
                marginBottom: 2,
              }}
            >
              /writing
            </span>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: 20,
                background: "rgba(122,36,53,0.25)",
                border: "1px solid rgba(122,36,53,0.5)",
                color: "#E28496",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              {primaryTag}
            </div>
            <div
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#B4B4BB",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {readingTime}
            </div>
          </div>
        </div>

        {/* Central Article Title & Excerpt */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              color: "#7A2435",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Article · Technical Breakdown
          </div>
          <div
            style={{
              display: "flex",
              color: "#F8F8F7",
              fontSize: title.length > 55 ? 50 : 60,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              color: "#A1A1AA",
              fontSize: 22,
              lineHeight: 1.45,
              maxWidth: 960,
            }}
          >
            {excerpt.length > 180 ? `${excerpt.slice(0, 180)}...` : excerpt}
          </div>
        </div>

        {/* Bottom Bar: Author info & Site domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 22,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#18181B",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#E4E4E7",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              a.
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{ color: "#F8F8F7", fontSize: 17, fontWeight: 600 }}
              >
                {site.author}
              </span>
              <span style={{ color: "#71717A", fontSize: 13 }}>
                {site.role} · Kerala, India
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              color: "#A1A1AA",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Read on amith.site/writing
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
