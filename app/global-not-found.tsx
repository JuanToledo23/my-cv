import type { Metadata } from "next";
import { HtmlShell } from "@/components/HtmlShell";
import { content } from "@/content";

const { en, es } = content;

export const metadata: Metadata = { title: `404 — ${en.notFound.title}` };

export default function GlobalNotFound() {
  return (
    <HtmlShell lang="en">
      <main className="mx-auto max-w-page px-6 py-24 md:px-10">
        <h1 className="text-display">{en.notFound.title}</h1>
        <p className="mt-6 max-w-measure">{en.notFound.text}</p>
        <p className="mt-6">
          <a href={en.notFound.home.href} className="text-accent underline hover:text-accent-ink">
            {en.notFound.home.label}
          </a>
        </p>
        <div lang="es" className="mt-16 border-t border-rule pt-8">
          <h2 className="text-title">{es.notFound.title}</h2>
          <p className="mt-4 max-w-measure">{es.notFound.text}</p>
          <p className="mt-4">
            <a href={es.notFound.home.href} className="text-accent underline hover:text-accent-ink">
              {es.notFound.home.label}
            </a>
          </p>
        </div>
      </main>
    </HtmlShell>
  );
}
