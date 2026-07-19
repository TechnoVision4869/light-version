# Project data model

- `src/data/layers.js` re-exports `DATA`/`PATH`/`CONFIG` from exactly **one** `src/data/project-*.js` file — only one import may be uncommented at a time.
- Each `project-*.js` exports:
  - `projectPath` — must match a folder under `public/projects/<slug>/`.
  - `config` — feature flags + panorama zoom/pitch/yaw ranges.
  - `DEVELOPER_*` — full nav tree: `surroundings` → `amenities` → `zones` → `properties` (towers/villas) → `floors` → `units`, plus a top-level `unitTypes` dict keyed by `unitTypeId`.
- Video naming convention on every nav node: `idleVideo` (loops), `forwardVideo` (transition in), `reverseVideo` (transition out), `zoomoutVideo` (detail → overview).
- **Unit-level `idleVideo` is often a static `.png` floor plan, not an `.mp4`** — the video player handles both transparently. Don't assume `.mp4` when touching unit rendering.
- **In API mode, asset URLs don't expose a file extension** — don't sniff `.mp4`/`.png` from the URL to distinguish video vs. image (that only works in static mode). The real kind is the asset's `type` (video/image/thumbnail/panorama), propagated during enrichment as a `${field}Type` sibling (e.g. `idleAssetId` → `idleAssetType`) — check that instead.
- **A fetched Project entity never carries its own `developerId`** (confirmed via live API testing, not just a schema assumption) — `AdminDashboard.jsx` works around this by injecting it from tree context (`dev.id`). Anywhere else that needs a project's developer, thread it from the selection context that already knows it (`SelectionFlow`'s picked developer, or `user.developerId` for pre-assigned roles) — don't read it off the project object.
- Pin/hotspot positions (`x`, `y`) are normalized 0–1 coordinates relative to the video frame, not pixels.
- All asset paths are string templates built from `projectPath` — moving/renaming a project folder means updating `projectPath`, not every path individually.

Full schema + a worked example for adding a new project: DOCUMENTATION.md §5 and §15.
