import React from 'react';
import './token-types-slide.css';
import './posthog-setup-slide.css';

export default function PostHogSetupSlide() {
  return <main className="token-slide posthog-guide">
    <a href="?">Tilbage til chatbotten</a>
    <h1>Opsæt PostHog i React</h1>
    <p>Følg trinene for at installere PostHog, sende events fra en React-app og gøre opsætningen klar til Render.</p>

    <section aria-labelledby="install-heading">
      <h2 id="install-heading">1. Installer PostHog</h2>
      <p>Kør kommandoen i projektmappen. I dette projekt er pakken allerede installeret.</p>
      <pre><code>npm install posthog-js</code></pre>
    </section>

    <section aria-labelledby="credentials-heading">
      <h2 id="credentials-heading">2. Gem projektets indstillinger lokalt</h2>
      <p>Opret eller opdatér <code>.env</code> i projektets rod. Brug projektets <strong>Project API key</strong> og den host, der passer til din PostHog-region.</p>
      <pre><code>{`VITE_POSTHOG_KEY=your_project_api_key
VITE_POSTHOG_HOST=https://eu.i.posthog.com`}</code></pre>
      <p>Hold værdierne uden for Git. <code>.env</code> er ignoreret af dette projekts <code>.gitignore</code>. Genstart Vite efter ændringer i filen.</p>
    </section>

    <section aria-labelledby="initialize-heading">
      <h2 id="initialize-heading">3. Initialisér SDK'et én gang</h2>
      <p>Læs indstillingerne fra Vites <code>import.meta.env</code>, og initialisér PostHog én gang i fx <code>src/posthog.js</code>:</p>
      <pre><code>{`import posthog from 'posthog-js';

const key = import.meta.env.VITE_POSTHOG_KEY;
const host = import.meta.env.VITE_POSTHOG_HOST;

if (key && host) {
  posthog.init(key, {
    api_host: host,
    defaults: '2026-08-30',
  });
}

export default posthog;`}</code></pre>
      <p>Importér initialiseringsfilen fra appens indgangspunkt, fx <code>src/main.jsx</code>, så SDK'et startes før komponenterne bruger det.</p>
    </section>

    <section aria-labelledby="events-heading">
      <h2 id="events-heading">4. Send events fra komponenter</h2>
      <p>Importér klienten, og registrér en event dér, hvor brugerhandlingen sker:</p>
      <pre><code>{`import posthog from './posthog.js';

posthog.capture('chat_message_sent');`}</code></pre>
      <p>Brug beskrivende eventnavne, og send kun de egenskaber, du har brug for. Undgå personfølsomme oplysninger.</p>
    </section>

    <section aria-labelledby="render-heading">
      <h2 id="render-heading">5. Tilføj variablerne i Render</h2>
      <ol>
        <li>Åbn appens service i Render-dashboardet, og vælg <strong>Environment</strong>.</li>
        <li>Tilføj <code>VITE_POSTHOG_KEY</code> med projektets Project API key.</li>
        <li>Tilføj <code>VITE_POSTHOG_HOST</code> med projektets host, fx <code>https://eu.i.posthog.com</code> for EU.</li>
        <li>Gem ændringerne, og deploy igen. Vite indlejrer <code>VITE_</code>-variabler i appen under build.</li>
      </ol>
      <p>Brug aldrig en personlig eller administrativ API-nøgle i browserappen. En PostHog project key er beregnet til klientopsætning.</p>
    </section>

    <section aria-labelledby="verify-heading">
      <h2 id="verify-heading">6. Kontrollér opsætningen</h2>
      <p>Åbn den deployede app, udfør en handling, der sender en event, og kontrollér i PostHog, at eventen dukker op. Hvis den mangler, så kontrollér projektets region, Render-variablerne og at den seneste deploy indeholder dem.</p>
    </section>

    <p><a href="?slide=7">Se også token-kæden i React</a></p>
  </main>;
}
