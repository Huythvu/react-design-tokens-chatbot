const buttonExample = `/* Før: konkrete værdier er hardcodede i komponentens CSS. */
.button {
  padding: 12px 8px;
  background: #2457d6;
  color: #ffffff;
}

/* 1. Saml værdierne i primitive og semantiske tokens. */
:root {
  --blue-100: #edf2ff;
  --blue-300: #bac9ed;
  --blue-600: #2457d6;
  --blue-700: #1943ae;
  --blue-900: #193b91;
  --neutral-0: #ffffff;
  --neutral-800: #182230;
  --focus-orange: #ae3e00;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --radius-small: 0.5rem;
  --focus-width: 3px;
  --focus-offset: 3px;
  --opacity-disabled: 0.55;

  --color-action: var(--blue-600);
  --color-action-hover: var(--blue-700);
  --color-on-action: var(--neutral-0);
  --color-focus: var(--focus-orange);
}

/* 2. Komponenten bruger den semantiske klasse, ikke paletværdier. */
.button {
  padding: var(--space-3) var(--space-2);
  border: 0;
  border-radius: var(--radius-small);
  background: var(--color-action);
  color: var(--color-on-action);
}

/* Button.jsx: React-komponenten genbruger CSS-klassen. */
export function Button({ children, disabled = false }) {
  return (
    <button className="button" disabled={disabled}>
      {children}
    </button>
  );
}

/* 3. Temaet ændrer rollerne, ikke knapkomponenten. */
[data-theme="dark"] {
  --color-action: var(--blue-300);
  --color-action-hover: var(--blue-100);
  --color-on-action: var(--neutral-800);
  --color-focus: #ffbf69;
}

/* 4. Tilstande bruger også semantiske tokens. */
.button:hover:not(:disabled) {
  background: var(--color-action-hover);
}

.button:focus-visible {
  outline: var(--focus-width) solid var(--color-focus);
  outline-offset: var(--focus-offset);
}

.button:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}`;

const topics = [
  {
    id: 'accessibility',
    label: 'tilgængelighed',
    matches: [/tilgængelig|tilgaengelig|accessib|kontrast|wcag|skærmlæser|skaermlaeser|screen reader/i],
    text: 'Tokens kan gøre det lettere at genbruge farver med passende kontrast og ensartede fokusmarkeringer. De sikrer ikke i sig selv tilgængelighed: kontrollér kontrast, tastaturbetjening, fokus og semantik i den færdige grænseflade.',
    simple: 'Tokens hjælper med at genbruge farver og fokus. Du skal stadig teste, at løsningen er til at se og bruge med tastatur.',
    code: `:root {
  --color-text: #182230;
  --color-surface: #ffffff;
  --color-focus: #ae3e00;
}

.button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}`,
  },
  {
    id: 'states',
    label: 'knaptilstande',
    matches: [/fokus|focus|hover|deaktiver|disabled|tilstand|states?/i],
    text: 'En komponent kan have hover-, fokus- og deaktiveret tilstand. Brug synlige, ensartede stilarter: hover giver feedback med mus, fokus gør tastaturpositionen tydelig, og disabled viser, at handlingen ikke er tilgængelig.',
    simple: 'Vis tydeligt, når knappen peges på, vælges med tastatur eller ikke kan bruges.',
    code: `:root {
  --color-action-hover: #1943ae;
  --color-focus: #ae3e00;
  --focus-width: 3px;
  --focus-offset: 3px;
  --opacity-disabled: 0.55;
}

.button:hover:not(:disabled) {
  background: var(--color-action-hover);
}

.button:focus-visible {
  outline: var(--focus-width) solid var(--color-focus);
  outline-offset: var(--focus-offset);
}

.button:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}`,
  },
  {
    id: 'dark-theme',
    label: 'mørkt tema',
    matches: [/mørk|moerk|dark|lyst tema|light theme|tema|theme/i],
    text: 'Et tema ændrer værdierne bag semantiske roller som --color-surface og --color-text. Komponentens CSS bruger de samme roller i begge temaer, så den behøver ikke kende palettens konkrete farver.',
    simple: 'Skift farverne bag roller som baggrund og tekst. Så kan de samme komponenter bruges i lyst og mørkt tema.',
    code: `:root {
  --color-surface: #ffffff;
  --color-text: #182230;
  --color-action: #2457d6;
}

[data-theme="dark"] {
  --color-surface: #182230;
  --color-text: #ffffff;
  --color-action: #bac9ed;
}

.panel {
  background: var(--color-surface);
  color: var(--color-text);
}`,
  },
  {
    id: 'naming',
    label: 'navngivning',
    matches: [/navngiv|navngivning|navngive|navn på|naming|semantic name|token name/i],
    text: 'Navngiv semantiske tokens efter deres rolle, fx --color-action eller --space-panel, ikke efter en bestemt komponent eller farve. Så kan designet ændres uden at omdøbe alle forbrugere.',
    simple: 'Giv tokenet navn efter, hvad det bruges til, fx --color-action, ikke efter den aktuelle farve.',
    code: `:root {
  --blue-600: #2457d6; /* værdi */
  --color-action: var(--blue-600); /* rolle */
}

.button {
  background: var(--color-action);
}`,
  },
  {
    id: 'typography',
    label: 'typografi',
    matches: [/typografi|skrifttype|skriftstørrelse|font|type scale|text style/i],
    text: 'Typografitokens samler valg som skrifttype, størrelse, vægt og linjehøjde. Brug navne efter formål, fx --font-size-body og --font-size-heading, så komponenter deler samme typografiske skala.',
    simple: 'Saml skrifttype, tekststørrelser og linjehøjde i genbrugelige navne.',
    code: `:root {
  --font-family-body: system-ui, sans-serif;
  --font-size-body: 1rem;
  --font-size-heading: 1.5rem;
  --line-height-body: 1.5;
}

.message {
  font-family: var(--font-family-body);
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
}`,
  },
  {
    id: 'spacing',
    label: 'spacing',
    matches: [/spacing|afstand|mellemrum|padding|margin|luft mellem/i],
    text: 'Spacing-tokens er navngivne trin for afstand, fx --space-2 og --space-4. Brug trinene konsekvent til padding og margin, så layoutet får en sammenhængende rytme.',
    simple: 'Lav en lille skala af afstande, og genbrug den mellem elementer.',
    code: `:root {
  --space-2: 0.5rem;
  --space-4: 1rem;
}

.panel {
  padding: var(--space-4);
}

.panel__title {
  margin-bottom: var(--space-2);
}`,
  },
  {
    id: 'colors',
    label: 'farver',
    matches: [/farve|color|palette|palet|hex|kontrast/i],
    text: 'En farvepalette kan indeholde primitive værdier som --blue-600. Semantiske farvetokens beskriver brugen, fx --color-action. Komponenter bruger rollen, så en farve kan ændres ét sted.',
    simple: 'Gem farver som værdier, og giv dem rollenavne som --color-action.',
    code: `:root {
  --blue-600: #2457d6;
  --color-action: var(--blue-600);
  --color-on-action: #ffffff;
}

.button {
  background: var(--color-action);
  color: var(--color-on-action);
}`,
  },
  {
    id: 'css-variables',
    label: 'CSS custom properties',
    matches: [/css custom propert|custom propert|css-?variabl|css variable|var\s*\(|:root|--[a-z][\w-]*/i],
    text: 'CSS custom properties er CSS-værdier med navne, som begynder med --. var() læser værdien. Definér dem fx på :root eller en komponentrod, og brug dem i CSS-deklarationer.',
    simple: 'Sæt en værdi på et navn, der starter med --. Hent den igen med var(--navn).',
    code: `:root {
  --space-panel: 1rem;
}

.panel {
  padding: var(--space-panel);
}`,
  },
  {
    id: 'primitive-semantic',
    label: 'primitive og semantiske tokens',
    matches: [/primitiv|primitive|semantisk|semantic|primitive.{0,20}semantic|semantic.{0,20}primitive/i],
    text: 'Primitive tokens beskriver konkrete værdier eller trin, fx --blue-600 og --space-4. Semantiske tokens beskriver formål, fx --color-action. Komponenten bruger den semantiske rolle, som kan pege på forskellige primitive værdier i forskellige temaer.',
    simple: 'Primitive tokens er værdier. Semantiske tokens er roller, der fortæller, hvor værdierne bruges.',
    code: `:root {
  --blue-600: #2457d6; /* primitiv værdi */
  --color-action: var(--blue-600); /* semantisk rolle */
}

.button {
  background: var(--color-action);
}`,
  },
  {
    id: 'button',
    label: 'React-knap',
    matches: [/react.{0,20}knap|knap.{0,20}react|button|knap/i],
    text: 'Følg kæden i eksemplet: knappen starter med konkrete farve- og afstandsværdier; primitive tokens samler værdierne; semantiske tokens navngiver rollerne; React-komponenten genbruger klassen; tema og tilstande ændrer rollerne uden at ændre komponenten.',
    simple: 'Saml knapfarver og afstande i tokens. Lad React-knappen bruge én CSS-klasse, og skift tokenværdier til temaer og tilstande.',
    code: buttonExample,
  },
  {
    id: 'components',
    label: 'genbrugelige React-komponenter',
    matches: [/genbrugelig.{0,20}komponent|genanvendelig.{0,20}komponent|komponentbibliotek|react komponent|react component|komponent/i],
    text: 'En genbrugelig React-komponent samler markup og API, mens CSS-klassen styrer udseendet. Lad klassens styles bruge semantiske tokens, så knapper på tværs af appen deler designbeslutninger.',
    simple: 'Byg knappen én gang, og brug den flere steder. Lad dens CSS hente fælles tokens.',
    code: `/* Button.jsx */
export function Button({ variant = 'primary', children, ...props }) {
  return (
    <button className={\`button button--\${variant}\`} {...props}>
      {children}
    </button>
  );
}

/* button.css */
:root {
  --space-3: 0.75rem;
  --space-4: 1rem;
  --color-action: #2457d6;
  --color-on-action: #ffffff;
}

.button {
  border: 0;
  padding: var(--space-3) var(--space-4);
}

.button--primary {
  background: var(--color-action);
  color: var(--color-on-action);
}`,
  },
  {
    id: 'design-tokens',
    label: 'design tokens',
    matches: [/design token|design tokens|\btokens?\b/i],
    text: 'Design tokens er navngivne, genbrugelige designbeslutninger, fx farver, afstande og typografi. De kan forbinde designværdier med CSS og komponenter, så ændringer kan deles konsekvent.',
    simple: 'Design tokens er fælles navne for designvalg som farver, afstande og tekststørrelser.',
    code: `:root {
  --blue-600: #2457d6;
  --space-4: 1rem;
  --font-size-body: 1rem;
  --color-action: var(--blue-600);
}

.button {
  background: var(--color-action);
  padding: var(--space-4);
  font-size: var(--font-size-body);
}`,
  },
];

const topicById = new Map(topics.map(topic => [topic.id, topic]));

export const suggestions = [
  { label: 'Forklar design tokens', topic: 'design-tokens' },
  { label: 'Hjælp med en React-knap', topic: 'button' },
  { label: 'Hvordan laver jeg et mørkt tema?', topic: 'dark-theme' },
];

export const welcome = {
  role: 'assistant',
  text: 'Hej! Jeg bruger faste demosvar om design tokens og React. Vælg et forslag, eller skriv et spørgsmål.',
};

const unknownReply = {
  topic: 'unknown',
  text: 'Jeg kan kun svare på nogle faste emner om design tokens og React, og jeg kan ikke analysere vilkårlig kode. Prøv fx at spørge om primitive og semantiske tokens, en React-knap, CSS var(), navngivning, spacing, typografi, mørkt tema, tilstande eller tilgængelighed.',
};

export function replyTo(text, topicId) {
  const topic = topicId ? topicById.get(topicId) : topics.find(item => item.matches.some(pattern => pattern.test(text)));
  if (!topic) return { ...unknownReply };

  return {
    topic: topic.id,
    text: topic.text,
    simple: topic.simple,
    code: topic.code,
  };
}

export function followupActionFor(text) {
  if (/forklar.{0,20}(enklere|lettere|simpler)|simplify|more simply|explain.{0,20}simple/i.test(text)) return 'simpler';
  if (/vis.{0,20}kode|kode.{0,20}vis|show.{0,20}code|code example/i.test(text)) return 'code';
  return null;
}

export function latestFactualAnswer(messages) {
  return [...messages].reverse().find(message => (
    message.role === 'assistant' && message.topic && message.topic !== 'unknown'
  ));
}

export function replyForFollowup(message, action) {
  const topic = topicById.get(message?.topic);
  if (!topic || !['simpler', 'code'].includes(action)) return { ...unknownReply };

  return {
    topic: topic.id,
    action,
    text: action === 'simpler' ? topic.simple : `Her er kodeeksemplet om ${topic.label}.`,
    code: action === 'code' ? topic.code : undefined,
  };
}
