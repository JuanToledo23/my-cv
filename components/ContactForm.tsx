"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send, Check, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { sendContactEmail } from "@/app/actions/contact";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const { t } = useLanguage();
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    const result = await sendContactEmail(data);

    if (result.success) {
      setFormState("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setFormState("idle"), 5000);
    } else {
      setFormState("error");
      setErrorMsg(result.error || "Something went wrong");
      setTimeout(() => setFormState("idle"), 4000);
    }
  }

  const serviceOptions = [
    { value: "web", label: t("contact.service.web") },
    { value: "landing", label: t("contact.service.landing") },
    { value: "saas", label: t("contact.service.saas") },
    { value: "consulting", label: t("contact.service.consulting") },
    { value: "other", label: t("contact.service.other") },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="section-number">05</span>
            <div className="h-px flex-1 max-w-12 bg-[#2a2a2e]" />
            <span className="text-sm text-[#8a8a8a]">{t("contact.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-[#ececec] mb-4"
          >
            {t("contact.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#8a8a8a] max-w-xl"
          >
            {t("contact.description")}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm text-[#8a8a8a] mb-1.5">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#111113] border border-[#1c1c20] text-[#ececec] text-sm placeholder-[#555] focus:outline-none focus:border-emerald-500/40 transition-colors"
                  placeholder={t("contact.name.placeholder")}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-[#8a8a8a] mb-1.5">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#111113] border border-[#1c1c20] text-[#ececec] text-sm placeholder-[#555] focus:outline-none focus:border-emerald-500/40 transition-colors"
                  placeholder={t("contact.email.placeholder")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm text-[#8a8a8a] mb-1.5">
                {t("contact.service")}
              </label>
              <select
                id="service"
                name="service"
                required
                className="w-full px-4 py-3 rounded-lg bg-[#111113] border border-[#1c1c20] text-[#ececec] text-sm focus:outline-none focus:border-emerald-500/40 transition-colors appearance-none"
              >
                <option value="" disabled>
                  {t("contact.service.placeholder")}
                </option>
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.label}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-[#8a8a8a] mb-1.5">
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-[#111113] border border-[#1c1c20] text-[#ececec] text-sm placeholder-[#555] focus:outline-none focus:border-emerald-500/40 transition-colors resize-none"
                placeholder={t("contact.message.placeholder")}
              />
            </div>

            <button
              type="submit"
              disabled={formState === "sending"}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                formState === "success"
                  ? "bg-emerald-500 text-white"
                  : formState === "error"
                  ? "bg-[#f43f5e] text-white"
                  : "bg-emerald-600 text-white hover:bg-emerald-500"
              } disabled:opacity-60`}
            >
              {formState === "sending" && (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t("contact.sending")}
                </>
              )}
              {formState === "success" && (
                <>
                  <Check className="w-4 h-4" />
                  {t("contact.sent")}
                </>
              )}
              {formState === "error" && (
                <>
                  <AlertCircle className="w-4 h-4" />
                  {errorMsg}
                </>
              )}
              {formState === "idle" && (
                <>
                  <Send className="w-4 h-4" />
                  {t("contact.submit")}
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-[#ececec] mb-4 mono uppercase tracking-wider">
                {t("contact.info")}
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:johntoledot@gmail.com"
                    className="flex items-center gap-3 text-sm text-[#8a8a8a] hover:text-emerald-400 transition-colors"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    johntoledot@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+527774939562"
                    className="flex items-center gap-3 text-sm text-[#8a8a8a] hover:text-emerald-400 transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    +52 777 493 9562
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#8a8a8a]">
                  <MapPin className="w-4 h-4 shrink-0" />
                  Ciudad de México, México
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-sm font-semibold text-[#ececec] mb-4 mono uppercase tracking-wider">
                {t("contact.social")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.linkedin.com/in/juan-alberto-toledo-tello"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#8a8a8a] hover:text-emerald-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/JuanToledo23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#8a8a8a] hover:text-emerald-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 text-sm font-medium">
                  {t("contact.available")}
                </span>
              </div>
              <p className="text-xs text-[#555]">{t("contact.availableDescription")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
