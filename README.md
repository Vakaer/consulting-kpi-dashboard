# Consulting KPI Dashboard

A React portfolio app for scanning consulting engagement health. Filter engagements, review KPI summaries, and open a detail view with budget vs actuals and timeline charts.

**Live demo:** Deploy this branch to Vercel (static build; no JSON Server). Add the production URL here after the first deploy.

## Features

- Engagement list with search and status filters
- Client-side KPIs: active count, total budget, at-risk count, average % complete
- Detail route with budget vs actuals and timeline charts
- Loading, error, and empty states
- Responsive layout with horizontal table scroll on small screens

## Tech stack

| Layer      | Choice                                      |
| ---------- | ------------------------------------------- |
| UI         | React 19, TypeScript, Vite, MUI, Emotion    |
| Data       | TanStack Query, TanStack Router, Recharts   |
| Tooling    | Bun, Vitest, Testing Library, ESLint, Husky |
| Local API  | JSON Server (`mock-api/db.json`)            |
| Production | Static `public/data/db.json` (no mock API)  |

## Prerequisites

- [Bun](https://bun.sh) 1.4+

## Getting started

```bash
bun install
cp .env.example .env.development   # optional; enables mock HTTP
bun run dev:all                    # Vite + JSON Server on :4000
```

Or run services separately:

```bash
bun run mock-api   # http://localhost:4000
bun run dev        # Vite app
```

Without `VITE_API_URL`, the client loads `/data/db.json` and filters in the browser — the same path used on Vercel.

## Scripts

| Script                | Purpose                           |
| --------------------- | --------------------------------- |
| `bun run dev`         | Vite only                         |
| `bun run mock-api`    | JSON Server on port 4000          |
| `bun run dev:all`     | Vite + mock API concurrently      |
| `bun run test`        | Vitest (unit / component)         |
| `bun run test:ui`     | Vitest UI                         |
| `bun run lint`        | ESLint                            |
| `bun run check-types` | TypeScript project build check    |
| `bun run format`      | Prettier                          |
| `bun run build`       | Typecheck, lint, test, then build |
| `bun run preview`     | Preview production build          |

## Project structure

```
src/
  api/                 # Engagement fetchers, KPI helpers, Query hooks
  components/          # Shared UI (Layout, StatusBadge)
  features/
    engagements/       # Domain UI (filters, table, KPIs, charts)
  routes/              # TanStack file-based routes
  providers/           # Theme and QueryClient
  constants/           # API endpoints, query keys, layout tokens
  types/               # Shared TypeScript types
  utils/               # Formatting and logging helpers
mock-api/              # Local JSON Server data
public/data/           # Static data for production / Vercel
```

## Data modes

| Environment                 | Source                       | Filtering   |
| --------------------------- | ---------------------------- | ----------- |
| Local + API                 | `VITE_API_URL` → JSON Server | Client-side |
| Local / Vercel (no env var) | `/data/db.json`              | Client-side |

Both modes load the full engagement list, then apply filters in the client so local and production stay in parity.

## Testing and CI

```bash
bun run test
bun run lint
bun run check-types
```

GitHub Actions (`.github/workflows/ci.yml`) runs install, lint, test, and build on push and pull request.

## Deploy (Vercel)

1. Import the repo and select the Vite framework preset.
2. Install command: `bun install`
3. Build command: `bun run build`
4. Output directory: `dist`
5. Do **not** set `VITE_API_URL` in production — the app serves `/data/db.json`.
6. SPA deep links are covered by `vercel.json` rewrites to `index.html`.

## Development notes

Built with AI-assisted planning and implementation on the existing scaffold.

**Example judgment call:** An early `EngagementFilters` draft put `aria-label` on a styled MUI `TextField` wrapper. Tests typed into the wrapper instead of the real `<input>`, so debounce never fired. Fix: bind the label via `slotProps.htmlInput` on the actual textbox.

Other product decisions: static mock for the live demo (no hosted API), Bun for scripts, and dual-mode data loading with client-side filters for local/production parity.

## License

MIT © Muhammad Waqar Hussain
