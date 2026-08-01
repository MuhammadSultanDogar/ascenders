"use client";

import { useRef } from "react";
import { gsap, useGSAP, registerGSAP } from "@/lib/gsap";
import { panelEnterTimeline } from "@/lib/scroll-animations";
import { bindMobileServiceSnap } from "@/lib/mobile-service-snap";
import { SERVICES } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import ServiceScene from "@/components/sections/visuals/ServiceScene";
import SectionDecor from "@/components/ui/SectionDecor";
import ScrollPageHint from "@/components/ui/ScrollPageHint";

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

      mm.add("(max-width: 1023px)", () => {
        panels.forEach((panel, i) => {
          gsap.set(panel, { zIndex: i + 1 });

          panelEnterTimeline(panel);

          if (i === panels.length - 1) return;

          gsap.to(panel, {
            scale: 0.98,
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: "bottom top",
              scrub: 0.35,
            },
          });
        });

        const section = sectionRef.current;
        const unbindSnap = section
          ? bindMobileServiceSnap({ section, panelCount: panels.length })
          : () => {};

        return unbindSnap;
      });

      mm.add("(min-width: 1024px)", () => {
        panels.forEach((panel) => {
          panelEnterTimeline(panel);
        });

        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return;

          gsap.to(panel, {
            scale: 0.97,
            opacity: 0.35,
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <>
      <section id="services" ref={sectionRef} className="relative z-10 overflow-x-clip bg-white">
        {SERVICES.map((service, index) => (
        <div
          key={service.id}
          style={{ zIndex: index + 1 }}
          className="service-panel sticky top-0 flex min-h-[100svh] items-center overflow-hidden bg-white py-12 sm:py-14 lg:py-24"
        >
          <SectionDecor variant={SERVICE_DECOR[service.id] ?? "gold"} showShape={service.id !== "ecommerce"} />
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-5 sm:gap-8 sm:px-6 md:px-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="relative z-20 min-w-0 lg:col-span-7 lg:pr-6 xl:col-span-6 xl:pr-8">
              <span className="service-accent font-display text-xs font-semibold tracking-[0.2em] text-accent uppercase sm:text-sm sm:tracking-[0.28em]">
                {service.accent} — {service.title}
              </span>

              <div className="mt-3 space-y-0.5 sm:mt-6 sm:space-y-1">
                {service.headline.map((line) => (
                  <div key={line} className="overflow-hidden lg:overflow-visible">
                    <h2 className="service-headline-line headline-display max-w-full text-[clamp(1.75rem,7.5vw,5.5rem)] uppercase lg:text-[clamp(2.5rem,4.2vw,5rem)]">
                      {line}
                    </h2>
                  </div>
                ))}
              </div>

              <p className="service-desc mt-4 max-w-xl text-sm leading-relaxed text-black/55 sm:mt-8 sm:text-base">
                {service.description}
              </p>

              {service.items.length > 0 && (
                <ul className="mt-5 space-y-2 sm:mt-10 sm:space-y-3">
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

              <div className="service-cta mt-6 sm:mt-12">
                <MagneticButton href="#contact" variant="outline">
                  Get Started
                </MagneticButton>
              </div>
            </div>

            <div className="service-scene-wrap relative z-10 w-full lg:col-span-5 xl:col-span-6">
              <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.06] sm:rounded-3xl">
                <ServiceScene serviceId={service.id} />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-black/8 to-transparent" />
        </div>
      ))}
      </section>
      <ScrollPageHint sectionRef={sectionRef} />
    </>
  );
}
