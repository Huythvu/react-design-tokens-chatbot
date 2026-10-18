# Øvelser · Én chatbot, mange udviklere

I videreudvikler en lille React-chatbot. Jeres mål er, at andre udviklere eller AI-agenter kan tilføje komponenter, uden at designet begynder at variere.

## Vælg jeres udgangspunkt

**Spor A · Hent templaten:** Vælg **Code → Download ZIP** i dette GitHub-repository, og udpak projektet. I kan også forke eller klone det. Templaten indeholder en lille React-chatbot med komponenter og CSS, som I arbejder videre på. Start den efter vejledningen i README. Chatbotten har faste demosvar og kræver ingen API-nøgle.

**Spor B · Brug eget React-projekt:** Vælg en eksisterende side med mindst en knap, et inputfelt og et kort eller panel. Projektet skal kunne køre lokalt. Brug jeres egne komponenter i stedet for chatbot-komponenterne. I behøver ikke tilføje en chatbot.

Begge spor har samme læringsmål og afleveringer. Arbejd i par. Aftal, hvem der skriver, og hvem der reviewer; byt efter første øvelse.

## 0 · Brain starter (8.15–8.25)

Alle får samme besked: **“Lav en tydelig knap, der leder tilbage til forrige side.”**

1. Skitser alene i ét minut. Vælg selv tekst, farve, form og størrelse.
2. Sammenlign i par. Hvad er forskelligt? Hvad betyder “forrige side” for jer?
3. Saml op i plenum: Hvilke designbeslutninger skal være fælles?

Tal også om grænsen: Tokens kan koordinere udseendet, men afgør ikke, hvor knappen navigerer hen.

## 1 · Fra faste værdier til fælles tokens (9.00–9.25)

**Problem:** Flere har stylet chatbotten. Knapper og beskeder bruger forskellige afrundinger, og farver og afstande gentages.

**Eget projekt:** Find tilsvarende gentagelser og variationer i jeres eksisterende styles. Arbejd i projektets nuværende struktur; I skal ikke flytte alt til én CSS-fil. Bruger I allerede tokens eller et komponentbibliotek, kortlæg og genbrug dem først. Vælg derefter lokale værdier, der bør kobles på det fælles system.

1. Åbn `src/styles.css`. Find mindst tre gentagne værdier og to inkonsekvente valg.
2. Opret `src/tokens.css`, og importer den før `styles.css` i `main.jsx`.
3. Aftal en lille skala for farver, afstande og afrunding. Opret primitive tokens, fx `--blue-600`, `--space-3` og `--radius-small`.
4. Opret semantiske tokens, fx `--color-text`, `--color-surface`, `--color-action` og `--radius-control`.
5. Brug semantiske farvetokens i komponenternes CSS. Brug skalaen til gentagne afstande. Ensret afrunding, hvor det giver mening.

Eksempel på strukturen, som I selv udvider:

```css
:root {
  --blue-600: #2457d6;
  --neutral-0: #ffffff;
  --space-3: .75rem;
}
.app {
  --color-action: var(--blue-600);
  --color-on-action: var(--neutral-0);
}
.button--primary {
  background: var(--color-action);
  color: var(--color-on-action);
}
```

**Aflever:** Jeres tokenfil og tre sætninger om navngivningen.

**Tjek:** Kan I ændre handlingsfarven ét sted? Har I navngivet efter funktion, hvor temaet kan ændre værdien? Undgå at lave tokens for hver eneste CSS-deklaration.

## 2 · To udviklere, samme chatbot (10.00–10.25)

**Problem:** En udvikler tilføjer forslag til spørgsmål. En anden bygger et panel med hjælp. Begge skal passe ind i samme design.

**Eget projekt:** Vælg to små udvidelser, fx et handlingspanel og et hjælpepanel. De skal begge bruge jeres fælles knapkomponent og tokens. Aftal props og placering før arbejdet. Følg samme arbejdsdeling og review som nedenfor; chatbot-funktionerne er kun nødvendige i template-sporet.

Brug først tre minutter på en fælles aftale:

- Nye komponenter bruger de eksisterende tokens og den fælles `Button`.
- Nye farveværdier placeres i tokenfilen og aftales med makkeren.
- `Button` har varianterne `primary` og `secondary`; man laver ikke en ny knap til hver placering.

Del derefter arbejdet:

**Udvikler A:** Lav `SuggestedQuestions` med knapperne “Hvad er tokens?” og “Hvordan virker temaer?”. Komponenten modtager `onSelect(text)` og bruger `Button` med `variant="secondary"`. App sender `send` som callback.

**Udvikler B:** Lav `HelpPanel` med kort hjælpetekst og en “Luk hjælp”-knap. Komponenten modtager `onClose`. App styrer, om panelet vises, og har en “Vis hjælp”-knap, som åbner det igen.

Opret hver jeres komponentfil og aftal, hvem der integrerer i `App.jsx`, så I undgår at overskrive hinandens ændringer. Placer begge komponenter mellem introduktionsteksten og beskedlisten.

**Aflever:** To komponenter og jeres arbejdsaftale.

**Tjek:** Virker forslagene? Kan hjælpen lukkes og åbnes? Bruger begge komponenter samme knap og tokens? Hvilke beslutninger kunne tokens ikke løse?

Hvis I bruger en AI-agent, giv den aftalen og de relevante filer. Review dens ændringer efter præcis de samme regler.

## 3 · Et mørkt tema (10.25–10.50)

**Problem:** Chatbotten skal fungere både lyst og mørkt. Komponenterne skal beholde deres CSS-regler.

**Eget projekt:** Tilføj et temaskift med React-state og en `data-theme`-attribut på jeres fælles wrapper. Har projektet allerede en temaløsning, bruger I den og undersøger, om de valgte komponenter følger temaet. Begge temaer skal dække den side, I arbejder med.

Første fem minutter er fælles demonstration. Derefter:

1. Find `theme` og `data-theme` i `App.jsx`. Temaknappen skifter allerede værdien.
2. Tilføj `.app[data-theme="dark"]` i tokenfilen.
3. Overskriv semantiske tokens for side, overflade, tekst, kant, handling, beskeder og fokus. Tilføj `color-scheme: dark` i det mørke tema og `color-scheme: light` i standardtemaet.
4. Kontroller også jeres nye komponenter fra øvelse 2.
5. Afprøv hover, tastaturfokus, placeholder og den deaktiverede Send-knap i begge temaer.

**Aflever:** To temaer med de samme komponenter.

**Tjek:** Fungerer tekst og baggrund sammen? Kan I tydeligt se fokus? Mål kontrast for almindelig tekst, sigt efter mindst 4,5:1. En mørk baggrund alene er ikke et komplet mørkt tema.

## 4 · Stresstest: Nyt brand og kompakt visning (10.50–11.10)

I får denne besked: **“Skift brandfarven, og gør chatbotten mere kompakt.”**

**Eget projekt:** Gennemfør samme ændringsønske på den valgte side. Tilføj selv React-state og `data-density` til kompakt visning, eller brug projektets eksisterende mekanisme. Review de samme fire kombinationer og brugerhandlinger, hvor de er relevante for jeres side.

1. Skift handlingsfarven centralt. Husk at teste teksten ovenpå samt hover i begge temaer.
2. Opret semantiske afstandstokens for panelpadding, beskedpadding og afstand mellem beskeder.
3. Find `data-density` i App. Tilføj `.app[data-density="compact"]`, der giver disse tokens mindre værdier.
4. Behold knapperne brugbare; mindre afstand behøver ikke betyde mindre klikflader.
5. Lad et andet par reviewe jeres løsning.

**Aflever:** En ændring, der slår igennem centralt, og én observation fra reviewet.

**Review:** Prøv alle fire kombinationer af lyst/mørkt og normal/kompakt. Send en besked, nulstil samtalen og prøv en lang besked uden mellemrum. Prøv smal mobilbredde og betjen med Tab og Enter. Er der lokale farver, som temaet ikke styrer?

## Fælles afslutning (11.10–11.30)

Vis én designbeslutning, I har ændret, og forklar hvor mange steder den påvirkede.

Exit ticket: Skriv tre regler til den næste udvikler eller AI-agent, der skal arbejde videre på chatbotten. Nævn også ét problem, som tokens ikke løser.
