import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = "Kala Lombok: paket wisata Lombok dengan asisten AI";
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
          justifyContent: "center",
          padding: 80,
          color: "white",
          background: "linear-gradient(135deg, #0ea5e9 0%, #14b8a6 55%, #059669 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, opacity: 0.85 }}>{SITE_NAME}</div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginTop: 24 }}>
          Paket Wisata Lombok dengan Asisten AI
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 28, opacity: 0.9 }}>
          Gili, Pantai Pink, Mandalika, dan lainnya
        </div>
      </div>
    ),
    size,
  );
}
