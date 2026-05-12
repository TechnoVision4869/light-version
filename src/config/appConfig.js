// Application configuration
export const ASSET_TYPES = {
  IMAGE: "image",
  VIDEO: "video",
};

export const APP_CONFIG = {
  // Set to true to use static data, false to use API
  USE_STATIC: false,
  USE_PREDEFINED_POS: true,
  IDLE_TYPE: ASSET_TYPES.IMAGE,
  // Set to true to use panorama hotspots for unit interior, false for single room-interior popup
  USE_HOTSPOTS: false,
};
