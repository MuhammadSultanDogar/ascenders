"use client";

import { PARTNER_BRANDS } from "@/lib/constants";
import BrandLogo from "@/components/ui/BrandLogo";

const WIDE_SLUGS = new Set(["amazon", "walmart", "gohighlevel"]);

export default function PartnersStrip() {
  const items = [...PARTNER_BRANDS, ...PARTNER_BRANDS];

  return (
    <section className="relative z-20 overflow-hidden border-y border-black/5 bg-white py-10 md:py-12">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#0467DF]/40 via-accent/50 to-[#833AB4]/40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-[#833AB4]/40 via-accent/50 to-[#0467DF]/40" aria-hidden="true" />

      <div className="mx-auto mb-8 max-w-7xl px-6 md:px-12">
        <p className="text-xs tracking-[0.35em] text-black/40 uppercase">
          Platforms & Partners
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="flex w-max animate-[marquee_45s_linear_infinite] items-center gap-10 md:gap-14">
          {items.map((brand, i) => (
            <div
              key={`${brand.slug}-${i}`}
              className={`flex h-14 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-bg px-5 transition-all duration-500 hover:border-accent/30 hover:shadow-md ${
                WIDE_SLUGS.has(brand.slug) ? "w-[7.5rem]" : "w-[5.5rem]"
              }`}
            >
              <BrandLogo slug={brand.slug} name={brand.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
