/** Single source of truth for tool identity across the app. */

export const TOOL_ACCENTS: Record<string, string> = {
  'small-council': '198 167 92',   // burnished gold
  'genealogist':   '110 124 115',  // oxidized bronze
  'interlocutor':  '108 128 155',  // muted steel blue
  'stoics-ledger': '130 122 108',  // stone — austere, not gold
  'fool':          '152  88  88',  // muted crimson
  'interpreter':   '107  90 110',  // dusty plum
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
