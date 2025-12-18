"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-[#18181b] border border-[#27272a]">
      <button
        onClick={() => setLanguage("es")}
        className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          language === "es" ? "text-[#fafafa]" : "text-[#71717a] hover:text-[#a1a1aa]"
        }`}
      >
        {language === "es" && (
          <motion.div
            layoutId="activeLanguage"
            className="absolute inset-0 bg-[#27272a] rounded-md"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">ES</span>
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          language === "en" ? "text-[#fafafa]" : "text-[#71717a] hover:text-[#a1a1aa]"
        }`}
      >
        {language === "en" && (
          <motion.div
            layoutId="activeLanguage"
            className="absolute inset-0 bg-[#27272a] rounded-md"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
}


