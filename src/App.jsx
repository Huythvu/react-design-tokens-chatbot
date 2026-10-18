import React, { useState } from 'react';
import { Button, Message, Composer } from './components.jsx';

const welcome = { id: 0, role: 'assistant', text: 'Hej! Spørg mig om design tokens, komponenter eller temaer.' };

function replyTo(text) {
  const question = text.toLowerCase();
  if (question.includes('tema')) return 'Et tema giver de samme semantiske tokens nye værdier. Komponenterne bruger stadig de samme navne.';
  if (question.includes('komponent')) return 'En fælles komponent samler struktur og adfærd. Tokens samler designbeslutninger.';
  if (question.includes('token')) return 'Et design token er en navngiven designbeslutning, fx --color-text eller --space-3.';
  return 'Prøv at spørge om tokens, komponenter eller temaer. Jeg bruger faste demosvar og gemmer ikke samtalen.';
}

export default function App() {
  const [messages, setMessages] = useState([welcome]);
  const [theme, setTheme] = useState('light');
  const [compact, setCompact] = useState(false);

  function send(text) {
    setMessages(current => [...current,
      { id: crypto.randomUUID(), role: 'user', text },
      { id: crypto.randomUUID(), role: 'assistant', text: replyTo(text) }
    ]);
  }

  return <main className="app" data-theme={theme} data-density={compact ? 'compact' : 'comfortable'}>
    <section className="chat" aria-labelledby="chat-title">
      <header className="chat-header">
        <div><h1 id="chat-title">Token-chatten</h1><p>Fælles beslutninger. Sammenhængende design.</p></div>
        <div className="toolbar">
          <Button variant="secondary" aria-pressed={theme === 'dark'} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Mørkt tema</Button>
          <Button variant="secondary" aria-pressed={compact} onClick={() => setCompact(!compact)}>Kompakt</Button>
          <Button variant="secondary" onClick={() => setMessages([welcome])}>Ny samtale</Button>
        </div>
      </header>
      <p className="notice">Undervisningsdemo med faste svar. Skriv fx “Hvad er tokens?”</p>
      <div className="messages" role="log" aria-label="Samtale" aria-live="polite" aria-relevant="additions">
        {messages.map(message => <Message key={message.id} {...message} />)}
      </div>
      <Composer onSend={send} />
    </section>
  </main>;
}
