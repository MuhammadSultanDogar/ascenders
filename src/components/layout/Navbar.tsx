"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { NAV_LINKS, LOGO, COMPANY } from "@/lib/constants";
import { IconMenu, IconClose } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState("#home");
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    registerGSAP();

    const showTimer = setTimeout(() => setVisible(true), 2200);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
          const next = self.scroll() > 80;
          setScrolled((prev) => (prev === next ? prev : next));
        },
      });
    });

    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { threshold: 0.35 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      clearTimeout(showTimer);
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 transition-all duration-700 lg:w-auto",
          visible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0",
          scrolled ? "top-4 scale-[0.96]" : "top-6 scale-100",
        )}
      >
        <div
          className={cn(
            "glass flex items-center justify-between gap-1 rounded-full px-2 py-2 md:gap-1 md:px-2.5",
            scrolled && "shadow-lg shadow-black/8",
          )}
        >
          <a
            href="#home"
            data-cursor="hover"
            className="flex shrink-0 items-center px-2 md:px-3"
          >
            <Image
              src={LOGO.src}
              alt="Ascenders"
              width={LOGO.width}
              height={LOGO.height}
              className="h-9 w-auto object-contain md:h-10"
            />
          </a>

          <div className="hidden shrink-0 flex-nowrap items-center md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="hover"
                className="group relative whitespace-nowrap px-2.5 py-2 text-[11px] font-medium tracking-[0.18em] uppercase lg:px-3.5 lg:text-xs lg:tracking-widest"
              >
                <span
                  className={cn(
                    "transition-colors duration-300",
                    active === link.href ? "text-accent" : "text-black/55 group-hover:text-black",
                  )}
                >
                  {link.label}
                </span>
                <span
                  className={cn(
                    "absolute bottom-1 left-2.5 right-2.5 h-px origin-left bg-accent transition-transform duration-500 lg:left-3.5 lg:right-3.5",
                    active === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              data-cursor="hover"
              className="hidden rounded-full bg-accent px-5 py-2 text-xs font-semibold tracking-widest text-black uppercase transition-colors hover:bg-black hover:text-white md:inline-flex"
            >
              Start
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-black md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl transition-all duration-500 md:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="headline-display py-4 text-3xl uppercase transition-colors hover:text-accent"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {link.label}
          </a>
        ))}
        <a
          href={COMPANY.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="mt-8 rounded-full bg-accent px-8 py-3 text-sm font-semibold tracking-widest text-black uppercase"
        >
          Start a Project
        </a>
      </div>
    </>
  );
}
