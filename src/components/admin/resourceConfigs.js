import * as yup from "yup";
import { amenityApi } from "../../api/admin/amenityApi";
import { assetApi } from "../../api/admin/assetApi";
import { developerApi } from "../../api/admin/developerApi";
import { floorApi } from "../../api/admin/floorApi";
import { projectApi } from "../../api/admin/projectApi";
import { propertyApi } from "../../api/admin/propertyApi";
import { propertyViewApi } from "../../api/admin/propertyViewApi";
import { surroundingApi } from "../../api/admin/surroundingApi";
import { unitApi } from "../../api/admin/unitApi";
import { zoneApi } from "../../api/admin/zoneApi";

// Helper to determine the name accessor for various resources
const getNameAccessor = (type) => {
  switch (type) {
    case "projects":
      return "name";
    case "zones":
      return "name";
    case "properties":
      return "displayName";
    case "floors":
      return "floorNumber";
    case "units":
      return "unitCode";
    case "blocks":
      return "displayName";
    case "amenities":
      return "displayName"; // For amenity items
    case "surroundings":
      return "displayName"; // For surrounding items
    case "propertyViews":
      return "name";
    default:
      return "name";
  }
};

export const resourceConfigs = {
  projects: {
    title: "Project",
    api: projectApi,
    schema: yup.object().shape({
      name: yup.string().required("Project Name is required"),
      developerId: yup.string(),
    }),
    columns: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: getNameAccessor("projects") },
    ],
    children: {
      zones: {
        resourceType: "zones",
        path: "zones.items",
        parentField: "projectId",
        // Optional: override columns if needed for this view
      },
      amenities: {
        resourceType: "amenities",
        path: "amenities.items",
        parentField: "projectId",
      },
      surroundings: {
        resourceType: "surroundings",
        path: "surroundings.items",
        parentField: "projectId",
      },
    },
  },
  zones: {
    title: "Zone",
    api: zoneApi,
    schema: yup.object().shape({
      name: yup.string().required("Zone Name is required"),
      projectId: yup.string().required("Project ID is required"), // Will be auto-filled
      subtitle: yup.string(),
      description: yup.string(),
      x: yup.number(),
      y: yup.number(),
      // Add other zone-specific fields
    }),
    columns: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: getNameAccessor("zones") },
      { header: "Project ID", accessor: "projectId" },
    ],
    children: {
      properties: {
        resourceType: "properties",
        path: "properties", // properties is an array directly under zone
        parentField: "zoneId",
      },
    },
  },
  properties: {
    title: "Property",
    api: propertyApi,
    schema: yup.object().shape({
      displayName: yup.string().required("Display Name is required"),
      type: yup.string().required("Type is required"), // e.g., TOWNHOUSE, TOWER, VILLA
      zoneId: yup.string().required("Zone ID is required"), // Will be auto-filled
      description: yup.string(),
      // Add other property-specific fields
    }),
    columns: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: getNameAccessor("properties") },
      { header: "Type", accessor: "type" },
      { header: "Zone ID", accessor: "zoneId" },
    ],
    children: {
      blocks: {
        resourceType: "blocks",
        path: "blocks", // blocks is an array directly under property
        parentField: "propertyId",
      },
      floors: {
        resourceType: "floors",
        path: "floors", // floors is an array directly under property
        parentField: "propertyId",
      },
      units: {
        // For VILLA type properties, units are direct children
        resourceType: "units",
        path: "units", // units is an array directly under property (for VILLA)
        parentField: "propertyId",
      },
      propertyViews: {
        resourceType: "propertyViews",
        path: "views", // views is an array directly under property
        parentField: "propertyId",
      },
    },
  },
  blocks: {
    title: "Block",
    // Blocks don't have a direct API, they are part of properties
    // For CRUD, you would likely update the parent property or use a nested API if available
    api: {
      // Placeholder APIs, these would need to interact with propertyApi or dedicated blockApi
      getAll: async (propertyId) => {
        /* logic to get blocks for propertyId */ return [];
      },
      create: async (data) => {
        /* logic to create a block for propertyId */ return data;
      },
      update: async (id, data) => {
        /* logic to update a block */ return data;
      },
      delete: async (id) => {
        /* logic to delete a block */ return {};
      },
    },
    schema: yup.object().shape({
      displayName: yup.string().required("Display Name is required"),
      propertyId: yup.string().required("Property ID is required"), // Auto-filled
    }),
    columns: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: getNameAccessor("blocks") },
      { header: "Property ID", accessor: "propertyId" },
    ],
    children: {
      units: {
        resourceType: "units",
        path: "units", // units is an array directly under block
        parentField: "blockId",
      },
    },
  },
  floors: {
    title: "Floor",
    api: floorApi, // Floor has its own API
    schema: yup.object().shape({
      floorNumber: yup.number().required("Floor Number is required").min(1),
      propertyId: yup.string().required("Property ID is required"), // Auto-filled
    }),
    columns: [
      { header: "ID", accessor: "id" },
      { header: "Number", accessor: getNameAccessor("floors") },
      { header: "Property ID", accessor: "propertyId" },
    ],
    children: {
      units: {
        resourceType: "units",
        path: "units", // units is an array directly under floor
        parentField: "floorId",
      },
    },
  },
  units: {
    title: "Unit",
    api: unitApi,
    schema: yup.object().shape({
      unitCode: yup.string().required("Unit Code is required"),
      propertyId: yup.string().required("Property ID is required"), // Auto-filled if property is parent
      floorId: yup.string(), // Auto-filled if floor is parent
      blockId: yup.string(), // Auto-filled if block is parent
      displayName: yup.string(),
      // Add other unit-specific fields
    }),
    columns: [
      { header: "ID", accessor: "id" },
      { header: "Code", accessor: getNameAccessor("units") },
      { header: "Display Name", accessor: "displayName" },
      { header: "Property ID", accessor: "propertyId" },
      { header: "Floor ID", accessor: "floorId" },
      { header: "Block ID", accessor: "blockId" },
    ],
  },
  amenities: {
    title: "Amenity Item", // Renamed for clarity in children context
    api: amenityApi,
    schema: yup.object().shape({
      displayName: yup.string().required("Display Name is required"),
      projectId: yup.string().required("Project ID is required"), // Auto-filled
      description: yup.string(),
      x: yup.number(),
      y: yup.number(),
      // Add other amenity item fields
    }),
    columns: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: getNameAccessor("amenities") },
      { header: "Project ID", accessor: "projectId" },
    ],
  },
  surroundings: {
    title: "Surrounding Item", // Renamed for clarity in children context
    api: surroundingApi,
    schema: yup.object().shape({
      displayName: yup.string().required("Display Name is required"),
      projectId: yup.string().required("Project ID is required"), // Auto-filled
      x: yup.number(),
      y: yup.number(),
      // Add other surrounding item fields
    }),
    columns: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: getNameAccessor("surroundings") },
      { header: "Project ID", accessor: "projectId" },
    ],
  },
  propertyViews: {
    // Renamed for clarity, from propertyViewApi
    title: "Property View",
    api: propertyViewApi,
    schema: yup.object().shape({
      name: yup.string().required("Name is required"),
      propertyId: yup.string().required("Property ID is required"), // Auto-filled
      // Add other property view fields
    }),
    columns: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: getNameAccessor("propertyViews") },
      { header: "Property ID", accessor: "propertyId" },
    ],
  },
  // Developers and Assets are not part of this core hierarchy for now
  developers: {
    title: "Developer",
    api: developerApi,
    schema: yup.object().shape({
      name: yup.string().required("Name is required"),
      // Add other fields relevant to Developer
      // export enum UserRole {
      //   ADMIN = 'admin',
      //   SYSTEM_ADMIN = 'system_admin',
      //   SYSTEM_TECHNICIAN = 'system_technician',
      //   DEVELOPER_ADMIN = 'developer_admin',
      //   DEVELOPER_MARKETING = 'developer_marketing',
      //   DEVELOPER_SALES = 'developer_sales',
      // }
    }),
    columns: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: getNameAccessor("developers") },
    ],
  },
  assets: {
    title: "Asset",
    api: assetApi,
    schema: yup.object().shape({
      name: yup.string().required("Name is required"),
      // Add other fields relevant to Asset
    }),
    columns: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: getNameAccessor("assets") },
    ],
  },
};
