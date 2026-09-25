# Consulting KPI Dashboard

Portfolio React app for scanning consulting engagement health: filter the list, read four KPI cards, and open a detail view with budget vs actuals and timeline charts.

**Live demo:** _Deploy this branch to Vercel (static build; no JSON Server). URL will be linked here after first production deploy._

## Tech stack

- React 19 + Vite + TypeScript
- MUI + Emotion
- TanStack Query + TanStack Router
- Recharts
- Vitest + Testing Library
- Bun (package manager and scripts)
- JSON Server (local mock HTTP only)
- Static `public/data/db.json` for production / Vercel

## Local development

```bash
bun install
cp .env.example .env.development   # optional; sets VITE_API_URL for mock HTTP
bun run dev:all                    # Vite + JSON Server on :4000
```

Two-terminal alternative:

```bash
bun run mock-api   # http://localhost:4000
bun run dev        # Vite
```

Without `VITE_API_URL`, the client loads `/data/db.json` and applies filters in the browser (same path used on Vercel).

### Scripts

| Script             | Purpose                  |
| ------------------ | ------------------------ |
| `bun run dev`      | Vite only                |
| `bun run mock-api` | JSON Server on port 4000 |
| `bun run dev:all`  | Both concurrently        |
| `bun run test`     | Vitest                   |
| `bun run lint`     | ESLint                   |
| `bun run build`    | Production build         |
| `bun run preview`  | Preview production build |

## Testing and CI

- Unit/component tests: `bun run test`
- Lint: `bun run lint`
- GitHub Actions (`.github/workflows/ci.yml`): install with Bun, lint, test, build on push/PR

## Deploy (Vercel)

1. Import the repo in Vercel (framework: Vite).
2. Build command: `bun run build` (or default Vite). Install: `bun install`.
3. Output: `dist`.
4. Do **not** set `VITE_API_URL` in production — the app uses `/data/db.json`.
5. `vercel.json` rewrites all routes to `index.html` for SPA deep links.

## Development Process (AI-assisted)

This project was planned and implemented with AI pair-programming (`ce-brainstorm` → `ce-plan` → `ce-work`).

**Concrete AI defect and fix:** The first draft of `EngagementFilters` put `aria-label="Search engagements"` on the MUI `TextField` root via a `styled()` wrapper. In tests, `userEvent.type` targeted that wrapper and never updated the real `<input>`, so the debounce `onChange` never fired and the input stayed empty. Fix: pass `slotProps.htmlInput={{ 'aria-label': 'Search engagements' }}` on an unstyled `TextField` so the label binds to the actual textbox.

Other judgment calls kept in the product contract: static mock for the live demo (no hosted mock API), Bun instead of npm for scripts, and dual-mode API that always loads the full list then filters client-side so local JSON Server and production stay in parity.
