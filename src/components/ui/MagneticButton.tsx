"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  type?: "button" | "submit";
  target?: string;
  rel?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  type = "button",
  target,
  rel,
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave, onMouseEnter } = useMagnetic(0.3);

  const base =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-medium tracking-wide uppercase transition-colors duration-500";

  const variants = {
    primary: "bg-accent text-black hover:bg-black hover:text-white",
    outline: "border border-black/15 text-black hover:border-accent hover:text-accent",
    ghost: "text-black/60 hover:text-black",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        data-cursor="hover"
        className={classes}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
      >
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      data-cursor="hover"
      className={classes}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
