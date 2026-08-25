import { PROPERTY_TYPE } from "../constants/roles";

export function findUnitInProject(project, unitId) {
  const zoneItems = project?.zones?.items || [];

  for (const zone of zoneItems) {
    for (const property of zone.properties || []) {
      if (property.type === PROPERTY_TYPE.VILLA) {
        const found = (property.units || []).find((unit) => unit.id === unitId);
        if (found) return found;
      } else if (property.type === PROPERTY_TYPE.TOWNHOUSE) {
        for (const block of property.blocks || []) {
          const found = (block.units || []).find((unit) => unit.id === unitId);
          if (found) return found;
        }
      } else {
        for (const floor of property.floors || []) {
          const found = (floor.units || []).find((unit) => unit.id === unitId);
          if (found) return found;
        }
      }
    }
  }

  return null;
}
