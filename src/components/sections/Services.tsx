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

      panels.forEach((panel) => {
        gsap.from(panel.querySelectorAll(".service-headline-line"), {
          y: "100%",
          stagger: 0.08,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 60%",
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
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="services" ref={sectionRef} className="relative z-10 bg-white">
      {SERVICES.map((service) => (
        <div
          key={service.id}
          className="service-panel sticky top-0 flex min-h-screen items-center overflow-hidden bg-white"
        >
          <SectionDecor variant={SERVICE_DECOR[service.id] ?? "gold"} showShape={service.id !== "ecommerce"} />
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 md:px-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative z-10 lg:col-span-6">
              <span className="font-display text-sm font-semibold tracking-[0.3em] text-accent uppercase">
                {service.accent} — {service.title}
              </span>

              <div className="mt-6 space-y-1">
                {service.headline.map((line) => (
                  <div key={line} className="overflow-hidden">
                    <h2 className="service-headline-line headline-display text-[clamp(2.25rem,7vw,5.5rem)] uppercase">
                      {line}
                    </h2>
                  </div>
                ))}
              </div>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-black/55">
                {service.description}
              </p>

              {service.items.length > 0 && (
                <ul className="mt-10 space-y-3">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="service-item flex items-center gap-4 text-sm tracking-wide text-black/70"
                    >
                      <span className="h-px w-8 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-12">
                <MagneticButton href="#contact" variant="outline">
                  Get Started
                </MagneticButton>
              </div>
            </div>

            <div className="relative z-10 lg:col-span-6">
              <div className="glass overflow-hidden rounded-3xl ring-1 ring-black/[0.04]">
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
