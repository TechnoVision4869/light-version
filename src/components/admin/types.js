/**
 * Admin dashboard entity types and state shapes.
 * Aligns with backend entities and UML (amenities).
 * AssetType matches backend AssetType enum (asset.entity.ts).
 */

export const ENTITY_TYPES = {
  DEVELOPER: "developer",
  PROJECT: "project",
  ZONE: "zone",
  PROPERTY: "property",
  FLOOR: "floor",
  BLOCK: "block",
  UNIT: "unit",
  UNIT_TYPE: "unitType",
  AMENITY: "amenity",
  SURROUNDING: "surrounding",
  ASSET: "asset",
};

export const PROPERTY_TYPES = {
  VILLA: "VILLA",
  TOWNHOUSE: "TOWNHOUSE",
  TOWER: "TOWER",
};

/** Matches backend AssetType enum (lowercase). Use for API and filtering. */
export const AssetType = {
  VIDEO: "video",
  IMAGE: "image",
  THUMBNAIL: "thumbnail",
  PANORAMA: "panorama",
};

export const ASSET_TYPES = Object.values(AssetType);

export const defaultSelectedNode = {
  entityType: ENTITY_TYPES.DEVELOPER,
  entityId: null,
  parentIds: {
    developerId: null,
    projectId: null,
    zoneId: null,
    propertyId: null,
    floorId: null,
    blockId: null,
  },
};
