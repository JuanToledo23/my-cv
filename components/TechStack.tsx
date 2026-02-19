"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function TechStack() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const { t } = useLanguage();

  const categories = [
    {
      title: t("tech.architecture"),
      items: ["AWS Lambda", "EventBridge", "ECS Fargate", "Serverless Framework", "Microservices", "Docker"],
    },
    {
      title: t("tech.backend"),
      items: ["Node.js", "TypeScript", "Python", "FastAPI", "NestJS", "Express"],
    },
    {
      title: t("tech.frontend"),
      items: ["React", "Next.js", "Vue 3", "Angular", "Tailwind CSS", "Material UI"],
    },
    {
      title: t("tech.databases"),
      items: ["PostgreSQL", "MongoDB", "Redis", "DocumentDB", "S3"],
    },
    {
      title: t("tech.realtime"),
      items: ["Socket.io", "RabbitMQ", "WebSockets", "EventBridge"],
    },
    {
      title: t("tech.aistack"),
      items: ["Claude / Cursor", "ChatGPT", "Gemini", "Groq API", "RAG", "LLM APIs"],
    },
  ];

  return (
    <section id="tech" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="section-number">04</span>
            <div className="h-px flex-1 max-w-12 bg-[#2a2a2e]" />
            <span className="text-sm text-[#8a8a8a]">{t("tech.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-[#ececec] mb-4"
          >
            {t("tech.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#8a8a8a] max-w-xl"
          >
            {t("tech.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="card p-5 h-full hover:border-emerald-500/15">
                <h3 className="text-sm font-semibold text-emerald-400 mb-3 mono uppercase tracking-wider">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-md bg-[#1c1c20] text-[#8a8a8a] hover:text-[#ececec] hover:bg-[#2a2a2e] transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
