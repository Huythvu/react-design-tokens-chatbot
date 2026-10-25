import React, { useState } from 'react';

export function Button({ variant = 'primary', type = 'button', children, ...props }) {
  return <button type={type} className={`button button--${variant}`} {...props}>{children}</button>;
}

export function Message({ message, feedback, onFollowup, onFeedback, onCopyResult }) {
  const [copyStatus, setCopyStatus] = useState('');
  const { role, text, code, topic, message_id: messageId } = message;
  const hasActions = role === 'assistant' && topic && topic !== 'unknown';

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus('Koden er kopieret.');
      onCopyResult(message, true);
    } catch {
      setCopyStatus('Koden kunne ikke kopieres. Markér koden, og kopiér den manuelt.');
      onCopyResult(message, false);
    }
  }

  return <article className={`message message--${role}`} aria-label={role === 'user' ? 'Din besked' : 'Token-bottens svar'}>
    <strong className="message-author">{role === 'user' ? 'Dig' : 'Token-bot'}</strong>
    <p>{text}</p>
    {role === 'assistant' && code && <>
      <div className="message-code-heading">
        <p className="message-code-label">Kodeeksempel</p>
        <Button variant="secondary" onClick={copyCode}>Kopiér kode</Button>
      </div>
      <pre className="message-code" tabIndex={0} aria-label="Kodeeksempel"><code>{code}</code></pre>
      <p className="copy-status" role="status" aria-live="polite">{copyStatus}</p>
    </>}
    {hasActions && <div className="message-actions">
      <div className="message-followups" aria-label="Opfølgning på dette svar">
        <Button variant="secondary" onClick={() => onFollowup(message, 'simpler')}>Forklar enklere</Button>
        <Button variant="secondary" onClick={() => onFollowup(message, 'code')}>Vis kode</Button>
      </div>
      <div className="message-feedback" role="group" aria-label="Hjalp svaret?">
        <span>Hjalp svaret?</span>
        <Button
          variant="secondary"
          aria-pressed={feedback === true}
          onClick={() => onFeedback(messageId, true)}
        >Ja</Button>
        <Button
          variant="secondary"
          aria-pressed={feedback === false}
          onClick={() => onFeedback(messageId, false)}
        >Nej</Button>
      </div>
    </div>}
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
  return <form className="composer ph-no-capture" onSubmit={submit}>
    <label htmlFor="question">Din besked</label>
    <div className="composer-controls">
      <input id="question" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Spørg om design tokens…" autoComplete="off" />
      <Button type="submit" disabled={!draft.trim()}>Send</Button>
    </div>
  </form>;
}
