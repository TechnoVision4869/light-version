export const MODE = {
  VIDEO: "videos",
  SEQUENCE: "sequences",
};
export const MODE_CONFIG = MODE.VIDEO;

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

// Tab configurations (main views)
export const TAB_CONFIG = {
  [TABS.HOME]: {
    path: "/home.jpg", // Static image
    videosPath: {
      forwardVideo: `${MODE_CONFIG}/home/home_out.mp4`,
      reverseVideo: null,
      idleVideo: `/${MODE_CONFIG}/home/home_idle.mp4`,
    },
  },
  [TABS.ZONES]: {
    title: "Zoya Zones",
    path: "/zones_zoom",

    videosPath: (isFromHome) => ({
      forwardVideo: isFromHome ? `/${MODE_CONFIG}/zones/zones_gen_trans.mp4` : `/${MODE_CONFIG}/home/home_out.mp4`,
      reverseVideo: `/${MODE_CONFIG}/zones/zones_gen_rev.mp4`,
      idleVideo: `/${MODE_CONFIG}/zones/zones_gen_idle.mp4`,
    }),

    getItems: () => DATA.zones,
    // Here, getItems returns array of all the zones,
    // used to map the zones to buttons
  },
  [TABS.SURROUNDINGS]: {
    title: "A Location Like No Other",
    path: "/surroundings_zoom",
    description:
      "Zoya Ghazala Bays location was a decision meticulously made to achieve prime. An exclusive spot on the 142 kmAlex to Matrouh Road. It lies on Ghazala Bay's crystal clearshoreline.",

    videosPath: (isFromHome) => ({
      forwardVideo: isFromHome ? `/${MODE_CONFIG}/surroundings/surr_gen_trans_from_home.mp4` : `/${MODE_CONFIG}/surroundings/surr_out.mp4`,
      reverseVideo: `/${MODE_CONFIG}/surroundings/surr_gen_rev_trans_to_home.mp4`,
      idleVideo: `/${MODE_CONFIG}/surroundings/surr_idle.mp4`,
    }),

    getItems: () => DATA.surroundings,
  },
  [TABS.AMENITIES]: {
    title: "Amenities",
    path: "/amenities_zoom",

    videosPath: (isFromHome) => ({
      forwardVideo: isFromHome ? `/${MODE_CONFIG}/amenities/amenities_gen_trans_from_home.mp4` : `/${MODE_CONFIG}/amenities/amenities_out.mp4`,
      reverseVideo: `/${MODE_CONFIG}/amenities/amenities_gen_rev_trans_to_home.mp4`,
      idleVideo: `/${MODE_CONFIG}/amenities/amenities_gen_idle.mp4`,
    }),

    getItems: () => DATA.amenities,
  },
};

// Layer configurations (detail views)
export const LAYER_CONFIG = {
  [LAYERS.ZONE_DETAIL]: {
    path: (zoneId) => `/${zoneId}_zoom`,
    videosPath: (zone) => {
      const zoneId = zone.id;
      return {
        forwardVideo: `/${MODE_CONFIG}/zones/${zoneId}/${zoneId}_gen_trans.mp4`,
        reverseVideo: `/${MODE_CONFIG}/zones/${zoneId}/${zoneId}_gen_rev.mp4`,
        idleVideo: `/${MODE_CONFIG}/zones/${zoneId}/${zoneId}_gen_idle.mp4`,
      };
    },
    getData: (zoneId) => DATA.zones.find((z) => z.id === zoneId),
    // Here, getData returns the zone object with the given id
    // used to display the zone details
    getItems: (zone) => DATA.buildings.filter((b) => b.zoneId === zone.id),
  },
  [LAYERS.BUILDING]: {
    videosPath: (building) => {
      const buildingId = building.id;
      const zoneId = building.zoneId;
      return {
        forwardVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/${zoneId}_${buildingId}_gen_trans.mp4`,
        reverseVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/${zoneId}_${buildingId}_gen_rev.mp4`,
        idleVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/views/view1/${zoneId}_${buildingId}_view1_idle.mp4`,
      };
    },
    getData: (buildingId) => DATA.buildings.find((b) => b.id === buildingId),
    // Here, getData returns the building object with the given id
    // used to display the building details

    // here there's a potential bug if building id isn't unique
    // which is predictable, same for floors and apartments
    getItems: (building) => {
      const buildingId = building.id;
      const zoneId = building.zoneId;
      return DATA.floors.filter((f) => (f.buildingId === buildingId && f.zoneId === zoneId));
    },
  },
  [LAYERS.FLOOR]: {
    videosPath: (floor) => {
      const floorId = floor.id;
      const buildingId = floor.buildingId;
      const zoneId = floor.zoneId;
      return {
        forwardVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/floors/${zoneId}_${buildingId}_floor1_trans.mp4`,
        reverseVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/floors/${zoneId}_${buildingId}_floor1_rev.mp4`,
        idleVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/floors/${floorId}/${zoneId}_${buildingId}_${floorId}_idle.mp4`,
      };
    },
    getData: (floorId) => DATA.floors.find((f) => f.id === floorId),
    // Here, getData returns the floor object with the given id
    // used to display the floor details
    getItems: (floor) => {
      const floorId = floor.id
      const buildingId = floor.buildingId;
      const zoneId = floor.zoneId;
      return DATA.apartments.filter(
        (a) =>
          a.floorId === floorId &&
          a.buildingId === buildingId &&
          a.zoneId === zoneId
      );
    },
  },
  [LAYERS.APARTMENT]: {

  },
  [LAYERS.SURROUNDING_DETAIL]: {
    path: (surroundingId) => `/${surroundingId}_zoom`,
    getData: (surroundingId) =>
      DATA.surroundings.find((s) => s.id === surroundingId),
  },
  [LAYERS.AMENITY_DETAIL]: {
    path: (amenityId) => `/${amenityId}_zoom`,
    videosPath: (amenity) => {
      const amenityId = amenity.id;
      return {
        forwardVideo: `/${MODE_CONFIG}/amenities/${amenityId}/${amenityId}_trans.mp4`,
        reverseVideo: `/${MODE_CONFIG}/amenities/${amenityId}/${amenityId}_rev.mp4`,
        idleVideo: `/${MODE_CONFIG}/amenities/${amenityId}/${amenityId}_idle.mp4`,
      };
    },
    getData: (amenityId) => DATA.amenities.find((a) => a.id === amenityId),
  },
};

// Raw data (separate from config)
export const DATA = {
  zones: [
    {
      id: "zone1",
      name: "Towers",
      subtitle: "Zone",
      thumbnail: "thumbnails/zones/zone1.png",
      description:
        "Our towers hold different apartments options. They are at the center of the city.",
    },
    {
      id: "zone2",
      name: "Towers",
      subtitle: "Zone",
      thumbnail: "thumbnails/zones/zone2.png",
      description:
        "Our towers hold different apartments options. They are at the center of the city.",
    },
    // ... other zones
  ],
  buildings: [
    {
      id: "tower1",
      zoneId: "zone1",
      name: "Tower 1",
      description: "Tower 1 description...",
    },
    {
      id: "tower2",
      zoneId: "zone1",
      name: "Tower 2",
      description: "Tower 2 description...",
    },
    {
      id: "tower5",
      zoneId: "zone2",
      name: "Tower 5",
      description: "Tower 5 description...",
    },
  ],
  floors: [
    {
      id: "floor1",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Floor 1",
      type: "Residential",
      description: "First floor description...",
    },
    {
      id: "floor2",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Floor 2",
      type: "Residential",
      description: "Second floor description...",
    },
    {
      id: "floor1",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Floor 1",
      type: "Residential",
      description: "First floor description...",
    },
    {
      id: "floor2",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Floor 2",
      type: "Residential",
      description: "Second floor description...",
    },
  ],
  apartments: [
    // Zone 1 - Tower 1 - Floor 1
    {
      id: "apartment101",
      floorId: "floor1",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Apartment 101",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 1,
      area: 85, // Store as number for range queries
      price: 250000, // Store as number for range queries
    },
    {
      id: "apartment102",
      floorId: "floor1",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Apartment 102",
      description: "Beautiful 4-bedroom apartment...",
      bedrooms: 4,
      bathrooms: 2,
      area: 200,
      price: 400000,
    },
    {
      id: "apartment103",
      floorId: "floor1",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Apartment 103",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      price: 300000,
    },
    {
      id: "apartment104",
      floorId: "floor1",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Apartment 104",
      description: "Beautiful 3-bedroom apartment...",
      bedrooms: 3,
      bathrooms: 2,
      area: 185,
      price: 350000,
    },
    {
      id: "apartment105",
      floorId: "floor1",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Apartment 105",
      description: "Beautiful 4-bedroom apartment...",
      bedrooms: 4,
      bathrooms: 2,
      area: 250,
      price: 500000,
    },
    // Zone 1 - Tower 1 - Floor 2
    {
      id: "apartment201",
      floorId: "floor2",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Apartment 201",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 1,
      area: 115,
      price: 275000,
    },
    {
      id: "apartment202",
      floorId: "floor2",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Apartment 202",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 2,
      area: 125,
      price: 300000,
    },
    {
      id: "apartment203",
      floorId: "floor2",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Apartment 203",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 2,
      area: 125,
      price: 300000,
    },
    {
      id: "apartment204",
      floorId: "floor2",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Apartment 204",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 2,
      area: 115,
      price: 275000,
    },
    {
      id: "apartment205",
      floorId: "floor2",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Apartment 205",
      description: "Beautiful 3-bedroom apartment...",
      bedrooms: 3,
      bathrooms: 2,
      area: 145,
      price: 325000,
    },
    {
      id: "apartment206",
      floorId: "floor2",
      buildingId: "tower1",
      zoneId: "zone1",
      name: "Apartment 206",
      description: "Beautiful 4-bedroom apartment...",
      bedrooms: 4,
      bathrooms: 2,
      area: 200,
      price: 400000,
    },
    // Zone 1 - Tower 2 - Floor 1
    {
      id: "apartment111",
      floorId: "floor1",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Apartment 111",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 1,
      area: 100,
      price: 260000,
    },
    {
      id: "apartment112",
      floorId: "floor1",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Apartment 112",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 2,
      area: 150,
      price: 325000,
    },
    {
      id: "apartment113",
      floorId: "floor1",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Apartment 113",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      price: 240000,
    },
    {
      id: "apartment114",
      floorId: "floor1",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Apartment 114",
      description: "Beautiful 3-bedroom apartment...",
      bedrooms: 3,
      bathrooms: 2,
      area: 185,
      price: 375000,
    },
    {
      id: "apartment115",
      floorId: "floor1",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Apartment 115",
      description: "Beautiful 4-bedroom apartment...",
      bedrooms: 4,
      bathrooms: 2,
      area: 220,
      price: 450000,
    },
    // Zone 1 - Tower 2 - Floor 2
    {
      id: "apartment221",
      floorId: "floor2",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Apartment 221",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 1,
      area: 115,
      price: 275000,
    },
    {
      id: "apartment222",
      floorId: "floor2",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Apartment 222",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      price: 240000,
    },
    {
      id: "apartment223",
      floorId: "floor2",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Apartment 223",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 2,
      area: 125,
      price: 300000,
    },
    {
      id: "apartment224",
      floorId: "floor2",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Apartment 224",
      description: "Beautiful 2-bedroom apartment...",
      bedrooms: 2,
      bathrooms: 2,
      area: 115,
      price: 275000,
    },
    {
      id: "apartment225",
      floorId: "floor2",
      buildingId: "tower2",
      zoneId: "zone1",
      name: "Apartment 225",
      description: "Beautiful 3-bedroom apartment...",
      bedrooms: 3,
      bathrooms: 2,
      area: 145,
      price: 325000,
    },
  ],

  surroundings: [
    {
      id: "surrounding1",
      name: "Cairo Airport",
      thumbnail: "thumbnails/cairo_airboart.jpg",
      distance: "38 Min | 55 Km",
      description: "Cairo International Airport is the principal international airport of Cairo and the largest and busiest airport in Egypt. It serves as the primary hub for Egyptair and Nile Air as well as several other airlines.",
    },
    {
      id: "surrounding2",
      name: "GYM",
      thumbnail: "thumbnails/gym.jpg",
      distance: "3 Min | 1 Km",
      description: "Gym...",
    },
    {
      id: "surrounding3",
      name: "Iconic Tower",
      thumbnail: "thumbnails/iconic_tower.jpg",
      distance: "8 Min | 5 Km",
      description: "Iconic tower...",
    },
  ],
  amenities: [
    {
      id: "amenity1",
      name: "Landscapes",
      subtitle: "Amenity",
      thumbnail: "thumbnails/amenities/f1.png",
      description:
        "Modern landscapes provide a beautiful view of the mall area.",
    },
    {
      id: "amenity2",
      name: "Shops",
      subtitle: "Amenity",
      thumbnail: "thumbnails/amenities/f2.png",
      description: "A selection of fine shops.",
    },
  ],
};
