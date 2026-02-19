"use client";

import { Mail, Linkedin, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 border-t border-[#1c1c20]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-[#555]">
            <span>© {new Date().getFullYear()} Juan Alberto Toledo Tello.</span>
            <span>{t("footer.builtWith")}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:johntoledot@gmail.com"
              className="text-[#555] hover:text-emerald-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/juan-alberto-toledo-tello"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] hover:text-emerald-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/JuanToledo23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] hover:text-emerald-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#555] mono">
            <span>Next.js</span>
            <span className="w-0.5 h-0.5 rounded-full bg-[#2a2a2e]" />
            <span>Tailwind</span>
            <span className="w-0.5 h-0.5 rounded-full bg-[#2a2a2e]" />
            <span>Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
