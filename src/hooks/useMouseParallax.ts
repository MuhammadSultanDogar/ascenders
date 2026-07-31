"use client";

import { useRef, useEffect } from "react";

export function useMouseParallax(intensity = 20) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * intensity;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [intensity]);

  return ref;
}
