/** Single source of truth for tool identity across the app. */

export const TOOL_ACCENTS: Record<string, string> = {
  'small-council': '184 150 58',   // gold
  'genealogist':   '150 160 120',  // sage
  'interlocutor':  '120 148 180',  // steel blue
  'stoics-ledger': '148 140 124',  // stone — deliberately austere, not gold
  'fool':          '180 100 100',  // muted crimson
  'interpreter':   '128 108 172',  // deep violet
};

export const TOOL_LABELS: Record<string, string> = {
  'small-council': 'Small Council',
  'genealogist':   'The Genealogist',
  'interlocutor':  'The Interlocutor',
  'stoics-ledger': "The Stoic's Ledger",
  'fool':          'The Fool',
  'interpreter':   'The Interpreter',
};

export const TOOL_SLUGS = Object.keys(TOOL_ACCENTS) as Array<keyof typeof TOOL_ACCENTS>;
