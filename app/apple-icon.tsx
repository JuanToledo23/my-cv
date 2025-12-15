import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "36px",
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

