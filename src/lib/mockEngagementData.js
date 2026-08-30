// Deterministic mock engagement/status data — no backend field exists yet for any of these
// (see docs/BACKEND_GAPS.md). Pure hash-based functions so the same id always produces the same
// value, with no storage needed. Each function's signature is designed to stay stable once real
// data exists, so callers won't need to change when these are swapped for real lookups/API calls.

function hashString(str) {
    let hash = 0;
    const s = String(str || "");
    for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

export function getMockRemainingCount(unitTypeId) {
    return 1 + (hashString(unitTypeId) % 5); // [1, 5]
}

const VIEW_STORAGE_KEY = "mockUnitViews";
const HOUR_MS = 60 * 60 * 1000;
const GROWTH_PER_HOUR = 5;

function readAllViewEntries() {
    try {
        const raw = localStorage.getItem(VIEW_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
        return {};
    }
}

function writeAllViewEntries(entries) {
    localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(entries));
}

// Gets (seeding if needed) a unit's view entry and applies any "5 more views per elapsed hour"
// growth that accrued since it was last read — lazily, on read, rather than a running timer.
// This is deliberately not a live interval: the app targets a tablet that's frequently
// backgrounded/closed, so a setInterval would only count hours while the app happened to be
// open. Catching up on read reflects real elapsed wall-clock time regardless of app lifecycle.
function getUpdatedViewEntry(unitId) {
    const entries = readAllViewEntries();
    const now = Date.now();
    let entry = entries[unitId];

    if (!entry) {
        entry = { count: 15 + (hashString(unitId) % 306), lastAutoIncrementAt: now };
        entries[unitId] = entry;
        writeAllViewEntries(entries);
        return entry;
    }

    const elapsedHours = Math.floor((now - entry.lastAutoIncrementAt) / HOUR_MS);
    if (elapsedHours > 0) {
        entry = {
            count: entry.count + elapsedHours * GROWTH_PER_HOUR,
            lastAutoIncrementAt: entry.lastAutoIncrementAt + elapsedHours * HOUR_MS,
        };
        entries[unitId] = entry;
        writeAllViewEntries(entries);
    }

    return entry;
}

export function getMockViewCount(unitId) {
    return getUpdatedViewEntry(unitId).count;
}

// Records a real navigation into this unit (called once per "enter", e.g. from
// ApartmentButton's goToItem() click) — applies any pending hourly growth first, then adds 1
// for this actual visit. Both mechanisms feed the same displayed number by design.
export function recordUnitView(unitId) {
    const current = getUpdatedViewEntry(unitId); // also persists any pending hourly growth
    const entries = readAllViewEntries();
    entries[unitId] = { count: current.count + 1, lastAutoIncrementAt: current.lastAutoIncrementAt };
    writeAllViewEntries(entries);
    return entries[unitId].count;
}

// No backend "status" field exists yet, so we derive a stand-in from the unit's display
// name: "Unit 71" -> 71 -> odd -> sold, "Unit 72" -> 72 -> even -> vacant. Falls back to
// vacant if the name doesn't end in a number, so it never crashes on an unexpected shape.
export function getMockUnitStatus(unit) {
    const name = unit?.displayName || unit?.name || "";
    const match = String(name).match(/(\d+)\s*$/);
    if (!match) return "vacant";

    const num = parseInt(match[1], 10);
    if (Number.isNaN(num)) return "vacant";

    return num % 2 === 0 ? "vacant" : "sold";
}
