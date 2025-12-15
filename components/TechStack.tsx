"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Cloud,
  Server,
  Database,
  Cpu,
  Radio,
  Bot,
  Code2,
  Boxes,
  Workflow,
  Gauge,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const marqueeItems = [
  "AWS Lambda",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "RabbitMQ",
  "Socket.io",
  "React",
  "Next.js",
  "Docker",
  "GitHub Actions",
  "Claude AI",
  "S3",
  "EventBridge",
  "ECS Fargate",
  "Redis",
  "Python",
  "REST APIs",
];

function Marquee() {
  return (
    <div className="relative overflow-hidden py-8">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee">
        {marqueeItems.map((item, i) => (
          <div key={`first-${i}`} className="flex items-center gap-3 px-6 shrink-0">
            <Sparkles className="w-4 h-4 text-blue-400/50" />
            <span className="text-lg font-medium text-[#3f3f46] whitespace-nowrap">{item}</span>
          </div>
        ))}
        {marqueeItems.map((item, i) => (
          <div key={`second-${i}`} className="flex items-center gap-3 px-6 shrink-0">
            <Sparkles className="w-4 h-4 text-blue-400/50" />
            <span className="text-lg font-medium text-[#3f3f46] whitespace-nowrap">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const { t } = useLanguage();

  const techCategories = [
    {
      title: t("tech.architecture"),
      icon: Cloud,
      iconColor: "text-blue-400",
      items: ["AWS Serverless", "Microservices", "Event-Driven", "ECS Fargate"],
    },
    {
      title: t("tech.backend"),
      icon: Server,
      iconColor: "text-green-400",
      items: ["Node.js", "TypeScript", "Python", "REST APIs"],
    },
    {
      title: t("tech.databases"),
      icon: Database,
      iconColor: "text-purple-400",
      items: ["PostgreSQL", "MongoDB", "Redis", "DocumentDB"],
    },
    {
      title: t("tech.realtime"),
      icon: Radio,
      iconColor: "text-cyan-400",
      items: ["Socket.io", "RabbitMQ", "EventBridge", "WebSockets"],
    },
    {
      title: t("tech.frontend"),
      icon: Code2,
      iconColor: "text-orange-400",
      items: ["React", "Next.js", "Vue", "Angular"],
    },
    {
      title: t("tech.aistack"),
      icon: Bot,
      iconColor: "text-pink-400",
      items: ["Claude 3.5", "Cursor AI", "ChatGPT", "GitHub Copilot"],
    },
  ];

  const skills = [
    { icon: Boxes, label: t("skills.distributed"), color: "text-blue-400" },
    { icon: Workflow, label: t("skills.eventdriven"), color: "text-purple-400" },
    { icon: Gauge, label: t("skills.performance"), color: "text-green-400" },
    { icon: Cpu, label: t("skills.serverless"), color: "text-cyan-400" },
  ];

  return (
    <section id="tech" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-4"
          >
            <div className="badge">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t("tech.badge")}</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#fafafa] mb-6"
          >
            {t("tech.title1")}
            <span className="gradient-text ml-3">{t("tech.title2")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#a1a1aa] max-w-2xl mx-auto"
          >
            {t("tech.description")}
          </motion.p>
        </div>

        {/* Marquee */}
        <Marquee />

        {/* Tech grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {techCategories.map((category, index) => (
            <TechCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Skills highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-all"
            >
              <skill.icon className={`w-4 h-4 ${skill.color}`} />
              <span className="text-sm text-[#a1a1aa]">{skill.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TechCard({ category, index }: { category: { title: string; icon: React.ElementType; iconColor: string; items: string[] }; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="h-full p-5 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-all duration-300 card-glow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#27272a]/50">
            <category.icon className={`w-5 h-5 ${category.iconColor}`} />
          </div>
          <h3 className="font-semibold text-[#fafafa]">{category.title}</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {category.items.map((item) => (
            <span
              key={item}
              className="text-xs px-2.5 py-1 rounded-md bg-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#3f3f46] transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
