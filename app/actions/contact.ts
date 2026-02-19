"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  name: string;
  email: string;
  service: string;
  message: string;
};

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, service, message } = data;

  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email address" };
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "johntoledot@gmail.com",
      subject: `[Portfolio] New inquiry from ${name} — ${service}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #10b981; margin-bottom: 24px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 120px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Service</td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; color: #999; font-size: 12px;">Sent from juantoledo.com.mx contact form</p>
        </div>
      `,
      replyTo: email,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send email. Please try again." };
  }
}
