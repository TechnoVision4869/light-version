// see comments bellow

const PROJECT_MIX = {
  project: {
    id: "mix",
    name: "Mix",
    developerId: "developer-id"
  },

  zones: {
    zone1: {
      id: "zone1",
      projectId: "mix",
      displayName: "Towers",
      subtitle: "Zone",
      thumbnail: "thumbnails/zones/zone1.png",
      description: "Our towers hold different apartments options. They are at the center of the city."
    },
    zone2: {
      id: "zone2",
      projectId: "mix",
      displayName: "Towers",
      subtitle: "Zone",
      thumbnail: "thumbnails/zones/zone2.png",
      description: "Our towers hold different apartments options. They are at the center of the city."
    }
  },

  towers: {
    tower1: { id: "tower1", displayName: "Tower 1", floorsNumber: 2, description: "Tower 1 description...", position: { x: 0.45, y: 0.53 } },
    tower2: { id: "tower2", displayName: "Tower 2", floorsNumber: 2, description: "Tower 2 description...", position: { x: 0.65, y: 0.35 } },
    tower5: { id: "tower5", displayName: "Tower 5", floorsNumber: 2, description: "Tower 5 description...", position: { x: 0.35, y: 0.12 } }
  },

  unitTypes: {
    // Type A: 2B1B, 85m² — e.g., apartment101, 113, 222
    "unit-type-a": {
      id: "unit-type-a",
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/images/v1.svg" }, { id: "gallery2", src: "/images/v2.svg" }, { id: "gallery3", src: "/images/v3.svg" }, { id: "gallery4", src: "/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/images/c1.png" }, { id: "cut2", src: "/images/c2.png" }, { id: "cut3", src: "/images/c3.png" }, { id: "cut4", src: "/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: {
        floors: [{
          id: "floor1",
          rooms: [
            { id: "room1", displayName: "Livingroom", image: "/panorama/livingroom.png", description: "A spacious livingroom...", hotspots: [{ id: 'spot1', yaw: 25, pitch: -5, type: 'scene', label: "Bedroom" }, { id: 'spot2', yaw: 25, pitch: 5, type: 'scene', label: "Master Bedroom" }, { id: 'spot3', yaw: 0, pitch: 0, type: 'scene', label: "Dinning and Kitchen" }] },
            { id: "room2", displayName: "Dinning and Kitchen", image: "/panorama/dinning_kitchen.png", hotspots: [{ id: 'spot1', yaw: -65, pitch: -25, type: 'scene', label: "Livingroom" }, { id: 'spot2', yaw: 83, pitch: 0, type: 'scene', label: "Bedroom" }, { id: 'spot3', yaw: 83, pitch: -10, type: 'scene', label: "Master Bedroom" }] },
            { id: "room3", displayName: "Bedroom", image: "/panorama/bedroom.png", hotspots: [{ id: 'spot1', yaw: -105, pitch: -10, type: 'scene', label: "Livingroom" }] },
            { id: "room4", displayName: "Master Bedroom", image: "/panorama/master_bedroom.png", hotspots: [{ id: 'spot1', yaw: -115, pitch: -5, type: 'scene', label: "Livingroom" }, { id: 'spot2', yaw: -115, pitch: -15, type: 'scene', label: "Bathroom" }] },
            { id: "room5", displayName: "Bathroom", image: "/panorama/bathroom.png", hotspots: [{ id: 'spot1', yaw: -3, pitch: 0, type: 'scene', label: "Master Bedroom" }] }
          ]
        }]
      }
    },

    // Type B: 4B2B, 200–250m² — e.g., apartment102, 105, 206, 115
    "unit-type-b": {
      id: "unit-type-b",
      bedrooms: 4,
      bathrooms: 2,
      area: 200,
      serviceRooms: ["Nanny's Room", "Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/images/v1.svg" }, { id: "gallery2", src: "/images/v2.svg" }, { id: "gallery3", src: "/images/v3.svg" }, { id: "gallery4", src: "/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/images/c1.png" }, { id: "cut2", src: "/images/c2.png" }, { id: "cut3", src: "/images/c3.png" }, { id: "cut4", src: "/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: {
        floors: [{
          id: "floor1",
          rooms: [
            { id: "room1", displayName: "Livingroom", image: "/panorama/livingroom.png", hotspots: [{ id: 'spot1', yaw: 25, pitch: -5, type: 'scene', label: "Bedroom" }, { id: 'spot2', yaw: 25, pitch: 5, type: 'scene', label: "Master Bedroom" }, { id: 'spot3', yaw: 0, pitch: 0, type: 'scene', label: "Dinning and Kitchen" }] },
            // ... (same room structure as Type A — from your data)
            { id: "room2", displayName: "Dinning and Kitchen", image: "/panorama/dinning_kitchen.png", hotspots: [{ id: 'spot1', yaw: -65, pitch: -25, type: 'scene', label: "Livingroom" }, { id: 'spot2', yaw: 83, pitch: 0, type: 'scene', label: "Bedroom" }, { id: 'spot3', yaw: 83, pitch: -10, type: 'scene', label: "Master Bedroom" }] },
            { id: "room3", displayName: "Bedroom", image: "/panorama/bedroom.png", hotspots: [{ id: 'spot1', yaw: -105, pitch: -10, type: 'scene', label: "Livingroom" }] },
            { id: "room4", displayName: "Master Bedroom", image: "/panorama/master_bedroom.png", hotspots: [{ id: 'spot1', yaw: -115, pitch: -5, type: 'scene', label: "Livingroom" }, { id: 'spot2', yaw: -115, pitch: -15, type: 'scene', label: "Bathroom" }] },
            { id: "room5", displayName: "Bathroom", image: "/panorama/bathroom.png", hotspots: [{ id: 'spot1', yaw: -3, pitch: 0, type: 'scene', label: "Master Bedroom" }] }
          ]
        }]
      }
    },

    // Type C: 2B2B, 120–125m² — e.g., apartment103, 202, 203, 112, 223
    "unit-type-c": {
      id: "unit-type-c",
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/images/v1.svg" }, { id: "gallery2", src: "/images/v2.svg" }, { id: "gallery3", src: "/images/v3.svg" }, { id: "gallery4", src: "/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/images/c1.png" }, { id: "cut2", src: "/images/c2.png" }, { id: "cut3", src: "/images/c3.png" }, { id: "cut4", src: "/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: { /* same as Type A */ }
    },

    // Type D: 3B2B, 145–185m² — e.g., apartment104, 205, 114, 225
    "unit-type-d": {
      id: "unit-type-d",
      bedrooms: 3,
      bathrooms: 2,
      area: 185,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/images/v1.svg" }, { id: "gallery2", src: "/images/v2.svg" }, { id: "gallery3", src: "/images/v3.svg" }, { id: "gallery4", src: "/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/images/c1.png" }, { id: "cut2", src: "/images/c2.png" }, { id: "cut3", src: "/images/c3.png" }, { id: "cut4", src: "/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: { /* same as Type A */ }
    },

    // Type E: 2B1B, 115m², floor 2 — e.g., apartment201, 204, 224
    "unit-type-e": {
      id: "unit-type-e",
      bedrooms: 2,
      bathrooms: 1,
      area: 115,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/images/v1.svg" }, { id: "gallery2", src: "/images/v2.svg" }, { id: "gallery3", src: "/images/v3.svg" }, { id: "gallery4", src: "/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/images/c1.png" }, { id: "cut2", src: "/images/c2.png" }, { id: "cut3", src: "/images/c3.png" }, { id: "cut4", src: "/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: { /* same as Type A */ }
    },

    // Type F: 2B2B, 150m² — apartment112
    "unit-type-f": {
      id: "unit-type-f",
      bedrooms: 2,
      bathrooms: 2,
      area: 150,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/images/v1.svg" }, { id: "gallery2", src: "/images/v2.svg" }, { id: "gallery3", src: "/images/v3.svg" }, { id: "gallery4", src: "/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/images/c1.png" }, { id: "cut2", src: "/images/c2.png" }, { id: "cut3", src: "/images/c3.png" }, { id: "cut4", src: "/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: { /* same as Type A */ }
    },

    // Type G: 2B1B, 140m² — apartment111
    "unit-type-g": {
      id: "unit-type-g",
      bedrooms: 2,
      bathrooms: 1,
      area: 140,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/images/v1.svg" }, { id: "gallery2", src: "/images/v2.svg" }, { id: "gallery3", src: "/images/v3.svg" }, { id: "gallery4", src: "/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/images/c1.png" }, { id: "cut2", src: "/images/c2.png" }, { id: "cut3", src: "/images/c3.png" }, { id: "cut4", src: "/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: { /* same as Type A */ }
    },

    // Type H: 2B1B, 185m² — apartment221
    "unit-type-h": {
      id: "unit-type-h",
      bedrooms: 2,
      bathrooms: 1,
      area: 185,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/images/v1.svg" }, { id: "gallery2", src: "/images/v2.svg" }, { id: "gallery3", src: "/images/v3.svg" }, { id: "gallery4", src: "/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/images/c1.png" }, { id: "cut2", src: "/images/c2.png" }, { id: "cut3", src: "/images/c3.png" }, { id: "cut4", src: "/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: { /* same as Type A */ }
    }
  },

  units: [
    // Tower 1, Floor 1
    { id: "apartment101", projectId: "mix", zoneId: "zone1", containerId: "tower1", containerType: "tower", unitTypeId: "unit-type-a", floorNumber: 1, displayName: "A101", price: 250000, area: 85, bedrooms: 2, bathrooms: 1, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.40, y: 0.60 } },
    { id: "apartment102", projectId: "mix", zoneId: "zone1", containerId: "tower1", containerType: "tower", unitTypeId: "unit-type-b", floorNumber: 1, displayName: "A102", price: 400000, area: 200, bedrooms: 4, bathrooms: 2, serviceRooms: ["Nanny's Room", "Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.25, y: 0.4 } },
    { id: "apartment103", projectId: "mix", zoneId: "zone1", containerId: "tower1", containerType: "tower", unitTypeId: "unit-type-c", floorNumber: 1, displayName: "A103", price: 300000, area: 120, bedrooms: 2, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.438, y: 0.3 } },
    { id: "apartment104", projectId: "mix", zoneId: "zone1", containerId: "tower1", containerType: "tower", unitTypeId: "unit-type-d", floorNumber: 1, displayName: "A104", price: 350000, area: 185, bedrooms: 3, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.65, y: 0.33 } },
    { id: "apartment105", projectId: "mix", zoneId: "zone1", containerId: "tower1", containerType: "tower", unitTypeId: "unit-type-b", floorNumber: 1, displayName: "A105", price: 500000, area: 250, bedrooms: 4, bathrooms: 2, serviceRooms: ["Nanny's Room", "Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.7, y: 0.65 } },

    // Tower 1, Floor 2
    { id: "apartment201", projectId: "mix", zoneId: "zone1", containerId: "tower1", containerType: "tower", unitTypeId: "unit-type-e", floorNumber: 2, displayName: "A201", price: 275000, area: 115, bedrooms: 2, bathrooms: 1, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.4, y: 0.64 } },
    { id: "apartment202", projectId: "mix", zoneId: "zone1", containerId: "tower1", containerType: "tower", unitTypeId: "unit-type-c", floorNumber: 2, displayName: "A202", price: 300000, area: 125, bedrooms: 2, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.22, y: 0.55 } },
    { id: "apartment203", projectId: "mix", zoneId: "zone1", containerId: "tower1", containerType: "tower", unitTypeId: "unit-type-c", floorNumber: 2, displayName: "A203", price: 300000, area: 125, bedrooms: 2, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.225, y: 0.23 } },
    { id: "apartment204", projectId: "mix", zoneId: "zone1", containerId: "tower1", containerType: "tower", unitTypeId: "unit-type-e", floorNumber: 2, displayName: "A204", price: 275000, area: 115, bedrooms: 2, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.42, y: 0.25 } },
    { id: "apartment205", projectId: "mix", zoneId: "zone1", containerId: "tower1", containerType: "tower", unitTypeId: "unit-type-d", floorNumber: 2, displayName: "A205", price: 325000, area: 145, bedrooms: 3, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.65, y: 0.25 } },
    { id: "apartment206", projectId: "mix", zoneId: "zone1", containerId: "tower1", containerType: "tower", unitTypeId: "unit-type-b", floorNumber: 2, displayName: "A206", price: 400000, area: 200, bedrooms: 4, bathrooms: 2, serviceRooms: ["Nanny's Room", "Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.67, y: 0.65 } },

    // Tower 2, Floor 1
    { id: "apartment111", projectId: "mix", zoneId: "zone1", containerId: "tower2", containerType: "tower", unitTypeId: "unit-type-g", floorNumber: 1, displayName: "A111", price: 260000, area: 140, bedrooms: 2, bathrooms: 1, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.4, y: 0.58 } },
    { id: "apartment112", projectId: "mix", zoneId: "zone1", containerId: "tower2", containerType: "tower", unitTypeId: "unit-type-f", floorNumber: 1, displayName: "A-112", price: 325000, area: 150, bedrooms: 2, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.21, y: 0.43 } },
    { id: "apartment113", projectId: "mix", zoneId: "zone1", containerId: "tower2", containerType: "tower", unitTypeId: "unit-type-a", floorNumber: 1, displayName: "A113", price: 240000, area: 85, bedrooms: 2, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.23, y: 0.2 } },
    { id: "apartment114", projectId: "mix", zoneId: "zone1", containerId: "tower2", containerType: "tower", unitTypeId: "unit-type-d", floorNumber: 1, displayName: "A114", price: 375000, area: 185, bedrooms: 3, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.6, y: 0.25 } },
    { id: "apartment115", projectId: "mix", zoneId: "zone1", containerId: "tower2", containerType: "tower", unitTypeId: "unit-type-b", floorNumber: 1, displayName: "A115", price: 450000, area: 220, bedrooms: 4, bathrooms: 2, serviceRooms: ["Nanny's Room", "Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.7, y: 0.65 } },

    // Tower 2, Floor 2
    { id: "apartment221", projectId: "mix", zoneId: "zone1", containerId: "tower2", containerType: "tower", unitTypeId: "unit-type-h", floorNumber: 2, displayName: "A221", price: 275000, area: 185, bedrooms: 2, bathrooms: 1, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.2, y: 0.4 } },
    { id: "apartment222", projectId: "mix", zoneId: "zone1", containerId: "tower2", containerType: "tower", unitTypeId: "unit-type-a", floorNumber: 2, displayName: "A222", price: 240000, area: 85, bedrooms: 2, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.24, y: 0.2 } },
    { id: "apartment223", projectId: "mix", zoneId: "zone1", containerId: "tower2", containerType: "tower", unitTypeId: "unit-type-c", floorNumber: 2, displayName: "A223", price: 300000, area: 125, bedrooms: 2, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.475, y: 0.24 } },
    { id: "apartment224", projectId: "mix", zoneId: "zone1", containerId: "tower2", containerType: "tower", unitTypeId: "unit-type-e", floorNumber: 2, displayName: "A-224", price: 275000, area: 115, bedrooms: 2, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.715, y: 0.21 } },
    { id: "apartment225", projectId: "mix", zoneId: "zone1", containerId: "tower2", containerType: "tower", unitTypeId: "unit-type-d", floorNumber: 2, displayName: "A225", price: 325000, area: 145, bedrooms: 3, bathrooms: 2, serviceRooms: ["Hard Kitchen"], balconyView: "/panorama/balcony.jpg", position: { x: 0.55, y: 0.5 } }
  ]
};

// Developer
//  └── Project
//       ├── Zone
//       │    └── Unit
//       │         ├── UnitType (shared)
//       │         └── Container (Tower/Villa/Townhouse)

/***
 Every sellable Unit belongs to:
 * a zoneId → for marketing segmentation (sea, lagoon, park, etc.).
 * a containerId → its container (tower, villa, or townhouse).
 * a unitTypeId → its shared interior/gallery/floorplan.

 This creates a three-level contextual hierarchy, but data remains
 flat and lookup is always O(1):
 ***/