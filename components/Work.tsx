import type { SiteContent } from "@/content/types";
import { CaseCard } from "./CaseCard";
import { Section } from "./Section";

export function Work({ work }: { work: SiteContent["work"] }) {
  return (
    <Section id="work" label={work.label} title={work.title} intro={work.intro}>
      <div className="grid gap-8">
        {work.cases.map((item) => (
          <CaseCard key={item.slug} item={item} labels={work.blockLabels} />
        ))}
      </div>
      <p className="mt-10 max-w-measure text-meta text-ink-3">{work.others}</p>
    </Section>
  );
}
