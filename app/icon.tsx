import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          border: "2px solid #3b82f6",
        }}
      >
        <span
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
            backgroundClip: "text",
            color: "transparent",
            fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          JT
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}

