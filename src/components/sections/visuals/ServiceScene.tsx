"use client";

import BrandLogo from "@/components/ui/BrandLogo";

type ServiceSceneProps = {
  serviceId: string;
};

function SceneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full min-h-[420px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-white via-bg to-bg-subtle p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(201,162,39,0.08),transparent_50%)]" />
      <div className="scene-3d relative z-10 h-[320px] w-full [perspective:900px]">
        {children}
      </div>
    </div>
  );
}

function MarketingScene() {
  const faces = [
    { bg: "bg-[#0467DF]", label: "Meta", slug: "meta", labelClass: "text-white/70", transform: "rotateY(0deg) translateZ(96px)" },
    { bg: "bg-white", label: "Google", slug: "google", labelClass: "text-black/50", transform: "rotateY(90deg) translateZ(96px)" },
    { bg: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]", label: "Instagram", slug: "instagram", labelClass: "text-white/80", transform: "rotateY(180deg) translateZ(96px)" },
    { bg: "bg-[#0A66C2]", label: "LinkedIn", slug: "linkedin", labelClass: "text-white/80", variant: "white" as const, transform: "rotateY(-90deg) translateZ(96px)" },
  ];

  return (
    <SceneShell>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="marketing-cube relative h-48 w-48 animate-[spin3d_18s_linear_infinite] [transform-style:preserve-3d]">
          {faces.map((face) => (
            <div
              key={face.slug}
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-black/8 shadow-xl ${face.bg}`}
              style={{ transform: face.transform }}
            >
              <BrandLogo
                slug={face.slug}
                name={face.label}
                variant={face.variant}
                uniform
                iconClassName="max-h-11 max-w-11 md:max-h-12 md:max-w-12"
              />
              <span className={`text-xs tracking-[0.2em] uppercase ${face.labelClass}`}>
                {face.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-6 left-6 z-20 text-xs tracking-[0.3em] text-black/30 uppercase">
        Live channels
      </div>
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
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-5">
        <div className="grid w-full max-w-[340px] grid-cols-3 gap-3 [transform-style:preserve-3d]">
          {brands.slice(0, 3).map((brand, i) => (
            <div
              key={brand.slug}
              className="ecommerce-tile relative z-10 flex aspect-square flex-col items-center justify-center gap-1.5 rounded-2xl border border-black/6 bg-white/90 px-2 py-3 shadow-lg backdrop-blur-sm"
              style={{
                transform: `translateZ(${24 + i * 6}px) rotateX(${i % 2 === 0 ? -5 : 5}deg) rotateY(${i % 2 === 0 ? 6 : -6}deg)`,
                animationDelay: `${i * 0.12}s`,
              }}
            >
              <BrandLogo slug={brand.slug} name={brand.name} uniform />
              <span className="text-center text-[9px] leading-tight tracking-[0.15em] text-black/45 uppercase">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 [transform-style:preserve-3d]">
          {brands.slice(3).map((brand, i) => (
            <div
              key={brand.slug}
              className="ecommerce-tile relative z-10 flex h-[100px] w-[100px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-black/6 bg-white/90 px-2 py-3 shadow-lg backdrop-blur-sm"
              style={{
                transform: `translateZ(${18 + i * 6}px) rotateX(${i % 2 === 0 ? 4 : -4}deg) rotateY(${i % 2 === 0 ? -5 : 5}deg)`,
                animationDelay: `${(i + 3) * 0.12}s`,
              }}
            >
              <BrandLogo slug={brand.slug} name={brand.name} uniform />
              <span className="text-center text-[9px] leading-tight tracking-[0.15em] text-black/45 uppercase">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-20 mt-1 rounded-full border border-accent/20 bg-white/90 px-5 py-1.5 text-[10px] tracking-[0.25em] text-accent uppercase shadow-sm">
          All marketplaces managed
        </div>
      </div>
    </SceneShell>
  );
}

function ReinstatementScene() {
  return (
    <SceneShell>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative animate-[floatY_4s_ease-in-out_infinite]">
          <div className="flex h-56 w-56 items-center justify-center rounded-[2rem] border border-black/8 bg-white shadow-2xl [transform:rotateX(12deg)_rotateY(-18deg)]">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
                <svg viewBox="0 0 24 24" className="h-10 w-10 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3l8 4v5c0 5-3.5 9-8 9s-8-4-8-9V7l8-4z" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-display text-xl font-bold text-black">Account Restored</p>
              <p className="mt-2 text-xs tracking-wide text-black/45">Appeals · Compliance · Recovery</p>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-4 z-20 rounded-xl border border-teal-200 bg-white px-3 py-2 text-xs shadow-lg">
            ✓ Suspension lifted
          </div>
          <div className="absolute -top-4 -left-6 z-20 rounded-xl border border-accent/30 bg-white px-3 py-2 text-xs shadow-lg">
            ✓ Policy compliant
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function AutomationScene() {
  return (
    <SceneShell>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="automation-stack relative h-56 w-full max-w-xs [transform-style:preserve-3d]">
          {["Leads", "CRM", "AI Bots", "Convert"].map((step, i) => (
            <div
              key={step}
              className="absolute left-1/2 w-full -translate-x-1/2 rounded-2xl border border-black/8 bg-white px-6 py-4 shadow-xl"
              style={{
                top: `${i * 52}px`,
                transform: `translateZ(${i * 30}px) rotateX(${8 - i * 2}deg)`,
                zIndex: 10 - i,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-black">{step}</span>
                <span className="h-2 w-2 rounded-full bg-accent" />
              </div>
            </div>
          ))}
          <div className="absolute -bottom-2 left-1/2 z-20 -translate-x-1/2">
            <BrandLogo
              slug="gohighlevel"
              name="Go High Level"
              iconClassName="h-12 w-auto min-w-[9rem] md:h-14 md:min-w-[10.5rem]"
            />
          </div>
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
