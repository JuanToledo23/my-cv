"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Experience() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const { t, language } = useLanguage();

  const experiences = [
    {
      title: "AI-Augmented Solutions Architect & Full Stack Developer",
      company: "Traxion",
      location: "Ciudad de México",
      period: "2024 - " + t("experience.current"),
      current: true,
      tags: ["Node.js", "TypeScript", "Python", "React", "AWS", "Docker", "Socket.io"],
      highlights:
        language === "es"
          ? [
              "6 microservicios construidos desde cero en un ecosistema de 27 repos",
              "TraxiBot WhatsApp 24/7 — 3 proveedores, desplegado en AWS ECS",
              "Motor de procesamiento masivo: 50K+ registros, 5 DBs en paralelo",
              "Monitor en tiempo real con WebSockets para cientos de vehículos",
            ]
          : [
              "6 microservices built from scratch across a 27-repo ecosystem",
              "TraxiBot WhatsApp 24/7 — 3 providers, deployed on AWS ECS",
              "Mass processing engine: 50K+ records, 5 DBs in parallel",
              "Real-time monitoring with WebSockets for hundreds of vehicles",
            ],
    },
    {
      title: "Senior Frontend Developer",
      company: "PALO IT",
      location: "Ciudad de México",
      period: "2022 - 2023",
      tags: ["Node.js", "AWS Lambda", "Serverless", "SQL Server", "Power BI"],
      highlights:
        language === "es"
          ? [
              "Desarrollo full-stack en múltiples proyectos cliente",
              "Integración de AWS Lambda y arquitecturas Serverless",
            ]
          : [
              "Full-stack development across multiple client projects",
              "AWS Lambda and Serverless architecture integration",
            ],
    },
    {
      title: "Frontend Developer",
      company: "MOONS",
      location: "Ciudad de México",
      period: "2021 - 2022",
      tags: ["Next.js", "React"],
      highlights:
        language === "es"
          ? ["Rediseño de sitio corporativo y apps internas con Next.js"]
          : ["Corporate website and internal apps redesign with Next.js"],
    },
    {
      title: "UI/UX Developer",
      company: "Grupo Salinas",
      location: "Ciudad de México",
      period: "2019 - 2021",
      tags: ["Angular", "UX/UI"],
      highlights:
        language === "es"
          ? ["Mantenimiento y mejora de aplicaciones empresariales clave"]
          : ["Maintenance and improvement of key enterprise applications"],
    },
    {
      title: "Front End Developer",
      company: "INEEL",
      location: "Cuernavaca, Morelos",
      period: "2017 - 2019",
      tags: ["Angular", "TypeScript"],
      highlights:
        language === "es"
          ? ["Repositorio institucional y proyecto 'Unidad Central Maestra' para CFE"]
          : ["Institutional repository and 'Unidad Central Maestra' project for CFE"],
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="max-w-3xl mx-auto px-6">
        <div ref={titleRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="section-number">03</span>
            <div className="h-px flex-1 max-w-12 bg-[#2a2a2e]" />
            <span className="text-sm text-[#8a8a8a]">{t("experience.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-[#ececec] mb-4"
          >
            {t("experience.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#8a8a8a] max-w-xl"
          >
            {t("experience.description")}
          </motion.p>
        </div>

        <div className="relative">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={`${exp.company}-${exp.period}`}
              experience={exp}
              index={index}
              isLast={index === experiences.length - 1}
              currentLabel={t("experience.current")}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 p-4 rounded-xl bg-[#111113] border border-[#1c1c20]"
        >
          <h4 className="text-sm font-semibold text-[#ececec] mb-2 mono">
            {t("experience.education")}
          </h4>
          <div className="space-y-1.5 text-sm text-[#8a8a8a]">
            <p>
              <span className="text-[#ececec]">{t("experience.masters")}</span> — UNIR, 2024
            </p>
            <p>
              <span className="text-[#ececec]">{t("experience.degree")}</span> — TecNM Zacatepec, 2017
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  tags: string[];
  highlights: string[];
};

function TimelineItem({
  experience,
  index,
  isLast,
  currentLabel,
}: {
  experience: ExperienceItem;
  index: number;
  isLast: boolean;
  currentLabel: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="relative pl-8 pb-10"
    >
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gradient-to-b from-[#1c1c20] to-transparent" />
      )}

      <div className="absolute left-0 top-1">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            experience.current
              ? "border-emerald-400 bg-emerald-400/20"
              : "border-[#1c1c20] bg-[#111113]"
          }`}
        >
          {experience.current && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-start gap-2 mb-1.5">
          <h3 className="text-base font-semibold text-[#ececec]">{experience.title}</h3>
          {experience.current && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium mono">
              {currentLabel}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-[#8a8a8a] mb-2">
          <span className="flex items-center gap-1.5 font-medium text-[#ececec]">
            <Briefcase className="w-3.5 h-3.5" />
            {experience.company}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {experience.location}
          </span>
          <span className="flex items-center gap-1.5 mono text-xs">
            <Calendar className="w-3.5 h-3.5" />
            {experience.period}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {experience.tags.map((tag) => (
            <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-[#1c1c20] text-[#555] mono">
              {tag}
            </span>
          ))}
        </div>

        <ul className="space-y-1">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#8a8a8a]">
              <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400/40" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
