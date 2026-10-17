import type { SiteContent } from "@/content/types";
import { ContactForm } from "./ContactForm";
import { Section } from "./Section";
import { label, textLink } from "./styles";

export function Contact({ contact }: { contact: SiteContent["contact"] }) {
  const direct = [
    { label: contact.email, href: `mailto:${contact.email}` },
    contact.linkedin,
    contact.github,
  ];
  return (
    <Section id="contact" label={contact.label} title={contact.title} intro={contact.intro}>
      <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div>
          <p className={label}>{contact.directLabel}</p>
          <ul className="mt-4 grid gap-3">
            {direct.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={`${textLink} break-words`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-8 grid gap-3">
            {[contact.cvEn, contact.cvEs].map((cv) => (
              <li key={cv.href}>
                <a href={cv.href} download className={textLink}>
                  {cv.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-lg border border-rule bg-surface p-6 md:p-8">
          <ContactForm form={contact.form} />
        </div>
      </div>
    </Section>
  );
}
