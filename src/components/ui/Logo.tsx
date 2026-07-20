/**
 * BSTS mark — original organic monogram. Two interleaved arcs suggest
 * "connecting what is disconnected"; the gold point marks the secure core.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-labelledby="bsts-mark-title"
    >
      <title id="bsts-mark-title">BSTS mark</title>
      <path
        d="M20 4c8.8 0 16 7.2 16 16 0 6.1-3.4 11.4-8.4 14.1"
        fill="none"
        stroke="var(--color-cyan-core)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M20 36c-8.8 0-16-7.2-16-16 0-6.1 3.4-11.4 8.4-14.1"
        fill="none"
        stroke="var(--color-warm-white)"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="20" cy="20" r="3.4" fill="var(--color-gold-core)" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-semibold tracking-[0.18em] text-warm-white">
          BSTS
        </span>
        <span className="mt-1 block text-[0.5rem] tracking-[0.08em] text-warm-dim uppercase sm:text-[0.6rem] sm:tracking-[0.14em]">
          Bevier Strategic Technology Solutions
        </span>
      </span>
    </span>
  );
}
