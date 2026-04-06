import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { ToolPageClient } from '@/components/tool-page-client';
import { getSession } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: "The Stoic's Ledger — Liminal",
  description:
    'A daily self-accountability practice in the tradition of Marcus Aurelius.',
};

export default async function StoicsLedgerPage() {
  const user = await getSession();

  return (
    <>
      <Nav user={user} />
      <main>
        <ToolPageClient
          config={{
            slug: 'stoics-ledger',
            name: "The Stoic's Ledger",
            tagline: 'Reckon daily with conduct and avoidance.',
            inputLabel: 'Your report for today',
            inputPlaceholder: `Write an account of your day. You might address:

— What happened, and what you did
— What you handled well
— Where you fell short or failed
— What you avoided or deferred
— What tested you

Write plainly. The Ledger is not a journal — it is a reckoning.`,
            inputFieldName: 'report',
            minLength: 20,
            submitLabel: 'Open the ledger',
            processingLabel: 'The Ledger is reviewing your account…',
            accentHue: '172 142 100',
          }}
        />
      </main>
    </>
  );
}
