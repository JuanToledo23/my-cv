import { content } from "@/content";
import type { Locale } from "@/content/types";
import { PERSON_NAME, PERSON_SHORT_NAME, SITE_URL } from "./site";

export function personJsonLd(locale: Locale) {
  const c = content[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME,
    alternateName: PERSON_SHORT_NAME,
    url: new URL(c.meta.path, SITE_URL).href,
    jobTitle: c.meta.jobTitle,
    description: c.meta.description,
    email: `mailto:${c.contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: c.meta.locality, addressCountry: "MX" },
    sameAs: [c.contact.linkedin.href, c.contact.github.href],
  };
}

// JSON inside <script>: escape "<" so the content can never close the tag.
export function jsonLdString(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
