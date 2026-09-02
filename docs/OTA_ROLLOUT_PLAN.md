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

## اليوم 2 (الخميس) — نشر التحديث + آلية الفحص التلقائي
## Day 2 (Thursday) — Publish Mechanism + Auto-Check Flow

### Step 3: Package and publish the first test update
**Technical:** `npm run build`, package `dist/` into the bundle format the plugin expects, upload it
to whichever hosting was chosen Day 1, and publish the small "version manifest" file the app will poll
to know if something new exists.

**بالعربي:**
دلوقتي بنجهز أول نسخة تجريبية من التحديث ونرفعها على المكان اللي اتفقنا عليه إمبارح، مع ملف صغير بيقول
"النسخة الحالية رقمها كام" عشان التطبيق يقدر يقارن.

**Backend required?** No — this is a build-and-upload step, same category as Step 1(a).

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

---

## اليوم 3 (الاحد) — إشعار المستخدم بوجود تحديث
## Day 3 (Sunday) — Notify Users of the Update (Priority 2)

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

### First end-to-end manual test
Publish a second test version, open the app on a real device already running the first version,
confirm: check → download → notification → tap "Restart Now" → new version is running. Fix anything
broken before moving to full testing Day 4.

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

- **End of Day 2:** an update can be manually published and the app detects + downloads it (no user-
  facing notification yet).
- **End of Day 3:** the full loop works end-to-end on at least one test device, including the user-
  facing "update ready" notification.
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
