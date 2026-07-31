"use client";

import { useRef } from "react";
import { gsap, useGSAP, registerGSAP } from "@/lib/gsap";
import { SERVICES } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import ServiceScene from "@/components/sections/visuals/ServiceScene";
import SectionDecor from "@/components/ui/SectionDecor";

const SERVICE_DECOR: Record<string, "gold" | "blue" | "teal" | "coral"> = {
  "digital-marketing": "blue",
  ecommerce: "gold",
  reinstatements: "teal",
  gohighlevel: "coral",
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGSAP();

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".service-panel");

        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return;

          gsap.to(panel, {
            scale: 0.96,
            opacity: 0.3,
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });

      const panels = gsap.utils.toArray<HTMLElement>(".service-panel");

      panels.forEach((panel) => {
        gsap.from(panel.querySelectorAll(".service-headline-line"), {
          y: "100%",
          stagger: 0.08,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(panel.querySelectorAll(".service-item"), {
          x: -30,
          opacity: 0,
          stagger: 0.06,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="services" ref={sectionRef} className="relative z-10 bg-white">
      {SERVICES.map((service) => (
        <div
          key={service.id}
          className="service-panel relative flex min-h-0 items-start overflow-hidden bg-white py-16 pt-24 lg:sticky lg:top-0 lg:min-h-screen lg:items-center lg:py-24"
        >
          <SectionDecor variant={SERVICE_DECOR[service.id] ?? "gold"} showShape={service.id !== "ecommerce"} />
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-6 md:gap-10 md:px-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="relative z-10 order-2 lg:order-none lg:col-span-6">
              <span className="font-display text-xs font-semibold tracking-[0.25em] text-accent uppercase sm:text-sm sm:tracking-[0.3em]">
                {service.accent} — {service.title}
              </span>

              <div className="mt-4 space-y-1 sm:mt-6">
                {service.headline.map((line) => (
                  <div key={line} className="overflow-hidden">
                    <h2 className="service-headline-line headline-display text-[clamp(1.75rem,8vw,5.5rem)] uppercase">
                      {line}
                    </h2>
                  </div>
                ))}
              </div>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-black/55 sm:mt-8 sm:text-base">
                {service.description}
              </p>

              {service.items.length > 0 && (
                <ul className="mt-6 space-y-2.5 sm:mt-10 sm:space-y-3">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="service-item flex items-center gap-3 text-sm tracking-wide text-black/70 sm:gap-4"
                    >
                      <span className="h-px w-6 shrink-0 bg-accent sm:w-8" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 sm:mt-12">
                <MagneticButton href="#contact" variant="outline">
                  Get Started
                </MagneticButton>
              </div>
            </div>

            <div className="relative z-10 order-1 w-full lg:order-none lg:col-span-6">
              <div className="glass overflow-hidden rounded-2xl ring-1 ring-black/[0.04] sm:rounded-3xl">
                <ServiceScene serviceId={service.id} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-black/8 to-transparent" />
        </div>
      ))}
    </section>
  );
}
