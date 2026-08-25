# Interactive Map — Implementation Plan

Implementation plan for the approved ("doable now") features from the interactive-map requirements
review. Each feature has a **Technical** section (English, for developers) and a **الشرح المبسط**
section (Arabic, for non-technical — English technical terms kept as-is).

---

## 1. Compare / Favorites

### Technical

**New: `src/lib/compareStorage.js`**
- `localStorage`-backed, device-local only (no backend sync — matches the shared-tablet usage model,
  same reasoning as offline downloads in [state-management.md](../.claude/rules/state-management.md)).
- Key: `compareUnits` → array of unit IDs, max length 4.
- Exports: `getCompareUnits()`, `isInCompare(unitId)`, `addToCompare(unitId)` → `{ ok: true }` or
  `{ ok: false, reason: 'limit' }`, `removeFromCompare(unitId)`.

**`src/components/UnitPanel.jsx`**
- Add "Add to Compare" button, unconditionally rendered (not gated on `balconyView` or any other
  field), styled per `src/assets/add_to_comapre_btn.svg`.
- Button is a toggle: reflects `isInCompare(currentItem.id)` on render; click calls `addToCompare` or
  `removeFromCompare` accordingly.
- On `{ ok: false, reason: 'limit' }`, call `toast.error("you can compare only 4 units at a time")`
  via the already-installed `react-hot-toast` (`<Toaster />` is global in `src/main.jsx` — do not
  build a separate toast mechanism).
- Refactor `UnitPanel` to accept an optional `unit` prop, falling back to `currentItem` from
  `SidebarContext` when absent — needed so `CompareView` can render multiple `UnitPanel` instances for
  different units simultaneously, without each one fighting over shared context state. Existing call
  site (unmodified usage, no prop passed) keeps current behavior.

**`src/store/MainContextProvider.jsx`**
- Add `openCompare()` → `setOverlay({ type: 'compare' })`, following the existing
  `openPanorama`/`openBalconyView`/`openGallery` pattern.

**`src/components/Home.jsx`**
- New floating button, bottom-right, styled per `src/assets/open_compare_page.png` (icon + "Compare"
  label + live count badge from `getCompareUnits().length`). Calls `openCompare()`. Hidden when count
  is 0.
- New `{overlay?.type === 'compare' && (...)}` block, same shape as the existing `panorama`/`balcony`/
  `gallery` overlay blocks (`Home.jsx:262-330`): back button (top-left arrow, per
  `src/assets/compare_page.jpg`), "Compare" header.

**New: `src/components/CompareView.jsx`**
- Reads unit IDs from `compareStorage`, resolves each to its full unit object from `currentProject`
  (same lookup used in `UnitPanel.jsx:23-25`).
- Renders up to 4 columns side by side, each column = `<UnitPanel unit={resolvedUnit} />` (full panel,
  reused as-is per the design reference), wrapped in a container with a red "X" close button (top-right
  of each column, per the design image) that calls `removeFromCompare(id)` — this is the second removal
  path, alongside the toggle button in `UnitPanel` itself.

### الشرح المبسط

يضيف زر "أضف للمقارنة" في صفحة كل وحدة، يسمح بحفظ حتى 4 وحدات في نفس الوقت لمقارنتها لاحقاً جنباً إلى
جنب. الحفظ يتم على الجهاز نفسه فقط (بدون حساب مستخدم)، وهذا مناسب لطبيعة الأجهزة اللوحية التي يتشاركها
فريق المبيعات. عند محاولة إضافة وحدة خامسة، تظهر رسالة تنبيه توضح أن الحد الأقصى 4 وحدات. يمكن إزالة أي
وحدة من المقارنة إما بالضغط على نفس الزر مرة أخرى، أو من صفحة المقارنة نفسها.

---

## 2. Unit Brochure (PDF download)

### Technical

- Client-side PDF generation (e.g. a lightweight lib such as `jspdf` or `pdf-lib` — no existing PDF
  dependency in the repo, needs adding) assembled per-unit from data already available in `UnitPanel`:
  `currentItem`/`unitType` area, bedrooms/bathrooms, `serviceRooms`, `gallery`, `cutSections`,
  `floorPlans` image URLs.
- New: `src/lib/generateUnitBrochure.js` — takes a resolved unit object, returns a `Blob`/triggers
  download. Keep this a pure function (input: unit data → output: PDF) so it's reusable from both
  `UnitPanel` and (later) `CompareView` if needed.
- New button in `UnitPanel.jsx` ("Download Brochure"), calls the generator, triggers a native download
  via an anchor `Blob` URL (standard browser pattern — no Capacitor filesystem plugin needed since this
  is a save-to-Downloads action, not app-internal storage).
- Layout template is a build decision (single-page vs. multi-page based on gallery count) — needs a
  quick visual mockup review before finalizing, since it's a new visual artifact, not just data
  plumbing.

### الشرح المبسط

زر جديد في صفحة الوحدة يتيح تحميل ملف PDF يحتوي على كل بيانات الوحدة المتاحة حالياً: المساحة، عدد
الغرف/الحمامات، المميزات الإضافية، صور المعرض، وصور المخطط. الملف يتم إنشاؤه تلقائياً من نفس البيانات
الموجودة في التطبيق، بدون الحاجة لرفع ملفات يدوياً من الإدارة.

---

## 3. Financing Calculator

### Technical

- New: `src/components/FinancingCalculator.jsx`, opened from a button in `UnitPanel.jsx` (near the
  existing "Payment Plan" section) — either as a small inline expandable panel or a `MainContext`
  overlay (`type: 'financing'`), consistent with the existing overlay pattern.
- **Flat-division formula, no interest** (confirmed — matches how the current `paymentPlans` data is
  already structured, e.g. `UnitPanel.jsx`'s existing down-payment/monthly/years display):
  `monthly = (unitPrice - downPayment) / (years * 12)`.
- Inputs: down-payment amount (or percentage of `unitPrice`), term in years. No interest-rate input.
  Worked example to validate against: unit price 5,000,000, down payment 1,000,000, 8 years →
  ~41,667/month (see `docs/INTERACTIVE_MAP_OVERVIEW_AR.md` §2 for the canonical example).
- Purely client-side, no backend call — explicitly scoped as "estimate only."

### الشرح المبسط

حاسبة بسيطة داخل صفحة الوحدة، **بدون فائدة بنكية**، تحسب تقديراً لقيمة القسط الشهري بقسمة المتبقي من سعر
الوحدة (بعد خصم الدفعة المقدمة) على عدد أشهر مدة السداد. هي حاسبة تقديرية فقط (Estimate) وليست عرض تمويل
رسمي من بنك، ولا تحتاج أي اتصال بالـ backend.

---

## 4. "Similar Units" Recommendations

### Technical

**Data layer — `src/lib/findUnitById.js`**: refactor the existing tree-walk (villa/townhouse/tower
branching, currently only used by `findUnitInProject` for a single-id lookup) into a shared internal
walker, then add `findUnitsByType(project, unitTypeId, excludeUnitId, limit = 6)` that collects matching
units instead of stopping at the first. `findUnitInProject`'s existing signature/behavior is unchanged
for its current caller (`CompareView.jsx`). Since every unit sharing a `unitTypeId` shares the same
`unitType` object (gallery/area/floorPlans), only each matched unit's own fields (`id`, `displayName`,
`price`, `bedrooms`, `bathrooms`) are needed per card — no per-unit `unitType` re-lookup required.

**Display — new `src/components/SimilarUnits.jsx`**: rendered inside `UnitPanel.jsx`, gated on
`!inCompareView` — **hidden inside Compare columns** (decided: four columns each showing their own
mini recommendation list would be visually cluttered in the side-by-side compare layout), shown only in
the normal single-unit view. Small horizontal card list, each card: thumbnail (shared
`unitType.gallery[0]`, falling back to `floorPlans[0]`, falling back to no image), `displayName`, price,
area, bed/bath — reusing the same `unitType` already computed in `UnitPanel.jsx` for the current unit.

**Click behavior — read-only popup via `MainContext`** (decided over building real navigation-jump:
investigation found townhouse units in the data carry **zero ancestor references** — no `zoneId`/
`propertyId`/`floorId` at all — so reconstructing the nav history stack to actually navigate there would
need extra fallback handling for that case specifically; a display-only popup sidesteps this entirely):
- Since this only triggers from the normal (non-Compare) `UnitPanel`, `overlay` is reliably `null` at
  click time — the same precondition every other `openX` action in `MainContextProvider.jsx` already
  assumes, so this fits the existing overlay system cleanly (unlike the Compare-page Interior popup,
  which specifically *couldn't* use it, since `overlay` is already `'compare'` there).
- `MainContextProvider.jsx`: new `openSimilarUnit(unit)` → routed through the existing `openSubOverlay`
  helper → `{ type: 'similar-unit', data: { unit } }`.
- `Home.jsx`: new overlay render block, structurally matching the existing Gallery block (blurred
  backdrop) but sized as a centered card (~420px wide, not full-bleed, since `UnitPanel` is normally
  sidebar-width) containing `<UnitPanel unit={overlay.data.unit} />` (full panel, no special props — its
  own Compare/Brochure/Similar-Units buttons stay active; clicking a similar unit inside *that* popup
  just swaps the overlay to a new one — no infinite-recursion risk, it's a single-slot swap, not a
  stack) plus a close button.

### الشرح المبسط

تظهر أسفل صفحة كل وحدة (في العرض العادي فقط، وليس داخل صفحة المقارنة) مجموعة من "الوحدات المشابهة" — وهي
وحدات أخرى من نفس نوع الوحدة (unit type) في نفس المشروع. عند الضغط على أي وحدة مشابهة، تظهر نافذة منبثقة
تعرض بيانات هذه الوحدة بالكامل للاطلاع فقط، بدون الانتقال الفعلي إليها داخل شجرة التنقل الرئيسية للتطبيق —
تم اختيار هذا الأسلوب بدلاً من التنقل الحقيقي لأن بعض أنواع الوحدات (townhouse) لا تحتوي حالياً على أي
بيانات تربطها بالمبنى أو المنطقة الأصلية، ما يجعل إعادة بناء مسار التنقل الحقيقي إليها غير موثوق.

---

## 5. Scarcity Indicator + View Counter (mock data first)

### Technical

- New: `src/lib/mockEngagementData.js` — deterministic mock functions keyed by unit/unitType ID (e.g.
  a stable hash-based pseudo-random count, so the same unit always shows the same mock number within a
  session, avoiding a visibly "random" feel during demos).
  - `getMockRemainingCount(unitTypeId)` → small int (e.g. 1-5), used for "last N units of this model."
  - `getMockViewCount(unitId)` → int, used for the view counter badge.
- UI: small badge/label components in `UnitPanel.jsx`, reading from these mock functions.
- **Migration path when real data exists:** both functions get swapped for real API calls with the
  same signatures — no UI changes needed. Scarcity depends on the still-missing unit `status` field
  (per `docs/BACKEND_GAPS.md`); view counter depends on a new backend counter endpoint (also does not
  exist yet — needs to be requested separately, this is not just a missing field).

### الشرح المبسط

سيتم بناء شكل الميزة الآن (مثال: "آخر 3 وحدات من هذا النموذج" وعدّاد مشاهدات لكل وحدة)، لكن بأرقام
تجريبية مؤقتة وليست بيانات حقيقية، لأن النظام الحالي لا يخزّن حالة الوحدة الحقيقية (متاحة/محجوزة/مباعة)
ولا عدد المشاهدات الفعلي. عندما تتوفر هذه البيانات من الـ backend مستقبلاً، سيتم استبدال الأرقام التجريبية
بالأرقام الحقيقية دون الحاجة لإعادة بناء الواجهة.

---

## 6. FAQ Chatbot — UI shell (content pending brainstorm)

### Technical

- New: `src/components/ChatbotButton.jsx` — button positioned bottom-left **within the media
  container** (mirroring where the Compare button actually ended up — stacked with the info-reopen
  button in the media container's bottom-right corner — but on the opposite corner), not a
  viewport-level/`Home.jsx`-level fixed element. **Click-to-expand only — no drag, no hover-expand**.
- Expands into a chat window panel anchored bottom-left of the media container (not viewport-centered),
  consistent with the button's anchor; collapses back on a close action.
- Content/logic (the actual FAQ question tree, matching options, and any "redirect to filter panel" /
  "redirect to financing calculator" type actions) is **not yet defined** — needs a separate brainstorm
  session. Starting proposal to react to:
  - Category buttons rather than free text (rules-based, matches your "simpler, rules-based" scope
    decision): e.g. "Search for a unit" → opens/focuses the existing `FilterPanel`; "Pricing & payment
    plans" → opens the Financing Calculator (feature 3 above); "Book a visit" → since online booking is
    out of scope (red item), this would show static contact info instead, not a real booking flow.
  - This is a proposal only — needs your input on the actual question set before the content layer is
    built. The button/window shell can be built independently of this decision.

### الشرح المبسط

سيتم بناء شكل زر المساعد الذكي فقط الآن: زر أسفل يسار منطقة الوسائط (media container)، يفتح نافذة محادثة
في نفس الموضع عند الضغط عليه فقط (وليس بالسحب أو التمرير). أما محتوى الأسئلة والإجابات نفسه فما زال غير محدد، ويحتاج جلسة نقاش منفصلة
لتحديد الأسئلة التي سيجيب عليها المساعد والمسارات التي يوجّه إليها المستخدم (مثل فتح خانة البحث، أو حاسبة
التمويل). تم اقتراح فكرة أولية للنقاش: مساعد يعتمد على أزرار خيارات جاهزة بدلاً من كتابة حرة، لكنها لم
تُعتمد بعد وتحتاج نقاشاً مباشراً قبل البدء بالتنفيذ.
