// Shared class lists. Kept here so buttons and links look the same everywhere.
export const container = "mx-auto w-full max-w-page px-6 md:px-10";

const buttonBase =
  "inline-flex items-center justify-center rounded-md px-5 py-3 text-meta font-semibold transition-colors";

export const buttonPrimary = `${buttonBase} bg-accent text-paper hover:bg-accent-ink`;

export const buttonSecondary = `${buttonBase} border border-rule bg-surface text-ink hover:border-ink-3`;

export const buttonSmall =
  "inline-flex items-center rounded-md border border-rule bg-surface px-3 py-1.5 text-meta font-medium text-ink transition-colors hover:border-ink-3";

export const textLink = "text-accent underline-offset-4 hover:text-accent-ink hover:underline";

export const label = "text-label font-semibold uppercase text-ink-3";
