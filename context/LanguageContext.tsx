"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navigation
    "nav.philosophy": "Filosofía",
    "nav.projects": "Proyectos",
    "nav.experience": "Experiencia",
    "nav.tech": "Tech Stack",
    "nav.contact": "Contacto",

    // Hero
    "hero.badge": "Desarrollo Aumentado por IA",
    "hero.headline1": "Arquitectando",
    "hero.headline2": "Sistemas de Alto Rendimiento",
    "hero.headline3": "con Ingeniería Aumentada por IA",
    "hero.role": "Senior Full Stack Engineer & Solutions Architect",
    "hero.stat1.label": "9+ Años",
    "hero.stat1.sublabel": "Ingeniería",
    "hero.stat2.label": "60%",
    "hero.stat2.sublabel": "Aceleración con IA",
    "hero.stat3.label": "100K+",
    "hero.stat3.sublabel": "Registros/Semana",
    "hero.cta.primary": "Ver Casos de Estudio",
    "hero.cta.secondary": "La Ventaja IA",

    // Philosophy
    "philosophy.badge": "Filosofía de Desarrollo",
    "philosophy.title1": "La Ventaja IA",
    "philosophy.title2": "Ingeniería de Alta Velocidad",
    "philosophy.description1": "Utilizo LLMs no para reemplazar el código, sino para",
    "philosophy.description2": "abstraer sintaxis y boilerplate",
    "philosophy.description3": "Esto me permite dedicar",
    "philosophy.description4": "90% de mi capacidad cognitiva",
    "philosophy.description5": "a Arquitectura de Alto Nivel, Seguridad y Lógica de Negocio Compleja.",
    "philosophy.result": "¿El resultado?",
    "philosophy.resultHighlight": "Soluciones robustas y políglotas entregadas 3x más rápido.",
    "philosophy.quote": "\"Usando Claude AI como partner de desarrollo\" logré 30% de reducción en tiempo de desarrollo de features complejas.",

    // Bento items
    "bento.speed.title": "Velocidad",
    "bento.speed.value": "3x",
    "bento.speed.description": "Entrega más rápida que desarrollo tradicional",
    "bento.speed.detail": "IA abstrae sintaxis, permitiendo enfoque en arquitectura",
    "bento.quality.title": "Calidad",
    "bento.quality.value": "98%",
    "bento.quality.description": "Tasa de éxito en sistemas de producción",
    "bento.quality.detail": "Manejo robusto de errores y testing comprehensivo",
    "bento.scalability.title": "Escalabilidad",
    "bento.scalability.value": "100K+",
    "bento.scalability.description": "Registros procesados semanalmente",
    "bento.scalability.detail": "Arquitecturas event-driven que escalan automáticamente",
    "bento.ai.title": "Integración IA",
    "bento.ai.value": "90%",
    "bento.ai.description": "Carga cognitiva en diseño de alto nivel",
    "bento.ai.detail": "LLMs manejan boilerplate, yo me enfoco en lógica de negocio",
    "bento.architecture.title": "Arquitectura",
    "bento.architecture.value": "Event-Driven",
    "bento.architecture.description": "Serverless, microservicios, tiempo real",
    "bento.architecture.detail": "Expertise en AWS Lambda, RabbitMQ, Socket.io",

    // Projects
    "projects.badge": "Casos de Estudio",
    "projects.title1": "Arquitectura",
    "projects.title2": "en Acción",
    "projects.description": "Sistemas reales diseñados para escala, confiabilidad y rendimiento. Haz clic para explorar los detalles técnicos.",
    "projects.challenge": "Desafío",
    "projects.solution": "Solución",
    "projects.architecture": "Arquitectura",
    "projects.aiHighlight": "Highlight IA",
    "projects.viewMore": "Ver experiencia completa en LinkedIn",

    // Project 1
    "project1.title": "Centro de Control de Tráfico en Tiempo Real",
    "project1.challenge": "Los operadores de transporte corporativo necesitaban ver en tiempo real la ubicación de cientos de vehículos, detectar retrasos y monitorear abordajes de pasajeros en rutas de todo México.",
    "project1.solution": "Dashboard de monitoreo operativo con WebSockets (Socket.io + Redis pub/sub) que muestra posición GPS en vivo cada 5 segundos, comparación visual de ruta programada vs. ruta real recorrida, y conteo de abordajes por viaje.",
    "project1.metric1.label": "Latencia WebSocket",
    "project1.metric2.label": "Mejora Puntualidad",
    "project1.metric3.label": "Vehículos Monitoreados",

    // Project 2
    "project2.title": "Sistema de Actualización Masiva de Viajes",
    "project2.challenge": "Los administradores de operaciones necesitaban actualizar miles de viajes simultáneamente (cambios de conductor, vehículo, horarios) subiendo archivos Excel con 50,000+ filas. El sistema anterior colapsaba con timeouts.",
    "project2.solution": "Sistema de carga de Excel que procesa en background: el admin sube el archivo → RabbitMQ encola el trabajo → Lambda procesa en batches de 10 → actualiza 5 bases de datos PostgreSQL con transacciones ACID → notifica progreso en tiempo real via MongoDB.",
    "project2.metric1.label": "Tiempo de Proceso",
    "project2.metric2.label": "Timeouts",
    "project2.metric3.label": "Reducción de Costos",

    // Project 3
    "project3.title": "TraxiBot (WhatsApp Enterprise)",
    "project3.challenge": "Miles de empleados de empresas cliente necesitaban obtener su pase QR para acceder al transporte corporativo. RRHH distribuía QRs manualmente uno por uno, generando cuellos de botella y tickets de soporte constantes.",
    "project3.solution": "Chatbot de WhatsApp disponible 24/7: el empleado escribe → Bot valida su empresa (por ID o nombre con búsqueda fuzzy) → Valida número de empleado → Genera QR encriptado con sus datos → Envía imagen al instante. Todo sin intervención humana.",
    "project3.aiHighlight": "Usé Claude para diseñar e implementar la lógica conversacional y manejo de estados en 60% menos tiempo",
    "project3.metric1.label": "Tiempo de Respuesta",
    "project3.metric2.label": "Tickets de Soporte",
    "project3.metric3.label": "Uptime",

    // Project 4
    "project4.title": "Ecosistema de Acceso Seguro con QR",
    "project4.challenge": "Cuando una empresa nueva se integra al sistema de transporte, RRHH necesita generar miles de pases QR encriptados para todos sus empleados. Procesar 10,000+ QRs en Lambda (límite 4GB) causaba errores de memoria.",
    "project4.solution": "API que recibe lista de empleados → Lambda procesa en batches de 50 con garbage collection entre lotes → Genera imágenes QR con Sharp (logo + QR + datos) → Comprime en ZIP via streams → Sube a S3 → Devuelve URL de descarga. Soporte multi-timezone para vigencias.",
    "project4.metric1.label": "QRs/Petición",
    "project4.metric2.label": "Velocidad de Distribución",
    "project4.metric3.label": "Reducción de Memoria",

    // Project 5
    "project5.title": "Integración Bustrax (Serverless)",
    "project5.challenge": "Cuando el proveedor GPS (Bustrax) detectaba un cambio de vehículo en ruta, los operadores tenían que copiar manualmente los datos al sistema interno. Esto causaba retrasos de 15-30 minutos y errores de transcripción.",
    "project5.solution": "Integración serverless automatizada: EventBridge dispara cada 5 minutos → Lambda obtiene cambios de Bustrax → Valida vehículos/rutas en bases internas → Aplica cambios en MongoDB y PostgreSQL → Circuit breaker para manejar caídas de API externa → Logs detallados con sugerencias de resolución.",
    "project5.metric1.label": "Tiempo de Sync",
    "project5.metric2.label": "Tasa de Éxito",
    "project5.metric3.label": "Errores Manuales",

    // Experience
    "experience.badge": "Experiencia",
    "experience.title1": "Trayectoria",
    "experience.title2": "Profesional",
    "experience.description": "9+ años transformando operaciones manuales en ecosistemas tecnológicos de alto rendimiento.",
    "experience.current": "Actual",
    "experience.education": "Educación",
    "experience.masters": "Maestría en Ingeniería Web",
    "experience.degree": "Ingeniería en Sistemas",

    // Tech Stack
    "tech.badge": "Tech Stack",
    "tech.title1": "Herramientas del",
    "tech.title2": "Oficio",
    "tech.description": "Un enfoque políglota centrado en resolver problemas, no en frameworks.",
    "tech.architecture": "Arquitectura",
    "tech.backend": "Backend",
    "tech.databases": "Bases de Datos",
    "tech.realtime": "Tiempo Real",
    "tech.frontend": "Frontend",
    "tech.aistack": "Stack IA",

    // Skills
    "skills.distributed": "Sistemas Distribuidos",
    "skills.eventdriven": "Arquitectura Event-Driven",
    "skills.performance": "Optimización de Rendimiento",
    "skills.serverless": "Computación Serverless",

    // Code Showcase
    "code.badge": "Código Real",
    "code.title1": "Ejemplos de",
    "code.title2": "Producción",
    "code.description": "Código real de proyectos en producción que demuestran patrones de arquitectura y mejores prácticas.",

    // Footer
    "footer.title1": "Construyamos Algo",
    "footer.title2": "Extraordinario",
    "footer.description": "¿Buscas un arquitecto de soluciones aumentado por IA que pueda diseñar e implementar sistemas escalables? Conectemos.",
    "footer.cta": "Contactar",
    "footer.contact": "Contacto",
    "footer.connect": "Conectar",
    "footer.availability": "Disponibilidad",
    "footer.availabilityStatus": "Abierto a oportunidades",
    "footer.availabilityDescription": "Roles de Solutions Architect, Lead Engineer, o Senior Full Stack con enfoque en desarrollo aumentado por IA.",
    "footer.builtWith": "Construido con",
    "footer.and": "e IA.",
  },
  en: {
    // Navigation
    "nav.philosophy": "Philosophy",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.tech": "Tech Stack",
    "nav.contact": "Contact",

    // Hero
    "hero.badge": "AI-Augmented Development",
    "hero.headline1": "Architecting",
    "hero.headline2": "High-Performance Systems",
    "hero.headline3": "with AI-Augmented Engineering",
    "hero.role": "Senior Full Stack Engineer & Solutions Architect",
    "hero.stat1.label": "9+ Years",
    "hero.stat1.sublabel": "Engineering",
    "hero.stat2.label": "60%",
    "hero.stat2.sublabel": "Dev Acceleration with AI",
    "hero.stat3.label": "100K+",
    "hero.stat3.sublabel": "Records/Week Processed",
    "hero.cta.primary": "View Architecture Case Studies",
    "hero.cta.secondary": "The AI Edge",

    // Philosophy
    "philosophy.badge": "Development Philosophy",
    "philosophy.title1": "The AI Edge",
    "philosophy.title2": "High-Velocity Engineering",
    "philosophy.description1": "I leverage LLMs not to replace coding, but to",
    "philosophy.description2": "abstract syntax and boilerplate",
    "philosophy.description3": "This allows me to dedicate",
    "philosophy.description4": "90% of my cognitive load",
    "philosophy.description5": "to High-Level Architecture, Security, and Complex Business Logic.",
    "philosophy.result": "The result?",
    "philosophy.resultHighlight": "Robust, polyglot solutions delivered 3x faster.",
    "philosophy.quote": "\"Using Claude AI as a development partner\" achieved 30% reduction in development time of complex features.",

    // Bento items
    "bento.speed.title": "Speed",
    "bento.speed.value": "3x",
    "bento.speed.description": "Faster delivery than traditional development",
    "bento.speed.detail": "AI abstracts syntax, enabling focus on architecture",
    "bento.quality.title": "Quality",
    "bento.quality.value": "98%",
    "bento.quality.description": "Success rate in production systems",
    "bento.quality.detail": "Robust error handling & comprehensive testing",
    "bento.scalability.title": "Scalability",
    "bento.scalability.value": "100K+",
    "bento.scalability.description": "Records processed weekly",
    "bento.scalability.detail": "Event-driven architectures that scale automatically",
    "bento.ai.title": "AI Integration",
    "bento.ai.value": "90%",
    "bento.ai.description": "Cognitive load on high-level design",
    "bento.ai.detail": "LLMs handle boilerplate, I focus on business logic",
    "bento.architecture.title": "Architecture",
    "bento.architecture.value": "Event-Driven",
    "bento.architecture.description": "Serverless, microservices, real-time",
    "bento.architecture.detail": "AWS Lambda, RabbitMQ, Socket.io expertise",

    // Projects
    "projects.badge": "Case Studies",
    "projects.title1": "Architecture",
    "projects.title2": "in Action",
    "projects.description": "Real-world systems designed for scale, reliability, and performance. Click to explore the technical details.",
    "projects.challenge": "Challenge",
    "projects.solution": "Solution",
    "projects.architecture": "Architecture",
    "projects.aiHighlight": "AI Highlight",
    "projects.viewMore": "See full experience on LinkedIn",

    // Project 1
    "project1.title": "Real-Time Traffic Control Center",
    "project1.challenge": "Corporate transport operators needed to see hundreds of vehicles in real-time, detect delays, and monitor passenger boardings across routes throughout Mexico.",
    "project1.solution": "Operations monitoring dashboard with WebSockets (Socket.io + Redis pub/sub) showing live GPS position every 5 seconds, visual comparison of scheduled vs. actual route traveled, and boarding count per trip.",
    "project1.metric1.label": "WebSocket Latency",
    "project1.metric2.label": "Punctuality Improvement",
    "project1.metric3.label": "Vehicles Monitored",

    // Project 2
    "project2.title": "Mass Update Trips System",
    "project2.challenge": "Operations administrators needed to update thousands of trips simultaneously (driver changes, vehicles, schedules) by uploading Excel files with 50,000+ rows. The previous system crashed with timeouts.",
    "project2.solution": "Excel upload system that processes in background: admin uploads file → RabbitMQ queues the job → Lambda processes in batches of 10 → updates 5 PostgreSQL databases with ACID transactions → notifies progress in real-time via MongoDB.",
    "project2.metric1.label": "Processing Time",
    "project2.metric2.label": "Timeouts",
    "project2.metric3.label": "Cost Reduction",

    // Project 3
    "project3.title": "TraxiBot (WhatsApp Enterprise)",
    "project3.challenge": "Thousands of client company employees needed to obtain their QR pass to access corporate transport. HR distributed QRs manually one by one, creating bottlenecks and constant support tickets.",
    "project3.solution": "24/7 WhatsApp chatbot: employee texts → Bot validates their company (by ID or name with fuzzy search) → Validates employee number → Generates encrypted QR with their data → Sends image instantly. All without human intervention.",
    "project3.aiHighlight": "Used Claude to design and implement conversational logic and state management in 60% less time",
    "project3.metric1.label": "Response Time",
    "project3.metric2.label": "Support Tickets",
    "project3.metric3.label": "Uptime",

    // Project 4
    "project4.title": "QR Secure Access Ecosystem",
    "project4.challenge": "When a new company joins the transport system, HR needs to generate thousands of encrypted QR passes for all employees. Processing 10,000+ QRs in Lambda (4GB limit) caused memory errors.",
    "project4.solution": "API receives employee list → Lambda processes in batches of 50 with garbage collection between batches → Generates QR images with Sharp (logo + QR + data) → Compresses via streams to ZIP → Uploads to S3 → Returns download URL. Multi-timezone support for expiration dates.",
    "project4.metric1.label": "QRs/Request",
    "project4.metric2.label": "Distribution Speed",
    "project4.metric3.label": "Memory Reduction",

    // Project 5
    "project5.title": "Bustrax Integration (Serverless)",
    "project5.challenge": "When the GPS provider (Bustrax) detected a vehicle change on route, operators had to manually copy data to the internal system. This caused 15-30 minute delays and transcription errors.",
    "project5.solution": "Automated serverless integration: EventBridge triggers every 5 minutes → Lambda fetches changes from Bustrax → Validates vehicles/routes in internal databases → Applies changes to MongoDB and PostgreSQL → Circuit breaker handles external API outages → Detailed logs with resolution suggestions.",
    "project5.metric1.label": "Sync Time",
    "project5.metric2.label": "Success Rate",
    "project5.metric3.label": "Manual Errors",

    // Experience
    "experience.badge": "Experience",
    "experience.title1": "Career",
    "experience.title2": "Journey",
    "experience.description": "9+ years transforming manual operations into high-performance tech ecosystems.",
    "experience.current": "Current",
    "experience.education": "Education",
    "experience.masters": "Master's in Web Engineering",
    "experience.degree": "Systems Engineering",

    // Tech Stack
    "tech.badge": "Tech Stack",
    "tech.title1": "Tools of the",
    "tech.title2": "Trade",
    "tech.description": "A polyglot approach focused on solving problems, not frameworks.",
    "tech.architecture": "Architecture",
    "tech.backend": "Backend",
    "tech.databases": "Databases",
    "tech.realtime": "Real-Time",
    "tech.frontend": "Frontend",
    "tech.aistack": "AI Stack",

    // Skills
    "skills.distributed": "Distributed Systems",
    "skills.eventdriven": "Event-Driven Architecture",
    "skills.performance": "Performance Optimization",
    "skills.serverless": "Serverless Computing",

    // Code Showcase
    "code.badge": "Real Code",
    "code.title1": "Production",
    "code.title2": "Examples",
    "code.description": "Real code from production projects demonstrating architecture patterns and best practices.",

    // Footer
    "footer.title1": "Let's Build Something",
    "footer.title2": "Extraordinary",
    "footer.description": "Looking for an AI-augmented solutions architect who can design and implement scalable systems? Let's connect.",
    "footer.cta": "Get in Touch",
    "footer.contact": "Contact",
    "footer.connect": "Connect",
    "footer.availability": "Availability",
    "footer.availabilityStatus": "Open to opportunities",
    "footer.availabilityDescription": "Solutions Architect, Lead Engineer, or Senior Full Stack roles with focus on AI-augmented development.",
    "footer.builtWith": "Built with",
    "footer.and": "and AI.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check localStorage for saved language preference after hydration
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

  // Prevent hydration mismatch by using default language until mounted
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

