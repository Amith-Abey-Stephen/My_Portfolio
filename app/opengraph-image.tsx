import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.author} — A builder who loves solving real problems`;
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
          background: "#0c0c0d",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* subtle burgundy wash */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 520,
            background: "rgba(122,36,53,0.35)",
            filter: "blur(40px)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#7A2435",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F8F8F7",
              fontSize: 34,
              fontWeight: 600,
            }}
          >
            a.
          </div>
          <div style={{ color: "#8A8A91", fontSize: 26, letterSpacing: 2 }}>
            amith.site
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              color: "#F8F8F7",
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -1,
              maxWidth: 940,
            }}
          >
            <span>A builder who loves&nbsp;</span>
            <span style={{ color: "#A03247" }}>solving real problems.</span>
          </div>
          <div style={{ color: "#B8B8BC", fontSize: 30 }}>
            {`${site.author} · Software · Hardware · Community`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
