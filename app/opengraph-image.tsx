import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.author} — Building products with purpose`;
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
          background: "linear-gradient(135deg, #0c0c0d 55%, #2c0f16 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* burgundy corner wash */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: 560,
            background: "rgba(122,36,53,0.38)",
            filter: "blur(50px)",
          }}
        />

        {/* faded monogram watermark */}
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: -120,
            display: "flex",
            alignItems: "flex-end",
            color: "rgba(248,248,247,0.05)",
            fontSize: 460,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          a
          <div
            style={{
              width: 70,
              height: 70,
              marginBottom: 70,
              marginLeft: 8,
              borderRadius: 12,
              background: "rgba(122,36,53,0.5)",
            }}
          />
        </div>

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <span style={{ color: "#F8F8F7", fontSize: 30, fontWeight: 600 }}>
            amith.site
          </span>
          <div
            style={{
              width: 12,
              height: 12,
              marginBottom: 6,
              marginLeft: 6,
              borderRadius: 3,
              background: "#7A2435",
            }}
          />
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              color: "#F8F8F7",
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.03,
              letterSpacing: -1.5,
              maxWidth: 820,
            }}
          >
            {site.purpose}
          </div>
          <div style={{ color: "#B8B8BC", fontSize: 30 }}>
            {`${site.author} · ${site.role}`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
