// see comments bellow

// icons
import AirportIcon from '../assets/icons/airport.svg';
import TowerIcon from '../assets/icons/tower.svg';
import MuscleIcon from '../assets/icons/muscle.svg';

const START = { x: 0.50, y: 0.51 };

export const PROJECT_MIX = {
  project: {
    id: "mix",
    name: "Mix",
    developerId: "developer-id"
  },

  zones: [
    {
      id: "zone1",
      projectId: "mix",
      displayName: "Towers",
      subtitle: "Zone",
      thumbnail: "mix/thumbnails/zones/zone1.png",
      description: "Our towers hold different apartments options. They are at the center of the city."
    },
    {
      id: "zone2",
      projectId: "mix",
      displayName: "Towers",
      subtitle: "Zone",
      thumbnail: "mix/thumbnails/zones/zone2.png",
      description: "Our towers hold different apartments options. They are at the center of the city."
    },
  ],

  buildings: [
    {
      id: "tower1",
      projectId: "mix",
      zoneId: "zone1",
      type: "tower",
      displayName: "Tower 1",
      totalFloors: 2,
      description: "Tower 1 description...",
      x: 0.45, y: 0.53,
      features: [
        {
          id: "amenity1",
          displayName: "Garage",
          subtitle: "Tower Amenity",
          description:
            "2-story garage...",
          x: 0.17, y: 0.69,
        },
        {
          id: "amenity2",
          displayName: "Roof",
          subtitle: "Tower Amenity",
          description:
            "Spacious roof top suitable for family gatherings...",
          x: 0.17, y: 0.69,
        },
      ]
    },
    {
      id: "tower2",
      projectId: "mix",
      zoneId: "zone1",
      type: "tower",
      displayName: "Tower 2",
      totalFloors: 2,
      description: "Tower 2 description...",
      x: 0.65, y: 0.35,
      features: [
        {
          id: "amenity1",
          displayName: "Garage",
          subtitle: "Amenity",
          description:
            "2-story garage...",
          x: 0.17, y: 0.69,
        },
        {
          id: "amenity2",
          displayName: "Roof",
          subtitle: "Amenity",
          description:
            "Spacious roof top suitable for family gatherings...",
          x: 0.17, y: 0.69,
        },
      ]
    },
    {
      id: "tower5",
      projectId: "mix",
      zoneId: "zone2",
      type: "tower",
      displayName: "Tower 5",
      totalFloors: 2,
      description: "Tower 5 description...",
      x: 0.34, y: 0.13,
      features: [
        {
          id: "amenity1",
          displayName: "Garage",
          subtitle: "Amenity",
          description:
            "1-story garage...",
          x: 0.17, y: 0.69,
        },
        {
          id: "amenity2",
          displayName: "Cafe",
          subtitle: "Amenity",
          description:
            "Cafe to grab yout morning coffee...",
          x: 0.17, y: 0.69,
        },
      ]
    }
  ],

  floors: [
    {
      id: "floor1",
      projectId: "mix",
      zoneId: "zone1",
      buildingId: "tower1",
      type: "Residential",
      displayName: "Floor 1",
      description: "First floor description...",
      x: 0.27, y: 0.52,
      features: [
        {
          id: "amenity1",
          displayName: "Meeting Room",
          subtitle: "Corridor Amenity",
          description: "...",
          x: 0.17, y: 0.69,
        },
      ],
    },
    {
      id: "floor2",
      projectId: "mix",
      zoneId: "zone1",
      buildingId: "tower1",
      displayName: "Floor 2",
      type: "Residential",
      description: "Second floor description...",
      x: 0.27, y: 0.44,
      features: [
        {
          id: "amenity1",
          displayName: "Meeting Room",
          subtitle: "Corridor Amenity",
          description: "...",
          x: 0.17, y: 0.69,
        },
      ],
    },
    {
      id: "floor1",
      projectId: "mix",
      zoneId: "zone1",
      buildingId: "tower2",
      type: "Residential",
      displayName: "Floor 1",
      description: "First floor description...",
      x: 0.27, y: 0.57,
      features: [
        {
          id: "amenity1",
          displayName: "Meeting Room",
          subtitle: "Corridor Amenity",
          description: "...",
          x: 0.17, y: 0.69,
        },
      ],
    },
    {
      id: "floor2",
      projectId: "mix",
      zoneId: "zone1",
      buildingId: "tower2",
      displayName: "Floor 2",
      type: "Residential",
      description: "Second floor description...",
      x: 0.27, y: 0.49,
      features: [
        {
          id: "amenity1",
          displayName: "Meeting Room",
          subtitle: "Corridor Amenity",
          description: "...",
          x: 0.17, y: 0.69,
        },
      ],
    },
  ],

  unitTypes: {
    // Type A: 2B1B, 85m² — e.g., apartment101, 113, 222
    "unit-type-a": {
      id: "unit-type-a",
      bedrooms: 2, bathrooms: 1,
      area: 85,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/mix/images//v1.svg" }, { id: "gallery2", src: "/mix/images/v2.svg" }, { id: "gallery3", src: "/mix/images/v3.svg" }, { id: "gallery4", src: "/mix/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/mix/images/c1.png" }, { id: "cut2", src: "/mix/images/c2.png" }, { id: "cut3", src: "/mix/images/c3.png" }, { id: "cut4", src: "/mix/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/mix/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: {
        floors: [{
          id: "floor1",
          rooms: [
            { id: "room1", displayName: "Livingroom", image: "/mix/panorama/livingroom.png", description: "A spacious livingroom...", hotspots: [{ id: 'spot1', yaw: 25, pitch: -5, type: 'scene', label: "Bedroom" }, { id: 'spot2', yaw: 25, pitch: 5, type: 'scene', label: "Master Bedroom" }, { id: 'spot3', yaw: 0, pitch: 0, type: 'scene', label: "Dinning and Kitchen" }] },
            { id: "room2", displayName: "Dinning and Kitchen", image: "/mix/panorama/dinning_kitchen.png", hotspots: [{ id: 'spot1', yaw: -65, pitch: -25, type: 'scene', label: "Livingroom" }, { id: 'spot2', yaw: 83, pitch: 0, type: 'scene', label: "Bedroom" }, { id: 'spot3', yaw: 83, pitch: -10, type: 'scene', label: "Master Bedroom" }] },
            { id: "room3", displayName: "Bedroom", image: "/mix/panorama/bedroom.png", hotspots: [{ id: 'spot1', yaw: -105, pitch: -10, type: 'scene', label: "Livingroom" }] },
            { id: "room4", displayName: "Master Bedroom", image: "/mix/panorama/master_bedroom.png", hotspots: [{ id: 'spot1', yaw: -115, pitch: -5, type: 'scene', label: "Livingroom" }, { id: 'spot2', yaw: -115, pitch: -15, type: 'scene', label: "Bathroom" }] },
            { id: "room5", displayName: "Bathroom", image: "/mix/panorama/bathroom.png", hotspots: [{ id: 'spot1', yaw: -3, pitch: 0, type: 'scene', label: "Master Bedroom" }] }
          ]
        }]
      }
    },

    // Type B: 4B2B, 200–250m² — e.g., apartment102, 105, 206, 115
    "unit-type-b": {
      id: "unit-type-b",
      bedrooms: 4, bathrooms: 2,
      area: 200,
      serviceRooms: ["Nanny's Room", "Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/mix/images/v1.svg" }, { id: "gallery2", src: "/mix/images/v2.svg" }, { id: "gallery3", src: "/mix/images/v3.svg" }, { id: "gallery4", src: "/mix/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/mix/images/c1.png" }, { id: "cut2", src: "/mix/images/c2.png" }, { id: "cut3", src: "/mix/images/c3.png" }, { id: "cut4", src: "/mix/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/mix/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: {
        floors: [{
          id: "floor1",
          rooms: [
            { id: "room1", displayName: "Livingroom", image: "/mix/panorama/livingroom.png", hotspots: [{ id: 'spot1', yaw: 25, pitch: -5, type: 'scene', label: "Bedroom" }, { id: 'spot2', yaw: 25, pitch: 5, type: 'scene', label: "Master Bedroom" }, { id: 'spot3', yaw: 0, pitch: 0, type: 'scene', label: "Dinning and Kitchen" }] },
            { id: "room2", displayName: "Dinning and Kitchen", image: "/mix/panorama/dinning_kitchen.png", hotspots: [{ id: 'spot1', yaw: -65, pitch: -25, type: 'scene', label: "Livingroom" }, { id: 'spot2', yaw: 83, pitch: 0, type: 'scene', label: "Bedroom" }, { id: 'spot3', yaw: 83, pitch: -10, type: 'scene', label: "Master Bedroom" }] },
            { id: "room3", displayName: "Bedroom", image: "/mix/panorama/bedroom.png", hotspots: [{ id: 'spot1', yaw: -105, pitch: -10, type: 'scene', label: "Livingroom" }] },
            { id: "room4", displayName: "Master Bedroom", image: "/mix/panorama/master_bedroom.png", hotspots: [{ id: 'spot1', yaw: -115, pitch: -5, type: 'scene', label: "Livingroom" }, { id: 'spot2', yaw: -115, pitch: -15, type: 'scene', label: "Bathroom" }] },
            { id: "room5", displayName: "Bathroom", image: "/mix/panorama/bathroom.png", hotspots: [{ id: 'spot1', yaw: -3, pitch: 0, type: 'scene', label: "Master Bedroom" }] }
          ]
        }]
      }
    },

    // Type C: 2B2B, 120–125m² — e.g., apartment103, 202, 203, 112, 223
    "unit-type-c": {
      id: "unit-type-c",
      bedrooms: 2, bathrooms: 2,
      area: 120,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/mix/images/v1.svg" }, { id: "gallery2", src: "/mix/images/v2.svg" }, { id: "gallery3", src: "/mix/images/v3.svg" }, { id: "gallery4", src: "/mix/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/mix/images/c1.png" }, { id: "cut2", src: "/mix/images/c2.png" }, { id: "cut3", src: "/mix/images/c3.png" }, { id: "cut4", src: "/mix/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/mix/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: {
        floors: [{
          id: "floor1",
          rooms: [
            {
              id: "room1",
              displayName: "Entrance 1", // must match the hotspot label
              image: "/mix/panorama/entrance01.png",
              hotspots: [
                {
                  id: 'spot1',
                  yaw: 30,
                  pitch: -10,
                  type: 'scene',
                  label: "Entrance 2", // must match the room displayName
                },
              ]
            },
            {
              id: "room2",
              displayName: "Entrance 2",
              image: "/mix/panorama/entrance02.png",
              hotspots: [
                {
                  id: 'spot1',
                  yaw: -65,
                  pitch: -25,
                  type: 'scene',
                  label: "Entrance 1",
                },
                {
                  id: 'spot2',
                  yaw: 83,
                  pitch: 0,
                  type: 'scene',
                  label: "Entrance 3-1",
                },
                {
                  id: 'spot3',
                  yaw: 83,
                  pitch: -10,
                  type: 'scene',
                  label: "Entrance 3-2",
                }
              ]
            },
            {
              id: "room3",
              displayName: "Entrance 3-1",
              image: "/mix/panorama/entrance03.1.png",
              hotspots: [
                {
                  id: 'spot1',
                  yaw: -105,
                  pitch: -10,
                  type: 'scene',
                  label: "Entrance 2",
                },
                {
                  id: 'spot1',
                  yaw: -105,
                  pitch: -10,
                  type: 'scene',
                  label: "Entrance 4",
                }
              ]
            },
            {
              id: "room4",
              displayName: "Entrance 3-2",
              image: "/mix/panorama/entrance03.2.png",
              hotspots: [
                {
                  id: 'spot1',
                  yaw: -115,
                  pitch: -5,
                  type: 'scene',
                  label: "Entrance 2",
                },
              ]
            },
            {
              id: "room5",
              displayName: "Entrance 4",
              image: "/mix/panorama/entrance04.png",
              hotspots: [
                {
                  id: 'spot1',
                  yaw: -3,
                  pitch: 0,
                  type: 'scene',
                  label: "Entrance 3-1",
                }
              ]
            }
          ]
        }]
      }
    },

    // Type D: 3B2B, 145–185m² — e.g., apartment104, 205, 114, 225
    "unit-type-d": {
      id: "unit-type-d",
      bedrooms: 3, bathrooms: 2,
      area: 185,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/mix/images/v1.svg" }, { id: "gallery2", src: "/mix/images/v2.svg" }, { id: "gallery3", src: "/mix/images/v3.svg" }, { id: "gallery4", src: "/mix/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/mix/images/c1.png" }, { id: "cut2", src: "/mix/images/c2.png" }, { id: "cut3", src: "/mix/images/c3.png" }, { id: "cut4", src: "/mix/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/mix/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: { /* same as Type A */ }
    },

    // Type E: 2B1B, 115m², floor 2 — e.g., apartment201, 204, 224
    "unit-type-e": {
      id: "unit-type-e",
      bedrooms: 2, bathrooms: 1,
      area: 115,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/mix/images/v1.svg" }, { id: "gallery2", src: "/mix/images/v2.svg" }, { id: "gallery3", src: "/mix/images/v3.svg" }, { id: "gallery4", src: "/mix/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/mix/images/c1.png" }, { id: "cut2", src: "/mix/images/c2.png" }, { id: "cut3", src: "/mix/images/c3.png" }, { id: "cut4", src: "/mix/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/mix/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: { /* same as Type A */ }
    },

    // Type F: 2B2B, 150m² — apartment112
    "unit-type-f": {
      id: "unit-type-f",
      bedrooms: 2, bathrooms: 2,
      area: 150,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/mix/images/v1.svg" }, { id: "gallery2", src: "/mix/images/v2.svg" }, { id: "gallery3", src: "/mix/images/v3.svg" }, { id: "gallery4", src: "/mix/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/mix/images/c1.png" }, { id: "cut2", src: "/mix/images/c2.png" }, { id: "cut3", src: "/mix/images/c3.png" }, { id: "cut4", src: "/mix/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/mix/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: { /* same as Type A */ }
    },

    // Type G: 2B1B, 140m² — apartment111
    "unit-type-g": {
      id: "unit-type-g",
      bedrooms: 2, bathrooms: 1,
      area: 140,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/mix/images/v1.svg" }, { id: "gallery2", src: "/mix/images/v2.svg" }, { id: "gallery3", src: "/mix/images/v3.svg" }, { id: "gallery4", src: "/mix/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/mix/images/c1.png" }, { id: "cut2", src: "/mix/images/c2.png" }, { id: "cut3", src: "/mix/images/c3.png" }, { id: "cut4", src: "/mix/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/mix/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: { /* same as Type A */ }
    },

    // Type H: 2B1B, 185m² — apartment221
    "unit-type-h": {
      id: "unit-type-h",
      bedrooms: 2, bathrooms: 1,
      area: 185,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "gallery1", src: "/mix/images/v1.svg" }, { id: "gallery2", src: "/mix/images/v2.svg" }, { id: "gallery3", src: "/mix/images/v3.svg" }, { id: "gallery4", src: "/mix/images/v4.svg" }],
      cutSections: [{ id: "cut1", src: "/mix/images/c1.png" }, { id: "cut2", src: "/mix/images/c2.png" }, { id: "cut3", src: "/mix/images/c3.png" }, { id: "cut4", src: "/mix/images/c4.png" }],
      floorPlans: [{ id: "floor1", src: "/mix/images/fp1.png" }],
      paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
      interior: { /* same as Type A */ }
    }
  },

  units: [
    // Tower 1, Floor 1
    {
      id: "apartment101",
      projectId: "mix",
      zoneId: "zone1",
      buildingId: "tower1",
      buildingType: "tower",
      unitTypeId: "unit-type-a",
      floorId: "floor1",
      displayName: "A101",
      area: 85,
      price: 250000,
      bedrooms: 2,
      bathrooms: 1,
      balconyView: "/mix/panorama/balcony.jpg",
      x: 0.40, y: 0.60,
    },
    { id: "apartment102", projectId: "mix", zoneId: "zone1", buildingId: "tower1", buildingType: "tower", unitTypeId: "unit-type-b", floorId: "floor1", displayName: "A102", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.25, y: 0.4 },
    { id: "apartment103", projectId: "mix", zoneId: "zone1", buildingId: "tower1", buildingType: "tower", unitTypeId: "unit-type-c", floorId: "floor1", displayName: "A103", area: 120, price: 300000, bedrooms: 2, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.438, y: 0.3 },
    { id: "apartment104", projectId: "mix", zoneId: "zone1", buildingId: "tower1", buildingType: "tower", unitTypeId: "unit-type-d", floorId: "floor1", displayName: "A104", area: 185, price: 350000, bedrooms: 3, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.65, y: 0.33 },
    { id: "apartment105", projectId: "mix", zoneId: "zone1", buildingId: "tower1", buildingType: "tower", unitTypeId: "unit-type-b", floorId: "floor1", displayName: "A105", area: 250, price: 500000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.7, y: 0.65 },

    // Tower 1, Floor 2
    { id: "apartment201", projectId: "mix", zoneId: "zone1", buildingId: "tower1", buildingType: "tower", unitTypeId: "unit-type-e", floorId: "floor2", displayName: "A201", area: 115, price: 275000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.4, y: 0.64 },
    { id: "apartment202", projectId: "mix", zoneId: "zone1", buildingId: "tower1", buildingType: "tower", unitTypeId: "unit-type-c", floorId: "floor2", displayName: "A202", area: 125, price: 300000, bedrooms: 2, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.22, y: 0.55 },
    { id: "apartment203", projectId: "mix", zoneId: "zone1", buildingId: "tower1", buildingType: "tower", unitTypeId: "unit-type-c", floorId: "floor2", displayName: "A203", area: 125, price: 300000, bedrooms: 2, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.225, y: 0.23 },
    { id: "apartment204", projectId: "mix", zoneId: "zone1", buildingId: "tower1", buildingType: "tower", unitTypeId: "unit-type-e", floorId: "floor2", displayName: "A204", area: 115, price: 275000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.42, y: 0.25 },
    { id: "apartment205", projectId: "mix", zoneId: "zone1", buildingId: "tower1", buildingType: "tower", unitTypeId: "unit-type-d", floorId: "floor2", displayName: "A205", area: 145, price: 325000, bedrooms: 3, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.65, y: 0.25 },
    { id: "apartment206", projectId: "mix", zoneId: "zone1", buildingId: "tower1", buildingType: "tower", unitTypeId: "unit-type-b", floorId: "floor2", displayName: "A206", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.67, y: 0.65 },

    // Tower 2, Floor 1
    { id: "apartment111", projectId: "mix", zoneId: "zone1", buildingId: "tower2", buildingType: "tower", unitTypeId: "unit-type-g", floorId: "floor1", displayName: "A111", area: 140, price: 260000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.4, y: 0.58 },
    { id: "apartment112", projectId: "mix", zoneId: "zone1", buildingId: "tower2", buildingType: "tower", unitTypeId: "unit-type-f", floorId: "floor1", displayName: "A112", area: 150, price: 325000, bedrooms: 2, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.21, y: 0.43 },
    { id: "apartment113", projectId: "mix", zoneId: "zone1", buildingId: "tower2", buildingType: "tower", unitTypeId: "unit-type-a", floorId: "floor1", displayName: "A113", area: 85, price: 240000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.23, y: 0.2 },
    { id: "apartment114", projectId: "mix", zoneId: "zone1", buildingId: "tower2", buildingType: "tower", unitTypeId: "unit-type-d", floorId: "floor1", displayName: "A114", area: 145, price: 375000, bedrooms: 3, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.6, y: 0.25 },
    { id: "apartment115", projectId: "mix", zoneId: "zone1", buildingId: "tower2", buildingType: "tower", unitTypeId: "unit-type-b", floorId: "floor1", displayName: "A115", area: 220, price: 450000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.7, y: 0.65 },

    // Tower 2, Floor 2
    { id: "apartment221", projectId: "mix", zoneId: "zone1", buildingId: "tower2", buildingType: "tower", unitTypeId: "unit-type-h", floorId: "floor2", displayName: "A221", area: 185, price: 275000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.2, y: 0.4 },
    { id: "apartment222", projectId: "mix", zoneId: "zone1", buildingId: "tower2", buildingType: "tower", unitTypeId: "unit-type-a", floorId: "floor2", displayName: "A222", area: 85, price: 240000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.24, y: 0.2 },
    { id: "apartment223", projectId: "mix", zoneId: "zone1", buildingId: "tower2", buildingType: "tower", unitTypeId: "unit-type-c", floorId: "floor2", displayName: "A223", area: 125, price: 300000, bedrooms: 2, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.475, y: 0.24 },
    { id: "apartment224", projectId: "mix", zoneId: "zone1", buildingId: "tower2", buildingType: "tower", unitTypeId: "unit-type-e", floorId: "floor2", displayName: "A224", area: 115, price: 275000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.715, y: 0.21 },
    { id: "apartment225", projectId: "mix", zoneId: "zone1", buildingId: "tower2", buildingType: "tower", unitTypeId: "unit-type-d", floorId: "floor2", displayName: "A225", area: 145, price: 325000, bedrooms: 3, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.55, y: 0.5 }
  ],

  surroundings: [
    {
      id: "surrounding1",
      displayName: "Cairo Airport",
      iconSrc: AirportIcon,
      thumbnail: "horizontal/thumbnails/surroundings/cairo_airboart.jpg",
      distance: "38 min | 55 km",
      description:
        "Cairo International Airport is the principal international airport of Cairo and the largest and busiest airport in Egypt. It serves as the primary hub for Egyptair and Nile Air as well as several other airlines.",
      x: 0.75, y: 0.85,
      points: [
        START, // { x: 0.50, y: 0.51 }
        { x: 0.555, y: 0.507 },
        { x: 0.605, y: 0.495 },
        { x: 0.618, y: 0.535 },
        { x: 0.63, y: 0.563 },
        { x: 0.65, y: 0.545 },
        { x: 0.665, y: 0.57 },
        { x: 0.765, y: 0.855 },
        { x: 0.755, y: 0.865 },
      ]
    },
    {
      id: "surrounding2",
      displayName: "Gym",
      iconSrc: MuscleIcon,
      thumbnail: "horizontal/thumbnails/surroundings/gym.jpg",
      distance: "3 min | 1 km",
      description: "A modern fully equipped gym that support strength, cardio and everyday wellness.",
      x: 0.545, y: 0.56,
      points: [
        START, // { x: 0.50, y: 0.51 }
        { x: 0.55, y: 0.51 },
        { x: 0.55, y: 0.58 },
        { x: 0.54, y: 0.585 },
      ]
    },
    {
      id: "surrounding3",
      displayName: "Iconic Tower",
      iconSrc: TowerIcon,
      thumbnail: "horizontal/thumbnails/surroundings/iconic_tower.jpg",
      distance: "8 min | 5 km",
      description: "An architectural landmark that defines the city skyline.",
      x: 0.27, y: 0.43,
      points: [
        START, //{ x: 0.50, y: 0.51 }
        { x: 0.455, y: 0.505 },
        { x: 0.4, y: 0.495 },
        { x: 0.34, y: 0.475 },
        { x: 0.31, y: 0.47 },
        { x: 0.292, y: 0.48 },
      ]
    },
  ],
  amenities: [
    {
      id: "amenity1",
      displayName: "Landscapes",
      subtitle: "Amenity",
      thumbnail: "mix/thumbnails/amenities/f1.png",
      description: "Modern landscapes provide a beautiful view of the mall area.",
      x: 0.2, y: 0.67,
    },
    {
      id: "amenity2",
      displayName: "Shops",
      subtitle: "Amenity",
      thumbnail: "mix/thumbnails/amenities/f2.png",
      description: "A selection of fine shops.",
      x: 0.32, y: 0.65,
    },
  ],
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
 * a buildingId → its container (tower, villa, or townhouse).
 * a unitTypeId → its shared interior/gallery/floorplan.

 This creates a three-level contextual hierarchy, but data remains
 flat and lookup is always O(1):
 ***/