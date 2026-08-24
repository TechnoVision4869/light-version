# Android APK build

Runbook for producing a flavor-specific APK after `npm run build`.

1. Delete `dist/` for a clean build.
2. **Prune `public/projects/`** — must contain only the target project's folder. Extra project folders get bundled and bloat the APK.
3. Confirm the correct import is active in `src/data/layers.js` (see [data-model.md](data-model.md)).
4. `npm run build`
5. `npx cap sync` — copies `dist/` into `android/app/src/main/assets/public/`.
6. `cd android && ./gradlew assemble<Flavor>Debug` (or `Release`).

Flavors (`android/app/build.gradle`): `sandbox`, `ebrochure`, `demo`, `tbk`, `somabay`.

Output: `android/app/build/outputs/apk/<flavor>/<buildType>/<flavor>-<buildType>-v<version>.apk`

## New app icons (only when a flavor needs updated launcher icons)

```bash
npx capacitor-assets generate --assetPath resources/<project-name> --android
# copy output from android/app/src/main/res/ into android/app/src/<flavorName>/res/
npx capacitor-assets generate --assetPath resources/main --android   # restore default icons
```

Full detail: docs/DOCUMENTATION.md §16.
