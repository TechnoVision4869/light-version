// import { PROJECT_MIX as PROJECT } from "./project-mix";
import {PROJECT_HORIZONTAL as PROJECT} from "./project-horizontal";

const projectId = PROJECT.project.id;
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
  APARTMENT: "apartment",
  INTERIOR: "interior",

  // SURROUNDINGS tab layers
  SURROUNDING_DETAIL: "surrounding_detail",

  // AMENITIES tab layers
  AMENITY_DETAIL: "amenity_detail",
};

export const FILTER_ENUM = {
  TYPE: "unitType",
  AREA: "area",
  PRICE: "price",
  BEDROOMS: "bedrooms",
  BATHROOMS: "bathrooms",
}

export const FILTER_TYPE = {
  RANGE: "range",
  DISCRETE: "discrete",
}

// Tab configurations (main views)
export const TAB_CONFIG = {
  [TABS.HOME]: {
    videosPath: {
      forwardVideo: `${projectId}/videos/home/home_out.mp4`,
      reverseVideo: null,
      idleVideo: `/${projectId}/videos/home/home_idle.mp4`,
    },
  },
  [TABS.ZONES]: {
    title: "Zoya Zones",
    videosPath: (isFromHome) => ({
      forwardVideo: isFromHome
        ? `/${projectId}/videos/zones/zones_gen_trans.mp4`
        : `/${projectId}/videos/home/home_out.mp4`,
      reverseVideo: `/${projectId}/videos/zones/zones_gen_rev.mp4`,
      idleVideo: `/${projectId}/videos/zones/zones_gen_idle.mp4`,
    }),

    getItems: () => PROJECT.zones.map(z => ({ ...z, __type: 'zone', __nextLayer: LAYERS.ZONE_DETAIL })),
    // Here, getItems returns array of all the zones,
    // used to map the zones to buttons
  },
  [TABS.SURROUNDINGS]: {
    title: "A Location Like No Other",
    description:
      "Zoya Ghazala Bays location was a decision meticulously made to achieve prime. An exclusive spot on the 142 kmAlex to Matrouh Road. It lies on Ghazala Bay's crystal clearshoreline.",

    videosPath: (isFromHome) => ({
      forwardVideo: isFromHome
        ? `/${projectId}/videos/surroundings/surr_gen_trans_from_home.mp4`
        : `/${projectId}/videos/surroundings/surr_out.mp4`,
      reverseVideo: `/${projectId}/videos/surroundings/surr_gen_rev_trans_to_home.mp4`,
      idleVideo: `/${projectId}/videos/surroundings/surr_idle.mp4`,
    }),

    getItems: () => PROJECT.surroundings.map(s => ({ ...s, __type: 'surrounding', __nextLayer: LAYERS.SURROUNDING_DETAIL })),
  },
  [TABS.AMENITIES]: {
    title: "Amenities",

    videosPath: (isFromHome) => ({
      forwardVideo: isFromHome
        ? `/${projectId}/videos/amenities/amenities_gen_trans_from_home.mp4`
        : `/${projectId}/videos/amenities/amenities_out.mp4`,
      reverseVideo: `/${projectId}/videos/amenities/amenities_gen_rev_trans_to_home.mp4`,
      idleVideo: `/${projectId}/videos/amenities/amenities_gen_idle.mp4`,
    }),

    getItems: () => PROJECT.amenities.map(a => ({ ...a, __type: 'amenity', __nextLayer: LAYERS.AMENITY_DETAIL })),
  },
};

// Layer configurations (detail views)
export const LAYER_CONFIG = {
  [LAYERS.ZONE_DETAIL]: {
    path: (zoneId) => `/${zoneId}_zoom`,
    videosPath: (zone) => {
      const zoneId = zone.id;
      return {
        forwardVideo: `/${projectId}/videos/zones/${zoneId}/${zoneId}_gen_trans.mp4`,
        reverseVideo: `/${projectId}/videos/zones/${zoneId}/${zoneId}_gen_rev.mp4`,
        idleVideo: `/${projectId}/videos/zones/${zoneId}/${zoneId}_gen_idle.mp4`,
      };
    },
    getData: (zoneId) => PROJECT.zones.find((z) => z.id === zoneId),
    // Here, getData returns the zone object with the given id
    // used to display the zone details
    getItems: (zone) => PROJECT.buildings.filter((b) => b.zoneId === zone.id).map(b => ({ ...b, __type: 'building', __nextLayer: LAYERS.BUILDING })),
    // Here, getItems returns array of buildings in this zone
    // used to map the buildings to buttons
  },

  [LAYERS.BUILDING]: {
    videosPath: (building) => {
      const buildingId = building.id;
      const zoneId = building.zoneId;
      return {
        forwardVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/${zoneId}_${buildingId}_gen_trans.mp4`,
        reverseVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/${zoneId}_${buildingId}_gen_rev.mp4`,
        idleVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/views/view1/${zoneId}_${buildingId}_view1_idle.mp4`,
      };
    },
    getData: (buildingId) => PROJECT.buildings.find((b) => b.id === buildingId),
    // Here, getData returns the building object with the given id
    // used to display the building details

    // here there's a potential bug if building id isn't unique
    // which is predictable, same for floors and units
    getItems: (building) => {
      const buildingId = building.id;
      const zoneId = building.zoneId;
      const floors = PROJECT.floors.filter(
        (f) => f.buildingId === buildingId && f.zoneId === zoneId
      );
      // Tower: has floors → return floors
      // TownHouse: is a type saved arbitrary in floors → return floors
      if (floors.length > 0) return floors.map(f => ({ ...f, __type: 'floor', __nextLayer: LAYERS.FLOOR }));
      // Villa: no floors → return units directly
      else return PROJECT.units.filter(u => u.buildingId === buildingId).map(u => ({ ...u, __type: 'apartment', __nextLayer: LAYERS.APARTMENT }));
    },

    // Function to get video paths for a specific view of this building
    getVideosPathForView: (building, viewIndex) => {
      const buildingId = building.id;
      const zoneId = building.zoneId;
      const viewNum = viewIndex + 1; // Convert 0-based index to 1-based view number
      return {
        forwardVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/views/view${viewNum}/${zoneId}_${buildingId}_view${viewNum}_trans.mp4`,
        reverseVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/views/view${viewNum}/${zoneId}_${buildingId}_view${viewNum}_rev.mp4`,
        idleVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/views/view${viewNum}/${zoneId}_${buildingId}_view${viewNum}_idle.mp4`,
      };
    },
  },

  [LAYERS.FLOOR]: {
    videosPath: (floor) => {
      const floorId = floor.id;
      const buildingId = floor.buildingId;
      const zoneId = floor.zoneId;
      return {
        forwardVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/floors/${zoneId}_${buildingId}_floor1_trans.mp4`,
        reverseVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/floors/${zoneId}_${buildingId}_floor1_rev.mp4`,
        idleVideo: `/${projectId}/videos/zones/${zoneId}/${buildingId}/floors/${floorId}/${zoneId}_${buildingId}_${floorId}_idle.mp4`,
      };
    },
    getData: (floorId) => PROJECT.floors.find((f) => f.id === floorId),
    // Here, getData returns the floor object with the given id
    // used to display the floor details
    getItems: (floor) => {
      const floorId = floor.id;
      const buildingId = floor.buildingId;
      const zoneId = floor.zoneId;
      
      return PROJECT.units.filter(
        (a) =>
          a.floorId === floorId &&
          a.buildingId === buildingId &&
          a.zoneId === zoneId
      ).map(u => ({ ...u, __type: 'apartment', __nextLayer: LAYERS.APARTMENT }));
    },
  },
  
  [LAYERS.APARTMENT]: {
    videosPath: (apartment) => {
      return {
        forwardVideo: "/cutsection.mp4",
        reverseVideo: "/cutsection.mp4",
        idleVideo: "/cutsection.mp4",
      };
    },
    getData: (apartmentId) => PROJECT.units.find((a) => a.id === apartmentId),

    getMinMaxRange: (units = PROJECT.units, filterName) => {
      // const units = DATA.units;

      if (units.length === 0) {
        return { min: 0, max: 0 };
      }

      let min = units[0][filterName];
      let max = units[0][filterName];

      for (let i = 1; i < units.length; i++) {
        const value = units[i][filterName];
        if (value < min) min = value;
        if (value > max) max = value;
      }
      return {
        min: min,
        max: max,
      }
    },
    getDiscreteValues: (units = PROJECT.units, filterName) => {
      return [...new Set(units.map(a => a[filterName]))].sort((a, b) => a - b);
    },
  },
  [LAYERS.SURROUNDING_DETAIL]: {
    path: (surroundingId) => `/${surroundingId}_zoom`,
    getData: (surroundingId) =>
      PROJECT.surroundings.find((s) => s.id === surroundingId),
    getItems: () => PROJECT.surroundings,
  },
  [LAYERS.AMENITY_DETAIL]: {
    path: (amenityId) => `/${amenityId}_zoom`,
    videosPath: (amenity) => {
      const amenityId = amenity.id;
      return {
        forwardVideo: `/${projectId}/videos/amenities/${amenityId}/${amenityId}_trans.mp4`,
        reverseVideo: `/${projectId}/videos/amenities/${amenityId}/${amenityId}_rev.mp4`,
        idleVideo: `/${projectId}/videos/amenities/${amenityId}/${amenityId}_idle.mp4`,
      };
    },
    getData: (amenityId) => PROJECT.amenities.find((a) => a.id === amenityId),
    getItems: () => PROJECT.amenities,
  },
};
