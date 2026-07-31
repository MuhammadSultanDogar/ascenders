"use client";

import { useRef, useState } from "react";
import { IconMail, IconPhone, IconInstagram, IconFacebook, IconLinkedin } from "@/components/ui/Icons";
import { gsap, useGSAP, registerGSAP } from "@/lib/gsap";
import { COMPANY, SOCIALS } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionDecor from "@/components/ui/SectionDecor";

type FormState = {
  name: string;
  email: string;
  service: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  service: "",
  message: "",
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useGSAP(
    () => {
      registerGSAP();

      gsap.from(".contact-headline-line", {
        y: "100%",
        stagger: 0.1,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      gsap.from(".contact-form", {
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    },
    { scope: sectionRef },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to send message. Please try again.");
        return;
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-0 overflow-hidden bg-bg-subtle px-6 py-24 md:min-h-screen md:px-12 md:py-48"
    >
      <SectionDecor variant="blue" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
        <div>
          {["LET'S", "BUILD", "SOMETHING", "GREAT."].map((line) => (
            <div key={line} className="overflow-hidden">
              <h2 className="contact-headline-line headline-display text-[clamp(1.75rem,8vw,4.5rem)] uppercase">
                {line}
              </h2>
            </div>
          ))}

          <div className="mt-8 space-y-5 md:mt-12 md:space-y-6">
            <a
              href={COMPANY.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group flex items-center gap-4 text-black/55 transition-colors hover:text-black"
            >
              <IconPhone className="h-5 w-5 shrink-0 text-accent" />
              <span className="text-base md:text-lg">{COMPANY.phone}</span>
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              data-cursor="hover"
              className="group flex items-center gap-4 text-black/55 transition-colors hover:text-black"
            >
              <IconMail className="h-5 w-5 shrink-0 text-accent" />
              <span className="text-base md:text-lg">{COMPANY.email}</span>
            </a>
            <a
              href={`mailto:${COMPANY.contactEmail}`}
              data-cursor="hover"
              className="group flex items-center gap-4 text-black/55 transition-colors hover:text-black"
            >
              <IconMail className="h-5 w-5 shrink-0 text-accent" />
              <span className="text-base md:text-lg">{COMPANY.contactEmail}</span>
            </a>
          </div>

          <div className="mt-8 flex gap-3 md:mt-10 md:gap-4">
            {[
              { icon: IconInstagram, href: SOCIALS.instagram },
              { icon: IconFacebook, href: SOCIALS.facebook },
              { icon: IconLinkedin, href: SOCIALS.linkedin },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-black transition-colors hover:border-accent/50 md:h-12 md:w-12"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="contact-form lg:[perspective:1000px]">
          {submitted ? (
            <div className="glass flex min-h-[360px] flex-col items-center justify-center rounded-2xl p-8 text-center sm:min-h-[480px] sm:rounded-3xl sm:p-10 lg:[transform:rotateY(-3deg)_rotateX(2deg)]">
              <span className="font-display text-4xl font-bold text-accent">✓</span>
              <p className="mt-4 font-display text-xl font-semibold text-black sm:text-2xl">Message Sent</p>
              <p className="mt-2 text-sm text-black/45 sm:text-base">
                We&apos;ll be in touch shortly at {COMPANY.contactEmail}.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 transition-transform duration-700 sm:rounded-3xl sm:p-8 md:p-10 lg:hover:[transform:rotateY(-2deg)_rotateX(1deg)]"
            >
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-xs tracking-[0.2em] text-black/45 uppercase">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border-b border-black/10 bg-transparent py-3 text-base text-black outline-none transition-colors placeholder:text-black/30 focus:border-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-xs tracking-[0.2em] text-black/45 uppercase">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    required
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border-b border-black/10 bg-transparent py-3 text-base text-black outline-none transition-colors placeholder:text-black/30 focus:border-accent"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-service" className="mb-2 block text-xs tracking-[0.2em] text-black/45 uppercase">
                    Service
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full border-b border-black/10 bg-transparent py-3 text-base text-black outline-none transition-colors focus:border-accent"
                  >
                    <option value="" className="bg-white">
                      Select a service
                    </option>
                    <option value="marketing" className="bg-white">
                      Digital Marketing
                    </option>
                    <option value="ecommerce" className="bg-white">
                      Ecommerce Solutions
                    </option>
                    <option value="reinstatements" className="bg-white">
                      Reinstatements
                    </option>
                    <option value="ghl" className="bg-white">
                      Go High Level
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-xs tracking-[0.2em] text-black/45 uppercase">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none border-b border-black/10 bg-transparent py-3 text-base text-black outline-none transition-colors placeholder:text-black/30 focus:border-accent"
                    placeholder="Tell us about your project..."
                  />
                </div>
              </div>

              {error && (
                <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <div className="mt-8 sm:mt-10">
                <MagneticButton type="submit" variant="primary" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Message"}
                </MagneticButton>
              </div>
            </form>
          )}

          <div className="mt-6 overflow-hidden rounded-2xl border border-black/8 sm:mt-8">
            <iframe
              title="Ascenders Office Location"
              src="https://maps.google.com/maps?q=Florida%20USA&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className="h-40 w-full border-0 opacity-80 sm:h-48 md:h-56"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
