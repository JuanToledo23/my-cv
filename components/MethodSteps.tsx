import type { SiteContent } from "@/content/types";
import { Section } from "./Section";

export function MethodSteps({ method }: { method: SiteContent["method"] }) {
  return (
    <Section id="method" label={method.label} title={method.title} intro={method.intro}>
      <ol className="grid gap-x-16 gap-y-10 md:grid-cols-2">
        {method.steps.map((step, i) => (
          <li key={step.title} className="flex gap-5">
            <span aria-hidden="true" className="font-serif text-title font-semibold leading-none text-accent">
              {i + 1}
            </span>
            <div>
              <h3 className="text-h3">{step.title}</h3>
              <p className="mt-2">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-12 max-w-measure border-l-[3px] border-accent pl-5">
        <strong className="font-semibold text-ink">{method.whyLabel}.</strong> {method.why}
      </p>
    </Section>
  );
}
