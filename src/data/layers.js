export const MODE = {
  VIDEO: 'videos',
  SEQUENCE: 'sequences',
};
export const MODE_CONFIG = MODE.SEQUENCE;

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
  },
  [TABS.ZONES]: {
    path: '/zones_zoom',
    title: "Zoya Zones",
    getItems: () => DATA.zones
    // Here, getItems returns array of all the zones,
    // used to map the zones to buttons
  },
  [TABS.SURROUNDINGS]: {
    path: '/surroundings_zoom',
    title: "A Location Like No Other",
    description: "Zoya Ghazala Bays location was a decision meticulously made to achieve prime. An exclusive spot on the 142 kmAlex to Matrouh Road. It lies on Ghazala Bay's crystal clearshoreline.",
    getItems: () => DATA.surroundings
  },
  [TABS.AMENITIES]: {
    path: '/amenities_zoom',
    title: "Amenities",
    getItems: () => DATA.amenities
  }
};

// Layer configurations (detail views)
export const LAYER_CONFIG = {
  [LAYERS.ZONE_DETAIL]: {
    path: (zoneId) => `/${zoneId}_zoom`,
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
      thumbnail: 'thumbnails/zone1_thumbnail.jpg',
      description: 'Our towers hold different apartments options. They are at the center of the city.'
    }
    // ... other zones
  ],
  surroundings: [
    {
      id: 'surrounding1',
      name: 'Cairo Airport',
      distance: '2 KM',
      thumbnail: 'thumbnails/surrounding1_thumbnail.jpg',
      description: 'Cairo International Airport...',
    }
  ],
  amenities: [
    {
      id: 'amenity1',
      name: 'Landscapes',
      subtitle: 'Amenity',
      thumbnail: 'thumbnails/amenity1_thumbnail.jpg',
      description: 'Modern landscapes provide a beautiful view of the mall area.'
    },
    {
      id: 'amenity2',
      name: 'Shops',
      subtitle: 'Amenity',
      thumbnail: 'thumbnails/amenity2_thumbnail.jpg',
      description: 'A selection of fine shops.'
    }
  ]
};