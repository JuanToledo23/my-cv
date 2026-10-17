import { content } from "@/content";
import type { Locale } from "@/content/types";
import { jsonLdString, personJsonLd } from "@/lib/jsonld";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { MethodSteps } from "./MethodSteps";
import { ProofRow } from "./ProofRow";
import { RolesStrip } from "./RolesStrip";
import { Timeline } from "./Timeline";
import { TopBar } from "./TopBar";
import { Work } from "./Work";

export function SitePage({ locale }: { locale: Locale }) {
  const c = content[locale];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(personJsonLd(locale)) }}
      />
      <TopBar nav={c.nav} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero hero={c.hero} />
        <ProofRow proof={c.proof} />
        <Work work={c.work} />
        <MethodSteps method={c.method} />
        <Timeline experience={c.experience} />
        <RolesStrip roles={c.roles} />
        <Contact contact={c.contact} />
      </main>
      <Footer footer={c.footer} switchLink={c.nav.switch} />
    </>
  );
}
