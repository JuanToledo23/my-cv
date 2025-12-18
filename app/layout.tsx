import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Juan Alberto Toledo Tello | AI-Augmented Solutions Architect",
  description:
    "Arquitectando Sistemas de Alto Rendimiento con Ingeniería Aumentada por IA. Senior Full Stack Engineer & Solutions Architect con 9+ años de experiencia en AWS Serverless, Arquitectura Event-Driven, y Sistemas en Tiempo Real.",
  keywords: [
    "Solutions Architect",
    "Full Stack Developer",
    "AWS Serverless",
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "AI-Augmented Development",
    "Event-Driven Architecture",
    "Arquitecto de Soluciones",
    "México",
  ],
  authors: [{ name: "Juan Alberto Toledo Tello" }],
  openGraph: {
    title: "Juan Alberto Toledo Tello | AI-Augmented Solutions Architect",
    description:
      "Arquitectando Sistemas de Alto Rendimiento con Ingeniería Aumentada por IA.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Alberto Toledo Tello | AI-Augmented Solutions Architect",
    description:
      "Arquitectando Sistemas de Alto Rendimiento con Ingeniería Aumentada por IA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-[#09090b] text-[#fafafa] selection:bg-blue-500/30`}
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
