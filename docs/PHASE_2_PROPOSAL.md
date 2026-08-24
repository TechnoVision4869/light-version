# Phase 2 — Feature Proposal
**Presented to:** Product Owner
**Prepared by:** Development Team
**Date:** March 30, 2026

---

## Overview

This document outlines the planned improvements and new features for Phase 2. The focus is on making the system faster, easier to use, and better equipped for real-world operation across multiple projects and teams.

---

## 1. Smoother Video Playback & Faster Loading

**Goal:** Make navigating between project views feel instant with no waiting.

Currently, videos and images can feel slow to load when switching between zones or units. We plan to intelligently pre-load content in the background before the user needs it — similar to how streaming services buffer the next episode while you're watching the current one.

We will test different pre-loading depths and find the sweet spot between speed and data usage. We will also identify exactly where the delay occurs (is it the video itself, or the transition between views?) so we can apply the right solution.

We have already started research and groundwork on this.

---

## 2. Offline Mode

**Goal:** Allow users to use the app without an active internet connection.

Once a project is loaded, it will remain fully usable even if the connection drops. This is especially useful for on-site presentations where Wi-Fi may be unreliable.

---

## 3. Smarter Media Uploading

**Goal:** Upload related media together, linked to the right place automatically.

Instead of uploading everything at once as a large folder, uploads will be grouped by context — for example: all gallery images for a specific unit, or the three videos (forward, reverse, idle) for a specific zone. This keeps files organized and correctly linked to their entities from the moment they are uploaded.

---

## 4. Drag to Re-order Media

**Goal:** Give content managers full control over the display order of images and videos.

For any list of media (e.g., gallery images, cut-section views), users will be able to drag and drop items to rearrange them. This avoids the frustration of media appearing in the wrong order.

---

## 5. Improved Asset Library — Folder-Style Tags

**Goal:** Make the asset library feel like a familiar file browser.

Currently, assets can only carry a single tag. We propose replacing this with a path-style tagging system — for example:
`interior / camilia / furniture`
instead of a flat single tag. This makes it much easier to browse and filter assets, similar to navigating folders on a computer.

---

## 6. Background Uploading with Progress Indicator

**Goal:** Let content managers keep working while files are uploading.

Instead of locking the screen during uploads, files will upload quietly in the background. A small progress bar will always be visible so the user knows the status without being blocked from doing other tasks.

---

## 7. Activity History Logs

**Goal:** Keep a full record of who did what and when.

Every action taken by a user — creating, editing, or deleting content — will be logged with a timestamp and the user's identity. This is valuable for accountability, troubleshooting, and audit purposes.

---

## 8. System Documentation & Cost Estimation

**Goal:** Provide clear, formal documentation for business and technical planning.

We will deliver a document covering:

- **System & browser requirements** — what devices and browsers the app supports.
- **Cost estimation** — broken down into development cost and infrastructure cost (server, storage, and any additional services). This is essential for pricing the service.
- **Concurrent users capacity** — how many users can use the system at the same time.

> **Note on current storage:** The current plan includes up to **150 GB** of storage. When the project grows beyond this, we will migrate to a larger infrastructure — this will be planned and communicated in advance.

---

## 9. Upload Context Indicator

**Goal:** Always show the user exactly what they are uploading and where it will go.

When a user is in the middle of an upload, the interface will clearly display the context — for example: *"You are uploading gallery images for Unit 3B in Camilia."* This removes any guesswork and prevents accidental misplacement.

---

## 10. Drag to Re-order Entities

**Goal:** Let users control the order in which projects, zones, amenities, and units appear.

Content managers will be able to drag and drop entire entities (not just media) to reorder them. Alternatively, we may provide an automatic sort-by-name option — similar to how files are sorted alphabetically in a file browser.

---

## 11. Asset Library Scoped Per Project

**Goal:** Show only relevant assets when working inside a project.

Currently, the asset library displays all assets across all projects under a developer. We will change this so that the library shows only the assets that belong to the current project — making it faster to find what you need.

---

## 12. Draft Mode — Test Before Publishing

**Goal:** Allow safe internal testing of a project before it is visible to clients.

Projects can be kept in a **Draft** state while being built or updated internally. Publishing a project to clients (making it visible to end users) will require approval from a **Super Admin** or **System Admin**. This prevents incomplete or incorrect content from reaching clients by accident.

---

## 13. Duplicate Entities

**Goal:** Speed up content creation by copying existing entities.

Users will be able to duplicate units, zones, projects, and similar entities — preserving all their settings and linked content as a starting point. This avoids repetitive manual data entry when creating similar items.

---

## 14. Refined User Roles & Permissions

**Goal:** Give the right level of access to the right people.

We propose the following role structure:

| Role | Access Level |
|---|---|
| **Super Admin** | Full access to all operations, including deleting projects and developers |
| **Sub Admin** | Same as Super Admin, except cannot delete projects or developer accounts — requires Super Admin approval |
| **Technician** | Can add and edit media, and create projects — but cannot create or manage developer accounts |

This ensures sensitive operations are protected without slowing down day-to-day content work.

---

## 15. Mini Map for Interior Navigation *(Pending Discussion)*

**Goal:** Help users orient themselves when navigating inside a building or unit.

A small interactive map overlay would show the user's current position within the interior, making it easier to navigate between rooms. This feature requires further discussion with the product owner before it proceeds.

---

## Summary

| # | Feature | Category |
|---|---|---|
| 1 | Smoother video playback & loading | Performance |
| 2 | Offline mode | Reliability |
| 3 | Smarter grouped media uploading | Content Management |
| 4 | Drag to re-order media | UX |
| 5 | Folder-style tags in asset library | UX |
| 6 | Background uploading + progress bar | UX |
| 7 | Activity history logs | Admin / Audit |
| 8 | System documentation & cost estimation | Business |
| 9 | Upload context indicator | UX |
| 10 | Drag to re-order entities | UX |
| 11 | Asset library scoped per project | UX |
| 12 | Draft mode before publishing | Safety / Workflow |
| 13 | Duplicate entities | Content Management |
| 14 | Refined user roles & permissions | Security / Admin |
| 15 | Mini map for interiors *(pending)* | UX |
