import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { storyIntro } from "@/content/story";

export const alt = `The Story of ${site.author}`;
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
          background: "linear-gradient(135deg, #0c0c0d 50%, #200a10 100%)",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
              /story
            </span>
          </div>

          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: 30,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#E4E4E7",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            The Builder Journey
          </div>
        </div>

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
            Origin & Turning Points
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
            How I got here.
          </div>
          <div
            style={{
              display: "flex",
              color: "#A1A1AA",
              fontSize: 24,
              lineHeight: 1.45,
              maxWidth: 860,
            }}
          >
            {storyIntro}
          </div>
        </div>

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
            {["Curiosity", "First Code", "Inovus Labs", "Shipping Products"].map(
              (badge) => (
                <div
                  key={badge}
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#B4B4BB",
                    fontSize: 15,
                  }}
                >
                  {badge}
                </div>
              ),
            )}
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
