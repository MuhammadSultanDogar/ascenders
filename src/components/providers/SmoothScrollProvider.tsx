"use client";

import { useRef, useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGSAP();

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
