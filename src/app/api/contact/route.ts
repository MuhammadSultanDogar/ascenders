import { NextResponse } from "next/server";

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "business@eascenders.com";

type ContactPayload = {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
};

const SERVICE_LABELS: Record<string, string> = {
  marketing: "Digital Marketing",
  ecommerce: "Ecommerce Solutions",
  reinstatements: "Reinstatements",
  ghl: "Go High Level",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    const service = body.service?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured yet. Please email us directly." },
        { status: 503 },
      );
    }

    const serviceLabel = service ? (SERVICE_LABELS[service] ?? service) : "Not specified";
    const from =
      process.env.CONTACT_FROM_EMAIL ?? "Ascenders Website <onboarding@resend.dev>";

    const text = [
      `New contact form submission from eascenders.com`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${serviceLabel}`,
      ``,
      `Message:`,
      message,
    ].join("\n");

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_TO],
        reply_to: email,
        subject: `[Ascenders] New inquiry from ${name}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend API error:", err);
      return NextResponse.json({ error: "Failed to send your message. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
