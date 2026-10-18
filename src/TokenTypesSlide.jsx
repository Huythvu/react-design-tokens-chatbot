import React, { useState } from 'react';
import './token-types-slide.css';

export default function TokenTypesSlide() {
  const [jade, setJade] = useState('#3a646d');
  return <main className="token-slide" style={{ '--jade-600': jade }}>
    <h1>Primitive og semantiske tokens</h1>
    <div className="token-slide-columns">
      <section>
        <h2>Primitiv: Hvilken værdi?</h2>
        <p>En navngiven værdi i en palette eller skala.</p>
        <pre><code>{`--jade-600: ${jade};\n--space-4: 1rem;`}</code></pre>
      </section>
      <section>
        <h2>Semantisk: Hvad bruges den til?</h2>
        <p>En navngiven rolle i designet.</p>
        <pre><code>{'--color-action: var(--jade-600);\n--space-panel: var(--space-4);'}</code></pre>
      </section>
    </div>
    <section className="token-slide-demo" aria-label="Afprøv en fælles designændring">
      <label htmlFor="primitive-value">Skift den primitive farveværdi</label>
      <select id="primitive-value" value={jade} onChange={event => setJade(event.target.value)}>
        <option value="#3a646d">Jade Green · #3a646d</option>
        <option value="#182230">Mørk neutral · #182230</option>
      </select>
      <button type="button" className="token-slide-example">Send</button>
      <p>Knappen bruger <code>background: var(--color-action)</code>.</p>
      <p>Navnet på rollen er det samme, selv når værdien ændrer sig.</p>
    </section>
    <p><strong>Do:</strong> Navngiv semantiske tokens efter formålet, fx <code>--color-action</code>.</p>
    <p><strong>Don’t:</strong> Lås rollen til en farve, fx <code>--blue-button</code>. Farvenavne er fine på det primitive lag.</p>
  </main>;
}
