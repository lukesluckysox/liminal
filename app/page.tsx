import Link from 'next/link';
import { Nav } from '@/components/nav';
import { getSession } from '@/lib/auth/session';

// ── Tool registry ──────────────────────────────────────────────────────────────
// Order determines hexagon position (clockwise from top vertex)
const TOOLS = [
  {
    slug: 'small-council',
    name: 'Small Council',
    tagline: 'Deliberate among divided voices.',
    blurb:
      'Five voices — The Instinct, The Critic, The Realist, The Shadow, The Sage — debate your dilemma across two rounds and reach a synthesis. Watch the council deliberate in real time.',
    glyph: 'I',
    accentHue: '198 167 92',
  },
  {
    slug: 'genealogist',
    name: 'The Genealogist',
    tagline: 'Trace a belief to its buried origins.',
    blurb:
      'Intellectual archaeology. Where did this conviction come from? What was its function? What does it protect against? What tensions does it carry?',
    glyph: 'II',
    accentHue: '110 124 115',
  },
  {
    slug: 'interlocutor',
    name: 'The Interlocutor',
    tagline: 'Submit an argument. Receive its full examination.',
    blurb:
      'Socratic examination in six parts. Assumptions exposed, objections mounted, weak spots named, better formulations offered. Not to destroy — to strengthen.',
    glyph: 'III',
    accentHue: '108 128 155',
  },
  {
    slug: 'stoics-ledger',
    name: "The Stoic's Ledger",
    tagline: 'Reckon daily with conduct and avoidance.',
    blurb:
      'A daily accountability practice in the tradition of Marcus Aurelius. Duties met, duties neglected, avoidances named, excuses detected. One maxim. One act of repair.',
    glyph: 'IV',
    accentHue: '130 122 108',
  },
  {
    slug: 'fool',
    name: 'The Fool',
    tagline: 'Hear the strongest case that you are wrong.',
    blurb:
      'The one voice permitted to say what no one else will. Blind spots, risks, reputational dangers, second-order effects, rival interpretations — mounted without mercy, but without dishonesty.',
    glyph: 'V',
    accentHue: '152 88 88',
  },
  {
    slug: 'interpreter',
    name: 'The Interpreter',
    tagline: 'Hold a symbol beneath multiple lights.',
    blurb:
      'Five interpretive lenses — Jungian, Narrative, Somatic, Cultural/Historical, Existential — applied simultaneously to a dream, symbol, or recurring pattern. Each lens also names what it cannot see.',
    glyph: 'VI',
    accentHue: '107 90 110',
  },
] as const;

// ── Hexagon geometry ───────────────────────────────────────────────────────────
// Container: 900 × 720. Center: (450, 360). Radius: 260.
// cos(30°) ≈ 0.866 → x-offset 225.  sin(30°) = 0.5 → y-offset 130.
// Pointy-top orientation, clockwise from top vertex.
const HEX_POSITIONS = [
  { top: 100, left: 450 },   // I   — top vertex
  { top: 230, left: 675 },   // II  — top-right
  { top: 490, left: 675 },   // III — bottom-right
  { top: 620, left: 450 },   // IV  — bottom vertex
  { top: 490, left: 225 },   // V   — bottom-left
  { top: 230, left: 225 },   // VI  — top-left
] as const;

// Inner hex vertices (r=85, center 450,360):
// Top(450,275) TR(524,318) BR(524,402) Bot(450,445) BL(376,402) TL(376,318)

// ── Small Council preview ──────────────────────────────────────────────────────
const COUNCIL_ADVISORS = [
  {
    name: 'The Instinct',
    accent: '175 115 68',
    stance:
      'Something in you already knows the answer. The fact that you are asking this suggests the timing — not the direction — may be the real problem.',
  },
  {
    name: 'The Critic',
    accent: '108 128 155',
    stance:
      'Your runway assumptions are optimistic. Have you modeled three consecutive months of zero revenue? Because that is the test, not the good-case scenario.',
  },
  {
    name: 'The Realist',
    accent: '110 124 115',
    stance:
      'The first client takes longer than anyone expects. Savings trajectory matters more than conviction, and conviction will not cover your rent in month four.',
  },
  {
    name: 'The Shadow',
    accent: '107 90 110',
    stance:
      'You may not be running toward independence. You may be running away from accountability — a distinction that will become clear about six months in.',
  },
  {
    name: 'The Sage',
    accent: '198 167 92',
    stance:
      'Every generation believes its moment is uniquely suited to independence. Some are right. The question is what, specifically, differentiates those who succeed.',
  },
] as const;

const COUNCIL_QUESTION = '"Should I leave my job and go independent?"';
const COUNCIL_SYNTHESIS =
  `The council is divided on timing, not direction. The Instinct and Sage allow for the possibility; The Critic and Realist demand that the material case be made first. The Shadow\u2019s reading \u2014 that avoidance may be driving the urgency \u2014 is the question none of the others can answer for you.`;

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function Home() {
  const user = await getSession();

  return (
    <>
      <Nav user={user} />

      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* ── Hero ── */}
        <header
          style={{
            padding: 'clamp(3rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 3rem)',
            borderBottom: '1px solid rgb(var(--color-border) / 0.08)',
            marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.7rem, 0.65rem + 0.2vw, 0.75rem)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgb(var(--color-bronze))',
              marginBottom: '1.25rem',
              fontWeight: 500,
            }}
          >
            A cabinet of instruments for thought
          </p>

          <h1
            className="text-display"
            style={{
              maxWidth: '18ch',
              color: 'rgb(var(--color-text))',
              marginBottom: '1.25rem',
              fontStyle: 'italic',
            }}
          >
            Enter the
            <br />
            threshold.
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.9375rem, 0.875rem + 0.3vw, 1.0625rem)',
              color: 'rgb(var(--color-text-muted))',
              maxWidth: '52ch',
              lineHeight: 1.7,
            }}
          >
            Six serious thinking tools. Not chatbots. Not therapy. Each
            performs a distinct mode of inquiry — for the kind of thinking
            that cannot be rushed, avoided, or delegated.
          </p>

          {!user && (
            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                gap: '0.875rem',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/signup"
                className="btn-primary"
                style={{ textDecoration: 'none', padding: '0.65rem 1.625rem' }}
              >
                Begin
              </Link>
              <Link
                href="/login"
                className="btn-ghost"
                style={{ textDecoration: 'none' }}
              >
                Sign in
              </Link>
            </div>
          )}
        </header>

        {/* ── Hexagon tool grid ── */}
        <section
          aria-label="The six instruments"
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <p
            style={{
              fontSize: 'clamp(0.65rem, 0.6rem + 0.18vw, 0.7rem)',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: 'rgb(var(--color-text-faint))',
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            The six instruments
          </p>

          {/* Hex container — 900×720 on desktop, grid on mobile */}
          <div className="hex-scene">

            {/* SVG: outer hex + inner hex + spokes */}
            <svg
              className="hex-svg"
              viewBox="0 0 900 720"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Outer hexagon — connects the 6 card vertices */}
              <polygon
                points="450,100 675,230 675,490 450,620 225,490 225,230"
                stroke="rgb(198 167 92 / 0.14)"
                strokeWidth="1"
              />

              {/* Dashed spokes — inner hex vertex to outer hex vertex */}
              <line x1="450" y1="275" x2="450" y2="100"
                stroke="rgb(198 167 92 / 0.07)" strokeWidth="1" strokeDasharray="3 7" />
              <line x1="524" y1="318" x2="675" y2="230"
                stroke="rgb(198 167 92 / 0.07)" strokeWidth="1" strokeDasharray="3 7" />
              <line x1="524" y1="402" x2="675" y2="490"
                stroke="rgb(198 167 92 / 0.07)" strokeWidth="1" strokeDasharray="3 7" />
              <line x1="450" y1="445" x2="450" y2="620"
                stroke="rgb(198 167 92 / 0.07)" strokeWidth="1" strokeDasharray="3 7" />
              <line x1="376" y1="402" x2="225" y2="490"
                stroke="rgb(198 167 92 / 0.07)" strokeWidth="1" strokeDasharray="3 7" />
              <line x1="376" y1="318" x2="225" y2="230"
                stroke="rgb(198 167 92 / 0.07)" strokeWidth="1" strokeDasharray="3 7" />

              {/* Inner hexagon — decorative center portal */}
              <polygon
                points="450,275 524,318 524,402 450,445 376,402 376,318"
                stroke="rgb(198 167 92 / 0.22)"
                strokeWidth="1"
                fill="rgb(15 23 32)"
              />

              {/* Inner hex subtle second ring */}
              <polygon
                points="450,295 508,328 508,392 450,425 392,392 392,328"
                stroke="rgb(198 167 92 / 0.08)"
                strokeWidth="1"
                fill="none"
              />
            </svg>

            {/* Center portal text */}
            <div className="hex-center">
              <p
                style={{
                  fontFamily: 'var(--font-display), Georgia, serif',
                  fontSize: '1.125rem',
                  fontStyle: 'italic',
                  color: 'rgb(var(--color-gold))',
                  letterSpacing: '0.18em',
                  lineHeight: 1,
                }}
              >
                liminal
              </p>
              <p
                style={{
                  fontSize: '0.56rem',
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  color: 'rgb(var(--color-text-faint))',
                  marginTop: '0.5rem',
                  lineHeight: 1,
                }}
              >
                choose your lens
              </p>
            </div>

            {/* Six tool cards at hex vertices */}
            {TOOLS.map((tool, i) => {
              const pos = HEX_POSITIONS[i];
              const href = user
                ? `/tool/${tool.slug}`
                : `/login?from=/tool/${tool.slug}`;

              return (
                <Link
                  key={tool.slug}
                  href={href}
                  className="hex-card"
                  style={{ top: `${pos.top}px`, left: `${pos.left}px` }}
                >
                  {/* Glyph */}
                  <span
                    style={{
                      fontFamily: 'var(--font-display), Georgia, serif',
                      fontSize: '0.625rem',
                      fontStyle: 'italic',
                      letterSpacing: '0.1em',
                      color: `rgb(${tool.accentHue} / 0.45)`,
                      lineHeight: 1,
                    }}
                  >
                    {tool.glyph}
                  </span>

                  {/* Accent bar */}
                  <div
                    style={{
                      width: '18px',
                      height: '1.5px',
                      background: `rgb(${tool.accentHue})`,
                      borderRadius: '1px',
                      opacity: 0.55,
                      margin: '0.125rem 0',
                    }}
                    aria-hidden="true"
                  />

                  {/* Name */}
                  <span
                    style={{
                      fontFamily: 'var(--font-display), Georgia, serif',
                      fontSize: 'clamp(0.875rem, 0.82rem + 0.25vw, 0.9375rem)',
                      fontWeight: 500,
                      color: 'rgb(var(--color-text))',
                      lineHeight: 1.2,
                    }}
                  >
                    {tool.name}
                  </span>

                  {/* Tagline */}
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      color: `rgb(${tool.accentHue} / 0.72)`,
                      fontStyle: 'italic',
                      lineHeight: 1.4,
                    }}
                  >
                    {tool.tagline}
                  </span>

                  {/* Enter cue */}
                  <span
                    style={{
                      fontSize: '0.625rem',
                      letterSpacing: '0.06em',
                      color: `rgb(${tool.accentHue} / 0.4)`,
                      marginTop: '0.25rem',
                    }}
                  >
                    Enter →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Small Council preview ── */}
        <section
          aria-label="Small Council example session"
          style={{
            borderTop: '1px solid rgb(var(--color-border) / 0.08)',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          {/* Section label */}
          <p
            style={{
              fontSize: 'clamp(0.65rem, 0.6rem + 0.15vw, 0.7rem)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgb(var(--color-text-faint))',
              marginBottom: '2rem',
              fontWeight: 500,
            }}
          >
            From a session — Small Council
          </p>

          <div style={{ maxWidth: '700px' }}>
            {/* Question */}
            <h2
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontSize: 'clamp(1.125rem, 1rem + 0.6vw, 1.5rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'rgb(var(--color-text))',
                marginBottom: '2rem',
                lineHeight: 1.2,
              }}
            >
              {COUNCIL_QUESTION}
            </h2>

            {/* Advisor cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {COUNCIL_ADVISORS.map((advisor) => (
                <div
                  key={advisor.name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '9.5rem 1fr',
                    gap: '1.25rem',
                    padding: '0.9375rem 1.25rem',
                    background: 'rgb(var(--color-surface))',
                    borderRadius: '6px',
                    border: '1px solid rgb(var(--color-border) / 0.07)',
                    alignItems: 'start',
                  }}
                >
                  {/* Advisor name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4375rem', paddingTop: '0.1rem' }}>
                    <div
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: `rgb(${advisor.accent})`,
                        flexShrink: 0,
                        opacity: 0.8,
                      }}
                      aria-hidden="true"
                    />
                    <span
                      style={{
                        fontSize: 'clamp(0.6rem, 0.56rem + 0.15vw, 0.65rem)',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: `rgb(${advisor.accent})`,
                        lineHeight: 1.3,
                      }}
                    >
                      {advisor.name}
                    </span>
                  </div>

                  {/* Stance */}
                  <p
                    style={{
                      fontSize: 'clamp(0.8125rem, 0.76rem + 0.25vw, 0.875rem)',
                      color: 'rgb(var(--color-text-muted))',
                      lineHeight: 1.65,
                      fontStyle: 'italic',
                    }}
                  >
                    {advisor.stance}
                  </p>
                </div>
              ))}
            </div>

            {/* Synthesis strip */}
            <div
              style={{
                marginTop: '0.5rem',
                padding: '0.9375rem 1.25rem',
                background: 'rgb(var(--color-surface-2))',
                borderRadius: '6px',
                border: '1px solid rgb(var(--color-gold) / 0.1)',
                display: 'grid',
                gridTemplateColumns: '9.5rem 1fr',
                gap: '1.25rem',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(0.6rem, 0.56rem + 0.15vw, 0.65rem)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgb(var(--color-gold))',
                  paddingTop: '0.1rem',
                }}
              >
                Synthesis
              </span>
              <p
                style={{
                  fontSize: 'clamp(0.8125rem, 0.76rem + 0.25vw, 0.875rem)',
                  color: 'rgb(var(--color-text-muted))',
                  lineHeight: 1.65,
                }}
              >
                {COUNCIL_SYNTHESIS}
              </p>
            </div>

            {/* CTA */}
            {!user && (
              <div
                style={{
                  marginTop: '2.5rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Link
                  href="/signup"
                  className="btn-primary"
                  style={{ textDecoration: 'none', padding: '0.65rem 1.625rem' }}
                >
                  Begin
                </Link>
                <span
                  style={{
                    fontSize: 'clamp(0.8125rem, 0.76rem + 0.2vw, 0.9rem)',
                    color: 'rgb(var(--color-text-faint))',
                    fontStyle: 'italic',
                  }}
                >
                  Free to start.
                </span>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
