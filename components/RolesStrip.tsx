import type { SiteContent } from "@/content/types";
import { Section } from "./Section";

export function RolesStrip({ roles }: { roles: SiteContent["roles"] }) {
  return (
    <Section id="roles" label={roles.label} title={roles.title}>
      <ul className="grid gap-6 md:grid-cols-3">
        {roles.items.map((role) => (
          <li
            key={role.title}
            className="rounded-lg border border-rule bg-surface p-6 transition-colors hover:border-ink-3"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-h3">{role.title}</h3>
              {role.tag && (
                <span className="rounded-full border border-warm px-2.5 py-0.5 text-label font-semibold uppercase text-warm">
                  {role.tag}
                </span>
              )}
            </div>
            <p className="mt-3 text-meta text-ink-2">{role.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-measure text-meta text-ink-3">{roles.note}</p>
    </Section>
  );
}
