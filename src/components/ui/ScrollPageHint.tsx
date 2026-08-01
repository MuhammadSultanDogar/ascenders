"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ScrollTrigger, registerGSAP } from "@/lib/gsap";

type ScrollPageHintProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  panelSelector?: string;
};

export default function ScrollPageHint({
  sectionRef,
  panelSelector = ".service-panel",
}: ScrollPageHintProps) {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    registerGSAP();

    const mq = window.matchMedia("(max-width: 1023px)");
    if (!mq.matches) return;

    let triggers: ScrollTrigger[] = [];
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;

      const section = sectionRef.current;
      if (!section) {
        requestAnimationFrame(setup);
        return;
      }

      const panels = Array.from(section.querySelectorAll<HTMLElement>(panelSelector));
      if (panels.length < 2) return;

      const total = panels.length;

      panels.forEach((panel, i) => {
        if (i >= total - 1) return;

        triggers.push(
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            end: "bottom top",
            onEnter: () => {
              setVisible(true);
              setLabel(`${i + 1} / ${total}`);
            },
            onEnterBack: () => {
              setVisible(true);
              setLabel(`${i + 1} / ${total}`);
            },
            onLeave: () => setVisible(false),
            onLeaveBack: () => setVisible(false),
          }),
        );
      });

      ScrollTrigger.refresh();
    };

    setup();

    const onMotion = (e: MediaQueryListEvent) => {
      if (!e.matches) setVisible(false);
    };

    mq.addEventListener("change", onMotion);

    return () => {
      cancelled = true;
      mq.removeEventListener("change", onMotion);
      triggers.forEach((t) => t.kill());
    };
  }, [sectionRef, panelSelector]);

  if (!mounted) return null;

  return createPortal(
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed bottom-[max(1.75rem,env(safe-area-inset-bottom))] left-1/2 z-[200] flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-300 lg:hidden ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-[10px] font-medium tracking-[0.22em] text-black/50 uppercase">
        {label}
      </span>
      <div className="scroll-hint-arrow flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/95 shadow-lg backdrop-blur-sm">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </div>
      <span className="text-[9px] tracking-[0.18em] text-black/40 uppercase">Swipe up for next</span>
    </div>,
    document.body,
  );
}
