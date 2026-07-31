"use client";

import { useRef, useState } from "react";
import { IconInstagram, IconFacebook, IconLinkedin } from "@/components/ui/Icons";
import { gsap, useGSAP, registerGSAP, ScrollTrigger } from "@/lib/gsap";
import { scrollReveal, scrollRevealLines } from "@/lib/scroll-animations";
import { SOCIALS } from "@/lib/constants";
import SectionDecor from "@/components/ui/SectionDecor";

function LazyInstagramEmbed({ src, title, href }: { src: string; title: string; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useGSAP(
    () => {
      registerGSAP();
      if (!ref.current || active) return;

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 92%",
        once: true,
        onEnter: () => setActive(true),
      });
    },
    { dependencies: [active], scope: ref },
  );

  return (
    <div ref={ref} className="social-reel overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-black/5 px-4 py-3">
        <IconInstagram className="h-4 w-4 text-[#E1306C]" />
        <span className="text-xs tracking-widest text-black/50 uppercase">Instagram Reel</span>
      </div>
      <div className="relative aspect-[4/5] w-full bg-black/5">
        {active ? (
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs tracking-widest text-black/30 uppercase">
            Loading reel…
          </div>
        )}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        className="block px-4 py-3 text-sm text-black/60 transition-colors hover:text-accent"
      >
        View on Instagram →
      </a>
    </div>
  );
}

export default function SocialWall() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGSAP();

      scrollReveal(".social-eyebrow", {
        trigger: sectionRef.current,
        y: 20,
        duration: 0.65,
      });

      scrollRevealLines(".social-headline-line", sectionRef.current, 0.08);

      scrollReveal(".social-sub", {
        trigger: sectionRef.current,
        y: 28,
        duration: 0.8,
        delay: 0.1,
      });

      gsap.utils.toArray<HTMLElement>(".social-reel").forEach((el, i) => {
        scrollReveal(el, {
          trigger: el,
          start: "top 92%",
          y: 52,
          scale: 0.97,
          duration: 0.95,
          delay: i * 0.1,
        });
      });

      scrollReveal(".social-linkedin-card", {
        trigger: ".social-linkedin-card",
        start: "top 92%",
        y: 48,
        duration: 0.95,
      });

      gsap.utils.toArray<HTMLElement>(".social-chip").forEach((chip, i) => {
        scrollReveal(chip, {
          trigger: chip,
          start: "top 95%",
          y: 24,
          duration: 0.7,
          delay: i * 0.06,
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-bg px-6 py-24 md:px-12 md:py-48"
    >
      <SectionDecor variant="purple" />

      <div className="relative mx-auto max-w-7xl">
        <span className="social-eyebrow text-xs tracking-[0.35em] text-accent uppercase">
          Social
        </span>

        <div className="mt-6 overflow-hidden">
          {["FOLLOW", "THE", "JOURNEY."].map((line) => (
            <div key={line} className="overflow-hidden">
              <h2 className="social-headline-line headline-display text-[clamp(2.25rem,7vw,4.5rem)] uppercase">
                {line}
              </h2>
            </div>
          ))}
        </div>

        <p className="social-sub mt-8 max-w-lg text-black/50">
          Watch our latest reels and connect with Ascenders across Instagram and LinkedIn.
        </p>

        <div className="social-grid mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <LazyInstagramEmbed
            src="https://www.instagram.com/reel/C353SybIM8-/embed"
            title="Ascenders Instagram Reel 1"
            href={SOCIALS.instagramReel}
          />
          <LazyInstagramEmbed
            src="https://www.instagram.com/reel/C38H-9mIsLC/embed"
            title="Ascenders Instagram Reel 2"
            href={SOCIALS.instagramReel2}
          />
        </div>

        <div className="social-linkedin-card mt-8 overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-black/5 px-4 py-3">
            <IconLinkedin className="h-4 w-4 text-[#0A66C2]" />
            <span className="text-xs tracking-widest text-black/50 uppercase">LinkedIn</span>
          </div>
          <div className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:p-10">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#0A66C2]/20 bg-[#0A66C2]/5">
              <IconLinkedin className="h-10 w-10 text-[#0A66C2]" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold text-black">Ascenders IT Solutions</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-black/55">
                Follow our company page for updates on ecommerce growth, marketplace management,
                and digital innovation across USA, UK &amp; Australia.
              </p>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="mt-5 inline-flex rounded-full bg-[#0A66C2] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          {(
            [
              { label: "Instagram", href: SOCIALS.instagram, icon: IconInstagram },
              { label: "Facebook", href: SOCIALS.facebook, icon: IconFacebook },
              { label: "LinkedIn", href: SOCIALS.linkedin, icon: IconLinkedin },
            ] as const
          ).map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="social-chip glass flex items-center gap-3 rounded-full px-6 py-3 text-sm tracking-wide transition-colors hover:border-accent/50"
            >
              <Icon className="h-4 w-4 text-accent" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
