# A&P Flashcards — Astro + PWA + CSV→JSON Starter

Offline-first flashcards for anatomy & physiology. Author decks in CSV, build produces JSON, deploy anywhere (Vercel/Netlify/GitHub Pages).

## Quick start

```bash
# 1) install
npm i

# 2) run dev
npm run dev

# 3) build (csv -> json, then static site)
npm run build

# 4) preview prod build
npm run preview
```

Open http://localhost:4321

## Authoring decks

Edit CSV files in `./decks`. Columns:

- `image` (path under `/public`, e.g. `/images/skull_lateral.svg`)
- `answer` (what the card reveals on flip)
- `alt` (accessible alt text for the image)
- `deck` (logical grouping)

Export from Excel/Sheets as CSV and drop into `./decks`. On build, files are converted to JSON in `public/decks/*.json`.

Example row:

```csv
/images/skull_lateral.svg,Temporal bone,"Temporal bone (lateral view)",Bones
```

## Add more decks

Add another CSV to `./decks`, then **register it** in `src/pages/index.astro` in the `decks` array:

```js
const decks = [
  { name: 'Anatomy: Bones', file: 'anatomy-bones.json' },
  { name: 'Anatomy: Muscles', file: 'anatomy-muscles.json' }
];
```

## Images

Place images under `public/images/...`. For best performance, keep width ≤ 1024px and use SVG or compressed PNG/JPG. The PWA caches images for offline use.

## Progress & spaced repetition

Client-side Leitner-style boxes (1..3) are tracked in `localStorage` per-deck. No backend required. If you later want cross-device sync, you can add Supabase and persist the `progress` map per user.

## PWA

- Installable on mobile (Add to Home Screen)
- Offline-first via `@vite-pwa/astro`
- Cached routes: app shell, `/decks/*`, `/images/*`

## Deploy

- Push repo to GitHub, import into Vercel, **framework: Astro**
- Build command: `npm run build`
- Output dir: `dist`

## License of media

Only include media you’re licensed to use (OpenStax/Wikimedia CC-BY, public domain, or your own). Keep attribution within your course materials as needed.
