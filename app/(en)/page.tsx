import { SitePage } from "@/components/SitePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en");

export default function Page() {
  return <SitePage locale="en" />;
}
