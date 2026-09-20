import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export const alt = `Works & Products — ${site.author}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0c0c0d 50%, #230b12 100%)",
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
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 520,
            background: "rgba(122,36,53,0.35)",
            filter: "blur(60px)",
          }}
        />

        {/* Monogram Watermark */}
        <div
          style={{
            position: "absolute",
            right: 50,
            bottom: -100,
            display: "flex",
            alignItems: "flex-end",
            color: "rgba(248,248,247,0.04)",
            fontSize: 420,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          w.
        </div>

        {/* Top Header / Wordmark + Badge */}
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
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 30,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#E2E2E6",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 8,
                background: "#10b981",
              }}
            />
            <span>{`${projects.length} Production Systems & Tools`}</span>
          </div>
        </div>

        {/* Central Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              color: "#7A2435",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Engineering Portfolio
          </div>
          <div
            style={{
              display: "flex",
              color: "#F8F8F7",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 900,
            }}
          >
            Everything I've built.
          </div>
          <div
            style={{
              display: "flex",
              color: "#A1A1A8",
              fontSize: 24,
              lineHeight: 1.4,
              maxWidth: 820,
            }}
          >
            SaaS platforms, custom client portfolios, offline mobile applications, and IoT telemetry systems.
          </div>
        </div>

        {/* Bottom Categories & Author */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {["SaaS & DevTools", "Web Portfolios", "Android & IoT", "AI Automation"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#B8B8BC",
                    fontSize: 15,
                  }}
                >
                  {tag}
                </div>
              ),
            )}
          </div>

          <div style={{ display: "flex", color: "#E2E2E6", fontSize: 18, fontWeight: 600 }}>
            {`${site.author} · ${site.role}`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
