import * as yup from "yup";
import { amenityApi } from "../../api/admin/amenityApi";
import { developerApi } from "../../api/admin/developerApi";
import { floorApi } from "../../api/admin/floorApi";
import { projectApi } from "../../api/admin/projectApi";
import { propertyApi } from "../../api/admin/propertyApi";
import { surroundingApi } from "../../api/admin/surroundingApi";
import { unitApi } from "../../api/admin/unitApi";
import { unitTypeApi } from "../../api/admin/unitTypeApi";
import { zoneApi } from "../../api/admin/zoneApi";
import { blockApi } from "../../api/admin/blockApi";
import { ENTITY_TYPES, PROPERTY_TYPES, AssetType } from "./types";

/** Field control types for UI */
export const CONTROL_TYPES = {
  TEXT: "text",
  TEXTAREA: "textarea",
  NUMBER: "number",
  SELECT: "select",
  ASSET: "asset",
  READONLY: "readonly",
};

/** Helper: standard name field */
function nameField(required = true) {
  return {
    name: "name",
    label: "Name",
    control: CONTROL_TYPES.TEXT,
    required,
    disabled: false,
  };
}
/** Helper: id field (readonly, for parent reference) */
function idField(key, label, required = true) {
  return {
    name: key,
    label: label || key,
    control: CONTROL_TYPES.READONLY,
    required,
    disabled: true,
  };
}
/** Helper: asset field (picker-only) */
function assetField(name, label, allowedTypes) {
  return {
    name,
    label,
    control: CONTROL_TYPES.ASSET,
    required: false,
    disabled: false,
    allowedTypes: Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes],
  };
}

export const resourceConfigs = {
  [ENTITY_TYPES.DEVELOPER]: {
    title: "Developer",
    api: developerApi,
    schema: yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().nullable(),
      logoAssetId: yup.string().nullable(),
      backgroundImageAssetId: yup.string().nullable(),
      isActive: yup.boolean().nullable(),
    }),
    fields: [
      nameField(),
      {
        name: "email",
        label: "Email",
        control: CONTROL_TYPES.TEXT,
        required: false,
        disabled: false,
      },
      assetField("logoAssetId", "Logo", [AssetType.IMAGE, AssetType.THUMBNAIL]),
      assetField("backgroundImageAssetId", "Background Image", [
        AssetType.IMAGE,
      ]),
      {
        name: "isActive",
        label: "Active",
        control: CONTROL_TYPES.SELECT,
        required: false,
        disabled: false,
        options: [
          { value: true, label: "Active" },
          { value: false, label: "Inactive" },
        ],
      },
    ],
    childTypes: [ENTITY_TYPES.PROJECT],
  },
  [ENTITY_TYPES.PROJECT]: {
    title: "Project",
    api: projectApi,
    schema: yup.object().shape({
      name: yup.string().required(),
      developerId: yup.string().required(),
      introAssetId: yup.string().nullable(),
      idleAssetId: yup.string().nullable(),
      zoomoutAssetId: yup.string().nullable(),
    }),
    fields: [
      nameField(),
      idField("developerId", "Developer ID"),
      assetField("introAssetId", "Intro Video", [AssetType.VIDEO]),
      assetField("idleAssetId", "Idle Video", [AssetType.VIDEO]),
      assetField("zoomoutAssetId", "Zoom-out Video", [AssetType.VIDEO]),
    ],
    childTypes: [], // Zones, Amenities, Surroundings are under folder nodes
  },
  [ENTITY_TYPES.ZONE]: {
    title: "Zone",
    api: zoneApi,
    schema: yup.object().shape({
      name: yup.string().required(),
      projectId: yup.string().required(),
      subtitle: yup.string(),
      description: yup.string(),
      x: yup.number().nullable(),
      y: yup.number().nullable(),
      thumbnailAssetId: yup.string().nullable(),
      highlightAssetId: yup.string().nullable(),
      forwardAssetId: yup.string().nullable(),
      reverseAssetId: yup.string().nullable(),
      sideAssetId: yup.string().nullable(),
      zoomoutAssetId: yup.string().nullable(),
    }),
    fields: [
      nameField(),
      idField("projectId", "Project ID"),
      {
        name: "subtitle",
        label: "Subtitle",
        control: CONTROL_TYPES.TEXT,
        required: false,
        disabled: false,
      },
      {
        name: "description",
        label: "Description",
        control: CONTROL_TYPES.TEXTAREA,
        required: false,
        disabled: false,
      },
      {
        name: "x",
        label: "X",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      {
        name: "y",
        label: "Y",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      assetField("thumbnailAssetId", "Thumbnail", [
        AssetType.IMAGE,
        AssetType.THUMBNAIL,
      ]),
      assetField("highlightAssetId", "Highlight", [
        AssetType.IMAGE,
        AssetType.VIDEO,
        AssetType.THUMBNAIL,
        AssetType.PANORAMA,
      ]),
      assetField("forwardAssetId", "Forward", [
        AssetType.VIDEO,
        AssetType.PANORAMA,
      ]),
      assetField("reverseAssetId", "Reverse", [
        AssetType.VIDEO,
        AssetType.PANORAMA,
      ]),
      assetField("sideAssetId", "Side", [AssetType.VIDEO, AssetType.PANORAMA]),
      assetField("zoomoutAssetId", "Zoom-out", [AssetType.VIDEO]),
    ],
    childTypes: [ENTITY_TYPES.PROPERTY],
  },
  [ENTITY_TYPES.PROPERTY]: {
    title: "Property",
    api: propertyApi,
    schema: yup.object().shape({
      name: yup.string().required(),
      type: yup.string().oneOf(Object.values(PROPERTY_TYPES)).required(),
      zoneId: yup.string().required(),
      description: yup.string(),
      x: yup.number().nullable(),
      y: yup.number().nullable(),
      highlightAssetId: yup.string().nullable(),
      forwardAssetId: yup.string().nullable(),
      reverseAssetId: yup.string().nullable(),
      sideAssetId: yup.string().nullable(),
    }),
    fields: [
      nameField(),
      {
        name: "type",
        label: "Type",
        control: CONTROL_TYPES.SELECT,
        required: true,
        disabled: false,
        options: Object.values(PROPERTY_TYPES),
      },
      idField("zoneId", "Zone ID"),
      {
        name: "description",
        label: "Description",
        control: CONTROL_TYPES.TEXTAREA,
        required: false,
        disabled: false,
      },
      {
        name: "x",
        label: "X",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      {
        name: "y",
        label: "Y",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      assetField("highlightAssetId", "Highlight", [
        AssetType.IMAGE,
        AssetType.VIDEO,
        AssetType.THUMBNAIL,
        AssetType.PANORAMA,
      ]),
      assetField("forwardAssetId", "Forward", [
        AssetType.VIDEO,
        AssetType.PANORAMA,
      ]),
      assetField("reverseAssetId", "Reverse", [
        AssetType.VIDEO,
        AssetType.PANORAMA,
      ]),
      assetField("sideAssetId", "Side", [AssetType.VIDEO, AssetType.PANORAMA]),
    ],
    childTypes: (node) => {
      const pType = node?.data?.type || node?.data?.propertyType;
      if (pType === PROPERTY_TYPES.VILLA) return [ENTITY_TYPES.UNIT];
      if (pType === PROPERTY_TYPES.TOWNHOUSE) return [ENTITY_TYPES.BLOCK];
      if (pType === PROPERTY_TYPES.TOWER) return [ENTITY_TYPES.FLOOR];
      return [];
    },
  },
  [ENTITY_TYPES.FLOOR]: {
    title: "Floor",
    api: floorApi,
    schema: yup.object().shape({
      floorNumber: yup.number().integer().required(),
      propertyId: yup.string().required(),
    }),
    fields: [
      {
        name: "floorNumber",
        label: "Floor Number",
        control: CONTROL_TYPES.NUMBER,
        required: true,
        disabled: false,
      },
      idField("propertyId", "Property ID"),
    ],
    childTypes: [ENTITY_TYPES.UNIT],
    /** Floor may only be created when parent property type is TOWER */
    canCreateChild: (parentNode) =>
      (parentNode?.data?.type || parentNode?.data?.propertyType) ===
      PROPERTY_TYPES.TOWER,
  },
  [ENTITY_TYPES.BLOCK]: {
    title: "Block",
    api: blockApi,
    schema: yup.object().shape({
      displayName: yup.string().required(),
      propertyId: yup.string().required(),
      x: yup.number().nullable(),
      y: yup.number().nullable(),
    }),
    fields: [
      {
        name: "displayName",
        label: "Display Name",
        control: CONTROL_TYPES.TEXT,
        required: true,
        disabled: false,
      },
      idField("propertyId", "Property ID"),
      {
        name: "x",
        label: "X",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      {
        name: "y",
        label: "Y",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
    ],
    childTypes: [ENTITY_TYPES.UNIT],
    /** Block may only be created when parent property type is TOWNHOUSE */
    canCreateChild: (parentNode) =>
      (parentNode?.data?.type || parentNode?.data?.propertyType) ===
      PROPERTY_TYPES.TOWNHOUSE,
  },
  [ENTITY_TYPES.UNIT_TYPE]: {
    title: "Unit Type",
    api: unitTypeApi,
    schema: yup.object().shape({
      name: yup.string().required(),
      projectId: yup.string().required(),
      bedrooms: yup.number().integer().nullable(),
      bathrooms: yup.number().integer().nullable(),
      serviceRoomNames: yup.array().of(yup.string()).nullable(),
      area: yup.number().nullable(),
      gallery: yup.array().of(yup.string()).nullable(),
      cutSections: yup.array().of(yup.string()).nullable(),
      floorPlans: yup.array().of(yup.string()).nullable(),
      paymentPlans: yup.array().nullable(),
    }),
    fields: [
      nameField(),
      idField("projectId", "Project ID"),
      {
        name: "bedrooms",
        label: "Bedrooms",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      {
        name: "bathrooms",
        label: "Bathrooms",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      {
        name: "area",
        label: "Area (m²)",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      {
        name: "serviceRoomNames",
        label: "Service room names (comma-separated)",
        control: CONTROL_TYPES.TEXT,
        required: false,
        disabled: false,
      },
    ],
    childTypes: [],
  },
  [ENTITY_TYPES.UNIT]: {
    title: "Unit",
    api: unitApi,
    schema: yup.object().shape({
      unitCode: yup.string().required(),
      visualTypeId: yup.string().nullable(),
      propertyId: yup.string().required(),
      floorId: yup.string().nullable(),
      blockId: yup.string().nullable(),
      balconyAssetId: yup.string().nullable(),
      forwardAssetId: yup.string().nullable(),
      reverseAssetId: yup.string().nullable(),
      sideAssetId: yup.string().nullable(),
      displayName: yup.string().nullable(),
      unitTypeId: yup.string().nullable(),
      price: yup.number().nullable(),
      area: yup.number().nullable(),
      bedrooms: yup.number().integer().nullable(),
      bathrooms: yup.number().integer().nullable(),
      balconyView: yup.string().nullable(),
      x: yup.number().nullable(),
      y: yup.number().nullable(),
    }),
    fields: [
      { name: "unitCode", label: "Unit Code", control: CONTROL_TYPES.TEXT, required: true, disabled: false },
      { name: "visualTypeId", label: "Visual Type", control: CONTROL_TYPES.TEXT, required: false, disabled: false },
      idField("propertyId", "Property ID"),
      { name: "floorId", label: "Floor ID", control: CONTROL_TYPES.READONLY, required: false, disabled: true },
      { name: "blockId", label: "Block ID", control: CONTROL_TYPES.READONLY, required: false, disabled: true },
      assetField("balconyAssetId", "Balcony", [AssetType.IMAGE, AssetType.VIDEO, AssetType.PANORAMA]),
      assetField("forwardAssetId", "Forward", [AssetType.VIDEO, AssetType.PANORAMA]),
      assetField("reverseAssetId", "Reverse", [AssetType.VIDEO, AssetType.PANORAMA]),
      assetField("sideAssetId", "Side", [AssetType.VIDEO, AssetType.PANORAMA]),
      { name: "displayName", label: "Display Name", control: CONTROL_TYPES.TEXT, required: false, disabled: false },
      {
        name: "unitTypeId",
        label: "Unit Type",
        control: CONTROL_TYPES.SELECT,
        required: false,
        disabled: false,
        optionsFromApi: "unitType",
      },
      { name: "price", label: "Price", control: CONTROL_TYPES.NUMBER, required: false, disabled: false },
      { name: "area", label: "Area", control: CONTROL_TYPES.NUMBER, required: false, disabled: false },
      { name: "bedrooms", label: "Bedrooms", control: CONTROL_TYPES.NUMBER, required: false, disabled: false },
      { name: "bathrooms", label: "Bathrooms", control: CONTROL_TYPES.NUMBER, required: false, disabled: false },
      { name: "balconyView", label: "Balcony View", control: CONTROL_TYPES.TEXT, required: false, disabled: false },
      { name: "x", label: "X", control: CONTROL_TYPES.NUMBER, required: false, disabled: false },
      { name: "y", label: "Y", control: CONTROL_TYPES.NUMBER, required: false, disabled: false },
    ],
    childTypes: [],
    /**
     * Validate unit payload against property type.
     * context: { selectedNode, nodes, parentProperty? } — parentProperty must be set by caller for UNIT.
     */
    validate(payload, context) {
      const prop = context?.parentProperty;
      const pType = prop?.type || prop?.propertyType;

      if (pType === PROPERTY_TYPES.VILLA) {
        if (
          payload.floorId != null &&
          payload.floorId !== "" &&
          payload.floorId !== undefined
        ) {
          throw new Error("Villa units cannot have a floor. Clear Floor.");
        }
        if (
          payload.blockId != null &&
          payload.blockId !== "" &&
          payload.blockId !== undefined
        ) {
          throw new Error("Villa units cannot have a block. Clear Block.");
        }
      } else if (pType === PROPERTY_TYPES.TOWER) {
        if (
          payload.blockId != null &&
          payload.blockId !== "" &&
          payload.blockId !== undefined
        ) {
          throw new Error("Tower units must not have a block. Clear Block.");
        }
        if (payload.floorId == null || payload.floorId === "") {
          throw new Error(
            "Tower units require a Floor. Add the unit under a Floor.",
          );
        }
      } else if (pType === PROPERTY_TYPES.TOWNHOUSE) {
        if (
          payload.floorId != null &&
          payload.floorId !== "" &&
          payload.floorId !== undefined
        ) {
          throw new Error(
            "Townhouse units must not have a floor. Clear Floor.",
          );
        }
        if (payload.blockId == null || payload.blockId === "") {
          throw new Error(
            "Townhouse units require a Block. Add the unit under a Block.",
          );
        }
      }
    },
  },
  [ENTITY_TYPES.AMENITY]: {
    title: "Amenity",
    api: amenityApi,
    schema: yup.object().shape({
      name: yup.string().required(),
      projectId: yup.string().required(),
      subtitle: yup.string(),
      description: yup.string(),
      x: yup.number().nullable(),
      y: yup.number().nullable(),
      thumbnailAssetId: yup.string().nullable(),
      forwardAssetId: yup.string().nullable(),
      reverseAssetId: yup.string().nullable(),
      sideAssetId: yup.string().nullable(),
    }),
    fields: [
      nameField(),
      idField("projectId", "Project ID"),
      {
        name: "subtitle",
        label: "Subtitle",
        control: CONTROL_TYPES.TEXT,
        required: false,
        disabled: false,
      },
      {
        name: "description",
        label: "Description",
        control: CONTROL_TYPES.TEXTAREA,
        required: false,
        disabled: false,
      },
      {
        name: "x",
        label: "X",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      {
        name: "y",
        label: "Y",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      assetField("thumbnailAssetId", "Thumbnail", [
        AssetType.IMAGE,
        AssetType.THUMBNAIL,
      ]),
      assetField("forwardAssetId", "Forward", [
        AssetType.VIDEO,
        AssetType.PANORAMA,
      ]),
      assetField("reverseAssetId", "Reverse", [
        AssetType.VIDEO,
        AssetType.PANORAMA,
      ]),
      assetField("sideAssetId", "Side", [AssetType.VIDEO, AssetType.PANORAMA]),
    ],
    childTypes: [],
  },
  [ENTITY_TYPES.SURROUNDING]: {
    title: "Surrounding",
    api: surroundingApi,
    schema: yup.object().shape({
      name: yup.string().required(),
      projectId: yup.string().required(),
      description: yup.string().nullable(),
      x: yup.number().nullable(),
      y: yup.number().nullable(),
      distance: yup.number().nullable(),
      iconAssetId: yup.string().nullable(),
      thumbnailAssetId: yup.string().nullable(),
      forwardAssetId: yup.string().nullable(),
      reverseAssetId: yup.string().nullable(),
      sideAssetId: yup.string().nullable(),
      svg: yup.string().nullable(),
    }),
    fields: [
      nameField(),
      idField("projectId", "Project ID"),
      {
        name: "description",
        label: "Description",
        control: CONTROL_TYPES.TEXTAREA,
        required: false,
        disabled: false,
      },
      {
        name: "distance",
        label: "Distance",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      {
        name: "x",
        label: "X",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      {
        name: "y",
        label: "Y",
        control: CONTROL_TYPES.NUMBER,
        required: false,
        disabled: false,
      },
      assetField("iconAssetId", "Icon", [AssetType.IMAGE, AssetType.THUMBNAIL]),
      assetField("thumbnailAssetId", "Thumbnail", [
        AssetType.IMAGE,
        AssetType.THUMBNAIL,
      ]),
      assetField("forwardAssetId", "Forward", [
        AssetType.VIDEO,
        AssetType.PANORAMA,
      ]),
      assetField("reverseAssetId", "Reverse", [
        AssetType.VIDEO,
        AssetType.PANORAMA,
      ]),
      assetField("sideAssetId", "Side", [AssetType.VIDEO, AssetType.PANORAMA]),
      {
        name: "svg",
        label: "SVG",
        control: CONTROL_TYPES.TEXTAREA,
        required: false,
        disabled: false,
      },
    ],
    childTypes: [],
  },
};
