// Ranks floors deepest-basement -> ground -> floor 1, floor 2, ...
// Prefers the numeric `floorNumber` field (API mode); falls back to parsing
// `displayName`/`id` text since static-mode floor data has no `floorNumber`.
function getFloorRank(floor) {
  if (typeof floor.floorNumber === "number" && !Number.isNaN(floor.floorNumber)) {
    return floor.floorNumber;
  }

  const text = String(floor.displayName ?? floor.id ?? "").toLowerCase();
  const num = parseInt(text.match(/\d+/)?.[0] ?? "1", 10);

  if (text.includes("basement")) return -num;
  if (text.includes("ground")) return 0;
  if (text.includes("floor")) return num;

  return Number.POSITIVE_INFINITY; // unrecognized label: keep at the end
}

export function sortFloors(floors) {
  if (!Array.isArray(floors)) return floors;
  return [...floors].sort((a, b) => getFloorRank(a) - getFloorRank(b));
}
