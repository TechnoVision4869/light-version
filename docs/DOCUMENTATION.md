# Light Tour — Comprehensive Project Documentation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Architecture Overview](#4-architecture-overview)
5. [Data Model](#5-data-model)
   - [Project Data File Schema](#project-data-file-schema)
   - [Config Object](#config-object)
   - [Developer / Project Object](#developer--project-object)
   - [Surroundings](#surroundings)
   - [Amenities](#amenities)
   - [Zones → Properties → Floors → Units](#zones--properties--floors--units)
   - [Unit Types](#unit-types)
6. [State Management](#6-state-management)
7. [Routing](#7-routing)
8. [Navigation Model (Tabs & Layers)](#8-navigation-model-tabs--layers)
9. [Key Components](#9-key-components)
10. [API Layer](#10-api-layer)
11. [Static vs API Mode](#11-static-vs-api-mode)
12. [Android / Capacitor Integration](#12-android--capacitor-integration)
13. [Service Worker & Caching](#13-service-worker--caching)
14. [Asset Conventions](#14-asset-conventions)
15. [Step-by-Step: Adding a New Static Project File](#15-step-by-step-adding-a-new-static-project-file)
16. [Step-by-Step: Building an APK](#16-step-by-step-building-an-apk)

---

## 1. Project Overview

**Light Tour** is an interactive real estate showcase application built with React and packaged as a native Android app via Capacitor. It allows clients and sales teams to explore real estate developments through:

- **Cinematic video navigation** — forward/reverse/idle MP4 videos drive transitions between views.
- **360° panoramic interiors** — equirectangular images rendered using `@egjs/react-view360`.
- **360° balcony views** — same viewer, applied to outdoor perspectives.
- **Hierarchical exploration** — Developer → Project → Zones/Amenities/Surroundings → Properties (towers/villas) → Floors → Units.
- **Unit detail panel** — area, bedrooms/bathrooms, gallery images, floor plans, cut sections, and payment plans.
- **Floor filter** — filter units by bedroom count, area range, price range, etc.
- **Admin dashboard** — a full CRUD interface for managing data via REST API (used in API mode).
- **Authentication** — JWT-based login with role-based access control.

The app is designed primarily for landscape-orientation tablets, deployed as an Android APK. It also runs as a web app in a browser.

---

## 2. Tech Stack

| Category | Library / Tool | Version |
|---|---|---|
| UI Framework | React | 19 |
| Build Tool | Vite | 5 |
| CSS | Tailwind CSS v4 | 4 |
| Routing | React Router DOM | 7 |
| Mobile Shell | Capacitor | 8 |
| 360° Viewer | @egjs/react-view360 | 4 beta |
| Forms | React Hook Form + Zod / Yup | latest |
| UI Primitives | Radix UI + shadcn/ui | latest |
| Icons | Lucide React | latest |
| Toast | react-hot-toast | 2 |
| Video Player | react-player | 3 |
| Service Worker | Workbox | 7 |
| HTTP Client | Custom wrapper (fetch + lodash) | — |
| Linting | ESLint 9 | 9 |
| APK Build | Gradle (Android) | — |

Build target is `es2018` for compatibility with older Android WebViews (Huawei SE 11, Chromium ≥70).

---

## 3. Project Structure

```
light-version/
├── android/                        # Capacitor Android project
│   └── app/
│       ├── build.gradle            # Product flavors, app IDs, APK naming
│       └── src/main/res/           # App icons per flavor
├── public/
│   ├── sw.js                       # Service worker (Workbox-based)
│   └── projects/                   # Static media assets served directly
│       └── <project-slug>/         # One folder per project
│           ├── images/             # Background, gallery, highlight images
│           ├── videos/             # home, surroundings, amenities, zones MP4s
│           ├── panorama/           # 360° equirectangular JPGs (interior + balcony)
│           ├── thumbnails/         # Amenity thumbnails
│           ├── units/              # Unit idle PNGs and transition videos
│           └── highlight/          # Floor/tower highlight PNGs
├── resources/                      # Capacitor icon source files (per flavor)
│   ├── main/                       # Default icons
│   ├── somabay/
│   └── tbk/
├── src/
│   ├── main.jsx                    # Entry point; providers, service worker registration
│   ├── App.jsx                     # Route definitions, orientation lock, expiry logic
│   ├── index.css                   # Global styles
│   ├── config/
│   │   └── appConfig.js            # Feature flags (USE_STATIC, USE_HOTSPOTS, etc.)
│   ├── data/
│   │   ├── layers.js               # THE ACTIVE project import + shared constants
│   │   ├── project-lighthouse.js   # Static data for "The Lighthouse"
│   │   ├── project-lightlight.js   # Static data for "Light Light"
│   │   ├── project-kog.js          # Static data for KOG / TBK
│   │   ├── project-sandbox.js      # Development sandbox data
│   │   ├── project-demo.js         # Demo project data
│   │   └── project-mix.js          # Mixed developer data
│   ├── store/
│   │   ├── jwt-context.jsx         # AuthContext: authentication state & JWT
│   │   ├── SidebarContextProvider.jsx  # SidebarContext: navigation history & current state
│   │   ├── MainContextProvider.jsx     # MainContext: overlay state (panorama/balcony/gallery)
│   │   └── FilterContextProvider.jsx   # FilterContext: unit filter state
│   ├── components/
│   │   ├── App-level
│   │   │   ├── SplashVideo.jsx     # Full-screen intro video on project entry
│   │   │   ├── LandscapePrompt.jsx # Prompt user to rotate device
│   │   │   └── ExpiredDialog.jsx   # Hard expiry lockout dialog
│   │   ├── Auth
│   │   │   ├── auth-guard.jsx      # Route protection HOC
│   │   │   ├── login-page.jsx      # Login page layout
│   │   │   └── login-form.jsx      # Login form (React Hook Form + Zod)
│   │   ├── SelectionFlow.jsx       # Developer → ProjectSelector routing logic
│   │   ├── ProjectSelector.jsx     # Project listing with highlight image and pin
│   │   ├── DeveloperSelector.jsx   # Developer listing (API mode only)
│   │   ├── Home.jsx                # Main experience shell: video player + sidebar
│   │   ├── Layout.jsx              # Base page layout wrapper
│   │   ├── Sidebar.jsx             # Side navigation panel (tabs/layers toggle)
│   │   ├── SideBarButtons.jsx      # Navigation items inside sidebar
│   │   ├── UnitPanel.jsx           # Unit detail: area, rooms, gallery, plans
│   │   ├── FilterPanel.jsx         # Floor-level unit filter (sliders + toggles)
│   │   ├── RoomList.jsx            # Interior room list inside unit panel
│   │   ├── Panorama.jsx            # 360° interior viewer (@egjs/react-view360)
│   │   ├── Balcony.jsx             # 360° balcony viewer
│   │   ├── Room.jsx                # Single room interior flat image view
│   │   ├── Gallery.jsx             # Image carousel (swipe-enabled)
│   │   ├── AnimatedPath.jsx        # SVG animated path overlay
│   │   ├── Highlight.jsx           # Building/floor highlight image overlay
│   │   ├── Pin.jsx                 # Map pin / hotspot marker
│   │   ├── InfoPopup.jsx           # Info tooltip popup
│   │   ├── HistoryBreadcrumbs.jsx  # Breadcrumb trail of navigation history
│   │   ├── InteriorNav.jsx         # Room-to-room navigation inside panorama
│   │   ├── floating/               # Floating button components (BaseFloat, etc.)
│   │   ├── buttons/                # Reusable button components (HomeButton, etc.)
│   │   ├── hooks/                  # Component-level hooks (useVideoViewer, use-auth)
│   │   ├── helpers/                # Pure utility functions (filterHelper, etc.)
│   │   ├── admin/                  # Full admin CRUD dashboard components
│   │   ├── ui/                     # shadcn/ui primitives (Button, Dialog, etc.)
│   │   └── user/                   # User management page
│   ├── api/
│   │   ├── authApi.js              # login, logout, changePassword
│   │   └── admin/                  # Per-entity REST API clients
│   ├── services/
│   │   └── api.service.js          # HTTP wrapper: fetch, JWT, error handling
│   ├── lib/
│   │   ├── projectFetcher.js       # Unified project fetch (static or API)
│   │   ├── enrichProjectData.js    # Pre-fetches & caches video URLs from API
│   │   ├── cacheUtils.js           # IndexedDB / cache helpers
│   │   └── utils.js / utils.ts     # General utility functions
│   ├── hooks/
│   │   └── useFloatingPositions.js # Floating element position calculations
│   ├── constants/
│   │   └── roles.js                # User role constants
│   ├── assets/                     # Bundled static assets (logos, icons, fonts)
│   └── fonts/                      # Quicksand font files
├── vite.config.js
├── capacitor.config.json
├── android/app/build.gradle
└── package.json
```

---

## 4. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     main.jsx                            │
│  BrowserRouter > AuthProvider > MainContextProvider     │
│                > SidebarContextProvider > App           │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┼─────────────────┐
         │               │                 │
    /login           / (root)          /dashboard
  LoginPage       AuthGuard           AdminDashboard
                     │
                SelectionFlow
                     │
             ┌───────┴────────┐
             │  Static Mode   │  API Mode
             │ (USE_STATIC)   │
             └───────┬────────┘
                     │
              ProjectSelector
              (shows project highlight, pins)
                     │
              onProjectSelect()
              → SidebarContext.setCurrentProject()
              → navigate('/home')
                     │
                  Home.jsx
          ┌─────────┴──────────┐
          │                    │
    VideoPlayer           Sidebar
    (idle/forward/         (tabs,
     reverse videos)        layers,
          │                  items)
          │                    │
    Overlays (MainContext):   Navigation
    - Panorama               (SidebarContext)
    - Balcony
    - Gallery
    - Room Interior
```

**Data flow in static mode:**
1. `layers.js` imports one project file and re-exports `DATA`, `PATH`, `CONFIG`.
2. `appConfig.js` reads `CONFIG` from `layers.js` for feature flags.
3. `ProjectSelector` reads `DATA.developerProjects` to list projects.
4. On project select, `SidebarContextProvider` stores the project in `currentProject`.
5. `Home.jsx` reads `currentProject` and drives video playback via `SidebarContext` history.
6. `Sidebar` reads the navigation hierarchy to render lists of zones, floors, units, etc.

---

## 5. Data Model

### Project Data File Schema

Each file in `src/data/project-*.js` exports three things:

```js
export const projectPath = "projects/<slug>";  // Matches public/projects/<slug>/
export const config = { /* Feature flags and viewer settings */ };
export const DEVELOPER_* = { /* Full developer + project tree */ };
```

---

### Config Object

```js
export const config = {
  // Feature Flags
  USE_PREDEFINED_POS: true,     // Show a fixed pin on the project highlight image
  USE_HOTSPOTS: false,          // Use panorama hotspot navigation vs. sidebar-only

  // 360° Interior Viewer
  INTERIOR_ZOOM_RANGE: { min: 0.8, max: 1.333 },   // FOV zoom limits
  INTERIOR_PITCH_RANGE: { min: -50, max: 40 },      // Vertical look limits (degrees)

  // 360° Balcony Viewer
  BALCONY_ZOOM_RANGE: { min: 1, max: 1.333 },
  BALCONY_PITCH_RANGE: { min: -40, max: 40 },
  BALCONY_YAW_RANGE: { min: -70, max: 70 },         // Horizontal swipe limits

  // UI Labels
  ZONES_TAB_TITLE: "PROPERTIES",   // Label for the zones tab in the sidebar
  BALCONY_TITLE: "Balcony View",   // Label shown in the balcony overlay header
}
```

---

### Developer / Project Object

```js
export const DEVELOPER_SOMABAY = {
  developerId: "somabay",
  developerLogo: SOMABAY_LOGO,           // Imported SVG/PNG asset
  backgroundImage: SOMABAY_BG,           // Full-screen background image path
  developerProjects: [
    {
      id: "light-house",                 // Unique project slug
      name: "The Lighthouse",            // Display name
      thumbnail: null,                   // Optional thumbnail image path
      description: "...",
      introVideo: `/${projectPath}/videos/intro.mp4`,       // Splash video on project entry
      idleVideo: `/${projectPath}/videos/home/home_idle.mp4`,  // Looping home background
      zoomoutVideo: `/${projectPath}/videos/home/home_out.mp4`, // Zoom-out transition

      surroundings: { ... },
      amenities: { ... },
      zones: { ... },
      unitTypes: { ... },               // Keyed by unitTypeId (static mode)
    }
  ]
}
```

**Video naming convention** (all paths relative to `public/`):
- `idleVideo` — Loops when in this state.
- `forwardVideo` — Plays when entering this state (transition in).
- `reverseVideo` — Plays when leaving this state (transition out/back).
- `zoomoutVideo` — Used when zooming out from a detail view back to overview.

---

### Surroundings

```js
surroundings: {
  id: "surroundings",
  displayName: "Surroundings",
  zoomoutVideo: `/${projectPath}/videos/surroundings/surrounding_out.mp4`,
  videos: {
    forwardVideo: `...surrounding_gen_trans_from_home.mp4`,
    reverseVideo: `...surrounding_gen_rev_to_home.mp4`,
    idleVideo: `...surroundings_gen_idle.mp4`,
  },
  items: [
    {
      id: "surrounding1",
      displayName: "Service Area",
      iconSrc: MALL_ICON,         // Imported icon asset
      thumbnail: "",
      distance: "6 min - 3 km",
      description: "...",
      x: 0.38, y: 0.3,           // Position on the video frame (0–1 normalized)
      svgPath: SERVICE_SVG,       // Inline SVG string for AnimatedPath overlay
    },
  ],
},
```

---

### Amenities

```js
amenities: {
  id: "amenities",
  displayName: "Amenities",
  zoomoutVideo: `...amenities_out.mp4`,
  videos: { forwardVideo, reverseVideo, idleVideo },
  items: [
    {
      id: "amenity1",
      displayName: "Azure Lagoons",
      subtitle: "Amenity",
      thumbnail: `/${projectPath}/thumbnails/amenities/amenity1.jpeg`,
      description: "...",
      x: 0.535, y: 0.57,          // Pin position on video frame
      videos: { forwardVideo, reverseVideo, idleVideo },
    },
  ],
},
```

---

### Zones → Properties → Floors → Units

This is the deepest part of the tree:

```js
zones: {
  id: "zones",
  displayName: "Zones",
  zoomoutVideo: `...zones_out.mp4`,
  videos: { forwardVideo: null, reverseVideo: null, idleVideo: null },
  items: [
    {
      id: "zone1",
      displayName: "Towers",
      subtitle: "Residential Area",
      x: 0.93, y: 0.53,                    // Pin on zones video
      videos: { forwardVideo, reverseVideo, idleVideo },

      properties: [                         // Buildings / towers within zone
        {
          id: "7a",
          type: "tower",                    // "tower" | "villa"
          displayName: "7A",
          highlight: `...highlight/7A Tower.png`,  // Overlaid highlight image
          x: 0.57, y: 0.2,                 // Pin on zone idle video
          videos: { forwardVideo, reverseVideo, idleVideo },
          views: [                          // Camera angles for this property
            {
              name: "View 1",
              videos: { forwardVideo, reverseVideo, idleVideo },
            },
          ],
          floors: [
            {
              id: "ground",
              type: "Residential",
              displayName: "Ground",
              highlight: `...highlight/7A/7a_ground.png`,
              x: 0.225, y: 0.84,
              videos: { forwardVideo, reverseVideo, idleVideo },
              units: [
                {
                  id: "107A01",
                  unitTypeId: "107A01",     // Key into project.unitTypes
                  displayName: "107A01",
                  area: 113.9,
                  price: 8,
                  bedrooms: 2,
                  bathrooms: 1,
                  balconyView: `/${projectPath}/panorama/Balcony/7a/107A01.jpg`,
                  x: 0.745, y: 0.35,       // Pin on floor idle video
                  videos: {
                    forwardVideo: `.../units/trans_from_floors_to_units.mp4`,
                    reverseVideo: `.../units/rev_from_units_to_floors.mp4`,
                    idleVideo: `.../units/7a/ground/107A01.png`, // Can be a PNG (static image)
                  },
                },
              ],
            },
          ],
          features: null,                   // Optional building feature items
        },
      ],
    },
  ],
},
```

> **Note on `idleVideo`:** For units, `idleVideo` is typically a `.png` floor plan image, not a `.mp4`. The video player handles static images transparently.

---

### Unit Types

`unitTypes` lives directly on the project object and is a dictionary keyed by `unitTypeId`:

```js
unitTypes: {
  "107A01": {
    area: 113.9,
    roofarea: null,           // Optional roof area (m²)
    interior: {
      levels: [               // Levels inside the unit (e.g., ground level, roof level)
        {
          name: "Level 1",
          rooms: [
            {
              id: "living",
              name: "Living Room",
              furnitureImgId: `/${projectPath}/panorama/Interior/107A01/living_furnished.jpg`,
              unfurnitureImgId: `/${projectPath}/panorama/Interior/107A01/living_empty.jpg`,
              hotspots: [],   // Navigation hotspots (used when USE_HOTSPOTS: true)
            },
          ],
        },
      ],
    },
    gallery: [                // Array of { id, src } image objects
      { id: "g1", src: `/${projectPath}/images/gallery/...` },
    ],
    cutSections: [...],       // Array of { id, src }
    floorPlans: [...],        // Array of { id, src }
    paymentPlans: [...],      // Array of { id, src }
    serviceRooms: [...],      // Room names as strings
  },
}
```

---

## 6. State Management

The app uses React Context for global state, split into four providers nested in `main.jsx`:

```
AuthProvider
  └── MainContextProvider
        └── SidebarContextProvider
              └── App (routes)
```

### AuthContext (`jwt-context.jsx`)
- **Stores:** `isAuthenticated`, `isInitialized`, `user`, `accessToken`
- **Actions:** `login(email, password)`, `logout()`
- **Persistence:** JWT stored in `localStorage`. On app load it reads the token back and validates it to restore session.
- **Key behavior:** `AuthConsumer` in `main.jsx` blocks rendering until `isInitialized` is `true`, preventing flash-of-unauthenticated-content.

### SidebarContext (`SidebarContextProvider.jsx`)
The core navigation state machine:
- **`currentProject`** — the active project object (full data tree).
- **`history`** — array of navigation states (tab, layer, item, videosPath, views). Operates as a stack.
- **`activeTab`** — one of `TABS.*` (HOME, SURROUNDINGS, AMENITIES, ZONES).
- **`activeLayer`** — one of `LAYERS.*` (BUILDING, FLOOR, UNIT, INTERIOR, etc.).
- **`currentItem`** — the currently selected item at the active layer.
- **`currentViews`** — available camera views for a property.
- **`currentVideosPaths`** — the `{ forwardVideo, reverseVideo, idleVideo }` for the current state.
- **Actions:** `goToTab()`, `goHome()`, `switchToFloor()`, `clearSelectedProject()`, etc.
- **`sidebarOpen`** / `handleSidebarState()` — controls sidebar visibility.

### MainContext (`MainContextProvider.jsx`)
Manages full-screen overlays:
- **`overlay`** — `null` or `{ type, data }` where type is `'panorama'`, `'balcony'`, `'gallery'`, or `'room-interior'`.
- **Actions:** `openPanorama(unit)`, `openBalconyView(unit)`, `openGallery(unit, galleryType)`, `openRoomInterior(room)`, `closeOverlay()`.

### FilterContext (`FilterContextProvider.jsx`)
- Stores filter values for floor-level unit filtering (price, area, bedrooms, bathrooms).
- Consumed by `FilterPanel` and `SideBarButtons` to filter the unit list.

---

## 7. Routing

Defined in `App.jsx` using React Router v7:

| Path | Component | Auth Required | Description |
|---|---|---|---|
| `/login` | `LoginPage` | No | Email/password login |
| `/` | `SelectionFlow` | Yes | Project selection entry |
| `/home` | `Home` | Yes | Main experience |
| `/dashboard` | `AdminDashboard` | Yes | Admin CRUD interface |
| `/users` | `UsersPage` | Yes | User management |

`AuthGuard` wraps protected routes and redirects to `/login` if not authenticated.

In **static mode** (`USE_STATIC: true`), authentication is bypassed — `AuthGuard` passes through unconditionally.

---

## 8. Navigation Model (Tabs & Layers)

The app tracks the user's position in the hierarchy using a history stack. Each entry in the stack has:

```js
{
  tab: TABS.ZONES,
  layer: LAYERS.FLOOR,
  item: { /* floor object */ },
  videosPath: { forwardVideo, reverseVideo, idleVideo },
  views: [ /* camera views */ ],
}
```

**Tab constants** (`TABS` in `layers.js`):
- `HOME` — project home screen.
- `SURROUNDINGS` — nearby points of interest.
- `AMENITIES` — project amenities.
- `ZONES` — residential zones with properties.

**Layer constants** (`LAYERS` in `layers.js`):

| Layer | Description |
|---|---|
| `ZONE_DETAIL` | A selected zone (collection of buildings) |
| `BUILDING` | A selected tower or villa |
| `BUILDING_FEATURE` | Amenity/feature within a building |
| `FLOOR` | A selected floor within a building |
| `UNIT` | A selected unit on a floor |
| `INTERIOR` | Interior panorama of a unit |
| `SURROUNDING_DETAIL` | A selected surrounding POI |
| `AMENITY_DETAIL` | A selected amenity |

**Video player behavior:** `Home.jsx` listens to `currentVideosPaths` from `SidebarContext`. When the user navigates to a new layer, `Home.jsx` plays `forwardVideo` once then loops `idleVideo`. When the user goes back, it plays `reverseVideo`.

---

## 9. Key Components

### `Home.jsx`
The main shell. Orchestrates:
- `useVideoViewer` hook — manages two `<video>` elements (A/B swap for smooth transitions), opacity crossfading, and playback state.
- Renders `Sidebar`, `HistoryBreadcrumbs`, `BaseFloat`, and full-screen overlays from `MainContext`.
- Handles Android hardware back button via `@capacitor/app`.
- Hides the Android status bar via `@capacitor/status-bar`.

### `ProjectSelector.jsx`
- Shows the developer's background video/image and a project highlight image.
- Uses `ResizeObserver` to compute predefined pin positions relative to the video element.
- In static mode, reads `DATA.developerProjects` directly. In API mode, fetches from the backend.

### `Sidebar.jsx`
- Renders different content based on `activeLayer`:
  - Floor layer: Navigate/Filter tab toggle.
  - Unit layer: `UnitPanel` or `RoomList` (depending on overlay type).
  - Other layers: `SideBarButtons` list.

### `Panorama.jsx`
- Wraps `@egjs/react-view360` with `EquirectProjection`.
- Supports furnished / unfurnished toggle.
- Checks WebGL `MAX_TEXTURE_SIZE` to warn about oversized panorama images.
- `InteriorNav` renders room-to-room navigation arrows.

### `Balcony.jsx`
- Same `@egjs/react-view360` viewer as `Panorama`, but for outdoor/balcony images.
- Uses `BALCONY_ZOOM_RANGE` / `BALCONY_PITCH_RANGE` / `BALCONY_YAW_RANGE` from `CONFIG`.

### `Gallery.jsx`
- Touch/mouse swipe carousel.
- Reads `unitType[galleryType]` for the image list (e.g., `gallery`, `cutSections`, `floorPlans`).

### `FilterPanel.jsx`
- Slider (range) and discrete (multi-select) filter controls.
- Operates on the `FilterContext` to filter units shown in `SideBarButtons`.

### `AnimatedPath.jsx`
- Renders inline SVG paths over the video frame (e.g., walking route animations).
- SVG content is imported as raw strings using `?raw` Vite import.

### `SplashVideo.jsx`
- Full-screen auto-playing intro video. Calls `onFinished` when the video ends or errors.

---

## 10. API Layer

All API communication goes through `src/services/api.service.js`, a singleton `ApiService` instance:

```js
import { apiService } from "../services/api.service";
apiService.setToken(jwtToken);    // After login
apiService.unsetToken();          // After logout
```

`ApiService` provides `.get()`, `.post()`, `.put()`, `.delete()` methods with:
- Automatic JSON serialization.
- `Authorization: Bearer <token>` header injection.
- 401 callback (`onUnauthorized`) that clears state and redirects to `/login`.

Per-entity API clients in `src/api/admin/` (e.g., `projectApi.js`, `unitApi.js`) wrap `apiService` calls with entity-specific endpoints.

The base API URL is set when constructing `apiService` (defined in `api.service.js`).

---

## 11. Static vs API Mode

Controlled by a single flag in `src/config/appConfig.js`:

```js
export const APP_CONFIG = {
  USE_STATIC: true,   // ← change this
  ...
};
```

| Behavior | `USE_STATIC: true` | `USE_STATIC: false` |
|---|---|---|
| Project data source | `src/data/layers.js` → project file | REST API |
| Authentication | Bypassed (no login required) | Required (JWT login) |
| Service Worker | Unregistered on load | Registered (caches API responses) |
| Video URLs | Hardcoded paths in project file | Resolved from asset IDs via `assetApi` |
| Admin dashboard | Can still be accessed at `/dashboard` | Fully functional |
| `enrichProjectData` | Skipped | Runs on project select (pre-fetches video URLs) |

**Switching the active project** (static mode): edit the import in `src/data/layers.js`:

```js
// Only one line should be uncommented at a time:
// import { DEVELOPER_SOMABAY as DEVELOPER, projectPath, config } from "./project-lighthouse";
import { DEVELOPER_SOMABAY as DEVELOPER, projectPath, config  } from "./project-lightlight";
// import { DEVELOPER_TBK as DEVELOPER, projectPath, config } from "./project-kog";
```

---

## 12. Android / Capacitor Integration

### Capacitor Config (`capacitor.config.json`)
```json
{
  "appId": "com.technovision.light",
  "appName": "Light Tour",
  "webDir": "dist"
}
```
The `webDir: "dist"` tells Capacitor to copy the Vite build output into the Android project's assets.

### Product Flavors (`android/app/build.gradle`)
Each client deployment is a separate Android product flavor:

```groovy
productFlavors {
    sandbox  { applicationId "com.technovision.sandbox"; resValue "string", "app_name", "Sandbox" }
    ebrochure{ applicationId "com.technovision.ebrochure"; resValue "string", "app_name", "e-Brochure" }
    demo     { applicationId "com.technovision.demo";    resValue "string", "app_name", "Light Demo" }
    tbk      { applicationId "com.technovision.tbk";     resValue "string", "app_name", "KOG - TBK" }
    somabay  { applicationId "com.technovision.somabay"; resValue "string", "app_name", "Somabay" }
}
```

APK output naming:
```
<flavor>-<buildType>-v<versionName>.apk
```
Example: `somabay-debug-v1.1.apk`

### Capacitor Plugins Used
- `@capacitor/screen-orientation` — locks to landscape.
- `@capacitor/status-bar` — hides the Android status bar inside the experience.
- `@capacitor/app` — handles hardware back button.
- `@capacitor/core` — platform detection (`Capacitor.getPlatform()`).

### App Icons
Icons live in `resources/<project>/` and are generated with:
```bash
npx capacitor-assets generate --assetPath resources/<project> --android
```
Then copied into the relevant flavor's `res/` folder in `android/app/src/<flavor>/`.

---

## 13. Service Worker & Caching

A custom Workbox service worker (`public/sw.js`) is registered only in **API mode**. In static mode, any previously registered SW is automatically unregistered at startup.

The SW precaches the Vite build output and provides runtime caching strategies for API responses and media assets. See `CACHING_GUIDE.md` for details.

---

## 14. Asset Conventions

All project media lives under `public/projects/<projectPath>/`. The `projectPath` value (e.g., `"projects/light-house"`) is declared at the top of each project data file and used as the URL prefix throughout the data tree.

**Recommended folder structure under `public/projects/<slug>/`:**

```
<slug>/
├── images/
│   ├── background.jpeg          # Full-screen developer background
│   ├── project-highlight.png    # Image shown on ProjectSelector
│   └── gallery/
│       └── interior/
│           └── <UnitType>/      # Gallery images per unit type
├── videos/
│   ├── intro.mp4                # Splash video on project entry
│   ├── home/
│   │   ├── home_idle.mp4
│   │   └── home_out.mp4
│   ├── surroundings/
│   ├── amenities/
│   │   └── <amenityId>/
│   └── zones/
│       └── <propertyId>/
│           ├── views/
│           │   └── view1/ view2/ ...
│           └── floors/
│               └── <floorId>/
├── panorama/
│   ├── Interior/
│   │   └── <unitId>/
│   │       ├── <room>_furnished.jpg
│   │       └── <room>_empty.jpg
│   └── Balcony/
│       └── <propertyId>/
│           └── <unitId>.jpg
├── units/
│   ├── trans_from_floors_to_units.mp4
│   ├── rev_from_units_to_floors.mp4
│   └── <propertyId>/
│       └── <floorId>/
│           └── <unitId>.png     # Unit floor plan (used as idle "video")
├── highlight/
│   └── <PropertyName>.png
└── thumbnails/
    └── amenities/
        └── amenity1.jpeg ...
```

---

## 15. Step-by-Step: Adding a New Static Project File

This guide walks through adding a completely new project (e.g., `project-myproject.js`) as a static data source.

### Step 1 — Create the project data file

Create `src/data/project-myproject.js`. Use an existing file (`project-lighthouse.js`) as a reference.

```js
// 1. Import assets (logos, icons, SVG paths)
import MY_LOGO from '../assets/my-logo.svg';

// 2. Declare the asset base path (must match the public folder structure)
export const projectPath = "projects/my-project";

// 3. Declare feature flags and viewer settings
export const config = {
  USE_PREDEFINED_POS: true,
  USE_HOTSPOTS: false,

  INTERIOR_ZOOM_RANGE: { min: 0.8, max: 1.333 },
  INTERIOR_PITCH_RANGE: { min: -50, max: 40 },

  BALCONY_ZOOM_RANGE: { min: 1, max: 1.333 },
  BALCONY_PITCH_RANGE: { min: -40, max: 40 },
  BALCONY_YAW_RANGE: { min: -70, max: 70 },

  ZONES_TAB_TITLE: "PROPERTIES",
  BALCONY_TITLE: "Balcony View",
};

// 4. (Optional) Define gallery arrays
const gallery_TypeA = [
  { id: "g1", src: `/${projectPath}/images/gallery/interior/TypeA/01.jpg` },
  // ...
];

// 5. Export the developer object
export const DEVELOPER_MYPROJECT = {
  developerId: "my-developer",
  developerLogo: MY_LOGO,
  backgroundImage: `/${projectPath}/images/background.jpeg`,
  developerProjects: [
    {
      id: "my-project",
      name: "My Project Name",
      thumbnail: null,
      description: "Short project description.",
      introVideo: `/${projectPath}/videos/intro.mp4`,
      idleVideo: `/${projectPath}/videos/home/home_idle.mp4`,
      zoomoutVideo: `/${projectPath}/videos/home/home_out.mp4`,

      surroundings: {
        id: "surroundings",
        displayName: "Surroundings",
        zoomoutVideo: `/${projectPath}/videos/surroundings/surrounding_out.mp4`,
        videos: {
          forwardVideo: `/${projectPath}/videos/surroundings/surrounding_gen_trans_from_home.mp4`,
          reverseVideo: `/${projectPath}/videos/surroundings/surrounding_gen_rev_to_home.mp4`,
          idleVideo: `/${projectPath}/videos/surroundings/surroundings_gen_idle.mp4`,
        },
        items: [ /* surrounding POI items */ ],
      },

      amenities: {
        id: "amenities",
        displayName: "Amenities",
        zoomoutVideo: `/${projectPath}/videos/amenities/amenities_out.mp4`,
        videos: {
          forwardVideo: `/${projectPath}/videos/amenities/amenities_gen_trans_from_home.mp4`,
          reverseVideo: `/${projectPath}/videos/amenities/amenities_gen_rev_trans_to_home.mp4`,
          idleVideo: `/${projectPath}/videos/amenities/amenities_gen_idle.mp4`,
        },
        items: [ /* amenity items */ ],
      },

      zones: {
        id: "zones",
        displayName: "Zones",
        zoomoutVideo: `/${projectPath}/videos/zones/zones_out.mp4`,
        videos: { forwardVideo: null, reverseVideo: null, idleVideo: null },
        items: [
          {
            id: "zone1",
            displayName: "Zone Name",
            subtitle: "Residential Area",
            x: 0.5, y: 0.5,
            videos: {
              forwardVideo: `/${projectPath}/videos/zones/zones_gen_trans_from_home.mp4`,
              reverseVideo: `/${projectPath}/videos/zones/zones_gen_rev_to_home.mp4`,
              idleVideo: `/${projectPath}/videos/zones/zones_gen_idle.mp4`,
            },
            properties: [
              {
                id: "tower-a",
                type: "tower",
                displayName: "Tower A",
                highlight: `/${projectPath}/highlight/TowerA.png`,
                x: 0.5, y: 0.3,
                videos: {
                  forwardVideo: `/${projectPath}/videos/zones/tower-a/tower-a_gen_trans.mp4`,
                  reverseVideo: `/${projectPath}/videos/zones/tower-a/tower-a_gen_rev.mp4`,
                  idleVideo: `/${projectPath}/videos/zones/tower-a/views/view1/tower-a_view1_idle.mp4`,
                },
                floors: [
                  {
                    id: "floor-1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectPath}/highlight/TowerA/floor1.png`,
                    x: 0.25, y: 0.7,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/tower-a/floors/tower-a_floors_gen_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/tower-a/floors/tower-a_floors_gen_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/tower-a/floors/floor1/tower-a_floor1_idle.mp4`,
                    },
                    units: [
                      {
                        id: "A101",
                        unitTypeId: "A101",
                        displayName: "A101",
                        area: 110.0,
                        price: 5,
                        bedrooms: 2,
                        bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/Balcony/tower-a/A101.jpg`,
                        x: 0.5, y: 0.5,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/tower-a/floor1/A101.png`,
                        },
                      },
                    ],
                  },
                ],
                features: null,
                views: [
                  {
                    name: "View 1",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/tower-a/views/view1/tower-a_view1_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/tower-a/views/view1/tower-a_view1_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/tower-a/views/view1/tower-a_view1_idle.mp4`,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },

      unitTypes: {
        "A101": {
          area: 110.0,
          interior: {
            levels: [
              {
                name: "Level 1",
                rooms: [
                  {
                    id: "living",
                    name: "Living Room",
                    furnitureImgId: `/${projectPath}/panorama/Interior/A101/living_furnished.jpg`,
                    unfurnitureImgId: `/${projectPath}/panorama/Interior/A101/living_empty.jpg`,
                    hotspots: [],
                  },
                ],
              },
            ],
          },
          gallery: gallery_TypeA,
          cutSections: [],
          floorPlans: [],
          paymentPlans: [],
          serviceRooms: [],
        },
      },
    },
  ],
};
```

---

### Step 2 — Place all media assets in `public/`

Create the directory `public/projects/my-project/` and populate it following the [Asset Conventions](#14-asset-conventions) layout. All paths in the data file must correspond to real files here.

---

### Step 3 — Activate the project in `layers.js`

Open `src/data/layers.js`. Comment out the currently active import and uncomment (or add) your new one:

```js
// import { DEVELOPER_SOMABAY as DEVELOPER, projectPath, config } from "./project-lightlight";
import { DEVELOPER_MYPROJECT as DEVELOPER, projectPath, config } from "./project-myproject";
```

> Only **one** import should be active at a time in static mode.

---

### Step 4 — Verify `appConfig.js`

Ensure `USE_STATIC` is `true`:

```js
export const APP_CONFIG = {
  USE_STATIC: true,
  USE_PREDEFINED_POS: CONFIG.USE_PREDEFINED_POS,
  USE_HOTSPOTS: CONFIG.USE_HOTSPOTS,
};
```

---

### Step 5 — Test locally

```bash
npm run dev
```

Open `http://localhost:5173` and navigate through the project to confirm:
- Background image loads.
- Videos play (home idle, zone transitions, etc.).
- Unit pins appear at correct positions.
- 360° panoramas open.
- Balcony views open.
- Gallery images load.

---

## 16. Step-by-Step: Building an APK

### Prerequisites
- Node.js and npm installed.
- Android SDK installed (via Android Studio).
- `ANDROID_HOME` / `ANDROID_SDK_ROOT` environment variable set.
- Java 17+ JDK installed.
- The Gradle wrapper (`gradlew`) in `android/`.

---

### Step 1 — Delete the `dist` folder

Delete the existing build output to ensure a clean build:

```bash
# In the project root
rm -rf dist
```

Or manually delete the `dist/` folder from the file explorer.

---

### Step 2 — Verify the `public/` folder

Make sure `public/projects/` contains **exactly** the project folder(s) needed for this APK — no more, no less. Extra project folders will be bundled into the APK and increase its size significantly.

For example, if building the Somabay APK:
```
public/
└── projects/
    └── light-house/     ← only this one; remove any others
```

---

### Step 3 — Verify the active project in `src/data/layers.js`

Make sure the correct project import is uncommented (see [Step 3 above](#step-3--activate-the-project-in-layersjs)).

---

### Step 4 — Build the web app

Run in the **project root**:

```bash
npm run build
```

This outputs the production bundle to `dist/`.

---

### Step 5 — Sync with Capacitor

Run in the **project root**:

```bash
npx cap sync
```

This copies `dist/` into `android/app/src/main/assets/public/` and updates any Capacitor plugin code.

> Alternatively, use the **Webnative VS Code extension** to sync through the GUI.

---

### Step 6 — Build the APK with Gradle

Navigate to the `android/` folder and run Gradle:

```bash
cd android
./gradlew assemble<FlavorName>Debug
```

Replace `<FlavorName>` with the flavor matching your target deployment (capitalize first letter):

| Flavor | Command |
|---|---|
| `sandbox` | `./gradlew assembleSandboxDebug` |
| `demo` | `./gradlew assembleDemoDebug` |
| `tbk` | `./gradlew assembleTbkDebug` |
| `somabay` | `./gradlew assembleSomabayDebug` |
| `ebrochure` | `./gradlew assembleEbrochureDebug` |

For a **release** build:
```bash
./gradlew assemble<FlavorName>Release
```

The output APK will be in:
```
android/app/build/outputs/apk/<flavor>/<buildType>/<flavor>-<buildType>-v<version>.apk
```

Example: `android/app/build/outputs/apk/somabay/debug/somabay-debug-v1.1.apk`

---

### Generating New App Icons (when needed)

If the project requires new launcher icons:

**1. Generate icons for the specific project:**
```bash
# In the project root
npx capacitor-assets generate --assetPath resources/<project-name> --android
```

**2. Copy the output to the flavor folder:**

The command generates icons in `android/app/src/main/res/`. Copy (or move) them to the correct flavor subfolder:
```
android/app/src/<flavorName>/res/
```

**3. Restore the default icons:**
```bash
npx capacitor-assets generate --assetPath resources/main --android
```

This restores the base icons so the default flavor is not broken.

---

### Quick Build Checklist

| Step | Action |
|---|---|
| ☐ | Delete `dist/` folder |
| ☐ | `public/projects/` has only the target project's assets |
| ☐ | Correct project is active in `src/data/layers.js` |
| ☐ | `npm run build` (in root) |
| ☐ | `npx cap sync` (in root) |
| ☐ | `./gradlew assemble<Flavor>Debug` (in `android/`) |
| ☐ | Collect APK from `android/app/build/outputs/apk/<flavor>/debug/` |
