# Avoiding a full rebuild after code changes

The Android APK is a frozen snapshot of `dist/` at the moment someone last ran
`npm run build` + `npx cap sync` + a Gradle build (see
[android-build.md](.claude/rules/android-build.md)). Editing source files never changes an already
-installed APK by itself — but for day-to-day iteration you rarely need to run that full runbook.
This doc covers the faster options, in order of preference.

## 1. Just use a browser (fastest, covers most changes)

`npm run dev` and open the app in a regular browser tab — desktop Chrome, or the phone's own mobile
browser pointed at `http://<your-machine-LAN-IP>:5173` over the same WiFi network. Almost everything
in this app is React/JS running in a WebView the same way it runs in a browser tab, so Vite's HMR
reflects most changes in well under a second, with zero Capacitor/Android involvement.

**Doesn't cover:** anything that specifically depends on being inside a real Capacitor WebView or a
native plugin — e.g. `ScreenOrientation.lock()` in `App.jsx`, `Capacitor.getPlatform()` checks, or
the Service Worker's actual behavior once served from the packaged app's real origin (see the SW
caveat under Live Reload below).

## 2. Capacitor Live Reload (real native shell, live JS)

Runs the actual native app shell, but points its WebView at a live dev server instead of the bundled
`dist/` — so the app looks/behaves exactly like the packaged app, but JS/CSS changes hot-reload
without a rebuild.

**CLI shortcut** (simplest):
```bash
npx cap run android -l --external
```
Capacitor starts the Vite dev server, detects your machine's LAN IP, temporarily points
`capacitor.config.json`'s `server.url` at it, builds + installs once, and launches. From then on,
edits hot-reload directly in the running app.

**Manual equivalent**, if you want more control — temporarily add to `capacitor.config.json`:
```json
{
  "appId": "com.technovision.light",
  "appName": "Light Tour",
  "webDir": "dist",
  "server": {
    "url": "http://<your-machine-LAN-IP>:5173",
    "cleartext": true
  }
}
```
then `npx cap sync android` once and install that one debug build. `npm run dev` + reloading the
WebView reflects changes from then on.

**Requirements / caveats:**
- Device and dev machine must be on the same network and able to reach each other (check firewall /
  router client isolation if it doesn't connect).
- `cleartext: true` is required since the dev server serves over plain HTTP — Android blocks
  cleartext traffic by default otherwise.
- **Never ship this.** Revert `server.url`/`cleartext` from `capacitor.config.json` before any real
  build for testing or release — a build pointing at a dev machine is both broken once off that
  network and a real security hole if it ever reached a device outside your control.
- **Service Worker behavior may not perfectly match production here.** The app is served from
  `http://<dev-ip>:5173` in this mode, not the packaged app's real origin — SW registration/scope and
  Cache Storage contents can differ subtly. Anything offline/caching-related should still get a final
  check against a true built + installed APK before being considered verified (see
  `the-web-application-currently-deep-yao.md`'s on-device verification steps for exactly this reason).

## 3. `npx cap copy` instead of `npx cap sync`

Doesn't avoid rebuilding or reinstalling — it only skips the native-plugin-dependency sync step
within the eventual Gradle build, which saves a little time. Still requires `npm run build` → `cap
copy` → `./gradlew assemble<Flavor>Debug` → reinstall for a change to reach a real installed APK.
Only useful over full `cap sync` when you're doing pure-JS rebuild cycles with no plugin changes and
Live Reload isn't viable (e.g. no shared network between device and dev machine).

## What always needs a real rebuild, regardless of the above

None of the above help with:
- Native Java/Kotlin code, `AndroidManifest.xml`, `build.gradle` / `variables.gradle` changes
  (flavors, versioning, permissions, etc.).
- Adding, removing, or upgrading a Capacitor plugin — the native side has to be linked in.
- App icons / splash screens (`capacitor-assets generate` output, see android-build.md).
- `capacitor.config.json` itself — needs at least a `cap sync` to take effect natively.
- Final verification of Service Worker / offline behavior, for the reason noted above.

## Recommended workflow for this repo

Iterate in a browser or Live Reload for UI/logic changes. Fall back to the full
[android-build.md](.claude/rules/android-build.md) runbook only for: final pre-release verification
builds, anything touching native code/manifest/plugins, or confirming offline/Service-Worker
behavior — the same three cases the API-mode plan (`the-web-application-currently-deep-yao.md`)
already treats as needing a real on-device build, not just a dev-server preview.
