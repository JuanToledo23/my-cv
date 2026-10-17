import type { MetadataRoute } from "next";
import { content } from "@/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: new URL(content.en.meta.path, SITE_URL).href,
    es: new URL(content.es.meta.path, SITE_URL).href,
  };
  return [content.en, content.es].map((c) => ({
    url: new URL(c.meta.path, SITE_URL).href,
    changeFrequency: "monthly",
    priority: c.locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
