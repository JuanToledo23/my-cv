import type { Metadata } from "next";
import { content } from "@/content";
import type { Locale } from "@/content/types";
import { PERSON_SHORT_NAME, SITE_URL } from "./site";

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = content[locale];
  const other = content[locale === "en" ? "es" : "en"].meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    authors: [{ name: PERSON_SHORT_NAME, url: SITE_URL }],
    alternates: {
      canonical: meta.path,
      languages: {
        en: content.en.meta.path,
        es: content.es.meta.path,
        "x-default": content.en.meta.path,
      },
    },
    // og:image comes from the opengraph-image file next to each page.
    openGraph: {
      type: "profile",
      url: meta.path,
      siteName: PERSON_SHORT_NAME,
      title: meta.title,
      description: meta.description,
      locale: meta.ogLocale,
      alternateLocale: [other.ogLocale],
    },
    // X falls back to og:image when twitter:image is absent.
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}
