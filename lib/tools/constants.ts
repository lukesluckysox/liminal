/** Single source of truth for tool identity across the app. */

export const TOOL_ACCENTS: Record<string, string> = {
  'small-council': '156 134 84',   // old brass
  'genealogist':   '110 120 98',   // aged olive
  'interlocutor':   '96 116 140',  // ink blue-gray
  'stoics-ledger':  '98  96  88',  // cool stone — very austere
  'fool':          '136  78  70',  // weathered red
  'interpreter':   '104  94 120',  // dusty plum
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
