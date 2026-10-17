import { SitePage } from "@/components/SitePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("es");

export default function Page() {
  return <SitePage locale="es" />;
}
