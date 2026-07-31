"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);
  const hoveringRef = useRef(false);
  const visibleRef = useRef(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const move = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onOver = (e: MouseEvent) => {
      const next = !!(e.target as Element | null)?.closest("[data-cursor='hover']");
      if (next === hoveringRef.current) return;
      hoveringRef.current = next;
      setHovering(next);
    };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }

      ring.current.x += (target.current.x - ring.current.x) * 0.55;
      ring.current.y += (target.current.y - ring.current.y) * 0.55;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    const hide = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const show = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[10001] hidden will-change-transform md:block ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`rounded-full bg-black shadow-[0_0_0_2px_#fafafa,0_0_10px_rgba(0,0,0,0.3)] transition-[width,height,background-color] duration-150 ${
            hovering ? "h-3 w-3 bg-accent" : "h-2.5 w-2.5"
          }`}
        />
      </div>

      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[10000] hidden will-change-transform md:block ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`rounded-full border-2 border-black/70 transition-[width,height,border-color,background-color] duration-150 ${
            hovering ? "h-12 w-12 border-accent bg-accent/10" : "h-8 w-8 bg-white/10"
          }`}
        />
      </div>
    </>
  );
}
