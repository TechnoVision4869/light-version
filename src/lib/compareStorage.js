import { findUnitInProject } from "./findUnitById";

const STORAGE_KEY = "compareUnits";
const MAX_COMPARE_UNITS = 4;
export const COMPARE_UPDATED_EVENT = "compare-updated";

function readIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

function writeIds(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(COMPARE_UPDATED_EVENT));
}

export function getCompareUnits() {
  return readIds();
}

export function isInCompare(unitId) {
  return readIds().includes(unitId);
}

export function addToCompare(unitId) {
  const ids = readIds();
  if (ids.includes(unitId)) return { ok: true };
  if (ids.length >= MAX_COMPARE_UNITS) return { ok: false, reason: "limit" };
  writeIds([...ids, unitId]);
  return { ok: true };
}

export function removeFromCompare(unitId) {
  writeIds(readIds().filter((id) => id !== unitId));
}

export function pruneCompareUnits(project) {
  if (!project) return;
  const ids = readIds();
  const valid = ids.filter((id) => findUnitInProject(project, id));
  if (valid.length !== ids.length) {
    writeIds(valid);
  }
}
