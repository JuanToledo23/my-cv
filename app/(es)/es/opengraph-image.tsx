import { content } from "@/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = content.es.meta.ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("es");
}
