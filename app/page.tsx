import Link from 'next/link';
import { Nav } from '@/components/nav';
import { getSession } from '@/lib/auth/session';

const TOOLS = [
  {
    slug: 'small-council',
    name: 'Small Council',
    tagline: 'Deliberate among divided voices.',
    blurb:
      'Five voices — The Instinct, The Critic, The Realist, The Shadow, The Sage — debate your dilemma across two rounds and reach a synthesis. Watch the council deliberate in real time.',
    glyph: 'I',
    accentHue: '184 150 58',
  },
  {
    slug: 'genealogist',
    name: 'The Genealogist',
    tagline: 'Trace a belief to its buried origins.',
    blurb:
      'Intellectual archaeology. Where did this conviction come from? What was its function? What does it protect against? What tensions does it carry?',
    glyph: 'II',
    accentHue: '150 160 120',
  },
  {
    slug: 'interlocutor',
    name: 'The Interlocutor',
    tagline: 'Submit an argument. Receive its full examination.',
    blurb:
      'Socratic examination in six parts. Assumptions exposed, objections mounted, weak spots named, better formulations offered. Not to destroy — to strengthen.',
    glyph: 'III',
    accentHue: '120 148 180',
  },
  {
    slug: 'stoics-ledger',
    name: "The Stoic's Ledger",
    tagline: 'Reckon daily with conduct and avoidance.',
    blurb:
      'A daily accountability practice in the tradition of Marcus Aurelius. Duties met, duties neglected, avoidances named, excuses detected. One maxim. One act of repair.',
    glyph: 'IV',
    accentHue: '148 140 124',
  },
  {
    slug: 'fool',
    name: 'The Fool',
    tagline: 'Hear the strongest case that you are wrong.',
    blurb:
      'The one voice permitted to say what no one else will. Blind spots, risks, reputational dangers, second-order effects, rival interpretations — mounted without mercy, but without dishonesty.',
    glyph: 'V',
    accentHue: '180 100 100',
  },
  {
    slug: 'interpreter',
    name: 'The Interpreter',
    tagline: 'Hold a symbol beneath multiple lights.',
    blurb:
      'Five interpretive lenses — Jungian, Narrative, Somatic, Cultural/Historical, Existential — applied simultaneously to a dream, symbol, or recurring pattern. Each lens also names what it cannot see.',
    glyph: 'VI',
    accentHue: '128 108 172',
  },
] as const;

// ── Small Council example session ─────────────────────────────────────────────
// Individual accent colors per advisor — each maps to a distinct epistemic
// stance and intentionally echoes the palette of the other five tools.
const COUNCIL_ADVISORS = [
  {
    name: 'The Instinct',
    accent: '200 140 80',   // warm terra cotta — embodied knowing
    stance:
      'Something in you already knows the answer. The fact that you are asking this suggests the timing — not the direction — may be the real problem.',
  },
  {
    name: 'The Critic',
    accent: '120 148 180',  // steel blue — analytical precision
    stance:
      'Your runway assumptions are optimistic. Have you modeled three consecutive months of zero revenue? Because that is the test, not the good-case scenario.',
  },
  {
    name: 'The Realist',
    accent: '150 160 120',  // sage — grounded constraint
    stance:
      'The first client takes longer than anyone expects. Savings trajectory matters more than conviction, and conviction will not cover your rent in month four.',
  },
  {
    name: 'The Shadow',
    accent: '128 108 172',  // violet — hidden motive
    stance:
      'You may not be running toward independence. You may be running away from accountability — a distinction that will become clear about six months in.',
  },
  {
    name: 'The Sage',
    accent: '184 150 58',   // gold — accumulated wisdom
    stance:
      'Every generation believes its moment is uniquely suited to independence. Some are right. The question is what, specifically, differentiates those who succeed.',
  },
] as const;

const COUNCIL_QUESTION = '"Should I leave my job and go independent?"';
const COUNCIL_SYNTHESIS =
  `The council is divided on timing, not direction. The Instinct and Sage allow for the possibility; The Critic and Realist demand that the material case be made first. The Shadow\u2019s reading \u2014 that avoidance may be driving the urgency \u2014 is the question none of the others can answer for you.`;

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
        {/* Hero */}
        <header
          style={{
            padding: 'clamp(4rem, 8vw, 8rem) 0 clamp(3rem, 6vw, 6rem)',
            borderBottom: '1px solid rgb(var(--color-border) / 0.1)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgb(var(--color-gold))',
              marginBottom: '1.5rem',
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
              marginBottom: '1.5rem',
              fontStyle: 'italic',
            }}
          >
            Enter the
            <br />
            threshold.
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
              color: 'rgb(var(--color-text-muted))',
              maxWidth: '52ch',
              lineHeight: 1.7,
            }}
          >
            Six serious thinking tools. Not chatbots. Not therapy. Each performs
            a distinct mode of inquiry — for the kind of thinking that cannot be
            rushed, avoided, or delegated.
          </p>

          {!user && (
            <div
              style={{
                marginTop: '2.5rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/signup"
                className="btn-primary"
                style={{
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  padding: '0.7rem 1.75rem',
                }}
              >
                Begin
              </Link>
              <Link
                href="/login"
                className="btn-ghost"
                style={{
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                }}
              >
                Sign in
              </Link>
            </div>
          )}
        </header>

        {/* Tool Grid */}
        <section aria-label="The six tools">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: '1.25rem',
              paddingBottom: 'clamp(4rem, 8vw, 7rem)',
            }}
          >
            {TOOLS.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} authenticated={!!user} />
            ))}
          </div>
        </section>

        {/* ── Small Council Preview ──────────────────────────────────────────── */}
        <section
          aria-label="Small Council example session"
          style={{
            borderTop: '1px solid rgb(var(--color-border) / 0.1)',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          {/* Section label */}
          <p
            style={{
              fontSize: 'clamp(0.7rem, 0.65rem + 0.2vw, 0.75rem)',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {COUNCIL_ADVISORS.map((advisor) => (
                <div
                  key={advisor.name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '10rem 1fr',
                    gap: '1.25rem',
                    padding: '1rem 1.25rem',
                    background: 'rgb(var(--color-surface))',
                    borderRadius: '6px',
                    border: '1px solid rgb(var(--color-border) / 0.08)',
                    alignItems: 'start',
                  }}
                >
                  {/* Advisor name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.1rem' }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: `rgb(${advisor.accent})`,
                        flexShrink: 0,
                        opacity: 0.85,
                      }}
                      aria-hidden="true"
                    />
                    <span
                      style={{
                        fontSize: 'clamp(0.65rem, 0.6rem + 0.15vw, 0.7rem)',
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
                      fontSize: 'clamp(0.875rem, 0.8rem + 0.3vw, 0.9375rem)',
                      color: 'rgb(var(--color-text-muted))',
                      lineHeight: 1.6,
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
                marginTop: '0.625rem',
                padding: '1rem 1.25rem',
                background: 'rgb(var(--color-surface-2))',
                borderRadius: '6px',
                border: '1px solid rgb(var(--color-gold) / 0.12)',
                display: 'grid',
                gridTemplateColumns: '10rem 1fr',
                gap: '1.25rem',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(0.65rem, 0.6rem + 0.15vw, 0.7rem)',
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
                  fontSize: 'clamp(0.875rem, 0.8rem + 0.3vw, 0.9375rem)',
                  color: 'rgb(var(--color-text-muted))',
                  lineHeight: 1.6,
                }}
              >
                {COUNCIL_SYNTHESIS}
              </p>
            </div>

            {/* Fade + CTA */}
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
                  style={{
                    textDecoration: 'none',
                    fontSize: '0.9375rem',
                    padding: '0.7rem 1.75rem',
                  }}
                >
                  Begin
                </Link>
                <span
                  style={{
                    fontSize: 'clamp(0.875rem, 0.8rem + 0.25vw, 1rem)',
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

function ToolCard({
  tool,
  authenticated,
}: {
  tool: (typeof TOOLS)[number];
  authenticated: boolean;
}) {
  const href = authenticated
    ? `/tool/${tool.slug}`
    : `/login?from=/tool/${tool.slug}`;

  return (
    <Link
      href={href}
      className="liminal-card"
      style={{
        display: 'block',
        padding: '1.75rem',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Glyph */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.75rem',
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: 'clamp(0.7rem, 0.65rem + 0.2vw, 0.8rem)',
          letterSpacing: '0.1em',
          color: `rgb(${tool.accentHue} / 0.4)`,
          fontStyle: 'italic',
        }}
        aria-hidden="true"
      >
        {tool.glyph}
      </div>

      {/* Accent bar */}
      <div
        style={{
          width: '24px',
          height: '2px',
          background: `rgb(${tool.accentHue})`,
          borderRadius: '1px',
          marginBottom: '1.25rem',
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      <h2
        style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: 'clamp(1.125rem, 1rem + 0.5vw, 1.375rem)',
          fontWeight: 500,
          color: 'rgb(var(--color-text))',
          marginBottom: '0.375rem',
          lineHeight: 1.2,
        }}
      >
        {tool.name}
      </h2>

      <p
        style={{
          fontSize: 'clamp(0.8rem, 0.75rem + 0.2vw, 0.9rem)',
          color: `rgb(${tool.accentHue} / 0.8)`,
          marginBottom: '1rem',
          fontStyle: 'italic',
          letterSpacing: '0.01em',
        }}
      >
        {tool.tagline}
      </p>

      <p
        style={{
          fontSize: 'clamp(0.875rem, 0.8rem + 0.3vw, 0.9375rem)',
          color: 'rgb(var(--color-text-muted))',
          lineHeight: 1.65,
          maxWidth: '100%',
        }}
      >
        {tool.blurb}
      </p>

      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          fontSize: 'clamp(0.75rem, 0.7rem + 0.2vw, 0.8125rem)',
          color: `rgb(${tool.accentHue} / 0.6)`,
          letterSpacing: '0.05em',
        }}
      >
        <span>Enter</span>
        <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
