# Getting code updates to users who already installed the APK (OTA — Over-The-Air updates)

`LIVE_RELOAD.md` is about *your own* dev-time iteration. This is a different question: once a build
is out on a sales-staff tablet or handed to someone, how do they get a code fix without you rebuilding,
re-signing, and reinstalling that exact device? **Not implemented — this is a documentation-only
overview of the real options, so a decision can be made deliberately.**

## Option 1: Play Store auto-update (the default, no extra work — but not an alternative to rebuilding)

This is what happens today with zero changes: bump `versionCode`, build a signed AAB, upload to Play
Console, users get it automatically (or manually check for updates) via the Play Store app. Worth
naming explicitly because it's easy to conflate with "not needing to rebuild" — **it still requires a
full rebuild, re-sign, and re-upload for every change**, just like right now. It only automates
*distribution* to users, not the release process itself. Also requires the signing/Play Console setup
from Step 6 of `the-web-application-currently-deep-yao.md`, which doesn't exist yet.

## Option 2: OTA JS-bundle updates (CodePush-equivalent for Capacitor)

The app periodically checks a small version manifest (when online), and if a newer web bundle
(`dist/`) exists, downloads and caches it in the background, then serves the WebView from that cached
bundle instead of the one baked into the APK at build time — typically applied on next app launch,
not hot-swapped mid-session. Crucially, **this stays fully offline-capable between updates** — it's
"fetch a fresh self-contained bundle when online, then run entirely from what's cached otherwise,"
not "always load from a live server" — which fits this app's tablet/offline requirement, unlike
pointing `capacitor.config.json`'s `server.url` permanently at a hosted site would.

Real implementations — one free path, two paid:
- **`@capgo/capacitor-updater`, self-hosted (free)** — the plugin itself is open-source and free; you
  host the bundle + version manifest yourself (e.g. on the existing backend, same "outside this
  frontend repo" work as Option 3 below — Capgo just gives you the client-side plugin and update
  protocol instead of writing that part from scratch).
- **`@capgo/capacitor-updater`, using Capgo's cloud service (paid)** — same plugin, but Capgo hosts
  and manages the bundle/rollout for you instead of you standing up hosting yourself.
- **Ionic AppFlow Live Updates (paid)** — Ionic's own hosted CI/CD + OTA service, tightly integrated
  with Ionic tooling, a separate product from Capgo.

**Trade-offs:**
- Adds a new dependency and a real moving part: a bundle-hosting/version-manifest server (self-hosted
  or third-party), plus a release step to publish each update there.
- **Only covers JS/CSS/HTML/asset changes** — cannot OTA-update native code: no new Capacitor
  plugins, no `AndroidManifest.xml`/`build.gradle` changes, no native permission changes. Anything
  native still needs the full rebuild-and-republish cycle (Option 1).
- App store policy: Google Play is generally permissive about this pattern (it's just downloading and
  running your own web content, same category as this app's existing Service Worker caching); Apple's
  App Store is stricter about it if iOS is ever targeted — not a concern for this Android-only app
  today, but worth knowing if that changes.

## Option 3: Custom-built equivalent (no third-party dependency)

Build a smaller version of Option 2 using infrastructure this app already has: the Service Worker and
Cache Storage (`public/sw.js`) already do versioned asset caching (`techno-vision-assets-v4`). The
same idea could extend to the app shell itself — host `dist/` on the existing backend/CDN, check a
`version.json` on launch, download and cache the new bundle if newer, and load from that cache
instead of the origin bundled at build time. **This requires work outside this frontend repo** — a
place to serve the bundle + version manifest from, most naturally the existing backend repo (though
it doesn't strictly have to be; any static host/CDN would do).

**Trade-offs:** no new dependency or third-party service, full control — but real engineering work:
bundle packaging, atomic swap (never leave the app serving a half-downloaded bundle), rollback safety
if a bad update ships, and handling a corrupted/partial download gracefully. This is essentially
reinventing Option 2's plugins from scratch.

## Summary

| | Rebuild avoided? | Covers native changes? | Stays offline-capable? | New dependency? |
|---|---|---|---|---|
| Play Store auto-update | No — still rebuilds every time | Yes (it's a full new APK) | Yes | No |
| OTA plugin (Capgo/AppFlow) | Yes, for JS/CSS/assets | No | Yes | Yes (plugin + hosting) |
| Custom-built | Yes, for JS/CSS/assets | No | Yes | No, but real build effort |

For a tablet-based, offline-tolerant app like this one, **Option 2 (OTA plugin)** is the closest fit to
"users get updates without a full reinstall" while preserving the offline-first design the rest of
this app is built around — but it's a real architectural addition, not a quick config change, so
worth deciding deliberately rather than defaulting into it.