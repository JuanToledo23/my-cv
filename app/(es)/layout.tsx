import { HtmlShell } from "@/components/HtmlShell";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <HtmlShell lang="es">{children}</HtmlShell>;
}
