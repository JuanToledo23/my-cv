import { content } from "@/content";
import type { Locale } from "@/content/types";

// Phase 2 shell: wires locale content, tokens and fonts. Sections get their real components in phase 3.
export function SitePage({ locale }: { locale: Locale }) {
  const c = content[locale];
  const sections = [
    { id: "work", label: c.work.label, title: c.work.title, intro: c.work.intro },
    { id: "method", label: c.method.label, title: c.method.title, intro: c.method.intro },
    { id: "experience", label: c.experience.label, title: c.experience.title },
    { id: "roles", label: c.roles.label, title: c.roles.title },
    { id: "contact", label: c.contact.label, title: c.contact.title, intro: c.contact.intro },
  ];

  return (
    <>
      <header className="border-b border-rule">
        <div className="mx-auto flex max-w-page items-center justify-between px-6 py-4 md:px-10">
          <a href="#about" className="font-serif text-h3 text-ink">
            {c.nav.home}
          </a>
          <a
            href={c.nav.switch.href}
            hrefLang={c.nav.switch.lang}
            lang={c.nav.switch.lang}
            aria-label={c.nav.switch.ariaLabel}
            className="text-meta text-accent hover:underline"
          >
            {c.nav.switch.label}
          </a>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-page px-6 md:px-10">
        <section id="about" className="py-16 md:py-24">
          <p className="text-label uppercase text-ink-3">{c.hero.kicker}</p>
          <h1 className="mt-4 max-w-measure text-display">{c.hero.h1}</h1>
          <p className="mt-6 max-w-measure">{c.hero.lead}</p>
        </section>
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="border-t border-rule py-16 md:py-24">
            <p className="text-label font-semibold uppercase text-accent">{s.label}</p>
            <h2 className="mt-3 text-title">{s.title}</h2>
            {s.intro && <p className="mt-4 max-w-measure">{s.intro}</p>}
          </section>
        ))}
      </main>
      <footer className="border-t border-rule">
        <p className="mx-auto max-w-page px-6 py-8 text-meta text-ink-3 md:px-10">
          {c.footer.copyright.replace("{year}", String(new Date().getFullYear()))} · {c.footer.builtWith}
        </p>
      </footer>
    </>
  );
}
