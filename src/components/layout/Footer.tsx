import { COMPANY, SOCIALS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-black/8 bg-white px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-black">{COMPANY.name}</p>
          <p className="mt-1 text-xs tracking-[0.2em] text-black/40 uppercase">
            {COMPANY.tagline}
          </p>
        </div>

        <p className="text-xs text-black/40">
          © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </p>

        <div className="flex gap-6 text-xs tracking-widest text-black/45 uppercase">
          <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="hover:text-accent">
            IG
          </a>
          <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="hover:text-accent">
            FB
          </a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="hover:text-accent">
            LI
          </a>
        </div>
      </div>
    </footer>
  );
}
