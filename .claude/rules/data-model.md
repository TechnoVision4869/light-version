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
- **`assetApi.getByDeveloper(...)` silently truncates without an explicit `limit`** — the backend appears to paginate with a default page size smaller than a typical developer's full asset count. Always pass `{ developerId, limit: 1000 }` (matching `AssetsLibrary.jsx`'s established pattern) when you need a developer's *entire* asset list — omitting `limit` previously caused `enrichProjectData.js`'s `buildAssetTypeMap` to silently miss assets, resolving their `*Type` fields to `null`.
- **A changed asset file always gets a new URL — confirmed, not an assumption.** Editing/replacing an asset's content always produces a new asset id (and therefore a new `assets/file/:id` URL); there is no "swap the file under a stable URL" path anywhere in this app's tooling. This is load-bearing for the Service Worker's Cache-First strategy (`public/sw.js:78-81`) and for the offline-download "has this project changed" detection (`src/lib/downloadStorage.js`'s `hasProjectUpdated`) — both rely on it holding.
- `collectAssetUrls` (`src/lib/enrichProjectData.js`) is a public export, not private — it walks a project tree and returns every referenced asset URL for a given depth range. Reuse it rather than re-implementing a tree walk when something needs "every asset URL a project references."

Full schema + a worked example for adding a new project: docs/DOCUMENTATION.md §5 and §15.
