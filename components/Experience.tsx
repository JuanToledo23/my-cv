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
      company: "Traxi (Traxion)",
      location: "Ciudad de México",
      period: "2023 - " + t("experience.current"),
      current: true,
      highlights: language === "es" ? [
        "Dashboard de monitoreo en tiempo real con Socket.io y Leaflet Maps",
        "Motor de Actualización Masiva procesando 50,000+ registros vía RabbitMQ & Lambda",
        "Ecosistema de QRs generando 10,000+ códigos encriptados por petición",
        "TraxiBot WhatsApp 24/7 con desarrollo acelerado por IA",
      ] : [
        "Real-time monitoring dashboard with Socket.io and Leaflet Maps",
        "Mass Update Engine processing 50,000+ records via RabbitMQ & Lambda",
        "QR Ecosystem generating 10,000+ encrypted codes per request",
        "TraxiBot WhatsApp 24/7 with AI-accelerated development",
      ],
    },
    {
      title: "Senior Frontend Developer",
      company: "PALO IT",
      location: "Ciudad de México",
      period: "2022 - 2023",
      highlights: language === "es" ? [
        "Desarrollo frontend en proyectos diversos con tecnologías modernas",
        "Soluciones de backend con Node.js, AWS Lambda, y Serverless",
        "Análisis de datos y visualización con SQL Server y Power BI",
      ] : [
        "Frontend development in diverse projects with modern technologies",
        "Backend solutions with Node.js, AWS Lambda, and Serverless",
        "Data analysis and visualization with SQL Server and Power BI",
      ],
    },
    {
      title: "Frontend Developer",
      company: "PALO IT",
      location: "Ciudad de México",
      period: "2021 - 2022",
      highlights: language === "es" ? [
        "Renovación del sitio web corporativo y aplicaciones internas",
        "Sistemas de gestión de citas y dashboards con Next.js",
      ] : [
        "Corporate website renovation and internal applications",
        "Appointment management systems and dashboards with Next.js",
      ],
    },
    {
      title: "UI/UX Developer",
      company: "Grupo Salinas",
      location: "Ciudad de México",
      period: "2019 - 2021",
      highlights: language === "es" ? [
        "Mantenimiento y mejora de aplicaciones clave",
        "Mejores prácticas en diseño y desarrollo UX/UI",
      ] : [
        "Maintenance and improvement of key applications",
        "Best practices in UX/UI design and development",
      ],
    },
    {
      title: "Front End Developer",
      company: "INEEL",
      location: "Cuernavaca, Morelos",
      period: "2017 - 2019",
      highlights: language === "es" ? [
        "Desarrollo del repositorio institucional",
        "Proyecto 'Unidad Central Maestra' para CFE, especializado en Angular",
      ] : [
        "Institutional repository development",
        "'Unidad Central Maestra' project for CFE, specializing in Angular",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/5 to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-4"
          >
            <div className="badge">
              <Briefcase className="w-3.5 h-3.5 text-green-400" />
              <span>{t("experience.badge")}</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#fafafa] mb-6"
          >
            {t("experience.title1")}
            <span className="gradient-text ml-3">{t("experience.title2")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#a1a1aa] max-w-2xl mx-auto"
          >
            {t("experience.description")}
          </motion.p>
        </div>

        {/* Timeline */}
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

        {/* Education note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 p-4 rounded-xl bg-[#18181b] border border-[#27272a]"
        >
          <h4 className="text-sm font-semibold text-[#fafafa] mb-2">{t("experience.education")}</h4>
          <div className="space-y-2 text-sm text-[#a1a1aa]">
            <p>
              <span className="text-[#fafafa]">{t("experience.masters")}</span> — UNIR, 2024
            </p>
            <p>
              <span className="text-[#fafafa]">{t("experience.degree")}</span> — Tecnológico de Zacatepec, 2017
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
  highlights: string[];
};

function TimelineItem({ experience, index, isLast, currentLabel }: { experience: ExperienceItem; index: number; isLast: boolean; currentLabel: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-12"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gradient-to-b from-[#27272a] to-transparent" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-1">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          experience.current 
            ? "border-blue-400 bg-blue-400/20" 
            : "border-[#27272a] bg-[#18181b]"
        }`}>
          {experience.current && (
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="group">
        <div className="flex flex-wrap items-start gap-2 mb-2">
          <h3 className="text-lg font-semibold text-[#fafafa]">
            {experience.title}
          </h3>
          {experience.current && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">
              {currentLabel}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-[#a1a1aa] mb-3">
          <span className="flex items-center gap-1.5 font-medium text-[#fafafa]">
            <Briefcase className="w-4 h-4" />
            {experience.company}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {experience.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {experience.period}
          </span>
        </div>

        <ul className="space-y-1.5">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#71717a] group-hover:text-[#a1a1aa] transition-colors">
              <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-blue-400/50" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
