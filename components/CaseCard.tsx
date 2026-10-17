import Image from "next/image";
import type { Case, SiteContent } from "@/content/types";
import { buttonSmall, label } from "./styles";

type Props = { item: Case; labels: SiteContent["work"]["blockLabels"] };

export function CaseCard({ item, labels }: Props) {
  const blocks = [
    { key: "problem", label: labels.problem, text: item.problem },
    { key: "built", label: labels.built, text: item.built },
    { key: "time", label: labels.time, text: item.time },
    { key: "result", label: labels.result, text: item.result },
  ];

  return (
    <article
      id={item.slug}
      aria-labelledby={`${item.slug}-title`}
      className="rounded-lg border border-rule bg-surface p-6 transition-colors hover:border-ink-3 md:p-10"
    >
      <h3 id={`${item.slug}-title`} className="text-h3">
        {item.title}
      </h3>
      <p className="mt-2 text-meta text-ink-3">{item.meta}</p>

      <dl className="mt-8 grid gap-x-12 gap-y-7 md:grid-cols-2">
        {blocks.map((b) => (
          <div key={b.key}>
            <dt className={label}>{b.label}</dt>
            <dd className="mt-2 text-ink-2">{b.text}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 border-t border-rule pt-5 text-meta text-ink-2">
        <span className={`${label} mr-3`}>{labels.stack}</span>
        {item.stack}
      </p>

      {item.links && item.links.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {item.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={buttonSmall}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {item.media && (
        <Image
          src={item.media.src}
          alt={item.media.alt}
          width={1600}
          height={1000}
          sizes="(min-width: 1120px) 1040px, 100vw"
          className="mt-8 h-auto w-full rounded-md border border-rule"
        />
      )}
    </article>
  );
}
