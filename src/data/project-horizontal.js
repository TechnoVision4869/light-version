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
    introVideo: "/horizontal/videos/intro.mp4",
    idleVideo: "/horizontal/videos/home/home_idle.mp4",
    zoomoutVideo: "/horizontal/videos/home/zones_out.mp4",

    surroundings: {
      id: "surroundings",
      displayName: "Surroundings",
      zoomoutVideo: "/horizontal/videos/surroundings/surr_out.mp4",
      videos: {
        forwardVideo: "/horizontal/videos/surroundings/surr_gen_trans_from_home.mp4",
        reverseVideo: "/horizontal/videos/surroundings/surr_gen_rev_trans_to_home.mp4",
        idleVideo: "/horizontal/videos/surroundings/surr_idle.mp4",
      },
      items: [
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
    },

    amenities: {
      id: "amenities",
      displayName: "Amenities",
      zoomoutVideo: "/horizontal/videos/amenities/amenities_out.mp4",
      videos: {
        forwardVideo: "/horizontal/videos/amenities/amenities_gen_trans_from_home.mp4",
        reverseVideo: "/horizontal/videos/amenities/amenities_gen_rev_trans_to_home.mp4",
        idleVideo: "/horizontal/videos/amenities/amenities_gen_idle.mp4",
      },
      items: [
        {
          id: "amenity1",
          displayName: "Lush Gardens",
          subtitle: "Amenity",
          thumbnail: "horizontal/thumbnails/amenities/amenity1.png",
          description: "Serene, landscaped gardens offering peaceful green spaces for relaxation and leisure.",
          x: 0.59, y: 0.33,
          videos: {
            forwardVideo: "/horizontal/videos/amenities/amenity1/amenity1_trans.mp4",
            reverseVideo: "/horizontal/videos/amenities/amenity1/amenity1_rev.mp4",
            idleVideo: "/horizontal/videos/amenities/amenity1/amenity1_idle.mp4",
          },
        },
        {
          id: "amenity2",
          displayName: "Nature Landscapes",
          subtitle: "Amenity",
          thumbnail: "horizontal/thumbnails/amenities/amenity2.png",
          description: "Expansive natural scenery integrated into the development for a harmonious living environment.",
          x: 0.46, y: 0.29,
          videos: {
            forwardVideo: "/horizontal/videos/amenities/amenity2/amenity2_trans.mp4",
            reverseVideo: "/horizontal/videos/amenities/amenity2/amenity2_rev.mp4",
            idleVideo: "/horizontal/videos/amenities/amenity2/amenity2_idle.mp4",
          },
        },
        {
          id: "amenity3",
          displayName: "Scenic Roadways",
          subtitle: "Amenity",
          thumbnail: "horizontal/thumbnails/amenities/amenity3.png",
          description: "Thoughtfully designed roads with tree-lined avenues and pedestrian-friendly pathways.",
          x: 0.38, y: 0.11,
          videos: {
            forwardVideo: "/horizontal/videos/amenities/amenity3/amenity3_trans.mp4",
            reverseVideo: "/horizontal/videos/amenities/amenity3/amenity3_rev.mp4",
            idleVideo: "/horizontal/videos/amenities/amenity3/amenity3_idle.mp4",
          },
        },
      ],
    },

    zones: {
      id: "zones",
      displayName: "Zones",
      zoomoutVideo: "/horizontal/videos/home/home_out.mp4",
      videos: {
          forwardVideo: "/horizontal/videos/zones/zones_gen_trans.mp4",
          reverseVideo: "/horizontal/videos/zones/zones_gen_rev.mp4",
          idleVideo: "/horizontal/videos/zones/zones_gen_idle.mp4",
        },
      items: [
        {
          id: "zone1",
          projectId: "horizontal",
          displayName: "Villas & Townhouses",
          subtitle: "Residential Zone",
          thumbnail: "horizontal/thumbnails/zones/zone1.png",
          highlight: "horizontal/highlight/zones/zone1.png",
          description: "A serene community of luxury villas and modern townhouses nestled in nature.",
          x: 0.17, y: 0.23,
          videos: {
            forwardVideo: "/horizontal/videos/zones/zone1/zone1_gen_trans.mp4",
            reverseVideo: "/horizontal/videos/zones/zone1/zone1_gen_rev.mp4",
            idleVideo: "/horizontal/videos/zones/zone1/zone1_gen_idle.mp4",
          },
          properties: [
            {
              id: "villa",
              projectId: "horizontal",
              zoneId: "zone1",
              type: "villa",
              displayName: "4BR Villa",
              highlight: "horizontal/highlight/types/type1.png",
              description: "Luxury 4-bedroom villa with rooftop lounge.",
              area: 320,
              x: 0.3, y: 0.45,
              videos: {
                forwardVideo: "/horizontal/videos/zones/zone1/villa1/zone1_villa1_gen_trans.mp4",
                reverseVideo: "/horizontal/videos/zones/zone1/villa1/zone1_villa1_gen_rev.mp4",
                idleVideo: "horizontal/videos/zones/zone1/villa1/views/view1/zone1_villa1_view1_idle.mp4",
              },
              units: [
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
                  balconyView: "/horizontal/panorama/villa/balcony.jpg",
                  x: 0.39, y: 0.135,
                  videos: {
                    forwardVideo: "/cutsection.mp4",
                    reverseVideo: "/cutsection.mp4",
                    idleVideo: "/cutsection.mp4",
                  }
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
                  balconyView: "/horizontal/panorama/villa/balcony.jpg",
                  x: 0.43, y: 0.135,
                  videos: {
                    forwardVideo: "/cutsection.mp4",
                    reverseVideo: "/cutsection.mp4",
                    idleVideo: "/cutsection.mp4",
                  }
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
                  balconyView: "/horizontal/panorama/villa/balcony.jpg",
                  x: 0.47, y: 0.135,
                  videos: {
                    forwardVideo: "/cutsection.mp4",
                    reverseVideo: "/cutsection.mp4",
                    idleVideo: "/cutsection.mp4",
                  }
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
                  balconyView: "/horizontal/panorama/villa/balcony.jpg",
                  x: 0.51, y: 0.135,
                  videos: {
                    forwardVideo: "/cutsection.mp4",
                    reverseVideo: "/cutsection.mp4",
                    idleVideo: "/cutsection.mp4",
                  }
                },
              ],
              views: [
                {
                  name: "Front View",
                  videos: {
                    forwardVideo: "horizontal/videos/zones/zone1/villa1/views/view1/zone1_villa1_view1_trans.mp4",
                    reverseVideo: "horizontal/videos/zones/zone1/villa1/views/view1/zone1_villa1_view1_rev.mp4",
                    idleVideo: "horizontal/videos/zones/zone1/villa1/views/view1/zone1_villa1_view1_idle.mp4",
                  }
                },
                {
                  name: "Right View",
                  videos: {
                    forwardVideo: "horizontal/videos/zones/zone1/villa1/views/view2/zone1_villa1_view2_trans.mp4",
                    reverseVideo: "horizontal/videos/zones/zone1/villa1/views/view2/zone1_villa1_view2_rev.mp4",
                    idleVideo: "horizontal/videos/zones/zone1/villa1/views/view2/zone1_villa1_view2_idle.mp4",
                  }
                },
                {
                  name: "Back View",
                  videos: {
                    forwardVideo: "horizontal/videos/zones/zone1/villa1/views/view3/zone1_villa1_view3_trans.mp4",
                    reverseVideo: "horizontal/videos/zones/zone1/villa1/views/view3/zone1_villa1_view3_rev.mp4",
                    idleVideo: "horizontal/videos/zones/zone1/villa1/views/view3/zone1_villa1_view3_idle.mp4",
                  }
                },
                {
                  name: "Left View",
                  videos: {
                    forwardVideo: "horizontal/videos/zones/zone1/villa1/views/view4/zone1_villa1_view4_trans.mp4",
                    reverseVideo: "horizontal/videos/zones/zone1/villa1/views/view4/zone1_villa1_view4_rev.mp4",
                    idleVideo: "horizontal/videos/zones/zone1/villa1/views/view4/zone1_villa1_view4_idle.mp4",
                  }
                },
              ],
            },
            {
              id: "town",
              projectId: "horizontal",
              zoneId: "zone1",
              type: "town",
              displayName: "Townhouse",
              highlight: "horizontal/highlight/types/type2.png",
              description: "Modern 3-story townhouse with private balcony.",
              area: 425,
              x: 0.67, y: 0.6,
              videos: {
                forwardVideo: "/horizontal/videos/zones/zone1/town1/zone1_town1_gen_trans.mp4",
                reverseVideo: "/horizontal/videos/zones/zone1/town1/zone1_town1_gen_rev.mp4",
                idleVideo: "horizontal/videos/zones/zone1/town1/views/view1/zone1_town1_view1_idle.mp4",
              },
              units: [
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
                  balconyView: "/horizontal/panorama/townhouse/balcony.jpg",
                  x: 0.19, y: 0.3,
                  videos: {
                    forwardVideo: "/cutsection.mp4",
                    reverseVideo: "/cutsection.mp4",
                    idleVideo: "/cutsection.mp4",
                  }
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
                  balconyView: "/horizontal/panorama/townhouse/balcony.jpg",
                  x: 0.54, y: 0.3,
                  videos: {
                    forwardVideo: "/cutsection.mp4",
                    reverseVideo: "/cutsection.mp4",
                    idleVideo: "/cutsection.mp4",
                  }
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
                  balconyView: "/horizontal/panorama/townhouse/balcony.jpg",
                  x: 0.19, y: 0.3,
                  videos: {
                    forwardVideo: "/cutsection.mp4",
                    reverseVideo: "/cutsection.mp4",
                    idleVideo: "/cutsection.mp4",
                  }
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
                  balconyView: "/horizontal/panorama/townhouse/balcony.jpg",
                  x: 0.54, y: 0.3,
                  videos: {
                    forwardVideo: "/cutsection.mp4",
                    reverseVideo: "/cutsection.mp4",
                    idleVideo: "/cutsection.mp4",
                  }
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
                  balconyView: "/horizontal/panorama/townhouse/balcony.jpg",
                  x: 0.19, y: 0.3,
                  videos: {
                    forwardVideo: "/cutsection.mp4",
                    reverseVideo: "/cutsection.mp4",
                    idleVideo: "/cutsection.mp4",
                  }
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
                  balconyView: "/horizontal/panorama/townhouse/balcony.jpg",
                  x: 0.54, y: 0.3,
                  videos: {
                    forwardVideo: "/cutsection.mp4",
                    reverseVideo: "/cutsection.mp4",
                    idleVideo: "/cutsection.mp4",
                  }
                },
              ],
              views: [
                {
                  name: "Front View",
                  videos: {
                    forwardVideo: "horizontal/videos/zones/zone1/town1/views/view1/zone1_town1_view1_trans.mp4",
                    reverseVideo: "horizontal/videos/zones/zone1/town1/views/view1/zone1_town1_view1_rev.mp4",
                    idleVideo: "horizontal/videos/zones/zone1/town1/views/view1/zone1_town1_view1_idle.mp4",
                  }
                },
                {
                  name: "Right View",
                  videos: {
                    forwardVideo: "horizontal/videos/zones/zone1/town1/views/view2/zone1_town1_view2_trans.mp4",
                    reverseVideo: "horizontal/videos/zones/zone1/town1/views/view2/zone1_town1_view2_rev.mp4",
                    idleVideo: "horizontal/videos/zones/zone1/town1/views/view2/zone1_town1_view2_idle.mp4",
                  }
                },
                {
                  name: "Back View",
                  videos: {
                    forwardVideo: "horizontal/videos/zones/zone1/town1/views/view3/zone1_town1_view3_trans.mp4",
                    reverseVideo: "horizontal/videos/zones/zone1/town1/views/view3/zone1_town1_view3_rev.mp4",
                    idleVideo: "horizontal/videos/zones/zone1/town1/views/view3/zone1_town1_view3_idle.mp4",
                  }
                },
                {
                  name: "Left View",
                  videos: {
                    forwardVideo: "horizontal/videos/zones/zone1/town1/views/view4/zone1_town1_view4_trans.mp4",
                    reverseVideo: "horizontal/videos/zones/zone1/town1/views/view4/zone1_town1_view4_rev.mp4",
                    idleVideo: "horizontal/videos/zones/zone1/town1/views/view4/zone1_town1_view4_idle.mp4",
                  }
                },
              ],
            },
          ],
        },
      ],
    },

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
        levels: [
          {
            id: "ground",
            name: "Ground",
            rooms: [
              {
                id: "gr-living",
                displayName: "Living Room",
                furnitureImg: "/horizontal/panorama/villa-luxury-4br/ground/rec_f.jpg",
                unfurnitureImg: "/horizontal/panorama/villa-luxury-4br/ground/rec_unf.jpg",
                hotspots: [
                  {
                    id: "hp1",
                    yaw: -35, pitch: 0,
                    type: "scene",
                    label: "Dining",
                  },
                ],
              },
              {
                id: "gr-dining",
                displayName: "Dining",
                furnitureImg: "/horizontal/panorama/villa-luxury-4br/ground/dining_f.jpg",
                unfurnitureImg: "/horizontal/panorama/villa-luxury-4br/ground/dining_unf.jpg",
                hotspots: [
                  {
                    id: "hp1",
                    yaw: 145, pitch: 0,
                    type: "scene",
                    label: "Living Room",
                  },
                ],
              },
            ],
          },
          {
            id: "first",
            name: "First",
            rooms: [
              {
                id: "f1-master",
                displayName: "Master Bedroom",
                furnitureImg: "/horizontal/panorama/villa-luxury-4br/first/master_f.png",
                unfurnitureImg: null,
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
                id: "f1-bathroom",
                displayName: "Bathroom",
                furnitureImg: "/horizontal/panorama/villa-luxury-4br/first/bathroom_f.png",
                unfurnitureImg: null,
                hotspots: [
                  {
                    id: "hp1",
                    yaw: 180,
                    pitch: 0,
                    type: "scene",
                    label: "Master Bedroom",
                  }
                ],
              },
            ],
          },
          {
            id: "roof",
            name: "Roof",
            rooms: [
              {
                id: "roof-living",
                displayName: "Rooftop Living",
                furnitureImg: "/horizontal/panorama/villa-luxury-4br/roof/living.png",
                unfurnitureImg: null,
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
              {
                id: "roof-dining",
                displayName: "Rooftop Dining",
                furnitureImg: "/horizontal/panorama/villa-luxury-4br/roof/dining_kitchen.png",
                unfurnitureImg: null,
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
        levels: [
          {
            id: "ground",
            rooms: [
              {
                id: "th-living",
                displayName: "Living Area",
                furnitureImg: "/panorama/townhouse/living.jpg",
                unfurnitureImg: "/panorama/townhouse/living-nofurniture.jpg",
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
                furnitureImg: "/panorama/townhouse/kitchen.jpg",
                unfurnitureImg: "/panorama/townhouse/kitchen-nofurniture.jpg",
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
                furnitureImg: "/panorama/townhouse/master.jpg",
                unfurnitureImg: "/panorama/townhouse/master-nofurniture.jpg",
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
                furnitureImg: "/panorama/townhouse/bed1.jpg",
                unfurnitureImg: "/panorama/townhouse/bed1-nofurniture.jpg",
                hotspots: [],
              },
              {
                id: "th-bed2",
                displayName: "Bedroom 2",
                furnitureImg: "/panorama/townhouse/bed2.jpg",
                unfurnitureImg: "/panorama/townhouse/bed2-nofurniture.jpg",
                hotspots: [],
              },
              {
                id: "th-bed3",
                displayName: "Bedroom 3",
                furnitureImg: "/panorama/townhouse/bed3.jpg",
                unfurnitureImg: "/panorama/townhouse/bed3-nofurniture.jpg",
                hotspots: [],
              },
            ],
          },
        ],
      },
    },
  },
  },

  
};
