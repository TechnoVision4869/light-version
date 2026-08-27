# State management

Four nested React Context providers, set up in `src/main.jsx`:

`AuthProvider` → `MainContextProvider` → `SidebarContextProvider` → `App`

- **`SidebarContext`** — the core navigation state machine: `currentProject`, a history stack (tab/layer/item/videosPath/views), `activeTab` (`TABS.*`), `activeLayer` (`LAYERS.*`), `currentItem`, `currentVideosPaths`.
- **`MainContext`** — full-screen overlay state: `null` or `{ type, data }` where type is `panorama` | `balcony` | `gallery` | `room-interior` | `compare` | `paymentPlan` | `similar-unit`. Use its `open*`/`closeOverlay` actions rather than local overlay state.
  - **Single-slot, not a stack — with one special case.** Opening any sub-overlay (`panorama`/`balcony`/`gallery`/`paymentPlan`/`similar-unit`) always *replaces* whatever overlay is currently open; `closeOverlay()` normally just nulls it out. The one exception: `MainContextProvider.jsx`'s `openSubOverlay` helper checks whether the *current* overlay is specifically `'compare'` before replacing it — if so, it stashes that compare overlay into a `previousOverlayRef`, and `closeOverlay()` restores it instead of nulling. This exists because `CompareView` renders full `UnitPanel`s whose Interior/Balcony/Gallery/Payment-Plan/Similar-Unit buttons would otherwise silently unmount the whole compare page. **This stash is `'compare'`-specific, not generic** — a new overlay type opened from within some *other* already-open overlay will just overwrite it with no restore, unless it's also special-cased in `openSubOverlay`.
- **`FilterContext`** — floor-level unit filter values (price, area, bedrooms, bathrooms), consumed by `FilterPanel` / `SideBarButtons`.

## Video-driven navigation

`Home.jsx` (via `useVideoViewer`) reads `currentVideosPaths` from `SidebarContext`:
- Moving to a new layer → plays `forwardVideo` once, then loops `idleVideo`.
- Going back → plays `reverseVideo`.

When adding a new nav layer/screen, wire it through `SidebarContext`'s history stack rather than local component state — the video player and breadcrumbs both depend on that stack being the single source of truth.

## Background asset downloads are never auto-cancelled

The app targets Android tablets carried by sales staff and shared between them — not fixed kiosks.
Because of this, **background asset prefetching/downloads must never be auto-cancelled on unmount or
logout.** An in-progress download benefits whoever uses the device next, so letting it run to
completion is intentional, not an oversight — don't "fix" this by adding an `AbortController` around
`prefetchProjectByLevels`/`loadAndCacheVideo` for that reason. (An `AbortSignal` is still planned for
Phase 1, but only for *user-initiated* Pause/Cancel buttons — a different trigger entirely.)

What's guarded instead: `SidebarContextProvider.jsx`'s `handleSetCurrentProject` carries a
`currentRequestIdRef` generation counter, bumped on every new project selection and in
`handleClearSelectedProject` (logout). This stops a *stale* in-flight enrichment from resurrecting
`currentProject`/`localStorage` after the user has already logged out or moved on — the underlying
fetch/caching itself is never gated by it and keeps running regardless. See
`the-web-application-currently-deep-yao.md`'s "Logout / navigating away mid-download" edge case for
the full reasoning.

## Role-based access is unfinalized

`src/components/auth/auth-guard.jsx` currently has no role logic at all (only checks "is logged in"),
and `Layout.jsx`'s sidebar-link-visibility filtering for `developer_marketing`/`developer_sales` does
not fully match the intended role model (a matching block exists but is commented out — likely a
regression). Don't assume the current filtering in `Layout.jsx` reflects the intended design if
touching auth/role code — check `the-web-application-currently-deep-yao.md`'s Step 7 first, which has
the precise current-state audit and is explicitly waiting on the role model being finalized before any
implementation.

Full detail: docs/DOCUMENTATION.md §6–§9.
