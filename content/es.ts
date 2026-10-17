import type { SiteContent } from "./types";

export const es: SiteContent = {
  locale: "es",
  meta: {
    title: "Juan Toledo — Ingeniero Full-Stack Senior · Productos de punta a punta",
    description:
      "Entrego productos completos de la definición a producción con una metodología spec-driven asistida por IA. Abierto a roles senior, founding engineer y cofundador técnico.",
    path: "/es",
    ogLocale: "es_MX",
  },
  nav: {
    home: "Juan Toledo",
    skipToContent: "Saltar al contenido",
    menu: "Menú",
    links: [
      { label: "Sobre mí", href: "#about" },
      { label: "Trabajo", href: "#work" },
      { label: "Cómo trabajo", href: "#method" },
      { label: "Experiencia", href: "#experience" },
      { label: "Contacto", href: "#contact" },
    ],
    switch: { label: "EN", href: "/", lang: "en", ariaLabel: "View in English" },
  },
  hero: {
    kicker: "Juan Alberto Toledo Tello · Ciudad de México · Remoto",
    h1: "Llevo productos de la idea a producción.",
    h1Underline: "a producción",
    lead: "Ingeniero full-stack senior con más de 9 años. Trabajo con una metodología spec-driven y agentes de código con IA, lo que me permite cubrir lo que normalmente requiere un equipo: investigar, especificar, construir y entregar, con calidad de equipo. El stack y la nube son decisión del proyecto, no una limitación mía.",
    primary: { label: "Ver el trabajo", href: "#work" },
    secondary: { label: "Descargar CV", href: "/cv/Juan-Toledo-CV-ES.pdf" },
  },
  proof: {
    ariaLabel: "Resultados destacados",
    items: [
      {
        value: "Demos semanales al CEO",
        text: "Buscador de cuentas para una plataforma de analítica B2B, a mi cargo de principio a fin.",
      },
      {
        value: "2 semanas",
        text: "Plataforma de pedidos y pago en mesa para restaurantes, definida y construida de punta a punta.",
      },
      {
        value: "30 → 8 min, sin fallos",
        text: "Motor de carga masiva sobre 50,000+ registros y 5 bases de datos en logística.",
      },
    ],
  },
  work: {
    label: "Trabajo",
    title: "Productos construidos de punta a punta",
    intro:
      "Cada caso sigue el mismo camino: un problema real, una especificación cerrada, un producto funcionando.",
    blockLabels: {
      problem: "Problema",
      built: "Qué construí",
      time: "Tiempo",
      result: "Resultado",
      stack: "Stack",
    },
    cases: [
      {
        slug: "restaurant-qr",
        title: "Plataforma de menú QR, pedidos y pago en mesa para restaurantes",
        meta: "2026 · Fundador · En pruebas de usabilidad, piloto en CDMX",
        problem:
          "En México los comensales siguen esperando al mesero para pedir y para pagar, y dividir la cuenta es un lío. Los restaurantes pierden rotación de mesas y propinas.",
        built:
          "Los comensales escanean un QR, piden y pagan desde el celular. Cada persona puede llevar su propia cuenta, o la mesa puede pedir al mesero como siempre, y ambas conviven. Incluye consola de personal, panel del dueño y gestión de menú.",
        time: "Definida y construida en 2 semanas a 2 horas diarias, en 10 sub-specs verificadas.",
        result: "Producto completo listo para piloto; en pruebas de usabilidad con comensales reales.",
        stack: "React (PWA) · FastAPI · PostgreSQL · Conekta",
      },
      {
        slug: "brightpath",
        title: "BrightPath, SaaS EdTech para colegios privados",
        meta: "2025 – actual · Cofundador",
        problem:
          "Los colegios privados escriben evaluaciones a mano y no tienen forma rápida de comprobar que las preguntas corresponden al plan de estudios oficial.",
        built:
          "Una plataforma donde los colegios crean y validan evaluaciones. Banco de 965 preguntas, más de 670 clasificadas automáticamente por competencia con la API de Claude, y validación contra 68 documentos oficiales con búsqueda semántica (RAG sobre pgvector). Inicio de sesión con Google y Microsoft, datos separados por colegio.",
        time: "Construido como único ingeniero en paralelo a mi trabajo principal.",
        result: "Producto funcionando con portal de experto pedagógico; incorporando los primeros colegios.",
        stack: "Next.js · Supabase (RLS) · pgvector · API de Claude",
      },
      {
        slug: "wapi",
        title: "Wapi, inbox WhatsApp + Instagram con agente de IA",
        meta: "2025 · Fundador",
        problem:
          "Las PyMEs en México venden y dan soporte por WhatsApp e Instagram, desde varios teléfonos, sin historial y sin nadie que responda de noche.",
        built:
          "Un solo inbox para ambos canales con un agente de IA que responde solo y pasa a una persona cuando hace falta. Dos agentes de demostración (una notaría y una reclutadora) y demo en vivo con una clienta real.",
        time: "Stack de demo completo construido desde cero; aquí consolidé la metodología spec-driven que uso hoy.",
        result: "Demo funcionando con cuenta de WhatsApp Business registrada.",
        stack: "Chatwoot · Hono.js · OpenAI · WhatsApp Business API",
      },
      {
        slug: "navigator",
        title: "Navigator, buscador de cuentas para equipos de Customer Success",
        meta: "2026 · Senior Full-Stack Developer en QuadSci · En desarrollo, proyecto de equipo",
        problem:
          "Los gerentes de Customer Success en empresas de software B2B necesitan encontrar qué clientes crecen, cuáles están en riesgo y por qué, entre cientos de cuentas y muchos meses de datos.",
        built:
          "Un buscador donde un CSM combina criterios de negocio (crecimiento, uso de funcionalidades, señales de riesgo), guarda búsquedas, compara resultados entre meses (qué cuentas se quedaron, entraron o salieron) y los exporta. El proyecto está a mi cargo de principio a fin: arquitectura, definición de tareas, backend e integración del trabajo de frontend del equipo.",
        time: "Entregado en iteraciones con revisión de código del equipo y demos semanales en vivo al CEO y a producto.",
        result: "Búsqueda, comparación entre meses y exportación funcionando; camino a producción.",
        stack: "FastAPI · Vue 3 · PostgreSQL · Docker (AWS, GCP, Azure)",
      },
    ],
    others:
      "También: Tendero, kit POS llave en mano para micronegocios en tablet Android (2025, pausado) · Cauce, consultoría de producto digital, cauce.tech (2024 – actual, socio fundador) · Un dashboard de analítica con chat de IA y recomendaciones, 424 pruebas automatizadas, quadsci.juantoledo.com.mx.",
  },
  method: {
    label: "Método",
    title: "Cómo trabajo",
    intro:
      "Desarrollo spec-driven con agentes de código con IA como implementadores supervisados. El método es lo que permite que una persona entregue con calidad de equipo.",
    steps: [
      {
        title: "Investigar primero",
        text: "Antes de proponer leo el código existente y las restricciones reales. Sin suposiciones; el reporte va antes que el diseño.",
      },
      {
        title: "Escribir una especificación cerrada",
        text: "Cada funcionalidad se vuelve una spec con alcance, modelo de datos, contrato de API y criterios de aceptación. Si no está en la spec, no se construye.",
      },
      {
        title: "Construir en bloques verificables",
        text: "Implemento con Claude Code en sub-specs pequeñas, cada una probada y revisada antes de la siguiente. El agente escribe; yo decido y verifico.",
      },
      {
        title: "Verificar y entregar",
        text: "Pruebas, revisión de código exigente y comprobación en un entorno real antes de cada entrega. Luego el siguiente bloque.",
      },
    ],
    whyLabel: "Por qué importa",
    why: "El resultado es predecible: sabes qué recibes, cuándo, y sigue funcionando cuando ya no estoy. Esa es la diferencia entre rápido y solo apresurado.",
  },
  experience: {
    label: "Experiencia",
    title: "Dónde he construido",
    items: [
      {
        role: "Senior Full-Stack Developer — QuadSci (Estados Unidos, remoto)",
        dates: "Mar 2026 – Actual",
        text: "Plataforma de analítica de clientes B2B. Navigator (arriba), optimización de rendimiento, integración de modelos de ML, inicio de sesión corporativo (Entra ID, Okta), diagnóstico de incidentes en producción. FastAPI, Vue 3, PostgreSQL, Docker en AWS/GCP/Azure.",
      },
      {
        role: "Full-Stack Developer y Arquitecto de soluciones — Traxión (Ciudad de México)",
        dates: "Abr 2024 – Mar 2026",
        text: "Plataforma de transporte de personal. Construí desde cero 6 de 27 microservicios: motor de actualización masiva (50,000+ registros, 30 → 8 min), asistente de WhatsApp 24/7 en AWS ECS, monitor de vehículos en tiempo real, servicio de QR que genera más de 10,000 códigos por petición. React, TypeScript, Node.js, Python, AWS.",
      },
      {
        role: "Roles anteriores",
        compact: true,
        dates: "2017 – 2023",
        text: "Frontend Developer en PALO IT (2022–2023) y moons (2021–2022); Frontend/UX Developer en Grupo Salinas (2019–2021); Front End Developer en INEEL (2017–2019).",
      },
    ],
    educationLabel: "Formación",
    education:
      "Maestría en Dirección e Ingeniería en Sitios Web, UNIR (2024) · Ingeniería en Sistemas Computacionales, TecNM Zacatepec (2017)",
  },
  roles: {
    label: "Roles",
    title: "A qué estoy abierto",
    items: [
      {
        title: "Ingeniero full-stack senior",
        text: "Tomar un área de producto de principio a fin en un equipo que valora specs, pruebas y revisión de código.",
      },
      {
        title: "Founding engineer",
        text: "Ser el primer ingeniero: convertir la visión del fundador en un producto funcionando y en las bases sobre las que construirán los siguientes.",
      },
      {
        title: "Cofundador técnico",
        text: "Cubrir toda la parte técnica de una empresa nueva, de la definición a producción, con la disciplina para que siga siendo mantenible.",
        tag: "fundador",
      },
    ],
    note: "Remoto desde Ciudad de México. Inglés: profesional en lectura y escritura; conversación en mejora.",
  },
  contact: {
    label: "Contacto",
    title: "Hablemos",
    intro: "Cuéntame qué estás construyendo. Respondo en menos de un día.",
    directLabel: "Directo",
    email: "johntoledot@gmail.com",
    linkedin: {
      label: "linkedin.com/in/juan-alberto-toledo-tello",
      href: "https://www.linkedin.com/in/juan-alberto-toledo-tello",
    },
    github: { label: "github.com/JuanToledo23", href: "https://github.com/JuanToledo23" },
    cvEn: { label: "Descargar CV (EN)", href: "/cv/Juan-Toledo-CV-EN.pdf" },
    cvEs: { label: "Descargar CV (ES)", href: "/cv/Juan-Toledo-CV-ES.pdf" },
    form: {
      name: "Nombre",
      email: "Correo",
      topic: "¿De qué se trata?",
      topicPlaceholder: "Elige una opción",
      topics: [
        { value: "senior", label: "Un rol senior" },
        { value: "founding", label: "Founding engineer / cofundador" },
        { value: "product", label: "Construir un producto" },
        { value: "other", label: "Otra cosa" },
      ],
      message: "Mensaje",
      honeypot: "Deja este campo vacío",
      submit: "Enviar",
      sending: "Enviando…",
      success: "Gracias, te respondo pronto.",
      error: "Algo salió mal. Escríbeme directo a johntoledot@gmail.com.",
      errors: {
        name: "Escribe tu nombre (hasta 80 caracteres).",
        email: "Escribe un correo válido.",
        topic: "Elige de qué se trata.",
        message: "Escribe un mensaje de entre 20 y 2000 caracteres.",
        rateLimit: "Demasiados mensajes en poco tiempo. Intenta más tarde o escríbeme directo.",
      },
    },
  },
  notFound: {
    title: "Página no encontrada",
    text: "Esta página no existe. Todo el sitio está en una sola página.",
    home: { label: "Ir al inicio", href: "/es" },
  },
  footer: {
    copyright: "© {year} Juan Alberto Toledo Tello",
    builtWith: "Hecho con Next.js",
  },
};
