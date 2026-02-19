"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ChevronDown,
  Zap,
  Clock,
  TrendingUp,
  Server,
  Shield,
  Layers,
  Bot,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>("mass-update");
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const { t } = useLanguage();

  const projects = [
    {
      id: "traxibot",
      title: t("project3.title"),
      fromScratch: true,
      tech: ["Meta WhatsApp API", "Twilio", "AWS ECS", "Docker", "TypeScript", "PostgreSQL"],
      challenge: t("project3.challenge"),
      solution: t("project3.solution"),
      aiHighlight: t("project3.aiHighlight"),
      metrics: [
        { label: t("project3.metric1.label"), value: "<2s", icon: Zap },
        { label: t("project3.metric2.label"), value: "-40%", icon: TrendingUp },
        { label: t("project3.metric3.label"), value: "99.5%", icon: Server },
      ],
    },
    {
      id: "mass-update",
      title: t("project2.title"),
      fromScratch: true,
      tech: ["AWS Lambda", "RabbitMQ", "ExcelJS", "PostgreSQL", "MongoDB"],
      challenge: t("project2.challenge"),
      solution: t("project2.solution"),
      architecture: "Event-Driven + CQRS",
      metrics: [
        { label: t("project2.metric1.label"), value: "30→8min", icon: Clock },
        { label: t("project2.metric2.label"), value: "0%", icon: Shield },
        { label: t("project2.metric3.label"), value: "70%", icon: TrendingUp },
      ],
    },
    {
      id: "realtime",
      title: t("project1.title"),
      fromScratch: false,
      tech: ["Socket.io", "Redis", "React", "Leaflet", "MongoDB"],
      challenge: t("project1.challenge"),
      solution: t("project1.solution"),
      metrics: [
        { label: t("project1.metric1.label"), value: "<1s", icon: Zap },
        { label: t("project1.metric2.label"), value: "40%", icon: TrendingUp },
        { label: t("project1.metric3.label"), value: "500+", icon: Server },
      ],
    },
    {
      id: "qr-system",
      title: t("project4.title"),
      fromScratch: true,
      tech: ["AWS Lambda", "AES-256", "Sharp", "S3", "MongoDB"],
      challenge: t("project4.challenge"),
      solution: t("project4.solution"),
      metrics: [
        { label: t("project4.metric1.label"), value: "10K+", icon: Layers },
        { label: t("project4.metric2.label"), value: "95%", icon: Zap },
        { label: t("project4.metric3.label"), value: "-40%", icon: TrendingUp },
      ],
    },
  ];

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={titleRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="section-number">02</span>
            <div className="h-px flex-1 max-w-12 bg-[#2a2a2e]" />
            <span className="text-sm text-[#8a8a8a]">{t("projects.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-[#ececec] mb-4"
          >
            {t("projects.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#8a8a8a] max-w-xl"
          >
            {t("projects.description")}
          </motion.p>
        </div>

        <div className="space-y-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
              t={t}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.linkedin.com/in/juan-alberto-toledo-tello"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#8a8a8a] hover:text-emerald-400 transition-colors"
          >
            <span>{t("projects.viewMore")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

type Project = {
  id: string;
  title: string;
  fromScratch: boolean;
  tech: string[];
  challenge: string;
  solution: string;
  architecture?: string;
  aiHighlight?: string;
  metrics: { label: string; value: string; icon: React.ElementType }[];
};

function ProjectCard({
  project,
  isExpanded,
  onToggle,
  t,
}: {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
  t: (key: string) => string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`rounded-xl border transition-all duration-300 overflow-hidden ${
          isExpanded
            ? "bg-[#111113] border-emerald-500/20"
            : "bg-[#111113]/50 border-[#1c1c20] hover:border-[#2a2a2e]"
        }`}
      >
        <div onClick={onToggle} className="p-5 cursor-pointer">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-base font-semibold text-[#ececec]">{project.title}</h3>
                <span className="text-xs text-[#555] px-2 py-0.5 bg-[#1c1c20] rounded mono">Traxion</span>
                {project.fromScratch && (
                  <span className="text-xs text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20 mono">
                    {t("projects.fromScratch")}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, isExpanded ? undefined : 4).map((tech) => (
                  <span key={tech} className="text-xs px-2 py-0.5 rounded bg-[#1c1c20] text-[#8a8a8a]">
                    {tech}
                  </span>
                ))}
                {!isExpanded && project.tech.length > 4 && (
                  <span className="text-xs px-2 py-0.5 rounded bg-[#1c1c20] text-[#555]">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="p-1.5 rounded-lg hover:bg-[#1c1c20] transition-colors shrink-0"
            >
              <ChevronDown className="w-4 h-4 text-[#555]" />
            </motion.div>
          </div>

          <div className="flex gap-6 mt-4 pt-3 border-t border-[#1c1c20]">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex items-center gap-2">
                <metric.icon className="w-3.5 h-3.5 text-emerald-400/70" />
                <div>
                  <div className="text-sm font-semibold text-[#ececec] mono">{metric.value}</div>
                  <div className="text-xs text-[#555]">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="px-5 pb-5 space-y-3">
                <div className="p-4 rounded-lg bg-[#09090b] border border-[#1c1c20]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]" />
                    <span className="text-xs font-medium text-[#ececec] mono">{t("projects.challenge")}</span>
                  </div>
                  <p className="text-sm text-[#8a8a8a] leading-relaxed">{project.challenge}</p>
                </div>

                <div className="p-4 rounded-lg bg-[#09090b] border border-[#1c1c20]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-medium text-[#ececec] mono">{t("projects.solution")}</span>
                  </div>
                  <p className="text-sm text-[#8a8a8a] leading-relaxed">{project.solution}</p>
                </div>

                {project.architecture && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-[#8a8a8a]">
                      <span className="text-emerald-400 mono text-xs">{t("projects.architecture")}: </span>
                      {project.architecture}
                    </span>
                  </div>
                )}

                {project.aiHighlight && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                    <Bot className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-sm text-[#8a8a8a]">
                      <span className="text-amber-400 mono text-xs">AI: </span>
                      {project.aiHighlight}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
