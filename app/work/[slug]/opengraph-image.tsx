import { ImageResponse } from "next/og";
import { projects, getProjectBySlug } from "@/content/projects";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title ?? "Case Study";
  const summary =
    project?.summary ??
    "A product engineering case study by Amith Abey Stephen.";
  const category = project?.category ?? "Engineering";
  const year = project?.year ?? "2026";
  const status = project?.status ?? "Shipped";
  const stack = project?.stack ?? ["TypeScript", "Next.js", "Tailwind CSS"];

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
          padding: "70px 80px",
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

        {/* Top Header / Wordmark + Category Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <span style={{ color: "#F8F8F7", fontSize: 26, fontWeight: 700 }}>
              amith.site
            </span>
            <div
              style={{
                width: 9,
                height: 9,
                marginBottom: 5,
                marginLeft: 5,
                borderRadius: 2,
                background: "#7A2435",
              }}
            />
            <span
              style={{
                color: "#71717A",
                fontSize: 18,
                marginLeft: 14,
                marginBottom: 2,
              }}
            >
              /work/{slug}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#D4D4D8",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {`${category} · ${year}`}
            </div>
            <div
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: 20,
                background: "rgba(122,36,53,0.25)",
                border: "1px solid rgba(122,36,53,0.45)",
                color: "#FDA4AF",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {status}
            </div>
          </div>
        </div>

        {/* Center: Title and Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              color: "#F8F8F7",
              fontSize: 70,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 950,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              color: "#A1A1AA",
              fontSize: 24,
              lineHeight: 1.45,
              maxWidth: 880,
            }}
          >
            {summary}
          </div>
        </div>

        {/* Bottom: Tech Stack Pills & Author Attribution */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {stack.slice(0, 5).map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  padding: "6px 14px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "#B4B4BB",
                  fontSize: 15,
                  fontFamily: "monospace",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", color: "#E4E4E7", fontSize: 18, fontWeight: 600 }}>
            {site.author}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
