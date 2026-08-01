"use client";

import { ScrollTrigger } from "@/lib/gsap";

type BindMobileServiceSnapOptions = {
  section: HTMLElement;
  panelCount: number;
};

/**
 * Snap one service panel at a time on mobile, only while the section stack is active.
 * Does not trap scroll before entering or after leaving the stack.
 */
export function bindMobileServiceSnap({
  section,
  panelCount,
}: BindMobileServiceSnapOptions): () => void {
  if (panelCount < 2) return () => {};

  const maxIndex = panelCount - 1;
  let snappedIndex = 0;

  const scrollDistance = () => maxIndex * window.innerHeight;

  const snapTrigger = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => `+=${scrollDistance()}`,
    snap: {
      snapTo: (progress) => {
        const step = 1 / maxIndex;
        const anchor = snappedIndex * step;
        const delta = progress - anchor;

        if (delta > step * 0.07) {
          snappedIndex = Math.min(snappedIndex + 1, maxIndex);
        } else if (delta < -step * 0.07) {
          snappedIndex = Math.max(snappedIndex - 1, 0);
        }

        return snappedIndex * step;
      },
      duration: { min: 0.28, max: 0.48 },
      delay: 0.05,
      ease: "power2.out",
    },
    onEnter: () => {
      snappedIndex = 0;
    },
    onEnterBack: () => {
      snappedIndex = maxIndex;
    },
    onLeaveBack: () => {
      snappedIndex = 0;
    },
  });

  return () => {
    snapTrigger.kill();
  };
}
