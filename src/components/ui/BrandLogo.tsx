"use client";

import { cn } from "@/lib/utils";

const BRAND_META: Record<string, { label: string; wide?: boolean }> = {
  amazon: { label: "Amazon", wide: true },
  walmart: { label: "Walmart", wide: true },
  ebay: { label: "eBay" },
  shopify: { label: "Shopify" },
  tiktok: { label: "TikTok" },
  meta: { label: "Meta" },
  google: { label: "Google" },
  instagram: { label: "Instagram" },
  facebook: { label: "Facebook" },
  linkedin: { label: "LinkedIn" },
  "linkedin-white": { label: "LinkedIn" },
  gohighlevel: { label: "Go High Level", wide: true },
};

type BrandLogoProps = {
  slug: string;
  name?: string;
  className?: string;
  iconClassName?: string;
  uniform?: boolean;
  variant?: "default" | "white";
};

export default function BrandLogo({
  slug,
  name,
  className,
  iconClassName,
  uniform = false,
  variant = "default",
}: BrandLogoProps) {
  const meta = BRAND_META[slug];
  const label = name ?? meta?.label ?? slug;
  const assetSlug = variant === "white" && slug === "linkedin" ? "linkedin-white" : slug;
  const isWide = !!meta?.wide;
  const customSize = !!iconClassName;

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        !customSize &&
          (uniform
            ? isWide
              ? "mx-auto h-8 w-full max-w-[4.5rem] overflow-hidden"
              : "h-10 w-10 shrink-0 overflow-hidden"
            : isWide
              ? "h-8 w-[5.5rem] shrink-0 overflow-hidden"
              : "h-8 w-8 shrink-0 overflow-hidden"),
        customSize && "h-auto w-auto max-w-full",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/brands/${assetSlug}.svg`}
        alt={`${label} logo`}
        loading="lazy"
        className={cn(
          "block object-contain object-center",
          customSize
            ? iconClassName
            : uniform
              ? isWide
                ? "h-[1.125rem] w-full max-w-full"
                : "h-7 w-7 md:h-8 md:w-8"
              : isWide
                ? "h-[1.125rem] w-full max-w-full"
                : "h-7 w-7 md:h-8 md:w-8",
        )}
      />
    </div>
  );
}
