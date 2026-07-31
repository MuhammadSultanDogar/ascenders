"use client";

import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "@/lib/gsap";

export const SCROLL_START = "top 90%";
export const SCROLL_START_TIGHT = "top 85%";

type RevealOptions = {
  trigger?: Element | string | null;
  start?: string;
  stagger?: number;
  y?: number | string;
  x?: number;
  duration?: number;
  delay?: number;
  scale?: number;
  ease?: string;
  scrub?: boolean | number;
  once?: boolean;
};

export function scrollReveal(targets: gsap.TweenTarget, options: RevealOptions = {}) {
  const {
    trigger,
    start = SCROLL_START,
    stagger = 0,
    y = 36,
    x = 0,
    duration = 0.85,
    delay = 0,
    scale,
    ease = "power3.out",
    scrub,
    once = true,
  } = options;

  const from: gsap.TweenVars = { opacity: 0, duration, delay, ease };
  if (y) from.y = y;
  if (x) from.x = x;
  if (scale !== undefined) from.scale = scale;
  if (stagger) from.stagger = stagger;

  const scrollTrigger: ScrollTrigger.Vars = {
    trigger: (trigger ?? targets) as Element | string,
    start,
    toggleActions: once ? "play none none none" : "play none none reverse",
  };

  if (scrub !== undefined) scrollTrigger.scrub = scrub;

  return gsap.from(targets, { ...from, scrollTrigger });
}

export function scrollRevealLines(
  targets: gsap.TweenTarget,
  trigger: Element | string | null,
  stagger = 0.07,
) {
  return gsap.from(targets, {
    y: "100%",
    duration: 0.95,
    stagger,
    ease: "power4.out",
    scrollTrigger: {
      trigger,
      start: SCROLL_START_TIGHT,
      toggleActions: "play none none none",
    },
  });
}

export function panelEnterTimeline(panel: HTMLElement) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: SCROLL_START_TIGHT,
      toggleActions: "play none none none",
    },
  });

  const accent = panel.querySelector(".service-accent");
  const headlines = panel.querySelectorAll(".service-headline-line");
  const scene = panel.querySelector(".service-scene-wrap");
  const desc = panel.querySelector(".service-desc");
  const items = panel.querySelectorAll(".service-item");
  const cta = panel.querySelector(".service-cta");

  if (accent) tl.from(accent, { y: 20, opacity: 0, duration: 0.55, ease: "power3.out" });
  if (headlines.length)
    tl.from(
      headlines,
      { y: "100%", stagger: 0.08, duration: 0.9, ease: "power4.out" },
      accent ? "-=0.15" : 0,
    );
  if (scene)
    tl.from(
      scene,
      { y: 44, opacity: 0, scale: 0.94, duration: 0.95, ease: "power3.out" },
      "-=0.55",
    );
  if (desc) tl.from(desc, { y: 28, opacity: 0, duration: 0.75, ease: "power3.out" }, "-=0.45");
  if (items.length)
    tl.from(
      items,
      { x: -18, opacity: 0, stagger: 0.06, duration: 0.7, ease: "power3.out" },
      "-=0.35",
    );
  if (cta) tl.from(cta, { y: 22, opacity: 0, duration: 0.65, ease: "power3.out" }, "-=0.25");

  return tl;
}
