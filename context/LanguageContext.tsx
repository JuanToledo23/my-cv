"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  es: {
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.experience": "Experiencia",
    "nav.tech": "Tech Stack",
    "nav.contact": "Hablemos",

    "hero.available": "Disponible para proyectos",
    "hero.headline1": "Construyo productos digitales",
    "hero.headline2": "que generan resultados.",
    "hero.description": "Arquitecto de Soluciones & Ingeniero Full Stack Senior. Desarrollo web a medida, landing pages, micro-SaaS y consultoría técnica. 9+ años de experiencia usando IA para entregar 60% más rápido.",
    "hero.cta.primary": "Solicitar cotización",
    "hero.cta.secondary": "Ver proyectos",
    "hero.stat.years": "años",
    "hero.stat.services": "desde cero",
    "hero.stat.commits": "commits",

    "services.badge": "Servicios",
    "services.title": "Soluciones a tu medida",
    "services.description": "Desde una landing page hasta un micro-SaaS completo. Te acompaño en todo el proceso: diseño, desarrollo, despliegue y mantenimiento.",
    "services.web.title": "Desarrollo Web a Medida",
    "services.web.description": "Aplicaciones web complejas con arquitectura escalable. Dashboards, plataformas, sistemas internos.",
    "services.landing.title": "Landing Pages de Alto Impacto",
    "services.landing.description": "Sitios optimizados para conversión. Rápidos, responsivos y con SEO integrado desde el primer día.",
    "services.saas.title": "Micro-SaaS",
    "services.saas.description": "Productos digitales end-to-end: autenticación, pagos, base de datos, deploy. Tu idea en producción.",
    "services.consulting.title": "Consultoría Técnica",
    "services.consulting.description": "Arquitectura de soluciones, migración a la nube, integración de IA, optimización de rendimiento.",
    "services.cta": "Solicitar cotización",

    "projects.badge": "Casos de Estudio",
    "projects.title": "Arquitectura en acción",
    "projects.description": "Sistemas reales diseñados para escala, confiabilidad y rendimiento. Todos en producción.",
    "projects.challenge": "Desafío",
    "projects.solution": "Solución",
    "projects.architecture": "Arquitectura",
    "projects.fromScratch": "Desde cero",
    "projects.viewMore": "Ver más en LinkedIn",

    "project1.title": "Monitor de Tráfico en Tiempo Real",
    "project1.challenge": "Operadores de transporte necesitaban ver cientos de vehículos en tiempo real, detectar retrasos y monitorear abordajes en rutas de todo México.",
    "project1.solution": "Dashboard con WebSockets (Socket.io + Redis) que muestra posición GPS cada 5 segundos, comparación de ruta programada vs real, y conteo de abordajes por viaje.",
    "project1.metric1.label": "Latencia",
    "project1.metric2.label": "Puntualidad",
    "project1.metric3.label": "Vehículos",

    "project2.title": "Motor de Actualización Masiva",
    "project2.challenge": "Administradores necesitaban actualizar miles de viajes simultáneamente con archivos Excel de 50,000+ filas. El sistema anterior colapsaba con timeouts.",
    "project2.solution": "Procesamiento en background: Excel → RabbitMQ encola → Lambda procesa en batches → actualiza 5 bases de datos con transacciones ACID → notifica progreso en tiempo real.",
    "project2.metric1.label": "Procesamiento",
    "project2.metric2.label": "Timeouts",
    "project2.metric3.label": "Reducción costo",

    "project3.title": "TraxiBot — WhatsApp 24/7",
    "project3.challenge": "Miles de empleados necesitaban su pase QR para el transporte corporativo. RRHH distribuía QRs manualmente, generando cuellos de botella constantes.",
    "project3.solution": "Chatbot WhatsApp 24/7: empleado escribe → Bot valida empresa (búsqueda fuzzy) → valida empleado → genera QR cifrado → envía imagen al instante. Sin intervención humana.",
    "project3.aiHighlight": "Usé Claude para diseñar la lógica conversacional en 60% menos tiempo",
    "project3.metric1.label": "Respuesta",
    "project3.metric2.label": "Tickets",
    "project3.metric3.label": "Uptime",

    "project4.title": "Ecosistema de QRs Seguros",
    "project4.challenge": "Empresas nuevas necesitaban miles de pases QR cifrados para todos sus empleados. Procesar 10,000+ QRs en Lambda causaba errores de memoria.",
    "project4.solution": "Lambda procesa en batches de 50 con garbage collection → genera imágenes QR con Sharp → comprime en ZIP via streams → sube a S3 → devuelve URL de descarga.",
    "project4.metric1.label": "QRs/petición",
    "project4.metric2.label": "Velocidad",
    "project4.metric3.label": "Memoria",

    "experience.badge": "Experiencia",
    "experience.title": "Trayectoria profesional",
    "experience.description": "9+ años transformando operaciones manuales en ecosistemas tecnológicos de alto rendimiento.",
    "experience.current": "Actual",
    "experience.education": "Educación",
    "experience.masters": "Máster en Ingeniería Web",
    "experience.degree": "Ingeniería en Sistemas",

    "tech.badge": "Tech Stack",
    "tech.title": "Herramientas del oficio",
    "tech.description": "Un enfoque políglota centrado en resolver problemas, no en frameworks.",
    "tech.architecture": "Arquitectura",
    "tech.backend": "Backend",
    "tech.databases": "Bases de datos",
    "tech.realtime": "Tiempo real",
    "tech.frontend": "Frontend",
    "tech.aistack": "IA / LLM",

    "contact.badge": "Contacto",
    "contact.title": "Hablemos de tu proyecto",
    "contact.description": "Cuéntame qué necesitas y te respondo en menos de 24 horas con una propuesta personalizada.",
    "contact.name": "Nombre",
    "contact.name.placeholder": "Tu nombre",
    "contact.email": "Email",
    "contact.email.placeholder": "tu@email.com",
    "contact.service": "Tipo de servicio",
    "contact.service.placeholder": "Selecciona un servicio",
    "contact.service.web": "Desarrollo Web a Medida",
    "contact.service.landing": "Landing Page",
    "contact.service.saas": "Micro-SaaS",
    "contact.service.consulting": "Consultoría Técnica",
    "contact.service.other": "Otro",
    "contact.message": "Mensaje",
    "contact.message.placeholder": "Describe tu proyecto o necesidad...",
    "contact.submit": "Enviar mensaje",
    "contact.sending": "Enviando...",
    "contact.sent": "Mensaje enviado",
    "contact.info": "Contacto directo",
    "contact.social": "Redes",
    "contact.available": "Disponible para proyectos",
    "contact.availableDescription": "Freelance, consultoría o roles corporativos con enfoque en IA y arquitectura.",

    "footer.builtWith": "Hecho con Next.js e IA.",
  },
  en: {
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.tech": "Tech Stack",
    "nav.contact": "Let's Talk",

    "hero.available": "Available for projects",
    "hero.headline1": "I build digital products",
    "hero.headline2": "that deliver results.",
    "hero.description": "Solutions Architect & Senior Full Stack Engineer. Custom web development, landing pages, micro-SaaS and technical consulting. 9+ years of experience using AI to deliver 60% faster.",
    "hero.cta.primary": "Get a Quote",
    "hero.cta.secondary": "View Projects",
    "hero.stat.years": "years",
    "hero.stat.services": "from scratch",
    "hero.stat.commits": "commits",

    "services.badge": "Services",
    "services.title": "Solutions tailored to you",
    "services.description": "From a landing page to a full micro-SaaS. I guide you through the entire process: design, development, deployment and maintenance.",
    "services.web.title": "Custom Web Development",
    "services.web.description": "Complex web applications with scalable architecture. Dashboards, platforms, internal systems.",
    "services.landing.title": "High-Impact Landing Pages",
    "services.landing.description": "Conversion-optimized sites. Fast, responsive, with SEO baked in from day one.",
    "services.saas.title": "Micro-SaaS",
    "services.saas.description": "End-to-end digital products: auth, payments, database, deploy. Your idea in production.",
    "services.consulting.title": "Technical Consulting",
    "services.consulting.description": "Solutions architecture, cloud migration, AI integration, performance optimization.",
    "services.cta": "Get a Quote",

    "projects.badge": "Case Studies",
    "projects.title": "Architecture in action",
    "projects.description": "Real-world systems designed for scale, reliability and performance. All in production.",
    "projects.challenge": "Challenge",
    "projects.solution": "Solution",
    "projects.architecture": "Architecture",
    "projects.fromScratch": "From scratch",
    "projects.viewMore": "See more on LinkedIn",

    "project1.title": "Real-Time Traffic Monitor",
    "project1.challenge": "Transport operators needed to see hundreds of vehicles in real-time, detect delays and monitor boardings across routes throughout Mexico.",
    "project1.solution": "Dashboard with WebSockets (Socket.io + Redis) showing live GPS every 5 seconds, scheduled vs actual route comparison, and boarding count per trip.",
    "project1.metric1.label": "Latency",
    "project1.metric2.label": "Punctuality",
    "project1.metric3.label": "Vehicles",

    "project2.title": "Mass Update Engine",
    "project2.challenge": "Administrators needed to update thousands of trips simultaneously with 50,000+ row Excel files. The previous system crashed with timeouts.",
    "project2.solution": "Background processing: Excel → RabbitMQ queues → Lambda processes in batches → updates 5 databases with ACID transactions → real-time progress notification.",
    "project2.metric1.label": "Processing",
    "project2.metric2.label": "Timeouts",
    "project2.metric3.label": "Cost reduction",

    "project3.title": "TraxiBot — WhatsApp 24/7",
    "project3.challenge": "Thousands of employees needed their QR pass for corporate transport. HR distributed QRs manually, creating constant bottlenecks.",
    "project3.solution": "24/7 WhatsApp chatbot: employee texts → Bot validates company (fuzzy search) → validates employee → generates encrypted QR → sends image instantly. Zero human intervention.",
    "project3.aiHighlight": "Used Claude to design conversational logic in 60% less time",
    "project3.metric1.label": "Response",
    "project3.metric2.label": "Tickets",
    "project3.metric3.label": "Uptime",

    "project4.title": "Secure QR Ecosystem",
    "project4.challenge": "New companies needed thousands of encrypted QR passes for all employees. Processing 10,000+ QRs in Lambda caused memory errors.",
    "project4.solution": "Lambda processes in batches of 50 with garbage collection → generates QR images with Sharp → compresses to ZIP via streams → uploads to S3 → returns download URL.",
    "project4.metric1.label": "QRs/request",
    "project4.metric2.label": "Speed",
    "project4.metric3.label": "Memory",

    "experience.badge": "Experience",
    "experience.title": "Career journey",
    "experience.description": "9+ years transforming manual operations into high-performance tech ecosystems.",
    "experience.current": "Current",
    "experience.education": "Education",
    "experience.masters": "Master's in Web Engineering",
    "experience.degree": "Systems Engineering",

    "tech.badge": "Tech Stack",
    "tech.title": "Tools of the trade",
    "tech.description": "A polyglot approach focused on solving problems, not frameworks.",
    "tech.architecture": "Architecture",
    "tech.backend": "Backend",
    "tech.databases": "Databases",
    "tech.realtime": "Real-Time",
    "tech.frontend": "Frontend",
    "tech.aistack": "AI / LLM",

    "contact.badge": "Contact",
    "contact.title": "Let's talk about your project",
    "contact.description": "Tell me what you need and I'll respond within 24 hours with a personalized proposal.",
    "contact.name": "Name",
    "contact.name.placeholder": "Your name",
    "contact.email": "Email",
    "contact.email.placeholder": "you@email.com",
    "contact.service": "Service type",
    "contact.service.placeholder": "Select a service",
    "contact.service.web": "Custom Web Development",
    "contact.service.landing": "Landing Page",
    "contact.service.saas": "Micro-SaaS",
    "contact.service.consulting": "Technical Consulting",
    "contact.service.other": "Other",
    "contact.message": "Message",
    "contact.message.placeholder": "Describe your project or need...",
    "contact.submit": "Send message",
    "contact.sending": "Sending...",
    "contact.sent": "Message sent",
    "contact.info": "Direct contact",
    "contact.social": "Social",
    "contact.available": "Available for projects",
    "contact.availableDescription": "Freelance, consulting or corporate roles focused on AI and architecture.",

    "footer.builtWith": "Built with Next.js & AI.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "es" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
    setIsHydrated(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const currentLanguage = isHydrated ? language : "es";

  const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language: currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
