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
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
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
  const [unitTypes, setUnitTypes] = useState(() => []);
  const [mockAssets, setMockAssets] = useState(
    () => initialMock?.assets ?? null,
  );
  const [allAssets, setAllAssets] = useState([]);

  const [selectedNode, setSelectedNode] = useState(null);
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
  }, [loadDevelopers]);

  const loadUnitTypes = useCallback(async () => {
    // if (USE_MOCK_DATA) return;
    try {
      const list = await unitTypeApi.getAll({ limit: 500 });
      setUnitTypes(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load unit types");
      setUnitTypes([]);
    }
  }, []);

  useEffect(() => {
    loadUnitTypes();
  }, [loadUnitTypes]);

  const loadAllAssets = useCallback(async () => {
    if (USE_MOCK_DATA) return;
    try {
      const list = await assetApi.list({ limit: 1000 });
      setAllAssets(Array.isArray(list) ? list : (list?.data ?? []));
    } catch (err) {
      console.error(err);
      setAllAssets([]);
    }
  }, []);

  useEffect(() => {
    loadAllAssets();
  }, [loadAllAssets]);

  const loadProjects = useCallback(
    async (developerId) => {
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
            if (pt === "TOWER") {
              (floorsByProperty[prop.id] ?? []).forEach((f) => {
                out.push({
                  id: f.id,
                  type: ENTITY_TYPES.FLOOR,
                  name: getDisplayName(f, ENTITY_TYPES.FLOOR),
                  parentId: prop.id,
                  data: { ...f, propertyId: f.propertyId || prop.id },
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
              (blocksByProperty[prop.id] ?? []).forEach((b) => {
                out.push({
                  id: b.id,
                  type: ENTITY_TYPES.BLOCK,
                  name: getDisplayName(b, ENTITY_TYPES.BLOCK),
                  parentId: prop.id,
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
  ]);

  const handleToggle = useCallback(
    (id) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        const node = nodes.find((n) => n.id === id);
        if (node && !next.has(id)) return next;
        if (node?.type === ENTITY_TYPES.DEVELOPER) loadProjects(id);
        if (node?.type === ENTITY_TYPES.PROJECT) {
          loadZones(id);
          loadAmenities(id);
          loadSurroundings(id);
        }
        if (node?.type === ENTITY_TYPES.ZONE) loadProperties(id);
        if (node?.type === ENTITY_TYPES.PROPERTY) {
          const pt = node.data?.type || node.data?.propertyType;
          if (pt === "TOWER") loadFloors(id);
          if (pt === "TOWNHOUSE") loadBlocks(id);
          if (pt === "VILLA") loadUnitsForProperty(id);
        }
        if (node?.type === ENTITY_TYPES.FLOOR) loadUnitsForFloor(id);
        if (node?.type === ENTITY_TYPES.BLOCK) loadUnitsForBlock(id);
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
    ],
  );

  const handleSelect = useCallback(
    (node) => {
      setSelectedNode(node);
      setFocusedAssetField(null);
      if (node?.type === ENTITY_TYPES.DEVELOPER) loadProjects(node.id);
      if (node?.type === ENTITY_TYPES.PROJECT) {
        loadZones(node.id);
        loadAmenities(node.id);
        loadSurroundings(node.id);
      }
      if (node?.type === ENTITY_TYPES.ZONE) loadProperties(node.id);
      if (node?.type === ENTITY_TYPES.PROPERTY) {
        const pt = node.data?.type || node.data?.propertyType;
        if (pt === "TOWER") loadFloors(node.id);
        if (pt === "TOWNHOUSE") loadBlocks(node.id);
        if (pt === "VILLA") loadUnitsForProperty(node.id);
      }
      if (node?.type === ENTITY_TYPES.FLOOR) loadUnitsForFloor(node.id);
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
    ],
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
      if (childType === ENTITY_TYPES.ZONE && parent)
        base.data = { projectId: parentId, name: "New Zone" };
      if (childType === ENTITY_TYPES.PROPERTY && parent)
        base.data = { zoneId: parentId, name: "New Property" };
      if (childType === ENTITY_TYPES.FLOOR && parent)
        base.data = { propertyId: parentId, floorNumber: 1 };
      if (childType === ENTITY_TYPES.BLOCK && parent)
        base.data = { propertyId: parentId, displayName: "New Block" };
      if (childType === ENTITY_TYPES.UNIT && parent) {
        base.data = {
          propertyId: parent?.data?.propertyId || parentId,
          unitCode: "NEW",
          displayName: "New Unit",
        };
        if (parent?.type === ENTITY_TYPES.FLOOR) base.data.floorId = parentId;
        if (parent?.type === ENTITY_TYPES.BLOCK) base.data.blockId = parentId;
      }
      if (childType === ENTITY_TYPES.AMENITY && parent)
        base.data = { projectId: parentId, name: "New Amenity" };
      if (childType === ENTITY_TYPES.SURROUNDING && parent)
        base.data = { projectId: parentId, name: "New Surrounding" };
      if (childType === ENTITY_TYPES.UNIT_TYPE)
        base.data = { projectId: parentId, name: "New Unit Type" };
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
        default:
          throw new Error("Unknown type");
      }
      toast.success("Deleted");
      setDeleteTarget(null);
      if (selectedNode?.id === deleteTarget.id) setSelectedNode(null);
      const pid = deleteTarget.parentId;
      if (deleteTarget.type === ENTITY_TYPES.UNIT_TYPE) loadUnitTypes();
      if (deleteTarget.type === ENTITY_TYPES.PROJECT && pid) loadProjects(pid);
      if (deleteTarget.type === ENTITY_TYPES.ZONE && pid) loadZones(pid);
      if (deleteTarget.type === ENTITY_TYPES.PROPERTY && pid)
        loadProperties(pid);
      if (deleteTarget.type === ENTITY_TYPES.FLOOR && pid) loadFloors(pid);
      if (deleteTarget.type === ENTITY_TYPES.BLOCK && pid) loadBlocks(pid);
      if (deleteTarget.type === ENTITY_TYPES.UNIT) {
        const p = deleteTarget.data;
        if (p?.floorId) loadUnitsForFloor(p.floorId);
        else if (p?.blockId) loadUnitsForBlock(p.blockId);
        else if (p?.propertyId) loadUnitsForProperty(p.propertyId);
      }
      if (deleteTarget.type === ENTITY_TYPES.AMENITY && pid) loadAmenities(pid);
      if (deleteTarget.type === ENTITY_TYPES.SURROUNDING && pid)
        loadSurroundings(pid);
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
              break;
            case ENTITY_TYPES.PROJECT:
              await projectApi.update(id, finalData);
              break;
            case ENTITY_TYPES.ZONE:
              await zoneApi.update(id, finalData);
              break;
            case ENTITY_TYPES.PROPERTY:
              await propertyApi.update(id, finalData);
              break;
            case ENTITY_TYPES.FLOOR:
              await floorApi.update(id, finalData);
              break;
            case ENTITY_TYPES.BLOCK:
              await blockApi.update(id, finalData);
              break;
            case ENTITY_TYPES.UNIT: {
              const payload = normalizeUnitPayload(data);
              await unitApi.update(id, payload);
              break;
            }
            case ENTITY_TYPES.AMENITY:
              await amenityApi.update(id, data);
              break;
            case ENTITY_TYPES.SURROUNDING:
              await surroundingApi.update(id, data);
              break;
            case ENTITY_TYPES.UNIT_TYPE: {
              const payload = normalizeUnitTypePayload(data);
              await unitTypeApi.update(id, payload);
              await loadUnitTypes();
              break;
            }
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
              if (data.developerId) loadProjects(data.developerId);
              break;
            case ENTITY_TYPES.ZONE:
              created = await zoneApi.create(finalData);
              if (data.projectId) loadZones(data.projectId);
              break;
            case ENTITY_TYPES.PROPERTY:
              created = await propertyApi.create(finalData);
              if (data.zoneId) loadProperties(data.zoneId);
              break;
            case ENTITY_TYPES.FLOOR:
              created = await floorApi.create(finalData);
              if (data.propertyId) loadFloors(data.propertyId);
              break;
            case ENTITY_TYPES.BLOCK:
              created = await blockApi.create(finalData);
              if (data.propertyId) loadBlocks(data.propertyId);
              break;
            case ENTITY_TYPES.UNIT: {
              const payload = normalizeUnitPayload(data);
              created = await unitApi.create(payload);
              if (payload.floorId) loadUnitsForFloor(payload.floorId);
              else if (payload.blockId) loadUnitsForBlock(payload.blockId);
              else if (payload.propertyId)
                loadUnitsForProperty(payload.propertyId);
              break;
            }
            case ENTITY_TYPES.AMENITY:
              created = await amenityApi.create(data);
              if (data.projectId) loadAmenities(data.projectId);
              break;
            case ENTITY_TYPES.SURROUNDING:
              created = await surroundingApi.create(data);
              if (data.projectId) loadSurroundings(data.projectId);
              break;
            case ENTITY_TYPES.UNIT_TYPE: {
              const payload = normalizeUnitTypeFullPayload(data);
              created = await unitTypeApi.createFull(payload);
              await loadUnitTypes();
              break;
            }
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
            <DynamicForm
              selectedNode={selectedNode}
              onSave={handleSave}
              onCancel={() => setFocusedAssetField(null)}
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
            />
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

        <ConfirmDeleteDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title={deleteTarget ? `Delete ${deleteTarget.type}?` : "Delete?"}
          description="This action cannot be undone."
          onConfirm={confirmDelete}
          isLoading={deleteLoading}
        />
      </div>
    </Layout>
  );
}
