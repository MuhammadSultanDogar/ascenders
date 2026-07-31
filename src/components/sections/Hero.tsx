"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap, useGSAP, registerGSAP } from "@/lib/gsap";
import { COMPANY, MARKETS, LOGO } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionDecor from "@/components/ui/SectionDecor";

const EcommerceGlobe = dynamic(() => import("@/components/sections/visuals/EcommerceGlobe"), {
  ssr: false,
  loading: () => (
    <div className="h-[min(380px,52vh)] w-[min(380px,52vh)] animate-pulse rounded-full bg-black/[0.04]" />
  ),
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGSAP();

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-logo", { opacity: 0, y: 30, duration: 1.1 })
        .from(".hero-line", { y: "110%", duration: 1.1, stagger: 0.12 }, "-=0.55")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
        .from(".hero-globe-wrap", { opacity: 0, scale: 0.88, y: 30, duration: 1.2 }, "-=0.9");

      gsap.to(".hero-bg-text", {
        xPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-globe-wrap", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    gsap.to(".hero-globe-float", {
      y: "+=10",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-bg relative flex min-h-[110vh] flex-col overflow-hidden bg-bg"
    >
      <div className="sticky top-0 isolate flex h-screen items-center overflow-hidden">
        <SectionDecor variant="gold" showShape={false} />

        <div className="pointer-events-none absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-accent/40 via-[#0467DF]/20 to-[#833AB4]/30" aria-hidden="true" />

        <div className="hero-bg-text pointer-events-none absolute inset-0 z-0 flex items-center">
          <span className="whitespace-nowrap font-display text-[18vw] font-bold tracking-normal text-black/[0.03] select-none">
            ASCENDERS ASCENDERS
          </span>
        </div>

        <div className="hero-content relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="hero-logo mb-8 md:mb-10">
              <Image
                src={LOGO.src}
                alt={COMPANY.name}
                width={LOGO.width}
                height={LOGO.height}
                priority
                className="h-auto w-40 md:w-52"
              />
            </div>

            <div className="hero-headline-wrap overflow-hidden text-left">
              {["WE BUILD", "DIGITAL", "GROWTH."].map((line) => (
                <div key={line} className="overflow-hidden">
                  <h1 className="hero-line headline-display text-[clamp(2.5rem,10vw,7rem)] uppercase">
                    {line}
                  </h1>
                </div>
              ))}
            </div>

            <p className="hero-sub mt-6 max-w-xl text-left text-sm leading-relaxed tracking-wide text-black/55 md:mt-8 md:text-base">
              {COMPANY.tagline}. Premium ecommerce, marketing & automation for brands
              scaling across{" "}
              {MARKETS.map((m, i) => (
                <span key={m}>
                  <span className="text-accent">{m}</span>
                  {i < MARKETS.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>

            <div className="hero-cta mt-10 flex flex-wrap items-center gap-4 md:mt-12">
              <MagneticButton href="#services" variant="primary">
                Explore Services
              </MagneticButton>
              <MagneticButton
                href={COMPANY.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                Start a Project
              </MagneticButton>
            </div>
          </div>

          <div className="hero-globe-wrap relative z-10 hidden shrink-0 lg:block">
            <div className="hero-globe-float">
              <EcommerceGlobe />
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 z-10 flex flex-col items-start gap-3 md:left-12">
          <span className="text-[10px] tracking-[0.3em] text-black/35 uppercase">
            Scroll to explore
          </span>
          <div className="h-12 w-px overflow-hidden bg-black/10">
            <div className="h-full w-full origin-top animate-[scrollLine_2s_ease-in-out_infinite] bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
