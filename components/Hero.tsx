"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-[#1c1c20]/40"
            style={{ top: `${(i + 1) * 16}%` }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-[#1c1c20]/30"
            style={{ left: `${(i + 1) * 12}%` }}
          />
        ))}
        {[2, 4].map((h) =>
          [3, 6].map((v) => (
            <div
              key={`dot-${h}-${v}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500/20"
              style={{ top: `${h * 16}%`, left: `${v * 12}%`, transform: "translate(-50%, -50%)" }}
            />
          ))
        )}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 w-full">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm text-emerald-400 font-medium">
                {t("hero.available")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              <span className="text-[#ececec]">{t("hero.headline1")}</span>
              <br />
              <span className="text-emerald-400">{t("hero.headline2")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#8a8a8a] max-w-xl mb-8 leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a href="#contact" className="btn-primary inline-flex items-center justify-center gap-2">
                {t("hero.cta.primary")}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#projects" className="btn-outline inline-flex items-center justify-center gap-2">
                {t("hero.cta.secondary")}
                <ArrowDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="p-6 rounded-xl bg-[#111113] border border-[#1c1c20]">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs text-[#555] mono">metrics.ts</span>
              </div>

              <div className="space-y-4 mono text-sm">
                <div>
                  <span className="text-[#555]">const </span>
                  <span className="text-emerald-400">experience</span>
                  <span className="text-[#555]"> = </span>
                  <span className="text-amber-300">&quot;9+ years&quot;</span>
                </div>
                <div>
                  <span className="text-[#555]">const </span>
                  <span className="text-emerald-400">servicesBuilt</span>
                  <span className="text-[#555]"> = </span>
                  <span className="text-amber-300">6</span>
                  <span className="text-[#555]"> </span>
                  <span className="text-[#444]">// from scratch</span>
                </div>
                <div>
                  <span className="text-[#555]">const </span>
                  <span className="text-emerald-400">commits</span>
                  <span className="text-[#555]"> = </span>
                  <span className="text-amber-300">1_400</span>
                  <span className="text-[#555]">+</span>
                </div>
                <div>
                  <span className="text-[#555]">const </span>
                  <span className="text-emerald-400">repos</span>
                  <span className="text-[#555]"> = </span>
                  <span className="text-amber-300">27</span>
                  <span className="text-[#555]"> </span>
                  <span className="text-[#444]">// microservices</span>
                </div>
                <div className="pt-2 border-t border-[#1c1c20]">
                  <span className="text-[#555]">const </span>
                  <span className="text-emerald-400">aiAcceleration</span>
                  <span className="text-[#555]"> = </span>
                  <span className="text-amber-300">&quot;60% faster&quot;</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { value: "9+", label: t("hero.stat.years") },
                { value: "6", label: t("hero.stat.services") },
                { value: "1.4K+", label: t("hero.stat.commits") },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-3 rounded-lg bg-[#111113] border border-[#1c1c20]"
                >
                  <div className="text-lg font-bold text-emerald-400 mono">{stat.value}</div>
                  <div className="text-xs text-[#555]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-[#2a2a2e] flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-emerald-400"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
