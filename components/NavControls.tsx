"use client";

import { useEffect, useId, useState } from "react";
import type { SiteContent } from "@/content/types";
import { container } from "./styles";

// Locale switch (keeps the current #anchor) and the mobile menu toggle.
export function NavControls({ nav }: { nav: SiteContent["nav"] }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function switchLocale(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!window.location.hash) return;
    e.preventDefault();
    window.location.assign(nav.switch.href + window.location.hash);
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={nav.switch.href}
        hrefLang={nav.switch.lang}
        aria-label={nav.switch.ariaLabel}
        onClick={switchLocale}
        className="rounded-md px-2 py-1.5 text-meta font-semibold text-accent underline-offset-4 hover:text-accent-ink hover:underline"
      >
        {nav.switch.label}
      </a>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="rounded-md border border-rule px-3 py-1.5 text-meta font-medium text-ink hover:border-ink-3 lg:hidden"
      >
        {nav.menu}
      </button>
      <nav
        id={menuId}
        aria-label={nav.menu}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-rule bg-paper lg:hidden"
      >
        <ul className={`${container} py-2`}>
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-ink underline-offset-4 hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
