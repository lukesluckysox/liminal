import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { ToolPageClient } from '@/components/tool-page-client';
import { getSession } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'The Interlocutor — Liminal',
  description: 'Test an idea or argument against rigorous Socratic questioning.',
};

export default async function InterlocutorPage() {
  const user = await getSession();

  return (
    <>
      <Nav user={user} />
      <main>
        <ToolPageClient
          config={{
            slug: 'interlocutor',
            name: 'The Interlocutor',
            tagline: 'Test an idea against rigorous questioning.',
            inputLabel: 'The thesis or argument to examine',
            inputPlaceholder:
              'State an argument, position, or thesis you hold or are working through. It could be an intellectual claim, a business thesis, a moral position, or an argument you\'re trying to refine. Be as specific as possible.',
            inputFieldName: 'thesis',
            minLength: 10,
            submitLabel: 'Begin the examination',
            processingLabel: 'The Interlocutor is examining your argument…',
            accentHue: '120 148 180',
          }}
        />
      </main>
    </>
  );
}
