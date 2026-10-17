"use server";

import { Resend } from "resend";
import type { ContactField, ContactState } from "@/lib/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

// Phase 3: wired to the new form. Phase 4 replaces this with zod validation,
// HTML escaping, the honeypot check and rate limiting.
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "");
  const message = String(formData.get("message") ?? "").trim();

  const fields: ContactField[] = [];
  if (!name) fields.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.push("email");
  if (!topic) fields.push("topic");
  if (message.length < 20) fields.push("message");
  if (fields.length) return { status: "invalid", fields };

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "johntoledot@gmail.com",
      subject: `[Portfolio] ${topic} — ${name}`,
      text: `${name} <${email}>\nTopic: ${topic}\n\n${message}`,
      replyTo: email,
    });
    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}
