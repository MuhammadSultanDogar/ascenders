import { NextResponse } from "next/server";

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "business@eascenders.com";
const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eascenders.com";

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

    const serviceLabel = service ? (SERVICE_LABELS[service] ?? service) : "Not specified";
    const subject = `[Ascenders] New inquiry from ${name}`;
    const fullMessage = [`Service: ${serviceLabel}`, "", message].join("\n");

    const origin = request.headers.get("origin") ?? SITE_ORIGIN;

    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3formsKey) {
      const sent = await sendViaWeb3Forms({
        accessKey: web3formsKey,
        name,
        email,
        subject,
        message: fullMessage,
        serviceLabel,
      });
      if (!sent.ok) return sent.response;
      return NextResponse.json({ success: true });
    }

    const sent = await sendViaFormSubmit({
      name,
      email,
      subject,
      message: fullMessage,
      origin,
    });
    if (!sent.ok) return sent.response;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

async function sendViaFormSubmit({
  name,
  email,
  subject,
  message,
  origin,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  origin: string;
}) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_TO)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: `${origin}/contact`,
      Origin: origin,
    },
    body: JSON.stringify({
      name,
      email,
      _replyto: email,
      _subject: subject,
      message,
      _captcha: "false",
      _template: "table",
    }),
  });

  let data: { success?: string; message?: string } = {};
  try {
    data = (await res.json()) as { success?: string; message?: string };
  } catch {
    console.error("FormSubmit returned non-JSON response");
    return {
      ok: false as const,
      response: NextResponse.json(
        { error: "Email service returned an unexpected response. Please try again." },
        { status: 502 },
      ),
    };
  }

  if (data.success !== "true") {
    const providerMessage = data.message ?? "Unable to send email.";
    console.error("FormSubmit rejected submission:", providerMessage);

    const needsActivation =
      /activ/i.test(providerMessage) || /verify/i.test(providerMessage);

    if (needsActivation) {
      return {
        ok: false as const,
        response: NextResponse.json(
          {
            error: `Form delivery is not active yet. Check the inbox for ${CONTACT_TO} (and spam) for an email from FormSubmit titled "Activate Form" — click that link once, then submit again.`,
            needsActivation: true,
          },
          { status: 503 },
        ),
      };
    }

    return {
      ok: false as const,
      response: NextResponse.json(
        { error: providerMessage },
        { status: 502 },
      ),
    };
  }

  return { ok: true as const };
}

async function sendViaWeb3Forms({
  accessKey,
  name,
  email,
  subject,
  message,
  serviceLabel,
}: {
  accessKey: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  serviceLabel: string;
}) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: name,
      email,
      replyto: email,
      message,
      service: serviceLabel,
    }),
  });

  const data = (await res.json()) as { success?: boolean; message?: string };

  if (!res.ok || !data.success) {
    console.error("Web3Forms API error:", data);
    return {
      ok: false as const,
      response: NextResponse.json(
        { error: "Failed to send your message. Please try again or email business@eascenders.com." },
        { status: 502 },
      ),
    };
  }

  return { ok: true as const };
}
