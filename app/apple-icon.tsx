import { renderMonogram } from "@/lib/monogram";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  // iOS rounds the corners itself.
  return renderMonogram(180, 0);
}
