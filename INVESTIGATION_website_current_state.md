# Investigation: current state of juantoledo.com.mx (repo `my-cv`)

Date of investigation: 2026-10-16. Branch `main`, last commit `df1f68b docs` (2026-03-03). Working tree clean at start.
Scope: read-only review of every tracked file. Nothing was installed, built, or changed. The only extra command was `npm audit --package-lock-only`, which reads the lockfile and writes nothing.

---

## Executive summary

1. The site is a single page: Next.js 16.0.10 (App Router), React 19.2.1, Tailwind v4 and Framer Motion, almost certainly hosted on Vercel. There's no CI and no deployment config in the repo.
2. The content was written in Dec 2025 – Feb 2026. It still describes Traxión as the current job. QuadSci, the restaurant QR platform, BrightPath, Wapi, Tendero and Cauce don't appear anywhere on the site.
3. The positioning is a freelance agency ("Solicitar cotización", landing pages, micro-SaaS). That's the opposite of the new message: end-to-end product delivery, and senior, founding-engineer or co-founder roles.
4. All four case studies are Traxión backend features, not products. "Traxion" is hard-coded as the badge on every card.
5. ES/EN is handled by a client-side dictionary saved in localStorage. Only Spanish gets server-rendered, `lang="es"` is fixed, and there are no `/en` URLs, so the English version is invisible to search engines.
6. SEO is minimal: there's a title, description and partial OG tags, but no OG image, `metadataBase`, canonical, sitemap, robots, JSON-LD or hreflang.
7. Security: `next@16.0.10` has many published advisories, one rated critical (npm audit counts 8 vulnerabilities). The contact form puts user input into the email HTML without escaping it and has no spam protection.
8. Accessibility: the main CTA buttons fail contrast (white on emerald, about 2.5:1 to 3.8:1), muted text (`#555`) is about 2.7:1, and the project cards can't be opened with a keyboard.
9. Reusable: the design tokens and dark visual language, the Resend contact action (once hardened), the toolchain and the footer and nav patterns. Most of the copy and the information architecture need to be rewritten.
10. Recommendation (opinion): **option (b)**, rebuild on the same stack with a new structure. Estimated effort: about 3–5 focused days.

---

## 1. Stack and tooling

### 1.1 Framework, language, styling, build

| Item | Value (source) | Latest on npm today | Note |
|---|---|---|---|
| Framework | `next` **16.0.10**, pinned (`package.json`) | 16.4.2 | **Security**: npm audit flags `next 9.3.4-canary.0 - 16.3.7` as **critical**, with ~28 advisories (Server Actions CSRF with null origin, RSC DoS, middleware bypass, cache poisoning, XSS with CSP nonces…). Upgrading is urgent no matter which redesign option you pick. |
| UI runtime | `react` / `react-dom` **19.2.1**, pinned | 19.3.1 | Behind by a minor version. |
| Language | TypeScript `^5`, `strict: true` (`tsconfig.json`) | 7.0.2 | Fine on 5.x. |
| Styling | Tailwind CSS `^4` via `@tailwindcss/postcss` (`postcss.config.mjs`), plus hand-written classes in `app/globals.css` | 4.3.3 | No `tailwind.config` file (normal for v4). |
| Animation | `framer-motion ^12.23.26` | 14.3.0 | Two majors behind. The package now ships as `motion`. |
| Icons | `lucide-react ^0.561.0` | 1.58.0 | Pre-1.0, so old. |
| Email | `resend ^6.9.2` | 6.34.1 | Fine. |
| Analytics | `@vercel/analytics ^1.6.1`, `@vercel/speed-insights ^1.3.1` | 2.0.1 / 2.0.0 | One major behind. |
| Utils | `clsx`, `tailwind-merge` (`lib/utils.ts` → `cn()`) | — | `cn()` is **never imported** anywhere (dead code). |
| Lint | ESLint 9 flat config, `eslint-config-next` core-web-vitals and typescript (`eslint.config.mjs`) | — | OK. |
| Build tool | Next default (Turbopack in v16); `next.config.ts` is empty | — | — |
| Fonts | `next/font/google`: Inter and Geist Mono (`app/layout.tsx:8-16`) | — | See 4.2: Inter probably never applies to body text. |

Other npm audit findings (production deps, transitive): `postcss`, `nanoid`, `sharp` (libvips CVEs), `source-map-js` (high); `uuid` (moderate). Total: **8 vulnerabilities (1 critical, 4 high, 3 moderate)**.

### 1.2 Package manager and Node

- **There are two lockfiles**: `package-lock.json` (npm, lockfileVersion 3) and `pnpm-lock.yaml` (pnpm, v9.0). Commits `da14f3a` and `60b0af1` updated both. That's ambiguous. Vercel picks pnpm when `pnpm-lock.yaml` is present, so the two can drift apart. One of them should go.
- No `engines` field, `.nvmrc` or `.node-version`. The local machine runs Node v24.14.0. `@types/node` is `^20`.
- `node_modules` isn't installed locally right now.

### 1.3 Deployment

- **Not visible in the repo.** There's no `vercel.json`/`vercel.ts`, no `.vercel/` (it's also in `.gitignore`), and no `.github/workflows`.
- Evidence it's on Vercel (inferred): `<Analytics />` and `<SpeedInsights />` in `app/layout.tsx:57-58`, the footer label "Vercel" (`components/Footer.tsx:51`), and the default README.
- Remote: `git@github-personal:JuanToledo23/my-cv.git`. Whether the repo is public or private can't be told from here.
- Domain hints: `"Sent from juantoledo.com.mx contact form"` (`app/actions/contact.ts:52`); `www.juantoledo.com.mx` and `quadsci.juantoledo.com.mx` in `Juan-Toledo-CV-EN.md`. The repo has no DNS configuration.
- Environment variables: `RESEND_API_KEY`. It's in a local `.env` that git ignores and doesn't track. It has to be set in the hosting dashboard too.

### 1.4 Repo health

- `README.md` is the unchanged `create-next-app` boilerplate and says nothing about this project.
- Scripts: `dev`, `build`, `start`, `lint`. No `typecheck`, `format` or `test`.
- No tests and no Prettier.
- `.gitignore` is the standard Next one and correctly ignores `.env*` and `.vercel`.
- Leftover files:
  - `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`: create-next-app defaults, **not referenced** anywhere.
  - `public/icon.svg` (512×512 gradient "JT"): **not referenced**.
  - `app/favicon.ico` (25,931 bytes, 16/32 px). That's the exact size of the default Next.js favicon, so it's very likely still the Next logo (inference; open the file to confirm). It ships next to `app/icon.tsx`.
  - `tsconfig.json:33` excludes a folder `"Proyectos"` that doesn't exist.
  - `lib/utils.ts`: never used.
  - Root docs `Juan-Toledo-CV-EN.md`, `LINKEDIN_PROFILE_IMPROVED.md`, `TRAXION_WORK_CONTEXT.md` (19 KB) are tracked in git but aren't site content. **`TRAXION_WORK_CONTEXT.md` describes a former employer's internals in detail** (internal repo names, commit counts per repo, architecture). If the GitHub repo is public, that's a confidentiality risk (opinion).
- Commit history: 7 commits, most recent 2026-03-03.

---

## 2. Information architecture and content

### 2.1 Routes

| Route | File | Content |
|---|---|---|
| `/` | `app/page.tsx` (whole file is `"use client"`) | Fixed nav, then Hero, Services (01), Projects (02), Experience (03), Tech Stack (04), Contact (05), Footer. Navigation uses anchors only: `#services`, `#projects`, `#experience`, `#tech`, `#contact`. |
| `/icon`, `/apple-icon` | `app/icon.tsx`, `app/apple-icon.tsx` | Generated "JT" PNG favicons, `runtime = "edge"`. They use a **blue/violet/cyan gradient** (`#3b82f6 → #8b5cf6 → #06b6d4`), which doesn't match the site's emerald accent. |
| `/favicon.ico` | `app/favicon.ico` | See 1.4. |
| Server Action | `app/actions/contact.ts` | `sendContactEmail()` sends through Resend. |

That's all. There are no 404, case-study, about, CV or blog pages.

### 2.2 Languages / i18n

- **The site has Spanish and English.** `context/LanguageContext.tsx` is a client React Context with a hard-coded dictionary (`translations.es` and `translations.en`, ~110 keys each). The toggle (`components/LanguageToggle.tsx`) saves the choice to `localStorage["language"]`.
- Effects:
  - The server always renders **Spanish** (default `"es"`, plus an `isHydrated` guard). English visitors see the Spanish text first, then it switches.
  - `<html lang="es">` is hard-coded (`app/layout.tsx:51`) and never changes.
  - There are no locale URLs and no `hreflang`, so search engines never see the English version.
  - Some strings live **outside the dictionary**: Experience highlights use `language === "es" ? [...] : [...]` inside `components/Experience.tsx`; job titles, company names, tech tags, metric values, the Hero `metrics.ts` card, education institutions and `Architecture: "Event-Driven + CQRS"` are hard-coded in English. Server Action errors are English only ("Missing required fields", etc.).
  - Missing keys fall back to showing the key itself (`translations[...][key] || key`).
  - Unused keys: `project*.…` keys that cards don't reference are fine, but `hero.stat.services` is labelled "desde cero / from scratch" while it shows `6`.

### 2.3 Content inventory (exact text, ES / EN)

#### Metadata (`app/layout.tsx:18-43`, Spanish only)
- title: `"Juan Toledo | Solutions Architect & Full Stack Engineer"`
- description: `"Arquitecto de Soluciones & Ingeniero Full Stack Senior. Desarrollo web a medida, landing pages, micro-SaaS y consultoría técnica. 9+ años de experiencia con AWS, React, Node.js y desarrollo aumentado por IA."`
- keywords: `Solutions Architect, Full Stack Developer, Freelance, Desarrollo Web, Landing Pages, Micro-SaaS, AWS Serverless, Node.js, TypeScript, React, Next.js, México`
- OG description: `"Desarrollo web a medida, landing pages, micro-SaaS y consultoría técnica. 9+ años de experiencia."`

#### Nav (`app/page.tsx`)
Logo "JT". Links: Servicios/Services, Proyectos/Projects, Experiencia/Experience, Tech Stack, plus CTA "Hablemos"/"Let's Talk".

#### Hero (`components/Hero.tsx`)
- Badge: "Disponible para proyectos" / "Available for projects"
- H1: "Construyo productos digitales / que generan resultados." / "I build digital products / that deliver results."
- Lead: "Arquitecto de Soluciones & Ingeniero Full Stack Senior. Desarrollo web a medida, landing pages, micro-SaaS y consultoría técnica. 9+ años de experiencia usando IA para entregar 60% más rápido." / "Solutions Architect & Senior Full Stack Engineer. Custom web development, landing pages, micro-SaaS and technical consulting. 9+ years of experience using AI to deliver 60% faster."
- CTAs: "Solicitar cotización"/"Get a Quote" → `#contact`; "Ver proyectos"/"View Projects" → `#projects`
- Fake code card `metrics.ts` (hard-coded, `Hero.tsx:107-143`): `experience = "9+ years"`, `servicesBuilt = 6 // from scratch`, `commits = 1_400+`, `repos = 27 // microservices`, `aiAcceleration = "60% faster"`
- Stat tiles: `9+ años`, `6 desde cero`, `1.4K+ commits`

#### 01 Services (`components/Services.tsx`)
- Title "Soluciones a tu medida" / "Solutions tailored to you"; description "Desde una landing page hasta un micro-SaaS completo. Te acompaño en todo el proceso: diseño, desarrollo, despliegue y mantenimiento."
- Cards:
  1. "Desarrollo Web a Medida": "Aplicaciones web complejas con arquitectura escalable. Dashboards, plataformas, sistemas internos." Tags React, Next.js, Vue, Node.js, AWS
  2. "Landing Pages de Alto Impacto": "Sitios optimizados para conversión. Rápidos, responsivos y con SEO integrado desde el primer día." Tags SEO, Performance, Analytics, A/B Testing
  3. "Micro-SaaS": "Productos digitales end-to-end: autenticación, pagos, base de datos, deploy. Tu idea en producción." Tags Full Stack, Auth, Payments, Deploy
  4. "Consultoría Técnica": "Arquitectura de soluciones, migración a la nube, integración de IA, optimización de rendimiento." Tags Architecture, AI, Cloud, CI/CD
- CTA "Solicitar cotización"

#### 02 Projects / case studies (`components/Projects.tsx` and dictionary)
Header: "Casos de Estudio", "Arquitectura en acción", "Sistemas reales diseñados para escala, confiabilidad y rendimiento. Todos en producción." Every card shows a hard-coded **"Traxion"** badge (`Projects.tsx:194`). The "Mass Update" card is expanded by default.

| # | Title (ES / EN) | From scratch | Tech | Metrics |
|---|---|---|---|---|
| traxibot | "TraxiBot — WhatsApp 24/7" | yes | Meta WhatsApp API, Twilio, AWS ECS, Docker, TypeScript, PostgreSQL | Respuesta `<2s`, Tickets `-40%`, Uptime `99.5%` |
| mass-update | "Motor de Actualización Masiva" / "Mass Update Engine" | yes | AWS Lambda, RabbitMQ, ExcelJS, PostgreSQL, MongoDB; Architecture "Event-Driven + CQRS" | Procesamiento `30→8min`, Timeouts `0%`, Reducción costo `70%` |
| realtime | "Monitor de Tráfico en Tiempo Real" / "Real-Time Traffic Monitor" | **no** | Socket.io, Redis, React, Leaflet, MongoDB | Latencia `<1s`, Puntualidad `40%`, Vehículos `500+` |
| qr-system | "Ecosistema de QRs Seguros" / "Secure QR Ecosystem" | yes | AWS Lambda, AES-256, Sharp, S3, MongoDB | QRs/petición `10K+`, Velocidad `95%`, Memoria `-40%` |

Challenge and solution text (ES):
- TraxiBot: "Miles de empleados necesitaban su pase QR para el transporte corporativo. RRHH distribuía QRs manualmente, generando cuellos de botella constantes." / "Chatbot WhatsApp 24/7: empleado escribe → Bot valida empresa (búsqueda fuzzy) → valida empleado → genera QR cifrado → envía imagen al instante. Sin intervención humana." AI highlight: "Usé Claude para diseñar la lógica conversacional en 60% menos tiempo"
- Mass update: "Administradores necesitaban actualizar miles de viajes simultáneamente con archivos Excel de 50,000+ filas. El sistema anterior colapsaba con timeouts." / "Procesamiento en background: Excel → RabbitMQ encola → Lambda procesa en batches → actualiza 5 bases de datos con transacciones ACID → notifica progreso en tiempo real."
- Realtime: "Operadores de transporte necesitaban ver cientos de vehículos en tiempo real, detectar retrasos y monitorear abordajes en rutas de todo México." / "Dashboard con WebSockets (Socket.io + Redis) que muestra posición GPS cada 5 segundos, comparación de ruta programada vs real, y conteo de abordajes por viaje."
- QR: "Empresas nuevas necesitaban miles de pases QR cifrados para todos sus empleados. Procesar 10,000+ QRs en Lambda causaba errores de memoria." / "Lambda procesa en batches de 50 con garbage collection → genera imágenes QR con Sharp → comprime en ZIP via streams → sube a S3 → devuelve URL de descarga."
(The EN versions are direct translations; see `context/LanguageContext.tsx:167-194`.)

Footer link: "Ver más en LinkedIn" → `https://www.linkedin.com/in/juan-alberto-toledo-tello`.

#### 03 Experience (`components/Experience.tsx`, data hard-coded)
Header: "Trayectoria profesional", "9+ años transformando operaciones manuales en ecosistemas tecnológicos de alto rendimiento."

| Title | Company | Location | Period | Highlights (ES) |
|---|---|---|---|---|
| AI-Augmented Solutions Architect & Full Stack Developer | Traxion | Ciudad de México | "2024 - Actual" (`current: true`) | "6 microservicios construidos desde cero en un ecosistema de 27 repos"; "TraxiBot WhatsApp 24/7 — 3 proveedores, desplegado en AWS ECS"; "Motor de procesamiento masivo: 50K+ registros, 5 DBs en paralelo"; "Monitor en tiempo real con WebSockets para cientos de vehículos" |
| Senior Frontend Developer | PALO IT | Ciudad de México | 2022 - 2023 | "Desarrollo full-stack en múltiples proyectos cliente"; "Integración de AWS Lambda y arquitecturas Serverless" |
| Frontend Developer | MOONS | Ciudad de México | 2021 - 2022 | "Rediseño de sitio corporativo y apps internas con Next.js" |
| UI/UX Developer | Grupo Salinas | Ciudad de México | 2019 - 2021 | "Mantenimiento y mejora de aplicaciones empresariales clave" |
| Front End Developer | INEEL | Cuernavaca, Morelos | 2017 - 2019 | "Repositorio institucional y proyecto 'Unidad Central Maestra' para CFE" |

Education box: "Máster en Ingeniería Web — UNIR, 2024"; "Ingeniería en Sistemas — TecNM Zacatepec, 2017".

#### 04 Tech stack (`components/TechStack.tsx`)
"Herramientas del oficio": "Un enfoque políglota centrado en resolver problemas, no en frameworks."
- Arquitectura: AWS Lambda, EventBridge, ECS Fargate, Serverless Framework, Microservices, Docker
- Backend: Node.js, TypeScript, Python, FastAPI, NestJS, Express
- Frontend: React, Next.js, Vue 3, Angular, Tailwind CSS, Material UI
- Bases de datos: PostgreSQL, MongoDB, Redis, DocumentDB, S3
- Tiempo real: Socket.io, RabbitMQ, WebSockets, EventBridge
- IA / LLM: Claude / Cursor, ChatGPT, Gemini, Groq API, RAG, LLM APIs

#### 05 Contact (`components/ContactForm.tsx`, `app/actions/contact.ts`)
- "Hablemos de tu proyecto": "Cuéntame qué necesitas y te respondo en menos de 24 horas con una propuesta personalizada."
- Form: Nombre, Email, Tipo de servicio (Desarrollo Web a Medida / Landing Page / Micro-SaaS / Consultoría Técnica / Otro), Mensaje.
- Direct contact: `johntoledot@gmail.com`, `+52 777 493 9562` (`tel:+527774939562`), "Ciudad de México, México".
- Social: LinkedIn `https://www.linkedin.com/in/juan-alberto-toledo-tello`, GitHub `https://github.com/JuanToledo23`.
- Availability card: "Disponible para proyectos" plus "Freelance, consultoría o roles corporativos con enfoque en IA y arquitectura."
- Email delivery: from `Portfolio Contact <onboarding@resend.dev>` (Resend's shared test sender, not your domain), to `johntoledot@gmail.com`, subject `[Portfolio] New inquiry from ${name} — ${service}`, `replyTo` = visitor email.

#### Footer (`components/Footer.tsx`)
"© {year} Juan Alberto Toledo Tello. Hecho con Next.js e IA." Icons for mail, LinkedIn and GitHub. Labels "Next.js · Tailwind · Vercel".

#### Downloadable files and images
- **No CV PDF and no downloads.**
- **No raster images**: no photo, project screenshots or OG image. Assets are SVGs (≤1.4 KB each, all unused) and `favicon.ico` (25.9 KB).

#### Non-site documents in the repo root
- `Juan-Toledo-CV-EN.md`: CV dated "Last updated 2025". It lists Traxion as "Current" and mentions a "SpaceX Dashboard (Full-Stack + LLM)" project live at `quadsci.juantoledo.com.mx`, plus BrightPath ("Platform for managing pedagogical assessment items. Next.js, deployed on Vercel/Hostinger.").
- `LINKEDIN_PROFILE_IMPROVED.md`: LinkedIn "About" drafts, AI-Augmented Solutions Architect framing.
- `TRAXION_WORK_CONTEXT.md`: detailed Traxión work log, Apr 2024 – Feb 2026, "~1,400+" commits across 27 repos.

### 2.4 Outdated or inconsistent content against current positioning

| # | Text (exact) | Location | Problem |
|---|---|---|---|
| 1 | `company: "Traxion"`, `period: "2024 - " + t("experience.current")`, `current: true` | `components/Experience.tsx:16-19` | Traxión ended Mar 2026. The month is missing (should be Apr 2024 – Mar 2026). |
| 2 | (missing) | `components/Experience.tsx` | **No QuadSci entry** (Senior Full-Stack Developer, Mar 2026 – present). |
| 3 | `"AI-Augmented Solutions Architect & Full Stack Developer"` | `Experience.tsx:15`, CV md, LinkedIn md | Title doesn't match the "Senior Full-Stack / founding engineer" positioning. |
| 4 | Restaurant QR ordering / pay-at-table, BrightPath, Wapi, Tendero, Cauce | not anywhere on the site | Your main products are missing. BrightPath appears only in `Juan-Toledo-CV-EN.md:76`. |
| 5 | `<span ...>Traxion</span>` | `components/Projects.tsx:194` | Every case study is credited to one former employer. The case studies are features, not products. |
| 6 | "Disponible para proyectos" / "Solicitar cotización" / "Get a Quote" | `LanguageContext.tsx:23,27,44,123` | Freelance and quoting framing. |
| 7 | "Desarrollo web a medida, landing pages, micro-SaaS y consultoría técnica." | `layout.tsx:21,40`, `LanguageContext.tsx:26,138` | Sells services like an agency, not end-to-end products or leadership roles. |
| 8 | Services: "Landing Pages de Alto Impacto", "Micro-SaaS", "Consultoría Técnica" and form options of the same names | `LanguageContext.tsx:36-44,109-115` | Same problem. |
| 9 | "Freelance, consultoría o roles corporativos con enfoque en IA y arquitectura." | `LanguageContext.tsx:124` | Doesn't mention founding-engineer or co-founder roles. |
| 10 | `servicesBuilt = 6`, `commits = 1_400+`, `repos = 27`, stat tiles "6 desde cero", "1.4K+ commits" | `Hero.tsx:107-151` | Traxión-only vanity metrics presented as career totals. |
| 11 | "9+ años de experiencia usando IA para entregar 60% más rápido." and `aiAcceleration = "60% faster"` | `LanguageContext.tsx:26`, `Hero.tsx:141` | An unsupported number, and it's not the "spec-driven methodology" message (opinion). |
| 12 | `keywords: [... "Freelance", "Landing Pages", "Micro-SaaS" ...]` | `layout.tsx:22-35` | Wrong positioning for SEO. |
| 13 | "Hecho con Next.js e IA." | `LanguageContext.tsx:126` | Minor; can stay if it fits the AI-assisted message. |
| 14 | Grupo Salinas: site `"UI/UX Developer"` vs CV `"Maquetador"` | `Experience.tsx:65` vs `Juan-Toledo-CV-EN.md` | Title doesn't match between site and CV. |
| 15 | Master's: site `"Máster en Ingeniería Web"` vs CV `"Master's in Management and Web Engineering"` | `LanguageContext.tsx:89` vs CV md | Degree name doesn't match. |
| 16 | Location: site `"Ciudad de México, México"` vs CV `"Cuauhtémoc, Mexico City"` | `ContactForm.tsx:229` vs CV md | Minor mismatch. |
| 17 | Realtime monitor `fromScratch: false` vs CV "Built trip monitoring dashboard" | `Projects.tsx:56` vs CV md | Ownership claim is unclear. |
| 18 | "-40%" appears three times (Tickets, Memoria, plus "Puntualidad 40%") | `Projects.tsx:35,62,76` | Reads as made-up numbers (opinion). |
| 19 | `"*CV in English · Mexican citizenship · Last updated 2025*"`, Traxion "Current" | `Juan-Toledo-CV-EN.md` | Outdated source doc. |
| 20 | "Sistemas reales... Todos en producción." | `LanguageContext.tsx:48` | Can't be verified for former-employer systems as of today. |

---

## 3. Design and UX

### 3.1 Design system
**Custom, not a template**, but in the familiar "dark dev portfolio" style (zinc-black, emerald accent, mono labels, section numbers "01–05", fake editor window). Opinion: it's clean but generic, and very common on Tailwind portfolio sites.

- Tokens in `app/globals.css:3-16`: `--bg #09090b`, `--bg-surface #111113`, `--bg-hover #18181b`, `--text-primary #ececec`, `--text-secondary #8a8a8a`, `--text-muted #555`, `--accent #10b981`, `--accent-hover #34d399`, `--accent-subtle`, `--border #1c1c20`, `--border-hover #2a2a2e`, `--danger #f43f5e`.
- **Components mostly don't use the tokens.** They repeat hex literals in Tailwind arbitrary values (`text-[#8a8a8a]`, `bg-[#111113]`, `border-[#1c1c20]`…) and mix in Tailwind palette names (`emerald-400/500/600`, `amber-300/400`). `LanguageToggle` uses a different grey scale again (`#18181b`, `#27272a`, `#71717a`, `#a1a1aa`, `#fafafa`). Only `--color-background` and `--color-foreground` are exposed to Tailwind via `@theme inline`.
- Hand-written classes: `.btn-primary`, `.btn-outline`, `.badge` (unused), `.card`, `.mono`, `.section-number`, `.animate-pulse-dot`.
- Typography: Inter for sans and Geist Mono for mono, loaded through `next/font`. Sizes: H1 `text-4xl → 6xl`, H2 `text-3xl/4xl`, body `text-sm`/`text-lg`. The base font drops to 14px under 768px (`globals.css:159-163`).
- Layout: containers of `max-w-6xl` / `4xl` / `3xl` (they vary per section), sections `py-24 md:py-32`.
- Dark only: `className="dark"` on `<html>`, no light theme and no `prefers-color-scheme`. Brand mismatch: the favicons use a blue and violet gradient.

### 3.2 Responsiveness (from the code)
- Nav: links sit inside `hidden md:flex`. Under `md` you get a hamburger with an open/closed panel and the language toggle stays visible. The menu button has `aria-label="Toggle menu"` but no `aria-expanded`.
- Hero: `grid lg:grid-cols-5`. It stacks below `lg` (1024px) and the code card goes under the text. `min-h-screen` plus `pt-24`. CTAs stack below `sm`.
- Services: 1 column, then 2 at `sm`. Tech: 1, 2 at `sm`, 3 at `lg`. Contact: stacks below `lg`, and Name/Email sit side by side at `sm`.
- Project cards: the metrics row is `flex gap-6` **without wrap** (`Projects.tsx:225`). Three metrics with labels like "Reducción costo" can overflow at ~320–360px widths, and `body { overflow-x: hidden }` (`globals.css:38`) hides overflow instead of fixing it (likely, not tested in a browser).
- Gutters are `px-6` (24px) in sections and `px-4 sm:px-6` in the nav.

### 3.3 Accessibility
- Semantics: there's one `<main>`, `<nav>`, `<section id>` and `<footer>`. Headings go h1 (hero), h2 (sections), h3 (cards); Experience has an h4 "Educación" directly under the h2 context after h3 items, which is acceptable. The hero H1 is split with `<br/>`, which is fine.
- **Project cards expand with a `<div onClick>`** (`Projects.tsx:189`). There's no button, `tabIndex`, keyboard handler or `aria-expanded`, so keyboard and screen-reader users can't open them.
- Language toggle buttons have no `aria-pressed` or `aria-label`, and switching language doesn't update `lang`.
- Contrast (computed from the hex values, WCAG):
  - `#8a8a8a` on `#09090b` ≈ **5.7:1** (passes).
  - `#555` on `#09090b` ≈ **2.7:1** (fails). It's used for stat labels, metric labels, tech tags, the footer and the availability description.
  - `#444` (code comments) ≈ **2.0:1** (fails).
  - White on `--accent #10b981` (`.btn-primary`, the hero and services CTAs) ≈ **2.5:1** (fails). On hover it's white on `#34d399`, which is worse.
  - White on `emerald-600 #059669` (nav CTA, submit) ≈ **3.8:1** (fails AA for 14px text).
- Focus: form fields use `focus:outline-none` with only a faint `border-emerald-500/40`, which is a weak focus indicator. Links and buttons keep the browser default outline. There are no `focus-visible` styles.
- Motion: Framer Motion animations everywhere, an infinite scroll-hint animation, `animate-ping` dots, and no `prefers-reduced-motion` handling.
- Alt text: there are no `<img>` elements. Icons are decorative lucide SVGs; footer icon links have `aria-label`.
- Form: labels are tied to inputs correctly with `htmlFor`/`id`. Errors appear only inside the button label and aren't announced (no `aria-live`).

---

## 4. SEO and performance

### 4.1 SEO
- Present: `title`, `description`, `keywords`, `authors`, `openGraph {title, description, type}`, all in Spanish.
- **Missing**:
  - `metadataBase`, `alternates.canonical`, `openGraph.url` and `locale`, an **OG/Twitter image** (link previews on LinkedIn and WhatsApp will have no image), and Twitter card.
  - `app/sitemap.ts` and `app/robots.ts` (or static files).
  - JSON-LD (`Person` / `ProfilePage`) and `hreflang`.
  - English metadata.
- Language toggling is client-side, so search engines only index Spanish.
- Analytics: Vercel Web Analytics and Speed Insights only, with no Google Analytics, Plausible or Search Console verification in code.

### 4.2 Performance
- **The whole page is a client component tree.** `app/page.tsx` has `"use client"`, and every section is a client component because of `useLanguage()` and Framer Motion. Everything gets server-rendered, but all the copy for **both languages** ships in the JS bundle and hydrates. No RSC benefits.
- **Content starts at `opacity: 0`.** Framer Motion `initial={{ opacity: 0, y: … }}` on the hero H1 and lead means the largest text paints only after JS runs. That hurts LCP, and with JS disabled the content stays invisible (inference from Framer Motion SSR behaviour).
- **Inter probably isn't applied.** `globals.css:36` sets `body { font-family: 'Inter', system-ui, … }` as a literal. `next/font` registers Inter under a generated family name exposed as `--font-inter`, so this rule overrides Tailwind's `--font-sans` inheritance and body text likely shows in the OS system font while the Inter files still download (inference from the code; check in DevTools).
- Images: none, so nothing heavy. Unused SVGs in `/public` cost nothing at runtime.
- Third-party scripts: only the Vercel Analytics and Speed Insights scripts (small).
- Icons run on the Edge runtime (`export const runtime = "edge"`). Opinion: drop that line; these can be statically generated.
- No obviously heavy dependencies besides `framer-motion` (~30–50 KB gz used throughout).

### 4.3 Contact form security (`app/actions/contact.ts`)
- `name`, `email`, `service` and `message` go straight into the email HTML with **no escaping**, so someone can inject HTML or links into your inbox.
- No rate limiting, honeypot, CAPTCHA or Turnstile, and no length limits, so the form is open to spam.
- Sending from `onboarding@resend.dev` only works for the Resend account owner's own address, and it's unbranded. A verified `juantoledo.com.mx` sender domain would be better.
- Combined with the Next 16.0.10 advisory "null origin can bypass Server Actions CSRF checks", **upgrading Next is the first job**.

---

## 5. Reusability assessment

### Keep (as is or with light changes)
- The toolchain: Next App Router, TypeScript strict, Tailwind v4, ESLint flat config, Vercel Analytics and Speed Insights.
- The colour palette and dark visual language, **if** they get consolidated into Tailwind `@theme` tokens and the CTA contrast is fixed.
- The `sendContactEmail` Server Action pattern with Resend, after you add escaping, validation (e.g. zod), a honeypot or Turnstile, and a domain sender.
- The structure of the Experience timeline component (the data needs updating).
- The mobile nav pattern and the footer.
- From the Traxión case studies: the bulk-update engine and TraxiBot texts can come back as one condensed "Previous work" entry (opinion).

### Rewrite
- All positioning copy: metadata, hero, services, availability, contact form "service type" options (should be inquiry types: role, founding/co-founder, product build).
- Case studies, rebuilt around **products** (restaurant QR/pay-at-table, BrightPath, Wapi, Tendero, Cauce) using a "definition → spec → build → production" format. Each should get its own page or at least a deep section.
- i18n: locale routing (`/es`, `/en`) with server-rendered dictionaries or content files, a dynamic `lang`, hreflang and per-locale metadata.
- The data layer: move content out of components into typed content files (TS/JSON or MDX) so a content update doesn't mean touching JSX.
- Accessibility fixes: button semantics for the expanders, focus-visible, contrast, reduced motion.
- SEO: canonical, OG image (can use `next/og`), sitemap, robots, JSON-LD.

### Remove
- Unused `public/*.svg`, the default `favicon.ico` (if confirmed), `lib/utils.ts` (or start using it), the `"Proyectos"` tsconfig exclude, one of the two lockfiles, and the boilerplate README.
- Freelance services sections and "Solicitar cotización" CTAs.
- The Traxión vanity metrics (`1_400+ commits`, `27 repos`, `6 desde cero`) and the "60% faster" claim, unless you can back it up.
- Move `TRAXION_WORK_CONTEXT.md`, `LINKEDIN_PROFILE_IMPROVED.md` and `Juan-Toledo-CV-EN.md` out of the site repo (or at least out of a public repo).

### Effort estimates (opinion, focused solo work with AI assistance)

| Option | Scope | Estimate | Result |
|---|---|---|---|
| **(a) Content only, current structure** | Upgrade Next; rewrite dictionary and Experience data; add QuadSci; replace 4 case studies with products; fix metadata | **0.5–1.5 days** | Correct facts, but the page still *reads* like a freelance services site (Services section, quote CTA, Traxión badge). English still isn't indexable. No product pages. Doesn't deliver the "one clear message" goal. |
| **(b) Rebuild on same stack, new structure** | New IA (Hero with positioning, Products/case studies with per-product pages, How I work (spec-driven method), Experience, Roles I'm open to, Contact); locale routing; content in typed files/MDX; Server Components with small client islands; tokens consolidated; a11y and SEO basics; hardened contact | **3–5 days** for build, plus your time writing product case studies (often the real bottleneck, 1–3 days) | Fits the goal. Reuses tokens, contact action, timeline and toolchain. |
| **(c) Switch stack** (e.g. Astro and content collections) | Same as (b), plus new framework, rewriting the contact form as an API route, redoing the deploy setup | **4–7 days** | Somewhat less JS on a mostly static site, but you lose the Next/React stack that is also your professional showcase. Small gain for the cost. |

---

## 6. Open questions (couldn't be determined from the repo)

1. **Hosting**: is it really Vercel? Which account or team, and is production deployed from `main` automatically through the Git integration? (There's no `.vercel/` or config in the repo.)
2. **DNS and domain**: where `juantoledo.com.mx` is registered and where its DNS lives (Vercel, Hostinger, other). Is `www` or the apex the canonical host? Who serves `quadsci.juantoledo.com.mx`, and should that subdomain stay?
3. **Analytics ownership**: is Vercel Web Analytics actually turned on in the project dashboard? Do you have Google Search Console set up for the domain?
4. **Resend**: is `RESEND_API_KEY` set in production? Is a sender domain verified? Does the form currently deliver mail?
5. **Repo visibility**: is `JuanToledo23/my-cv` public? If so, consider the Traxión document (see 1.4).
6. **Favicon**: is `app/favicon.ico` still the default Next logo? (Open it to check; the byte size matches the default.)
7. **Product content**: for each product (restaurant QR/pay-at-table, BrightPath, Wapi, Tendero, Cauce), what can be shown publicly: names, live URLs, screenshots, metrics, client permission, your role (solo, founder, contractor)?
8. **QuadSci**: what may be said publicly about the role and its work? Is the "SpaceX Dashboard" at `quadsci.juantoledo.com.mx` related, and should it appear?
9. **Language priority**: which should be primary, and should `/` default to English given the target roles (possibly remote, international)?
10. **Phone number**: do you want `+52 777 493 9562` to stay public on the site?
11. **CV download**: do you want downloadable PDF CVs (ES/EN)? None exist in the repo.

---

## Recommendation

**Go with option (b): rebuild on the current stack (Next.js + Tailwind v4 on Vercel) with a new information architecture.** This is an opinion, based on the findings above.

Reasons:
- What's wrong today is mostly the **message and structure**: agency services, a quote CTA, case studies credited to one employer, no products. The tech isn't the problem, so a content-only pass (a) can't deliver the "one clear thing" goal.
- The stack is fine and is itself proof of the skills you're selling. Switching (c) costs extra days for little gain on a small static-ish site.
- The parts worth keeping (tokens, contact action, timeline, toolchain) carry over directly into (b).
- Several fixes are needed anyway and are much easier in a rebuild: the Next security upgrade, indexable bilingual URLs, Server Components instead of an all-client page, accessible and contrast-safe components, and full SEO metadata.

Suggested order (not implemented):
1. Upgrade `next` to the latest patched 16.x and remove the duplicate lockfile.
2. Write the content first (spec-driven): positioning statement, the five product case studies, "how I work", target roles.
3. Build the new IA on locale routes with content in typed files.
4. Add SEO and accessibility basics, harden the contact form.
5. Clean up leftovers.
