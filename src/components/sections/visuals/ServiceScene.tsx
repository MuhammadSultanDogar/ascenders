"use client";

import BrandLogo from "@/components/ui/BrandLogo";

type ServiceSceneProps = {
  serviceId: string;
};

function SceneShell({ children, tall = false }: { children: React.ReactNode; tall?: boolean }) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-bg to-bg-subtle p-5 sm:p-6 md:p-8 ${
        tall ? "min-h-[360px] sm:min-h-[420px] md:min-h-[460px]" : "min-h-[280px] sm:min-h-[340px] md:min-h-[400px]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(201,162,39,0.08),transparent_50%)]" />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

const MARKETING_FACES = [
  { bg: "bg-[#0467DF]", label: "Meta", slug: "meta", labelClass: "text-white/70" },
  { bg: "bg-white", label: "Google", slug: "google", labelClass: "text-black/50" },
  {
    bg: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
    label: "Instagram",
    slug: "instagram",
    labelClass: "text-white/80",
  },
  {
    bg: "bg-[#0A66C2]",
    label: "LinkedIn",
    slug: "linkedin",
    labelClass: "text-white/80",
    variant: "white" as const,
  },
];

function MarketingScene() {
  return (
    <SceneShell>
      <div className="mx-auto grid w-full max-w-xs grid-cols-2 gap-3 lg:hidden">
        {MARKETING_FACES.map((face) => (
          <div
            key={face.slug}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-black/8 px-3 py-4 shadow-md ${face.bg}`}
          >
            <BrandLogo
              slug={face.slug}
              name={face.label}
              variant={face.variant}
              uniform
              iconClassName="h-8 w-8"
            />
            <span className={`text-[10px] tracking-[0.15em] uppercase ${face.labelClass}`}>
              {face.label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative mx-auto hidden h-[320px] max-w-full items-center justify-center lg:flex [perspective:900px]">
        <div className="marketing-cube relative h-48 w-48 animate-[spin3d_18s_linear_infinite] [transform-style:preserve-3d]">
          {MARKETING_FACES.map((face, i) => {
            const transforms = [
              "rotateY(0deg) translateZ(96px)",
              "rotateY(90deg) translateZ(96px)",
              "rotateY(180deg) translateZ(96px)",
              "rotateY(-90deg) translateZ(96px)",
            ];
            return (
              <div
                key={face.slug}
                className={`absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-black/8 shadow-xl ${face.bg}`}
                style={{ transform: transforms[i] }}
              >
                <BrandLogo
                  slug={face.slug}
                  name={face.label}
                  variant={face.variant}
                  uniform
                  iconClassName="h-11 w-11"
                />
                <span className={`text-xs tracking-[0.2em] uppercase ${face.labelClass}`}>
                  {face.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="pointer-events-none mt-4 text-center text-[10px] tracking-[0.25em] text-black/30 uppercase lg:absolute lg:bottom-6 lg:left-6 lg:mt-0 lg:text-left lg:text-xs lg:tracking-[0.3em]">
        Live channels
      </p>
    </SceneShell>
  );
}

function EcommerceScene() {
  const brands = [
    { slug: "amazon", name: "Amazon" },
    { slug: "walmart", name: "Walmart" },
    { slug: "ebay", name: "eBay" },
    { slug: "shopify", name: "Shopify" },
    { slug: "tiktok", name: "TikTok" },
  ];

  return (
    <SceneShell>
      <div className="mx-auto flex w-full max-w-[320px] flex-col items-center gap-3 sm:max-w-[360px] sm:gap-4">
        <div className="grid w-full grid-cols-3 gap-2.5 sm:gap-3">
          {brands.slice(0, 3).map((brand) => (
            <div
              key={brand.slug}
              className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-black/6 bg-white/95 px-1.5 py-2 shadow-md sm:rounded-2xl sm:gap-1.5 sm:py-3"
            >
              <BrandLogo slug={brand.slug} name={brand.name} uniform />
              <span className="text-center text-[8px] leading-tight tracking-[0.12em] text-black/45 uppercase sm:text-[9px]">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex w-full justify-center gap-2.5 sm:gap-3">
          {brands.slice(3).map((brand) => (
            <div
              key={brand.slug}
              className="flex aspect-square w-[calc(50%-0.375rem)] max-w-[108px] flex-col items-center justify-center gap-1 rounded-xl border border-black/6 bg-white/95 px-1.5 py-2 shadow-md sm:max-w-none sm:flex-1 sm:rounded-2xl sm:gap-1.5 sm:py-3"
            >
              <BrandLogo slug={brand.slug} name={brand.name} uniform />
              <span className="text-center text-[8px] leading-tight tracking-[0.12em] text-black/45 uppercase sm:text-[9px]">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-full border border-accent/20 bg-white/90 px-4 py-1 text-[9px] tracking-[0.2em] text-accent uppercase shadow-sm sm:px-5 sm:py-1.5 sm:text-[10px] sm:tracking-[0.25em]">
          All marketplaces managed
        </div>
      </div>
    </SceneShell>
  );
}

function ReinstatementScene() {
  return (
    <SceneShell>
      <div className="relative mx-auto flex max-w-xs flex-col items-center px-2 sm:max-w-sm">
        <div className="relative w-full rounded-2xl border border-black/8 bg-white px-6 py-8 text-center shadow-lg sm:rounded-[1.75rem] sm:px-8 sm:py-10 lg:[transform:rotateX(8deg)_rotateY(-12deg)]">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 sm:h-20 sm:w-20">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent sm:h-10 sm:w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3l8 4v5c0 5-3.5 9-8 9s-8-4-8-9V7l8-4z" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-display text-lg font-bold text-black sm:text-xl">Account Restored</p>
          <p className="mt-2 text-xs tracking-wide text-black/45">Appeals · Compliance · Recovery</p>

          <span className="absolute -right-2 -bottom-3 hidden rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-xs shadow-md lg:block">
            ✓ Suspension lifted
          </span>
          <span className="absolute -top-3 -left-2 hidden rounded-lg border border-accent/30 bg-white px-3 py-1.5 text-xs shadow-md lg:block">
            ✓ Policy compliant
          </span>
        </div>

        <div className="mt-4 flex w-full flex-wrap justify-center gap-2 sm:gap-3 lg:hidden">
          <span className="rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-[11px] shadow-md sm:text-xs">
            ✓ Suspension lifted
          </span>
          <span className="rounded-lg border border-accent/30 bg-white px-3 py-1.5 text-[11px] shadow-md sm:text-xs">
            ✓ Policy compliant
          </span>
        </div>
      </div>
    </SceneShell>
  );
}

function AutomationScene() {
  const steps = ["Leads", "CRM", "AI Bots", "Convert"];

  return (
    <SceneShell tall>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-5 sm:max-w-md sm:gap-6">
        <div className="flex w-full flex-col gap-2 sm:gap-2.5 lg:hidden">
          {steps.map((step) => (
            <div
              key={step}
              className="flex items-center justify-between rounded-xl border border-black/8 bg-white px-4 py-3 shadow-md sm:rounded-2xl sm:px-5 sm:py-3.5"
            >
              <span className="text-sm font-semibold text-black">{step}</span>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </div>
          ))}
        </div>

        <div className="relative hidden h-[220px] w-full max-w-xs lg:block [transform-style:preserve-3d] [perspective:900px]">
          {steps.map((step, i) => (
            <div
              key={step}
              className="absolute left-1/2 w-full -translate-x-1/2 rounded-2xl border border-black/8 bg-white px-6 py-4 shadow-xl"
              style={{
                top: `${i * 48}px`,
                transform: `translateZ(${i * 28}px) rotateX(${8 - i * 2}deg)`,
                zIndex: 10 - i,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-black">{step}</span>
                <span className="h-2 w-2 rounded-full bg-accent" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex w-full items-center justify-center rounded-2xl border border-black/8 bg-white px-6 py-5 shadow-md sm:px-8 sm:py-6">
          <BrandLogo
            slug="gohighlevel"
            name="Go High Level"
            className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px]"
            iconClassName="h-12 w-full sm:h-14 md:h-16 lg:h-[4.5rem]"
          />
        </div>
      </div>
    </SceneShell>
  );
}

export default function ServiceScene({ serviceId }: ServiceSceneProps) {
  switch (serviceId) {
    case "digital-marketing":
      return <MarketingScene />;
    case "ecommerce":
      return <EcommerceScene />;
    case "reinstatements":
      return <ReinstatementScene />;
    case "gohighlevel":
      return <AutomationScene />;
    default:
      return null;
  }
}
