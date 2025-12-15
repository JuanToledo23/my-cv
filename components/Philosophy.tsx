"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Scaling, Brain, Code2, Workflow } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Philosophy() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const { t } = useLanguage();

  const bentoItems = [
    {
      icon: Zap,
      title: t("bento.speed.title"),
      value: t("bento.speed.value"),
      description: t("bento.speed.description"),
      detail: t("bento.speed.detail"),
      color: "text-yellow-400",
      bgGlow: "bg-yellow-500/10",
      size: "col-span-1",
    },
    {
      icon: Shield,
      title: t("bento.quality.title"),
      value: t("bento.quality.value"),
      description: t("bento.quality.description"),
      detail: t("bento.quality.detail"),
      color: "text-green-400",
      bgGlow: "bg-green-500/10",
      size: "col-span-1",
    },
    {
      icon: Scaling,
      title: t("bento.scalability.title"),
      value: t("bento.scalability.value"),
      description: t("bento.scalability.description"),
      detail: t("bento.scalability.detail"),
      color: "text-blue-400",
      bgGlow: "bg-blue-500/10",
      size: "col-span-1",
    },
    {
      icon: Brain,
      title: t("bento.ai.title"),
      value: t("bento.ai.value"),
      description: t("bento.ai.description"),
      detail: t("bento.ai.detail"),
      color: "text-purple-400",
      bgGlow: "bg-purple-500/10",
      size: "col-span-1 md:col-span-2",
    },
    {
      icon: Workflow,
      title: t("bento.architecture.title"),
      value: t("bento.architecture.value"),
      description: t("bento.architecture.description"),
      detail: t("bento.architecture.detail"),
      color: "text-cyan-400",
      bgGlow: "bg-cyan-500/10",
      size: "col-span-1",
    },
  ];

  return (
    <section id="philosophy" className="py-24 md:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-4"
          >
            <div className="badge">
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              <span>{t("philosophy.badge")}</span>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#fafafa] mb-6"
          >
            {t("philosophy.title1")}
            <span className="gradient-text block md:inline md:ml-3">{t("philosophy.title2")}</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#a1a1aa] max-w-3xl mx-auto leading-relaxed"
          >
            {t("philosophy.description1")}{" "}
            <span className="text-[#fafafa] font-medium">{t("philosophy.description2")}</span>.{" "}
            {t("philosophy.description3")}{" "}
            <span className="text-blue-400 font-medium">{t("philosophy.description4")}</span>{" "}
            {t("philosophy.description5")}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-[#71717a] mt-4"
          >
            {t("philosophy.result")}{" "}
            <span className="text-[#fafafa] font-semibold">{t("philosophy.resultHighlight")}</span>
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {bentoItems.map((item, index) => (
            <BentoCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-[#27272a]">
            <Brain className="w-8 h-8 text-purple-400" />
            <p className="text-sm md:text-base text-[#a1a1aa]">
              {t("philosophy.quote")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BentoCard({ item, index }: { item: { icon: React.ElementType; title: string; value: string; description: string; detail: string; color: string; bgGlow: string; size: string }; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`${item.size} group relative`}
    >
      <div className="h-full p-6 md:p-8 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-all duration-300 card-glow overflow-hidden">
        {/* Glow effect */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 ${item.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl ${item.bgGlow} flex items-center justify-center mb-4`}>
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </div>
          
          {/* Value */}
          <div className={`text-3xl md:text-4xl font-bold ${item.color} mb-2`}>
            {item.value}
          </div>
          
          {/* Title & Description */}
          <h3 className="text-lg font-semibold text-[#fafafa] mb-1">{item.title}</h3>
          <p className="text-sm text-[#a1a1aa] mb-3">{item.description}</p>
          
          {/* Detail */}
          <p className="text-xs text-[#71717a] leading-relaxed">{item.detail}</p>
        </div>
      </div>
    </motion.div>
  );
}
