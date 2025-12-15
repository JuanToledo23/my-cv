"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, ArrowUpRight, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juan-alberto-toledo-tello-128a771a6/",
    color: "hover:text-blue-400",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/JuanToledo23",
    color: "hover:text-[#fafafa]",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:johntoledot@gmail.com",
    color: "hover:text-green-400",
  },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative py-20 border-t border-[#27272a]">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/10 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-4">
            {t("footer.title1")}
            <span className="gradient-text ml-2">{t("footer.title2")}</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-xl mx-auto mb-8">
            {t("footer.description")}
          </p>
          
          <a
            href="mailto:johntoledot@gmail.com"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            {t("footer.cta")}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Info grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[#fafafa] mb-4 uppercase tracking-wider">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:johntoledot@gmail.com"
                  className="flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  johntoledot@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#a1a1aa]">
                <MapPin className="w-4 h-4" />
                Ciudad de México, México
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-[#fafafa] mb-4 uppercase tracking-wider">
              {t("footer.connect")}
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-[#a1a1aa] ${link.color} transition-colors`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-sm font-semibold text-[#fafafa] mb-4 uppercase tracking-wider">
              {t("footer.availability")}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-green-400 text-sm font-medium">
                {t("footer.availabilityStatus")}
              </span>
            </div>
            <p className="text-sm text-[#71717a]">
              {t("footer.availabilityDescription")}
            </p>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-[#27272a] flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-1 text-sm text-[#71717a]">
            <span>© 2024 Juan Alberto Toledo Tello. {t("footer.builtWith")}</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>{t("footer.and")}</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-[#71717a]">
            <span>Next.js</span>
            <span className="w-1 h-1 rounded-full bg-[#3f3f46]" />
            <span>Tailwind CSS</span>
            <span className="w-1 h-1 rounded-full bg-[#3f3f46]" />
            <span>Framer Motion</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
