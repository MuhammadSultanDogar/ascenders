const SERVICE_LABELS: Record<string, string> = {
  marketing: "Digital Marketing",
  ecommerce: "Ecommerce Solutions",
  reinstatements: "Reinstatements",
  ghl: "Go High Level",
};

export type ContactFormData = {
  name: string;
  email: string;
  service: string;
  message: string;
};

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: string; needsActivation?: boolean };

function serviceLabel(service: string) {
  return service ? (SERVICE_LABELS[service] ?? service) : "Not specified";
}

async function submitViaWeb3Forms(accessKey: string, form: ContactFormData): Promise<ContactSubmitResult> {
  const subject = `[Ascenders] New inquiry from ${form.name}`;
  const message = [`Service: ${serviceLabel(form.service)}`, "", form.message].join("\n");

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: form.name,
      email: form.email,
      replyto: form.email,
      message,
      service: serviceLabel(form.service),
    }),
  });

  const data = (await res.json()) as { success?: boolean; message?: string };

  if (!res.ok || !data.success) {
    return {
      ok: false,
      error: data.message ?? "Failed to send your message. Please try again.",
    };
  }

  return { ok: true };
}

async function submitViaFormSubmit(toEmail: string, form: ContactFormData): Promise<ContactSubmitResult> {
  const subject = `[Ascenders] New inquiry from ${form.name}`;
  const message = [`Service: ${serviceLabel(form.service)}`, "", form.message].join("\n");

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      _replyto: form.email,
      _subject: subject,
      message,
      _captcha: "false",
      _template: "table",
    }),
  });

  let data: { success?: string; message?: string };
  try {
    data = (await res.json()) as { success?: string; message?: string };
  } catch {
    return { ok: false, error: "Unexpected response from email service. Please try again." };
  }

  if (data.success === "true") {
    return { ok: true };
  }

  const providerMessage = data.message ?? "Unable to send email.";
  const needsActivation = /activ/i.test(providerMessage);

  if (needsActivation) {
    return {
      ok: false,
      needsActivation: true,
      error: `This website domain still needs activation. Check ${toEmail} for a new email from FormSubmit (subject: "Activate Form") — it is separate from localhost. Click the link, then submit again.`,
    };
  }

  return { ok: false, error: providerMessage };
}

export async function submitContactForm(form: ContactFormData, toEmail: string): Promise<ContactSubmitResult> {
  const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (web3Key) {
    return submitViaWeb3Forms(web3Key, form);
  }

  return submitViaFormSubmit(toEmail, form);
}
