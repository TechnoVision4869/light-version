# Backend Gaps

Running log of issues discovered from the frontend that need a fix on the backend/CMS side, not
just a frontend workaround. Add a new `##` entry per gap when found; mark resolved (don't delete)
once confirmed fixed on the backend.

## `balconyAssetId` never returned by the API

**Found:** 2026-08-10, while investigating a failed offline-download asset.

The admin Unit form has a proper asset-picker field for the balcony/panorama asset
(`src/components/admin/resourceConfigs.js:761`, `assetField("balconyAssetId", ...)`), and it's
included in the save payload (`src/components/admin/AdminDashboard.jsx:123`,
`balconyAssetId: str(data.balconyAssetId) || null`). But it is **absent from both the raw and
enriched `project` API responses** — confirmed via live console inspection of `project` /
`enrichedProject` for a real unit. Whatever the admin form saves to this field either isn't
persisted, or isn't returned by `GET`.

**Impact:** `unit.balconyView` (a plain free-text field, not an asset picker — see next entry) is
the only field actually carrying this data today. There's no clean, validated field to source the
balcony asset from.

**Frontend workaround:** none — `balconyView` remains the sole source, with its known risk (next
entry) now surfaced via the offline-download overlay's per-file failure list instead of failing
silently.

## `Unit.balconyView` can hold a human-typed label instead of a real asset id

**Found:** 2026-08-10, via a failed offline download: `GET
.../assets/file/Location%20View → 500`.

`resourceConfigs.js:818-824` exposes `balconyView` as a plain `CONTROL_TYPES.TEXT` box — unlike
every other asset-reference field in the app, which uses the `ASSET` picker control. For the KOG
project, someone typed the button's display label **"Location View"**
(`CONFIG.BALCONY_TITLE` in `project-kog.js`/`kog-demo.js`) into it instead of picking a real
panorama asset. Nothing on the frontend or backend validates that this field actually contains a
real asset id before it gets saved.

**Impact:** `enrichProjectData.js`'s `transformAssetIds` treats any key containing `"balconyView"`
as an asset reference and calls `assetApi.getAssetFileUrl(value)` on it — for a bad value like this,
that produces a URL that then 500s when actually fetched.

**Frontend workaround:** none (deliberately — see `src/components/DownloadTestOverlay.jsx`). The
bad value now simply shows up as a named entry in the offline-download overlay's failure list
instead of a generic "Download failed" message, so it's diagnosable without a network trace.

**Needs:** someone with backend/DB access to correct the actual stored value for the affected KOG
unit(s). Once `balconyAssetId` (previous entry) is actually returned by the API, consider migrating
`balconyView` off asset-reference duty entirely.

## `assets/developer/:developerId` possibly paginates with an undocumented default page size

**Found:** 2026-08-10, investigating `*Type` fields (e.g. `idleAssetType`, `zonesSideVideoType`)
coming back `null` for zones/unit assets in one project, while Amenities/Surroundings assets in the
same project resolved correctly.

**Status: unconfirmed hypothesis, workaround applied but not verified.** `src/lib/enrichProjectData.js`'s
`buildAssetTypeMap` calls `assetApi.getByDeveloper({ developerId })` to build an asset id → type
lookup, previously with no `limit`. `src/components/admin/AssetsLibrary.jsx:83` explicitly passes
`limit: 1000` for the equivalent "fetch everything" need elsewhere in the app, which suggests the
endpoint's default page size (whatever it is) is smaller than a typical developer's full asset
count — any asset outside that default page would be silently missing from the type lookup,
explaining the `null`s.

**Frontend change made:** `buildAssetTypeMap` and the offline-download overlay's failed-asset name
resolution now both explicitly pass `limit: 1000`, matching `AssetsLibrary.jsx`'s established
pattern.

**Needs confirmation:** re-test against the same project — if the `*Type` fields are still `null`
after this change, this hypothesis is wrong and the actual cause needs further investigation with
whoever owns the `assets/developer/:developerId` endpoint (confirm its real default/max page size,
or whether there's a different explanation entirely for the zones-vs-amenities asymmetry).

## Project has no `config` field for `useHotspots`/`usePredefinedPos`

**Found:** documented in `the-web-application-currently-deep-yao.md` (API-mode switch plan).

These two display-behavior flags (whether a project shows fixed marker positions or interactive
panorama hotspots) are pure static config today — set per-project in `src/data/project-*.js` (e.g.
`project-kog.js:17-18`), selected via `src/data/layers.js`'s commented-import, and re-exported by
`appConfig.js:6,8`. Nothing the API returns for a Project carries an equivalent field —
`enrichProjectData.js` never touches this.

**Impact:** even in full API mode, changing this per-project/per-developer still means a developer
editing a static file and rebuilding the app — the one remaining place where "no rebuild needed"
isn't actually true.

**Needs:** add a field to the Project model/DB (e.g. `config: { useHotspots, usePredefinedPos }`)
and return it from `GET projects/:id`. Frontend side is small once this exists: pass it through
untouched in `enrichProjectData.js` (booleans, no asset resolution needed), then read
`currentProject.config.useHotspots`/`.usePredefinedPos` at the 3 current read sites
(`ProjectSelector.jsx:23`, `UnitPanel.jsx:17`, `SidebarContextProvider.jsx:447`) when `!useStatic`,
keeping the static `APP_CONFIG.*` values as the static-mode fallback.

## `assets/developer/:developerId` manifest has no per-asset byte size

**Found:** documented in `the-web-application-currently-deep-yao.md`, in the offline-download-gating
revision's Phase 1 design.

Nothing the API returns for an asset includes a byte size. This matters once download progress needs
to be meaningful to a user: with no size data, progress can only be estimated from asset *count*
("142 of 380 items"), not bytes ("340MB of 900MB") — a materially worse progress UX, and it also
means there's no way to warn a user upfront how large a project download will be before they start
it.

**Needs:** add a `size` (bytes) field to whatever the `assets/developer/:developerId` (and/or
`assets/:id`) response returns per asset. Non-blocking for the current offline-download spike, but
should land before the full multi-project download queue (Phase 1) ships, since that's where
accurate progress/size upfront actually matters to sales staff using the tablet.

## Project has no `updatedAt` field

**Found:** documented in `the-web-application-currently-deep-yao.md`, in the offline-download-gating
revision's edge-case handling for "project content changed after download."

Asset URLs are already versioned (a changed file gets a new URL, per `public/sw.js:78-81`'s design
notes), so a stale cache entry naturally goes unused rather than serving wrong content — but nothing
today lets the frontend cheaply detect that a *previously-downloaded* project's content changed, to
prompt a re-download. The planned MVP workaround (diff the freshly-fetched asset URL set against
what was persisted at last download time) works without this field, but is more expensive than it
needs to be.

**Needs:** a `updatedAt` timestamp on the Project entity, returned from `GET projects/:id`, so
"content changed since last download" becomes a cheap timestamp comparison instead of a full
asset-list diff. Not required for Phase 0/1 of the offline-download work, but would simplify it.

## CORS allowlist for `/assets/file/*` and `/api/*` unconfirmed against the Capacitor WebView origin

**Found:** documented in `the-web-application-currently-deep-yao.md`, Step 2 (Service Worker
cross-origin gap).

`public/sw.js`'s asset-caching path builds its cache-populating fetch with `new Request(request.url,
{ headers: {} })`, which defaults to CORS mode. If `api.techno-vision.tech` returns
`Access-Control-Allow-Origin` scoped to the production web domain only (rather than a wildcard or an
allowlist that includes Capacitor's default Android WebView origin, `https://localhost`), this fetch
throws and the asset silently never gets cached — degrading exactly the offline behavior the app
needs most, with no visible error to the user.

**Status:** unconfirmed either way — login (a JSON `fetch`, separate request path) has been verified
working from the packaged app, which de-risks the `/api/*` path somewhat, but the SW's own
`/assets/file/*` caching fetch is a distinct request path and hasn't been specifically confirmed.

**Needs:** confirm with the backend what `Access-Control-Allow-Origin` value `/assets/file/*` and
`/api/*` currently return. If it's restrictive, either add `https://localhost` to the allowlist, or
switch to Capacitor's native HTTP bridge (`CapacitorHttp` in `capacitor.config.json`) so these
`fetch`/XHR calls bypass WebView CORS entirely — the more robust fix since it doesn't depend on the
backend and also covers `api.service.js`'s JSON calls.

## Unit type PATCH returns empty `serviceRooms` (POST works fine)

**Found:** 2026-08-24, while scoping the interactive-map requirements doc's unit-detail fields
(bedroom/bathroom counts, extra features).

`serviceRooms` (the extra-features string on a unit type) is populated correctly when a unit type is
created via `POST`, but a subsequent `PATCH` to the same unit type returns it empty. Bedroom/bathroom
counts and `serviceRooms` are otherwise a completed frontend feature — this is purely a backend
response gap on the update path.

**Needs:** confirmation from whoever owns `unitTypeApi.js`'s backend endpoint that `PATCH` either
persists and echoes back `serviceRooms` correctly, or (if it's a partial-update endpoint expecting the
field to be re-sent) that this is documented so the admin form always includes it on save.

## No unit-level `status` field (available/reserved/sold) returned by the API

**Found:** 2026-08-24, while scoping the interactive-map requirements doc's scarcity-indicator and
unit-status-display features.

Nothing the API returns for a unit includes an availability status (available / reserved / sold).

**Impact:** two requested features have no real data source as a result — the unit-status display
("تمييز حالة الوحدات") and the scarcity indicator ("last N units of this model") are both being built
against mock data for now (see `docs/INTERACTIVE_MAP_IMPLEMENTATION_PLAN.md` §5), with a migration path
to swap in real data once this field exists.

**Needs:** confirmation from whoever owns the backend on whether a unit `status` field exists or is
planned, and if so, what its return shape/enum values are, so the mock functions can be replaced with a
real API call without further UI changes.

## Compare/favorites list is localStorage-only — no backend concept exists

**Found:** 2026-08-24, while building the interactive-map requirements' Compare feature
(`src/lib/compareStorage.js`, `src/components/CompareView.jsx`).

The "Add to Compare" list (up to 4 units, toggled from `UnitPanel.jsx`) is stored purely in the
browser's `localStorage`, keyed `compareUnits`. There is no backend concept of a favorites/compare list
— per-user, per-project, or otherwise.

**Impact:** the app targets Android tablets **carried by sales staff and shared between them**, not
assigned 1:1 (per `.claude/rules/state-management.md`). A `localStorage` list is inherently per-device,
not per-user — it does not follow a sales rep across devices, does not survive the browser/app storage
being cleared, and mixes together whatever the previous person using the tablet had selected. The
frontend also has to defensively prune stale IDs on every project switch
(`SidebarContextProvider.jsx`'s `setCurrentProjectAndPrune`) since a unit ID from a different project is
meaningless once the tree changes — a workaround for the lack of any real scoping, not a complete fix
(e.g. two different projects sharing a coincidentally-identical unit ID would not be caught by this
pruning).

**Needs:** a real favorites/compare-list concept on the backend, ideally scoped to the logged-in user
(so it follows them across devices) and/or the project. Once available, `compareStorage.js`'s functions
(`getCompareUnits`/`addToCompare`/`removeFromCompare`/`isInCompare`) can be swapped to call the API
instead of `localStorage` with no UI changes needed — the rest of the feature (`UnitPanel.jsx`,
`CompareView.jsx`, `CompareButton.jsx`) already only depends on those functions' signatures.

## Admin API endpoints' server-side role enforcement unconfirmed

**Found:** documented in `the-web-application-currently-deep-yao.md`, Step 7 (role-based access
hardening).

`src/components/auth/auth-guard.jsx` only checks "is logged in," not "is allowed here" — `/dashboard`
and `/users` are reachable by any authenticated account regardless of role on the client. That's a
client-side gap the frontend can (and should) fix directly, but client-side gating alone only helps
if every admin API endpoint (`src/api/admin/*Api.js`, ~13 modules) also independently enforces role
checks server-side — otherwise a rooted/patched client, or anyone calling the API directly, bypasses
the frontend check entirely.

**Needs:** confirmation from whoever owns the backend that each of those ~13 admin API modules
enforces its own role check server-side, independent of the frontend. This is a hard blocker for
public release (Play Store), not just a nice-to-have, since the current gap is an acceptable shortcut
only for a hand-installed, trusted-user distribution.
