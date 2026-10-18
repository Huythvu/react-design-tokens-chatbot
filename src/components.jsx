import React, { useState } from 'react';

export function Button({ variant = 'primary', type = 'button', children, ...props }) {
  return <button type={type} className={`button button--${variant}`} {...props}>{children}</button>;
}

export function Message({ role, text }) {
  return <article className={`message message--${role}`}>
    <strong className="message-author">{role === 'user' ? 'Dig' : 'Token-bot'}</strong>
    <p>{text}</p>
  </article>;
}

export function Composer({ onSend }) {
  const [draft, setDraft] = useState('');
  function submit(event) {
    event.preventDefault();
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft('');
  }
  return <form className="composer" onSubmit={submit}>
    <label htmlFor="question">Din besked</label>
    <div className="composer-controls">
      <input id="question" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Spørg om design tokens…" autoComplete="off" />
      <Button type="submit" disabled={!draft.trim()}>Send</Button>
    </div>
  </form>;
}
