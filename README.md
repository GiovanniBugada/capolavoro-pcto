# Capolavoro PCTO 2025–26 — Dall'informatica al territorio

**Giovanni Bugada** · 5A INF · ISISS Valle Seriana · Gazzaniga (BG)

Sito web monopagina che racconta il percorso PCTO presso lo **Studio Tecnico Geom. Sergio Grassi**: AutoCAD, rilievi sul campo, planimetrie catastali — e i collegamenti con le materie del 5° anno di Informatica.

## Stack

- **Next.js 14** (App Router) + **TypeScript** strict
- **Tailwind CSS** con design tokens custom
- **Framer Motion** — animazioni UI
- **React Three Fiber + drei** — scene 3D (edificio wireframe, campo stellare)
- **GSAP / Lenis** — smooth scroll
- **Static export** (`output: 'export'`) — deploy su GitHub Pages

## Sviluppo locale

```bash
npm install
npm run dev          # apre http://localhost:3000
```

## Build statica

```bash
npm run build        # genera la cartella out/
```

La cartella `out/` è un sito completamente statico, deployabile ovunque.

## Deploy GitHub Pages

Il workflow `.github/workflows/deploy.yml` builda e pubblica automaticamente la cartella `out/` su GitHub Pages a ogni push sul branch `main`.

URL pubblico: **https://giovannibugada.github.io/capolavoro-pcto/**

Per abilitare GitHub Pages la prima volta:

1. Push del codice su GitHub (`git push origin main`)
2. Vai su `Settings → Pages` del repo
3. In *Source* scegli **GitHub Actions**
4. Il workflow gira da solo al prossimo push

## Struttura

```
app/
├── layout.tsx               root layout (font, Lenis, cursor)
├── page.tsx                 monta tutte le 15 sezioni
├── globals.css              tokens base + utilities
└── sections/
    ├── Loader.tsx           00 caricamento cinematografico
    ├── Hero.tsx             01 cover + edificio 3D + topografia
    ├── Manifesto.tsx        02 pinned scroll con cambio colore
    ├── Index.tsx            03 sommario magnetic
    ├── StudioGrassi.tsx     04 il contesto + illustrazione scrivania
    ├── SettoriGeometra.tsx  05 bento 4 tile (Catasto, Edilizia, ecc.)
    ├── Aspettative.tsx      06 split cream/ink
    ├── QuattroAree.tsx      07 4 card color-block (AutoCAD, Rilievi, ecc.)
    ├── AutoCAD.tsx          08 building 3D + chips
    ├── Rilievi.tsx          09 mappa topo + 4-step + triangolazione
    ├── Planimetrie.tsx      10 pianta auto-disegnata + bullet
    ├── Materie.tsx          11 tabella PCTO ↔ materie
    ├── Verticali.tsx        12 3 grandi card colorate
    ├── Skills.tsx           13 progress bar + soft skills
    └── Chiusura.tsx         14 stelle + frase finale

components/
├── 3d/
│   ├── BuildingWireframe.tsx   R3F edificio 3 piani con finestre
│   ├── TopoBackground.tsx      curve di livello SVG morph 25s
│   ├── StarsField.tsx          R3F particle stars + montagne parallasse
│   ├── FloorPlanDraw.tsx       SVG pianta auto-disegnata
│   ├── DeskScene.tsx           SVG scrivania geometra (oggetti scaglionati)
│   └── TopoMap.tsx             SVG mappa rilievo + triangolazione
├── ui/
│   ├── CustomCursor.tsx        cerchio + dot con lag
│   ├── ProgressBar.tsx         barra ambra alto pagina
│   ├── SlideCounter.tsx        contatore sezione corrente
│   ├── MagneticLink.tsx        link che attira il cursore
│   ├── SplitText.tsx           reveal per parola/carattere
│   └── Counter.tsx             count-up percentuali
└── providers/
    └── LenisProvider.tsx       smooth scroll

lib/
├── animations.ts          easing curves, durations, variants Framer
└── utils.ts               cn, clamp, lerp, mapRange
```

## Note di accessibilità

- `prefers-reduced-motion` rispettato: Lenis disabilitato, animazioni ridotte.
- Focus visibili (`outline: 2px solid amber`).
- Semantic HTML (`<section>`, `<h1>`-`<h3>`, `aria-label` su titoli con SplitText).
- Contrasto WCAG AA: ink #0a0a0a su cream #fafaf7 (≈19:1).

## Performance

- Tutti i componenti 3D sono `dynamic({ ssr: false })` → lazy load.
- Static export: nessun JS server-side, hosting CDN puro.
- Font tramite `next/font/google` (variable, subset latin, swap).

---

*Capolavoro per l'Esame di Stato 2025–2026.*
