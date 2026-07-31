"use client";

import { useRef, useState } from "react";
import { IconInstagram } from "@/components/ui/Icons";
import { gsap, useGSAP, registerGSAP, ScrollTrigger } from "@/lib/gsap";
import { PORTFOLIO } from "@/lib/constants";
import SectionDecor from "@/components/ui/SectionDecor";

function PortfolioEmbed({
  embed,
  url,
  title,
}: {
  embed: string;
  url: string;
  title: string;
}) {
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
    <article
      ref={ref}
      data-cursor="hover"
      className="portfolio-card group overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-2 border-b border-black/5 px-3 py-2">
        <IconInstagram className="h-3.5 w-3.5 text-[#E1306C]" />
        <span className="text-[10px] tracking-widest text-black/45 uppercase">Instagram</span>
      </div>
      <div className="relative aspect-[4/5] w-full bg-black/[0.03]">
        {active ? (
          <iframe
            src={embed}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[10px] tracking-widest text-black/30 uppercase">
            Loading…
          </div>
        )}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        className="block px-3 py-2 text-xs text-black/55 transition-colors hover:text-accent"
      >
        View post →
      </a>
    </article>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGSAP();

      gsap.from(".portfolio-headline", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".portfolio-card", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-subtle px-6 py-24 md:px-12 md:py-48"
    >
      <SectionDecor variant="coral" showShape={false} />

      <div className="relative mx-auto max-w-6xl">
        <div className="portfolio-headline mb-12 md:mb-16">
          <span className="text-xs tracking-[0.35em] text-accent uppercase">
            Selected Work
          </span>
          <h2 className="headline-display mt-4 text-[clamp(2rem,5vw,4rem)] uppercase">
            Portfolio
          </h2>
          <p className="mt-4 max-w-lg text-sm text-black/50">
            Recent highlights from our Instagram — client wins, campaigns, and growth stories.
          </p>
        </div>

        <div className="portfolio-grid grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {PORTFOLIO.map((post) => (
            <PortfolioEmbed
              key={post.id}
              embed={post.embed}
              url={post.url}
              title={`Ascenders portfolio post ${post.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
