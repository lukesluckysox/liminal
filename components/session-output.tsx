/**
 * Renders structured output from any of the 6 Liminal tools.
 * Picks the right sub-renderer based on tool_slug.
 */

import type {
  CouncilOutput,
  CouncilTurn,
} from '@/lib/tools/small-council/orchestrator';
import type { GenealogyOutput } from '@/lib/tools/genealogist/orchestrator';
import type { InterlocutorOutput } from '@/lib/tools/interlocutor/orchestrator';
import type { StoicsLedgerOutput } from '@/lib/tools/stoics-ledger/orchestrator';
import type { FoolOutput } from '@/lib/tools/fool/orchestrator';
import type { InterpreterOutput } from '@/lib/tools/interpreter/orchestrator';

const TOOL_ACCENT: Record<string, string> = {
  'small-council':  '184 150 58',
  genealogist:      '150 160 120',
  interlocutor:     '120 148 180',
  'stoics-ledger':  '172 142 100',
  fool:             '180 100 100',
  interpreter:      '140 120 180',
};

function accent(slug: string) {
  return TOOL_ACCENT[slug] ?? '184 150 58';
}

/* ─── Shared primitives ─────────────────────────────────────── */

function Section({
  label,
  children,
  accent: accentHue,
}: {
  label: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="output-section">
      <div
        className="output-label"
        style={{ color: `rgb(${accentHue})` }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function TextBlock({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: 'clamp(0.875rem, 0.8rem + 0.3vw, 1rem)',
        color: 'rgb(var(--color-text-muted))',
        lineHeight: 1.75,
        whiteSpace: 'pre-wrap',
      }}
    >
      {text}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="output-list" role="list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function CalloutBlock({
  text,
  accentHue,
}: {
  text: string;
  accentHue: string;
}) {
  return (
    <div
      style={{
        padding: '1.25rem 1.5rem',
        borderLeft: `3px solid rgb(${accentHue} / 0.6)`,
        background: `rgb(${accentHue} / 0.04)`,
        borderRadius: '0 6px 6px 0',
      }}
    >
      <p
        style={{
          fontSize: 'clamp(0.9375rem, 0.875rem + 0.3vw, 1.0625rem)',
          color: 'rgb(var(--color-text))',
          fontStyle: 'italic',
          lineHeight: 1.65,
          fontFamily: 'var(--font-display), Georgia, serif',
        }}
      >
        {text}
      </p>
    </div>
  );
}

/* ─── Small Council ────────────────────────────────────────── */

function SmallCouncilOutput({
  output,
}: {
  output: CouncilOutput;
}) {
  const ac = accent('small-council');
  const round1 = output.turns.filter((t) => t.round === 1);
  const round2 = output.turns.filter((t) => t.round === 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Round 1 */}
      <Section label="Round I — Initial Counsel" accent={ac}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {round1.map((turn) => (
            <AdvisorTurn key={turn.advisor + '1'} turn={turn} accentHue={ac} />
          ))}
        </div>
      </Section>

      {/* Round 2 */}
      <Section label="Round II — Response" accent={ac}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {round2.map((turn) => (
            <AdvisorTurn key={turn.advisor + '2'} turn={turn} accentHue={ac} />
          ))}
        </div>
      </Section>

      {/* Synthesis */}
      <Section label="Synthesis" accent={ac}>
        <TextBlock text={output.synthesis} />
      </Section>
    </div>
  );
}

function AdvisorTurn({
  turn,
  accentHue,
}: {
  turn: CouncilTurn;
  accentHue: string;
}) {
  return (
    <div
      style={{
        padding: '1rem 1.25rem',
        background: 'rgb(var(--color-surface-3))',
        borderRadius: '6px',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(0.7rem, 0.65rem + 0.15vw, 0.75rem)',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: `rgb(${accentHue} / 0.8)`,
          marginBottom: '0.625rem',
        }}
      >
        {turn.advisor}
      </div>
      <p
        style={{
          fontSize: 'clamp(0.875rem, 0.8rem + 0.25vw, 0.9375rem)',
          color: 'rgb(var(--color-text-muted))',
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
        }}
      >
        {turn.content}
      </p>
    </div>
  );
}

/* ─── Genealogist ──────────────────────────────────────────── */

function GenealogyOutputView({ output }: { output: GenealogyOutput }) {
  const ac = accent('genealogist');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Section label="The Belief, Restated" accent={ac}>
        <CalloutBlock text={output.belief_statement} accentHue={ac} />
      </Section>

      {output.lineages.length > 0 && (
        <Section label="Lineages" accent={ac}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            {output.lineages.map((l, i) => (
              <div
                key={i}
                style={{
                  padding: '0.875rem 1rem',
                  background: 'rgb(var(--color-surface-3))',
                  borderRadius: '6px',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(0.75rem, 0.7rem + 0.2vw, 0.8125rem)',
                    fontWeight: 600,
                    color: `rgb(${ac})`,
                    marginBottom: '0.375rem',
                  }}
                >
                  {l.source}
                </div>
                <p
                  style={{
                    fontSize: 'clamp(0.875rem, 0.8rem + 0.25vw, 0.9375rem)',
                    color: 'rgb(var(--color-text-muted))',
                    lineHeight: 1.65,
                  }}
                >
                  {l.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section label="Inherited vs. Chosen" accent={ac}>
        <TextBlock text={output.inherited_vs_chosen} />
      </Section>

      <Section label="Hidden Function" accent={ac}>
        <TextBlock text={output.hidden_function} />
      </Section>

      {output.tensions.length > 0 && (
        <Section label="Tensions" accent={ac}>
          <BulletList items={output.tensions} />
        </Section>
      )}

      <Section label="Belief Map" accent={ac}>
        <TextBlock text={output.belief_map} />
      </Section>

      {output.unresolved_questions.length > 0 && (
        <Section label="Unresolved Questions" accent={ac}>
          <BulletList items={output.unresolved_questions} />
        </Section>
      )}
    </div>
  );
}

/* ─── Interlocutor ─────────────────────────────────────────── */

function InterlocutorOutputView({
  output,
}: {
  output: InterlocutorOutput;
}) {
  const ac = accent('interlocutor');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Section label="Clarified Thesis" accent={ac}>
        <CalloutBlock text={output.clarified_thesis} accentHue={ac} />
      </Section>

      {output.exposed_assumptions.length > 0 && (
        <Section label="Exposed Assumptions" accent={ac}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            {output.exposed_assumptions.map((a, i) => (
              <div
                key={i}
                style={{
                  padding: '0.875rem 1rem',
                  background: 'rgb(var(--color-surface-3))',
                  borderRadius: '6px',
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: 'rgb(var(--color-text))',
                    marginBottom: '0.375rem',
                    fontSize: 'clamp(0.875rem, 0.8rem + 0.25vw, 0.9375rem)',
                  }}
                >
                  {a.assumption}
                </div>
                <p
                  style={{
                    fontSize: 'clamp(0.8rem, 0.75rem + 0.2vw, 0.875rem)',
                    color: 'rgb(var(--color-text-muted))',
                    lineHeight: 1.65,
                  }}
                >
                  {a.examination}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {output.strong_objections.length > 0 && (
        <Section label="Strong Objections" accent={ac}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            {output.strong_objections.map((o, i) => (
              <div
                key={i}
                style={{
                  padding: '0.875rem 1rem',
                  background: 'rgb(var(--color-surface-3))',
                  borderRadius: '6px',
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: 'rgb(var(--color-text))',
                    marginBottom: '0.375rem',
                    fontSize: 'clamp(0.875rem, 0.8rem + 0.25vw, 0.9375rem)',
                  }}
                >
                  {o.objection}
                </div>
                <p
                  style={{
                    fontSize: 'clamp(0.8rem, 0.75rem + 0.2vw, 0.875rem)',
                    color: 'rgb(var(--color-text-muted))',
                    lineHeight: 1.65,
                  }}
                >
                  {o.weight}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {output.weak_spots.length > 0 && (
        <Section label="Weak Spots" accent={ac}>
          <BulletList items={output.weak_spots} />
        </Section>
      )}

      {output.better_formulations.length > 0 && (
        <Section label="Better Formulations" accent={ac}>
          <BulletList items={output.better_formulations} />
        </Section>
      )}

      {output.unanswered_questions.length > 0 && (
        <Section label="Unanswered Questions" accent={ac}>
          <BulletList items={output.unanswered_questions} />
        </Section>
      )}
    </div>
  );
}

/* ─── Stoic's Ledger ───────────────────────────────────────── */

function StoicsLedgerOutputView({
  output,
}: {
  output: StoicsLedgerOutput;
}) {
  const ac = accent('stoics-ledger');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Section label="Conduct Review" accent={ac}>
        <TextBlock text={output.conduct_review} />
      </Section>

      {output.duties_met.length > 0 && (
        <Section label="Duties Met" accent={ac}>
          <BulletList items={output.duties_met} />
        </Section>
      )}

      {output.duties_neglected.length > 0 && (
        <Section label="Duties Neglected" accent={ac}>
          <BulletList items={output.duties_neglected} />
        </Section>
      )}

      {output.avoidances_named.length > 0 && (
        <Section label="Avoidances Named" accent={ac}>
          <BulletList items={output.avoidances_named} />
        </Section>
      )}

      {output.excuses_detected.length > 0 && (
        <Section label="Excuses Detected" accent={ac}>
          <BulletList items={output.excuses_detected} />
        </Section>
      )}

      <Section label="Maxim for Tomorrow" accent={ac}>
        <CalloutBlock text={output.maxim} accentHue={ac} />
      </Section>

      <Section label="Act of Repair" accent={ac}>
        <TextBlock text={output.act_of_repair} />
      </Section>
    </div>
  );
}

/* ─── The Fool ──────────────────────────────────────────────── */

function FoolOutputView({ output }: { output: FoolOutput }) {
  const ac = accent('fool');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Section label="Your Claim" accent={ac}>
        <TextBlock text={output.core_claim} />
      </Section>

      <Section label="Why You May Be Wrong" accent={ac}>
        <TextBlock text={output.why_wrong} />
      </Section>

      {output.blind_spots.length > 0 && (
        <Section label="Blind Spots" accent={ac}>
          <BulletList items={output.blind_spots} />
        </Section>
      )}

      {output.risks.length > 0 && (
        <Section label="Risks" accent={ac}>
          <BulletList items={output.risks} />
        </Section>
      )}

      <Section label="Reputational Danger" accent={ac}>
        <TextBlock text={output.reputational_danger} />
      </Section>

      {output.second_order_effects.length > 0 && (
        <Section label="Second-Order Effects" accent={ac}>
          <BulletList items={output.second_order_effects} />
        </Section>
      )}

      <Section label="Rival Interpretation" accent={ac}>
        <CalloutBlock text={output.rival_interpretation} accentHue={ac} />
      </Section>
    </div>
  );
}

/* ─── The Interpreter ──────────────────────────────────────── */

function InterpreterOutputView({
  output,
}: {
  output: InterpreterOutput;
}) {
  const ac = accent('interpreter');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Section label="The Symbol" accent={ac}>
        <CalloutBlock text={output.symbol_named} accentHue={ac} />
      </Section>

      <Section label="Five Lenses" accent={ac}>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {output.lenses.map((lens) => (
            <div
              key={lens.name}
              style={{
                padding: '1rem 1.25rem',
                background: 'rgb(var(--color-surface-3))',
                borderRadius: '6px',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(0.7rem, 0.65rem + 0.15vw, 0.75rem)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: `rgb(${ac})`,
                  marginBottom: '0.625rem',
                }}
              >
                {lens.name}
              </div>
              <p
                style={{
                  fontSize: 'clamp(0.875rem, 0.8rem + 0.25vw, 0.9375rem)',
                  color: 'rgb(var(--color-text-muted))',
                  lineHeight: 1.65,
                  marginBottom: '0.625rem',
                }}
              >
                <strong style={{ color: 'rgb(var(--color-text))', fontWeight: 500 }}>
                  Notices:
                </strong>{' '}
                {lens.notices}
              </p>
              <p
                style={{
                  fontSize: 'clamp(0.8rem, 0.75rem + 0.2vw, 0.875rem)',
                  color: 'rgb(var(--color-text-faint))',
                  lineHeight: 1.6,
                }}
              >
                <em>Misses: {lens.misses}</em>
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Tensions Between Interpretations" accent={ac}>
        <TextBlock text={output.tensions} />
      </Section>

      {output.questions_to_sit_with.length > 0 && (
        <Section label="Questions to Sit With" accent={ac}>
          <BulletList items={output.questions_to_sit_with} />
        </Section>
      )}
    </div>
  );
}

/* ─── Main export ───────────────────────────────────────────── */

export function SessionOutput({
  toolSlug,
  output,
}: {
  toolSlug: string;
  output: unknown;
}) {
  switch (toolSlug) {
    case 'small-council':
      return <SmallCouncilOutput output={output as CouncilOutput} />;
    case 'genealogist':
      return <GenealogyOutputView output={output as GenealogyOutput} />;
    case 'interlocutor':
      return (
        <InterlocutorOutputView output={output as InterlocutorOutput} />
      );
    case 'stoics-ledger':
      return (
        <StoicsLedgerOutputView output={output as StoicsLedgerOutput} />
      );
    case 'fool':
      return <FoolOutputView output={output as FoolOutput} />;
    case 'interpreter':
      return (
        <InterpreterOutputView output={output as InterpreterOutput} />
      );
    default:
      return (
        <pre
          style={{
            fontSize: '0.8125rem',
            color: 'rgb(var(--color-text-muted))',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {JSON.stringify(output, null, 2)}
        </pre>
      );
  }
}
