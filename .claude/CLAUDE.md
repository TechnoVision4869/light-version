# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

- **Light Tour**: React 19 + Vite real estate showcase app, packaged as a native Android app via Capacitor.
- Runs on Android **tablets carried by sales staff and shared between them** — not fixed kiosks. Must tolerate weak/absent connectivity. This shapes real decisions elsewhere (e.g. background downloads are deliberately never auto-cancelled on logout/unmount — see state-management.md).
- Cinematic MP4 transitions + 360° panoramic interiors/balconies.
- Nav hierarchy: Developer → Project → Zones/Amenities/Surroundings → Properties (towers/villas) → Floors → Units.
- Two data modes exist (`USE_STATIC` flag in `src/config/appConfig.js`); **API mode is the primary target going forward** — don't invest in static-mode-only fixes unless asked.
- **Project records from the API never include `developerId`** — don't assume `project.developerId` exists; it must be threaded in from selection context. See data-model.md.
- Path alias: `@/*` → `src/*`.
- Mixed `.jsx`/`.js`/`.ts` — no full TypeScript migration, `allowJs: true`.
- No configured test runner in this repo.
- **Toast notifications**: `react-hot-toast` is already wired up — `<Toaster position="top-center" />` renders globally in `src/main.jsx`. Use its `toast(...)` call from any component; don't build a local/custom toast.
- **Lazy-load heavy dependencies used behind an infrequent action.** Confirmed precedent: `jspdf` (plus its incidental `html2canvas`/`dompurify` pull-through) added ~400KB to the *eager* main bundle when imported at module top-level in `src/lib/generateUnitBrochure.js`; switching `UnitPanel.jsx` to `const { generateUnitBrochure } = await import("../lib/generateUnitBrochure")` inside the click handler moved the whole thing into its own on-demand chunk, fetched only on first use, with zero cost to initial load. Follow this pattern for any future heavy one-off feature — it matters directly for this app's weak-connectivity constraint above.

## Rules

- [.claude/rules/data-model.md](.claude/rules/data-model.md) — project data schema, `layers.js` project switching.
- [.claude/rules/state-management.md](.claude/rules/state-management.md) — Context providers, video-driven navigation.
- [.claude/rules/android-build.md](.claude/rules/android-build.md) — APK build runbook.

`docs/DOCUMENTATION.md` has the full architecture writeup if a task needs more depth than the rules above.

See `docs/` for architecture details, backend gaps, dev setup (`LIVE_RELOAD.md`, OTA updates), and
tracking (`SPRINT_TASKS.md`, `REFACTORING_GUIDE.md`). Check `BACKEND_GAPS.md` before treating API
quirks as new. Kept outside `.claude/` since their audience is broader than Claude — backend owners,
other devs, and (for `OTA_ROLLOUT_PLAN.md`) non-technical stakeholders.

## Conflict Handling

- If a request conflicts with an existing rule/instruction in this file, do NOT silently skip or reject it.
- Flag the conflict explicitly: state which rule it conflicts with and why.
- Ask me to decide how to proceed before taking action.
- Never assume which one (the request or the existing rule) takes priority.

## Commands

```bash
npm run dev       # start Vite dev server (localhost:5173)
npm run build     # production build to dist/ (target es2018, for old Android WebViews)
npm run lint      # ESLint over the repo
npm run preview   # preview the production build
```
