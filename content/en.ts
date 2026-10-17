import type { SiteContent } from "./types";

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "Juan Toledo — Senior Full-Stack Engineer · End-to-end products",
    description:
      "I deliver complete products from definition to production with a spec-driven, AI-assisted methodology. Open to senior, founding-engineer and technical co-founder roles.",
    path: "/",
    ogLocale: "en_US",
  },
  nav: {
    home: "Juan Toledo",
    skipToContent: "Skip to content",
    menu: "Menu",
    links: [
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "How I work", href: "#method" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    switch: { label: "ES", href: "/es", lang: "es", ariaLabel: "Ver en español" },
  },
  hero: {
    kicker: "Juan Alberto Toledo Tello · Mexico City · Remote",
    h1: "I take products from an idea to production.",
    h1Underline: "to production",
    lead: "Senior full-stack engineer with 9+ years. I work with a spec-driven methodology and AI coding agents, which lets me cover what normally takes a team: investigate, specify, build and ship, at team quality. The stack and the cloud are the project's decision, not my limitation.",
    primary: { label: "See the work", href: "#work" },
    secondary: { label: "Download CV", href: "/cv/Juan-Toledo-CV-EN.pdf" },
  },
  proof: {
    ariaLabel: "Selected results",
    items: [
      {
        value: "Weekly demos to the CEO",
        text: "Account search engine for a B2B analytics platform, owned end to end.",
      },
      {
        value: "2 weeks",
        text: "Restaurant ordering and pay-at-table platform, defined and built end to end.",
      },
      {
        value: "30 → 8 min, zero failures",
        text: "Bulk-load engine over 50,000+ records and 5 databases in logistics.",
      },
    ],
  },
  work: {
    label: "Work",
    title: "Products built end to end",
    intro: "Each case follows the same path: a real problem, a closed specification, a working product.",
    blockLabels: {
      problem: "Problem",
      built: "What I built",
      time: "Time",
      result: "Result",
      stack: "Stack",
    },
    cases: [
      {
        slug: "restaurant-qr",
        title: "Restaurant QR menu, ordering and pay-at-table platform",
        meta: "2026 · Founder · In usability testing, CDMX pilot",
        problem:
          "Diners in Mexico still wait for the waiter to order and to pay, and splitting the bill is a mess. Restaurants lose table turns and tips.",
        built:
          "Diners scan a QR, order and pay from their phone. Each person can run their own tab, or the table can order through the waiter as usual, and both coexist. Staff console, owner dashboard and menu management included.",
        time: "Defined and built in 2 weeks at 2 hours a day, in 10 verified sub-specs.",
        result: "Complete product ready for pilot; now in usability tests with real diners.",
        stack: "React (PWA) · FastAPI · PostgreSQL · Conekta",
      },
      {
        slug: "brightpath",
        title: "BrightPath, EdTech SaaS for private schools",
        meta: "2025 – present · Co-founder",
        problem:
          "Private schools write assessments by hand and have no fast way to check that questions actually match the official curriculum.",
        built:
          "A platform where schools create and validate assessments. 965-question bank, 670+ questions auto-classified by competency with the Claude API, and validation against 68 official documents through semantic search (RAG on pgvector). Google and Microsoft sign-in, data isolated per school.",
        time: "Built as a single engineer alongside my main job.",
        result: "Working product with a pedagogical-expert portal; onboarding first schools.",
        stack: "Next.js · Supabase (RLS) · pgvector · Claude API",
      },
      {
        slug: "wapi",
        title: "Wapi, WhatsApp + Instagram inbox with an AI agent",
        meta: "2025 · Founder",
        problem:
          "Small businesses in Mexico sell and support customers over WhatsApp and Instagram, from several phones, with no history and nobody answering at night.",
        built:
          "A single inbox for both channels with an AI agent that answers on its own and hands off to a person when needed. Two demo agents (a notary and a recruiter) and a live demo with a real client.",
        time: "Full demo stack built from scratch; this is where I consolidated the spec-driven method I use today.",
        result: "Working demo with a registered WhatsApp Business account.",
        stack: "Chatwoot · Hono.js · OpenAI · WhatsApp Business API",
      },
      {
        slug: "navigator",
        title: "Navigator, account search for Customer Success teams",
        meta: "2026 · Senior Full-Stack Developer at QuadSci · In development, team project",
        problem:
          "Customer Success managers at B2B software companies need to find which customers are growing, which are at risk and why, across hundreds of accounts and many months of data.",
        built:
          "A search engine where a CSM combines business criteria (growth, feature usage, risk signals), saves searches, compares results across months (which accounts stayed, entered or exited) and exports them. I own the project end to end: architecture, task definition, backend, and integrating the team's frontend work.",
        time: "Delivered in iterations with team code review and weekly live demos to the CEO and product.",
        result: "Core search, month comparison and export working; moving to production.",
        stack: "FastAPI · Vue 3 · PostgreSQL · Docker (AWS, GCP, Azure)",
      },
    ],
    others:
      "Also: Tendero, a turnkey POS kit for micro-businesses on Android tablets (2025, paused) · Cauce, a digital product consultancy, cauce.tech (2024 – present, co-founder) · An analytics dashboard with AI chat and recommendations, 424 automated tests, quadsci.juantoledo.com.mx.",
  },
  method: {
    label: "Method",
    title: "How I work",
    intro:
      "Spec-driven development with AI coding agents as supervised implementers. The method is what lets one person deliver at team quality.",
    steps: [
      {
        title: "Investigate first",
        text: "Before proposing anything I read the existing code and the real constraints. No assumptions; the report comes before the design.",
      },
      {
        title: "Write a closed specification",
        text: "Each feature becomes a spec with scope, data model, API contract and acceptance criteria. If it isn't in the spec, it isn't built.",
      },
      {
        title: "Build in verifiable blocks",
        text: "I implement with Claude Code in small sub-specs, each one tested and reviewed before the next. The agent writes; I decide and verify.",
      },
      {
        title: "Verify and ship",
        text: "Tests, a hard code review and a real-environment check before every delivery. Then the next block.",
      },
    ],
    whyLabel: "Why it matters",
    why: "The result is predictable: you know what you're getting, when, and it keeps working after I'm done. That's the difference between fast and merely quick.",
  },
  experience: {
    label: "Experience",
    title: "Where I've built",
    items: [
      {
        role: "Senior Full-Stack Developer — QuadSci (United States, remote)",
        dates: "Mar 2026 – Present",
        text: "B2B customer analytics platform. Navigator (above), performance work, ML model integration, corporate sign-in (Entra ID, Okta), production incident diagnosis. FastAPI, Vue 3, PostgreSQL, Docker on AWS/GCP/Azure.",
      },
      {
        role: "Full-Stack Developer & Solutions Architect — Traxión (Mexico City)",
        dates: "Apr 2024 – Mar 2026",
        text: "Employee transportation platform. Built 6 of 27 microservices from scratch: bulk-update engine (50,000+ records, 30 → 8 min), 24/7 WhatsApp assistant on AWS ECS, real-time vehicle monitor, QR service generating 10,000+ codes per request. React, TypeScript, Node.js, Python, AWS.",
      },
      {
        role: "Earlier",
        compact: true,
        dates: "2017 – 2023",
        text: "Frontend Developer at PALO IT (2022–2023) and moons (2021–2022); Frontend/UX Developer at Grupo Salinas (2019–2021); Front End Developer at INEEL (2017–2019).",
      },
    ],
    educationLabel: "Education",
    education:
      "M.Sc. Management & Web Engineering, UNIR (2024) · B.Eng. Computer Systems Engineering, TecNM Zacatepec (2017)",
  },
  roles: {
    label: "Roles",
    title: "What I'm open to",
    items: [
      {
        title: "Senior full-stack engineer",
        text: "Own a product area end to end in a team that values specs, tests and code review.",
      },
      {
        title: "Founding engineer",
        text: "Be the first engineer: turn the founder's vision into a working product and the foundations the next hires build on.",
      },
      {
        title: "Technical co-founder",
        text: "Cover the whole technical side of a new company, from definition to production, with the discipline to keep it maintainable.",
        tag: "founder",
      },
    ],
    note: "Remote from Mexico City. English: professional in reading and writing; spoken English improving.",
  },
  contact: {
    label: "Contact",
    title: "Let's talk",
    intro: "Tell me what you're building. I reply within a day.",
    directLabel: "Direct",
    email: "johntoledot@gmail.com",
    linkedin: {
      label: "linkedin.com/in/juan-alberto-toledo-tello",
      href: "https://www.linkedin.com/in/juan-alberto-toledo-tello",
    },
    github: { label: "github.com/JuanToledo23", href: "https://github.com/JuanToledo23" },
    cvEn: { label: "Download CV (EN)", href: "/cv/Juan-Toledo-CV-EN.pdf" },
    cvEs: { label: "Download CV (ES)", href: "/cv/Juan-Toledo-CV-ES.pdf" },
    form: {
      name: "Name",
      email: "Email",
      topic: "What is this about?",
      topicPlaceholder: "Choose one",
      topics: [
        { value: "senior", label: "A senior role" },
        { value: "founding", label: "Founding engineer / co-founder" },
        { value: "product", label: "Building a product" },
        { value: "other", label: "Something else" },
      ],
      message: "Message",
      honeypot: "Leave this field empty",
      submit: "Send",
      sending: "Sending…",
      success: "Thanks, I'll get back to you soon.",
      error: "Something went wrong. Email me directly at johntoledot@gmail.com.",
      errors: {
        name: "Please enter your name (up to 80 characters).",
        email: "Please enter a valid email address.",
        topic: "Please choose what this is about.",
        message: "Please write a message between 20 and 2000 characters.",
        rateLimit: "Too many messages in a short time. Please try again later or email me directly.",
      },
    },
  },
  notFound: {
    title: "Page not found",
    text: "This page doesn't exist. The whole site is on one page.",
    home: { label: "Go to the home page", href: "/" },
  },
  footer: {
    copyright: "© {year} Juan Alberto Toledo Tello",
    builtWith: "Built with Next.js",
  },
};
