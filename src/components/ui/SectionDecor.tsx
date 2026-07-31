type SectionDecorProps = {
  variant?: "gold" | "blue" | "purple" | "teal" | "coral";
  showShape?: boolean;
};

const BLOBS: Record<NonNullable<SectionDecorProps["variant"]>, string> = {
  gold: "from-accent/20 via-accent/5 to-transparent",
  blue: "from-[#0467DF]/15 via-[#0467DF]/5 to-transparent",
  purple: "from-[#833AB4]/15 via-[#833AB4]/5 to-transparent",
  teal: "from-[#0d9488]/15 via-[#0d9488]/5 to-transparent",
  coral: "from-[#f97316]/15 via-[#f97316]/5 to-transparent",
};

const EDGES: Record<NonNullable<SectionDecorProps["variant"]>, string> = {
  gold: "from-accent via-accent/40 to-transparent",
  blue: "from-[#0467DF] via-[#0467DF]/40 to-transparent",
  purple: "from-[#833AB4] via-[#833AB4]/40 to-transparent",
  teal: "from-[#0d9488] via-[#0d9488]/40 to-transparent",
  coral: "from-[#f97316] via-[#f97316]/40 to-transparent",
};

export default function SectionDecor({
  variant = "gold",
  showShape = true,
}: SectionDecorProps) {
  return (
    <>
      <div
        className={`pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br ${BLOBS[variant]} blur-3xl`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute bottom-16 -left-8 h-48 w-48 rounded-full bg-gradient-to-tr ${BLOBS[variant]} blur-3xl`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute top-0 left-0 h-full w-1 bg-gradient-to-b ${EDGES[variant]}`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute top-0 right-0 h-px w-48 bg-gradient-to-l ${EDGES[variant]}`}
        aria-hidden="true"
      />
      {showShape && (
        <div
          className="pointer-events-none absolute top-[18%] right-[6%] hidden lg:block [perspective:700px]"
          aria-hidden="true"
        >
          <div
            className="h-20 w-20 rounded-2xl border border-black/6 bg-white/70 shadow-xl backdrop-blur-sm [transform:rotateX(22deg)_rotateY(-28deg)_translateZ(0)]"
          />
          <div
            className="absolute -bottom-3 -left-3 h-10 w-10 rounded-lg border border-accent/25 bg-accent/10 [transform:rotateX(22deg)_rotateY(-28deg)_translateZ(24px)]"
          />
        </div>
      )}
    </>
  );
}
