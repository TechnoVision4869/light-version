import { PROJECT_MIX as PROJECT } from "./project-mix";

export const MODE_CONFIG = "videos";

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
      forwardVideo: `${MODE_CONFIG}/home/home_out.mp4`,
      reverseVideo: null,
      idleVideo: `/${MODE_CONFIG}/home/home_idle.mp4`,
    },
  },
  [TABS.ZONES]: {
    title: "Zoya Zones",
    videosPath: (isFromHome) => ({
      forwardVideo: isFromHome
        ? `/${MODE_CONFIG}/zones/zones_gen_trans.mp4`
        : `/${MODE_CONFIG}/home/home_out.mp4`,
      reverseVideo: `/${MODE_CONFIG}/zones/zones_gen_rev.mp4`,
      idleVideo: `/${MODE_CONFIG}/zones/zones_gen_idle.mp4`,
    }),

    getItems: () => PROJECT.zones,
    // Here, getItems returns array of all the zones,
    // used to map the zones to buttons
  },
  [TABS.SURROUNDINGS]: {
    title: "A Location Like No Other",
    description:
      "Zoya Ghazala Bays location was a decision meticulously made to achieve prime. An exclusive spot on the 142 kmAlex to Matrouh Road. It lies on Ghazala Bay's crystal clearshoreline.",

    videosPath: (isFromHome) => ({
      forwardVideo: isFromHome
        ? `/${MODE_CONFIG}/surroundings/surr_gen_trans_from_home.mp4`
        : `/${MODE_CONFIG}/surroundings/surr_out.mp4`,
      reverseVideo: `/${MODE_CONFIG}/surroundings/surr_gen_rev_trans_to_home.mp4`,
      idleVideo: `/${MODE_CONFIG}/surroundings/surr_idle.mp4`,
    }),

    getItems: () => PROJECT.surroundings,
  },
  [TABS.AMENITIES]: {
    title: "Amenities",

    videosPath: (isFromHome) => ({
      forwardVideo: isFromHome
        ? `/${MODE_CONFIG}/amenities/amenities_gen_trans_from_home.mp4`
        : `/${MODE_CONFIG}/amenities/amenities_out.mp4`,
      reverseVideo: `/${MODE_CONFIG}/amenities/amenities_gen_rev_trans_to_home.mp4`,
      idleVideo: `/${MODE_CONFIG}/amenities/amenities_gen_idle.mp4`,
    }),

    getItems: () => PROJECT.amenities,
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
    getData: (zoneId) => PROJECT.zones.find((z) => z.id === zoneId),
    // Here, getData returns the zone object with the given id
    // used to display the zone details
    getItems: (zone) => PROJECT.buildings.filter((b) => b.zoneId === zone.id),
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
    getData: (buildingId) => PROJECT.buildings.find((b) => b.id === buildingId),
    // Here, getData returns the building object with the given id
    // used to display the building details

    // here there's a potential bug if building id isn't unique
    // which is predictable, same for floors and units
    getItems: (building) => {
      const buildingId = building.id;
      const zoneId = building.zoneId;
      return PROJECT.floors.filter(
        (f) => f.buildingId === buildingId && f.zoneId === zoneId
      );
    },
    // Function to get video paths for a specific view of this building
    getVideosPathForView: (building, viewIndex) => {
      const buildingId = building.id;
      const zoneId = building.zoneId;
      const viewNum = viewIndex + 1; // Convert 0-based index to 1-based view number
      return {
        forwardVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/views/view${viewNum}/${zoneId}_${buildingId}_view${viewNum}_trans.mp4`,
        reverseVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/views/view${viewNum}/${zoneId}_${buildingId}_view${viewNum}_rev.mp4`,
        idleVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/views/view${viewNum}/${zoneId}_${buildingId}_view${viewNum}_idle.mp4`,
      };
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
      );
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
    getData: (amenityId) => PROJECT.amenities.find((a) => a.id === amenityId),
  },
};

// Raw data (separate from config)
// export const DATA = {
//   zones: [
//     {
//       id: "zone1",
//       displayName: "Towers",
//       subtitle: "Zone",
//       thumbnail: "thumbnails/zones/zone1.png",
//       description:
//         "Our towers hold different apartments options. They are at the center of the city.",
//     },
//     {
//       id: "zone2",
//       displayName: "Towers",
//       subtitle: "Zone",
//       thumbnail: "thumbnails/zones/zone2.png",
//       description:
//         "Our towers hold different apartments options. They are at the center of the city.",
//     },
//     // ... other zones
//   ],
//   buildings: [
//     {
//       id: "tower1",
//       zoneId: "zone1",
//       displayName: "Tower 1",
//       description: "Tower 1 description...",
//       x: 0.45, y: 0.53,
//     },
//     {
//       id: "tower2",
//       zoneId: "zone1",
//       displayName: "Tower 2",
//       description: "Tower 2 description...",
//       x: 0.65, y: 0.35,
//     },
//     {
//       id: "tower5",
//       zoneId: "zone2",
//       displayName: "Tower 5",
//       description: "Tower 5 description...",
//       x: 0.35, y: 0.12,
//     },
//   ],
//   floors: [
//     {
//       id: "floor1",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "Floor 1",
//       type: "Residential",
//       description: "First floor description...",
//       x: 0.25, y: 0.52,
//     },
//     {
//       id: "floor2",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "Floor 2",
//       type: "Residential",
//       description: "Second floor description...",
//       x: 0.25, y: 0.44,
//     },
//     {
//       id: "floor1",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "Floor 1",
//       type: "Residential",
//       description: "First floor description...",
//       x: 0.25, y: 0.58,
//     },
//     {
//       id: "floor2",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "Floor 2",
//       type: "Residential",
//       description: "Second floor description...",
//       x: 0.25, y: 0.5,
//     },
//   ],
//   apartments: [
//     // Zone 1 - Tower 1 - Floor 1
//     {
//       id: "apartment101",
//       floorId: "floor1",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "A101",
//       unitType: "Commercial",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 1,
//       serviceRooms: ["Hard Kitchen"],
//       area: 85, // Store as number for range queries
//       price: 250000, // Store as number for range queries
//       x: 0.40, y: 0.60,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment102",
//       floorId: "floor1",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "A102",
//       unitType: "Commercial",
//       description: "Beautiful 4-bedroom apartment...",
//       bedrooms: 4,
//       bathrooms: 2,
//       serviceRooms: ["Nanny's Room", "Hard Kitchen"],
//       area: 200,
//       price: 400000,
//       x: 0.25, y: 0.4,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "0", // must match the hotspot label
//                 image: "/panorama/0.jpg",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 0,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "100", // must match the room displayName
//                   },
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "100",
//                 image: "/panorama/100.jpg",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -160,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "0",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -6,
//                     pitch: -6,
//                     type: 'scene',
//                     label: "250",
//                   },
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "250",
//                 image: "/panorama/250.jpg",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -110,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "100",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -7,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "300",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "300",
//                 image: "/panorama/300.jpg",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -190,
//                     pitch: -12,
//                     type: 'scene',
//                     label: "250",
//                   },
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment103",
//       floorId: "floor1",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "A103",
//       unitType: "Commercial",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 2,
//       area: 120,
//       serviceRooms: ["Hard Kitchen"],
//       price: 300000,
//       x: 0.438, y: 0.3,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment104",
//       floorId: "floor1",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "A104",
//       unitType: "Commercial",
//       description: "Beautiful 3-bedroom apartment...",
//       bedrooms: 3,
//       bathrooms: 2,
//       area: 185,
//       serviceRooms: ["Hard Kitchen"],
//       price: 350000,
//       x: 0.65, y: 0.33,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment105",
//       floorId: "floor1",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "A105",
//       unitType: "Commercial",
//       description: "Beautiful 4-bedroom apartment...",
//       bedrooms: 4,
//       bathrooms: 2,
//       serviceRooms: ["Nanny's Room", "Hard Kitchen"],
//       area: 250,
//       price: 500000,
//       x: 0.7, y: 0.65,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     // Zone 1 - Tower 1 - Floor 2
//     {
//       id: "apartment201",
//       floorId: "floor2",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "A201",
//       unitType: "Residential",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 1,
//       serviceRooms: ["Hard Kitchen"],
//       area: 115,
//       price: 275000,
//       x: 0.4, y: 0.64,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment202",
//       floorId: "floor2",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "A202",
//       unitType: "Residential",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 2,
//       serviceRooms: ["Hard Kitchen"],
//       area: 125,
//       price: 300000,
//       x: 0.22, y: 0.55,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment203",
//       floorId: "floor2",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "A203",
//       unitType: "Residential",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 2,
//       serviceRooms: ["Hard Kitchen"],
//       area: 125,
//       price: 300000,
//       x: 0.225, y: 0.23,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment204",
//       floorId: "floor2",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "A204",
//       unitType: "Residential",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 2,
//       serviceRooms: ["Hard Kitchen"],
//       area: 115,
//       price: 275000,
//       x: 0.42, y: 0.25,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment205",
//       floorId: "floor2",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "A205",
//       unitType: "Residential",
//       description: "Beautiful 3-bedroom apartment...",
//       bedrooms: 3,
//       bathrooms: 2,
//       serviceRooms: ["Hard Kitchen"],
//       area: 145,
//       price: 325000,
//       x: 0.65, y: 0.25,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment206",
//       floorId: "floor2",
//       buildingId: "tower1",
//       zoneId: "zone1",
//       displayName: "A206",
//       unitType: "Residential",
//       description: "Beautiful 4-bedroom apartment...",
//       bedrooms: 4,
//       bathrooms: 2,
//       serviceRooms: ["Nanny's Room", "Hard Kitchen"],
//       area: 200,
//       price: 400000,
//       x: 0.67, y: 0.65,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     // Zone 1 - Tower 2 - Floor 1
//     {
//       id: "apartment111",
//       floorId: "floor1",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "A111",
//       unitType: "Commercial",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 1,
//       serviceRooms: ["Hard Kitchen"],
//       area: 140,
//       price: 260000,
//       x: 0.4, y: 0.58,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment112",
//       floorId: "floor1",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "A-112",
//       unitType: "Commercial",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 2,
//       serviceRooms: ["Hard Kitchen"],
//       area: 150,
//       price: 325000,
//       x: 0.21, y: 0.43,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment113",
//       floorId: "floor1",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "A113",
//       unitType: "Commercial",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 2,
//       serviceRooms: ["Hard Kitchen"],
//       area: 85,
//       price: 240000,
//       x: 0.23, y: 0.2,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment114",
//       floorId: "floor1",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "A114",
//       unitType: "Commercial",
//       description: "Beautiful 3-bedroom apartment...",
//       bedrooms: 3,
//       bathrooms: 2,
//       serviceRooms: ["Hard Kitchen"],
//       area: 185,
//       price: 375000,
//       x: 0.6, y: 0.25,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment115",
//       floorId: "floor1",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "A115",
//       unitType: "Commercial",
//       description: "Beautiful 4-bedroom apartment...",
//       bedrooms: 4,
//       bathrooms: 2,
//       serviceRooms: ["Nanny's Room", "Hard Kitchen"],
//       area: 220,
//       price: 450000,
//       x: 0.7, y: 0.65,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     // Zone 1 - Tower 2 - Floor 2
//     {
//       id: "apartment221",
//       floorId: "floor2",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "A221",
//       unitType: "Residential",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 1,
//       serviceRooms: ["Hard Kitchen"],
//       area: 185,
//       price: 275000,
//       x: 0.2, y: 0.4,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment222",
//       floorId: "floor2",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "A222",
//       unitType: "Residential",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 2,
//       serviceRooms: ["Hard Kitchen"],
//       area: 85,
//       price: 240000,
//       x: 0.24, y: 0.2,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment223",
//       floorId: "floor2",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "A223",
//       unitType: "Residential",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 2,
//       serviceRooms: ["Hard Kitchen"],
//       area: 125,
//       price: 300000,
//       x: 0.475, y: 0.24,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment224",
//       floorId: "floor2",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "A-224",
//       unitType: "Residential",
//       description: "Beautiful 2-bedroom apartment...",
//       bedrooms: 2,
//       bathrooms: 2,
//       serviceRooms: ["Hard Kitchen"],
//       area: 115,
//       price: 275000,
//       x: 0.715, y: 0.21,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//     {
//       id: "apartment225",
//       floorId: "floor2",
//       buildingId: "tower2",
//       zoneId: "zone1",
//       displayName: "A225",
//       description: "Beautiful 3-bedroom apartment...",
//       unitType: "Residential",
//       bedrooms: 3,
//       bathrooms: 2,
//       serviceRooms: ["Hard Kitchen"],
//       area: 145,
//       price: 325000,
//       x: 0.55, y: 0.5,
//       balconyView: "/panorama/balcony.jpg",
//       interior: {
//         floors: [
//           {
//             id: "floor1",
//             rooms: [
//               {
//                 id: "room1",
//                 displayName: "Livingroom", // must match the hotspot label
//                 image: "/panorama/livingroom.png",
//                 description: "A spacious livingroom where all the family can spend their time together.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: 25,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Bedroom", // must match the room displayName
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 25,
//                     pitch: 5,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 0,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Dinning and Kitchen",
//                   }
//                 ]
//               },
//               {
//                 id: "room2",
//                 displayName: "Dinning and Kitchen",
//                 image: "/panorama/dinning_kitchen.png",
//                 description: "A comfortable dinning room with a table and chairs.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -65,
//                     pitch: -25,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: 83,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Bedroom",
//                   },
//                   {
//                     id: 'spot3',
//                     yaw: 83,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room3",
//                 displayName: "Bedroom",
//                 image: "/panorama/bedroom.png",
//                 description: "A cozy bedroom with a comfortable bed and a wardrobe.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -105,
//                     pitch: -10,
//                     type: 'scene',
//                     label: "Livingroom",
//                   }
//                 ]
//               },
//               {
//                 id: "room4",
//                 displayName: "Master Bedroom",
//                 image: "/panorama/master_bedroom.png",
//                 description: "A luxurious master bedroom with a king-size bed and an ensuite bathroom.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -115,
//                     pitch: -5,
//                     type: 'scene',
//                     label: "Livingroom",
//                   },
//                   {
//                     id: 'spot2',
//                     yaw: -115,
//                     pitch: -15,
//                     type: 'scene',
//                     label: "Bathroom", //must match the room displayName
//                   }
//                 ]
//               },
//               {
//                 id: "room5",
//                 displayName: "Bathroom",
//                 image: "/panorama/bathroom.png",
//                 description: "A modern bathroom with all the necessary amenities.",
//                 hotspots: [
//                   {
//                     id: 'spot1',
//                     yaw: -3,
//                     pitch: 0,
//                     type: 'scene',
//                     label: "Master Bedroom",
//                   }
//                 ]
//               }
//             ]
//           }]
//       },
//       gallery: [
//         {
//           id: "gallery1",
//           src: "/images/v1.svg",
//         },
//         {
//           id: "gallery2",
//           src: "/images/v2.svg",
//         },
//         {
//           id: "gallery3",
//           src: "/images/v3.svg",
//         },
//         {
//           id: "gallery4",
//           src: "/images/v4.svg",
//         },
//       ],
//       cutSections: [
//         {
//           id: "cut1",
//           src: "/images/c1.png"
//         },
//         {
//           id: "cut2",
//           src: "/images/c2.png"
//         },
//         {
//           id: "cut3",
//           src: "/images/c3.png"
//         },
//         {
//           id: "cut4",
//           src: "/images/c4.png"
//         },
//       ],
//       paymentPlans: [
//         {
//           downPayment: 4999999,
//           monthly: 499999,
//           years: 8,
//         },
//         {
//           downPayment: 2999999,
//           monthly: 299999,
//           years: 20,
//         }
//       ],
//       floorPlans: [
//         {
//           id: "floor1",
//           src: "/images/fp1.png"
//         },
//       ]
//     },
//   ],

//   surroundings: [
//     {
//       id: "surrounding1",
//       displayName: "Cairo Airport",
//       iconSrc: AirportIcon,
//       thumbnail: "thumbnails/surroundings/cairo_airboart.jpg",
//       distance: "38 min | 55 km",
//       description:
//         "Cairo International Airport is the principal international airport of Cairo and the largest and busiest airport in Egypt. It serves as the primary hub for Egyptair and Nile Air as well as several other airlines.",
//       x: 0.75, y: 0.85,
//       points: [
//         START, // { x: 0.50, y: 0.51 }
//         { x: 0.555, y: 0.507 },
//         { x: 0.605, y: 0.495 },
//         { x: 0.618, y: 0.535 },
//         { x: 0.63, y: 0.563 },
//         { x: 0.65, y: 0.545},
//         { x: 0.665, y: 0.57 },
//         { x: 0.765, y: 0.855 },
//         { x: 0.755, y: 0.865 },
//       ]
//     },
//     {
//       id: "surrounding2",
//       displayName: "Gym",
//       iconSrc: MuscleIcon,
//       thumbnail: "thumbnails/surroundings/gym.jpg",
//       distance: "3 min | 1 km",
//       description: "A modern fully equipped gym that support strength, cardio and everyday wellness.",
//       x: 0.545, y: 0.56,
//       points: [
//         START, // { x: 0.50, y: 0.51 }
//         { x: 0.55, y: 0.51 },
//         { x: 0.55, y: 0.58 },
//         { x: 0.54, y: 0.585 },
//       ]
//     },
//     {
//       id: "surrounding3",
//       displayName: "Iconic Tower",
//       iconSrc: TowerIcon,
//       thumbnail: "thumbnails/surroundings/iconic_tower.jpg",
//       distance: "8 min | 5 km",
//       description: "An architectural landmark that defines the city skyline.",
//       x: 0.27, y: 0.43,
//       points: [
//         START, //{ x: 0.50, y: 0.51 }
//         { x: 0.455, y: 0.505 },
//         { x: 0.4, y: 0.495 },
//         { x: 0.34, y: 0.475 },
//         { x: 0.31, y: 0.47 },
//         { x: 0.292, y: 0.48 },
//       ]
//     },
//   ],
//   amenities: [
//     {
//       id: "amenity1",
//       displayName: "Landscapes",
//       subtitle: "Amenity",
//       thumbnail: "thumbnails/amenities/f1.png",
//       description:
//         "Modern landscapes provide a beautiful view of the mall area.",
//       x: 0.17, y: 0.69,
//     },
//     {
//       id: "amenity2",
//       displayName: "Shops",
//       subtitle: "Amenity",
//       thumbnail: "thumbnails/amenities/f2.png",
//       description: "A selection of fine shops.",
//       x: 0.32, y: 0.65,
//     },
//   ],
// };
