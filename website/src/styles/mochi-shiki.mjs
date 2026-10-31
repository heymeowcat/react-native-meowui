// Code-block syntax themes drawn from the Mochi Press palette: cream paper,
// espresso ink, blueberry keys, olive strings, clay numerals.

const lightTokens = [
  { settings: { foreground: '#3A332B' } },
  {
    scope: ['comment', 'punctuation.definition.comment'],
    settings: { foreground: '#8C7C66', fontStyle: 'italic' },
  },
  {
    scope: [
      'keyword',
      'storage',
      'storage.type',
      'storage.modifier',
      'keyword.control',
      'keyword.operator.new',
    ],
    settings: { foreground: '#3F528C' },
  },
  {
    scope: ['string', 'string.quoted', 'string.template', 'punctuation.definition.string'],
    settings: { foreground: '#61713E' },
  },
  {
    scope: [
      'constant.numeric',
      'constant.language',
      'constant.character',
      'support.constant',
      'constant.other.symbol',
    ],
    settings: { foreground: '#A2603C' },
  },
  {
    scope: [
      'entity.name.function',
      'support.function',
      'meta.function-call',
      'variable.function',
    ],
    settings: { foreground: '#7A4E7E' },
  },
  {
    scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'],
    settings: { foreground: '#8A5A2B' },
  },
  { scope: ['variable.parameter'], settings: { foreground: '#6B6053' } },
  {
    scope: ['meta.object-literal.key', 'support.type.property-name', 'entity.other.attribute-name'],
    settings: { foreground: '#4A4036' },
  },
  {
    scope: ['entity.name.tag', 'punctuation.definition.tag', 'support.class.component'],
    settings: { foreground: '#3F528C' },
  },
  {
    scope: ['keyword.operator', 'keyword.operator.assignment', 'keyword.operator.arithmetic'],
    settings: { foreground: '#6B6053' },
  },
  { scope: ['punctuation', 'meta.brace', 'meta.bracket'], settings: { foreground: '#9C8D7A' } },
  {
    scope: ['markup.heading', 'entity.name.section', 'markup.bold'],
    settings: { foreground: '#352F28', fontStyle: 'bold' },
  },
  { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
  { scope: ['markup.inline.raw', 'markup.fenced_code.block'], settings: { foreground: '#A2603C' } },
  {
    scope: ['string.other.link', 'markup.underline.link'],
    settings: { foreground: '#61713E', fontStyle: 'underline' },
  },
  { scope: ['invalid'], settings: { foreground: '#F8F0E3', background: '#B4553F' } },
];

const darkTokens = [
  { settings: { foreground: '#E9DDCA' } },
  {
    scope: ['comment', 'punctuation.definition.comment'],
    settings: { foreground: '#9C8D7A', fontStyle: 'italic' },
  },
  {
    scope: [
      'keyword',
      'storage',
      'storage.type',
      'storage.modifier',
      'keyword.control',
      'keyword.operator.new',
    ],
    settings: { foreground: '#9FB0E8' },
  },
  {
    scope: ['string', 'string.quoted', 'string.template', 'punctuation.definition.string'],
    settings: { foreground: '#B4C48C' },
  },
  {
    scope: [
      'constant.numeric',
      'constant.language',
      'constant.character',
      'support.constant',
      'constant.other.symbol',
    ],
    settings: { foreground: '#E0A27F' },
  },
  {
    scope: [
      'entity.name.function',
      'support.function',
      'meta.function-call',
      'variable.function',
    ],
    settings: { foreground: '#D9B6DC' },
  },
  {
    scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'],
    settings: { foreground: '#E3C08D' },
  },
  { scope: ['variable.parameter'], settings: { foreground: '#C6B8A4' } },
  {
    scope: ['meta.object-literal.key', 'support.type.property-name', 'entity.other.attribute-name'],
    settings: { foreground: '#D8CCB9' },
  },
  {
    scope: ['entity.name.tag', 'punctuation.definition.tag', 'support.class.component'],
    settings: { foreground: '#9FB0E8' },
  },
  {
    scope: ['keyword.operator', 'keyword.operator.assignment', 'keyword.operator.arithmetic'],
    settings: { foreground: '#B3A48F' },
  },
  { scope: ['punctuation', 'meta.brace', 'meta.bracket'], settings: { foreground: '#8C7C66' } },
  {
    scope: ['markup.heading', 'entity.name.section', 'markup.bold'],
    settings: { foreground: '#F5EDDE', fontStyle: 'bold' },
  },
  { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
  { scope: ['markup.inline.raw', 'markup.fenced_code.block'], settings: { foreground: '#E0A27F' } },
  {
    scope: ['string.other.link', 'markup.underline.link'],
    settings: { foreground: '#B4C48C', fontStyle: 'underline' },
  },
  { scope: ['invalid'], settings: { foreground: '#211C17', background: '#E3A08D' } },
];

export const mochiShikiLight = {
  name: 'mochi-press-light',
  type: 'light',
  colors: {
    'editor.background': '#FBF4E7',
    'editor.foreground': '#3A332B',
    'editor.lineHighlightBackground': '#F3E8D6',
    'editor.selectionBackground': '#DFE4F4',
    'editorLineNumber.foreground': '#B09E85',
    'editorLineNumber.activeForeground': '#6B6053',
    'editorIndentGuide.background1': '#E7D9C2',
    'editorIndentGuide.activeBackground1': '#C9B594',
    'editorWidget.background': '#F8F0E3',
    'editorWidget.border': '#E7D9C2',
  },
  tokenColors: lightTokens,
};

export const mochiShikiDark = {
  name: 'mochi-press-dark',
  type: 'dark',
  colors: {
    'editor.background': '#2A241E',
    'editor.foreground': '#E9DDCA',
    'editor.lineHighlightBackground': '#332B23',
    'editor.selectionBackground': '#2D3350',
    'editorLineNumber.foreground': '#7A6A56',
    'editorLineNumber.activeForeground': '#C6B8A4',
    'editorIndentGuide.background1': '#3B3229',
    'editorIndentGuide.activeBackground1': '#5A4B3B',
    'editorWidget.background': '#2A241E',
    'editorWidget.border': '#453A2F',
  },
  tokenColors: darkTokens,
};
