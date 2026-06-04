import { CONFIG } from "../data/layers";

export const APP_CONFIG = {
  // Set to true to use static data, false to use API
  USE_STATIC: true,
  USE_PREDEFINED_POS: CONFIG.USE_PREDEFINED_POS,
  // Set to true to use panorama hotspots for unit interior, false for single room-interior popup
  USE_HOTSPOTS: CONFIG.USE_HOTSPOTS,
};
