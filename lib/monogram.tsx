import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { palette } from "./site";

// "JT" in Fraunces, ink on paper. Used by app/icon.tsx and app/apple-icon.tsx.
export async function renderMonogram(size: number, radius: number) {
  const fraunces = await readFile(join(process.cwd(), "assets/fonts/Fraunces-SemiBold.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: palette.paper,
          border: `${Math.max(1, Math.round(size / 32))}px solid ${palette.rule}`,
          borderRadius: radius,
          color: palette.ink,
          fontFamily: "Fraunces",
          fontSize: Math.round(size * 0.56),
          letterSpacing: "-0.04em",
          paddingBottom: Math.round(size * 0.04),
        }}
      >
        JT
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: "Fraunces", data: fraunces, weight: 600, style: "normal" }],
    },
  );
}
