/**
 * Liminal SVG logo mark — a threshold arch with a vertical line,
 * evoking passage, liminality, and a doorway between states.
 * Works at 24px and 200px. Uses currentColor.
 */
export function LiminalLogo({
  size = 32,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-label="Liminal"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Arch / threshold */}
      <path
        d="M6 28 L6 14 Q6 6 16 6 Q26 6 26 14 L26 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Threshold line */}
      <line
        x1="16"
        y1="6"
        x2="16"
        y2="28"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="1.5 2.5"
        opacity="0.5"
      />
      {/* Ground line */}
      <line
        x1="4"
        y1="28"
        x2="28"
        y2="28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Wordmark variant: logo + "LIMINAL" text */
export function LiminalWordmark({
  className = '',
}: {
  className?: string;
}) {
  return (
    <span
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Liminal"
    >
      <LiminalLogo size={24} />
      <span
        style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: '1.125rem',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        Liminal
      </span>
    </span>
  );
}


/**
 * Four-pointed compass showing the full Lumen suite.
 * Used on the auth page to hint at the broader system the user is entering.
 * Liminal (current app) is lit in gold; the other three are muted.
 *
 * Cardinal positions follow the loop sequence:
 *   Top    — Liminal   (begin here)
 *   Right  — Parallax  (pattern)
 *   Bottom — Praxis    (experiment)
 *   Left   — Axiom     (synthesis)
 */
export function LumenCompass({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 280"
      width="288"
      height="224"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lumen suite — Liminal, Parallax, Praxis, Axiom"
    >
      {/* ── Arms ────────────────────────────────────────────── */}

      {/* Top — Liminal (gold, prominent) */}
      <path
        d="M180 140 L175.5 104 L180 68 L184.5 104 Z"
        fill="rgb(var(--color-gold))"
        opacity="0.72"
      />
      {/* Right — Parallax */}
      <path
        d="M180 140 L214 135.5 L252 140 L214 144.5 Z"
        fill="rgb(var(--color-text))"
        opacity="0.16"
      />
      {/* Bottom — Praxis */}
      <path
        d="M180 140 L184.5 176 L180 212 L175.5 176 Z"
        fill="rgb(var(--color-text))"
        opacity="0.16"
      />
      {/* Left — Axiom */}
      <path
        d="M180 140 L146 144.5 L108 140 L146 135.5 Z"
        fill="rgb(var(--color-text))"
        opacity="0.16"
      />

      {/* ── Center pivot ────────────────────────────────────── */}
      <circle cx="180" cy="140" r="2.5" fill="rgb(var(--color-gold))" opacity="0.45" />

      {/* ── Labels ──────────────────────────────────────────── */}

      {/* Liminal — gold, slightly larger, above top arm */}
      <text
        x="180"
        y="52"
        textAnchor="middle"
        fill="rgb(var(--color-gold))"
        fontSize="8.5"
        letterSpacing="0.18em"
        fontFamily="var(--font-display), Georgia, serif"
        fontWeight="500"
      >
        LIMINAL
      </text>

      {/* Parallax — muted, right of right arm */}
      <text
        x="260"
        y="144"
        textAnchor="start"
        fill="rgb(var(--color-text-muted))"
        fontSize="7.5"
        letterSpacing="0.14em"
        fontFamily="var(--font-display), Georgia, serif"
      >
        PARALLAX
      </text>

      {/* Praxis — muted, below bottom arm */}
      <text
        x="180"
        y="230"
        textAnchor="middle"
        fill="rgb(var(--color-text-muted))"
        fontSize="7.5"
        letterSpacing="0.14em"
        fontFamily="var(--font-display), Georgia, serif"
      >
        PRAXIS
      </text>

      {/* Axiom — muted, left of left arm */}
      <text
        x="100"
        y="144"
        textAnchor="end"
        fill="rgb(var(--color-text-muted))"
        fontSize="7.5"
        letterSpacing="0.14em"
        fontFamily="var(--font-display), Georgia, serif"
      >
        AXIOM
      </text>
    </svg>
  );
}
