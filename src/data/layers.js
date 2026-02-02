// import { PROJECT_MIX as PROJECT } from "./project-mix";
import { PROJECT_HORIZONTAL as PROJECT } from "./project-horizontal";

export const DATA = PROJECT;

// Navigation Tabs (top-level categories)
export const TABS = {
  HOME: "home",
  SURROUNDINGS: "surroundings",
  AMENITIES: "amenities",
  ZONES: "zones",
};

// Content Layers (hierarchy within tabs)
export const LAYERS = {
  // ZONES tab layers
  ZONE_DETAIL: "zone_detail",
  BUILDING: "building", // Could be a tower or villa
  FLOOR: "floor",
  UNIT: "unit",
  INTERIOR: "interior",

  // SURROUNDINGS tab layers
  SURROUNDING_DETAIL: "surrounding_detail",

  // AMENITIES tab layers
  AMENITY_DETAIL: "amenity_detail",
};

// export const FILTER_ENUM = {
//   TYPE: "unitType",
//   AREA: "area",
//   PRICE: "price",
//   BEDROOMS: "bedrooms",
//   BATHROOMS: "bathrooms",
// }

export const FILTER_TYPE = {
  RANGE: "range",
  DISCRETE: "discrete",
}

// Tab configurations (main views)
// export const TAB_CONFIG = {
//   [TABS.HOME]: {
//     videosPath: {
//       forwardVideo: `${projectId}/videos/home/home_out.mp4`,
//       reverseVideo: null,
//       idleVideo: `/${projectId}/videos/home/home_idle.mp4`,
//     },
//   },
//   [TABS.ZONES]: {
//     title: "Zoya Zones",
//     videosPath: (isFromHome) => ({
//       forwardVideo: isFromHome
//         ? `/${projectId}/videos/zones/zones_gen_trans.mp4`
//         : `/${projectId}/videos/home/home_out.mp4`,
//       reverseVideo: `/${projectId}/videos/zones/zones_gen_rev.mp4`,
//       idleVideo: `/${projectId}/videos/zones/zones_gen_idle.mp4`,
//     }),

//     getItems: () => PROJECT.zones,
//     // Here, getItems returns array of all the zones,
//     // used to map the zones to buttons
//   },
//   [TABS.SURROUNDINGS]: {
//     title: "A Location Like No Other",
//     description:
//       "Zoya Ghazala Bays location was a decision meticulously made to achieve prime. An exclusive spot on the 142 kmAlex to Matrouh Road. It lies on Ghazala Bay's crystal clearshoreline.",

//     videosPath: (isFromHome) => ({
//       forwardVideo: isFromHome
//         ? `/${projectId}/videos/surroundings/surr_gen_trans_from_home.mp4`
//         : `/${projectId}/videos/surroundings/surr_out.mp4`,
//       reverseVideo: `/${projectId}/videos/surroundings/surr_gen_rev_trans_to_home.mp4`,
//       idleVideo: `/${projectId}/videos/surroundings/surr_idle.mp4`,
//     }),

//     getItems: () => PROJECT.surroundings,
//   },
//   [TABS.AMENITIES]: {
//     title: "Amenities",

//     videosPath: (isFromHome) => ({
//       forwardVideo: isFromHome
//         ? `/${projectId}/videos/amenities/amenities_gen_trans_from_home.mp4`
//         : `/${projectId}/videos/amenities/amenities_out.mp4`,
//       reverseVideo: `/${projectId}/videos/amenities/amenities_gen_rev_trans_to_home.mp4`,
//       idleVideo: `/${projectId}/videos/amenities/amenities_gen_idle.mp4`,
//     }),

//     getItems: () => PROJECT.amenities,
//   },
// };

// Layer configurations (detail views)
// export const LAYER_CONFIG = {
//   [LAYERS.ZONE_DETAIL]: {
//     videosPath: (zone) => {
//       const zoneId = zone.id;
//       return {
//         forwardVideo: `/${projectId}/videos/zones/${zoneId}/${zoneId}_gen_trans.mp4`,
//         reverseVideo: `/${projectId}/videos/zones/${zoneId}/${zoneId}_gen_rev.mp4`,
//         idleVideo: `/${projectId}/videos/zones/${zoneId}/${zoneId}_gen_idle.mp4`,
//       };
//     },
//     getData: (zoneId) => PROJECT.zones.find((z) => z.id === zoneId),
//     // Here, getData returns the zone object with the given id
//     // used to display the zone details
//     getItems: (zone) => {      
//       if(zone.nextLayer === LAYERS.TYPE) return PROJECT.types.filter((t) => t.zoneId === zone.id);
//       else return PROJECT.buildings.filter((b) => b.zoneId === zone.id);
//     }
//   },

//   // [LAYERS.TYPE]: {
//   //   videosPath: (type) => {
//   //     const zoneId = type.zoneId;
//   //     return {
//   //       forwardVideo: `/${projectId}/videos/zones/${zoneId}/${zoneId}_gen_idle.mp4`,
//   //       reverseVideo: `/${projectId}/videos/zones/${zoneId}/${zoneId}_gen_idle.mp4`,
//   //       idleVideo: `/${projectId}/videos/zones/${zoneId}/${zoneId}_gen_idle.mp4`,
//   //     }
//   //   },
//   //   getData: (typeId) => PROJECT.types.find((t) => t.id === typeId),
//   //   // Here, getData returns the type object with the given id
//   //   // used to display the type details

//   //   getItems: (type) => {
//   //     const typeId = type.id;
//   //     const zoneId = type.zoneId;
//   //     const buildings = PROJECT.buildings.filter(
//   //       (b) => b.typeId === typeId && b.zoneId === zoneId
//   //     );
//   //     // type is Townhouse, it still has buildings to view
//   //     if (buildings.length > 0) return buildings;
//   //     // Villa: no buildings → return units directly
//   //     else return PROJECT.units.filter(u => u.typeId === typeId && u.zoneId === zoneId);
//   //   },
//   // },

//   [LAYERS.BUILDING]: {
//     videosPath: (building) => {
//       const buildingId = building.id;
//       const zoneId = building.zoneId;
//       const typeId = building.typeId || null;
//       if(!typeId) {
//         console.warn(`Building ${buildingId} has no typeId`);
//         return {
//           forwardVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/${zoneId}_${buildingId}_gen_trans.mp4`,
//           reverseVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/${zoneId}_${buildingId}_gen_rev.mp4`,
//           idleVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/views/view1/${zoneId}_${buildingId}_view1_idle.mp4`,
//         };
//       }
//       else {
//         return {
//           forwardVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/${zoneId}_${typeId}_gen_trans.mp4`,
//           reverseVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/${zoneId}_${typeId}_gen_rev.mp4`,
//           idleVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/views/view1/${zoneId}_${typeId}_view1_idle.mp4`,
//         };
//       }
//     },
//     getData: (buildingId) => PROJECT.buildings.find((b) => b.id === buildingId),
//     // Here, getData returns the building object with the given id
//     // used to display the building details

//     getItems: (building) => {
//       const buildingId = building.id;
//       const zoneId = building.zoneId;
//       const floors = PROJECT.floors?.filter(
//         (f) => f.buildingId === buildingId && f.zoneId === zoneId
//       );
//       // Tower: has floors → return floors
//       if(floors) {
//         if (floors.length > 0) return floors;
//       }
//       // Villa: no floors → return units directly
//       else return PROJECT.units.filter(u => u.buildingId === buildingId);
//       // if returned more than 1 unit, list them, else if 1 unit, go to unit panel with unit ID
//     },

//     // Function to get video paths for a specific view of this building
//     getVideosPathForView: (building, viewIndex) => {
//       const viewNum = viewIndex + 1; // Convert 0-based index to 1-based view number
//       const buildingId = building.id;
//       const zoneId = building.zoneId;
//       const typeId = building.typeId || null;
//       if(!typeId) {
//         console.warn(`Building ${buildingId} has no typeId`);
//         return {
//           forwardVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/views/view${viewNum}/${zoneId}_${buildingId}_view${viewNum}_trans.mp4`,
//           reverseVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/views/view${viewNum}/${zoneId}_${buildingId}_view${viewNum}_rev.mp4`,
//           idleVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/views/view${viewNum}/${zoneId}_${buildingId}_view${viewNum}_idle.mp4`,
//         };
//       } else {
//         return {
//           forwardVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/views/view${viewNum}/${zoneId}_${typeId}_view${viewNum}_trans.mp4`,
//           reverseVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/views/view${viewNum}/${zoneId}_${typeId}_view${viewNum}_rev.mp4`,
//           idleVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/views/view${viewNum}/${zoneId}_${typeId}_view${viewNum}_idle.mp4`,
//         };
//       }
//     },
//   },

//   [LAYERS.FLOOR]: {
//     videosPath: (floor) => {
//       const floorId = floor.id;
//       const buildingId = floor.buildingId;
//       const zoneId = floor.zoneId;
//       return {
//         forwardVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/floors/${zoneId}_${buildingId}_floor1_trans.mp4`,
//         reverseVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/floors/${zoneId}_${buildingId}_floor1_rev.mp4`,
//         idleVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/floors/${floorId}/${zoneId}_${buildingId}_${floorId}_idle.mp4`,
//       };
//     },
//     getData: (floorId) => PROJECT.floors.find((f) => f.id === floorId),
//     // Here, getData returns the floor object with the given id
//     // used to display the floor details
//     getItems: (floor) => {
//       const floorId = floor.id;
//       const buildingId = floor.buildingId;
//       const zoneId = floor.zoneId;

//       return PROJECT.units.filter(
//         (a) =>
//           a.floorId === floorId &&
//           a.buildingId === buildingId &&
//           a.zoneId === zoneId
//       )
//     },
//   },

//   [LAYERS.UNIT]: {
//     videosPath: (unit) => {
//       const buildingId = unit.buildingId || null;
//       const zoneId = unit.zoneId;
//       const typeId = unit.typeId || null;
//       if(!buildingId) {
//         // Villa
//         return {
//           forwardVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/${zoneId}_${typeId}_gen_trans.mp4`,
//           reverseVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/${zoneId}_${typeId}_gen_rev.mp4`,
//           idleVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/views/view1/${zoneId}_${typeId}_view1_idle.mp4`,
//         };
//       }
//       else return {
//         forwardVideo: "/cutsection.mp4",
//         reverseVideo: "/cutsection.mp4",
//         idleVideo: "/cutsection.mp4",
//       };
//     },
//     getData: (unitId) => PROJECT.units.find((u) => u.id === unitId),

//     getVideosPathForView: (unit, viewIndex) => {
//       const viewNum = viewIndex + 1; // Convert 0-based index to 1-based view number
//       const buildingId = unit.buildingId || null;
//       const zoneId = unit.zoneId;
//       const typeId = unit.typeId || null;
//       if(!buildingId) {
//         return {
//           forwardVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/views/view${viewNum}/${zoneId}_${typeId}_view${viewNum}_trans.mp4`,
//           reverseVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/views/view${viewNum}/${zoneId}_${typeId}_view${viewNum}_rev.mp4`,
//           idleVideo: `/${projectId}/videos/zones/${zoneId}/${typeId}/views/view${viewNum}/${zoneId}_${typeId}_view${viewNum}_idle.mp4`,
//         };
//       } else return null;
//     },

//     getMinMaxRange: (units = PROJECT.units, filterName) => {
//       // const units = DATA.units;

//       if (units.length === 0) {
//         return { min: 0, max: 0 };
//       }

//       let min = units[0][filterName];
//       let max = units[0][filterName];

//       for (let i = 1; i < units.length; i++) {
//         const value = units[i][filterName];
//         if (value < min) min = value;
//         if (value > max) max = value;
//       }
//       return {
//         min: min,
//         max: max,
//       }
//     },
//     getDiscreteValues: (units = PROJECT.units, filterName) => {
//       return [...new Set(units.map(a => a[filterName]))].sort((a, b) => a - b);
//     },
//   },
//   [LAYERS.SURROUNDING_DETAIL]: {
//     getData: (surroundingId) =>
//       PROJECT.surroundings.find((s) => s.id === surroundingId),
//     getItems: () => PROJECT.surroundings,
//   },
//   [LAYERS.AMENITY_DETAIL]: {
//     videosPath: (amenity) => {
//       const amenityId = amenity.id;
//       return {
//         forwardVideo: `/${projectId}/videos/amenities/${amenityId}/${amenityId}_trans.mp4`,
//         reverseVideo: `/${projectId}/videos/amenities/${amenityId}/${amenityId}_rev.mp4`,
//         idleVideo: `/${projectId}/videos/amenities/${amenityId}/${amenityId}_idle.mp4`,
//       };
//     },
//     getData: (amenityId) => PROJECT.amenities.find((a) => a.id === amenityId),
//     getItems: () => PROJECT.amenities,
//   },
// };
