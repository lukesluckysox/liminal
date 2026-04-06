import Link from 'next/link';
import { Nav } from '@/components/nav';
import { getSession } from '@/lib/auth/session';

const TOOLS = [
  {
    slug: 'small-council',
    name: 'Small Council',
    tagline: 'Deliberate among divided voices.',
    blurb:
      'Five advisors — strategist, empiricist, skeptic, advocate, historian — debate your dilemma across two rounds and reach a synthesis. Theatrical, but serious.',
    glyph: 'I',
    accentHue: '184 150 58', // gold
  },
  {
    slug: 'genealogist',
    name: 'The Genealogist',
    tagline: 'Trace a belief to its buried origins.',
    blurb:
      'Intellectual archaeology. Where did this conviction come from? What was its function? What does it protect against? What tensions does it carry?',
    glyph: 'II',
    accentHue: '150 160 120', // sage
  },
  {
    slug: 'interlocutor',
    name: 'The Interlocutor',
    tagline: 'Test an idea against rigorous questioning.',
    blurb:
      'Socratic sparring for arguments and theses. Assumptions exposed, objections mounted, formulations improved. Not to destroy — to strengthen.',
    glyph: 'III',
    accentHue: '120 148 180', // steel blue
  },
  {
    slug: 'stoics-ledger',
    name: "The Stoic's Ledger",
    tagline: 'Reckon daily with conduct and avoidance.',
    blurb:
      'A daily accountability practice in the tradition of Marcus Aurelius. Duties met, duties neglected, avoidances named, excuses detected. One maxim. One act of repair.',
    glyph: 'IV',
    accentHue: '172 142 100', // amber
  },
  {
    slug: 'fool',
    name: 'The Fool',
    tagline: 'Hear the strongest case that you are wrong.',
    blurb:
      'The one voice permitted to say what no one else will. Blind spots, risks, reputational dangers, second-order effects — mounted without mercy, but without dishonesty.',
    glyph: 'V',
    accentHue: '180 100 100', // muted crimson
  },
  {
    slug: 'interpreter',
    name: 'The Interpreter',
    tagline: 'Hold a symbol beneath multiple lights.',
    blurb:
      'Five interpretive lenses — Jungian, Narrative, Somatic, Cultural, Existential — applied simultaneously to a dream, symbol, or recurring pattern. Illumination through divergence.',
    glyph: 'VI',
    accentHue: '140 120 180', // violet
  },
] as const;

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
              paddingBottom: 'clamp(4rem, 8vw, 8rem)',
            }}
          >
            {TOOLS.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} authenticated={!!user} />
            ))}
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
      {/* Glyph accent */}
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

      {/* Name */}
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

      {/* Tagline */}
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

      {/* Blurb */}
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

      {/* Enter arrow */}
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
