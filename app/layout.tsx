import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Juan Toledo | Solutions Architect & Full Stack Engineer",
  description:
    "Arquitecto de Soluciones & Ingeniero Full Stack Senior. Desarrollo web a medida, landing pages, micro-SaaS y consultoría técnica. 9+ años de experiencia con AWS, React, Node.js y desarrollo aumentado por IA.",
  keywords: [
    "Solutions Architect",
    "Full Stack Developer",
    "Freelance",
    "Desarrollo Web",
    "Landing Pages",
    "Micro-SaaS",
    "AWS Serverless",
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "México",
  ],
  authors: [{ name: "Juan Alberto Toledo Tello" }],
  openGraph: {
    title: "Juan Toledo | Solutions Architect & Full Stack Engineer",
    description:
      "Desarrollo web a medida, landing pages, micro-SaaS y consultoría técnica. 9+ años de experiencia.",
    type: "website",
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
        className={`${inter.variable} ${geistMono.variable} antialiased bg-[#09090b] text-[#ececec] selection:bg-emerald-500/25`}
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
