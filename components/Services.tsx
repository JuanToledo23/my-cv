"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Rocket, Box, MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const { t } = useLanguage();

  const services = [
    {
      icon: Code2,
      title: t("services.web.title"),
      description: t("services.web.description"),
      tags: ["React", "Next.js", "Vue", "Node.js", "AWS"],
    },
    {
      icon: Rocket,
      title: t("services.landing.title"),
      description: t("services.landing.description"),
      tags: ["SEO", "Performance", "Analytics", "A/B Testing"],
    },
    {
      icon: Box,
      title: t("services.saas.title"),
      description: t("services.saas.description"),
      tags: ["Full Stack", "Auth", "Payments", "Deploy"],
    },
    {
      icon: MessageCircle,
      title: t("services.consulting.title"),
      description: t("services.consulting.description"),
      tags: ["Architecture", "AI", "Cloud", "CI/CD"],
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="section-number">01</span>
            <div className="h-px flex-1 max-w-12 bg-[#2a2a2e]" />
            <span className="text-sm text-[#8a8a8a]">{t("services.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-[#ececec] mb-4"
          >
            {t("services.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#8a8a8a] max-w-xl"
          >
            {t("services.description")}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            {t("services.cta")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: { icon: React.ElementType; title: string; description: string; tags: string[] };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="card p-6 h-full group hover:border-emerald-500/20">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 shrink-0">
            <service.icon className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#ececec] mb-1">{service.title}</h3>
            <p className="text-sm text-[#8a8a8a] leading-relaxed">{service.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded bg-[#1c1c20] text-[#8a8a8a] mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
