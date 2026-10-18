# Øvelser · Én chatbot, mange udviklere

I videreudvikler en lille React-chatbot. Jeres mål er, at andre udviklere eller AI-agenter kan tilføje komponenter, uden at designet begynder at variere.

## Vælg jeres udgangspunkt

**Spor A · Hent templaten:** Vælg først branchen **starter** (startkode uden tokens), vælg derefter **Code → Download ZIP**, og udpak projektet. Standardbranchen main indeholder token-løsningen. I kan også forke eller klone det. Templaten indeholder en lille React-chatbot med komponenter og CSS, som I arbejder videre på. Start den efter vejledningen i README. Chatbotten har faste demosvar og kræver ingen API-nøgle.

**Spor B · Brug eget React-projekt:** Vælg en eksisterende side med mindst en knap, et inputfelt og et kort eller panel. Projektet skal kunne køre lokalt. Brug jeres egne komponenter i stedet for chatbot-komponenterne. I behøver ikke tilføje en chatbot.

Begge spor har samme læringsmål og afleveringer. Arbejd i par. Aftal, hvem der skriver, og hvem der reviewer; byt efter første øvelse.

### Level 1 og Level 2

Hver kodeøvelse har en fælles grundopgave (**Level 1**) og en valgfri udvidelse (**Level 2**) til jer, der bliver hurtigt færdige. Gennemfør først grundopgaven og dens tjek. Vælg derefter Level 2 i den aktuelle øvelse; I behøver ikke løse alle udvidelser. Deltag stadig i fælles oplæg og afslutning. Ufærdige udvidelser kan bruges som hjemmearbejde.

Level 2 gælder begge spor. Brug tilsvarende komponenter og projektets eksisterende værktøjer, hvis I arbejder i eget projekt.

## 0 · Brain starter (8.15–8.25)

Alle får samme besked: **“Lav en tydelig knap, der leder tilbage til forrige side.”**

1. Skitser alene i ét minut. Vælg selv tekst, farve, form og størrelse.
2. Sammenlign i par. Hvad er forskelligt? Hvad betyder “forrige side” for jer?
3. Saml op i plenum: Hvilke designbeslutninger skal være fælles?

Tal også om grænsen: Tokens kan koordinere udseendet, men afgør ikke, hvor knappen navigerer hen.

## 1 · Fra faste værdier til fælles tokens (9.00–9.25)

**Problem:** Flere har stylet chatbotten. Knapper og beskeder bruger forskellige afrundinger, og farver og afstande gentages.

**Eget projekt:** Find gentagne værdier og forskelle i jeres eksisterende styles. Fx bruger flere knapper måske samme blå farve, mens to knapper med samme funktion utilsigtet har forskellig afrunding. Aftal, hvilke designvalg der skal være fælles; forskellige komponenter behøver ikke se ens ud.

**`tokens.css` er fælles: Single source of truth.** Saml de fælles designbeslutninger i denne fil. Mange komponenter og deres forskellige CSS-filer kan bruge de samme tokens gennem `var(--...)`. Ændrer I en fælles token, følger alle de steder, der bruger den, med. I skal altså ikke kopiere tokenværdier ind i hver komponentfil.

I behøver ikke samle al styling i én CSS-fil. Behold fx `Button.css` og `Card.css` til komponenternes layout og styling; lad dem hente fælles farver, afstande og afrundinger fra `tokens.css`.

```text
tokens.css  → fælles tokennavne og værdier
Button.css  → bruger tokens med var(--...)
Card.css    → bruger de samme fælles tokens
```

Importer `tokens.css` én gang ved appens start, fx i `main.jsx`. De komponenter, der skal bruge variablerne, skal ligge under det element, hvor de er defineret: `:root` gør dem tilgængelige via arv på hele HTML-siden; `.app` afgrænser dem til appens efterkommere. En lokal overskrivning kan ændre værdien inden for et mindre område.

Bruger I allerede tokens eller et komponentbibliotek, så undersøg først, hvilke fælles designvalg og temamuligheder der findes. Genbrug eller tilpas det eksisterende system frem for at lave en konkurrerende tokenfil. Find derefter lokale, faste værdier i jeres egen styling, der bør bruge systemets fælles tokens. Vælg efter funktion, ikke kun fordi to farver ser ens ud.

1. Åbn `src/styles.css`. Find gentagne værdier og inkonsekvente valg.
2. Opret `src/tokens.css`, og importer den før `styles.css` i `main.jsx`.
3. Aftal en lille skala for farver, afstande og afrunding. Opret primitive tokens, fx `--blue-600`, `--space-3` og `--radius-small`.
4. Opret semantiske tokens, fx `--color-text`, `--color-surface`, `--color-action` og `--radius-control`.
5. Brug semantiske farvetokens i komponenternes CSS. Brug skalaen til gentagne afstande. Ensret afrunding, hvor det giver mening.

**Hvad skal I kigge efter?**

- **Gentagne værdier:** Den samme konkrete CSS-værdi står flere steder. Fx bruges `#2457d6` som baggrund på både Send-knappen og brugerens besked, og `#ffffff` bruges som tekstfarve på begge. Det er ikke nødvendigvis en fejl. Undersøg, om stederne deler en designbeslutning, som kan få et fælles tokennavn. To ens værdier kan også have forskellige formål og derfor kræve forskellige semantiske tokens.
- **Inkonsekvente valg:** Elementer, der efter jeres designaftale burde følge samme regel, bruger forskellige værdier. I startkoden har den primære knap fx `border-radius: 8px`, mens den sekundære knap har `border-radius: 5px`. Hvis begge skal have samme form, er det en inkonsistens, som et fælles `--radius-control` kan rette.

I skal altså undersøge **hvad der går igen**, og **hvad der varierer uden en god grund**. Forskellige værdier er ikke automatisk forkerte: En overskrift og en hjælpetekst kan med god grund have forskellige skriftstørrelser. Begrund, hvilke forskelle I beholder, og hvilke I ensretter.

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

### Level 2 · Kan andre forstå jeres tokens?

**Udfordring:** En ny udvikler skal kunne vælge rigtigt uden at spørge jer.

**Det skal I bygge:** Et lille visuelt katalog over jeres designvalg. Vi kalder React-komponenten `TokenPreview`. Navnet betyder “forhåndsvisning af tokens”; komponenten findes ikke i React i forvejen. I skal selv oprette den.

Kataloget hjælper en ny udvikler med at se, hvilke tokens der findes, hvordan de ser ud, og hvornår de skal bruges.

1. Opret `TokenPreview.jsx`, og vis komponenten et sted i jeres app, fx under chatbotten. I eget projekt kan I vælge en tilsvarende placering.
2. Vis følgende eksempler med de tokens, I har oprettet:
   - **Farver:** Et felt med rigtig tekst og baggrund. Skriv tokennavnene ved siden af, fx `--color-text` og `--color-surface`. Vis også et andet relevant farvepar, fx en handlingsknap og dens tekst.
   - **Afstande:** Tre bokse med forskellig indvendig afstand fra jeres skala, fx `--space-2`, `--space-4` og `--space-6`. Skriv navnet på hver token, så forskellen er let at sammenligne.
   - **Afrunding:** Bokse med jeres forskellige radius-tokens. Skriv også her tokennavnene.
3. Brug `var(--...)` i eksemplernes CSS. Farvefeltet må altså ikke få en manuelt kopieret hexværdi; det skal bruge den samme token som appen.
4. Skriv en kort vejledning til mindst fem **semantiske** tokens: navn, hvad den bruges til, og et eksempel på forkert brug. Fx: `--color-text` bruges til almindelig tekst, ikke som baggrundsfarve. Forklar også, hvornår teamet må oprette en ny token. Har I endnu ikke fem, så aftal relevante roller ud fra den eksisterende side.
5. Lad makkeren bygge et lille informationspanel ved hjælp af kataloget og vejledningen uden at opfinde nye farver.

**Lille React-eksempel til at komme i gang:** Tilpas navnene til jeres egen tokenfil, og udvid derefter med afstande og afrundinger.

```jsx
export function TokenPreview() {
  return (
    <section>
      <h2>Vores design tokens</h2>
      <p>Tekst: --color-text. Baggrund: --color-surface.</p>
      <div style={{
        color: 'var(--color-text)',
        background: 'var(--color-surface)',
        padding: 'var(--space-4)',
      }}>
        Sådan ser almindelig tekst på vores overflade ud.
      </div>
    </section>
  );
}
```

Vis den ved at importere komponenten i `App.jsx` og indsætte `<TokenPreview />` **inde i den wrapper, der definerer jeres semantiske tokens**, fx `.app`. Så kan forhåndsvisningen arve værdierne.

**Aflever:** En visuel tokenoversigt og en kort tokenvejledning i Markdown.

**I er færdige, når:** Tokennavnene står ved de visuelle eksempler, alle eksempler bruger jeres faktiske tokens, og makkeren kan vælge tokens ud fra vejledningen. Lad fx en semantisk farvetoken pege på en anden eksisterende primitiv token: Både kataloget og appen skal følge med. Behold palettens navne og værdier meningsfulde; lad ikke en grøn primitiv token skifte til sort. Temaer er ikke nødvendige for at løse denne opgave. Layoutværdier må gerne være lokale; begrund, hvad I vælger at dele.

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

### Level 2 · Udvid komponenten uden at kopiere den

**Udfordring:** Flere udviklere vil have hver deres knapvariant. I skal holde interfacet overskueligt.

1. Udvid den fælles `Button` med `size="small" | "medium"` og `variant="danger"` til destruktive handlinger. Brug medium som standard, så eksisterende knapper fortsat virker.
2. Definer semantiske tokens til danger-baggrund, tekst og hover samt afstandstokens til størrelserne. Brug danger til “Ny samtale”, som rydder beskederne, eller en tilsvarende handling i eget projekt.
3. Lav en lille komponentoversigt, der viser begge størrelser og alle tre varianter i normal og disabled tilstand. Kontroller også hover og tastaturfokus.
4. Dokumenter props og skriv et kort eksempel på en instruktion til en AI-agent, der skal genbruge komponenten. Det er ikke nødvendigt at have en AI-konto.

**Aflever:** Én udvidet Button, en komponentoversigt og en dokumenteret aftale om dens props.

**Tjek:** Er tidligere brug af Button stadig intakt? Virker `type="submit"`, `onClick`, `disabled` og `aria-*` stadig? Skal der en ny komponent til, hver gang en udvikler ønsker en anden farve? Tag de nye varianter med i den næste temaøvelse.

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

### Level 2 · Følg systemet, men respekter brugerens valg

**Udfordring:** Brugeren skal kunne vælge **Lyst**, **Mørkt** eller **System**.

1. Erstat temaknappen med et navngivet select-felt eller en tydelig gruppe af knapper med de tre valg.
2. Gem brugerens valg i `localStorage`. Gem præferencen `system`, ikke blot den farvetilstand, systemet tilfældigvis har lige nu.
3. Brug `prefers-color-scheme` til at afgøre det aktive tema, når valget er System. Følg også ændringer i systemtemaet, mens appen er åben. Fjern event listeners, når React-effekten rydder op.
4. Hold brugerens præference adskilt fra det aktive tema. Et eksplicit valg af Lyst eller Mørkt skal have forrang frem for systemet.

**Aflever:** Tre temavalg, som huskes ved genindlæsning. Husk semantiske tokens til den nye kontrol.

**Tjek:** Afprøv uden gemt præference, efter genindlæsning og ved systemskift med appen åben. Test, at et eksplicit valg ikke ændres af systemet. Brug eventuelt browserens udviklerværktøjer til at simulere lyst og mørkt systemtema.

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

### Level 2 · Fang brud på aftalerne automatisk

**Udfordring:** En ellevte udvikler tilføjer en lokal farvekode. Hvordan opdager I det før review?

1. Tilføj et tjek, der finder direkte farveværdier i komponenternes styles, fx hex, rgb/rgba, hsl/hsla og navngivne farver. Brug projektets eksisterende lintværktøj eller et lille script. Tokenfiler skal være undtaget.
2. Aftal tilladte undtagelser, fx `transparent`, `currentColor` og `inherit`. Dokumenter, hvilke filer og farveformater tjekket faktisk dækker. Et simpelt teksttjek behøver ikke kunne fortolke al CSS.
3. Tilføj en kommando, fx `npm run check:tokens`. Den skal afslutte med fejlstatus, når en regel brydes, og vise filen med problemet.
4. Indsæt bevidst en ulovlig farve i en komponent. Vis, at tjekket fejler. Ret den til en token, og vis, at tjekket passerer. Test også en tilladt værdi i tokenfilen.

**Aflever:** Tjekket, kommandoen og et kort eksempel på fejl og rettelse.

**Tjek:** Fanger I både en ny farve i CSS og en inlinefarve i JSX? Hvis ikke, skriv begrænsningen tydeligt. Forklar ét designproblem, som tjekket ikke kan opdage, fx brug af den forkerte semantiske token.

**Ekstra, hvis I stadig har tid:** Kør det samme tjek og projektets build i GitHub Actions ved push og pull request. Hold workflowet fri for API-nøgler og andre hemmeligheder.

## Fælles afslutning (11.10–11.30)

Vis én designbeslutning, I har ændret, og forklar hvor mange steder den påvirkede.

Exit ticket: Skriv tre regler til den næste udvikler eller AI-agent, der skal arbejde videre på chatbotten. Nævn også ét problem, som tokens ikke løser.
