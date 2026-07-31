"use client";

import { useRef, useState } from "react";
import { IconMail, IconPhone, IconInstagram, IconFacebook, IconLinkedin } from "@/components/ui/Icons";
import { gsap, useGSAP, registerGSAP } from "@/lib/gsap";
import { COMPANY, SOCIALS } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionDecor from "@/components/ui/SectionDecor";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-bg-subtle px-6 py-32 md:px-12 md:py-48"
    >
      <SectionDecor variant="blue" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          {["LET'S", "BUILD", "SOMETHING", "GREAT."].map((line) => (
            <div key={line} className="overflow-hidden">
              <h2 className="contact-headline-line headline-display text-[clamp(2.25rem,6.5vw,4.5rem)] uppercase">
                {line}
              </h2>
            </div>
          ))}

          <div className="mt-12 space-y-6">
            <a
              href={COMPANY.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group flex items-center gap-4 text-black/55 transition-colors hover:text-black"
            >
              <IconPhone className="h-5 w-5 text-accent" />
              <span className="text-lg">{COMPANY.phone}</span>
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              data-cursor="hover"
              className="group flex items-center gap-4 text-black/55 transition-colors hover:text-black"
            >
              <IconMail className="h-5 w-5 text-accent" />
              <span className="text-lg">{COMPANY.email}</span>
            </a>
          </div>

          <div className="mt-10 flex gap-4">
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
                className="glass flex h-12 w-12 items-center justify-center rounded-full text-black transition-colors hover:border-accent/50"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="contact-form [perspective:1000px]">
          {submitted ? (
            <div className="glass flex h-full min-h-[480px] flex-col items-center justify-center rounded-3xl p-10 text-center [transform:rotateY(-3deg)_rotateX(2deg)]">
              <span className="font-display text-4xl font-bold text-accent">✓</span>
              <p className="mt-4 font-display text-2xl font-semibold text-black">Message Sent</p>
              <p className="mt-2 text-black/45">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 transition-transform duration-700 hover:[transform:rotateY(-2deg)_rotateX(1deg)] md:p-10"
            >
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-xs tracking-[0.2em] text-black/45 uppercase">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full border-b border-black/10 bg-transparent py-3 text-black outline-none transition-colors placeholder:text-black/30 focus:border-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs tracking-[0.2em] text-black/45 uppercase">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full border-b border-black/10 bg-transparent py-3 text-black outline-none transition-colors placeholder:text-black/30 focus:border-accent"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs tracking-[0.2em] text-black/45 uppercase">
                    Service
                  </label>
                  <select className="w-full border-b border-black/10 bg-transparent py-3 text-black outline-none transition-colors focus:border-accent">
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
                  <label className="mb-2 block text-xs tracking-[0.2em] text-black/45 uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full resize-none border-b border-black/10 bg-transparent py-3 text-black outline-none transition-colors placeholder:text-black/30 focus:border-accent"
                    placeholder="Tell us about your project..."
                  />
                </div>
              </div>

              <div className="mt-10">
                <MagneticButton type="submit" variant="primary">
                  Send Message
                </MagneticButton>
              </div>
            </form>
          )}

          <div className="mt-8 overflow-hidden rounded-2xl border border-black/8">
            <iframe
              title="Ascenders Office Location"
              src="https://maps.google.com/maps?q=Florida%20USA&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className="h-48 w-full border-0 opacity-80 md:h-56"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
