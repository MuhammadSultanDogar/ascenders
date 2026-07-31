"use client";

import { useRef } from "react";
import { gsap, useGSAP, registerGSAP } from "@/lib/gsap";
import { TIMELINE, COMPANY } from "@/lib/constants";
import SectionDecor from "@/components/ui/SectionDecor";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGSAP();

      gsap.from(".about-headline-word", {
        y: "100%",
        stagger: 0.06,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-intro",
          start: "top 70%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
          y: 36,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(item.querySelector(".timeline-dot"), {
          scale: 0,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        });
      });

      gsap.to(".timeline-line-fill", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-track",
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef },
  );

  const headline = ["OUR", "STORY", "OF", "ASCENT."];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 py-24 md:px-12 md:py-48"
    >
      <SectionDecor variant="teal" />
      <div className="about-intro relative mx-auto max-w-7xl">
        <span className="text-xs tracking-[0.35em] text-accent uppercase">
          About Us
        </span>

        <div className="mt-6 max-w-4xl">
          {headline.map((word) => (
            <div key={word} className="overflow-hidden">
              <h2 className="about-headline-word headline-display text-[clamp(1.75rem,8vw,5rem)] uppercase">
                {word}
              </h2>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-black/55 md:mt-10 md:text-lg">
          Founded in 2015 in Multan, Pakistan, {COMPANY.name} has grown from a
          single vision into a global force — expanding into multiple ventures
          with offices across UAE, Lahore, and Multan, serving clients in the USA,
          UK, and Australia.
        </p>
      </div>

      <div className="timeline-track relative mx-auto mt-16 max-w-3xl md:mt-24 [perspective:800px]">
        <div className="absolute top-0 left-4 h-full w-px bg-black/10 md:left-1/2 md:-translate-x-1/2">
          <div className="timeline-line-fill h-0 w-full bg-accent" />
        </div>

        <div className="relative space-y-12 md:space-y-20">
          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              className={`timeline-item relative flex gap-4 pl-10 md:items-center md:gap-8 md:pl-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div
                className={`w-full md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <span className="font-display text-2xl font-bold text-accent sm:text-3xl md:text-4xl">
                  {item.year}
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-black sm:mt-2 sm:text-xl">
                  {item.label}
                </h3>
                <p className="mt-1 text-sm text-black/45">{item.detail}</p>
              </div>

              <div className="timeline-dot absolute top-1 left-4 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-accent bg-white shadow-[0_0_0_6px_rgba(201,162,39,0.15)] transition-transform duration-500 hover:scale-125 md:top-1/2 md:left-1/2 md:h-4 md:w-4 md:-translate-x-1/2 md:-translate-y-1/2" />

              <div className="hidden w-[calc(50%-2rem)] md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
