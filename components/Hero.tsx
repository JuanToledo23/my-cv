"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Cpu, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Animated particles for the background
function Particle({ delay, duration, x, size }: { delay: number; duration: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-blue-500/20"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: -20,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [-20, -800],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// Animated grid lines
function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
          style={{ top: `${(i + 1) * 10}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 1.5 }}
        />
      ))}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute h-full w-px bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"
          style={{ left: `${(i + 1) * 10}%` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 1.5 }}
        />
      ))}
    </div>
  );
}

// Glowing orbs
function GlowingOrbs() {
  return (
    <>
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] bg-blue-600/20"
        style={{ top: "10%", left: "10%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] bg-purple-600/15"
        style={{ bottom: "20%", right: "15%" }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] bg-cyan-500/10"
        style={{ top: "40%", right: "30%" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
    </>
  );
}

export default function Hero() {
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; duration: number; x: number; size: number }>>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      x: Math.random() * 100,
      size: 2 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-background" />
      <GridLines />
      <GlowingOrbs />
      
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="badge">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{t("hero.badge")}</span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="block text-[#fafafa]">{t("hero.headline1")}</span>
          <span className="block gradient-text mt-2">{t("hero.headline2")}</span>
          <span className="block text-[#fafafa] mt-2">{t("hero.headline3")}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-8"
        >
          <span className="text-[#fafafa] font-medium">Juan Alberto Toledo Tello</span>
          <span className="mx-2">•</span>
          {t("hero.role")}
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mb-10"
        >
          {[
            { icon: Cpu, label: t("hero.stat1.label"), sublabel: t("hero.stat1.sublabel") },
            { icon: Bot, label: t("hero.stat2.label"), sublabel: t("hero.stat2.sublabel") },
            { icon: Sparkles, label: t("hero.stat3.label"), sublabel: t("hero.stat3.sublabel") },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#18181b] border border-[#27272a]">
                <stat.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-[#fafafa] font-semibold">{stat.label}</div>
                <div className="text-xs text-[#a1a1aa]">{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            {t("hero.cta.primary")}
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#philosophy"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#27272a] text-[#fafafa] hover:bg-[#18181b] transition-all"
          >
            {t("hero.cta.secondary")}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[#27272a] flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
