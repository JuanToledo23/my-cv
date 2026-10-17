import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { buttonPrimary, buttonSecondary, container } from "./styles";

function Headline({ text, underline }: { text: string; underline: string }) {
  const at = text.indexOf(underline);
  if (!underline || at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="whitespace-nowrap border-b-[3px] border-warm">{underline}</span>
      {text.slice(at + underline.length)}
    </>
  );
}

export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  const { portrait } = hero;
  return (
    <section id="about" aria-labelledby="about-title" className={container}>
      <div
        className={`py-16 md:py-24 ${portrait ? "md:grid md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:gap-16" : ""}`}
      >
        <div className="max-w-measure">
          <p className="text-label font-semibold uppercase text-ink-3">{hero.kicker}</p>
          <h1 id="about-title" className="mt-5 text-display">
            <Headline text={hero.h1} underline={hero.h1Underline} />
          </h1>
          <p className="mt-6">{hero.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={hero.primary.href} className={buttonPrimary}>
              {hero.primary.label}
            </a>
            <a href={hero.secondary.href} className={buttonSecondary}>
              {hero.secondary.label}
            </a>
          </div>
        </div>
        {portrait && (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={560}
            height={700}
            priority
            className="mt-12 h-auto w-full max-w-[280px] rounded-lg border border-rule md:mt-0"
          />
        )}
      </div>
    </section>
  );
}
