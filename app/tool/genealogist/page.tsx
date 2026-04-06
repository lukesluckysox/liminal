import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { ToolPageClient } from '@/components/tool-page-client';
import { getSession } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'The Genealogist — Liminal',
  description:
    'Trace a belief, conviction, or habit-of-thought to its buried origins.',
};

export default async function GenealogyPage() {
  const user = await getSession();

  return (
    <>
      <Nav user={user} />
      <main>
        <ToolPageClient
          config={{
            slug: 'genealogist',
            name: 'The Genealogist',
            tagline: 'Trace a belief to its buried origins.',
            inputLabel: 'The belief to examine',
            inputPlaceholder:
              'State a belief, conviction, or habit-of-thought you hold. It might be about yourself, others, work, relationships, institutions, or the world. The more specific, the more useful the excavation.',
            inputFieldName: 'belief',
            minLength: 10,
            submitLabel: 'Begin the excavation',
            processingLabel: 'The Genealogist is excavating…',
            accentHue: '150 160 120',
          }}
        />
      </main>
    </>
  );
}
