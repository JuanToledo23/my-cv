import type { SiteContent } from "@/content/types";
import { label } from "./styles";
import { Section } from "./Section";

export function Timeline({ experience }: { experience: SiteContent["experience"] }) {
  return (
    <Section id="experience" label={experience.label} title={experience.title}>
      <ol className="border-l border-rule">
        {experience.items.map((item) => (
          <li key={item.role} className={`relative pl-6 md:pl-8 ${item.compact ? "pb-8" : "pb-10"}`}>
            <span aria-hidden="true" className="absolute -left-[5px] top-2.5 size-[9px] rounded-full bg-accent" />
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <h3 className={item.compact ? "font-sans text-body font-semibold" : "text-h3"}>{item.role}</h3>
              <p className="shrink-0 text-meta text-ink-3 md:text-right">{item.dates}</p>
            </div>
            <p className={`mt-2 max-w-measure ${item.compact ? "text-meta" : ""}`}>{item.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-4">
        <p className={label}>{experience.educationLabel}</p>
        <p className="mt-2 max-w-measure text-meta text-ink-2">{experience.education}</p>
      </div>
    </Section>
  );
}
