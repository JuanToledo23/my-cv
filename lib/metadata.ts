import type { Metadata } from "next";
import { content } from "@/content";
import type { Locale } from "@/content/types";
import { SITE_URL } from "./site";

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = content[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.path,
      languages: {
        en: content.en.meta.path,
        es: content.es.meta.path,
        "x-default": content.en.meta.path,
      },
    },
  };
}
