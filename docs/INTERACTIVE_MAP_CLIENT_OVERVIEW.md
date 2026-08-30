# نظرة عامة على مزايا الخريطة التفاعلية (نسخة العميل)

---

## ملاحظة هامة: هذا التطبيق نسخة تجريبية أولية (POC)

هذا التطبيق في مرحلته الحالية هو **نموذج تجريبي أولي (Proof of Concept)** الغرض منه عرض فكرة
وإمكانيات "الخريطة التفاعلية" — وليس نسخة نهائية جاهزة للإطلاق التجاري. بناءً على ذلك:

- من المتوقع وجود بيانات **ناقصة أو غير دقيقة** (أسعار، مساحات، صور، أسماء وحدات، إلخ) في هذه المرحلة.
- بعض الشاشات قد تعرض بيانات تجريبية أو توضيحية لغرض العرض فقط.
- الهدف من هذا الإصدار هو تجربة الفكرة والتفاعل معها، وليس التحقق من دقة كل رقم أو تفصيلة معروضة.

سيتم استكمال البيانات وتصحيحها تدريجياً في المراحل القادمة من المشروع.

---

## نظرة عامة على التطبيق

تطبيق ويب بشكل أساسي (يعمل أيضاً كتطبيق أندرويد على الأجهزة اللوحية "تابلت")، لعرض المشاريع
العقارية بأسلوب سينمائي وتفاعلي، يعتمد على التنقل ثلاثي الأبعاد والجولات البانورامية 360° لداخل
الوحدات والإطلالات. التنقل يسير بشكل هرمي:

**المطوّر ← المشروع ← المناطق/المرافق/المحيط ← العقار (برج أو فيلا) ← الطابق ← الوحدة**

يدعم التطبيق **العمل بدون اتصال بالإنترنت بشكل كامل** بعد تحميل بيانات المشروع مرة واحدة على
الجهاز — وهو ما يناسب ظروف استخدامه الميدانية (أجهزة تابلت يحملها فريق المبيعات وقد تكون في مناطق
ضعيفة أو منعدمة التغطية).

**يعمل التطبيق بأفضل شكل في وضع ملء الشاشة (Fullscreen)، سواء على متصفح الكمبيوتر أو على جهاز
التابلت.**

---

## الميزات

### 1. استكشاف المشروع

عرض المشروع بالكامل بشكل تفاعلي ثلاثي الأبعاد، مع التنقل السلس بين مراحل المشروع والمباني/الأبراج،
وإظهار موقع كل مبنى واتجاهه بشكل واضح، بالإضافة إلى عرض المرافق والخدمات الرئيسية داخل المشروع.

### 2. استكشاف الأدوار والوحدات

اختيار المبنى ثم الدور ثم الوحدة بشكل تفاعلي، مع إظهار مخطط كل دور والوحدات الموجودة فيه، وتمييز حالة
كل وحدة (متاحة / محجوزة / مباعة)، وإمكانية الضغط على أي وحدة لفتح تفاصيلها مباشرة.

### 3. البحث والتصفية

التصفية حسب نوع الوحدة وحالة توفر الوحدة والمساحة والسعر والدور، مع إظهار الوحدات المطابقة للخيارات
مباشرة على الخريطة.

### 4. صفحة وتفاصيل الوحدة

تعرض كل وحدة رقمها ونوعها وحالتها ودورها ومساحتها وسعرها، بالإضافة إلى المميزات الرئيسية، ومخطط
الوحدة بجودة عالية، وتحديد موقعها داخل المبنى واتجاهها. كما يتوفر زر "Download Brochure" في صفحة كل
وحدة، يُنشئ ملف PDF تلقائياً يحتوي على هذه البيانات وصور المعرض ومخطط الوحدة.

### 5. تجربة الوحدة والإطلالة

جولة تفاعلية داخل الوحدة بتقنية 360°، مع إمكانية التنقل بين غرف ومساحات الوحدة بسهولة، وعرض الإطلالة
الفعلية أو المحاكية للوحدة.

### 6. التأثيث والتخصيص (AI Re-furniture)

داخل الجولة البانورامية 360° للوحدة، يتيح المساعد الذكي للمستخدم التبديل بين عرض الغرفة **مفروشة /
غير مفروشة**، وايضا تجربة **شكل تأثيث بديل**، لتوضيح فكرة تصوّر المساحة بأكثر من طريقة.

### 7. المقارنة والحفظ والمشاركة

زر "Add to Compare" متاح في صفحة تفاصيل كل وحدة، يسمح للمستخدم بحفظ حتى **4 وحدات** وعرضها جنباً
إلى جنب في صفحة مقارنة واحدة (المساحة، المميزات، إلخ).

### 8. التواصل والحجز والشراء

حاسبة "Payment Plan" تعرض تقديراً للقسط الشهري بناءً على سعر الوحدة والدفعة المقدمة ومدة السداد
بالسنوات، على غرار خطط السداد المعتادة لدى المطورين. كما يتوفر زر "Book Now" في صفحة الوحدة (ومتاح
أيضاً عبر المساعد الذكي) يفتح موقع سيوار الخاص بالحجز في متصفح خارجي، بالإضافة إلى زر عائم للتواصل
المباشر عبر واتساب مع فريق المبيعات.

### 9. المتطلبات البصرية وتجربة الاستخدام

تصميم متوافق مع الهوية البصرية للمشروع، تجربة كاملة باللغة الإنجليزية مع إمكانية إضافة الترجمة
(localization) للعربية في المستقبل، وجودة بصرية احترافية، مع سهولة استخدام على الجوال والتابلت
والكمبيوتر.

### 10. المساعد الذكي والترشيحات

زر عائم يفتح نافذة محادثة تفاعلية تجيب على أسئلة شائعة مثل: تفاصيل الوحدة الحالية، الأسعار وخطط
السداد، المرافق والمحيط، البحث عن وحدة، وتحميل البروشور — بالإضافة إلى فتح واتساب مباشرة لحجز
زيارة أو التحدث مع فريق المبيعات. كما تظهر أسفل صفحة كل وحدة قائمة بوحدات أخرى من نفس نوع الوحدة
(Unit Type)، لتسهيل استكشاف خيارات مشابهة.

### 11. محفزات اتخاذ القرار

تظهر في صفحة كل وحدة إشارة ندرة تقديرية (مثال: "Only 3 left of this model") وعداد مشاهدات يوضح حجم
الاهتمام بالوحدة.

### 12. طبقة الجوار والموقع

طبقة توضح المرافق المحيطة بالمشروع (مدارس، مطارات، مولات، محطات نقل)، مع أزمنة وصول تقديرية حسب موقع
المشروع.

---
---

# Interactive Map — Feature Overview (Client Version)

---

## Important Note: This App Is a Proof of Concept (POC)

At this stage, the app is a **Proof of Concept (POC)** meant to demonstrate the idea and
capabilities of the "Interactive Map" — it is not a final, launch-ready product. Given that:

- **Missing or inaccurate data** (prices, areas, photos, unit names, etc.) is expected at this
  stage.
- Some screens may show placeholder or illustrative data for demonstration purposes only.
- The goal of this version is to experience and interact with the concept, not to verify the
  accuracy of every number or detail shown.

Data will be completed and corrected progressively in the coming project phases.

---

## App Overview

Primarily a web application (also packaged as a native Android app for tablet devices), for
showcasing real estate projects in a cinematic, interactive way, using 3D navigation and 360°
panoramic tours of units and views. Navigation follows a hierarchy:

**Developer → Project → Zones/Amenities/Surroundings → Property (tower or villa) → Floor → Unit**

The app supports **working completely offline** once a project's data has been downloaded to the
device — suited to how it's actually used in the field (tablets carried by sales staff, often in
areas with weak or no connectivity).

**The app works best in fullscreen mode, whether on a desktop browser or on a tablet.**

---

## Features

### 1. Project Exploration

Full interactive 3D view of the project, with smooth navigation between project phases and
buildings/towers, clear display of each building's location and orientation, and the project's main
amenities and facilities.

### 2. Floor & Unit Exploration

Interactive selection of building → floor → unit, with each floor's plan and its units displayed,
unit status shown (Available / Reserved / Sold), and the ability to tap any unit to open its details
directly.

### 3. Search & Filtering

Filter by unit type, unit availability, area, price, and floor — with matching units shown directly
on the map.

### 4. Unit Details Page

Each unit's page shows its number, type, availability, floor, area, and price, along with key
features, a high-quality floor plan, and the unit's location and orientation within the building.
A "Download Brochure" button on each unit page also automatically generates a PDF containing this
data along with gallery images and the floor plan.

### 5. Unit Experience & View

An interactive 360° tour inside the unit, with easy navigation between the unit's rooms and spaces,
and display of the unit's actual or simulated view.

### 6. Furnishing & Customization (AI Re-furniture)

Inside the 360° panoramic view of the unit, the Smart Assistant lets the user toggle a room between
**furnished / unfurnished**, and also preview an **alternate furniture style**, to illustrate
visualizing the space in more than one way.

### 7. Comparison, Saving & Sharing

An "Add to Compare" button on every unit's detail page lets the user save up to **4 units** and
view them side by side on a single comparison page (area, features, etc.).

### 8. Communication, Booking & Purchase

A "Payment Plan" calculator estimates the monthly installment based on the unit price, down payment,
and repayment period in years, similar to typical developer payment plans. A "Book Now" button on
the unit page (also available through the Smart Assistant) opens the Siwar booking website in an
external browser, and a floating WhatsApp button provides direct contact with the sales team.

### 9. Visual & UX Requirements

Design matching the project's visual identity, a full English experience with the possibility of
adding Arabic localization in the future, professional visual quality, and ease of use on mobile,
tablet, and desktop.

### 10. Smart Assistant & Recommendations

A floating button opens an interactive chat panel that answers common questions such as: details
about the current unit, pricing and payment plans, amenities and surroundings, searching for a
unit, and downloading the brochure — as well as opening WhatsApp directly to book a visit or speak
with the sales team. Each unit's page also shows a list of other units of the same unit type, to
make it easier to explore similar options.

### 11. Decision-Making Triggers

Each unit's page shows an estimated scarcity indicator (e.g. "Only 3 left of this model") and a
view counter reflecting interest in the unit.

### 12. Neighborhood & Location Layer

A layer showing nearby amenities around the project (schools, airports, malls, transit stations),
with estimated travel times based on the project's location.

