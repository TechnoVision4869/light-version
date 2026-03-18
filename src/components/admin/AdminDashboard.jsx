import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Layout from "../Layout";
import { toast } from "react-hot-toast";
import { FlowTree } from "./FlowTree";
import { DynamicForm } from "./DynamicForm";
import { AssetsLibrary } from "./AssetsLibrary";
import {ConfirmDialog } from "./ConfirmDialog";
import { Button } from "@/components/ui/button";
import { ENTITY_TYPES, AssetType, ASSET_TYPES } from "./types";
import { resourceConfigs } from "./resourceConfigs";
import { CONTROL_TYPES } from "./resourceConfigs";
import { getInitialMockState } from "./mockData";
import { developerApi } from "../../api/admin/developerApi";
import { projectApi } from "../../api/admin/projectApi";
import { zoneApi } from "../../api/admin/zoneApi";
import { propertyApi } from "../../api/admin/propertyApi";
import { floorApi } from "../../api/admin/floorApi";
import { blockApi } from "../../api/admin/blockApi";
import { unitApi } from "../../api/admin/unitApi";
import { unitTypeApi } from "../../api/admin/unitTypeApi";
import { amenityApi } from "../../api/admin/amenityApi";
import { surroundingApi } from "../../api/admin/surroundingApi";
import { assetApi } from "../../api/admin/assetApi";
import { apiService } from "../../services/api.service";
import { propertyViewApi } from "../../api/admin/propertyViewApi";
import { featureApi } from "../../api/admin/featureApi";

const USE_MOCK_DATA = false;

// type kept for call-site consistency; can be used later for type-specific labels
function getDisplayName(entity, type) {
  if (!entity) return "";
  void type;
  const d = entity;
  return (
    d.name ||
    d.displayName ||
    d.unitCode ||
    (d.floorNumber != null ? `Floor ${d.floorNumber}` : null) ||
    d.id ||
    "Untitled"
  );
}

function getAssetFileUrl(assetId) {
  if (!assetId) return null;
  const base = apiService.apiUrl?.replace(/\/$/, "") || "";
  return `${base}/assets/file/${assetId}`;
}

/** Normalize unit type form data for simple update (e.g. serviceRoomNames string -> array). */
function normalizeUnitTypePayload(data) {
  const out = { ...data };
  if (typeof out.serviceRoomNames === "string") {
    out.serviceRoomNames = out.serviceRoomNames
      ? out.serviceRoomNames
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined;
  }
  return out;
}

/** Build unit type createFull API body. */
function normalizeUnitTypeFullPayload(data) {
  const num = (v) => (v === "" || v == null ? null : Number(v));
  const serviceRooms =
    typeof data.serviceRoomNames === "string"
      ? data.serviceRoomNames
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : Array.isArray(data.serviceRoomNames)
        ? data.serviceRoomNames
        : [];
  const toAssetItems = (items) => {
    if (!Array.isArray(items)) return [];
    return items.map((id) =>
      typeof id === "string" ? { assetId: id } : { assetId: id?.assetId ?? id },
    );
  };
  const paymentPlans = Array.isArray(data.paymentPlans)
    ? data.paymentPlans.map((p) => ({
        downPayment: num(p.downPayment) ?? null,
        monthly: num(p.monthly) ?? null,
        years: num(p.years) ?? null,
      }))
    : [];
  const levels = Array.isArray(data.levels) ? data.levels : [];
  const body = {
    name: data.name ?? null,
    bedrooms: num(data.bedrooms) ?? null,
    bathrooms: num(data.bathrooms) ?? null,
    area: num(data.area) ?? null,
    serviceRooms,
    gallery: toAssetItems(data.gallery ?? []),
    cutSections: toAssetItems(data.cutSections ?? []),
    floorPlans: toAssetItems(data.floorPlans ?? []),
    paymentPlans,
    levels,
  };
  if (data.projectId) body.projectId = data.projectId;
  return body;
}

/** Build unit API body with correct keys and types (numbers, null for empty optionals). */
function normalizeUnitPayload(data) {
  const num = (v) => (v === "" || v == null ? null : Number(v));
  const str = (v) => (v === "" || v == null ? null : String(v));
  return {
    unitCode: str(data.unitCode) ?? null,
    visualTypeId: str(data.visualTypeId),
    propertyId: str(data.propertyId) ?? null,
    floorId: str(data.floorId) || null,
    blockId: str(data.blockId) || null,
    balconyAssetId: str(data.balconyAssetId) || null,
    forwardAssetId: str(data.forwardAssetId) || null,
    reverseAssetId: str(data.reverseAssetId) || null,
    sideAssetId: str(data.sideAssetId) || null,
    displayName: str(data.displayName),
    unitTypeId: str(data.unitTypeId),
    price: num(data.price),
    area: num(data.area),
    bedrooms: num(data.bedrooms),
    bathrooms: num(data.bathrooms),
    balconyView: str(data.balconyView),
    x: num(data.x),
    y: num(data.y),
  };
}

function getMockInitialState() {
  if (!USE_MOCK_DATA) return null;
  return getInitialMockState();
}

export default function AdminDashboard() {
  const initialMock = useRef(getMockInitialState()).current;

  const [developers, setDevelopers] = useState(
    () => initialMock?.developers ?? [],
  );
  const [projectsByDeveloper, setProjectsByDeveloper] = useState(
    () => initialMock?.projectsByDeveloper ?? {},
  );
  const [zonesByProject, setZonesByProject] = useState(
    () => initialMock?.zonesByProject ?? {},
  );
  const [propertiesByZone, setPropertiesByZone] = useState(
    () => initialMock?.propertiesByZone ?? {},
  );
  const [floorsByProperty, setFloorsByProperty] = useState(
    () => initialMock?.floorsByProperty ?? {},
  );
  const [blocksByProperty, setBlocksByProperty] = useState(
    () => initialMock?.blocksByProperty ?? {},
  );
  const [unitsByProperty, setUnitsByProperty] = useState(
    () => initialMock?.unitsByProperty ?? {},
  );
  const [unitsByFloor, setUnitsByFloor] = useState(
    () => initialMock?.unitsByFloor ?? {},
  );
  const [unitsByBlock, setUnitsByBlock] = useState(
    () => initialMock?.unitsByBlock ?? {},
  );
  const [amenitiesByProject, setAmenitiesByProject] = useState(
    () => initialMock?.amenitiesByProject ?? {},
  );
  const [surroundingsByProject, setSurroundingsByProject] = useState(
    () => initialMock?.surroundingsByProject ?? {},
  );
  const [propertyViewsByProperty, setPropertyViewsByProperty] = useState(
    () => initialMock?.propertyViewsByProperty ?? {},
  );
  const [featuresByProperty, setFeaturesByProperty] = useState(() => ({}));
  const [featuresByFloor, setFeaturesByFloor] = useState(() => ({}));
  const [unitTypes, setUnitTypes] = useState(() => []);
  const [mockAssets, setMockAssets] = useState(
    () => initialMock?.assets ?? null,
  );
  const [allAssets, setAllAssets] = useState([]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [pendingSelectNode, setPendingSelectNode] = useState(null);
  const [leaveFormDialogOpen, setLeaveFormDialogOpen] = useState(false);
  const [selectedDeveloperId, setSelectedDeveloperId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!selectedNode) return;
    if (selectedNode.type === ENTITY_TYPES.DEVELOPER && selectedNode.id) {
      setSelectedDeveloperId(selectedNode.id);
    }
  }, [selectedNode]);

  const [expandedIds, setExpandedIds] = useState(() => {
    if (!USE_MOCK_DATA || !initialMock?.developers?.length) return new Set();
    return new Set([initialMock.developers[0].id]);
  });
  const [focusedAssetField, setFocusedAssetField] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadedCache = useRef({
    projects: new Set(),
    zones: new Set(),
    properties: new Set(),
    floors: new Set(),
    blocks: new Set(),
    unitsForProperty: new Set(),
    unitsForFloor: new Set(),
    unitsForBlock: new Set(),
    amenities: new Set(),
    surroundings: new Set(),
    unitTypes: new Set(),
    propertyViews: new Set(),
    featuresForProperty: new Set(),
    featuresForFloor: new Set(),
  });

  const loadDevelopers = useCallback(async () => {
    if (USE_MOCK_DATA) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const list = await developerApi.getAll();
      setDevelopers(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load developers. Please refresh the page.");
      setDevelopers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDevelopers();
  }, []);

  const loadUnitTypes = useCallback(async (projectId) => {
    if (USE_MOCK_DATA) return;
    if (projectId && loadedCache.current.unitTypes.has(projectId)) return;
    if (projectId) loadedCache.current.unitTypes.add(projectId);
    try {
      const list = projectId
        ? await unitTypeApi.getByProject(projectId)
        : await unitTypeApi.getAll({ limit: 500 });
      const arr = Array.isArray(list) ? list : [];
      if (projectId) {
        setUnitTypes((prev) => [
          ...(prev || []).filter((ut) => ut.projectId !== projectId),
          ...arr,
        ]);
      } else {
        setUnitTypes(arr);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load unit types");
      if (projectId) {
        setUnitTypes((prev) =>
          (prev || []).filter((ut) => ut.projectId !== projectId),
        );
      } else {
        setUnitTypes([]);
      }
    }
  }, []);

  const loadAllAssets = useCallback(async () => {
    if (USE_MOCK_DATA) return;
    try {
      const list = await assetApi.list({ limit: 10000 });
      setAllAssets(Array.isArray(list) ? list : (list?.data ?? []));
    } catch (err) {
      console.error(err);
      setAllAssets([]);
    }
  }, []);

  useEffect(() => {
    loadAllAssets();
  }, []);

  const loadProjects = useCallback(
    async (developerId) => {
      if (loadedCache.current.projects.has(developerId)) return;
      loadedCache.current.projects.add(developerId);
      if (USE_MOCK_DATA && initialMock?.projectsByDeveloper) {
        setProjectsByDeveloper((prev) => ({
          ...prev,
          [developerId]:
            initialMock.projectsByDeveloper[developerId] ??
            prev[developerId] ??
            [],
        }));
        return;
      }
      try {
        const list = await projectApi.getByDeveloper(developerId);
        const arr = Array.isArray(list)
          ? list
          : (list?.developerProjects ?? []);
        setProjectsByDeveloper((prev) => ({ ...prev, [developerId]: arr }));
      } catch {
        setProjectsByDeveloper((prev) => ({ ...prev, [developerId]: [] }));
      }
    },
    [initialMock],
  );

  const loadZones = useCallback(
    async (projectId) => {
      if (loadedCache.current.zones.has(projectId)) return;
      loadedCache.current.zones.add(projectId);
      if (USE_MOCK_DATA && initialMock?.zonesByProject) {
        setZonesByProject((prev) => ({
          ...prev,
          [projectId]:
            initialMock.zonesByProject[projectId] ?? prev[projectId] ?? [],
        }));
        return;
      }
      try {
        const list = await zoneApi.getByProject(projectId);
        const arr = Array.isArray(list) ? list : (list?.items ?? []);
        setZonesByProject((prev) => ({ ...prev, [projectId]: arr }));
      } catch {
        setZonesByProject((prev) => ({ ...prev, [projectId]: [] }));
      }
    },
    [initialMock],
  );

  const loadProperties = useCallback(
    async (zoneId) => {
      if (loadedCache.current.properties.has(zoneId)) return;
      loadedCache.current.properties.add(zoneId);
      if (USE_MOCK_DATA && initialMock?.propertiesByZone) {
        setPropertiesByZone((prev) => ({
          ...prev,
          [zoneId]: initialMock.propertiesByZone[zoneId] ?? prev[zoneId] ?? [],
        }));
        return;
      }
      try {
        const list = await propertyApi.getByZone(zoneId);
        const arr = Array.isArray(list) ? list : [];
        setPropertiesByZone((prev) => ({ ...prev, [zoneId]: arr }));
      } catch {
        setPropertiesByZone((prev) => ({ ...prev, [zoneId]: [] }));
      }
    },
    [initialMock],
  );

  const loadFloors = useCallback(
    async (propertyId) => {
      if (loadedCache.current.floors.has(propertyId)) return;
      loadedCache.current.floors.add(propertyId);
      if (USE_MOCK_DATA && initialMock?.floorsByProperty) {
        setFloorsByProperty((prev) => ({
          ...prev,
          [propertyId]:
            initialMock.floorsByProperty[propertyId] ?? prev[propertyId] ?? [],
        }));
        return;
      }
      try {
        const list = await floorApi.getByProperty(propertyId);
        const arr = Array.isArray(list) ? list : [];
        setFloorsByProperty((prev) => ({ ...prev, [propertyId]: arr }));
      } catch {
        setFloorsByProperty((prev) => ({ ...prev, [propertyId]: [] }));
      }
    },
    [initialMock],
  );

  const loadBlocks = useCallback(
    async (propertyId) => {
      if (loadedCache.current.blocks.has(propertyId)) return;
      loadedCache.current.blocks.add(propertyId);
      if (USE_MOCK_DATA && initialMock?.blocksByProperty) {
        setBlocksByProperty((prev) => ({
          ...prev,
          [propertyId]:
            initialMock.blocksByProperty[propertyId] ?? prev[propertyId] ?? [],
        }));
        return;
      }
      try {
        const list = await blockApi.getByProperty(propertyId);
        const arr = Array.isArray(list) ? list : [];
        setBlocksByProperty((prev) => ({ ...prev, [propertyId]: arr }));
      } catch {
        setBlocksByProperty((prev) => ({ ...prev, [propertyId]: [] }));
      }
    },
    [initialMock],
  );

  const loadUnitsForProperty = useCallback(
    async (propertyId) => {
      if (loadedCache.current.unitsForProperty.has(propertyId)) return;
      loadedCache.current.unitsForProperty.add(propertyId);
      if (USE_MOCK_DATA && initialMock?.unitsByProperty) {
        setUnitsByProperty((prev) => ({
          ...prev,
          [propertyId]:
            initialMock.unitsByProperty[propertyId] ?? prev[propertyId] ?? [],
        }));
        return;
      }
      try {
        const list = await unitApi.getByProperty(propertyId);
        const arr = Array.isArray(list) ? list : [];
        setUnitsByProperty((prev) => ({ ...prev, [propertyId]: arr }));
      } catch {
        setUnitsByProperty((prev) => ({ ...prev, [propertyId]: [] }));
      }
    },
    [initialMock],
  );

  const loadUnitsForFloor = useCallback(
    async (floorId) => {
      if (loadedCache.current.unitsForFloor.has(floorId)) return;
      loadedCache.current.unitsForFloor.add(floorId);
      if (USE_MOCK_DATA && initialMock?.unitsByFloor) {
        setUnitsByFloor((prev) => ({
          ...prev,
          [floorId]: initialMock.unitsByFloor[floorId] ?? prev[floorId] ?? [],
        }));
        return;
      }
      try {
        const list = await unitApi.getByFloor(floorId);
        const arr = Array.isArray(list) ? list : [];
        setUnitsByFloor((prev) => ({ ...prev, [floorId]: arr }));
      } catch {
        setUnitsByFloor((prev) => ({ ...prev, [floorId]: [] }));
      }
    },
    [initialMock],
  );

  const loadUnitsForBlock = useCallback(
    async (blockId) => {
      if (loadedCache.current.unitsForBlock.has(blockId)) return;
      loadedCache.current.unitsForBlock.add(blockId);
      if (USE_MOCK_DATA && initialMock?.unitsByBlock) {
        setUnitsByBlock((prev) => ({
          ...prev,
          [blockId]: initialMock.unitsByBlock[blockId] ?? prev[blockId] ?? [],
        }));
        return;
      }
      try {
        const list = await unitApi.getByBlock(blockId);
        const arr = Array.isArray(list) ? list : [];
        setUnitsByBlock((prev) => ({ ...prev, [blockId]: arr }));
      } catch {
        setUnitsByBlock((prev) => ({ ...prev, [blockId]: [] }));
      }
    },
    [initialMock],
  );

  const loadAmenities = useCallback(
    async (projectId) => {
      if (loadedCache.current.amenities.has(projectId)) return;
      loadedCache.current.amenities.add(projectId);
      if (USE_MOCK_DATA && initialMock?.amenitiesByProject) {
        setAmenitiesByProject((prev) => ({
          ...prev,
          [projectId]:
            initialMock.amenitiesByProject[projectId] ?? prev[projectId] ?? [],
        }));
        return;
      }
      try {
        const list = await amenityApi.getAll(projectId);
        const arr = Array.isArray(list) ? list : [];
        setAmenitiesByProject((prev) => ({ ...prev, [projectId]: arr }));
      } catch {
        setAmenitiesByProject((prev) => ({ ...prev, [projectId]: [] }));
      }
    },
    [initialMock],
  );

  const loadSurroundings = useCallback(
    async (projectId) => {
      if (loadedCache.current.surroundings.has(projectId)) return;
      loadedCache.current.surroundings.add(projectId);
      if (USE_MOCK_DATA && initialMock?.surroundingsByProject) {
        setSurroundingsByProject((prev) => ({
          ...prev,
          [projectId]:
            initialMock.surroundingsByProject[projectId] ??
            prev[projectId] ??
            [],
        }));
        return;
      }
      try {
        const list = await surroundingApi.getByProject(projectId);
        const arr = Array.isArray(list) ? list : [];
        setSurroundingsByProject((prev) => ({ ...prev, [projectId]: arr }));
      } catch {
        setSurroundingsByProject((prev) => ({ ...prev, [projectId]: [] }));
      }
    },
    [initialMock],
  );

  const loadPropertyViews = useCallback(
    async (propertyId) => {
      if (loadedCache.current.propertyViews.has(propertyId)) return;
      loadedCache.current.propertyViews.add(propertyId);
      if (USE_MOCK_DATA && initialMock?.propertyViewsByProperty) {
        setPropertyViewsByProperty((prev) => ({
          ...prev,
          [propertyId]:
            initialMock.propertyViewsByProperty[propertyId] ??
            prev[propertyId] ??
            [],
        }));
        return;
      }
      try {
        const list = await propertyViewApi.getByProperty(propertyId);
        const arr = Array.isArray(list) ? list : [];
        setPropertyViewsByProperty((prev) => ({ ...prev, [propertyId]: arr }));
      } catch {
        setPropertyViewsByProperty((prev) => ({ ...prev, [propertyId]: [] }));
      }
    },
    [initialMock],
  );

  const loadFeaturesByProperty = useCallback(async (propertyId) => {
    if (loadedCache.current.featuresForProperty.has(propertyId)) return;
    loadedCache.current.featuresForProperty.add(propertyId);
    try {
      const list = await featureApi.getByProperty(propertyId);
      const arr = Array.isArray(list) ? list : [];
      setFeaturesByProperty((prev) => ({ ...prev, [propertyId]: arr }));
    } catch {
      setFeaturesByProperty((prev) => ({ ...prev, [propertyId]: [] }));
    }
  }, []);

  const loadFeaturesByFloor = useCallback(async (floorId) => {
    if (loadedCache.current.featuresForFloor.has(floorId)) return;
    loadedCache.current.featuresForFloor.add(floorId);
    try {
      const list = await featureApi.getByFloor(floorId);
      const arr = Array.isArray(list) ? list : [];
      setFeaturesByFloor((prev) => ({ ...prev, [floorId]: arr }));
    } catch {
      setFeaturesByFloor((prev) => ({ ...prev, [floorId]: [] }));
    }
  }, []);

  const nodes = useMemo(() => {
    const out = [];
    developers.forEach((dev) => {
      out.push({
        id: dev.id,
        type: ENTITY_TYPES.DEVELOPER,
        name: getDisplayName(dev, ENTITY_TYPES.DEVELOPER),
        parentId: null,
        data: dev,
      });
      const projects = projectsByDeveloper[dev.id] ?? [];
      projects.forEach((proj) => {
        out.push({
          id: proj.id,
          type: ENTITY_TYPES.PROJECT,
          name: getDisplayName(proj, ENTITY_TYPES.PROJECT),
          parentId: dev.id,
          data: { ...proj, developerId: proj.developerId || dev.id },
        });
        const folderZonesId = `folder-zones-${proj.id}`;
        const folderAmenitiesId = `folder-amenities-${proj.id}`;
        const folderSurroundingsId = `folder-surroundings-${proj.id}`;
        const folderUnitTypesId = `folder-unit-types-${proj.id}`;
        // Folder order under project (Unit Types first for visibility)
        out.push(
          {
            id: folderUnitTypesId,
            type: "FOLDER",
            name: "Unit Types",
            parentId: proj.id,
            data: { childType: ENTITY_TYPES.UNIT_TYPE, projectId: proj.id },
          },
          {
            id: folderZonesId,
            type: "FOLDER",
            name: "Zones",
            parentId: proj.id,
            data: { childType: ENTITY_TYPES.ZONE, projectId: proj.id },
          },
          {
            id: folderAmenitiesId,
            type: "FOLDER",
            name: "Amenities",
            parentId: proj.id,
            data: { childType: ENTITY_TYPES.AMENITY, projectId: proj.id },
          },
          {
            id: folderSurroundingsId,
            type: "FOLDER",
            name: "Surroundings",
            parentId: proj.id,
            data: { childType: ENTITY_TYPES.SURROUNDING, projectId: proj.id },
          },
        );
        const zones = zonesByProject[proj.id] ?? [];
        zones.forEach((z) => {
          out.push({
            id: z.id,
            type: ENTITY_TYPES.ZONE,
            name: getDisplayName(z, ENTITY_TYPES.ZONE),
            parentId: folderZonesId,
            data: { ...z, projectId: z.projectId || proj.id },
          });
          const properties = propertiesByZone[z.id] ?? [];
          properties.forEach((prop) => {
            out.push({
              id: prop.id,
              type: ENTITY_TYPES.PROPERTY,
              name: getDisplayName(prop, ENTITY_TYPES.PROPERTY),
              parentId: z.id,
              data: { ...prop, zoneId: prop.zoneId || z.id },
            });
            const pt = prop.type || prop.propertyType;

            // Property Views folder
            const folderPropertyViewsId = `folder-property-views-${prop.id}`;
            out.push({
              id: folderPropertyViewsId,
              type: "FOLDER",
              name: "Property Views",
              parentId: prop.id,
              data: {
                childType: ENTITY_TYPES.PROPERTY_VIEW,
                propertyId: prop.id,
              },
            });
            (propertyViewsByProperty[prop.id] ?? []).forEach((pv) => {
              out.push({
                id: pv.id,
                type: ENTITY_TYPES.PROPERTY_VIEW,
                name: getDisplayName(pv, ENTITY_TYPES.PROPERTY_VIEW),
                parentId: folderPropertyViewsId,
                data: { ...pv, propertyId: pv.propertyId || prop.id },
              });
            });

            if (pt === "TOWER") {
              // Features folder for TOWER property
              const folderFeaturesPropertyId = `folder-features-property-${prop.id}`;
              out.push({
                id: folderFeaturesPropertyId,
                type: "FOLDER",
                name: "Features",
                parentId: prop.id,
                data: { childType: ENTITY_TYPES.FEATURE, propertyId: prop.id },
              });
              (featuresByProperty[prop.id] ?? []).forEach((feat) => {
                out.push({
                  id: feat.id,
                  type: ENTITY_TYPES.FEATURE,
                  name: getDisplayName(feat, ENTITY_TYPES.FEATURE),
                  parentId: folderFeaturesPropertyId,
                  data: { ...feat, propertyId: feat.propertyId || prop.id },
                });
              });

              // Floors folder
              const folderFloorsId = `folder-floors-${prop.id}`;
              out.push({
                id: folderFloorsId,
                type: "FOLDER",
                name: "Floors",
                parentId: prop.id,
                data: { childType: ENTITY_TYPES.FLOOR, propertyId: prop.id },
              });
              (floorsByProperty[prop.id] ?? []).forEach((f) => {
                out.push({
                  id: f.id,
                  type: ENTITY_TYPES.FLOOR,
                  name: getDisplayName(f, ENTITY_TYPES.FLOOR),
                  parentId: folderFloorsId,
                  data: { ...f, propertyId: f.propertyId || prop.id },
                });

                // Features folder for floor
                const folderFeaturesFloorId = `folder-features-floor-${f.id}`;
                out.push({
                  id: folderFeaturesFloorId,
                  type: "FOLDER",
                  name: "Features",
                  parentId: f.id,
                  data: { childType: ENTITY_TYPES.FEATURE, floorId: f.id },
                });
                (featuresByFloor[f.id] ?? []).forEach((feat) => {
                  out.push({
                    id: feat.id,
                    type: ENTITY_TYPES.FEATURE,
                    name: getDisplayName(feat, ENTITY_TYPES.FEATURE),
                    parentId: folderFeaturesFloorId,
                    data: { ...feat, floorId: feat.floorId || f.id },
                  });
                });

                (unitsByFloor[f.id] ?? []).forEach((u) => {
                  out.push({
                    id: u.id,
                    type: ENTITY_TYPES.UNIT,
                    name: getDisplayName(u, ENTITY_TYPES.UNIT),
                    parentId: f.id,
                    data: {
                      ...u,
                      propertyId: u.propertyId || prop.id,
                      floorId: u.floorId || f.id,
                    },
                  });
                });
              });
            } else if (pt === "TOWNHOUSE") {
              // Blocks folder
              const folderBlocksId = `folder-blocks-${prop.id}`;
              out.push({
                id: folderBlocksId,
                type: "FOLDER",
                name: "Blocks",
                parentId: prop.id,
                data: { childType: ENTITY_TYPES.BLOCK, propertyId: prop.id },
              });
              (blocksByProperty[prop.id] ?? []).forEach((b) => {
                out.push({
                  id: b.id,
                  type: ENTITY_TYPES.BLOCK,
                  name: getDisplayName(b, ENTITY_TYPES.BLOCK),
                  parentId: folderBlocksId,
                  data: { ...b, propertyId: b.propertyId || prop.id },
                });
                (unitsByBlock[b.id] ?? []).forEach((u) => {
                  out.push({
                    id: u.id,
                    type: ENTITY_TYPES.UNIT,
                    name: getDisplayName(u, ENTITY_TYPES.UNIT),
                    parentId: b.id,
                    data: {
                      ...u,
                      propertyId: u.propertyId || prop.id,
                      blockId: u.blockId || b.id,
                    },
                  });
                });
              });
            } else {
              (unitsByProperty[prop.id] ?? []).forEach((u) => {
                out.push({
                  id: u.id,
                  type: ENTITY_TYPES.UNIT,
                  name: getDisplayName(u, ENTITY_TYPES.UNIT),
                  parentId: prop.id,
                  data: { ...u, propertyId: u.propertyId || prop.id },
                });
              });
            }
          });
        });
        (amenitiesByProject[proj.id] ?? []).forEach((a) => {
          out.push({
            id: a.id,
            type: ENTITY_TYPES.AMENITY,
            name: getDisplayName(a, ENTITY_TYPES.AMENITY),
            parentId: folderAmenitiesId,
            data: { ...a, projectId: a.projectId || proj.id },
          });
        });
        (surroundingsByProject[proj.id] ?? []).forEach((s) => {
          out.push({
            id: s.id,
            type: ENTITY_TYPES.SURROUNDING,
            name: getDisplayName(s, ENTITY_TYPES.SURROUNDING),
            parentId: folderSurroundingsId,
            data: { ...s, projectId: s.projectId || proj.id },
          });
        });
        (unitTypes || [])
          .filter((ut) => ut.projectId === proj.id)
          .forEach((ut) => {
            out.push({
              id: ut.id,
              type: ENTITY_TYPES.UNIT_TYPE,
              name: getDisplayName(ut, ENTITY_TYPES.UNIT_TYPE),
              parentId: folderUnitTypesId,
              data: { ...ut, projectId: ut.projectId || proj.id },
            });
          });
      });
    });
    return out;
  }, [
    developers,
    projectsByDeveloper,
    zonesByProject,
    propertiesByZone,
    floorsByProperty,
    blocksByProperty,
    unitsByProperty,
    unitsByFloor,
    unitsByBlock,
    amenitiesByProject,
    surroundingsByProject,
    unitTypes,
    propertyViewsByProperty,
    featuresByProperty,
    featuresByFloor,
  ]);

  const handleToggle = useCallback(
    (id) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        const node = nodes.find((n) => n.id === id);
        if (node && !next.has(id)) return next;
        if (node?.type === ENTITY_TYPES.DEVELOPER) loadProjects(node.id);
        if (node?.type === ENTITY_TYPES.PROJECT) {
          loadZones(node.id);
          loadAmenities(node.id);
          loadSurroundings(node.id);
          loadUnitTypes(node.id);
        }
        if (node?.type === ENTITY_TYPES.ZONE) loadProperties(node.id);
        if (node?.type === ENTITY_TYPES.PROPERTY) {
          const pt = node.data?.type || node.data?.propertyType;
          if (pt === "TOWER") {
            loadFloors(node.id);
            loadFeaturesByProperty(node.id);
          }
          if (pt === "TOWNHOUSE") loadBlocks(node.id);
          if (pt === "VILLA") loadUnitsForProperty(node.id);
          loadPropertyViews(node.id);
        }
        if (node?.type === ENTITY_TYPES.FLOOR) {
          loadUnitsForFloor(node.id);
          loadFeaturesByFloor(node.id);
        }
        if (node?.type === ENTITY_TYPES.BLOCK) loadUnitsForBlock(node.id);

        // Folder nodes: use real parent ids from folder data.
        if (node?.type === "FOLDER") {
          const childType = node.data?.childType;
          const projectId = node.data?.projectId;
          const propertyId = node.data?.propertyId;
          const floorId = node.data?.floorId;

          if (childType === ENTITY_TYPES.ZONE && projectId) loadZones(projectId);
          if (childType === ENTITY_TYPES.AMENITY && projectId)
            loadAmenities(projectId);
          if (childType === ENTITY_TYPES.SURROUNDING && projectId)
            loadSurroundings(projectId);
          if (childType === ENTITY_TYPES.UNIT_TYPE && projectId)
            loadUnitTypes(projectId);
          if (childType === ENTITY_TYPES.PROPERTY && projectId)
            loadProperties(projectId);
          if (childType === ENTITY_TYPES.FLOOR && propertyId)
            loadFloors(propertyId);
          if (childType === ENTITY_TYPES.BLOCK && propertyId)
            loadBlocks(propertyId);
          if (childType === ENTITY_TYPES.PROPERTY_VIEW && propertyId)
            loadPropertyViews(propertyId);
          if (childType === ENTITY_TYPES.FEATURE && propertyId)
            loadFeaturesByProperty(propertyId);
          if (childType === ENTITY_TYPES.FEATURE && floorId)
            loadFeaturesByFloor(floorId);
        }
        return next;
      });
    },
    [
      nodes,
      loadProjects,
      loadZones,
      loadAmenities,
      loadSurroundings,
      loadProperties,
      loadFloors,
      loadBlocks,
      loadUnitsForProperty,
      loadUnitsForFloor,
      loadUnitsForBlock,
      loadPropertyViews,
      loadUnitTypes,
      loadFeaturesByProperty,
      loadFeaturesByFloor,
    ],
  );

  const selectNode = useCallback(
    (node) => {
      setSelectedNode(node);
      setFocusedAssetField(null);
      if (node?.type === ENTITY_TYPES.DEVELOPER) loadProjects(node.id);
      if (node?.type === ENTITY_TYPES.PROJECT) {
        loadZones(node.id);
        loadAmenities(node.id);
        loadSurroundings(node.id);
        loadUnitTypes(node.id);
      }
      if (node?.type === ENTITY_TYPES.ZONE) loadProperties(node.id);
      if (node?.type === ENTITY_TYPES.PROPERTY) {
        const pt = node.data?.type || node.data?.propertyType;
        if (pt === "TOWER") {
          loadFloors(node.id);
          loadFeaturesByProperty(node.id);
        }
        if (pt === "TOWNHOUSE") loadBlocks(node.id);
        if (pt === "VILLA") loadUnitsForProperty(node.id);
        loadPropertyViews(node.id);
      }
      if (node?.type === ENTITY_TYPES.FLOOR) {
        loadUnitsForFloor(node.id);
        loadFeaturesByFloor(node.id);
      }
      if (node?.type === ENTITY_TYPES.BLOCK) loadUnitsForBlock(node.id);
    },
    [
      loadProjects,
      loadZones,
      loadAmenities,
      loadSurroundings,
      loadProperties,
      loadFloors,
      loadBlocks,
      loadUnitsForProperty,
      loadUnitsForFloor,
      loadUnitsForBlock,
      loadPropertyViews,
      loadUnitTypes,
      loadFeaturesByProperty,
      loadFeaturesByFloor,
    ],
  );

  const handleSelect = useCallback(
    (node) => {
      if (isFormDirty && node?.id !== selectedNode?.id) {
        setPendingSelectNode(node);
        setLeaveFormDialogOpen(true);
        return;
      }
      selectNode(node);
    },
    [isFormDirty, selectNode, selectedNode?.id],
  );

  const handleAdd = useCallback(
    (childType, parentId) => {
      const parent = nodes.find((n) => n.id === parentId);
      const base = {
        type: childType,
        parentId,
        name: `New ${childType}`,
        data: {},
      };
      if (childType === ENTITY_TYPES.PROJECT && parent)
        base.data = { developerId: parentId, name: "New Project" };
      if (childType === ENTITY_TYPES.ZONE && parent) {
        const projectId =
          parent?.type === "FOLDER" && parent?.data?.projectId
            ? parent.data.projectId
            : parentId;
        base.data = { projectId, name: "New Zone" };
      }
      if (childType === ENTITY_TYPES.PROPERTY && parent)
        base.data = { zoneId: parentId, name: "New Property" };
      if (childType === ENTITY_TYPES.PROPERTY_VIEW && parent) {
        const propertyId =
          parent?.type === "FOLDER" && parent?.data?.propertyId
            ? parent.data.propertyId
            : parentId;
        base.data = { propertyId, name: "New Property View" };
      }
      if (childType === ENTITY_TYPES.FEATURE && parent) {
        // Feature is added from a FOLDER (Features folder under property or floor)
        if (
          parent?.type === "FOLDER" &&
          parent?.data?.childType === ENTITY_TYPES.FEATURE
        ) {
          if (parent.data.floorId) {
            base.data = {
              floorId: parent.data.floorId,
              propertyId: null,
              name: "New Feature",
            };
          } else if (parent.data.propertyId) {
            base.data = {
              propertyId: parent.data.propertyId,
              floorId: null,
              name: "New Feature",
            };
          }
        }
      }
      if (childType === ENTITY_TYPES.FLOOR && parent) {
        const propertyId =
          parent?.type === "FOLDER" && parent?.data?.propertyId
            ? parent.data.propertyId
            : parentId;
        base.data = { propertyId, floorNumber: 1 };
      }
      if (childType === ENTITY_TYPES.BLOCK && parent) {
        const propertyId =
          parent?.type === "FOLDER" && parent?.data?.propertyId
            ? parent.data.propertyId
            : parentId;
        base.data = { propertyId, displayName: "New Block" };
      }
      if (childType === ENTITY_TYPES.UNIT && parent) {
        base.data = {
          propertyId: parent?.data?.propertyId || parentId,
          unitCode: "NEW",
          displayName: "New Unit",
        };
        if (parent?.type === ENTITY_TYPES.FLOOR) base.data.floorId = parentId;
        if (parent?.type === ENTITY_TYPES.BLOCK) base.data.blockId = parentId;
      }
      if (childType === ENTITY_TYPES.AMENITY && parent) {
        const projectId =
          parent?.type === "FOLDER" && parent?.data?.projectId
            ? parent.data.projectId
            : parentId;
        base.data = { projectId, name: "New Amenity" };
      }
      if (childType === ENTITY_TYPES.SURROUNDING && parent) {
        const projectId =
          parent?.type === "FOLDER" && parent?.data?.projectId
            ? parent.data.projectId
            : parentId;
        base.data = { projectId, name: "New Surrounding" };
      }
      if (childType === ENTITY_TYPES.UNIT_TYPE && parent) {
        const projectId =
          parent?.type === "FOLDER" && parent?.data?.projectId
            ? parent.data.projectId
            : parentId;
        base.data = { projectId, name: "New Unit Type" };
      }
      setSelectedNode({ ...base, id: null });
    },
    [nodes],
  );

  const handleEdit = useCallback((node) => {
    setSelectedNode(node);
    setFocusedAssetField(null);
  }, []);

  const handleDelete = useCallback((node) => {
    setDeleteTarget(node);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const { id, type, parentId } = deleteTarget;
      if (USE_MOCK_DATA) {
        switch (type) {
          case ENTITY_TYPES.DEVELOPER:
            setDevelopers((prev) => prev.filter((d) => d.id !== id));
            setProjectsByDeveloper((prev) => {
              const next = { ...prev };
              delete next[id];
              return next;
            });
            break;
          case ENTITY_TYPES.PROJECT:
            setProjectsByDeveloper((prev) => ({
              ...prev,
              [parentId]: (prev[parentId] ?? []).filter((p) => p.id !== id),
            }));
            setZonesByProject((prev) => {
              const next = { ...prev };
              delete next[id];
              return next;
            });
            break;
          case ENTITY_TYPES.ZONE:
            setZonesByProject((prev) => ({
              ...prev,
              [parentId]: (prev[parentId] ?? []).filter((z) => z.id !== id),
            }));
            setPropertiesByZone((prev) => {
              const next = { ...prev };
              delete next[id];
              return next;
            });
            break;
          case ENTITY_TYPES.PROPERTY:
            setPropertiesByZone((prev) => ({
              ...prev,
              [parentId]: (prev[parentId] ?? []).filter((p) => p.id !== id),
            }));
            setPropertyViewsByProperty((prev) => {
              const next = { ...prev };
              delete next[id];
              return next;
            });
            setFloorsByProperty((prev) => {
              const next = { ...prev };
              delete next[id];
              return next;
            });
            setBlocksByProperty((prev) => {
              const next = { ...prev };
              delete next[id];
              return next;
            });
            setUnitsByProperty((prev) => {
              const next = { ...prev };
              delete next[id];
              return next;
            });
            break;
          case ENTITY_TYPES.FLOOR:
            setFloorsByProperty((prev) => ({
              ...prev,
              [parentId]: (prev[parentId] ?? []).filter((f) => f.id !== id),
            }));
            setUnitsByFloor((prev) => {
              const next = { ...prev };
              delete next[id];
              return next;
            });
            break;
          case ENTITY_TYPES.BLOCK:
            setBlocksByProperty((prev) => ({
              ...prev,
              [parentId]: (prev[parentId] ?? []).filter((b) => b.id !== id),
            }));
            setUnitsByBlock((prev) => {
              const next = { ...prev };
              delete next[id];
              return next;
            });
            break;
          case ENTITY_TYPES.UNIT: {
            const p = deleteTarget.data;
            const propId = p?.propertyId;
            const floorId = p?.floorId;
            const blockId = p?.blockId;
            if (floorId)
              setUnitsByFloor((prev) => ({
                ...prev,
                [floorId]: (prev[floorId] ?? []).filter((u) => u.id !== id),
              }));
            if (blockId)
              setUnitsByBlock((prev) => ({
                ...prev,
                [blockId]: (prev[blockId] ?? []).filter((u) => u.id !== id),
              }));
            if (propId)
              setUnitsByProperty((prev) => ({
                ...prev,
                [propId]: (prev[propId] ?? []).filter((u) => u.id !== id),
              }));
            break;
          }
          case ENTITY_TYPES.AMENITY:
            setAmenitiesByProject((prev) => ({
              ...prev,
              [parentId]: (prev[parentId] ?? []).filter((a) => a.id !== id),
            }));
            break;
          case ENTITY_TYPES.SURROUNDING:
            setSurroundingsByProject((prev) => ({
              ...prev,
              [parentId]: (prev[parentId] ?? []).filter((s) => s.id !== id),
            }));
            break;
          case ENTITY_TYPES.UNIT_TYPE:
            setUnitTypes((prev) => (prev ?? []).filter((ut) => ut.id !== id));
            break;
          case ENTITY_TYPES.PROPERTY_VIEW:
            setPropertyViewsByProperty((prev) => ({
              ...prev,
              [parentId]: (prev[parentId] ?? []).filter((pv) => pv.id !== id),
            }));
            break;
          case ENTITY_TYPES.FEATURE: {
            const featureData = deleteTarget?.data;
            if (featureData?.propertyId) {
              setFeaturesByProperty((prev) => ({
                ...prev,
                [featureData.propertyId]: (
                  prev[featureData.propertyId] ?? []
                ).filter((f) => f.id !== id),
              }));
            }
            if (featureData?.floorId) {
              setFeaturesByFloor((prev) => ({
                ...prev,
                [featureData.floorId]: (prev[featureData.floorId] ?? []).filter(
                  (f) => f.id !== id,
                ),
              }));
            }
            break;
          }
          default:
            break;
        }
        toast.success("Deleted (mock)");
        setDeleteTarget(null);
        if (selectedNode?.id === deleteTarget.id) setSelectedNode(null);
        setDeleteLoading(false);
        return;
      }
      switch (type) {
        case ENTITY_TYPES.DEVELOPER:
          await developerApi.delete(id);
          break;
        case ENTITY_TYPES.PROJECT:
          await projectApi.delete(id);
          break;
        case ENTITY_TYPES.ZONE:
          await zoneApi.delete(id);
          break;
        case ENTITY_TYPES.PROPERTY:
          await propertyApi.delete(id);
          break;
        case ENTITY_TYPES.FLOOR:
          await floorApi.delete(id);
          break;
        case ENTITY_TYPES.BLOCK:
          await blockApi.delete(id);
          break;
        case ENTITY_TYPES.UNIT:
          await unitApi.delete(id);
          break;
        case ENTITY_TYPES.AMENITY:
          await amenityApi.delete(id);
          break;
        case ENTITY_TYPES.SURROUNDING:
          await surroundingApi.delete(id);
          break;
        case ENTITY_TYPES.UNIT_TYPE:
          await unitTypeApi.delete(id);
          break;
        case ENTITY_TYPES.PROPERTY_VIEW:
          await propertyViewApi.delete(id);
          break;
        case ENTITY_TYPES.FEATURE:
          await featureApi.delete(id);
          break;
        default:
          throw new Error("Unknown type");
      }
      toast.success("Deleted");

      // Reflect deletion immediately in FlowTree (nodes are derived from these states).
      // We still refetch below for correctness, but this keeps UI consistent instantly.
      setExpandedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      const parentEntityIdFromFolder =
        typeof parentId === "string" && parentId.startsWith("folder-")
          ? parentId.split("-").slice(2).join("-") || null
          : null;
      switch (type) {
        case ENTITY_TYPES.DEVELOPER:
          setDevelopers((prev) => (prev ?? []).filter((d) => d.id !== id));
          setProjectsByDeveloper((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          setSelectedDeveloperId((prev) => (prev === id ? null : prev));
          break;
        case ENTITY_TYPES.PROJECT:
          setProjectsByDeveloper((prev) => ({
            ...(prev || {}),
            [parentId]: (prev?.[parentId] ?? []).filter((p) => p.id !== id),
          }));
          setUnitTypes((prev) =>
            (prev ?? []).filter((ut) => ut.projectId !== id),
          );
          setZonesByProject((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          setAmenitiesByProject((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          setSurroundingsByProject((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          break;
        case ENTITY_TYPES.ZONE: {
          // Zone nodes live under `folder-zones-${projectId}` in the tree, but state is keyed by projectId.
          // Prefer actual projectId on the node data.
          const zoneProjectId =
            deleteTarget?.data?.projectId || parentEntityIdFromFolder;
          setZonesByProject((prev) => ({
            ...(prev || {}),
            [zoneProjectId]: (prev?.[zoneProjectId] ?? []).filter(
              (z) => z.id !== id,
            ),
          }));
          setPropertiesByZone((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          break;
        }
        case ENTITY_TYPES.PROPERTY:
          setPropertiesByZone((prev) => ({
            ...(prev || {}),
            [parentId]: (prev?.[parentId] ?? []).filter((p) => p.id !== id),
          }));
          setPropertyViewsByProperty((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          setFloorsByProperty((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          setBlocksByProperty((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          setUnitsByProperty((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          break;
        case ENTITY_TYPES.FLOOR:
          setFloorsByProperty((prev) => {
            const propId =
              deleteTarget?.data?.propertyId || parentEntityIdFromFolder;
            return {
              ...(prev || {}),
              [propId]: (prev?.[propId] ?? []).filter((f) => f.id !== id),
            };
          });
          setUnitsByFloor((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          setFeaturesByFloor((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          break;
        case ENTITY_TYPES.BLOCK:
          setBlocksByProperty((prev) => {
            const propId =
              deleteTarget?.data?.propertyId || parentEntityIdFromFolder;
            return {
              ...(prev || {}),
              [propId]: (prev?.[propId] ?? []).filter((b) => b.id !== id),
            };
          });
          setUnitsByBlock((prev) => {
            const next = { ...(prev || {}) };
            delete next[id];
            return next;
          });
          break;
        case ENTITY_TYPES.UNIT: {
          const p = deleteTarget?.data;
          const propId = p?.propertyId;
          const floorId = p?.floorId;
          const blockId = p?.blockId;
          if (floorId)
            setUnitsByFloor((prev) => ({
              ...(prev || {}),
              [floorId]: (prev?.[floorId] ?? []).filter((u) => u.id !== id),
            }));
          if (blockId)
            setUnitsByBlock((prev) => ({
              ...(prev || {}),
              [blockId]: (prev?.[blockId] ?? []).filter((u) => u.id !== id),
            }));
          if (propId)
            setUnitsByProperty((prev) => ({
              ...(prev || {}),
              [propId]: (prev?.[propId] ?? []).filter((u) => u.id !== id),
            }));
          break;
        }
        case ENTITY_TYPES.AMENITY: {
          // Amenity nodes live under `folder-amenities-${projectId}` but state is keyed by projectId.
          const amenityProjectId =
            deleteTarget?.data?.projectId || parentEntityIdFromFolder;
          setAmenitiesByProject((prev) => ({
            ...(prev || {}),
            [amenityProjectId]: (prev?.[amenityProjectId] ?? []).filter(
              (a) => a.id !== id,
            ),
          }));
          break;
        }
        case ENTITY_TYPES.SURROUNDING: {
          // Surrounding nodes live under `folder-surroundings-${projectId}` but state is keyed by projectId.
          const surroundingProjectId =
            deleteTarget?.data?.projectId || parentEntityIdFromFolder;
          setSurroundingsByProject((prev) => ({
            ...(prev || {}),
            [surroundingProjectId]: (prev?.[surroundingProjectId] ?? []).filter(
              (s) => s.id !== id,
            ),
          }));
          break;
        }
        case ENTITY_TYPES.UNIT_TYPE:
          setUnitTypes((prev) => (prev ?? []).filter((ut) => ut.id !== id));
          break;
        case ENTITY_TYPES.PROPERTY_VIEW:
          setPropertyViewsByProperty((prev) => {
            const propId =
              deleteTarget?.data?.propertyId || parentEntityIdFromFolder;
            return {
              ...(prev || {}),
              [propId]: (prev?.[propId] ?? []).filter((pv) => pv.id !== id),
            };
          });
          break;
        case ENTITY_TYPES.FEATURE: {
          const featureData = deleteTarget?.data;
          const propertyId =
            featureData?.propertyId ||
            (typeof parentId === "string" && parentId.startsWith("folder-features-property-")
              ? parentEntityIdFromFolder
              : null);
          const floorId =
            featureData?.floorId ||
            (typeof parentId === "string" && parentId.startsWith("folder-features-floor-")
              ? parentEntityIdFromFolder
              : null);

          if (propertyId) {
            setFeaturesByProperty((prev) => ({
              ...(prev || {}),
              [propertyId]: (prev?.[propertyId] ?? []).filter((f) => f.id !== id),
            }));
          }
          if (floorId) {
            setFeaturesByFloor((prev) => ({
              ...(prev || {}),
              [floorId]: (prev?.[floorId] ?? []).filter((f) => f.id !== id),
            }));
          }
          break;
        }
        default:
          break;
      }

      setDeleteTarget(null);
      if (selectedNode?.id === deleteTarget.id) setSelectedNode(null);
      const pid = deleteTarget.parentId;
      const pidFromFolder =
        typeof pid === "string" && pid.startsWith("folder-")
          ? pid.split("-").slice(2).join("-") || null
          : null;
      const projectId =
        deleteTarget?.data?.projectId || (deleteTarget?.type === ENTITY_TYPES.PROJECT ? deleteTarget?.id : null) || pidFromFolder;
      const propertyId = deleteTarget?.data?.propertyId || pidFromFolder;
      if (deleteTarget.type === ENTITY_TYPES.UNIT_TYPE) {
        const projId = deleteTarget.data?.projectId;
        if (projId) loadedCache.current.unitTypes.delete(projId);
        loadUnitTypes(projId);
      }
      if (deleteTarget.type === ENTITY_TYPES.PROJECT && pid) {
        loadedCache.current.projects.delete(pid);
        loadProjects(pid);
      }
      if (deleteTarget.type === ENTITY_TYPES.ZONE) {
        const projId = deleteTarget?.data?.projectId || projectId;
        if (projId) {
          loadedCache.current.zones.delete(projId);
          loadZones(projId);
        }
      }
      if (deleteTarget.type === ENTITY_TYPES.PROPERTY && pid) {
        loadedCache.current.properties.delete(pid);
        loadProperties(pid);
      }
      if (deleteTarget.type === ENTITY_TYPES.FLOOR) {
        const propId = deleteTarget?.data?.propertyId || propertyId;
        if (propId) {
          loadedCache.current.floors.delete(propId);
          loadFloors(propId);
        }
      }
      if (deleteTarget.type === ENTITY_TYPES.BLOCK) {
        const propId = deleteTarget?.data?.propertyId || propertyId;
        if (propId) {
          loadedCache.current.blocks.delete(propId);
          loadBlocks(propId);
        }
      }
      if (deleteTarget.type === ENTITY_TYPES.UNIT) {
        const p = deleteTarget.data;
        if (p?.floorId) {
          loadedCache.current.unitsForFloor.delete(p.floorId);
          loadUnitsForFloor(p.floorId);
        } else if (p?.blockId) {
          loadedCache.current.unitsForBlock.delete(p.blockId);
          loadUnitsForBlock(p.blockId);
        } else if (p?.propertyId) {
          loadedCache.current.unitsForProperty.delete(p.propertyId);
          loadUnitsForProperty(p.propertyId);
        }
      }
      if (deleteTarget.type === ENTITY_TYPES.AMENITY) {
        const projId = deleteTarget?.data?.projectId || projectId;
        if (projId) {
          loadedCache.current.amenities.delete(projId);
          loadAmenities(projId);
        }
      }
      if (deleteTarget.type === ENTITY_TYPES.SURROUNDING) {
        const projId = deleteTarget?.data?.projectId || projectId;
        if (projId) {
          loadedCache.current.surroundings.delete(projId);
          loadSurroundings(projId);
        }
      }
      if (deleteTarget.type === ENTITY_TYPES.PROPERTY_VIEW) {
        const propId = deleteTarget?.data?.propertyId || propertyId;
        if (propId) {
          loadedCache.current.propertyViews.delete(propId);
          loadPropertyViews(propId);
        }
      }
      if (deleteTarget.type === ENTITY_TYPES.FEATURE) {
        const featureData = deleteTarget?.data;
        if (featureData?.propertyId) {
          loadedCache.current.featuresForProperty.delete(
            featureData.propertyId,
          );
          loadFeaturesByProperty(featureData.propertyId);
        }
        if (featureData?.floorId) {
          loadedCache.current.featuresForFloor.delete(featureData.floorId);
          loadFeaturesByFloor(featureData.floorId);
        }
      }
    } catch (e) {
      toast.error(e?.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  }, [
    deleteTarget,
    selectedNode,
    loadProjects,
    loadZones,
    loadProperties,
    loadFloors,
    loadBlocks,
    loadUnitsForFloor,
    loadUnitsForBlock,
    loadUnitsForProperty,
    loadAmenities,
    loadSurroundings,
    loadUnitTypes,
    loadPropertyViews,
    loadFeaturesByProperty,
    loadFeaturesByFloor,
  ]);

  const nextMockId = useCallback(
    (prefix) =>
      `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    [],
  );

  const handleSave = useCallback(
    async (id, type, data, selectedNodeForValidation) => {
      setIsSaving(true);
      try {
        const config = resourceConfigs[type];
        if (config?.validate) {
          const node =
            selectedNodeForValidation || nodes.find((n) => n.id === id);
          const propertyId = data?.propertyId || node?.data?.propertyId;
          const propertyNode = propertyId
            ? nodes.find((n) => n.id === propertyId)
            : null;
          const context = {
            selectedNode: node,
            nodes,
            parentProperty: propertyNode?.data ?? null,
          };
          try {
            config.validate(data, context);
          } catch (err) {
            toast.error(err?.message || "Validation failed");
            setIsSaving(false);
            return;
          }
        }

        let finalData = { ...data };
        if (USE_MOCK_DATA) {
          if (id) {
            const node = nodes.find((n) => n.id === id);
            const updated = { ...(node?.data ?? {}), ...data };
            const pid = node?.parentId;
            switch (type) {
              case ENTITY_TYPES.DEVELOPER:
                setDevelopers((prev) =>
                  prev.map((d) => (d.id === id ? { ...d, ...updated } : d)),
                );
                break;
              case ENTITY_TYPES.PROJECT:
                setProjectsByDeveloper((prev) => ({
                  ...prev,
                  [pid]: (prev[pid] ?? []).map((p) =>
                    p.id === id ? { ...p, ...updated } : p,
                  ),
                }));
                break;
              case ENTITY_TYPES.ZONE:
                setZonesByProject((prev) => ({
                  ...prev,
                  [pid]: (prev[pid] ?? []).map((z) =>
                    z.id === id ? { ...z, ...updated } : z,
                  ),
                }));
                break;
              case ENTITY_TYPES.PROPERTY:
                setPropertiesByZone((prev) => ({
                  ...prev,
                  [pid]: (prev[pid] ?? []).map((p) =>
                    p.id === id ? { ...p, ...updated } : p,
                  ),
                }));
                break;
              case ENTITY_TYPES.FLOOR:
                setFloorsByProperty((prev) => ({
                  ...prev,
                  [pid]: (prev[pid] ?? []).map((f) =>
                    f.id === id ? { ...f, ...updated } : f,
                  ),
                }));
                break;
              case ENTITY_TYPES.BLOCK:
                setBlocksByProperty((prev) => ({
                  ...prev,
                  [pid]: (prev[pid] ?? []).map((b) =>
                    b.id === id ? { ...b, ...updated } : b,
                  ),
                }));
                break;
              case ENTITY_TYPES.UNIT: {
                const u = updated;
                const upd = (arr) =>
                  arr?.map((x) => (x.id === id ? { ...x, ...u } : x)) ?? [];
                if (u.propertyId)
                  setUnitsByProperty((prev) => ({
                    ...prev,
                    [u.propertyId]: upd(prev[u.propertyId]),
                  }));
                if (u.floorId)
                  setUnitsByFloor((prev) => ({
                    ...prev,
                    [u.floorId]: upd(prev[u.floorId]),
                  }));
                if (u.blockId)
                  setUnitsByBlock((prev) => ({
                    ...prev,
                    [u.blockId]: upd(prev[u.blockId]),
                  }));
                break;
              }
              case ENTITY_TYPES.AMENITY:
                setAmenitiesByProject((prev) => ({
                  ...prev,
                  [pid]: (prev[pid] ?? []).map((a) =>
                    a.id === id ? { ...a, ...updated } : a,
                  ),
                }));
                break;
              case ENTITY_TYPES.SURROUNDING:
                setSurroundingsByProject((prev) => ({
                  ...prev,
                  [pid]: (prev[pid] ?? []).map((s) =>
                    s.id === id ? { ...s, ...updated } : s,
                  ),
                }));
                break;
              case ENTITY_TYPES.UNIT_TYPE:
                setUnitTypes((prev) =>
                  (prev ?? []).map((ut) =>
                    ut.id === id ? { ...ut, ...updated } : ut,
                  ),
                );
                break;
              case ENTITY_TYPES.PROPERTY_VIEW:
                setPropertyViewsByProperty((prev) => ({
                  ...prev,
                  [pid]: (prev[pid] ?? []).map((pv) =>
                    pv.id === id ? { ...pv, ...updated } : pv,
                  ),
                }));
                break;
              default:
                break;
            }
            setSelectedNode((prev) =>
              prev?.id === id ? { ...prev, data: updated } : prev,
            );
            toast.success("Updated (mock)");
          } else {
            const newId = nextMockId(type.toLowerCase());
            const entity = { id: newId, ...data };
            switch (type) {
              case ENTITY_TYPES.DEVELOPER:
                setDevelopers((prev) => [...prev, entity]);
                break;
              case ENTITY_TYPES.PROJECT:
                setProjectsByDeveloper((prev) => ({
                  ...prev,
                  [data.developerId]: [
                    ...(prev[data.developerId] ?? []),
                    entity,
                  ],
                }));
                break;
              case ENTITY_TYPES.ZONE:
                setZonesByProject((prev) => ({
                  ...prev,
                  [data.projectId]: [...(prev[data.projectId] ?? []), entity],
                }));
                break;
              case ENTITY_TYPES.PROPERTY:
                setPropertiesByZone((prev) => ({
                  ...prev,
                  [data.zoneId]: [...(prev[data.zoneId] ?? []), entity],
                }));
                break;
              case ENTITY_TYPES.FLOOR:
                setFloorsByProperty((prev) => ({
                  ...prev,
                  [data.propertyId]: [...(prev[data.propertyId] ?? []), entity],
                }));
                break;
              case ENTITY_TYPES.BLOCK:
                setBlocksByProperty((prev) => ({
                  ...prev,
                  [data.propertyId]: [...(prev[data.propertyId] ?? []), entity],
                }));
                break;
              case ENTITY_TYPES.UNIT:
                if (data.floorId)
                  setUnitsByFloor((prev) => ({
                    ...prev,
                    [data.floorId]: [...(prev[data.floorId] ?? []), entity],
                  }));
                else if (data.blockId)
                  setUnitsByBlock((prev) => ({
                    ...prev,
                    [data.blockId]: [...(prev[data.blockId] ?? []), entity],
                  }));
                if (data.propertyId)
                  setUnitsByProperty((prev) => ({
                    ...prev,
                    [data.propertyId]: [
                      ...(prev[data.propertyId] ?? []),
                      entity,
                    ],
                  }));
                break;
              case ENTITY_TYPES.AMENITY:
                setAmenitiesByProject((prev) => ({
                  ...prev,
                  [data.projectId]: [...(prev[data.projectId] ?? []), entity],
                }));
                break;
              case ENTITY_TYPES.SURROUNDING:
                setSurroundingsByProject((prev) => ({
                  ...prev,
                  [data.projectId]: [...(prev[data.projectId] ?? []), entity],
                }));
                break;
              case ENTITY_TYPES.UNIT_TYPE:
                setUnitTypes((prev) => [...(prev ?? []), entity]);
                break;
              case ENTITY_TYPES.PROPERTY_VIEW:
                setPropertyViewsByProperty((prev) => ({
                  ...prev,
                  [data.propertyId]: [...(prev[data.propertyId] ?? []), entity],
                }));
                break;
              default:
                break;
            }
            setExpandedIds(
              (prev) =>
                new Set(
                  [
                    ...prev,
                    data.developerId,
                    data.projectId,
                    data.zoneId,
                    data.propertyId,
                  ].filter(Boolean),
                ),
            );
            setSelectedNode(null);
            toast.success("Created (mock)");
          }
          return;
        }
        if (id) {
          switch (type) {
            case ENTITY_TYPES.DEVELOPER:
              await developerApi.update(id, finalData);
              await loadDevelopers();
              break;
            case ENTITY_TYPES.PROJECT:
              await projectApi.update(id, finalData);
              if (data.developerId) {
                loadedCache.current.projects.delete(data.developerId);
                await loadProjects(data.developerId);
              }
              break;
            case ENTITY_TYPES.ZONE:
              await zoneApi.update(id, finalData);
              if (data.projectId) {
                loadedCache.current.zones.delete(data.projectId);
                await loadZones(data.projectId);
              }
              break;
            case ENTITY_TYPES.PROPERTY:
              await propertyApi.update(id, finalData);
              if (data.zoneId) {
                loadedCache.current.properties.delete(data.zoneId);
                await loadProperties(data.zoneId);
              }
              break;
            case ENTITY_TYPES.FLOOR:
              await floorApi.update(id, finalData);
              if (data.propertyId) {
                loadedCache.current.floors.delete(data.propertyId);
                await loadFloors(data.propertyId);
              }
              break;
            case ENTITY_TYPES.BLOCK:
              await blockApi.update(id, finalData);
              if (data.propertyId) {
                loadedCache.current.blocks.delete(data.propertyId);
                await loadBlocks(data.propertyId);
              }
              break;
            case ENTITY_TYPES.UNIT: {
              const payload = normalizeUnitPayload(data);
              await unitApi.update(id, payload);
              if (payload.floorId) {
                loadedCache.current.unitsForFloor.delete(payload.floorId);
                await loadUnitsForFloor(payload.floorId);
              } else if (payload.blockId) {
                loadedCache.current.unitsForBlock.delete(payload.blockId);
                await loadUnitsForBlock(payload.blockId);
              } else if (payload.propertyId) {
                loadedCache.current.unitsForProperty.delete(payload.propertyId);
                await loadUnitsForProperty(payload.propertyId);
              }
              break;
            }
            case ENTITY_TYPES.AMENITY:
              await amenityApi.update(id, data);
              if (data.projectId) {
                loadedCache.current.amenities.delete(data.projectId);
                await loadAmenities(data.projectId);
              }
              break;
            case ENTITY_TYPES.SURROUNDING:
              await surroundingApi.update(id, data);
              if (data.projectId) {
                loadedCache.current.surroundings.delete(data.projectId);
                await loadSurroundings(data.projectId);
              }
              break;
            case ENTITY_TYPES.UNIT_TYPE: {
              const payload = normalizeUnitTypePayload(data);
              await unitTypeApi.update(id, payload);
              if (data.projectId) {
                loadedCache.current.unitTypes.delete(data.projectId);
                await loadUnitTypes(data.projectId);
              }
              break;
            }
            case ENTITY_TYPES.PROPERTY_VIEW:
              await propertyViewApi.update(id, finalData);
              if (data.propertyId) {
                loadedCache.current.propertyViews.delete(data.propertyId);
                await loadPropertyViews(data.propertyId);
              }
              break;
            case ENTITY_TYPES.FEATURE:
              await featureApi.update(id, finalData);
              if (data.propertyId) {
                loadedCache.current.featuresForProperty.delete(data.propertyId);
                await loadFeaturesByProperty(data.propertyId);
              }
              if (data.floorId) {
                loadedCache.current.featuresForFloor.delete(data.floorId);
                await loadFeaturesByFloor(data.floorId);
              }
              break;
            default:
              throw new Error("Unknown type");
          }
          toast.success("Updated successfully");
        } else {
          let created;
          switch (type) {
            case ENTITY_TYPES.DEVELOPER:
              created = await developerApi.create(finalData);
              await loadDevelopers();
              break;
            case ENTITY_TYPES.PROJECT:
              created = await projectApi.create(finalData);
              if (data.developerId) {
                loadedCache.current.projects.delete(data.developerId);
                loadProjects(data.developerId);
              }
              break;
            case ENTITY_TYPES.ZONE:
              created = await zoneApi.create(finalData);
              if (data.projectId) {
                loadedCache.current.zones.delete(data.projectId);
                loadZones(data.projectId);
              }
              break;
            case ENTITY_TYPES.PROPERTY:
              created = await propertyApi.create(finalData);
              if (data.zoneId) {
                loadedCache.current.properties.delete(data.zoneId);
                loadProperties(data.zoneId);
              }
              break;
            case ENTITY_TYPES.FLOOR:
              created = await floorApi.create(finalData);
              if (data.propertyId) {
                loadedCache.current.floors.delete(data.propertyId);
                loadFloors(data.propertyId);
              }
              break;
            case ENTITY_TYPES.BLOCK:
              created = await blockApi.create(finalData);
              if (data.propertyId) {
                loadedCache.current.blocks.delete(data.propertyId);
                loadBlocks(data.propertyId);
              }
              break;
            case ENTITY_TYPES.UNIT: {
              const payload = normalizeUnitPayload(data);
              created = await unitApi.create(payload);
              if (payload.floorId) {
                loadedCache.current.unitsForFloor.delete(payload.floorId);
                loadUnitsForFloor(payload.floorId);
              } else if (payload.blockId) {
                loadedCache.current.unitsForBlock.delete(payload.blockId);
                loadUnitsForBlock(payload.blockId);
              } else if (payload.propertyId) {
                loadedCache.current.unitsForProperty.delete(payload.propertyId);
                loadUnitsForProperty(payload.propertyId);
              }
              break;
            }
            case ENTITY_TYPES.AMENITY:
              created = await amenityApi.create(data);
              if (data.projectId) {
                loadedCache.current.amenities.delete(data.projectId);
                loadAmenities(data.projectId);
              }
              break;
            case ENTITY_TYPES.SURROUNDING:
              created = await surroundingApi.create(data);
              if (data.projectId) {
                loadedCache.current.surroundings.delete(data.projectId);
                loadSurroundings(data.projectId);
              }
              break;
            case ENTITY_TYPES.UNIT_TYPE: {
              const payload = normalizeUnitTypeFullPayload(data);
              created = await unitTypeApi.createFull(payload);
              if (data.projectId)
                loadedCache.current.unitTypes.delete(data.projectId);
              await loadUnitTypes(data.projectId);
              break;
            }
            case ENTITY_TYPES.PROPERTY_VIEW:
              created = await propertyViewApi.create(finalData);
              if (data.propertyId) {
                loadedCache.current.propertyViews.delete(data.propertyId);
                loadPropertyViews(data.propertyId);
              }
              break;
            case ENTITY_TYPES.FEATURE:
              created = await featureApi.create(finalData);
              if (data.propertyId) {
                loadedCache.current.featuresForProperty.delete(data.propertyId);
                loadFeaturesByProperty(data.propertyId);
              }
              if (data.floorId) {
                loadedCache.current.featuresForFloor.delete(data.floorId);
                loadFeaturesByFloor(data.floorId);
              }
              break;
            default:
              throw new Error("Unknown type");
          }
          toast.success("Created successfully");
          if (created?.id) {
            setExpandedIds(
              (prev) =>
                new Set(
                  [
                    ...prev,
                    data.developerId,
                    data.projectId,
                    data.zoneId,
                    data.propertyId,
                  ].filter(Boolean),
                ),
            );
            setSelectedNode(null);
          }
        }
      } catch (e) {
        console.error("Save error:", e);
        toast.error(e?.message || "Save failed. Please try again.");
      } finally {
        setIsSaving(false);
      }
    },
    [
      nodes,
      nextMockId,
      loadDevelopers,
      loadProjects,
      loadZones,
      loadProperties,
      loadFloors,
      loadBlocks,
      loadUnitsForFloor,
      loadUnitsForBlock,
      loadUnitsForProperty,
      loadAmenities,
      loadSurroundings,
      loadUnitTypes,
      loadPropertyViews,
      loadFeaturesByProperty,
      loadFeaturesByFloor,
    ],
  );

  const [injectedFieldUpdate, setInjectedFieldUpdate] = useState(null);
  const [formAssetIds, setFormAssetIds] = useState(null);
  const handleInjectedFieldConsumed = useCallback(
    () => setInjectedFieldUpdate(null),
    [],
  );

  useEffect(() => {
    setFormAssetIds(null);
  }, [selectedNode?.id]);

  useEffect(() => {
    if (
      !selectedNode ||
      selectedNode.type !== ENTITY_TYPES.UNIT_TYPE ||
      !selectedNode.id
    )
      return;
    const id = selectedNode.id;
    let cancelled = false;
    unitTypeApi
      .getById(id)
      .then((full) => {
        if (cancelled || !full) return;
        setUnitTypes((prev) =>
          (prev || []).map((ut) => (ut.id === id ? { ...ut, ...full } : ut)),
        );
        setSelectedNode((prev) =>
          prev && prev.id === id
            ? { ...prev, data: { ...prev.data, ...full } }
            : prev,
        );
      })
      .catch((err) => {
        if (!cancelled) console.error("Failed to load unit type details", err);
      });
    return () => {
      cancelled = true;
    };
    // Only re-fetch when unit type id changes, not when we merge full data into selectedNode
  }, [selectedNode?.type, selectedNode?.id]);

  const handleAssetClick = useCallback(
    (asset) => {
      if (!focusedAssetField || !selectedNode) return;
      const config = resourceConfigs[selectedNode.type];
      const fields = config?.fields;
      if (Array.isArray(fields)) {
        const field = fields.find(
          (f) =>
            f.name === focusedAssetField && f.control === CONTROL_TYPES.ASSET,
        );
        const allowed = field?.allowedTypes;
        if (allowed?.length) {
          const assetTypeNorm = (asset.type || "").toLowerCase();
          const allowedSet = new Set(
            allowed.map((t) => (t || "").toLowerCase()),
          );
          if (!allowedSet.has(assetTypeNorm)) {
            toast.error(
              `This asset type (${asset.type || "unknown"}) is not allowed for ${field.label || focusedAssetField}. Allowed: ${allowed.join(", ")}.`,
            );
            return;
          }
        }
      }
      setInjectedFieldUpdate({ key: focusedAssetField, value: asset.id });
      setFocusedAssetField(null);
      setTimeout(() => setInjectedFieldUpdate(null), 100);
    },
    [focusedAssetField, selectedNode],
  );

  const assetsMap = useMemo(() => {
    const map = {};
    allAssets.forEach((asset) => {
      if (asset.id) map[asset.id] = asset;
    });
    return map;
  }, [allAssets]);

  const assetPreviewUrls = useMemo(() => {
    const map = {};
    const config = selectedNode ? resourceConfigs[selectedNode.type] : null;
    const fields = config?.fields;
    const assetFields = Array.isArray(fields)
      ? fields.filter(
          (f) =>
            f.control === CONTROL_TYPES.ASSET ||
            f.control === CONTROL_TYPES.ASSET_ARRAY,
        )
      : [];
    const assetFieldNames = assetFields.length
      ? assetFields.map((f) => f.name)
      : [
          "introAssetId",
          "idleAssetId",
          "zoomoutAssetId",
          "thumbnailAssetId",
          "highlightAssetId",
          "forwardAssetId",
          "balconyAssetId",
          "amenitiesSideVideoId",
        ];
    const mockById =
      USE_MOCK_DATA && Array.isArray(mockAssets)
        ? Object.fromEntries((mockAssets ?? []).map((a) => [a.id, a.url]))
        : null;
    const nodeData = selectedNode?.data ?? {};
    const addId = (id) => {
      if (id) map[id] = mockById?.[id] ?? getAssetFileUrl(id);
    };
    const keysToConsider = new Set(assetFieldNames);
    Object.keys(formAssetIds || {}).forEach((k) => keysToConsider.add(k));
    keysToConsider.forEach((key) => {
      const val =
        formAssetIds?.[key] ??
        nodeData[key] ??
        (injectedFieldUpdate?.key === key
          ? injectedFieldUpdate?.value
          : undefined);
      if (Array.isArray(val)) val.forEach(addId);
      else addId(val);
    });
    return map;
  }, [selectedNode, mockAssets, injectedFieldUpdate, formAssetIds]);

  const acceptableTypesForField = useMemo(() => {
    if (!focusedAssetField || !selectedNode) return [];
    if (
      focusedAssetField.includes("furnitureImgId") ||
      focusedAssetField.includes("unfurnitureImgId")
    ) {
      return [AssetType.IMAGE, AssetType.THUMBNAIL];
    }
    const config = resourceConfigs[selectedNode.type];
    const fields = config?.fields;
    if (Array.isArray(fields)) {
      let field = fields.find(
        (f) =>
          f.name === focusedAssetField && f.control === CONTROL_TYPES.ASSET,
      );
      if (!field && focusedAssetField.includes("-")) {
        const baseName = focusedAssetField.replace(/-\d+$/, "");
        field = fields.find(
          (f) => f.name === baseName && f.control === CONTROL_TYPES.ASSET_ARRAY,
        );
      }
      if (field?.allowedTypes?.length) return field.allowedTypes;
    }
    return ASSET_TYPES;
  }, [focusedAssetField, selectedNode]);

  return (
    <Layout fullscreen={true}>
      <div className="h-screen flex flex-col bg-[#2C2C2C] relative">
        {isLoading && (
          <div className="absolute inset-0 bg-[#2C2C2C]/90 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg">Loading Dashboard...</p>
            </div>
          </div>
        )}

        <header className="bg-[#1C1C1C] border-b border-white/10 px-6 py-4 shrink-0 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white mx-auto">
              Admin Dashboard
            </h1>
            {selectedDeveloperId && (
              <span className="text-sm text-white/60">
                Developer:{" "}
                {developers.find((d) => d.id === selectedDeveloperId)?.name ||
                  "Selected"}
              </span>
            )}
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden min-h-0">
          <div className="w-80 shrink-0 flex flex-col overflow-hidden">
            <FlowTree
              nodes={nodes}
              selectedId={selectedNode?.id ?? null}
              expandedIds={expandedIds}
              onSelect={handleSelect}
              onToggle={handleToggle}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col overflow-hidden border-r border-white/10">
            {(() => {
              // Compute parent data for forms (e.g., parent PROJECT for AMENITY, SURROUNDING, ZONE)
              let parentData = null;
              if (selectedNode?.type === ENTITY_TYPES.AMENITY && selectedNode?.data?.projectId) {
                const projectId = selectedNode.data.projectId;
                // Search through all projects in projectsByDeveloper
                for (const devProjects of Object.values(projectsByDeveloper)) {
                  const project = devProjects?.find((p) => p.id === projectId);
                  if (project) {
                    parentData = project;
                    break;
                  }
                }
              } else if (selectedNode?.type === ENTITY_TYPES.SURROUNDING && selectedNode?.data?.projectId) {
                const projectId = selectedNode.data.projectId;
                // Search through all projects in projectsByDeveloper
                for (const devProjects of Object.values(projectsByDeveloper)) {
                  const project = devProjects?.find((p) => p.id === projectId);
                  if (project) {
                    parentData = project;
                    break;
                  }
                }
              } else if (selectedNode?.type === ENTITY_TYPES.ZONE && selectedNode?.data?.projectId) {
                const projectId = selectedNode.data.projectId;
                // Search through all projects in projectsByDeveloper
                for (const devProjects of Object.values(projectsByDeveloper)) {
                  const project = devProjects?.find((p) => p.id === projectId);
                  if (project) {
                    parentData = project;
                    break;
                  }
                }
              }

              return (
                <DynamicForm
                  selectedNode={selectedNode}
                  onSave={handleSave}
                  onCancel={() => { setSelectedNode(null); setFocusedAssetField(null); setIsFormDirty(false); }}
                  onDirtyChange={setIsFormDirty}
                  onFieldFocus={setFocusedAssetField}
                  focusedAssetField={focusedAssetField}
                  onAddChild={handleAdd}
                  assetPreviewUrls={assetPreviewUrls}
                  injectedFieldUpdate={injectedFieldUpdate}
                  onInjectedFieldConsumed={handleInjectedFieldConsumed}
                  onFormAssetIdsChange={setFormAssetIds}
                  unitTypes={unitTypes}
                  isSaving={isSaving}
                  assetsMap={assetsMap}
                  parentData={parentData}
                />
              );
            })()}
          </div>

          <div className="w-80 shrink-0 flex flex-col overflow-hidden">
            <AssetsLibrary
              focusedAssetField={focusedAssetField}
              onAssetClick={handleAssetClick}
              acceptableTypes={acceptableTypesForField}
              developerId={selectedDeveloperId}
              disabled={!selectedDeveloperId}
              mockAssets={USE_MOCK_DATA ? (mockAssets ?? []) : null}
              onAddMockAsset={
                USE_MOCK_DATA
                  ? (asset) => setMockAssets((prev) => [...(prev ?? []), asset])
                  : undefined
              }
            />
          </div>
        </div>

        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title={deleteTarget ? `Delete ${deleteTarget.type}?` : "Delete?"}
          description="This action cannot be undone."
          onConfirm={confirmDelete}
          isLoading={deleteLoading}
        />

        <ConfirmDialog
          open={leaveFormDialogOpen}
          onOpenChange={setLeaveFormDialogOpen}
          title="Switch without saving?"
          description="You have unsaved changes in the current form. If you switch now, your changes will be lost."
          cancelLabel="Stay"
          confirmLabel="Discard & switch"
          onCancel={() => setPendingSelectNode(null)}
          onConfirm={() => {
            const next = pendingSelectNode;
            setLeaveFormDialogOpen(false);
            setPendingSelectNode(null);
            setIsFormDirty(false);
            if (next) selectNode(next);
          }}
        />
      </div>
    </Layout>
  );
}
