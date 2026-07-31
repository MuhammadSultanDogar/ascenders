"use client";

import { useRef, useState } from "react";
import { IconMail, IconPhone, IconInstagram, IconFacebook, IconLinkedin } from "@/components/ui/Icons";
import { gsap, useGSAP, registerGSAP } from "@/lib/gsap";
import { scrollReveal, scrollRevealLines } from "@/lib/scroll-animations";
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

      scrollRevealLines(".contact-headline-line", sectionRef.current, 0.1);

      scrollReveal(".contact-info", {
        trigger: sectionRef.current,
        y: 36,
        duration: 0.85,
      });

      scrollReveal(".contact-form", {
        trigger: sectionRef.current,
        start: "top 88%",
        y: 52,
        scale: 0.98,
        duration: 1,
      });

      gsap.utils.toArray<HTMLElement>(".contact-social-link").forEach((link, i) => {
        scrollReveal(link, {
          trigger: link,
          start: "top 95%",
          y: 20,
          duration: 0.65,
          delay: i * 0.05,
        });
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
      const { submitContactForm } = await import("@/lib/contact-form");
      const result = await submitContactForm(form, COMPANY.email);

      if (!result.ok) {
        setError(result.error);
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
      className="relative overflow-x-clip bg-bg-subtle px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-48"
    >
      <SectionDecor variant="blue" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="contact-info">
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
                className="contact-social-link glass flex h-11 w-11 items-center justify-center rounded-full text-black transition-colors hover:border-accent/50 md:h-12 md:w-12"
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
                We&apos;ll be in touch shortly at {COMPANY.email}.
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
                <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
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
              title={`Ascenders office — ${COMPANY.office.label}`}
              src={COMPANY.office.embedUrl}
              className="h-40 w-full border-0 opacity-80 sm:h-48 md:h-56"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
