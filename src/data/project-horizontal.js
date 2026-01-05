const PROJECT_HORIZONTAL = {
  project: {
    id: "horizontal",
    name: "Horizontal",
    developerId: "developer-id"
  },

  zones: [
    {
      id: "zone1",
      projectId: "horizontal",
      displayName: "Villas & Townhouses",
      subtitle: "Residential Zone",
      description: "A serene community of luxury villas and modern townhouses nestled in nature."
    }
  ],

  buildings: [
    {
      id: "villa1",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "villa",
      displayName: "Villa 1",
      totalFloors: 3, // interior floors (not for filtering)
      position: { x: 0.1, y: 0.3 },
      description: "Luxury 4-bedroom villa with rooftop lounge.",
    },
    {
      id: "villa2",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "villa",
      displayName: "Villa 2",
      totalFloors: 3,
      position: { x: 0.2, y: 0.3 },
      description: "Luxury 4-bedroom villa with rooftop lounge.",
    },
    {
      id: "villa3",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "villa",
      displayName: "Villa 3",
      totalFloors: 3,
      position: { x: 0.3, y: 0.3 },
      description: "Luxury 4-bedroom villa with rooftop lounge.",
    },
    {
      id: "villa4",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "villa",
      displayName: "Villa 4",
      totalFloors: 3,
      position: { x: 0.4, y: 0.3 },
      description: "Luxury 4-bedroom villa with rooftop lounge.",
    },
    {
      id: "villa5",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "villa",
      displayName: "Villa 5",
      totalFloors: 3,
      position: { x: 0.1, y: 0.5 },
      description: "Luxury 4-bedroom villa with rooftop lounge.",
    },
    {
      id: "villa6",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "villa",
      displayName: "Villa 6",
      totalFloors: 3,
      position: { x: 0.2, y: 0.5 },
      description: "Luxury 4-bedroom villa with rooftop lounge.",
    },
    {
      id: "villa7",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "villa",
      displayName: "Villa 7",
      totalFloors: 3,
      position: { x: 0.3, y: 0.5 },
      description: "Luxury 4-bedroom villa with rooftop lounge.",
    },
    {
      id: "villa8",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "villa",
      displayName: "Villa 8",
      totalFloors: 3,
      position: { x: 0.4, y: 0.5 },
      description: "Luxury 4-bedroom villa with rooftop lounge.",
    },
    {
      id: "townhouse1",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "townhouse",
      displayName: "Townhouse A",
      totalFloors: 3,
      position: { x: 0.6, y: 0.25 },
      description: "Modern 3-story townhouse with private balcony.",
    },
    {
      id: "townhouse2",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "townhouse",
      displayName: "Townhouse B",
      totalFloors: 3,
      position: { x: 0.75, y: 0.25 },
      description: "Modern 3-story townhouse with private balcony.",
    },
    {
      id: "townhouse3",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "townhouse",
      displayName: "Townhouse C",
      totalFloors: 3,
      position: { x: 0.9, y: 0.25 },
      description: "Modern 3-story townhouse with private balcony.",
    }
  ],

  floors: [
    // Townhouse 1
    { id: "townhouse1-floor1", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse1", floorNumber: 1, type: "Residential", displayName: "Floor 1", description: "Ground floor with kitchen and living area.", x: 0.1, y: 0.1, },
    { id: "townhouse1-floor2", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse1", floorNumber: 2, type: "Residential", displayName: "Floor 2", description: "Bedrooms and bathrooms.", x: 0.1, y: 0.1, },
    { id: "townhouse1-floor3", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse1", floorNumber: 3, type: "Residential", displayName: "Floor 3", description: "Master suite with rooftop access.", x: 0.1, y: 0.1, },

    // Townhouse 2
    { id: "townhouse2-floor1", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse2", floorNumber: 1, type: "Residential", displayName: "Floor 1", description: "Ground floor with kitchen and living area.", x: 0.1, y: 0.1, },
    { id: "townhouse2-floor2", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse2", floorNumber: 2, type: "Residential", displayName: "Floor 2", description: "Bedrooms and bathrooms.", x: 0.1, y: 0.1, },
    { id: "townhouse2-floor3", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse2", floorNumber: 3, type: "Residential", displayName: "Floor 3", description: "Master suite with rooftop access.", x: 0.1, y: 0.1, },

    // Townhouse 3
    { id: "townhouse3-floor1", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse3", floorNumber: 1, type: "Residential", displayName: "Floor 1", description: "Ground floor with kitchen and living area.", x: 0.1, y: 0.1, },
    { id: "townhouse3-floor2", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse3", floorNumber: 2, type: "Residential", displayName: "Floor 2", description: "Bedrooms and bathrooms.", x: 0.1, y: 0.1, },
    { id: "townhouse3-floor3", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse3", floorNumber: 3, type: "Residential", displayName: "Floor 3", description: "Master suite with rooftop access.", x: 0.1, y: 0.1, }
  ],

  unitTypes: {
    // Villa type — 3 interior floors
    "villa-luxury-4br": {
      id: "villa-luxury-4br",
      bedrooms: 4,
      bathrooms: 3,
      area: 320,
      serviceRooms: ["Maid's Room", "Hard Kitchen", "Storage"],
      gallery: [{ id: "v1", src: "/images/villa-ext1.jpg" }, { id: "v2", src: "/images/villa-ext2.jpg" }],
      cutSections: [{ id: "c1", src: "/images/villa-section.png" }],
      floorPlans: [{ id: "fp1", src: "/images/villa-fp.png" }],
      paymentPlans: [{ downPayment: 8000000, monthly: 800000, years: 10 }, { downPayment: 5000000, monthly: 500000, years: 20 }],
      interior: {
        floors: [
          {
            id: "ground",
            rooms: [
              { id: "gr-living", displayName: "Living Room", image: "/panorama/villa/gr-living.jpg", hotspots: [{ id: "hp1", yaw: 30, pitch: 0, type: "scene", label: "Kitchen" }, { id: "hp2", yaw: 180, pitch: -5, type: "scene", label: "Garden" }] },
              { id: "gr-kitchen", displayName: "Kitchen", image: "/panorama/villa/gr-kitchen.jpg", hotspots: [{ id: "hp1", yaw: -90, pitch: 0, type: "scene", label: "Living Room" }] }
            ]
          },
          {
            id: "first",
            rooms: [
              { id: "f1-master", displayName: "Master Bedroom", image: "/panorama/villa/f1-master.jpg", hotspots: [{ id: "hp1", yaw: 0, pitch: 0, type: "scene", label: "Bathroom" }] },
              { id: "f1-bed2", displayName: "Bedroom 2", image: "/panorama/villa/f1-bed2.jpg", hotspots: [] }
            ]
          },
          {
            id: "roof",
            rooms: [
              { id: "roof-lounge", displayName: "Rooftop Lounge", image: "/panorama/villa/roof-lounge.jpg", hotspots: [{ id: "hp1", yaw: 90, pitch: 10, type: "scene", label: "Garden View" }] }
            ]
          }
        ]
      }
    },

    // Townhouse Floor 1 type
    "townhouse-floor1": {
      id: "townhouse-floor1",
      bedrooms: 2,
      bathrooms: 2,
      area: 110,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "t1", src: "/images/townhouse-ext.jpg" }],
      cutSections: [{ id: "c1", src: "/images/townhouse-section.png" }],
      floorPlans: [{ id: "fp1", src: "/images/townhouse-fp.png" }],
      paymentPlans: [{ downPayment: 3000000, monthly: 300000, years: 10 }],
      interior: {
        floors: [{
          id: "main",
          rooms: [
            { id: "th-living", displayName: "Living Area", image: "/panorama/townhouse/living.jpg", hotspots: [{ id: "hp1", yaw: 45, pitch: 0, type: "scene", label: "Kitchen" }, { id: "hp2", yaw: 135, pitch: -5, type: "scene", label: "Balcony" }] },
            { id: "th-kitchen", displayName: "Kitchen", image: "/panorama/townhouse/kitchen.jpg", hotspots: [{ id: "hp1", yaw: -120, pitch: 0, type: "scene", label: "Living Area" }] },
            { id: "th-master", displayName: "Master Bedroom", image: "/panorama/townhouse/master.jpg", hotspots: [{ id: "hp1", yaw: 0, pitch: 0, type: "scene", label: "Bathroom" }] },
            { id: "th-bed2", displayName: "Bedroom 2", image: "/panorama/townhouse/bed2.jpg", hotspots: [] }
          ]
        }]
      }
    },

    // Townhouse Floor 2 type
    "townhouse-floor2": {
      id: "townhouse-floor2",
      bedrooms: 2,
      bathrooms: 2,
      area: 110,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "t1", src: "/images/townhouse-ext.jpg" }],
      cutSections: [{ id: "c1", src: "/images/townhouse-section.png" }],
      floorPlans: [{ id: "fp1", src: "/images/townhouse-fp.png" }],
      paymentPlans: [{ downPayment: 3000000, monthly: 300000, years: 10 }],
      interior: { /* same as floor1 or customize */ }
    },

    // Townhouse Floor 3 type
    "townhouse-floor3": {
      id: "townhouse-floor3",
      bedrooms: 2,
      bathrooms: 2,
      area: 110,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "t1", src: "/images/townhouse-ext.jpg" }],
      cutSections: [{ id: "c1", src: "/images/townhouse-section.png" }],
      floorPlans: [{ id: "fp1", src: "/images/townhouse-fp.png" }],
      paymentPlans: [{ downPayment: 3000000, monthly: 300000, years: 10 }],
      interior: { /* same or with rooftop access */ }
    }
  },

  units: [
    // 8 Villas
    { id: "villa1", projectId: "horizontal", zoneId: "zone1", buildingId: "villa1", buildingType: "villa", unitTypeId: "villa-luxury-4br", price: 2200000, area: 320, bedrooms: 4, bathrooms: 3, balconyView: "/panorama/villa/balcony.jpg", position: { x: 0.1, y: 0.3 } },
    { id: "villa2", projectId: "horizontal", zoneId: "zone1", buildingId: "villa2", buildingType: "villa", unitTypeId: "villa-luxury-4br", price: 2200000, area: 320, bedrooms: 4, bathrooms: 3, balconyView: "/panorama/villa/balcony.jpg", position: { x: 0.2, y: 0.3 } },
    { id: "villa3", projectId: "horizontal", zoneId: "zone1", buildingId: "villa3", buildingType: "villa", unitTypeId: "villa-luxury-4br", price: 2200000, area: 320, bedrooms: 4, bathrooms: 3, balconyView: "/panorama/villa/balcony.jpg", position: { x: 0.2, y: 0.3 } },
    { id: "villa4", projectId: "horizontal", zoneId: "zone1", buildingId: "villa4", buildingType: "villa", unitTypeId: "villa-luxury-4br", price: 2200000, area: 320, bedrooms: 4, bathrooms: 3, balconyView: "/panorama/villa/balcony.jpg", position: { x: 0.2, y: 0.3 } },
    { id: "villa5", projectId: "horizontal", zoneId: "zone1", buildingId: "villa5", buildingType: "villa", unitTypeId: "villa-luxury-4br", price: 2200000, area: 320, bedrooms: 4, bathrooms: 3, balconyView: "/panorama/villa/balcony.jpg", position: { x: 0.2, y: 0.3 } },
    { id: "villa6", projectId: "horizontal", zoneId: "zone1", buildingId: "villa6", buildingType: "villa", unitTypeId: "villa-luxury-4br", price: 2200000, area: 320, bedrooms: 4, bathrooms: 3, balconyView: "/panorama/villa/balcony.jpg", position: { x: 0.2, y: 0.3 } },
    { id: "villa7", projectId: "horizontal", zoneId: "zone1", buildingId: "villa7", buildingType: "villa", unitTypeId: "villa-luxury-4br", price: 2200000, area: 320, bedrooms: 4, bathrooms: 3, balconyView: "/panorama/villa/balcony.jpg", position: { x: 0.2, y: 0.3 } },
    { id: "villa8", projectId: "horizontal", zoneId: "zone1", buildingId: "villa8", buildingType: "villa", unitTypeId: "villa-luxury-4br", price: 2200000, area: 320, bedrooms: 4, bathrooms: 3, balconyView: "/panorama/villa/balcony.jpg", position: { x: 0.2, y: 0.3 } },
    // ... (repeat for villa3 to villa8 with adjusted x/y)

    // Townhouse 1
    { id: "th1-101", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse1", buildingType: "townhouse", unitTypeId: "townhouse-floor1", floorNumber: 1, displayName: "TH1-101", price: 950000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.6, y: 0.2 } },
    { id: "th1-102", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse1", buildingType: "townhouse", unitTypeId: "townhouse-floor1", floorNumber: 1, displayName: "TH1-102", price: 950000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.65, y: 0.2 } },
    { id: "th1-201", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse1", buildingType: "townhouse", unitTypeId: "townhouse-floor2", floorNumber: 2, displayName: "TH1-201", price: 980000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.6, y: 0.25 } },
    { id: "th1-202", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse1", buildingType: "townhouse", unitTypeId: "townhouse-floor2", floorNumber: 2, displayName: "TH1-202", price: 980000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.65, y: 0.25 } },
    { id: "th1-301", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse1", buildingType: "townhouse", unitTypeId: "townhouse-floor3", floorNumber: 3, displayName: "TH1-301", price: 1020000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.6, y: 0.3 } },
    { id: "th1-302", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse1", buildingType: "townhouse", unitTypeId: "townhouse-floor3", floorNumber: 3, displayName: "TH1-302", price: 1020000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.65, y: 0.3 } },

    // Townhouse 2
    { id: "th2-101", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse2", buildingType: "townhouse", unitTypeId: "townhouse-floor1", floorNumber: 1, displayName: "TH2-101", price: 950000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.75, y: 0.2 } },
    { id: "th2-102", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse2", buildingType: "townhouse", unitTypeId: "townhouse-floor1", floorNumber: 1, displayName: "TH2-102", price: 950000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.65, y: 0.2 } },
    { id: "th2-201", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse2", buildingType: "townhouse", unitTypeId: "townhouse-floor2", floorNumber: 2, displayName: "TH2-201", price: 980000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.6, y: 0.25 } },
    { id: "th2-202", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse2", buildingType: "townhouse", unitTypeId: "townhouse-floor2", floorNumber: 2, displayName: "TH2-202", price: 980000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.65, y: 0.25 } },
    { id: "th2-301", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse2", buildingType: "townhouse", unitTypeId: "townhouse-floor3", floorNumber: 3, displayName: "TH2-301", price: 1020000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.6, y: 0.3 } },
    { id: "th2-302", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse2", buildingType: "townhouse", unitTypeId: "townhouse-floor3", floorNumber: 3, displayName: "TH2-302", price: 1020000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.65, y: 0.3 } },

    // Townhouse 3 
    { id: "th3-101", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse3", buildingType: "townhouse", unitTypeId: "townhouse-floor1", floorNumber: 1, displayName: "TH3-101", price: 950000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.9, y: 0.2 } },
    { id: "th3-102", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse3", buildingType: "townhouse", unitTypeId: "townhouse-floor1", floorNumber: 1, displayName: "TH3-102", price: 950000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.65, y: 0.2 } },
    { id: "th3-201", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse3", buildingType: "townhouse", unitTypeId: "townhouse-floor2", floorNumber: 2, displayName: "TH3-201", price: 980000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.6, y: 0.25 } },
    { id: "th3-202", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse3", buildingType: "townhouse", unitTypeId: "townhouse-floor2", floorNumber: 2, displayName: "TH3-202", price: 980000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.65, y: 0.25 } },
    { id: "th3-301", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse3", buildingType: "townhouse", unitTypeId: "townhouse-floor3", floorNumber: 3, displayName: "TH3-301", price: 1020000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.6, y: 0.3 } },
    { id: "th3-302", projectId: "horizontal", zoneId: "zone1", buildingId: "townhouse3", buildingType: "townhouse", unitTypeId: "townhouse-floor3", floorNumber: 3, displayName: "TH3-302", price: 1020000, area: 110, bedrooms: 2, bathrooms: 2, balconyView: "/panorama/townhouse/balcony.jpg", position: { x: 0.65, y: 0.3 } },

  ]
};