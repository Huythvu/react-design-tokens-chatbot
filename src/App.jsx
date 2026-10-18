import React, { useState } from 'react';
import { Button, Message, Composer } from './components.jsx';
import { welcome, replyTo } from './replies.js';

export default function App() {
  const [messages, setMessages] = useState([welcome]);
  const [theme, setTheme] = useState('light');

  function send(text) {
    setMessages(current => [...current,
      { id: crypto.randomUUID(), role: 'user', text },
      { id: crypto.randomUUID(), role: 'assistant', ...replyTo(text) }
    ]);
  }

  return <main className="app" data-theme={theme}>
    <section className="chat" aria-labelledby="chat-title">
      <header className="chat-header">
        <div><h1 id="chat-title">Token-chatten</h1><p>Fælles beslutninger. Sammenhængende design.</p></div>
        <div className="toolbar">
          <Button variant="secondary" onClick={() => setTheme(current => current === 'light' ? 'dark' : 'light')}>
            Skift til {theme === 'light' ? 'mørkt' : 'lyst'} tema
          </Button>
          <Button variant="secondary" onClick={() => setMessages([welcome])}>Ny samtale</Button>
        </div>
      </header>
      <nav className="learning-links" aria-label="React-demonstrationer">
        <a href="?slide=6">Slide 6: Primitive og semantiske tokens</a>
        <a href="?slide=7">Slide 7: Token-kæden i React</a>
      </nav>
      <p className="notice">Undervisningsdemo med faste svar. Skriv fx “Hvad er tokens?”</p>
      <div className="messages" role="log" aria-label="Samtale" aria-live="polite" aria-relevant="additions">
        {messages.map(message => <Message key={message.id} {...message} />)}
      </div>
      <Composer onSend={send} />
    </section>
  </main>;
}
