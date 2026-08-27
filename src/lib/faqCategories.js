import { LAYERS } from "../data/layers";
import { APP_CONFIG } from "../config/appConfig";
import { findUnitsByType } from "./findUnitById";
import { getCompareUnits } from "./compareStorage";
import { WHATSAPP_URL } from "../components/buttons/WhatsAppButton";

function resolveUnitType(currentProject, currentItem) {
  return APP_CONFIG.USE_STATIC
    ? currentProject?.unitTypes?.[currentItem?.unitTypeId]
    : currentProject?.unitTypes?.find((type) => type.id === currentItem?.unitTypeId);
}

function formatMoney(value) {
  if (value === null || value === undefined || value === 0) return null;
  return `${Number(value).toLocaleString()} SAR`;
}

export function joinFriendly(items) {
  if (items.length <= 1) return items[0] || "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

// Surrounding entries' `distance` varies by data source: live API data is a bare number meaning
// km ("10"), while the static project-*.js files mix free text ("6 min - 3 km", "5 min", null,
// ...). Pull out the km figure when there's an explicit "km", assume a bare number is already km,
// and otherwise fall back to the raw text as-is rather than tacking "km" onto something that
// isn't (e.g. a minutes-only value).
function formatDistance(distance) {
  if (!distance) return null;
  const raw = String(distance).trim();
  const kmMatch = raw.match(/(\d+(?:\.\d+)?)\s*km/i);
  if (kmMatch) return `${kmMatch[1]} km`;
  if (/^\d+(?:\.\d+)?$/.test(raw)) return `${raw} km`;
  return raw;
}

// Rules-based FAQ category tree. `available` gates whether a category shows up as a quick-reply
// chip at all (ChatbotWidget filters on it, and also diffs it across renders to know when to
// surface the "new questions available" tooltip) — categories never appear before their
// precondition is met, so there's no "sorry, not yet" reply to write. `label` is the chip's
// button text (phrased as a question/command); `topic` is a short noun phrase for the same
// category used in the tooltip's "ask me about ..." sentence, since `label` reads oddly there
// (e.g. "ask me about Tell me about this unit"). Each entry is either an `action` (performs a
// real app action), an `href` (external link), or an `answer` (inline text) — see
// ChatbotPanel.jsx for how each kind is rendered/handled.
export function getFaqCategories({ currentItem, activeLayer, currentProject, openPaymentPlan, openCompare }) {
  const hasUnit = activeLayer === LAYERS.UNIT && !!currentItem;
  const unitType = hasUnit ? resolveUnitType(currentProject, currentItem) : null;
  const compareCount = getCompareUnits().length;

  return [
    {
      id: "unit-info",
      label: "Tell me about this unit",
      topic: "this unit",
      available: hasUnit,
      answer: () => {
        const name = currentItem.displayName || currentItem.name;
        const bits = [];
        if (currentItem.bedrooms != null) bits.push(`${currentItem.bedrooms}-bedroom`);
        if (currentItem.bathrooms != null) bits.push(`${currentItem.bathrooms}-bathroom`);
        // Bedroom/bathroom counts imply a residential unit — otherwise (e.g. an office unit)
        // fall back to a description that doesn't assume it's a home.
        const shape = bits.length ? `a ${bits.join(", ")} home` : "a great space";
        const area = unitType?.area ? ` with about ${Math.round(unitType.area)} m²` : "";
        const price = formatMoney(currentItem.price);
        const priceLine = price ? ` It's priced at ${price}.` : "";
        return `${name} — ${shape}${area}.${priceLine}`;
      },
    },
    {
      id: "payment-plan",
      label: "Pricing & payment plans",
      topic: "pricing & payment plans",
      available: hasUnit,
      confirmText: "Sure thing — let me pull up the payment plan for this unit.",
      action: () => openPaymentPlan(currentItem),
    },
    {
      id: "amenities",
      label: "Amenities & surroundings",
      topic: "amenities & surroundings",
      available: true,
      answer: () => {
        const amenities = currentProject?.amenities?.items || [];
        const surroundings = currentProject?.surroundings?.items || [];
        if (amenities.length === 0 && surroundings.length === 0) {
          return "I don't have amenities or surroundings details for this project just yet — check back soon!";
        }
        const sentences = [];
        if (amenities.length > 0) {
          const names = amenities.slice(0, 5).map((a) => a.displayName);
          sentences.push(`This project has some lovely amenities, including ${joinFriendly(names)}.`);
        }
        if (surroundings.length > 0) {
          const lines = surroundings.slice(0, 5).map((s) => {
            const distance = formatDistance(s.distance);
            return `• ${s.displayName}${distance ? ` (${distance})` : ""}`;
          });
          sentences.push(`It's also close to:\n${lines.join("\n")}`);
        }
        sentences.push("Head to the Amenities and Surroundings tabs for more details.");
        return sentences.join("\n\n");
      },
    },
    {
      id: "similar-units",
      label: "Similar units available?",
      topic: "similar units",
      available: hasUnit,
      answer: () => {
        // No explicit limit — defaults to the same cap SimilarUnits.jsx itself displays, so this
        // count never overstates what the user can actually scroll down and see.
        const matches = findUnitsByType(currentProject, currentItem.unitTypeId, currentItem.id);
        if (matches.length === 0) {
          return "This one looks to be one of a kind right now — no other units of this exact type are available.";
        }
        return `Good news — there ${matches.length === 1 ? "is" : "are"} ${matches.length} other unit${matches.length === 1 ? "" : "s"} just like this one. Scroll down to the Similar Units section on this unit's panel for a closer look.`;
      },
    },
    {
      id: "compare",
      label: "Compare units",
      topic: "comparing your units",
      available: compareCount > 0,
      confirmText: "Great choice — let's put those units side by side for you.",
      action: () => openCompare(),
    },
    {
      id: "brochure",
      label: "Download brochure",
      topic: "the brochure",
      available: hasUnit,
      answer: () => 'I can\'t generate it from here just yet, but the "Download Brochure" button right in this unit\'s panel will get you a full PDF in seconds.',
    },
    {
      id: "search",
      label: "Search for a unit",
      topic: "searching for a unit",
      available: true,
      answer: () => "Looking for something specific? The Filter button in the sidebar lets you search by price, area, bedrooms, and bathrooms.",
    },
    {
      id: "contact",
      label: "Book a visit / talk to sales",
      topic: "booking a visit",
      available: true,
      confirmText: "Of course — opening WhatsApp so you can chat directly with our sales team.",
      href: WHATSAPP_URL,
    },
  ];
}
