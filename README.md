# Design tokens i React · Token-chatten

PBA Webudvikling · EAAA · 8.15–11.30

**Hvordan holder vi et design sammenhængende, når 10 udviklere eller AI-agenter arbejder på samme projekt?**

I arbejder med fælles tokens, komponenter, temaer og aftaler om samarbejde. Ingen Figma eller API-nøgle er nødvendig. Chatbotten bruger faste demosvar og gemmer kun beskeder i hukommelsen indtil genindlæsning.

## A · Brug denne React-template

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

Følg afsnittene **Eget projekt** i øvelsesarket. Har I allerede tokens og et komponentbibliotek, kortlæg og genbrug dem først.

## Start øvelserne

Åbn **[øvelsesarket](Oevelser.md)**. Begge spor har samme læringsmål:

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

Knapperne **Mørkt tema** og **Kompakt** ændrer allerede React-state og data-attributter. I startversionen ændrer de ikke udseendet. Det implementerer I med tokens og CSS i øvelserne.

Løsningsforslaget og undervisernoterne er ikke en del af dette repository.

## Afgrænsning

Tokens implementeres som CSS custom properties. Vi fokuserer på navngivning, genbrug og koordinering frem for eksportværktøjer og tokenformater. Tokens suppleres med fælles komponenter, ejerskab og review.

## Referencer

- [React: komponenter, props og state](https://react.dev/learn)
- [Vite: udviklingsmiljø](https://vite.dev/guide/)
