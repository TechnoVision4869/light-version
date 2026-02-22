/**
 * Mock data for testing the admin dashboard without a backend.
 * Set USE_MOCK_DATA = true in AdminDashboard to use this data.
 */

const dev1 = "dev-mock-1";
const dev2 = "dev-mock-2";
const proj1 = "proj-mock-1";
const proj2 = "proj-mock-2";
const zone1 = "zone-mock-1";
const zone2 = "zone-mock-2";
const propVilla = "prop-villa-1";
const propTower = "prop-tower-1";
const propTown = "prop-town-1";
const floor1 = "floor-mock-1";
const floor2 = "floor-mock-2";
const block1 = "block-mock-1";
const block2 = "block-mock-2";

export const mockDevelopers = [
  {
    id: dev1,
    name: "Premium Developers Inc.",
    email: "info@premiumdev.com",
    specialization: "Luxury residential",
    bio: "Leading luxury real estate developer",
    isActive: true,
  },
  {
    id: dev2,
    name: "Skyline Holdings",
    email: "contact@skyline.com",
    specialization: "High-rise",
    bio: "Modern high-rise developments",
    isActive: true,
  },
];

export const mockProjects = [
  {
    id: proj1,
    developerId: dev1,
    name: "Grand Vista Residences",
  },
  {
    id: proj2,
    developerId: dev1,
    name: "Oceanview Towers",
  },
];

export const mockZones = [
  {
    id: zone1,
    projectId: proj1,
    name: "Phase 1 - North Quarter",
    subtitle: "Residential",
    description: "First development phase",
    x: 0.5,
    y: 0.3,
  },
  {
    id: zone2,
    projectId: proj1,
    name: "Phase 2 - Waterfront",
    subtitle: "Residential",
    description: "Waterfront phase",
    x: 0.6,
    y: 0.4,
  },
];

export const mockProperties = [
  {
    id: propVilla,
    zoneId: zone1,
    name: "Sunset Villa Collection",
    type: "VILLA",
    description: "Standalone luxury villas",
    x: 0.3,
    y: 0.45,
  },
  {
    id: propTower,
    zoneId: zone1,
    name: "Skyline Tower",
    type: "TOWER",
    description: "High-rise luxury apartments",
    x: 0.5,
    y: 0.2,
  },
  {
    id: propTown,
    zoneId: zone1,
    name: "Garden Townhouses",
    type: "TOWNHOUSE",
    description: "Modern townhouse community",
    x: 0.4,
    y: 0.55,
  },
];

export const mockFloors = [
  { id: floor1, propertyId: propTower, floorNumber: 10 },
  { id: floor2, propertyId: propTower, floorNumber: 15 },
];

export const mockBlocks = [
  {
    id: block1,
    propertyId: propTown,
    displayName: "Block A",
    x: 0.2,
    y: 0.3,
  },
  {
    id: block2,
    propertyId: propTown,
    displayName: "Block B",
    x: 0.5,
    y: 0.35,
  },
];

export const mockUnits = [
  {
    id: "unit-villa-1",
    propertyId: propVilla,
    floorId: null,
    blockId: null,
    unitCode: "V-A1",
    displayName: "Villa A1",
    bedrooms: 5,
    bathrooms: 4,
    area: 650,
    price: 2800000,
  },
  {
    id: "unit-villa-2",
    propertyId: propVilla,
    floorId: null,
    blockId: null,
    unitCode: "V-A2",
    displayName: "Villa A2",
    bedrooms: 4,
    bathrooms: 3,
    area: 520,
    price: 2600000,
  },
  {
    id: "unit-floor-1",
    propertyId: propTower,
    floorId: floor1,
    blockId: null,
    unitCode: "1001",
    displayName: "Unit 1001",
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    price: 480000,
  },
  {
    id: "unit-floor-2",
    propertyId: propTower,
    floorId: floor1,
    blockId: null,
    unitCode: "1002",
    displayName: "Unit 1002",
    bedrooms: 3,
    bathrooms: 2,
    area: 165,
    price: 620000,
  },
  {
    id: "unit-block-1",
    propertyId: propTown,
    floorId: null,
    blockId: block1,
    unitCode: "B-1",
    displayName: "Unit B-1",
    bedrooms: 3,
    bathrooms: 2,
    area: 220,
    price: 890000,
  },
  {
    id: "unit-block-2",
    propertyId: propTown,
    floorId: null,
    blockId: block1,
    unitCode: "B-2",
    displayName: "Unit B-2",
    bedrooms: 3,
    bathrooms: 2,
    area: 195,
    price: 850000,
  },
];

export const mockAmenities = [
  {
    id: "amenity-1",
    projectId: proj1,
    name: "Olympic Pool",
    subtitle: "Pool",
    description: "50m Olympic pool",
    x: 0.6,
    y: 0.35,
  },
  {
    id: "amenity-2",
    projectId: proj1,
    name: "Fitness Center",
    subtitle: "Gym",
    description: "24/7 fitness center",
    x: 0.55,
    y: 0.4,
  },
];

export const mockSurroundings = [
  {
    id: "surr-1",
    projectId: proj1,
    name: "Green Valley School",
    description: "International school",
    x: 0.2,
    y: 0.5,
    distance: "1.2 km",
  },
  {
    id: "surr-2",
    projectId: proj1,
    name: "City Mall",
    description: "Shopping and dining",
    x: 0.35,
    y: 0.25,
    distance: "3.5 km",
  },
];

export const mockAssets = [
  {
    id: "asset-1",
    assetKey: "villa-exterior",
    type: "image",
    tag: "Exterior",
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400",
    isActive: true,
  },
  {
    id: "asset-2",
    assetKey: "tower-exterior",
    type: "image",
    tag: "Exterior",
    url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
    isActive: true,
  },
  {
    id: "asset-3",
    assetKey: "living-room",
    type: "image",
    tag: "Interior",
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    isActive: true,
  },
  {
    id: "asset-4",
    assetKey: "pool",
    type: "image",
    tag: "Amenities",
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    isActive: true,
  },
  {
    id: "asset-5",
    assetKey: "villa-thumb",
    type: "thumbnail",
    tag: "Thumbnail",
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200",
    isActive: true,
  },
  {
    id: "asset-6",
    assetKey: "intro-video",
    type: "video",
    tag: "Video",
    url: "https://example.com/intro.mp4",
    isActive: true,
  },
];

/**
 * Build initial state shape for AdminDashboard when using mock data.
 */
export function getInitialMockState() {
  const projectsByDeveloper = {};
  mockProjects.forEach((p) => {
    if (!projectsByDeveloper[p.developerId]) projectsByDeveloper[p.developerId] = [];
    projectsByDeveloper[p.developerId].push(p);
  });

  const zonesByProject = {};
  mockZones.forEach((z) => {
    if (!zonesByProject[z.projectId]) zonesByProject[z.projectId] = [];
    zonesByProject[z.projectId].push(z);
  });

  const propertiesByZone = {};
  mockProperties.forEach((p) => {
    if (!propertiesByZone[p.zoneId]) propertiesByZone[p.zoneId] = [];
    propertiesByZone[p.zoneId].push(p);
  });

  const floorsByProperty = {};
  mockFloors.forEach((f) => {
    if (!floorsByProperty[f.propertyId]) floorsByProperty[f.propertyId] = [];
    floorsByProperty[f.propertyId].push(f);
  });

  const blocksByProperty = {};
  mockBlocks.forEach((b) => {
    if (!blocksByProperty[b.propertyId]) blocksByProperty[b.propertyId] = [];
    blocksByProperty[b.propertyId].push(b);
  });

  const unitsByProperty = {};
  const unitsByFloor = {};
  const unitsByBlock = {};
  mockUnits.forEach((u) => {
    if (u.propertyId) {
      if (!unitsByProperty[u.propertyId]) unitsByProperty[u.propertyId] = [];
      unitsByProperty[u.propertyId].push(u);
    }
    if (u.floorId) {
      if (!unitsByFloor[u.floorId]) unitsByFloor[u.floorId] = [];
      unitsByFloor[u.floorId].push(u);
    }
    if (u.blockId) {
      if (!unitsByBlock[u.blockId]) unitsByBlock[u.blockId] = [];
      unitsByBlock[u.blockId].push(u);
    }
  });

  const amenitiesByProject = {};
  mockAmenities.forEach((a) => {
    if (!amenitiesByProject[a.projectId]) amenitiesByProject[a.projectId] = [];
    amenitiesByProject[a.projectId].push(a);
  });

  const surroundingsByProject = {};
  mockSurroundings.forEach((s) => {
    if (!surroundingsByProject[s.projectId]) surroundingsByProject[s.projectId] = [];
    surroundingsByProject[s.projectId].push(s);
  });

  return {
    developers: [...mockDevelopers],
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
    assets: [...mockAssets],
  };
}
