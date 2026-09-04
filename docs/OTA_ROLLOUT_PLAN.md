# 5-Day Plan: OTA App Updates + Update Notifications (No Backend Changes)

## Scope

This is a focused, 5-day (Wednesday-Teusday, skipping Friday and Saturday) implementation plan covering exactly two priorities from
the larger project plan (`the-web-application-currently-deep-yao.md`):

1. **App updates reach users' devices without installing a new APK.**
2. **Users are notified when an update is available.**

**Explicitly out of scope for these 5 days** (tracked separately in the main plan, not touched here):
Play Store signing/release setup, role-based access hardening, the Service Worker CORS fix, and the
full multi-project offline-download queue (Phase 1). None of those are needed for this feature.

**Hard constraint honored throughout:** no backend code changes. Every step below is either pure
frontend/native-shell work in this repo, or file *hosting* (which is storage, not backend code — see
Day 1 for why that distinction matters).

**Compatibility check done before writing this plan:** this app runs Capacitor `8.1.0`
(`package.json`). The recommended plugin below needs to be confirmed against Capacitor 8 compatibility
as the very first task on Day 1 — plugin ecosystems move fast and this should be verified against the
plugin's current release notes right before installing, not assumed from memory.

---

## اليوم 1 (الاربعاء) — القرار + التركيب الأساسي ✅ تم
## Day 1 (Wednesday) — Decision + Base Setup ✅ Done

### Step 1: Choose how updates will be hosted
**Technical:** Decide between two ways to deliver the updated app bundle to devices, since we're
excluding backend work:
- **(a) Self-hosted static file storage** (e.g. Firebase Hosting, Cloudflare Pages, S3) — we upload the
  built app files ourselves to a simple storage service. This is *not* a backend code change — it's
  file storage, no server logic, no coordination with the backend team needed. Free or near-free tier
  is enough for our file sizes.
- **(b) Capgo's paid cloud service** — the plugin vendor hosts everything for us; we just push a build
  through their dashboard/CLI. Zero hosting setup, but recurring cost and our build files live on a
  third party's servers.

**بالعربي:**
عايزين نحدث التطبيق اللي موجود على أجهزة المستخدمين من غير ما نعمل APK جديد وننزله من المتجر تاني.
عشان كده لازم يكون فيه "مكان" يحط فيه التطبيق النسخة الجديدة، والتطبيق يروح يجيبها منه لوحده.

- **الخيار الأول (استضافة ذاتية بسيطة):** بنرفع ملفات التحديث على مكان تخزين بسيط زي Firebase أو
  Cloudflare — ده مش "تعديل في الـ backend"، ده مجرد رفع ملفات، زي ما بترفع صورة على جوجل درايف.
  **الإيجابيات:** رخيص جدًا أو مجاني، مفيش اعتماد على شركة تالتة بشكل دائم.
  **السلبيات:** محتاجين حد يجهز الحساب على الخدمة دي أول مرة (خطوة بسيطة بس لازم تتعمل).
- **الخيار التاني (خدمة Capgo السحابية المدفوعة):** الشركة صاحبة الأداة بتستضيف كل حاجة لينا، إحنا بس
  بنبعت النسخة الجديدة وهما بيتكفلوا بالباقي.
  **الإيجابيات:** أسرع وأسهل، مفيش إعداد تخزين من عندنا خالص.
  **السلبيات:** تكلفة شهرية/سنوية مستمرة، وملفات التطبيق بتتخزن عند شركة خارجية.

**Backend required?** No, for either option. Option (a) needs someone to set up a storage account
(a one-time, non-code task) — this is infrastructure, not backend engineering. **Decision needed on Day 1** — everything else this week depends on it. Recommendation: option (a) unless
speed-to-ship outweighs the small setup cost, since it avoids a recurring third-party dependency.

**✅ Decision made: option (a), self-hosted, on Cloudflare** (Workers with static assets — Cloudflare's
current unified product, which replaced the older separate "Pages" product referenced above).
Hostinger was considered first since the team already has a paid account there, but that account turned
out to be domain registration only (no hosting plan) — adding hosting would have meant a new purchase,
canceling out the "free, no extra cost" reason for choosing self-hosting. Cloudflare is genuinely free
at this file size, no purchase needed.

Setup completed today:
- Deployed a Worker named **`light-tour-ota`**, live at
  `https://light-tour-ota.cold-bush-b9d3.workers.dev` — HTTPS automatic.
- Uploaded a placeholder `index.html` plus a `_headers` file
  (`Access-Control-Allow-Origin: *`) so the app's JS `fetch()`-based update checks won't be blocked by
  CORS once real files are published here.
- This URL is what Day 2 (Step 3) will publish the real bundle `.zip` + version manifest to, replacing
  the placeholder.

### Step 2: Install and wire the update plugin into the app
**Technical:** `npm install @capgo/capacitor-updater` (works with either hosting choice from Step 1 —
the plugin itself is free either way; only the *hosting* differs), `npx cap sync android`, initialize
it in the app's entry point per the plugin's required startup call, and do one debug build to confirm
the app still launches normally with the plugin present but inactive.

**بالعربي:**
تركيب "أداة" جوه التطبيق مهمتها إنها تدور على تحديثات جديدة وتنزلها. النهاردة إحنا بس بنركبها ونتأكد
إن التطبيق لسه شغال عادي بيها، من غير ما نفعّل عملية التحديث نفسها لسه.

**Backend required?** No.

**✅ Done:**
- Installed `@capgo/capacitor-updater@8.51.15` (confirmed compatible with this repo's Capacitor `^8.1.0`
  peer dependency, and Capgo's v7→v8 migration notes confirmed no breaking plugin-API changes).
- `capacitor.config.json` now has `plugins.CapacitorUpdater.autoUpdate: false` — plugin is present but
  inactive, per this step's intent.
- Wired the required `CapacitorUpdater.notifyAppReady()` startup call into `src/App.jsx`, following the
  existing platform-guarded `useEffect` pattern already used there for `ScreenOrientation`/`StatusBar`.
- `npx cap sync android` registered the native plugin; `./gradlew assembleSandboxDebug` built cleanly →
  `sandbox-debug-v1.8.apk`. `eslint src/App.jsx` shows no new errors from the change.
- **Still pending:** installing that APK on an actual device/emulator to visually confirm normal launch
  and check `adb logcat` for no errors from the new code — no device was connected yet to do this. Not
  blocking Day 2, but should be closed out before Day 3's first end-to-end test.

---

## اليوم 2 (الخميس) — نشر التحديث + آلية الفحص التلقائي ✅ تم
## Day 2 (Thursday) — Publish Mechanism + Auto-Check Flow ✅ Done

### Step 3: Package and publish the first test update
**Technical:** `npm run build`, package `dist/` into the bundle format the plugin expects, upload it
to whichever hosting was chosen Day 1, and publish the small "version manifest" file the app will poll
to know if something new exists.

**بالعربي:**
دلوقتي بنجهز أول نسخة تجريبية من التحديث ونرفعها على المكان اللي اتفقنا عليه إمبارح، مع ملف صغير بيقول
"النسخة الحالية رقمها كام" عشان التطبيق يقدر يقارن.

**Backend required?** No — this is a build-and-upload step, same category as Step 1(a).

**✅ Done — and made repeatable, not a one-off.** Two version numbers turned out to be involved, and
keeping them separate was the key design decision: `android/app/build.gradle`'s `versionName`
(`"1.9"`) is the **native APK baseline** and is untouched by this step, today or in the future.
`package.json`'s `version` field (previously an unused Vite default, `"0.0.0"`) was repurposed as the
**OTA bundle version counter only** — seeded to `"1.9.0"`, auto-incremented via npm's built-in
`npm version patch --no-git-tag-version` on every publish.

Added `scripts/publish-ota.js` (new npm script `npm run ota:publish`) that on every run: bumps the
version, builds, zips `dist/` via `npx @capgo/cli@latest bundle zip` (no login/API key needed for local
zipping), and writes `manifest.json` + a `_headers` CORS file into a generated `ota-publish/` folder
(gitignored, same category as `dist/`). First run produced `1.9.1` — `ota-publish/bundle-1.9.1.zip` +
`manifest.json` pointing at `https://light-tour-ota.cold-bush-b9d3.workers.dev/bundle-1.9.1.zip`.
Uploading that folder to the Cloudflare Worker (drag-and-drop, same as Day 1) is still a manual dashboard
step each time — not automated, since that would need a `wrangler` API token this plan doesn't set up.

### Step 4: Build the update-check + background download flow
**Technical:** On app launch (and optionally on resume from background), call the plugin's check-for-
update API against the manifest published in Step 3; if a newer version exists, download it in the
background. Keep this resilient to being offline — if the check fails (no connectivity), the app must
silently continue running the currently-installed version, consistent with this app's existing
offline-first design (no error shown, no blocking).

**بالعربي:**
التطبيق هيبقى بيتحقق لوحده كل ما حد يفتحه: "فيه نسخة أحدث ولا لأ؟" لو فيه، هيبدأ ينزلها في الخلفية من
غير ما يوقف المستخدم عن استخدام التطبيق. ولو مفيش نت وقتها، التطبيق يكمل عادي بالنسخة اللي عنده من غير
أي مشاكل — ده مهم جدًا لأن التطبيق أصلاً مصمم يشتغل بدون إنترنت.

**Backend required?** No.

**✅ Done:**
- New `src/lib/otaUpdater.js` (`checkForUpdate()`): fetches the Cloudflare-hosted `manifest.json`,
  compares its `version` against `CapacitorUpdater.current().bundle.version` (plain string inequality —
  no semver library in this repo, and we control what gets published, so this is an intentional
  simplification), and calls `CapacitorUpdater.download()` if different. Does **not** call `set()`/apply
  — that's Day 3's "Restart Now" button.
- Wired into `src/App.jsx` in a new platform-guarded `useEffect`, following the exact pattern already
  used for `StatusBar`'s resume listener: runs on launch and again on every `resume` event, wrapped in
  try/catch with `console.warn` so a failed/offline check never surfaces anything to the user.
- Confirmed no native/CORS blockers: `android/app/src/main/res/xml/config.xml` has `<access origin="*" />`
  (no allowlist to update), no CSP in `index.html`, and `public/sw.js`'s routing only special-cases
  `/assets/file/*` and the API hostname — a `*.workers.dev` request passes through its default
  Network-First branch untouched.
- `npx cap sync android` + `./gradlew assembleSandboxDebug` built cleanly with the new code.
  `eslint src/App.jsx src/lib/otaUpdater.js scripts/publish-ota.js` shows no new errors.
- **On-device test done** (via `chrome://inspect/#devices`, closing out Day 1's pending check too):
  confirmed the full chain — `version native 1.9` → `current()` → manifest fetch → `download()` →
  `Downloading .../bundle-1.9.1.zip` → `Download succeeded: SUCCEEDED` → bundle stored with
  `status: "pending"`.
- **Bug found and fixed by that test**: since `set()` is intentionally never called (Day 3 scope), the
  active bundle stays `builtin`/`1.9` forever, so the original `checkForUpdate()` — which only compared
  against `current().bundle.version` — re-triggered a full ~15 MB re-download of `1.9.1` on **every**
  app resume (4 downloads observed in a few minutes of testing). Fixed by also checking
  `CapacitorUpdater.list()` for an already-downloaded matching version (any status other than `"error"`)
  before calling `download()` again. Rebuilt (`sandbox` and `ebrochure` debug flavors both) and
  **re-verified on-device**: on the fixed build, `current()` → `list()` runs on resume with no
  follow-up `download()` call, confirming the already-downloaded `1.9.1` bundle is correctly reused
  instead of re-fetched every time.

---

## اليوم 3 (الاحد) — إشعار المستخدم بوجود تحديث ✅ تم (متأكد منه على جهاز حقيقي)
## Day 3 (Sunday) — Notify Users of the Update (Priority 2) ✅ Done — verified on a real device

### Step 5: Build the "update available / ready" notification
**Technical:** Listen to the plugin's download-progress/download-complete events and show a small,
non-blocking banner or toast (reusing `react-hot-toast`, already used elsewhere in this app) reading
something like "Update ready — restart to apply," with a "Restart Now" button (calls the plugin's
apply/reload function) and a way to dismiss and be reminded later. Never force an immediate restart
mid-task — the user decides when.

**بالعربي:**
دي الخطوة اللي هتخلي المستخدم يعرف إن فيه تحديث جاهز. هيظهرله شريط بسيط في الشاشة بيقوله "فيه تحديث
جاهز — اضغط للتحديث الآن"، وهو اللي يقرر يحدث دلوقتي ولا بعدين. التطبيق مش هيقفل أو يعيد التشغيل من غير
ما المستخدم يوافق، عشان ميقاطعش شغله.

**Backend required?** No.

**✅ Done:**
- `src/lib/otaUpdater.js`'s `checkForUpdate()` changed to *return* an already-downloaded matching bundle
  (instead of `null`) — needed so a pending update can be (re-)notified across sessions, not just at the
  moment it first downloads.
- New `src/components/OtaUpdateToast.jsx` (`showUpdateReadyToast(bundle)`) — first
  `toast((t) => <JSX/>)` render-prop usage in this codebase (every prior `toast()` call was a plain
  string); uses a fixed `id: "ota-update-ready"` so repeated resume-checks update the same toast in
  place rather than stacking duplicates — this is what implements "dismiss and be reminded later" with
  no extra state. Buttons reuse the existing `Button` component (`@/components/ui/button`) to match the
  app's design system. "Restart Now" calls `CapacitorUpdater.set({ id: bundle.id })` — confirmed from
  the plugin's own docs that this is a **terminal operation** (destroys the JS context immediately, no
  code after it runs), so the handler only has a `catch` for a pre-reload failure, nothing "on success."
  "Later" just dismisses.
- Wired into `src/App.jsx`'s existing Day-2 update-check effect: captures `checkForUpdate()`'s return
  value and calls `showUpdateReadyToast()` when non-null.
- Confirmed via `src/store/MainContextProvider.jsx` that this should stay a plain toast, not a
  `MainContext` overlay — that overlay slot is deliberately single-slot and would fight the user's
  current screen.
- `npm run build` + `npx cap sync android` + `./gradlew assembleSandboxDebug assembleEbrochureDebug`
  all built cleanly; `eslint` on the three touched/new files shows no new errors.

### First end-to-end manual test
Publish a second test version, open the app on a real device already running the first version,
confirm: check → download → notification → tap "Restart Now" → new version is running. Fix anything
broken before moving to full testing Day 4.

**✅ Part 1 done, on-device**: toast appeared immediately on install (device already had `1.9.1`
downloaded-but-unapplied from Day 2), tapped "Restart Now" → `CapacitorUpdater.set()` applied it →
confirmed via `chrome://inspect` logs: the app's full startup sequence re-ran (`notifyAppReady()` fired
again, this time for bundle `wjMJg8ph0o`/`1.9.1`) with no errors — the app is now running content
delivered entirely over the network, no reinstall. This also confirms Day 1's rollback-safety
`notifyAppReady()` mechanism protects every OTA-applied bundle going forward, not just the native
install.

**⚠️ Part 2 gotcha found — testing-sequence bug, not a shipped-code bug.** Publishing `1.9.2` and testing
against the device (now running `1.9.1`) showed `1.9.2` download silently, no toast. Root cause: `1.9.1`
had been published back during **Day 2 testing, before the Day 3 toast code existed** — so applying it
in Part 1's "Restart Now" test silently regressed the device from the Day-3-native-install back to
pre-Day-3 JS (confirmed via logs: `notifyAppReady()` re-firing for that old bundle). That old code still
downloads fine (Day 2 logic intact) but has no `showUpdateReadyToast()` call to fire, since that
function didn't exist when it was built. This is the exact "OTA can't retroactively add capability to
code that doesn't have it" limitation, triggered by accident rather than by design.

**Lesson for Day 5's how-to**: never test/apply an already-downloaded bundle that predates a native
reinstall which added new JS-dependent capability — always publish fresh after any native install that
changes what the running JS is capable of, before relying on OTA to carry that capability forward.
Corollary for debugging a "no toast appeared" report: check what the **live manifest actually serves**
(`curl` it, and compare against the same URL with a cache-busting query) before assuming the app is at
fault — twice now the app logic was correct and the input was stale.

**Recovery** (one-time, this device only): manually ran
`await Capacitor.Plugins.CapacitorUpdater.set({ id: <the pending 1.9.2 bundle> })` in the connected
devtools console to jump onto `1.9.2` directly, bypassing the toast (the running code had none to tap).
Confirmed applied; the plugin's `autoDeletePrevious` also cleaned the stale `1.9.1` off the device, so
there was nothing left that could regress it again.

### ⚠️ Second bug found: Cloudflare edge-cached the manifest (this one is production-critical)

Publishing `1.9.3` and resuming the app produced no toast — and this time the app was entirely correct.
`curl` against the live URL showed Cloudflare serving a **stale `manifest.json`** (`CF-Cache-Status:
HIT`, old ETag, `"version": "1.9.2"`) while the same URL *with a cache-busting query* returned the
correct `"version": "1.9.3"` and a different ETag. The deploy had worked (`bundle-1.9.3.zip` was live,
200 OK); only the manifest was being served stale from the edge. So the device fetched a manifest
claiming `1.9.2`, matched it against the `1.9.2` it was running, and correctly did nothing.

Left unfixed this would have **systematically broken update detection for every device in the field** —
new versions would publish and simply never be seen. Fixed in two independent places, deliberately:
1. **Server-side** (`scripts/publish-ota.js`) — the generated `_headers` now adds
   `/manifest.json` → `Cache-Control: no-store` alongside the existing CORS rule. This protects **all**
   devices immediately regardless of what JS they're running, which is why it's the essential half.
2. **Client-side** (`src/lib/otaUpdater.js`) — the manifest fetch is now
   `fetch(\`${MANIFEST_URL}?t=${Date.now()}\`, { cache: "no-store" })`. The unique query string defeats
   any edge cache; `no-store` defeats the WebView's own HTTP cache. This only helps devices already
   running a bundle that contains it, so it's belt-and-braces rather than the primary fix.

**✅ Full loop verified on-device** (published `1.9.4` carrying both fixes): manifest served fresh →
device detected it on resume → downloaded → **toast appeared** → tapped **"Later"** (dismissed cleanly,
reappeared on the next resume) → tapped **"Restart Now"** → app reloaded onto the new version. Both
Day 3 requirements — notify, and let the user choose when — confirmed working end to end.

---

## اليوم 4 (الاثنين) — اختبار شامل على أجهزة حقيقية
## Day 4 (Monday) — Full Real-Device Testing

### Step 6: Testing and rollout safety
**Technical:** Test on real tablets, not just an emulator. Cover:
- Normal path: publish → device picks it up → notifies → applies correctly.
- Offline during check: app keeps working normally, no error surfaced.
- A corrupted/bad bundle: confirm the plugin's built-in rollback-to-last-known-good behavior actually
  prevents the app from getting stuck on a broken update (this is the one genuine safety-critical
  check of the week — do not skip it).
- Interrupted download (network drops mid-download): confirm it either resumes or safely retries next
  check, never leaves the app half-updated.

**بالعربي:**
النهاردة يوم الاختبار الحقيقي — مش على المحاكي (emulator)، على أجهزة تابلت حقيقية زي اللي هتتستخدم فعلًا.
بنتأكد من حاجتين أساسيتين: (1) إن التحديث بيوصل ويشتغل صح، و(2) الأهم — لو التحديث نفسه فيه مشكلة، إن
التطبيق **ميوقفش ولا يبوظش** على المستخدم، وإنه يرجع تلقائي لآخر نسخة شغالة. الخطوة دي أهم خطوة في الأسبوع
كله، لأن أي تحديث فاشل هيوصل لكل الأجهزة، فلازم نضمن إنه مش هيكسر حاجة.

**Backend required?** No.

---

## اليوم 5 (الثلاثاء) — اختبار نهائي + توثيق + التسليم
## Day 5 (Tuesday) — Final Test, Documentation, Handoff

### Step 7: Final pass and documentation
**Technical:**
- One last full-cycle test on a clean device (fresh install of the current APK, then confirm it picks
  up an update exactly the way a real user's device would).
- Write a short internal how-to for the team: the exact steps to publish a future update (build →
  package → upload → bump manifest version) — this is a new recurring process the team will repeat
  after every future release, so it needs to be written down, not just known by whoever built it.
- Buffer time for any fixes found on Day 4.
- Short demo/sign-off with stakeholders.

**بالعربي:**
آخر يوم: بنعمل اختبار أخير كامل من الألف للياء، وبنكتب "دليل" بسيط للفريق يشرح إزاي ننشر أي تحديث جديد
في المستقبل — الخطوة دي مهمة عشان العملية دي هتتكرر مع كل نسخة جديدة، مش هتتعمل مرة واحدة بس. وبناخد وقت
احتياطي لأي مشكلة صغيرة ظهرت يوم الاختبار.

**Backend required?** No.

---

## Task assignments

Roles below are generic — map them to actual team members. For a scope this size, 1–2 people can
realistically cover it:

| Day | Primary owner | Support |
|---|---|---|
| Wed (Day 1) | Frontend Developer (build) | Whoever owns hosting/budget decisions (Step 1 decision) |
| Thu (Day 2) | Frontend Developer | — |
| Sun (Day 3) | Frontend Developer | — |
| Mon (Day 4) | QA / Tester (device testing) | Frontend Developer (on-call for fixes) |
| Tue (Day 5) | Frontend Developer (docs) | QA (final sign-off), stakeholder for demo |

## Milestones

- **End of Day 2:** ✅ an update can be manually published and the app detects + downloads it (no user-
  facing notification yet).
- **End of Day 3:** ✅ the full loop works end-to-end on at least one test device, including the user-
  facing "update ready" notification — verified on the `ebrochure` build: publish → detect → download →
  toast → "Later" (reappears, no re-download) → "Restart Now" → new version running.
- **End of Day 5:** verified safe on real tablets (including failure/rollback cases), documented for
  future use, ready for a real rollout.

## Next Steps

This plan deliberately ships the *minimum* safe version of both priorities. Few things from the
larger plan remain open and are not blocked by this work, but should be scheduled separately, and most importantly this one:

- **Offline project downloads — the full version (very important, needs its own dedicated time).**

  ده جزء كبير ومهم جدًا لسه محتاج شغل منفصل بعد الأسبوع ده — وهو **اخنبار إمكانية تحميل أكتر من مشروع**، معرفة ترتيبهم في قائمة
  الانتظار، إيقاف/إلغاء التحميل، والتعامل مع حالة امتلاء مساحة تخزين الجهاز. الجزء ده أساسي لتجربة
  المستخدم النهائية على التابلت، وهيحتاج وقت مخصص للتنفيذ **وللاختبار الفعلي على أجهزة حقيقية**، لأنه
  بيمس صميم عمل التطبيق أوفلاين. **لسه معملناش خطوات تفصيلية له هنا — بس بنحطه كنقطة مهمة يجب التخطيط
  ليها قريب.**

  **Note on OTA limits, relevant to this feature specifically:** once Day 3 lands, most *future* JS/UI
  work (including this queue-downloads feature, most likely) ships via OTA — no reinstall needed. The
  one thing OTA can never deliver is new **native Android permissions**, since those live in
  `android/app/src/main/AndroidManifest.xml`, a native file OTA never touches — any change there needs
  a fresh APK build + install, a one-time cost for whichever release first needs it. Plausible examples
  if this feature's design calls for them:
  - **`FOREGROUND_SERVICE`** (+ `FOREGROUND_SERVICE_DATA_SYNC` on Android 14+) — most likely one to
    actually need. Downloads currently only survive while the app process is alive in the background;
    surviving a full OS kill with a persistent "Downloading Project X — 45%" notification needs this.
  - **`POST_NOTIFICATIONS`** (Android 13+ runtime permission) — if "download complete"/"update ready"
    ever became a real system notification instead of the in-app toast, visible even when the app isn't
    open.
  - **`MANAGE_EXTERNAL_STORAGE`** / legacy `WRITE_EXTERNAL_STORAGE` — if staff ever need to export a
    downloaded project or generated brochure to a shared/public location instead of just sharing it
    through the app-to-app share sheet.
  - Less likely given the current roadmap, same category: `BLUETOOTH_CONNECT`/`BLUETOOTH_SCAN`
    (device-to-device sync between tablets), `ACCESS_FINE_LOCATION` (geofencing/location-tagged
    content).

---

## Appendix: DevTools console commands for testing OTA on a device

Used throughout Day 2/3 testing; feeds into Day 5's team how-to. These run against the **live app on a
connected device**, not in a terminal.

**Getting a console:** with the device connected and the app open, go to `chrome://inspect/#devices` in
Chrome on the dev machine → click **inspect** under the app → **Console** tab. Note that the app's
own `[CapgoUpdater] 🟢 ...` log lines show up here too, which is how the download/apply flow was
verified on Days 2-3.

**Important gotcha:** the plugin is a bundled module import inside the app, *not* a global — typing
`CapacitorUpdater.list()` gives `CapacitorUpdater is not defined`. Reach it through Capacitor's plugin
registry instead: `Capacitor.Plugins.CapacitorUpdater` (registered under that exact name, confirmed in
`node_modules/@capgo/capacitor-updater/dist/esm/index.js`).

```js
// What bundle is the app running right now?
// Look for `bundle.version` — "1.9" / id "builtin" means no OTA update has been applied yet.
await Capacitor.Plugins.CapacitorUpdater.current();

// Every bundle stored on the device: builtin, active, downloaded-but-pending, and failed ones.
// Useful for confirming a download landed, or spotting orphaned duplicates eating storage.
const { bundles } = await Capacitor.Plugins.CapacitorUpdater.list();
console.table(bundles);

// Manually apply a specific version, bypassing the toast entirely.
// This is the recovery path when the running bundle has no toast UI to tap (see the Day 3
// stale-bundle gotcha above). The app reloads immediately and DevTools needs reopening.
const { bundles } = await Capacitor.Plugins.CapacitorUpdater.list();
const target = bundles.find(b => b.version === "1.9.2" && b.status !== "error");
await Capacitor.Plugins.CapacitorUpdater.set({ id: target.id });

// Delete a stored bundle (e.g. an orphaned duplicate download reclaiming ~15 MB).
// Never delete the currently-active one.
await Capacitor.Plugins.CapacitorUpdater.delete({ id: "<bundle id>" });
```

**Reading `status`:** `success` = applied and confirmed good (`notifyAppReady()` ran on it); `pending` =
downloaded, not yet activated; `error` = failed to apply and was rolled back. A `pending` bundle whose
version matches the currently-active one is a harmless orphan — `checkForUpdate()` short-circuits on the
version match before it ever reaches the `list()` branch, so it can't be applied by accident.
