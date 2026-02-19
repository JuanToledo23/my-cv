"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: t("nav.services") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#tech", label: t("nav.tech") },
  ];

  return (
    <main className="relative min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#09090b]/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 border-b border-[#1c1c20]/50">
            <a href="#" className="mono text-lg font-bold text-emerald-400">
              JT
            </a>

            <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#8a8a8a] hover:text-[#ececec] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <LanguageToggle />
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-all"
              >
                {t("nav.contact")}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <LanguageToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#8a8a8a] hover:text-[#ececec] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#09090b]/95 backdrop-blur-md border-b border-[#1c1c20]/50">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#8a8a8a] hover:text-[#ececec] transition-colors text-base"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-emerald-400 font-medium"
              >
                {t("nav.contact")}
              </a>
            </div>
          </div>
        )}
      </nav>

      <Hero />
      <Services />
      <Projects />
      <Experience />
      <TechStack />
      <ContactForm />
      <Footer />
    </main>
  );
}
