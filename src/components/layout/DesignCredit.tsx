export default function DesignCredit() {
  return (
    <a
      href="https://spatiolens.com"
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      className="fixed right-4 bottom-4 z-40 rounded-full border border-black/8 bg-white/90 px-3.5 py-2 text-[10px] tracking-wide text-black/45 shadow-sm backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-black sm:right-6 sm:bottom-6 sm:px-4 sm:text-[11px]"
    >
      Designed by{" "}
      <span className="font-semibold text-black/70 transition-colors hover:text-accent">
        Spatiolens
      </span>
    </a>
  );
}
