import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = "Resta Giuliano — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 84px",
          background: "#f5f2ea",
          color: "#17221f",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#0e604b",
          }}
        >
          {profile.role} · {profile.positioning}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 980,
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          {profile.headline}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", width: 64, height: 3, background: "#0e604b" }} />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>{profile.name}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
