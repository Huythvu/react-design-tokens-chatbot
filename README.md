# Design tokens i React · Token-chatten

## Main: Chatbot med tokens

### Slide 6 som React-komponent

Chatbotforsiden har links til begge kodeillustrationer. Slide 7 (`?slide=7`) viser kæden React-komponent, CSS-klasse, semantisk token, primitiv token og farveværdi. Lad `--color-action` referere til enten `--jade-600` eller `--neutral-800`, og prøv Send-knappen. Begge primitive tokens beholder deres faste værdier. Komponenten findes i `src/TokenChainSlide.jsx`.

Start appen, og tilføj `?slide=6` til den lokale adresse (fx `http://localhost:5173/?slide=6`). `src/TokenTypesSlide.jsx` viser primitive og semantiske tokens med et valg af den primitive token, som `--color-action` refererer til. `--jade-600` er altid `#3a646d`, og `--neutral-800` er altid `#182230`. Knappen Send er en visuel demonstration. Dette er ikke et komplet temaskift.

Her er chatbotten ombygget til fælles design tokens. Der er ét udseende og intet temaskift eller kompakt visning endnu.

- `src/tokens.css`: Primitive værdier og semantiske roller.
- `src/styles.css`: Komponenternes CSS bruger de fælles tokens.
- `src/main.jsx`: Importerer tokens før komponenternes styles.
- `src/replies.js`: Lokale, emnebestemte demosvar med almindelig og enklere forklaring samt kodeeksempler. Koden vises som tekst og bliver ikke eksekveret.

## UX-test og produktanalyse

Chatbotten har tre startforslag, svar knyttet til emner og opfølgning pr. svar. Emnegenkendelsen prioriterer specifikke emner og understøtter danske og engelske synonymer. De faste svar dækker:

- Design tokens generelt samt primitive og semantiske tokens.
- CSS custom properties, `var()` og tokennavngivning.
- Farver, spacing og typografi.
- Genbrugelige React-komponenter og en gennemgående React-knap.
- Lyst og mørkt tema samt hover-, fokus- og deaktiverede tilstande.
- Tilgængelighed, kontrast og fokus.

Et fagligt svar tilbyder **Forklar enklere**, **Vis kode** og feedback. Opfølgningen bruger emnet på det svar, knappen tilhører; skrevne opfølgninger som “forklar det enklere” bruger det seneste faglige emne i samtalen. Ukendte spørgsmål får en tydelig forklaring af demoens begrænsning. Knapeksemplerne er tekst, ikke eksekverbar eller analyseret kode.

### PostHog-events

Alle events får `app_version`. Samtalens events inkluderer normalt `conversation_id`, `message_id`, `topic` og `source`, når de er relevante. `source` er `typed`, `suggestion` eller `followup`. Events indeholder aldrig beskedtekst, kode eller clipboard-indhold.

| Event | Udløses når | Særlige properties |
| --- | --- | --- |
| `chat_started` | Første brugerbesked sendes i en samtale; højst én gang pr. samtale. | Beskedens `message_id`, `topic` og `source`. |
| `chat_suggestion_clicked` | Et af de tre startforslag vælges. | Den oprettede brugerbeskeds `message_id`, `topic`, `source: suggestion`. |
| `chat_message_sent` | En skrevet besked, et startforslag eller en opfølgning sendes. | Brugerbeskedens `message_id`, `topic`, `source`; `action` for opfølgninger. |
| `chat_response_received` | Et lokalt svar er tilføjet og renderet i samtalen. | Svarbeskedens `message_id`, `topic`, `source`; `action` for opfølgninger. Måler ikke AI- eller netværkstid. |
| `chat_followup_clicked` | **Forklar enklere** eller **Vis kode** vælges på et svar. | Det oprindelige svar `message_id`, `topic`, `source: followup`, `action: simpler` eller `code`. |
| `chat_code_copied` | Kode kopieres til clipboard. | Svarbeskedens `message_id`, `topic`, `source`, `action: copy_code`. |
| `chat_code_copy_failed` | Clipboard-kopiering fejler. | Svarbeskedens `message_id`, `topic`, `source`, `action: copy_code`. |
| `chat_feedback_submitted` | En vurdering vælges eller ændres på et svar. | Svarbeskedens `message_id`, `topic`, `source`, `helpful`; `previous_helpful` ved ændring. Samme vurdering sendes ikke igen. |
| `chat_reset` | **Ny samtale** vælges. | Den afsluttede samtales `conversation_id`. En ny samtale får et nyt ID. |
| `token_type_selected` | En token vælges på `?slide=6`. | `selected_token`. |
| `token_chain_selected` | En token vælges på `?slide=7`. | `selected_token`. |
| `token_chain_demo_sent` | Demoens Send-knap på `?slide=7` vælges. | Ingen yderligere properties. |

Samtalesvar og brugerbeskeder får hver deres stabile message ID. Opfølgnings- og feedbackevents peger på det svar, de handler om. En skrevet opfølgning tæller som `chat_message_sent` med `source: followup`; `chat_followup_clicked` gælder knapklik.

For at kontrollere events: konfigurér `VITE_POSTHOG_KEY` og `VITE_POSTHOG_HOST`, start appen, udfør en handling, og åbn projektets **Activity** eller **Events** i PostHog. Filtrér på eventnavnet, og inspicér properties. Sammenlign ikke `chat_response_received` med AI-svartid: svarene kommer lokalt og øjeblikkeligt.

PostHog initialiseres kun i `src/posthog.js`. Autocapture er slået fra, session recording er deaktiveret, og chatområdet er markeret `ph-no-capture`. Kun de eksplicitte events ovenfor sendes af chatten. Appen virker også uden PostHog-konfiguration; så sendes analytics-events ikke.

SDK'ets eksisterende exception capture er fortsat aktiveret for ubehandlede fejl og promise-afvisninger; console errors indsamles ikke. Derudover sendes tre strukturerede PostHog-logs, adskilt fra events: chatten klar (`response_source: local_static`), svar oprettet (`response_source: local_static`, `message_count`) og samtale nulstillet (`discarded_message_count`). De indeholder ikke beskedtekst eller svartid.

### Manuel testvejledning

1. **Nybegynder:** Vælg “Forklar design tokens”, og spørg derefter om primitive og semantiske tokens. Kontrollér den almindelige forklaring, **Forklar enklere**, kodevisningen og feedback.
2. **React-udvikler:** Vælg “Hjælp med en React-knap”, kopiér eksemplet, og kontrollér bekræftelsen. Vælg **Vis kode** på et ældre svar efter at have spurgt om et andet emne; kodeopfølgningen skal stadig handle om det ældre svar.
3. **Designer:** Spørg, hvordan tokens navngives. Kontrollér, at svaret forklarer semantiske roller som `--color-action` frem for at fokusere på en bestemt farve.
4. **Udvikler:** Spørg om mørkt tema og derefter fokus. Brug **Forklar enklere** på det ældre mørke-tema-svar; kontrollér, at emnet ikke skifter til fokus.

Kontrollér også, at ukendt kode får et begrænsningssvar, at **Ny samtale** nulstiller opfølgningskontekst og feedback, at gentagne klik på samme feedback kun giver ét event, og at appen stadig virker uden PostHog-variabler. Åbn desuden `?slide=6`, `?slide=7` og `?slide=8` for at kontrollere undervisningssiderne.

### Begrænsninger

Svarene er lokale, faste og valgt ud fra nøgleord; chatbotten forstår ikke vilkårlige spørgsmål eller kode og bruger ingen AI/API-tjeneste. Samtaler gemmes ikke efter genindlæsning. PostHog kan være frakoblet, og manglende analytics påvirker ikke chatfunktionerne.

Sammenlign med [startkoden på starter](https://github.com/h-oellgaard/react-design-tokens-chatbot/tree/starter). Denne branch viser et løsningsforslag til token-refaktoreringen, ikke de senere temaøvelser eller ekstra komponenter.

Hent denne version med:

```sh
git clone --branch main https://github.com/h-oellgaard/react-design-tokens-chatbot.git
cd react-design-tokens-chatbot
npm ci
npm start
```

I en eksisterende klon: Gem først eventuelle egne ændringer, kør `git fetch origin`, og skift derefter til `main`.

Nedenstående beskriver det samlede undervisningsforløb. Øvelsernes temaskift er næste trin, ikke en funktion i denne version.

PBA Webudvikling · EAAA · 8.15–11.30

**Hvordan holder vi et design sammenhængende, når 10 udviklere eller AI-agenter arbejder på samme projekt?**

I arbejder med fælles tokens, komponenter, temaer og aftaler om samarbejde. Ingen Figma eller API-nøgle er nødvendig. Chatbotten bruger faste demosvar og gemmer kun beskeder i hukommelsen indtil genindlæsning.

## A · Brug denne React-template

Standardbranchen `main` indeholder nu token-versionen. Til øvelse 1 uden tokens skal I vælge [starter](https://github.com/h-oellgaard/react-design-tokens-chatbot/tree/starter), før I henter ZIP-filen, eller klone med `git clone --branch starter https://github.com/h-oellgaard/react-design-tokens-chatbot.git`.

Vælg **Code → Download ZIP** på GitHub, og udpak projektet, eller klon det med Git som beskrevet nedenfor.

### Klon projektet med Git

I skal have Git installeret. Åbn en terminal i den mappe, hvor I vil placere projektet, og kør:

```sh
git clone https://github.com/h-oellgaard/react-design-tokens-chatbot.git
cd react-design-tokens-chatbot
```

Nu har I en lokal kopi af projektet. Åbn mappen i jeres editor, fx med `code .`, hvis I bruger VS Code og har kommandoen installeret.

Vil I gemme jeres ændringer på jeres egen GitHub-konto, skal I først vælge **Use this template → Create a new repository** eller **Fork** på GitHub og derefter klone URL'en til jeres egen kopi. At klone dette repository giver ikke skriveadgang til det.

### Installer og start

Åbn projektmappen i jeres editor. Brug Node.js 22.12+ eller en nyere understøttet LTS-version:

```sh
npm ci
npm start
```

Åbn den lokale adresse, som terminalen viser. Brug `npm run build` til at kontrollere, at appen kan bygges.

## B · Brug jeres eget React-projekt

Vælg en side med knap, inputfelt og kort eller panel. Projektet skal allerede kunne køre lokalt. Behold jeres værktøjer og struktur; I skal ikke installere denne template eller tilføje en chatbot.

Følg [det selvstændige øvelsesark til eget projekt](Oevelser-eget-projekt.md) hele dagen. I skal ikke skifte til chatbotprojektet. Har I allerede tokens og et komponentbibliotek, kortlæg og genbrug dem først.

## Start øvelserne

Åbn **[øvelsesoversigten](Oevelser.md)**, vælg enten chatbotprojektet eller eget projekt, og følg kun det valgte spor hele dagen. Begge spor har samme læringsmål:

Brug også **[Token-cheat-sheet](Token-cheat-sheet.md)** med danske forklaringer, Atlassian-tokennavne og React/CSS-eksempler.

1. Brain starter: Én besked, mange knapper.
2. Saml designbeslutninger i primitive og semantiske tokens.
3. Byg to komponenter med fælles tokens og en arbejdsaftale.
4. Tilføj et mørkt tema.
5. Stresstest med ny brandfarve og kompakt visning.

Hver kodeøvelse har også et valgfrit **Level 2** til de hurtige: en visuel tokenoversigt, flere komponentvarianter, systemtema med gemte præferencer og automatisk kontrol af lokale farveværdier. Løs grundopgaven først; udvidelserne gælder både templaten og eget projekt.

## Find rundt i koden

- `src/App.jsx`: Samtale, demosvar, tema og tæthed.
- `src/components.jsx`: Button, Message og Composer.
- `src/styles.css`: Start-CSS med bevidst gentagne og forskellige designværdier.
- `src/main.jsx`: Startpunkt og CSS-imports.

På `starter` findes knapperne **Mørkt tema** og **Kompakt** som forberedelse til senere øvelser. I denne token-version er de fjernet, så fokus er på fælles designbeslutninger.

Denne branch indeholder token-løsningen. Undervisernoterne er ikke en del af repositoryet.

## Afgrænsning

Tokens implementeres som CSS custom properties. Vi fokuserer på navngivning, genbrug og koordinering frem for eksportværktøjer og tokenformater. Tokens suppleres med fælles komponenter, ejerskab og review.

## Referencer

- [React: komponenter, props og state](https://react.dev/learn)
- [Vite: udviklingsmiljø](https://vite.dev/guide/)
