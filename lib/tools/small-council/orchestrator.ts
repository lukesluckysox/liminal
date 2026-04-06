import Anthropic from '@anthropic-ai/sdk';

const MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-20250514';
const TIMEOUT_MS = 90_000; // Multiple calls — give generous timeout

export interface CouncilAdvisor {
  name: string;
  title: string;
  personality: string;
}

export interface CouncilTurn {
  advisor: string;
  round: number;
  content: string;
}

export interface CouncilOutput {
  question: string;
  turns: CouncilTurn[];
  synthesis: string;
  summary: string;
}

const ADVISORS: CouncilAdvisor[] = [
  {
    name: 'The Grand Maester',
    title: 'Keeper of Knowledge',
    personality:
      'You draw on historical precedent, accumulated wisdom, and long-term perspective. You are cautious, measured, and deeply aware of how rarely new situations are truly new.',
  },
  {
    name: 'The Master of Coin',
    title: 'Steward of Resources',
    personality:
      'You think in terms of costs, trade-offs, incentives, and practical constraints. You are skeptical of plans that ignore resource reality and find poetry in sustainable systems.',
  },
  {
    name: 'The Lord Commander',
    title: 'Guardian Against Risk',
    personality:
      'You think in terms of threats, vulnerabilities, worst-case scenarios, and the human capacity for conflict. You are not pessimistic — you are prepared.',
  },
  {
    name: 'The Master of Whispers',
    title: 'Reader of Hidden Things',
    personality:
      'You see what is unspoken — hidden motives, unstated interests, information asymmetries, and the gap between what people say and what they actually want.',
  },
  {
    name: 'The Hand',
    title: 'Voice of Judgment',
    personality:
      'You synthesize, prioritize, and decide. You weigh competing counsel without paralysis. You understand that inaction is itself a choice, often the worst one.',
  },
];

function buildAdvisorPrompt(
  advisor: CouncilAdvisor,
  question: string,
  previousTurns: CouncilTurn[]
): string {
  const context =
    previousTurns.length > 0
      ? `\n\nThe council has already spoken in round one:\n\n${previousTurns
          .map((t) => `**${t.advisor}:** ${t.content}`)
          .join('\n\n')}\n\nNow in round two, respond to your colleagues. You may agree, push back, add nuance, or sharpen your original position. Be direct and specific.`
      : '\nThis is round one. Give your counsel without knowledge of what others will say. Be direct and specific. 2–4 paragraphs.';

  return `You are ${advisor.name}, ${advisor.title} of the Small Council.

${advisor.personality}

The question before the council:
"${question}"
${context}

Speak in first person. Stay in character. 2–4 paragraphs.`;
}

async function callAdvisor(
  client: Anthropic,
  advisor: CouncilAdvisor,
  question: string,
  previousTurns: CouncilTurn[]
): Promise<string> {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 600,
    messages: [
      {
        role: 'user',
        content: buildAdvisorPrompt(advisor, question, previousTurns),
      },
    ],
  });
  const block = message.content[0];
  return block.type === 'text' ? block.text.trim() : '';
}

async function callSynthesis(
  client: Anthropic,
  question: string,
  allTurns: CouncilTurn[]
): Promise<string> {
  const transcript = allTurns
    .map(
      (t) =>
        `[Round ${t.round}] ${t.advisor}:\n${t.content}`
    )
    .join('\n\n---\n\n');

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 800,
    messages: [
      {
        role: 'user',
        content: `You are the chronicler of the Small Council. Below is the full transcript of the council's deliberation on this question:

"${question}"

TRANSCRIPT:
${transcript}

Write a synthesis (3–4 paragraphs) that:
1. Names the central tension in the council's views
2. States what the council broadly agrees on
3. Recommends a course of action — do not hedge into meaninglessness
4. Identifies what remains unresolved

Be direct. A council that cannot decide is worse than a council that decides wrongly.`,
      },
    ],
  });
  const block = message.content[0];
  return block.type === 'text' ? block.text.trim() : '';
}

export async function runSmallCouncil(question: string): Promise<CouncilOutput> {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    timeout: TIMEOUT_MS,
  });

  // Round 1: all advisors in parallel
  const round1Results = await Promise.all(
    ADVISORS.map(async (advisor) => ({
      advisor: advisor.name,
      round: 1,
      content: await callAdvisor(client, advisor, question, []),
    }))
  );

  // Round 2: all advisors in parallel (with round 1 context)
  const round2Results = await Promise.all(
    ADVISORS.map(async (advisor) => ({
      advisor: advisor.name,
      round: 2,
      content: await callAdvisor(client, advisor, question, round1Results),
    }))
  );

  const allTurns = [...round1Results, ...round2Results];
  const synthesis = await callSynthesis(client, question, allTurns);

  // Build a brief summary for the archive
  const summary = synthesis.split('\n\n')[0]?.slice(0, 200) + '…';

  return {
    question,
    turns: allTurns,
    synthesis,
    summary,
  };
}
