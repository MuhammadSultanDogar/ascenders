"use client";

import { MARKETS } from "@/lib/constants";

export default function MarketsStrip() {
  const items = [...MARKETS, ...MARKETS, ...MARKETS];

  return (
    <section className="relative overflow-hidden border-y border-black/5 bg-gradient-to-r from-bg-subtle via-white to-bg-subtle py-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden="true" />
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {items.map((market, i) => (
          <span
            key={`${market}-${i}`}
            className="mx-8 flex items-center gap-8 font-display text-sm font-semibold tracking-[0.35em] text-black/20 uppercase md:text-base"
          >
            {market}
            <span className="h-1 w-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}
