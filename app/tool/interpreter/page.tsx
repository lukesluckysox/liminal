import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { ToolPageClient } from '@/components/tool-page-client';
import { getSession } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'The Interpreter — Liminal',
  description:
    'Multi-lens interpretation of a dream, symbol, or recurring pattern.',
};

export default async function InterpreterPage() {
  const user = await getSession();

  return (
    <>
      <Nav user={user} />
      <main>
        <ToolPageClient
          config={{
            slug: 'interpreter',
            name: 'The Interpreter',
            tagline: 'Hold a symbol beneath multiple lights.',
            inputLabel: 'The dream, symbol, or recurring pattern',
            inputPlaceholder:
              'Describe a dream, a symbol that has stayed with you, or a pattern you keep encountering. Describe it as fully as you can — context, texture, feelings, what stood out. The Interpreter will apply five analytical lenses simultaneously.',
            inputFieldName: 'symbol',
            minLength: 10,
            submitLabel: 'Begin the interpretation',
            processingLabel: 'The Interpreter is reading the symbol…',
            accentHue: '140 120 180',
          }}
        />
      </main>
    </>
  );
}
