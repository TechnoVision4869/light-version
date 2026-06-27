// import { DEVELOPER_MIX as DEVELOPER } from "./project-mix";
// import { DEVELOPER_TBK as DEVELOPER, projectPath, config } from "./project-kog";
import { DEVELOPER_SOMABAY as DEVELOPER, projectPath, config  } from "./project-lighthouse";
// import { DEVELOPER_SOMABAY as DEVELOPER, projectPath, config  } from "./projectnpm -lightlight";
// import { DEVELOPER_SOMABAY as DEVELOPER, projectPath, config } from "./project-sandbox";
// import { DEVELOPER_SOMABAY as DEVELOPER, projectPath, config } from "./project-demo";
// import { DEVELOPER_TECHNO as DEVELOPER, projectPath, config } from "./kog-demo";

export const PATH = projectPath;
export const DATA = DEVELOPER;
export const CONFIG = config;

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
  BUILDING_FEATURE: "building_feature", // Tower features (amenities at building level)
  FLOOR: "floor",
  UNIT: "unit",
  INTERIOR: "interior",

  // SURROUNDINGS tab layers
  SURROUNDING_DETAIL: "surrounding_detail",

  // AMENITIES tab layers
  AMENITY_DETAIL: "amenity_detail",
};