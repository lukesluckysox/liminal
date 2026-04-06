import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/nav';
import { SessionOutput } from '@/components/session-output';
import { getSession } from '@/lib/auth/session';
import { queryOne } from '@/lib/db';

interface ToolSession {
  id: string;
  tool_slug: string;
  title: string;
  input_text: string;
  structured_output: unknown;
  created_at: Date;
}

const TOOL_LABELS: Record<string, string> = {
  'small-council':  'Small Council',
  genealogist:      'The Genealogist',
  interlocutor:     'The Interlocutor',
  'stoics-ledger':  "The Stoic's Ledger",
  fool:             'The Fool',
  interpreter:      'The Interpreter',
};

const TOOL_ACCENT: Record<string, string> = {
  'small-council':  '184 150 58',
  genealogist:      '150 160 120',
  interlocutor:     '120 148 180',
  'stoics-ledger':  '172 142 100',
  fool:             '180 100 100',
  interpreter:      '140 120 180',
};

interface PageProps {
  params: { sessionId: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Session — Liminal`,
  };
}

export default async function SessionPage({ params }: PageProps) {
  const user = await getSession();
  if (!user) notFound();

  const session = await queryOne<ToolSession>(
    `SELECT id, tool_slug, title, input_text, structured_output, created_at
     FROM tool_sessions
     WHERE id = $1 AND user_id = $2`,
    [params.sessionId, user.id]
  );

  if (!session) notFound();

  const ac = TOOL_ACCENT[session.tool_slug] ?? '184 150 58';
  const toolLabel = TOOL_LABELS[session.tool_slug] ?? session.tool_slug;
  const toolHref = `/tool/${session.tool_slug}`;

  const date = new Date(session.created_at).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Nav user={user} />
      <main
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: 'clamp(2.5rem, 5vw, 5rem) 1.5rem',
        }}
      >
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '2rem' }} aria-label="Breadcrumb">
          <Link
            href="/archive"
            style={{
              fontSize: 'clamp(0.75rem, 0.7rem + 0.2vw, 0.8125rem)',
              color: 'rgb(var(--color-text-faint))',
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            ← Archive
          </Link>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <Link
              href={toolHref}
              style={{
                fontSize: 'clamp(0.7rem, 0.65rem + 0.15vw, 0.75rem)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: `rgb(${ac})`,
                textDecoration: 'none',
              }}
            >
              {toolLabel}
            </Link>
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: `rgb(${ac} / 0.4)`,
                display: 'inline-block',
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontSize: 'clamp(0.7rem, 0.65rem + 0.15vw, 0.75rem)',
                color: 'rgb(var(--color-text-faint))',
                letterSpacing: '0.03em',
              }}
            >
              {date}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              fontSize: 'clamp(1.375rem, 1rem + 1vw, 1.875rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgb(var(--color-text))',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            {session.title}
          </h1>

          {/* Input collapsible */}
          <details
            style={{
              padding: '0.875rem 1rem',
              background: 'rgb(var(--color-surface-2))',
              borderRadius: '6px',
              border: '1px solid rgb(var(--color-border) / 0.08)',
            }}
          >
            <summary
              style={{
                cursor: 'pointer',
                fontSize: 'clamp(0.7rem, 0.65rem + 0.15vw, 0.75rem)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgb(var(--color-text-muted))',
                userSelect: 'none',
              }}
            >
              Show original input
            </summary>
            <p
              style={{
                marginTop: '0.75rem',
                fontSize: 'clamp(0.875rem, 0.8rem + 0.25vw, 0.9375rem)',
                color: 'rgb(var(--color-text-muted))',
                lineHeight: 1.65,
                whiteSpace: 'pre-wrap',
              }}
            >
              {session.input_text}
            </p>
          </details>
        </header>

        {/* Output */}
        <div className="animate-result">
          <SessionOutput
            toolSlug={session.tool_slug}
            output={session.structured_output}
          />
        </div>

        {/* Footer actions */}
        <footer
          style={{
            marginTop: 'clamp(3rem, 5vw, 4rem)',
            paddingTop: '2rem',
            borderTop: '1px solid rgb(var(--color-border) / 0.1)',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href={toolHref}
            className="btn-primary"
            style={{ textDecoration: 'none', padding: '0.6rem 1.5rem' }}
          >
            Use {toolLabel} again
          </Link>
          <Link
            href="/"
            className="btn-ghost"
            style={{ textDecoration: 'none' }}
          >
            All instruments
          </Link>
        </footer>
      </main>
    </>
  );
}
