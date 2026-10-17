"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { content } from "@/content";
import type { ContactField, ContactState } from "@/lib/contact";
import { createRateLimiter } from "@/lib/rate-limit";

const TO = "johntoledot@gmail.com";
// TODO: once juantoledo.com.mx is verified in Resend, change FROM to
// "Juan Toledo <contact@juantoledo.com.mx>" (any address on the verified domain works).
const FROM = "Portfolio Contact <onboarding@resend.dev>";

const topics = content.en.contact.form.topics;

const schema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.email(),
  topic: z.enum(topics.map((t) => t.value) as [string, ...string[]]),
  message: z.string().trim().min(20).max(2000),
});

// 5 messages per IP every 10 minutes.
const isRateLimited = createRateLimiter(5, 10 * 60 * 1000);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: people never see this field. Pretend it worked so bots don't retry.
  if (String(formData.get("website") ?? "") !== "") return { status: "success" };

  const parsed = schema.safeParse({
    name: formData.get("name") ?? "",
    email: String(formData.get("email") ?? "").trim(),
    topic: formData.get("topic") ?? "",
    message: formData.get("message") ?? "",
  });
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => i.path[0] as ContactField))];
    return { status: "invalid", fields };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) return { status: "rate-limited" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("contact: RESEND_API_KEY is not set");
    return { status: "error" };
  }

  const { name, email, topic, message } = parsed.data;
  const topicLabel = topics.find((t) => t.value === topic)?.label ?? topic;
  const oneLineName = name.replace(/\s+/g, " ");

  try {
    // Plain text only: visitor input never ends up in HTML.
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `[juantoledo.com.mx] ${topicLabel} — ${oneLineName}`,
      text: `Name: ${oneLineName}\nEmail: ${email}\nTopic: ${topicLabel}\n\n${message}\n\n-- Sent from the juantoledo.com.mx contact form`,
    });
    if (error) {
      console.error("contact: Resend error", error.name);
      return { status: "error" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("contact: send failed", err instanceof Error ? err.message : err);
    return { status: "error" };
  }
}
