# Project data model

- `src/data/layers.js` re-exports `DATA`/`PATH`/`CONFIG` from exactly **one** `src/data/project-*.js` file — only one import may be uncommented at a time.
- Each `project-*.js` exports:
  - `projectPath` — must match a folder under `public/projects/<slug>/`.
  - `config` — feature flags + panorama zoom/pitch/yaw ranges.
  - `DEVELOPER_*` — full nav tree: `surroundings` → `amenities` → `zones` → `properties` (towers/villas) → `floors` → `units`, plus a top-level `unitTypes` dict keyed by `unitTypeId`.
- Video naming convention on every nav node: `idleVideo` (loops), `forwardVideo` (transition in), `reverseVideo` (transition out), `zoomoutVideo` (detail → overview).
- **Unit-level `idleVideo` is often a static `.png` floor plan, not an `.mp4`** — the video player handles both transparently. Don't assume `.mp4` when touching unit rendering.
- Pin/hotspot positions (`x`, `y`) are normalized 0–1 coordinates relative to the video frame, not pixels.
- All asset paths are string templates built from `projectPath` — moving/renaming a project folder means updating `projectPath`, not every path individually.

Full schema + a worked example for adding a new project: DOCUMENTATION.md §5 and §15.
