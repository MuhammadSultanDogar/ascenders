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
      const panels = gsap.utils.toArray<HTMLElement>(".service-panel");

      mm.add("(min-width: 1024px)", () => {
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

      panels.forEach((panel) => {
        gsap.from(panel.querySelectorAll(".service-headline-line"), {
          y: "100%",
          stagger: 0.08,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(panel.querySelectorAll(".service-scene-wrap"), {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(panel.querySelectorAll(".service-item"), {
          x: -24,
          opacity: 0,
          stagger: 0.06,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="services" ref={sectionRef} className="relative z-10 overflow-x-clip bg-white">
      {SERVICES.map((service) => (
        <div
          key={service.id}
          className="service-panel border-b border-black/[0.04] bg-white py-14 last:border-b-0 sm:py-16 lg:sticky lg:top-0 lg:min-h-screen lg:border-b-0 lg:py-24"
        >
          <SectionDecor variant={SERVICE_DECOR[service.id] ?? "gold"} showShape={service.id !== "ecommerce"} />
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-5 sm:gap-10 sm:px-6 md:px-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="relative z-10 lg:col-span-6">
              <span className="font-display text-xs font-semibold tracking-[0.2em] text-accent uppercase sm:text-sm sm:tracking-[0.28em]">
                {service.accent} — {service.title}
              </span>

              <div className="mt-4 space-y-0.5 sm:mt-6 sm:space-y-1">
                {service.headline.map((line) => (
                  <div key={line} className="overflow-hidden">
                    <h2 className="service-headline-line headline-display text-[clamp(1.875rem,7.5vw,5.5rem)] uppercase">
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

            <div className="service-scene-wrap relative z-10 w-full lg:col-span-6">
              <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.06] sm:rounded-3xl">
                <ServiceScene serviceId={service.id} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
