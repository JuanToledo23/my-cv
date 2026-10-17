import type { SiteContent } from "@/content/types";
import { container } from "./styles";

type Props = { footer: SiteContent["footer"]; switchLink: SiteContent["nav"]["switch"] };

export function Footer({ footer, switchLink }: Props) {
  const year = String(new Date().getFullYear());
  return (
    <footer className={container}>
      <div className="flex flex-col gap-3 border-t border-rule py-8 text-meta text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {footer.copyright.replace("{year}", year)} · {footer.builtWith}
        </p>
        <a
          href={switchLink.href}
          hrefLang={switchLink.lang}
            className="font-semibold text-accent underline-offset-4 hover:text-accent-ink hover:underline"
        >
          {switchLink.label}
          <span lang={switchLink.lang} className="sr-only">
            {" "}
            · {switchLink.srText}
          </span>
        </a>
      </div>
    </footer>
  );
}
