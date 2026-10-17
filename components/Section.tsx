import { container } from "./styles";

type Props = {
  id: string;
  label: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
};

export function Section({ id, label, title, intro, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={container}>
      <div className="border-t border-rule py-16 md:py-24">
        <p className="text-label font-semibold uppercase text-accent">{label}</p>
        <h2 id={`${id}-title`} className="mt-3 max-w-measure text-title">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-measure">{intro}</p>}
        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  );
}
