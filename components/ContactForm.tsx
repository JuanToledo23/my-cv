"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { sendContact } from "@/app/actions/contact";
import type { SiteContent } from "@/content/types";
import type { ContactField, ContactState } from "@/lib/contact";
import { buttonPrimary } from "./styles";

type FormCopy = SiteContent["contact"]["form"];

const inputClass =
  "mt-2 block w-full rounded-md border border-rule bg-surface px-3.5 py-2.5 text-ink placeholder:text-ink-3 hover:border-ink-3 aria-[invalid=true]:border-warm";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: ContactField;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`contact-${id}`} className="text-meta font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`contact-${id}-error`} className="mt-1.5 text-meta text-warm">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ form }: { form: FormCopy }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  // Submit through the action without React's automatic form reset, so a
  // validation error doesn't wipe what the visitor typed. Clear only on success.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  }

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  const invalid = state.status === "invalid" ? state.fields : [];
  const errorFor = (f: ContactField) => (invalid.includes(f) ? form.errors[f] : undefined);
  const a11y = (f: ContactField) => ({
    id: `contact-${f}`,
    name: f,
    "aria-invalid": invalid.includes(f) || undefined,
    "aria-describedby": invalid.includes(f) ? `contact-${f}-error` : undefined,
  });

  const status =
    state.status === "success"
      ? form.success
      : state.status === "error"
        ? form.error
        : state.status === "rate-limited"
          ? form.errors.rateLimit
          : "";

  return (
    <form ref={formRef} action={action} onSubmit={onSubmit} noValidate className="grid gap-5">
      <Field id="name" label={form.name} error={errorFor("name")}>
        <input {...a11y("name")} type="text" autoComplete="name" required maxLength={80} className={inputClass} />
      </Field>
      <Field id="email" label={form.email} error={errorFor("email")}>
        <input {...a11y("email")} type="email" autoComplete="email" required className={inputClass} />
      </Field>
      <Field id="topic" label={form.topic} error={errorFor("topic")}>
        <select {...a11y("topic")} required defaultValue="" className={inputClass}>
          <option value="" disabled>
            {form.topicPlaceholder}
          </option>
          {form.topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="message" label={form.message} error={errorFor("message")}>
        <textarea {...a11y("message")} required rows={6} minLength={20} maxLength={2000} className={inputClass} />
      </Field>

      {/* Honeypot: hidden from people, bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">{form.honeypot}</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className={`${buttonPrimary} disabled:opacity-70`}>
          {pending ? form.sending : form.submit}
        </button>
        <p role="status" aria-live="polite" className="text-meta text-ink-2">
          {status}
        </p>
      </div>
    </form>
  );
}
