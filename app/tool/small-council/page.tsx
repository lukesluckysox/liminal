import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { ToolPageClient } from '@/components/tool-page-client';
import { getSession } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'Small Council — Liminal',
  description:
    'Five advisors debate your dilemma across two rounds and reach a synthesis.',
};

export default async function SmallCouncilPage() {
  const user = await getSession();

  return (
    <>
      <Nav user={user} />
      <main>
        <ToolPageClient
          config={{
            slug: 'small-council',
            name: 'Small Council',
            tagline: 'Deliberate among divided voices.',
            inputLabel: 'The question before the council',
            inputPlaceholder:
              'Describe the dilemma, decision, or situation you want the council to deliberate on. Be specific — the more context you give, the more useful the counsel.',
            inputFieldName: 'question',
            minLength: 10,
            submitLabel: 'Convene the council',
            processingLabel: 'The council is deliberating… (this takes a moment)',
            accentHue: '184 150 58',
            preamble: (
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  background: 'rgb(var(--color-surface-2))',
                  borderRadius: '6px',
                  border: '1px solid rgb(var(--color-border) / 0.1)',
                  fontSize: 'clamp(0.8rem, 0.75rem + 0.2vw, 0.875rem)',
                  color: 'rgb(var(--color-text-muted))',
                  lineHeight: 1.65,
                }}
              >
                <strong
                  style={{
                    color: 'rgb(184 150 58)',
                    display: 'block',
                    marginBottom: '0.375rem',
                    fontSize: 'clamp(0.7rem, 0.65rem + 0.2vw, 0.75rem)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  How it works
                </strong>
                Five advisors — the Grand Maester, Master of Coin, Lord Commander,
                Master of Whispers, and The Hand — each respond in Round 1, then
                engage each other in Round 2. A synthesis follows. Expect 15–30
                seconds.
              </div>
            ),
          }}
        />
      </main>
    </>
  );
}
