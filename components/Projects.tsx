"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Activity,
  Database,
  MessageSquare,
  QrCode,
  RefreshCw,
  ChevronDown,
  Zap,
  Clock,
  TrendingUp,
  Server,
  ArrowRight,
  Bot,
  Layers,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>("mass-update");
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const { t } = useLanguage();

  const projects = [
    {
      id: "realtime",
      title: t("project1.title"),
      subtitle: "Traxi",
      icon: Activity,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/10",
      tech: ["Socket.io", "Redis", "Express", "Google Maps API", "MongoDB"],
      challenge: t("project1.challenge"),
      solution: t("project1.solution"),
      metrics: [
        { label: t("project1.metric1.label"), value: "<1s", icon: Zap },
        { label: t("project1.metric2.label"), value: "40%", icon: TrendingUp },
        { label: t("project1.metric3.label"), value: "500+", icon: Server },
      ],
    },
    {
      id: "mass-update",
      title: t("project2.title"),
      subtitle: "Traxi",
      icon: Database,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
      tech: ["AWS Lambda", "RabbitMQ", "ExcelJS", "PostgreSQL", "MongoDB"],
      challenge: t("project2.challenge"),
      solution: t("project2.solution"),
      architecture: "Event-Driven + CQRS",
      metrics: [
        {
          label: t("project2.metric1.label"),
          value: "30min → 8min",
          icon: Clock,
        },
        { label: t("project2.metric2.label"), value: "0%", icon: Shield },
        { label: t("project2.metric3.label"), value: "70%", icon: TrendingUp },
      ],
    },
    {
      id: "traxibot",
      title: t("project3.title"),
      subtitle: "Traxi",
      icon: MessageSquare,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
      tech: [
        "BuilderBot",
        "Meta API",
        "AWS ECS Fargate",
        "TypeScript",
        "PostgreSQL",
        "S3",
      ],
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
      id: "qr-system",
      title: t("project4.title"),
      subtitle: "Traxi",
      icon: QrCode,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/10",
      tech: ["ZIP Lambda", "AES-256", "AWS Secrets Manager", "Sharp", "S3"],
      challenge: t("project4.challenge"),
      solution: t("project4.solution"),
      metrics: [
        { label: t("project4.metric1.label"), value: "10,000+", icon: Layers },
        { label: t("project4.metric2.label"), value: "95%", icon: Zap },
        { label: t("project4.metric3.label"), value: "-40%", icon: TrendingUp },
      ],
    },
    {
      id: "bustrax",
      title: t("project5.title"),
      subtitle: "Traxi",
      icon: RefreshCw,
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/10",
      tech: ["AWS EventBridge", "Lambda", "MongoDB", "PostgreSQL"],
      challenge: t("project5.challenge"),
      solution: t("project5.solution"),
      architecture: "Orchestrator + 5 Lambdas",
      metrics: [
        {
          label: t("project5.metric1.label"),
          value: "30min → 5min",
          icon: Clock,
        },
        { label: t("project5.metric2.label"), value: "98%", icon: TrendingUp },
        { label: t("project5.metric3.label"), value: "80%", icon: TrendingUp },
      ],
    },
  ];

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-4"
          >
            <div className="badge">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>{t("projects.badge")}</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#fafafa] mb-6"
          >
            {t("projects.title1")}
            <span className="gradient-text ml-3">{t("projects.title2")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#a1a1aa] max-w-2xl mx-auto"
          >
            {t("projects.description")}
          </motion.p>
        </div>

        {/* Project cards */}
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() =>
                setExpandedId(expandedId === project.id ? null : project.id)
              }
              t={t}
            />
          ))}
        </div>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.linkedin.com/in/juan-alberto-toledo-tello"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
          >
            <span>{t("projects.viewMore")}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

type Project = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <div
        className={`relative rounded-2xl border transition-all duration-500 overflow-hidden ${
          isExpanded
            ? "bg-[#18181b] border-blue-500/30 shadow-lg shadow-blue-500/10"
            : "bg-[#18181b]/50 border-[#27272a] hover:border-[#3f3f46] card-glow"
        }`}
      >
        {/* Card Header */}
        <div onClick={onToggle} className="p-6 cursor-pointer">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${project.iconBg} shrink-0`}>
              <project.icon className={`w-6 h-6 ${project.iconColor}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-[#fafafa] truncate">
                  {project.title}
                </h3>
                <span className="text-xs text-[#71717a] px-2 py-0.5 bg-[#27272a] rounded-full shrink-0">
                  {project.subtitle}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tech
                  .slice(0, isExpanded ? undefined : 4)
                  .map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded bg-[#27272a] text-[#a1a1aa]"
                    >
                      {tech}
                    </span>
                  ))}
                {!isExpanded && project.tech.length > 4 && (
                  <span className="text-xs px-2 py-0.5 rounded bg-[#27272a] text-[#71717a]">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-lg hover:bg-[#27272a] transition-colors"
            >
              <ChevronDown className="w-5 h-5 text-[#71717a]" />
            </motion.div>
          </div>

          {/* Quick metrics */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-[#27272a]">
            {project.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="flex items-center gap-2">
                <metric.icon className={`w-4 h-4 ${project.iconColor}`} />
                <div>
                  <div className="text-sm font-semibold text-[#fafafa]">
                    {metric.value}
                  </div>
                  <div className="text-xs text-[#71717a]">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 pb-6 space-y-4">
                <div className="p-4 rounded-xl bg-[#0f0f11] border border-[#27272a]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm font-medium text-[#fafafa]">
                      {t("projects.challenge")}
                    </span>
                  </div>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0f0f11] border border-[#27272a]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm font-medium text-[#fafafa]">
                      {t("projects.solution")}
                    </span>
                  </div>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                {project.architecture && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-950/20 border border-blue-500/20">
                    <Layers className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <span className="text-xs text-blue-400 font-medium">
                        {t("projects.architecture")}:
                      </span>
                      <span className="text-sm text-[#fafafa] ml-2">
                        {project.architecture}
                      </span>
                    </div>
                  </div>
                )}

                {project.aiHighlight && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-950/20 border border-purple-500/20">
                    <Bot className="w-5 h-5 text-purple-400 shrink-0" />
                    <div>
                      <span className="text-xs text-purple-400 font-medium">
                        {t("projects.aiHighlight")}:
                      </span>
                      <span className="text-sm text-[#fafafa] ml-2">
                        {project.aiHighlight}
                      </span>
                    </div>
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
