# State management

Four nested React Context providers, set up in `src/main.jsx`:

`AuthProvider` → `MainContextProvider` → `SidebarContextProvider` → `App`

- **`SidebarContext`** — the core navigation state machine: `currentProject`, a history stack (tab/layer/item/videosPath/views), `activeTab` (`TABS.*`), `activeLayer` (`LAYERS.*`), `currentItem`, `currentVideosPaths`.
- **`MainContext`** — full-screen overlay state: `null` or `{ type, data }` where type is `panorama` | `balcony` | `gallery` | `room-interior`. Use its `open*`/`closeOverlay` actions rather than local overlay state.
- **`FilterContext`** — floor-level unit filter values (price, area, bedrooms, bathrooms), consumed by `FilterPanel` / `SideBarButtons`.

## Video-driven navigation

`Home.jsx` (via `useVideoViewer`) reads `currentVideosPaths` from `SidebarContext`:
- Moving to a new layer → plays `forwardVideo` once, then loops `idleVideo`.
- Going back → plays `reverseVideo`.

When adding a new nav layer/screen, wire it through `SidebarContext`'s history stack rather than local component state — the video player and breadcrumbs both depend on that stack being the single source of truth.

Full detail: DOCUMENTATION.md §6–§9.
