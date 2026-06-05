import { ImageResponse } from "next/og";

export const alt = "Petron LLC | Building on a Firm Foundation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#15171c",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background:
              "repeating-linear-gradient(-45deg, #f0a020 0 24px, #2a2316 24px 48px)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#9aa0ab", fontSize: 26, letterSpacing: 6, textTransform: "uppercase" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#f0a020" }} />
          Petron, L.L.C. · Alexandria, Louisiana
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 800, color: "#eef0f3", lineHeight: 1, textTransform: "uppercase", letterSpacing: -2 }}>
            Building on a
          </div>
          <div style={{ fontSize: 120, fontWeight: 800, color: "#f0a020", lineHeight: 1, textTransform: "uppercase", letterSpacing: -2 }}>
            firm foundation
          </div>
        </div>
        <div style={{ display: "flex", gap: 40, color: "#c4c9d2", fontSize: 28, letterSpacing: 2, textTransform: "uppercase" }}>
          <span>General Contracting</span>
          <span style={{ color: "#4a5160" }}>/</span>
          <span>Fuel Systems</span>
          <span style={{ color: "#4a5160" }}>/</span>
          <span>Commercial Real Estate</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
