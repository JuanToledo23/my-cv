import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { content } from "@/content";
import type { Locale } from "@/content/types";
import { PERSON_SHORT_NAME, SITE_HOST, palette } from "./site";

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "assets/fonts");

export async function renderOgImage(locale: Locale) {
  const { meta } = content[locale];
  const [fraunces, inter] = await Promise.all([
    readFile(join(fontDir, "Fraunces-SemiBold.ttf")),
    readFile(join(fontDir, "Inter-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 88px",
          background: palette.paper,
          color: palette.ink,
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", width: 96, height: 6, background: palette.warm }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Fraunces", fontSize: 104, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {PERSON_SHORT_NAME}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontSize: 40, color: palette.accent }}>
            {meta.ogTagline.split(" · ").map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            paddingTop: 28,
            borderTop: `2px solid ${palette.rule}`,
            fontSize: 28,
            color: palette.ink3,
          }}
        >
          {SITE_HOST}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
