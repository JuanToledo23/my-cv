import type { SiteContent } from "@/content/types";
import { container } from "./styles";

export function ProofRow({ proof }: { proof: SiteContent["proof"] }) {
  return (
    <section aria-label={proof.ariaLabel} className={`${container} pb-16 md:pb-24`}>
      <ul className="grid gap-8 rounded-lg bg-accent-tint px-6 py-8 md:grid-cols-3 md:gap-10 md:px-10 md:py-10">
        {proof.items.map((item) => (
          <li key={item.value}>
            <p className="font-serif text-[26px] font-semibold leading-tight text-accent md:text-[24px] lg:text-[28px]">
              {item.value}
            </p>
            <p className="mt-2 text-meta text-ink-2">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
