# Not needing to rebuild the APK for React/CSS changes

Normally: edit code → `npm run build` → `npx cap sync` → `./gradlew assemble<Flavor>Debug` →
reinstall on the device. That's the [android-build.md](.claude/rules/android-build.md) runbook, and
it's the only way changes reach an *already-installed* APK.

**Live Reload skips all of that — for your own dev-time testing.** It installs the app once, but
points its WebView at your running `npm run dev` server instead of the bundled files — so when you
save a React component or a CSS file, the change appears in the app on your device/emulator
immediately, with no rebuild and no reinstall. This only works on a device connected to your dev
machine — see `OTA_UPDATES.md` for how (or whether) to push updates to users who already have the
APK installed elsewhere.

## How to use it

1. Connect a device (USB, with USB debugging on) or start an Android emulator.
2. Run:
   ```bash
   npx cap run android -l --external
   ```
3. Wait for it to build and install once — this takes as long as a normal build, but it's the *last*
   time you'll need to for this session.
4. Edit any `.jsx`/`.js`/`.css` file and save. The app on the device updates on its own within a
   second or two, no further commands needed.
5. When you're done, `Ctrl+C` to stop it. Run `git diff capacitor.config.json` — if the command left
   anything changed there, revert it before doing a real build (see warning below).

That's it for day-to-day iteration.

## Requirements

- Device and your dev machine must be on the same WiFi network (the `--external` flag is what makes
  it reachable from a physical device instead of just an emulator).
- If it can't connect, it's almost always a firewall or router client-isolation issue blocking the
  device from reaching your machine's dev server port.

## One important warning

Never ship a build made this way. It points the app at your dev machine's IP — that only works while
your machine is running the dev server on that network, and shipping it would be a real security
issue if it ever ran outside your control. Always go back to the normal
[android-build.md](.claude/rules/android-build.md) runbook for anything that leaves your machine:
release builds, builds you hand to someone else to test, etc.

## What this doesn't cover

- Native code, `AndroidManifest.xml`, `build.gradle` changes, or adding/upgrading a Capacitor plugin
  — these need a real rebuild regardless, since Live Reload only swaps out the web content.
- Final verification of offline/Service-Worker behavior — under Live Reload the app is served from
  your dev machine's address, not the packaged app's real origin, so caching can behave slightly
  differently. Do one real build-and-test pass for anything offline-related before calling it done.
