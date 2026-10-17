import { renderMonogram } from "@/lib/monogram";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return renderMonogram(32, 6);
}
