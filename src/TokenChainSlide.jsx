import React, { useState } from 'react';
import './token-types-slide.css';
import './token-chain-slide.css';

function SendButton({ onSend }) {
  return <button className="chain-send" onClick={onSend}>Send</button>;
}

export default function TokenChainSlide() {
  const [jade, setJade] = useState('#3a646d');
  const [sent, setSent] = useState(false);
  const stages = [
    ['React-komponent', '<SendButton />', 'function SendButton({ onSend }) {\n  return (\n    <button className="chain-send"\n      onClick={onSend}>Send</button>\n  );\n}'],
    ['CSS-klasse', '.chain-send', '.chain-send {\n  background: var(--color-action);\n  color: var(--color-on-action);\n}'],
    ['Semantisk token', '--color-action', '.token-chain {\n  --color-action: var(--jade-600);\n}'],
    ['Primitiv token', '--jade-600', `.token-chain {\n  --jade-600: ${jade};\n}`],
    ['Værdi', jade, `/* Den aktuelle baggrundsfarve */\n${jade}`],
  ];

  return <main className="token-slide token-chain" style={{ '--jade-600': jade }}>
    <a href="?">Tilbage til chatbotten</a>
    <h1>Designbeslutninger bag en React-komponent</h1>
    <p>Følg opslagene fra komponentens CSS-klasse til den konkrete farveværdi.</p>
    <ol className="chain-stages">
      {stages.map(([title, name, code], index) => <li key={title}>
        <span className="chain-step">{index + 1}</span>
        <h2>{title}</h2>
        <code>{name}</code>
        <pre><code>{code}</code></pre>
      </li>)}
    </ol>
    <section className="token-slide-demo" aria-label="Afprøv token-kæden">
      <label htmlFor="chain-value">Ret kun den primitive farveværdi</label>
      <select id="chain-value" value={jade} onChange={event => setJade(event.target.value)}>
        <option value="#3a646d">Jade Green · #3a646d</option>
        <option value="#182230">Mørk neutral · #182230</option>
      </select>
      <SendButton onSend={() => setSent(true)} />
      <p role="status">{sent ? 'Send-knappen virker. Dens udseende kommer fra token-kæden.' : 'Prøv knappen, og skift derefter farveværdien.'}</p>
    </section>
    <p>React viser komponenten. CSS følger referencerne. Den semantiske rolle beholder sit navn.</p>
    <p><a href="?slide=6">Se forskellen på primitive og semantiske tokens</a></p>
  </main>;
}
