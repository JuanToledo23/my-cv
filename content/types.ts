export type Locale = "en" | "es";

export type Link = { label: string; href: string };
export type Media = { src: string; alt: string };

export type Case = {
  slug: string;
  title: string;
  meta: string;
  problem: string;
  built: string;
  time: string;
  result: string;
  stack: string;
  links?: Link[];
  media?: Media;
};

export type InquiryType = "senior" | "founding" | "product" | "other";

export type SiteContent = {
  locale: Locale;
  meta: {
    title: string;
    description: string;
    /** Route path for this locale, e.g. "/" or "/es". */
    path: string;
    /** OpenGraph locale, e.g. "en_US". */
    ogLocale: string;
  };
  nav: {
    home: string;
    skipToContent: string;
    menu: string;
    links: Link[];
    /** Link to the same page in the other locale. */
    switch: Link & { lang: Locale; ariaLabel: string };
  };
  hero: {
    kicker: string;
    h1: string;
    /** Substring of h1 that gets the terracotta underline. */
    h1Underline: string;
    lead: string;
    primary: Link;
    secondary: Link;
    portrait?: Media;
  };
  proof: { ariaLabel: string; items: { value: string; text: string }[] };
  work: {
    label: string;
    title: string;
    intro: string;
    blockLabels: { problem: string; built: string; time: string; result: string; stack: string };
    cases: Case[];
    others: string;
  };
  method: {
    label: string;
    title: string;
    intro: string;
    steps: { title: string; text: string }[];
    whyLabel: string;
    why: string;
  };
  experience: {
    label: string;
    title: string;
    /** compact: rendered as a short line (earlier roles). */
    items: { role: string; dates: string; text: string; compact?: boolean }[];
    educationLabel: string;
    education: string;
  };
  roles: {
    label: string;
    title: string;
    items: { title: string; text: string; tag?: string }[];
    note: string;
  };
  contact: {
    label: string;
    title: string;
    intro: string;
    directLabel: string;
    email: string;
    linkedin: Link;
    github: Link;
    cvEn: Link;
    cvEs: Link;
    form: {
      name: string;
      email: string;
      topic: string;
      topicPlaceholder: string;
      topics: { value: InquiryType; label: string }[];
      message: string;
      /** Label for the hidden honeypot field (screen readers are told to skip it). */
      honeypot: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      errors: { name: string; email: string; topic: string; message: string; rateLimit: string };
    };
  };
  notFound: { title: string; text: string; home: Link };
  footer: {
    /** "{year}" is replaced with the current year. */
    copyright: string;
    builtWith: string;
  };
};
