# CLAUDE.md

Public portfolio site for the Educational Development Team. Single-page React app that
showcases educational apps with category filtering, search, light/dark themes, and
interactive mini-demos.

## Package manager: pnpm only

This project is pnpm-only. `preinstall` runs `npx only-allow pnpm`, and
`package-lock.json` / `yarn.lock` / `bun.lockb` are gitignored. Never suggest
`npm install` or `yarn`.

```bash
pnpm install     # install dependencies
pnpm dev         # dev server on :3000
pnpm build       # production build to dist/
pnpm preview     # serve the production build
pnpm lint        # tsc --noEmit
pnpm clean       # rm -rf dist
```

Node >= 20, pnpm >= 10 (pinned via `packageManager` in package.json).

## No AI / Gemini

There is no LLM integration in this project. `@google/genai`, the AI Studio server-proxy
scaffold (`express`, `dotenv`, `tsx`, `@types/express`), the `GEMINI_API_KEY` wiring, and
the `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` metadata flag were all removed. There is no
`.env` file and none is needed. Do not reintroduce an AI SDK without being asked.

## Stack

- React 19 + TypeScript 5.8
- Vite 6 (`vite.config.ts`, `@` alias → project root)
- Tailwind CSS 4 via `@tailwindcss/vite` — no `tailwind.config.js`; theme lives in
  `src/index.css`
- `lucide-react` for icons, `motion` for animation

## Layout

- [src/main.tsx](src/main.tsx) — React root
- [src/App.tsx](src/App.tsx) — all app state: dark mode (persisted to `localStorage`
  under `edt_theme`), category filter, search, and which project detail page is open.
  There is no router; view switching is state-driven.
- [src/types.ts](src/types.ts) — `EducationalApp`, `Category`, `DemoType`
- [src/data/appsData.ts](src/data/appsData.ts) — `EDUCATIONAL_APPS`, the content source
  of truth. Adding an app means adding an entry here.
- [src/components/](src/components/) — `Navbar`, `HeroSection`, `AppCard`,
  `ProjectDetailPage`, `InteractiveAppDemo`, `Footer`
- [src/index.css](src/index.css) — Tailwind entry, theme tokens, system font stack
- [src/assets/images/](src/assets/images/) — app preview screenshots, imported by Vite

## Conventions

- Fonts are a system stack in `src/index.css`. If Google Fonts are added later, keep them.
- Each demo in `InteractiveAppDemo` is keyed off `DemoType`; a new demo needs a new
  `DemoType` union member plus a branch there.
- Type-check with `pnpm lint` before considering a change done.
