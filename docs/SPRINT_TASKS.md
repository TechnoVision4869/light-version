# Sprint Task Specifications

> Project: Techno Vision – Light Version  
> Sprint 1 Start: Saturday, April 18, 2026  
> Sprint 2 Start: Saturday, May 2, 2026

---

## Sprint 1

---

### 1. Video Rendering Optimization + Caching

| Field | Value |
|---|---|
| **Sprint** | Sprint 1 |
| **Assigned to** | Abdelrhman Abbas, Radwa Ahmed |
| **Actual Estimate** | 7 days |
| **Type** | Frontend |
| **Depends on** | — |

**Description:**  
Research and implement caching, streaming, and performance optimizations to make browsing projects smoother — particularly video transitions and playback.

**Approach discussed:**  
Use a BFS-based tree pre-fetching strategy. Run BFS at increasing depth levels (1, 2, 3, …) and use binary search to find the minimum depth that provides the best performance-to-network-usage balance.

- A function will pre-fetch children up to `n` levels deep (e.g., start with `n = 7` for full fetch, then reduce)
- Compare performance impact at each depth
- Identify whether the slowdown is in **video playback itself** or in **transitions between videos** — if the latter, streaming may be the right approach

**Relevant files in project:**
- `src/lib/cacheUtils.js` — existing cache utility layer
- `public/sw.js` — service worker handling fetch/cache strategies
- `src/components/Gallery.jsx` — gallery viewer
- `src/components/Panorama.jsx` — panorama viewer
- `src/lib/projectFetcher.js` — project data loading logic
- `src/components/SplashVideo.jsx` — initial video experience

**Subtasks:**
- [ ] UI animations should feel noticeably smoother after this task is complete

---

### 2. Offline Mode

| Field | Value |
|---|---|
| **Sprint** | Sprint 1 |
| **Assigned to** | Abdelrhman Abbas, Radwa Ahmed |
| **Actual Estimate** | 6 days |
| **Type** | Frontend |
| **Depends on** | Video Rendering Optimization + Caching |

**Description:**  
Allow users to download all project data at once and browse projects in offline mode. Especially relevant for the tablet/Capacitor version.

**Open questions to resolve:**
- Where is data stored when running as a tablet app via Capacitor — browser cache, native storage, or filesystem?
- Is the service worker making the app a PWA, and does that affect the offline strategy?
- What is the difference between caching while browsing vs. explicitly downloading to device storage?

**Relevant files in project:**
- `public/sw.js` — service worker; currently handles fetch caching
- `capacitor.config.json` — Capacitor configuration for native wrapper
- `src/lib/cacheUtils.js` — cache helpers
- `android/` — Android Capacitor build

**Notes:**  
This task builds directly on the caching infrastructure established in task 1. The offline storage strategy must account for both the PWA path (service worker cache) and the Capacitor native path (device storage APIs).

---

### 3. [BE] History Logs for User Activities

| Field | Value |
|---|---|
| **Sprint** | Sprint 1 |
| **Assigned to** | Ahmed Tarek |
| **Actual Estimate** | 6 days |
| **Type** | Backend |
| **Depends on** | — |

**Description:**  
Track and persist user activity logs in the backend. Covers actions performed across the Dashboard and Users pages.

**Relevant pages in project:**
- Dashboard (`Page: Dashboard, Users`)
- User management section in `src/components/admin/` and `src/components/user/`
- Authentication context in `src/store/jwt-context.jsx`

**Notes:**  
Logs should capture meaningful events (e.g., asset uploads, entity creation/deletion, login, role changes). Data will be consumed by the [FE] History Logs task in Sprint 2.

---

### 4. [BE] Duplicate Entity

| Field | Value |
|---|---|
| **Sprint** | Sprint 1 |
| **Assigned to** | Ahmed Tarek |
| **Actual Estimate** | 8 days |
| **Type** | Backend |
| **Depends on** | — |

**Description:**  
Implement the ability to duplicate entities such as Units, Zones, and Projects in the backend.

**Design decisions to consider:**
- Entities (e.g., units) are currently ordered in the flow-tree by `created_at`. Duplicated entities should follow the same ordering.
- May be a good opportunity to also consider a **drag-to-reorder** feature for entities in the flow-tree.
- Alternatively, sorting by name (like folder structure) could be more intuitive.

**Relevant files in project:**
- `src/api/` — API layer for entity operations
- `src/components/Room.jsx`, `src/components/RoomList.jsx` — unit/room display
- `src/components/admin/` — admin-side dashboard forms

**Notes:**  
The FE counterpart ([FE] Duplicate Entity, Sprint 2) depends on this task being complete.

---

## Sprint 2

---

### 5. [BE] "Trash" Feature

| Field | Value |
|---|---|
| **Sprint** | Sprint 2 |
| **Assigned to** | Ahmed Tarek |
| **Actual Estimate** | 2 days |
| **Type** | Backend |
| **Depends on** | — |

**Description:**  
When any asset is deleted, instead of permanent deletion it is moved to a Trash. Assets in Trash are permanently deleted after a configurable period (e.g., 30 days). Assets can also be restored from Trash at any time before permanent deletion.

**Relevant files in project:**
- `src/api/` — asset delete/restore endpoints
- `src/components/admin/` — admin asset management UI

**Notes:**  
The FE counterpart depends on this task. The 30-day window should be configurable server-side. Consider adding a background job/cron for permanent deletion.

---

### 6. [FE] "Trash" Feature

| Field | Value |
|---|---|
| **Sprint** | Sprint 2 |
| **Assigned to** | Radwa Ahmed |
| **Actual Estimate** | 2 days |
| **Type** | Frontend |
| **Depends on** | [BE] "Trash" Feature |

**Description:**  
Implement the frontend UI for the Trash feature. Deleted assets should be visually moved to a Trash view. Users can browse trashed assets, see remaining days before permanent deletion, and restore or permanently delete them.

**Relevant files in project:**
- `src/components/admin/` — admin asset management UI
- `src/components/Gallery.jsx` — asset gallery

**Subtasks:**
- [ ] Design — Trash page/modal layout, restore/delete actions, remaining days indicator
- [ ] Implementation — Wire up to BE Trash endpoints, update asset state management

---

### 7. [BE] Make Unit Data Easier to Fill / CRM

| Field | Value |
|---|---|
| **Sprint** | Sprint 2 |
| **Assigned to** | Ahmed Tarek |
| **Actual Estimate** | 5 days |
| **Type** | Backend |
| **Depends on** | — |

**Description:**  
Enable clients to update unit data more easily. This is a **top priority** feature. Two main approaches under consideration:

**Approach 1 — Table view:**  
Add an in-dashboard table view for units where data (area, price, bedrooms, etc.) can be edited directly inline. Supports filtering and coloring. Could extend to tables for all entities.

**Approach 2 — API for external CRM:**  
Export a secure API endpoint that a developer can call from their own CRM/database to send a JSON payload with unit data. Security via a token tied to the developer/project.

**Initial approach:**  
First iteration: allow reading a CSV file to bulk-update all units. Unit name is the unique primary key.

**Open questions:**
- Should there be an undo feature?
- Can a hidden "state" column be added?
- CAP theorem consideration: Consistency vs. Availability for concurrent updates

**Relevant files in project:**
- `src/components/UnitPanel.jsx` — unit data display
- `src/api/` — unit endpoints
- `src/data/` — unit data structure (`project-lighthouse.js`, `project-kog.js`, etc.)

---

### 8. [FE] Make Unit Data Easier to Fill / CRM

| Field | Value |
|---|---|
| **Sprint** | Sprint 2 |
| **Assigned to** | Abdelrhman Abbas |
| **Actual Estimate** | 5 days |
| **Type** | Frontend |
| **Depends on** | — |

**Description:**  
Frontend counterpart to the CRM task. Implement the UI for whichever approach is chosen — either a table view for in-dashboard unit editing or a CSV upload interface.

**Relevant files in project:**
- `src/components/UnitPanel.jsx` — unit detail panel
- `src/components/FilterPanel.jsx` — filtering UI (reusable pattern)
- `src/components/admin/` — admin forms

**Notes:**  
Share the same design decisions as the BE task. Coordinate approach selection before implementation starts.

---

### 9. [BE] Bulk Upload Assets

| Field | Value |
|---|---|
| **Sprint** | Sprint 2 |
| **Assigned to** | Ahmed Tarek |
| **Actual Estimate** | 1 day |
| **Type** | Backend |
| **Depends on** | — |

**Description:**  
Allow bulk uploading of assets (images, videos, panoramas) via the backend. Includes form handling and multi-file upload endpoint.

**Relevant files in project:**
- `src/api/` — asset upload endpoints
- `public/light-house/` — asset storage structure (images, panorama, videos, units)

**Subtasks:**
- [ ] Form handling for multi-file upload
- [ ] Bulk upload endpoint implementation in backend

---

### 10. [FE] Bulk Upload Assets

| Field | Value |
|---|---|
| **Sprint** | Sprint 2 |
| **Assigned to** | Abdelrhman Abbas |
| **Actual Estimate** | 3 days |
| **Type** | Frontend |
| **Depends on** | [BE] Bulk Upload Assets |

**Description:**  
Frontend UI for bulk uploading assets. The upload should be non-blocking (background uploading) with a visible progress indicator.

**Relevant files in project:**
- `src/components/admin/` — admin dashboard asset management UI
- `src/assets/` — local asset references

**Subtasks:**
- [ ] Allow background uploading (non-blocking) with a progress bar

---

### 11. Limit Asset Size

| Field | Value |
|---|---|
| **Sprint** | Sprint 2 |
| **Assigned to** | Abdelrhman Abbas, Ahmed Tarek |
| **Actual Estimate** | 1 day |
| **Type** | Frontend + Backend |
| **Depends on** | — |

**Description:**  
Enforce a maximum file size on asset uploads (e.g., images cannot exceed 2 MB). Validation should exist on both the frontend (immediate user feedback) and backend (server-side enforcement).

**Relevant files in project:**
- `src/components/admin/` — upload forms
- `src/api/` — upload endpoints
- Backend upload handler

**Notes:**  
Limits should be configurable and clearly communicated to users on upload failure.

---

### 12. [BE] Document System Requirements, Cost Estimation, etc.

| Field | Value |
|---|---|
| **Sprint** | Sprint 2 |
| **Assigned to** | Ahmed Tarek |
| **Actual Estimate** | 5 days |
| **Type** | Backend |
| **Depends on** | — |

**Description:**  
Produce backend-side documentation and analysis covering system requirements, cost estimation, and capacity planning.

**Open questions:**
- What triggers a move to a better infrastructure tier?
- Current plan supports up to **150 GB storage**

**Relevant analytics to include:**
- Storage usage breakdown per project
- Remaining storage capacity analysis exposed to users

**Subtasks:**
- [ ] System and browser requirements documentation
- [ ] Cost estimation — server costs + additional services (Development + Infrastructure breakdown)
- [ ] Concurrent users capacity analysis (traffic planning)

---

### 13. [FE] Document System Requirements, Cost Estimation, etc.

| Field | Value |
|---|---|
| **Sprint** | Sprint 2 |
| **Assigned to** | Radwa Ahmed |
| **Actual Estimate** | 5 days |
| **Type** | Frontend |
| **Depends on** | [BE] Document System Requirements |

**Description:**  
Frontend-facing documentation and UI for system requirements, cost breakdown, and storage analytics. Builds on the data and analysis produced by the BE task.

**Relevant files in project:**
- `src/components/admin/` — admin dashboard where storage analytics could be displayed
- `src/store/` — app-wide state, relevant for usage data

**Subtasks:**
- [ ] System and browser requirements page/section
- [ ] Cost estimation display — Development + Infrastructure
- [ ] Concurrent users / traffic display
- [ ] Storage usage per project with remaining capacity indicator

---

### 14. [FE] History Logs for User Activities

| Field | Value |
|---|---|
| **Sprint** | Sprint 2 |
| **Assigned to** | Abdelrhman Abbas |
| **Actual Estimate** | 2 days |
| **Type** | Frontend |
| **Depends on** | [BE] History Logs for User Activities |

**Description:**  
Frontend UI for displaying user activity history. Shown on Dashboard and Users pages. Consumes the log data produced by the [BE] History Logs task from Sprint 1.

**Relevant files in project:**
- `src/components/admin/` — admin dashboard panels
- `src/components/user/` — user profile/management views
- `src/store/jwt-context.jsx` — user identity context

**Notes:**  
Consider filtering by user, action type, and date range. The UI should make it easy to audit recent changes.

---

### 15. Help Instructions

| Field | Value |
|---|---|
| **Sprint** | Sprint 2 |
| **Assigned to** | Radwa Ahmed |
| **Actual Estimate** | 1 day |
| **Type** | Frontend |
| **Depends on** | — |

**Description:**  
Add in-app help/guidance for users. Currently the approach is training, but adding contextual hints and tooltips across all pages would be beneficial for onboarding.

**Pages affected:** All pages

**Relevant files in project:**
- `src/components/Layout.jsx` — global layout wrapper, ideal for tooltip/help overlay
- `src/components/ui/` — UI components library
- `src/components/InfoPopup.jsx` — existing popup component that could be reused or extended

**Notes:**  
Still requires discussion with Eng. Tareq, Islam, and Morshdy before finalizing scope. Possible approaches:
- Tooltip overlays on key interactive elements
- A guided tour / walkthrough on first login
- A floating help button linking to documentation

---

## Dependency Map

```
Sprint 1
  Video rendering ──────────────────────────────► Offline mode
  [BE] History logs ────────────────────────────► [FE] History logs (Sprint 2)
  [BE] Duplicate entity ────────────────────────► [FE] Duplicate entity (Sprint 2)

Sprint 2
  [BE] Trash feature ──────────────────────────► [FE] Trash feature
  [BE] Bulk upload assets ─────────────────────► [FE] Bulk upload assets
  [BE] Document system requirements ──────────► [FE] Document system requirements
```
