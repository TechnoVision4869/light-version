// icons
import AirportIcon from '../assets/icons/airport.svg';
import TowerIcon from '../assets/icons/tower.svg';
import MuscleIcon from '../assets/icons/muscle.svg';

// Surroundings SVGs
import CairoAirportSvg from '../assets/paths/airport.svg?raw';
import GymSvg from '../assets/paths/gym.svg?raw';
import IconicTowerSvg from '../assets/paths/tower.svg?raw';

export const PROJECT_HORIZONTAL = {
  project: {
    id: "horizontal",
    name: "Horizontal",
    developerId: "developer-id",
  },

  zones: [
    {
      id: "zone1",
      projectId: "horizontal",
      displayName: "Villas & Townhouses",
      subtitle: "Residential Zone",
      thumbnail: "horizontal/thumbnails/zones/zone1.png",
      highlight: "horizontal/highlight/zones/zone1.png",
      description: "A serene community of luxury villas and modern townhouses nestled in nature.",
      x: 0.12, y: 0.25,
    },
  ],

  types: [
    {
      id: "villa1",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "villa",
      displayName: "4BR Villa",
      highlight: "horizontal/highlight/types/type1.png",
      description: "Luxury 4-bedroom villa with rooftop lounge.",
      x: 0.3, y: 0.45,
    },
    {
      id: "town1",
      projectId: "horizontal",
      zoneId: "zone1",
      type: "townhouse",
      displayName: "Townhouse",
      highlight: "horizontal/highlight/types/type2.png",
      description: "Modern 3-story townhouse with private balcony.",
      x: 0.67, y: 0.6,
    },
  ],

  buildings: [
    {
      id: "townhouse1",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "town1",
      displayName: "TownHouse 1",
      description: "...",
      x: 0.67, y: 0.5,
    },
    {
      id: "townhouse2",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "town1",
      displayName: "TownHouse 2",
      description: "...",
      x: 0.67, y: 0.6,
    },
    {
      id: "townhouse3",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "town1",
      displayName: "TownHouse 3",
      description: "...",
      x: 0.67, y: 0.7,
    },
  ],

  unitTypes: {
    // Villa type — 3 interior floors
    "villa-luxury-4br": {
      id: "villa-luxury-4br",
      bedrooms: 4,
      bathrooms: 3,
      area: 320,
      serviceRooms: ["Maid's Room", "Hard Kitchen", "Storage"],
      gallery: [
        { id: "v1", src: "/images/villa-ext1.jpg" },
        { id: "v2", src: "/images/villa-ext2.jpg" },
      ],
      cutSections: [{ id: "c1", src: "/images/villa-section.png" }],
      floorPlans: [{ id: "fp1", src: "/images/villa-fp.png" }],
      paymentPlans: [
        { downPayment: 8000000, monthly: 800000, years: 10 },
        { downPayment: 5000000, monthly: 500000, years: 20 },
      ],
      interior: {
        floors: [
          {
            id: "ground",
            rooms: [
              {
                id: "gr-living",
                displayName: "Living Room",
                image: "/panorama/villa/gr-living.jpg",
                hotspots: [
                  {
                    id: "hp1",
                    yaw: 30,
                    pitch: 0,
                    type: "scene",
                    label: "Kitchen",
                  },
                  {
                    id: "hp2",
                    yaw: 180,
                    pitch: -5,
                    type: "scene",
                    label: "Garden",
                  },
                ],
              },
              {
                id: "gr-kitchen",
                displayName: "Kitchen",
                image: "/panorama/villa/gr-kitchen.jpg",
                hotspots: [
                  {
                    id: "hp1",
                    yaw: -90,
                    pitch: 0,
                    type: "scene",
                    label: "Living Room",
                  },
                ],
              },
            ],
          },
          {
            id: "first",
            rooms: [
              {
                id: "f1-master",
                displayName: "Master Bedroom",
                image: "/panorama/villa/f1-master.jpg",
                hotspots: [
                  {
                    id: "hp1",
                    yaw: 0,
                    pitch: 0,
                    type: "scene",
                    label: "Bathroom",
                  },
                ],
              },
              {
                id: "f1-bed2",
                displayName: "Bedroom 2",
                image: "/panorama/villa/f1-bed2.jpg",
                hotspots: [],
              },
            ],
          },
          {
            id: "roof",
            rooms: [
              {
                id: "roof-lounge",
                displayName: "Rooftop Lounge",
                image: "/panorama/villa/roof-lounge.jpg",
                hotspots: [
                  {
                    id: "hp1",
                    yaw: 90,
                    pitch: 10,
                    type: "scene",
                    label: "Garden View",
                  },
                ],
              },
            ],
          },
        ],
      },
    },

    // Townhouse Unit 1
    "townhouse-2story-4br": {
      id: "townhouse-2story-4br",
      bedrooms: 2,
      bathrooms: 2,
      area: 110,
      serviceRooms: ["Hard Kitchen"],
      gallery: [{ id: "t1", src: "/images/townhouse-ext.jpg" }],
      cutSections: [{ id: "c1", src: "/images/townhouse-section.png" }],
      floorPlans: [{ id: "fp1", src: "/images/townhouse-fp.png" }],
      paymentPlans: [{ downPayment: 3000000, monthly: 300000, years: 10 }],
      interior: {
        floors: [
          {
            id: "ground",
            rooms: [
              {
                id: "th-living",
                displayName: "Living Area",
                image: "/panorama/townhouse/living.jpg",
                hotspots: [
                  {
                    id: "hp1",
                    yaw: 45,
                    pitch: 0,
                    type: "scene",
                    label: "Kitchen",
                  },
                  {
                    id: "hp2",
                    yaw: 135,
                    pitch: -5,
                    type: "scene",
                    label: "Balcony",
                  },
                ],
              },
              {
                id: "th-kitchen",
                displayName: "Kitchen",
                image: "/panorama/townhouse/kitchen.jpg",
                hotspots: [
                  {
                    id: "hp1",
                    yaw: -120,
                    pitch: 0,
                    type: "scene",
                    label: "Living Area",
                  },
                ],
              },
            ],
          },
          {
            id: "floor1",
            rooms: [
              {
                id: "th-master",
                displayName: "Master Bedroom",
                image: "/panorama/townhouse/master.jpg",
                hotspots: [
                  {
                    id: "hp1",
                    yaw: 0,
                    pitch: 0,
                    type: "scene",
                    label: "Bathroom",
                  },
                ],
              },
              {
                id: "th-bed1",
                displayName: "Bedroom 1",
                image: "/panorama/townhouse/bed1.jpg",
                hotspots: [],
              },
              {
                id: "th-bed2",
                displayName: "Bedroom 2",
                image: "/panorama/townhouse/bed2.jpg",
                hotspots: [],
              },
              {
                id: "th-bed3",
                displayName: "Bedroom 3",
                image: "/panorama/townhouse/bed3.jpg",
                hotspots: [],
              },
            ],
          },
        ],
      },
    },
  },

  units: [
    // 4 Villas
    {
      id: "villa1",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "villa1",
      unitTypeId: "villa-luxury-4br",
      displayName: "Villa 1",
      price: 2200000,
      area: 320,
      bedrooms: 4, bathrooms: 3,
      balconyView: "/panorama/villa/balcony.jpg",
      x: 0.28, y: 0.51,
    },
    {
      id: "villa2",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "villa1",
      unitTypeId: "villa-luxury-4br",
      displayName: "Villa 2",
      price: 2200000,
      area: 320,
      bedrooms: 4, bathrooms: 3,
      balconyView: "/panorama/villa/balcony.jpg",
      x: 0.23, y: 0.46,
    },
    {
      id: "villa3",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "villa1",
      unitTypeId: "villa-luxury-4br",
      displayName: "Villa 3",
      price: 2200000,
      area: 320,
      bedrooms: 4, bathrooms: 3,
      balconyView: "/panorama/villa/balcony.jpg",
      x: 0.21, y: 0.36,
    },
    {
      id: "villa4",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "villa1",
      unitTypeId: "villa-luxury-4br",
      displayName: "Villa 4",
      price: 2200000,
      area: 320,
      bedrooms: 4, bathrooms: 3,
      balconyView: "/panorama/villa/balcony.jpg",
      x: 0.22, y: 0.28,
    },

    // Townhouse 1
    {
      id: "th1-unit1",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "town1",
      buildingId: "townhouse1",
      unitTypeId: "townhouse-2story-4br",
      displayName: "TH1-U1",
      price: 950000,
      area: 425,
      bedrooms: 4, bathrooms: 2,
      balconyView: "/panorama/townhouse/balcony.jpg",
      x: 0.6, y: 0.2,
    },
    {
      id: "th1-unit2",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "town1",
      buildingId: "townhouse1",
      unitTypeId: "townhouse-2story-4br",
      displayName: "TH1-U2",
      price: 950000,
      area: 425,
      bedrooms: 4, bathrooms: 2,
      balconyView: "/panorama/townhouse/balcony.jpg",
      x: 0.65, y: 0.2,
    },

    // Townhouse 2
    {
      id: "th2-unit1",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "town1",
      buildingId: "townhouse2",
      unitTypeId: "townhouse-2story-4br",
      displayName: "TH2-U1",
      price: 950000,
      area: 425,
      bedrooms: 4, bathrooms: 2,
      balconyView: "/panorama/townhouse/balcony.jpg",
      x: 0.75, y: 0.2,
    },
    {
      id: "th2-unit2",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "town1",
      buildingId: "townhouse2",
      unitTypeId: "townhouse-2story-4br",
      displayName: "TH2-U2",
      price: 950000,
      area: 425,
      bedrooms: 4, bathrooms: 2,
      balconyView: "/panorama/townhouse/balcony.jpg",
      x: 0.65, y: 0.2,
    },

    // Townhouse 3
    {
      id: "th3-unit1",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "town1",
      buildingId: "townhouse3",
      unitTypeId: "townhouse-2story-4br",
      displayName: "TH3-U1",
      price: 950000,
      area: 425,
      bedrooms: 4, bathrooms: 2,
      balconyView: "/panorama/townhouse/balcony.jpg",
      x: 0.9, y: 0.2,
    },
    {
      id: "th3-unit2",
      projectId: "horizontal",
      zoneId: "zone1",
      typeId: "town1",
      buildingId: "townhouse3",
      unitTypeId: "townhouse-2story-4br",
      displayName: "TH3-U2",
      price: 950000,
      area: 425,
      bedrooms: 4, bathrooms: 2,
      balconyView: "/panorama/townhouse/balcony.jpg",
      x: 0.65, y: 0.2,
    },
  ],

  surroundings: [
    {
      id: "surrounding1",
      displayName: "Cairo Airport",
      iconSrc: AirportIcon,
      thumbnail: "horizontal/thumbnails/surroundings/cairo_airboart.jpg",
      distance: "38 min | 55 km",
      description: "Cairo International Airport is the principal international airport of Cairo and the largest and busiest airport in Egypt. It serves as the primary hub for Egyptair and Nile Air as well as several other airlines.",
      x: 0.49, y: 0.28,
      svgPath: CairoAirportSvg,
    },
    {
      id: "surrounding2",
      displayName: "Gym",
      iconSrc: MuscleIcon,
      thumbnail: "horizontal/thumbnails/surroundings/gym.jpg",
      distance: "3 min | 1 km",
      description: "A modern fully equipped gym that support strength, cardio and everyday wellness.",
      x: 0.545, y: 0.56,
      svgPath: GymSvg,
    },
    {
      id: "surrounding3",
      displayName: "Iconic Tower",
      iconSrc: TowerIcon,
      thumbnail: "horizontal/thumbnails/surroundings/iconic_tower.jpg",
      distance: "8 min | 5 km",
      description: "An architectural landmark that defines the city skyline.",
      x: 0.27, y: 0.43,
      svgPath: IconicTowerSvg,
    },
  ],

  amenities: [
    {
      id: "amenity1",
      displayName: "Lush Gardens",
      subtitle: "Amenity",
      thumbnail: `horizontal/thumbnails/amenities/f1.png`,
      description: "Serene, landscaped gardens offering peaceful green spaces for relaxation and leisure.",
      x: 0.59, y: 0.33,
    },
    {
      id: "amenity2",
      displayName: "Nature Landscapes",
      subtitle: "Amenity",
      thumbnail: `horizontal/thumbnails/amenities/f2.png`,
      description: "Expansive natural scenery integrated into the development for a harmonious living environment.",
      x: 0.46, y: 0.29,
    },
    {
      id: "amenity3",
      displayName: "Scenic Roadways",
      subtitle: "Amenity",
      thumbnail: `horizontal/thumbnails/amenities/f3.png`,
      description: "Thoughtfully designed roads with tree-lined avenues and pedestrian-friendly pathways.",
      x: 0.38, y: 0.11,
    },
  ],
};
