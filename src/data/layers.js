export const MODE = {
  VIDEO: 'videos',
  SEQUENCE: 'sequences',
};
export const MODE_CONFIG = MODE.VIDEO;

// Navigation Tabs (top-level categories)
export const TABS = {
  HOME: 'home',
  SURROUNDINGS: 'surroundings',
  AMENITIES: 'amenities',
  ZONES: 'zones',
}

// Content Layers (hierarchy within tabs)
export const LAYERS = {
  // ZONES tab layers
  ZONE_DETAIL: 'zone_detail',
  BUILDING: 'building',
  APARTMENT: 'apartment',
  INTERIOR: 'interior',

  // SURROUNDINGS tab layers  
  SURROUNDING_DETAIL: 'surrounding_detail',

  // AMENITIES tab layers
  AMENITY_DETAIL: 'amenity_detail'
};

// Tab configurations (main views)
export const TAB_CONFIG = {
  [TABS.HOME]: {
    path: '/home.jpg', // Static image
    videosPath: {
      forwardVideo: null,
      reverseVideo: null,
      idleVideo: `/${MODE_CONFIG}/home/home_idle.mp4`,
    }
  },
  [TABS.ZONES]: {
    title: "Zoya Zones",
    path: '/zones_zoom',

    videosPath: {
      forwardVideo: `/${MODE_CONFIG}/zones/general/zones_general_trans_from_home.mp4`,
      reverseVideo: `/${MODE_CONFIG}/zones/general/zones_general_rev_trans_to_home.mp4`,
      idleVideo: `/${MODE_CONFIG}/zones/general/zones_idle.mp4`,
    },

    getItems: () => DATA.zones
    // Here, getItems returns array of all the zones,
    // used to map the zones to buttons
  },
  [TABS.SURROUNDINGS]: {
    title: "A Location Like No Other",
    path: '/surroundings_zoom',
    description: "Zoya Ghazala Bays location was a decision meticulously made to achieve prime. An exclusive spot on the 142 kmAlex to Matrouh Road. It lies on Ghazala Bay's crystal clearshoreline.",

    videosPath: {
      forwardVideo: `/${MODE_CONFIG}/surroundings/surr_gen_trans_from_home.mp4`,
      reverseVideo: `/${MODE_CONFIG}/surroundings/surr_gen_rev_trans_to_home.mp4`,
      idleVideo: `/${MODE_CONFIG}/surroundings/surr_idle.mp4`,
    },

    getItems: () => DATA.surroundings
  },
  [TABS.AMENITIES]: {
    title: "Amenities",
    path: '/amenities_zoom',

    videosPath: {
      forwardVideo: `/${MODE_CONFIG}/amenities/amenities_gen_trans_from_home.mp4`,
      reverseVideo: `/${MODE_CONFIG}/amenities/amenities_gen_rev_trans_to_home.mp4`,
      idleVideo: `/${MODE_CONFIG}/amenities/amenities_gen_idle.mp4`,
    },

    getItems: () => DATA.amenities
  }
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
    getData: (zoneId) => DATA.zones.find(z => z.id === zoneId)
    // Here, getData returns the zone object with the given id
    // used to display the zone details
  },
  [LAYERS.SURROUNDING_DETAIL]: {
    path: (surroundingId) => `/${surroundingId}_zoom`,
    getData: (surroundingId) => DATA.surroundings.find(s => s.id === surroundingId)
  },
  [LAYERS.AMENITY_DETAIL]: {
    path: (amenityId) => `/${amenityId}_zoom`,
    videosPath: (amenityId) => ({
      forwardVideo: `/${MODE_CONFIG}/amenities/${amenityId}/${amenityId}_trans.mp4`,
      reverseVideo: `/${MODE_CONFIG}/amenities/${amenityId}/${amenityId}_rev_trans.mp4`,
      idleVideo: `/${MODE_CONFIG}/amenities/${amenityId}/${amenityId}_idle.mp4`,
    }),
    getData: (amenityId) => DATA.amenities.find(a => a.id === amenityId)
  }
};

// Raw data (separate from config)
export const DATA = {
  zones: [
    {
      id: 'zone1',
      name: 'Towers',
      subtitle: 'Zone',
      thumbnail: 'thumbnails/zones/zone1.png',
      description: 'Our towers hold different apartments options. They are at the center of the city.'
    },
    {
      id: 'zone2',
      name: 'Towers',
      subtitle: 'Zone',
      thumbnail: 'thumbnails/zones/zone2.png',
      description: 'Our towers hold different apartments options. They are at the center of the city.'
    }
    // ... other zones
  ],
  surroundings: [
    // {
    //   id: 'surrounding1',
    //   name: 'Cairo Airport',
    //   distance: '2 KM',
    //   thumbnail: 'thumbnails/surrounding1_thumbnail.jpg',
    //   description: 'Cairo International Airport...',
    // }
  ],
  amenities: [
    {
      id: 'amenity1',
      name: 'Landscapes',
      subtitle: 'Amenity',
      thumbnail: 'thumbnails/amenities/f1.png',
      description: 'Modern landscapes provide a beautiful view of the mall area.'
    },
    {
      id: 'amenity2',
      name: 'Shops',
      subtitle: 'Amenity',
      thumbnail: 'thumbnails/amenities/f2.png',
      description: 'A selection of fine shops.'
    }
  ]
};