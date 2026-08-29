import { CONFIG } from "../data/layers";

// Rotation applied to floor plan images in the generated unit brochure PDF (degrees,
// clockwise). One setting applies to every floor plan image across all units/unit types —
// per-image rotation isn't supported yet.
export const FLOOR_PLAN_ROTATION = {
  NONE: 0,
  RIGHT: 90,
  LEFT: -90,
};

// Which cached video ReloadLoadingSplash shows while a hard reload of /home is
// re-fetching/re-enriching the project. "idle" = the project's Home idle loop (the exact
// state Home settles into, so the handoff is seamless). "intro" = the project's intro/zoomout
// video shown during the normal selection→Home flow. If the chosen one isn't cached yet
// (e.g. never loaded before), ReloadLoadingSplash falls back to whichever is cached.
export const RELOAD_PLACEHOLDER_SOURCE = {
  IDLE: "idle",
  INTRO: "intro",
};

export const APP_CONFIG = {
  // Set to true to use static data, false to use API
  USE_STATIC: false,
  USE_PREDEFINED_POS: CONFIG.USE_PREDEFINED_POS,
  PREDEFINED_POS: CONFIG.PREDEFINED_POS || { x: 0.5, y: 0.5 }, // Centered by default
  // Set to true to use panorama hotspots for unit interior, false for single room-interior popup
  USE_HOTSPOTS: CONFIG.USE_HOTSPOTS,
  // Max viewport width (px) treated as "tablet" for the web landscape prompt / immersive mode
  TABLET_MAX_WIDTH: 1366,
  // One of FLOOR_PLAN_ROTATION's values
  FLOOR_PLAN_ROTATION_DEG: FLOOR_PLAN_ROTATION.NONE,
  // One of RELOAD_PLACEHOLDER_SOURCE's values
  RELOAD_PLACEHOLDER_SOURCE: RELOAD_PLACEHOLDER_SOURCE.INTRO,
};
