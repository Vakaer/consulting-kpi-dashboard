# CE Code Review — Consulting KPI Dashboard

- **Repo:** `/Users/waqarmujeeb/Documents/Github/consulting-kpi-dashboard`
- **Branch:** `feat/consulting-kpi-dashboard`
- **Base:** `main...HEAD` (7 commits, U1–U6)
- **Plan:** `docs/plans/2026-09-26-0135-feat-consulting-kpi-dashboard-plan.md`
- **Review focus:** dual-mode API, dashboard/detail routes, filters debounce, table keyboard nav, CI/README
- **Tests at review time:** 12 files / 21 tests passing (`bun run test`)

---

## Actionable Findings

### [HIGH] Search debounce can overwrite a concurrent status filter change

**File:** `src/components/EngagementFilters.tsx:44-52`

**Issue:** The debounce effect intentionally omits `value` from its dependency array, then calls `onChange({ ...value, search: searchDraft })` with a stale `value` closure. If the user changes **Status** while a search debounce timer is pending, the delayed `onChange` restores the previous `status` and drops the user's status selection.

**Failure scenario:**

1. Filters are `{ status: 'all', search: '' }`.
2. User types `"north"` (timer starts with closed-over `value.status === 'all'`).
3. Before `DEBOUNCE_MS` (250ms), user selects Status → Active (parent becomes `{ status: 'active', ... }`).
4. Timer fires → `onChange({ status: 'all', search: 'north' })`.
5. **Outcome:** Status snaps back to All; Active filter is lost.

**Why existing guards do not catch it:** React's exhaustive-deps lint is suppressed; status updates do not cancel or refresh the pending search timeout.

**Fix:** Include current filters in the debounced payload without stale closure — e.g. debounce only the search string, call `onChange` with a functional updater / ref for latest `value`, or cancel/rebind when `value.status` changes; add a regression test that changes status mid-debounce.

```tsx
// Current (stale `value` after intentional dep omission)
onChange({ ...value, search: searchDraft });
```

---

### [MEDIUM] Empty filter message is not centered (R6 / AE3)

**File:** `src/components/EngagementTable.tsx:38-43`

**Issue:** R6 and AE3 require a **centered** empty message when filters match nothing. The empty state is a left-aligned `Typography` with `role="status"` only.

**Fix:** Center the empty state (e.g. `textAlign: 'center'` / flex container with justify center) while keeping `role="status"`.

---

### [MEDIUM] Dual-mode DEV path does not use JSON Server query params (KTD1 / R1)

**File:** `src/api/engagements.ts:35-54`

**Issue:** Plan KTD1 requires DEV to call JSON Server with query params (`status`, `clientName_like`, `/:id`). Implementation always `GET /engagements` (or static `/data/db.json`) then `applyEngagementFilters` client-side. README documents this as intentional for parity, but it diverges from the planning contract and weakens the “real HTTP query practice” learning goal of R1.

**Impact:** Local mock still serves HTTP for list and by-id; filter/search parity (R8/R9) is preserved. Server-side query filtering is unused.

**Fix (if aligning to plan):** In DEV, build `URLSearchParams` for status / `clientName_like` and hit JSON Server; keep client filter only for static/prod. Add tests for the `VITE_API_URL` branch. If keeping client-only filters, update the plan/KTD1 note so contract and code match.

---

### [MEDIUM] Table Enter test does not assert navigation (AE4)

**File:** `src/components/EngagementTable.test.tsx:63-70`

**Issue:** The test focuses a row, presses Enter, then only asserts the row is still in the document. It does not assert route change to `/engagements/$id`, so AE4 keyboard open-detail is not actually verified.

**Fix:** Assert `router.state.location.pathname === '/engagements/eng-1'` (or equivalent history entry) after Enter.

---

### [MEDIUM] No automated coverage for live-HTTP (`VITE_API_URL`) fetch path

**File:** `src/api/engagements.test.ts` (all cases stub `VITE_API_URL` to `''`)

**Issue:** Dual-mode branches in `loadAllEngagements` / `fetchEngagementById` that hit `${base}/engagements` and `${base}/engagements/:id` are untested. Regressions in the local mock-HTTP path would only show up manually.

**Fix:** Add tests with `vi.stubEnv('VITE_API_URL', 'http://localhost:4000')` asserting fetch URLs (and, if KTD1 is restored, query params).

---

### [MEDIUM] App shell brand link bypasses the router (full document navigation)

**File:** `src/components/Layout.tsx:36-38`

**Issue:** Brand uses MUI `Link` with `href="/"`, causing a full page load instead of TanStack client navigation. Detail back control correctly uses router `Link`. Inconsistent SPA behavior; Query cache is dropped on brand click.

**Fix:** Use `@tanstack/react-router` `Link` (or `useNavigate`) for `/`, matching `$id.tsx` `BackLink`.

---

### [LOW] Live demo URL still a placeholder (R12 / R13 DoD)

**File:** `README.md:5`

**Issue:** Live demo is “_Deploy this branch… URL will be linked here after first production deploy._” DoD and R12 expect a working public URL. CI/README structure otherwise looks complete.

**Fix:** Deploy Vercel, paste the URL, smoke AE6 (filter + detail without mock-api).

---

### [LOW] `mock-api` script omits `--watch` from U1 approach

**File:** `package.json` (`mock-api` script)

**Issue:** Plan U1 suggested `json-server --watch mock-api/db.json --port 4000`. Current script is `json-server -p 4000 mock-api/db.json` (no watch). Fine for static mock edits requiring restart; minor DX gap.

---

## Coverage

| Area                           | Plan refs        | Status      | Notes                                                                                     |
| ------------------------------ | ---------------- | ----------- | ----------------------------------------------------------------------------------------- |
| Mock data 6–8 mixed statuses   | R2, R3, U1       | **Met**     | 7 engagements; active/at_risk/completed; `mock-api` ≡ `public/data`                       |
| Dual-mode API                  | R1, R8, R9, KTD1 | **Partial** | Static + client filter + HTTP list/by-id when `VITE_API_URL` set; **no** DEV query params |
| KPI computation                | R4, U2           | **Met**     | `computeDashboardKpis` + unit + dashboard test                                            |
| Dashboard `/`                  | R4, F1, U5       | **Met**     | KPIs, filters, table, skeletons, error+Retry                                              |
| Detail `/engagements/:id`      | R5, F2, U5       | **Met**     | Header, badge, dates, charts, back link                                                   |
| Loading / error / empty        | R6, AE3, AE5     | **Mostly**  | Skeleton + Retry good; empty message present but **not centered**                         |
| Filter debounce                | R4, AE2          | **Mostly**  | Debounce present (~250ms); **HIGH race** with status                                      |
| Table a11y + keyboard          | R7, AE4          | **Mostly**  | Real `<table>`, `scope="col"`, `tabIndex`, Enter/Space; Enter test weak                   |
| KPI a11y labels                | R7               | **Met**     | Combined `aria-label` on `KpiCard`                                                        |
| Filter labels                  | R7               | **Met**     | Search textbox label; Status `labelId`                                                    |
| Theme / jsdom / styled-over-sx | U3, KTD5–6       | **Met**     | Wired; Layout main landmark                                                               |
| DEV-only router tools          | KTD8, R13        | **Met**     | Gated on `import.meta.env.DEV`                                                            |
| Tests volume                   | R10              | **Met**     | 21 tests across API, KPI, components, pages                                               |
| CI Bun lint/test/build         | R11, KTD7, U6    | **Met**     | `.github/workflows/ci.yml`                                                                |
| README Bun + AI fix            | R12, R14         | **Mostly**  | Strong Development Process write-up; live URL placeholder                                 |
| Vercel SPA                     | KTD3, R8         | **Met**     | `vercel.json` rewrite; static `/data/db.json`                                             |
| Live deploy DoD                | R13, AE6         | **Open**    | Not verified in-repo (URL placeholder)                                                    |
| Lighthouse a11y ≥ 90           | R13              | **Open**    | Not evidenced in branch                                                                   |

---

## Review Summary

| Severity | Count | Status |
| -------- | ----- | ------ |
| CRITICAL | 0     | pass   |
| HIGH     | 1     | warn   |
| MEDIUM   | 5     | info   |
| LOW      | 2     | note   |

**Verdict: WARNING** — Fix the filter debounce status race before merge; address empty-state centering and tighten AE4 / HTTP-path tests. Remaining items are plan/DoD follow-through (live URL, optional KTD1 alignment).

No CRITICAL security issues found (no secrets in source, React text escaping for engagement fields, static portfolio data, no auth surface).

---

## Verdict

**WARNING** — shippable after the HIGH debounce fix; MEDIUM items recommended in the same PR or a fast follow. Approve once the debounce race is fixed and empty-state centering (R6) is confirmed.
