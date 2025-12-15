"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import CodeShowcase from "@/components/CodeShowcase";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#philosophy", label: t("nav.philosophy") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#tech", label: t("nav.tech") },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main className="relative min-h-screen noise-overlay">
      {/* Navigation - Fixed subtle header */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#09090b]/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 border-b border-[#27272a]/50">
            <a href="#" className="text-lg font-bold gradient-text">
              JT
            </a>
            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <LanguageToggle />
              <a
                href="mailto:johntoledot@gmail.com"
                className="px-4 py-2 text-sm font-medium text-[#fafafa] bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3f3f46] transition-all"
              >
                {t("nav.contact")}
              </a>
            </div>
            {/* Mobile menu button */}
            <div className="flex items-center gap-3 md:hidden">
              <LanguageToggle />
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" x2="6" y1="6" y2="18" />
                    <line x1="6" x2="18" y1="6" y2="18" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#09090b]/95 backdrop-blur-md border-b border-[#27272a]/50">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="block py-2 text-[#a1a1aa] hover:text-[#fafafa] transition-colors text-base"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:johntoledot@gmail.com"
                onClick={handleNavClick}
                className="block py-2 text-[#fafafa] font-medium"
              >
                {t("nav.contact")}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Sections */}
      <Hero />
      <Philosophy />
      <Projects />
      <CodeShowcase />
      <Experience />
      <TechStack />
      <Footer />
    </main>
  );
}
