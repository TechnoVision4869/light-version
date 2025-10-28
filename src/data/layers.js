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
      forwardVideo: null,
      reverseVideo: null,
      idleVideo: `/${MODE_CONFIG}/home/home_idle.mp4`,
    },
  },
  [TABS.ZONES]: {
    title: "Zoya Zones",
    path: "/zones_zoom",

    videosPath: {
      forwardVideo: `/${MODE_CONFIG}/zones/general/zones_general_trans_from_home.mp4`,
      reverseVideo: `/${MODE_CONFIG}/zones/general/zones_general_rev_trans_to_home.mp4`,
      idleVideo: `/${MODE_CONFIG}/zones/general/zones_idle.mp4`,
    },

    getItems: () => DATA.zones,
    // Here, getItems returns array of all the zones,
    // used to map the zones to buttons
  },
  [TABS.SURROUNDINGS]: {
    title: "A Location Like No Other",
    path: "/surroundings_zoom",
    description:
      "Zoya Ghazala Bays location was a decision meticulously made to achieve prime. An exclusive spot on the 142 kmAlex to Matrouh Road. It lies on Ghazala Bay's crystal clearshoreline.",

    videosPath: {
      forwardVideo: `/${MODE_CONFIG}/surroundings/surr_gen_trans_from_home.mp4`,
      reverseVideo: `/${MODE_CONFIG}/surroundings/surr_gen_rev_trans_to_home.mp4`,
      idleVideo: `/${MODE_CONFIG}/surroundings/surr_idle.mp4`,
    },

    getItems: () => DATA.surroundings,
  },
  [TABS.AMENITIES]: {
    title: "Amenities",
    path: "/amenities_zoom",

    videosPath: {
      forwardVideo: `/${MODE_CONFIG}/amenities/amenities_gen_trans_from_home.mp4`,
      reverseVideo: `/${MODE_CONFIG}/amenities/amenities_gen_rev_trans_to_home.mp4`,
      idleVideo: `/${MODE_CONFIG}/amenities/amenities_gen_idle.mp4`,
    },

    getItems: () => DATA.amenities,
  },
};

// Layer configurations (detail views)
export const LAYER_CONFIG = {
  [LAYERS.ZONE_DETAIL]: {
    path: (zoneId) => `/${zoneId}_zoom`,
    videosPath: (zoneId) => ({
      forwardVideo: `/${MODE_CONFIG}/zones/${zoneId}/general/${zoneId}_gen_trans.mp4`,
      reverseVideo: `/${MODE_CONFIG}/zones/${zoneId}/general/${zoneId}_gen_rev_trans.mp4`,
      idleVideo: `/${MODE_CONFIG}/zones/${zoneId}/general/${zoneId}_gen_idle.mp4`,
    }),
    getData: (zoneId) => DATA.buildings.map((b) => b.zoneId === zoneId),
    // Here, getData returns the zone object with the given id
    // used to display the zone details
  },
  [LAYERS.BUILDING]: {
    videosPath: (zoneId, buildingId) => ({
      forwardVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/${zoneId}_${buildingId}_gen_trans.mp4`,
      reverseVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/${zoneId}_${buildingId}_gen_rev_trans.mp4`,
      idleVideo: `/${MODE_CONFIG}/zones/${zoneId}/${buildingId}/views/view1/${zoneId}_${buildingId}_view1_idle.mp4`,
    }),
    getData: (buildingId) => DATA.buildings.find((b) => b.id === buildingId),
    // Here, getData returns the building object with the given id
    // used to display the building details
  },
  [LAYERS.SURROUNDING_DETAIL]: {
    path: (surroundingId) => `/${surroundingId}_zoom`,
    getData: (surroundingId) =>
      DATA.surroundings.find((s) => s.id === surroundingId),
  },
  [LAYERS.AMENITY_DETAIL]: {
    path: (amenityId) => `/${amenityId}_zoom`,
    videosPath: (amenityId) => ({
      forwardVideo: `/${MODE_CONFIG}/amenities/${amenityId}/${amenityId}_trans.mp4`,
      reverseVideo: `/${MODE_CONFIG}/amenities/${amenityId}/${amenityId}_rev_trans.mp4`,
      idleVideo: `/${MODE_CONFIG}/amenities/${amenityId}/${amenityId}_idle.mp4`,
    }),
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
      buildings: [
        {
          id: "tower1",
          name: "Tower 1",
          description: 'Tower 1 description...',
          floors: [
            {
              id: 'building1_floor1', // Unique ID combining parent IDs
              name: 'Floor 1',
              type: "Residential",
              description: 'First floor description...',
              apartments: [
                {
                  id: 'building1_floor1_apartment101', // Unique ID combining parent IDs
                  name: 'Apartment 101',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 1,
                  area: '85 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building1_floor1_apartment102', // Unique ID combining parent IDs
                  name: 'Apartment 102',
                  description: 'Beautiful 4-bedroom apartment...',
                  bedrooms: 4,
                  bathrooms: 2,
                  area: '200 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building1_floor1_apartment103', // Unique ID combining parent IDs
                  name: 'Apartment 103',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 2,
                  area: '120 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building1_floor1_apartment104', // Unique ID combining parent IDs
                  name: 'Apartment 104',
                  description: 'Beautiful 3-bedroom apartment...',
                  bedrooms: 3,
                  bathrooms: 2,
                  area: '185 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building1_floor1_apartment105', // Unique ID combining parent IDs
                  name: 'Apartment 105',
                  description: 'Beautiful 4-bedroom apartment...',
                  bedrooms: 4,
                  bathrooms: 2,
                  area: '250 m²',
                  price: '$$$,$$$'
                },
              ]
            },
            {
              id: 'building1_floor2', // Unique ID combining parent IDs
              name: 'Floor 2',
              type: "Residential",
              description: 'Second floor description...',
              apartments: [
                {
                  id: 'building1_floor2_apartment201', // Unique ID combining parent IDs
                  name: 'Apartment 201',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 1,
                  area: '115 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building1_floor2_apartment202', // Unique ID combining parent IDs
                  name: 'Apartment 202',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 2,
                  area: '125 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building1_floor2_apartment203', // Unique ID combining parent IDs
                  name: 'Apartment 203',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 2,
                  area: '125 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building1_floor2_apartment204', // Unique ID combining parent IDs
                  name: 'Apartment 204',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 2,
                  area: '115 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building1_floor2_apartment205', // Unique ID combining parent IDs
                  name: 'Apartment 205',
                  description: 'Beautiful 3-bedroom apartment...',
                  bedrooms: 3,
                  bathrooms: 2,
                  area: '145 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building1_floor2_apartment206', // Unique ID combining parent IDs
                  name: 'Apartment 206',
                  description: 'Beautiful 4-bedroom apartment...',
                  bedrooms: 4,
                  bathrooms: 2,
                  area: '200 m²',
                  price: '$$$,$$$'
                },
              ]
            },

          ]
        },
        {
          id: "tower2",
          name: "Tower 2",
          description: 'Tower 2 description...',
          floors: [
            {
              id: 'building2_floor1', // Unique ID combining parent IDs
              name: 'Floor 1',
              type: "Residential",
              description: 'First floor description...',
              apartments: [
                {
                  id: 'building2_floor1_apartment111', // Unique ID combining parent IDs
                  name: 'Apartment 111',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 1,
                  area: '100 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building2_floor1_apartment112', // Unique ID combining parent IDs
                  name: 'Apartment 112',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 2,
                  area: '150 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building2_floor1_apartment113', // Unique ID combining parent IDs
                  name: 'Apartment 113',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 2,
                  area: '85 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building2_floor1_apartment114', // Unique ID combining parent IDs
                  name: 'Apartment 114',
                  description: 'Beautiful 3-bedroom apartment...',
                  bedrooms: 3,
                  bathrooms: 2,
                  area: '185 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building2_floor1_apartment115', // Unique ID combining parent IDs
                  name: 'Apartment 115',
                  description: 'Beautiful 4-bedroom apartment...',
                  bedrooms: 4,
                  bathrooms: 2,
                  area: '220 m²',
                  price: '$$$,$$$'
                },
              ]
            },
            {
              id: 'building2_floor2', // Unique ID combining parent IDs
              name: 'Floor 2',
              type: "Residential",
              description: 'Second floor description...',
              apartments: [
                {
                  id: 'building2_floor2_apartment221', // Unique ID combining parent IDs
                  name: 'Apartment 221',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 1,
                  area: '115 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building2_floor2_apartment222', // Unique ID combining parent IDs
                  name: 'Apartment 222',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 2,
                  area: '85 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building2_floor2_apartment223', // Unique ID combining parent IDs
                  name: 'Apartment 223',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 2,
                  area: '125 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building2_floor2_apartment224', // Unique ID combining parent IDs
                  name: 'Apartment 224',
                  description: 'Beautiful 2-bedroom apartment...',
                  bedrooms: 2,
                  bathrooms: 2,
                  area: '115 m²',
                  price: '$$$,$$$'
                },
                {
                  id: 'building2_floor2_apartment225', // Unique ID combining parent IDs
                  name: 'Apartment 225',
                  description: 'Beautiful 3-bedroom apartment...',
                  bedrooms: 3,
                  bathrooms: 2,
                  area: '145 m²',
                  price: '$$$,$$$'
                },
              ]
            },

          ]
        }
      ]
    },
    {
      id: "zone2",
      name: "Towers",
      subtitle: "Zone",
      thumbnail: "thumbnails/zones/zone2.png",
      description:
        "Our towers hold different apartments options. They are at the center of the city.",
      buildings: [{
        id: "tower5",
        name: "Tower 5",
        description: 'Tower 5 description...',
        floors: [],

      }]
    },
    // ... other zones
  ],
  surroundings: [
    {
      id: 'surrounding1',
      name: 'Cairo Airport',
      distance: '15 KM',
      thumbnail: 'thumbnails/cairo_airboart.jpg',
      description: 'Cairo International Airport...',
    },
    {
      id: 'surrounding2',
      name: 'GYM',
      distance: '1 KM',
      thumbnail: 'thumbnails/gym.jpg',
      description: 'Gym...',
    },
    {
      id: 'surrounding3',
      name: 'Iconic Tower',
      distance: '3 KM',
      thumbnail: 'thumbnails/iconic_tower.jpg',
      description: 'Iconic tower...',
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

