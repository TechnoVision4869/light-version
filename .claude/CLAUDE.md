# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

- **Light Tour**: React 19 + Vite real estate showcase app, packaged as a native Android app via Capacitor.
- Cinematic MP4 transitions + 360° panoramic interiors/balconies.
- Nav hierarchy: Developer → Project → Zones/Amenities/Surroundings → Properties (towers/villas) → Floors → Units.
- Two data modes exist (`USE_STATIC` flag in `src/config/appConfig.js`); **API mode is the primary target going forward** — don't invest in static-mode-only fixes unless asked.
- **Project records from the API never include `developerId`** — don't assume `project.developerId` exists; it must be threaded in from selection context. See data-model.md.
- Path alias: `@/*` → `src/*`.
- Mixed `.jsx`/`.js`/`.ts` — no full TypeScript migration, `allowJs: true`.
- No configured test runner in this repo.

## Rules

- [.claude/rules/data-model.md](.claude/rules/data-model.md) — project data schema, `layers.js` project switching.
- [.claude/rules/state-management.md](.claude/rules/state-management.md) — Context providers, video-driven navigation.
- [.claude/rules/android-build.md](.claude/rules/android-build.md) — APK build runbook.

DOCUMENTATION.md has the full architecture writeup if a task needs more depth than the rules above.

## Commands

```bash
npm run dev       # start Vite dev server (localhost:5173)
npm run build     # production build to dist/ (target es2018, for old Android WebViews)
npm run lint      # ESLint over the repo
npm run preview   # preview the production build
```
