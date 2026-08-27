import { PROPERTY_TYPE } from "../constants/roles";

// Walks every unit in the project tree (villa/townhouse/tower branches), calling `visit` for
// each. `visit` returning true stops the walk early (used by findUnitInProject's single-match
// lookup); findUnitsByType ignores the return value and just collects matches.
function walkUnits(project, visit) {
  const zoneItems = project?.zones?.items || [];

  for (const zone of zoneItems) {
    for (const property of zone.properties || []) {
      if (property.type === PROPERTY_TYPE.VILLA) {
        for (const unit of property.units || []) {
          if (visit(unit)) return;
        }
      } else if (property.type === PROPERTY_TYPE.TOWNHOUSE) {
        for (const block of property.blocks || []) {
          for (const unit of block.units || []) {
            if (visit(unit)) return;
          }
        }
      } else {
        for (const floor of property.floors || []) {
          for (const unit of floor.units || []) {
            if (visit(unit)) return;
          }
        }
      }
    }
  }
}

export function findUnitInProject(project, unitId) {
  let found = null;
  walkUnits(project, (unit) => {
    if (unit.id === unitId) {
      found = unit;
      return true;
    }
    return false;
  });
  return found;
}

export function findUnitsByType(project, unitTypeId, excludeUnitId, limit = 6) {
  const matches = [];
  walkUnits(project, (unit) => {
    if (unit.unitTypeId === unitTypeId && unit.id !== excludeUnitId) {
      matches.push(unit);
    }
    return matches.length >= limit;
  });
  return matches;
}
