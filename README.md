# Educational Development Team — Public Site

Interactive portfolio showcase for the Educational Development Team: educational apps
with categorized filtering, search, light and dark modes, and interactive mini-demos.

## Requirements

- Node.js >= 20
- pnpm >= 10 (`corepack enable pnpm`)

## Run locally

```bash
pnpm install
pnpm dev
```

The dev server runs on http://localhost:3000.

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server on port 3000 |
| `pnpm build` | Production build to `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` | Type-check with `tsc --noEmit` |
| `pnpm clean` | Remove `dist/` |

## Stack

- React 19
- Vite 6
- TypeScript 5.8
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- lucide-react (icons), motion (animation)
