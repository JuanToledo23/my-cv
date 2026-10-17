import type { SiteContent } from "@/content/types";
import { NavControls } from "./NavControls";
import { container } from "./styles";

export function TopBar({ nav }: { nav: SiteContent["nav"] }) {
  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-meta focus:text-ink"
      >
        {nav.skipToContent}
      </a>
      <div className={`${container} flex h-16 items-center justify-between gap-6`}>
        <a href="#about" className="font-serif text-[20px] font-semibold text-ink">
          {nav.home}
        </a>
        <nav aria-label={nav.menu} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-meta">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-ink-2 underline-offset-4 hover:text-ink hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <NavControls nav={nav} />
      </div>
    </header>
  );
}
