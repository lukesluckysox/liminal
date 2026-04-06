import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/nav';
import { DeleteSessionButton } from '@/components/delete-session-button';
import { HexProgress } from '@/components/hex-progress';
import { getSession } from '@/lib/auth/session';
import { query } from '@/lib/db';
import { TOOL_LABELS, TOOL_ACCENTS } from '@/lib/tools/constants';
import { computeStreak, getRecentDays } from '@/lib/user-progress';

export const metadata: Metadata = {
  title: 'Archive — Liminal',
  description: 'Your past sessions across all six instruments.',
};

interface ToolSession {
  id: string;
  tool_slug: string;
  title: string;
  summary: string | null;
  created_at: Date;
}

export default async function ArchivePage() {
  const user = await getSession();

  const [sessions, usedRows, activityRows] = await Promise.all([
    query<ToolSession>(
      `SELECT id, tool_slug, title, summary, created_at
       FROM tool_sessions
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 100`,
      [user!.id]
    ),
    query<{ tool_slug: string }>(
      `SELECT DISTINCT tool_slug FROM tool_sessions WHERE user_id = $1`,
      [user!.id]
    ),
    query<{ day: string }>(
      `SELECT DISTINCT DATE(created_at) AS day
       FROM tool_sessions
       WHERE user_id = $1
       ORDER BY day DESC
       LIMIT 90`,
      [user!.id]
    ),
  ]);

  const usedSlugs  = usedRows.map((r) => r.tool_slug);
  const dates      = activityRows.map((r) => new Date(r.day));
  const streak     = computeStreak(dates);
  const recentDays = getRecentDays(dates);

  return (
    <>
      <Nav user={user} />
      <main
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: 'clamp(2.5rem, 5vw, 5rem) 1.5rem',
        }}
      >
        {/* Header */}
        <header style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              fontSize: 'clamp(1.75rem, 1.2rem + 1.5vw, 2.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgb(var(--color-text))',
              marginBottom: '0.5rem',
            }}
          >
            Archive
          </h1>
          <p
            style={{
              fontSize: 'clamp(0.875rem, 0.8rem + 0.25vw, 1rem)',
              color: 'rgb(var(--color-text-muted))',
              marginBottom: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            }}
          >
            {sessions.length === 0
              ? 'No sessions yet.'
              : `${sessions.length} session${sessions.length !== 1 ? 's' : ''} recorded.`}
          </p>

          {/* Hex progress — always visible on archive */}
          <div
            style={{
              paddingBottom: 'clamp(1.5rem, 3vw, 2rem)',
              borderBottom: '1px solid rgb(var(--color-border) / 0.08)',
            }}
          >
            <HexProgress
              usedSlugs={usedSlugs}
              streak={streak}
              recentDays={recentDays}
            />
          </div>
        </header>

        {sessions.length === 0 ? (
          /* Empty state */
          <div
            style={{
              textAlign: 'center',
              padding: 'clamp(3rem, 6vw, 5rem) 2rem',
              color: 'rgb(var(--color-text-muted))',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                margin: '0 auto 1.25rem',
                borderRadius: '50%',
                background: 'rgb(var(--color-surface-2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <p
              style={{
                fontSize: 'clamp(0.875rem, 0.8rem + 0.25vw, 1rem)',
                maxWidth: '36ch',
                margin: '0 auto 1.5rem',
              }}
            >
              Nothing recorded yet. Begin with one of the instruments.
            </p>
            <Link
              href="/"
              className="btn-primary"
              style={{ textDecoration: 'none', display: 'inline-flex' }}
            >
              Enter the cabinet
            </Link>
          </div>
        ) : (
          /* Session list */
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            {sessions.map((session) => {
              const ac = TOOL_ACCENTS[session.tool_slug] ?? '184 150 58';
              const label = TOOL_LABELS[session.tool_slug] ?? session.tool_slug;
              const date = new Date(session.created_at).toLocaleDateString(
                'en-US',
                { month: 'short', day: 'numeric', year: 'numeric' }
              );

              return (
                <div
                  key={session.id}
                  style={{ position: 'relative' }}
                >
                  <Link
                    href={`/session/${session.id}`}
                    className="liminal-card"
                    style={{
                      display: 'block',
                      padding: '1.125rem 1.375rem 1.125rem 1.375rem',
                      textDecoration: 'none',
                    }}
                  >
                    {/* Meta row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'clamp(0.65rem, 0.6rem + 0.15vw, 0.7rem)',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: `rgb(${ac})`,
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          width: '3px',
                          height: '3px',
                          borderRadius: '50%',
                          background: `rgb(${ac} / 0.3)`,
                          display: 'inline-block',
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      />
                      <span
                        style={{
                          fontSize: 'clamp(0.65rem, 0.6rem + 0.15vw, 0.7rem)',
                          color: 'rgb(var(--color-text-faint))',
                          letterSpacing: '0.03em',
                        }}
                      >
                        {date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontSize: 'clamp(0.875rem, 0.8rem + 0.3vw, 1rem)',
                        fontWeight: 500,
                        color: 'rgb(var(--color-text))',
                        lineHeight: 1.4,
                        marginBottom: session.summary ? '0.375rem' : 0,
                        paddingRight: '4rem', // space for delete button
                      }}
                    >
                      {session.title}
                    </h2>

                    {/* Summary */}
                    {session.summary && (
                      <p
                        style={{
                          fontSize: 'clamp(0.8rem, 0.75rem + 0.2vw, 0.875rem)',
                          color: 'rgb(var(--color-text-muted))',
                          lineHeight: 1.5,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {session.summary}
                      </p>
                    )}
                  </Link>

                  {/* Delete button — positioned outside the Link to avoid nesting */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1.125rem',
                      right: '1.375rem',
                    }}
                  >
                    <DeleteSessionButton
                      sessionId={session.id}
                      redirectTo="/archive"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        {sessions.length > 0 && (
          <footer
            style={{
              marginTop: '2.5rem',
              textAlign: 'center',
            }}
          >
            <Link
              href="/"
              className="btn-ghost"
              style={{ textDecoration: 'none' }}
            >
              Back to the cabinet
            </Link>
          </footer>
        )}
      </main>
    </>
  );
}
