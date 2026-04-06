import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { ToolPageClient } from '@/components/tool-page-client';
import { getSession } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'The Fool — Liminal',
  description:
    'Hear the strongest possible case that you are wrong.',
};

export default async function FoolPage() {
  const user = await getSession();

  return (
    <>
      <Nav user={user} />
      <main>
        <ToolPageClient
          config={{
            slug: 'fool',
            name: 'The Fool',
            tagline: 'Hear the strongest case that you are wrong.',
            inputLabel: 'The position to challenge',
            inputPlaceholder:
              'Describe a belief, plan, decision, or conviction you currently hold. The Fool will construct the most rigorous possible case against it — not to destroy, but because you need to hear what comfort will not tell you.',
            inputFieldName: 'position',
            minLength: 10,
            submitLabel: 'Hear the Fool',
            processingLabel: 'The Fool is preparing the challenge…',
            accentHue: '180 100 100',
          }}
        />
      </main>
    </>
  );
}
