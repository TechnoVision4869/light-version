// icons
import AirportIcon from '../assets/icons/airport.svg';
import TowerIcon from '../assets/icons/tower.svg';

// Surroundings SVGs
import CairoAirportSvg from '../assets/paths/airport.svg?raw';
import IconicTowerSvg from '../assets/paths/tower.svg?raw';

export const DEVELOPER_MIX = {
  developerId: "developer-id",
  developerLogo: "mix/images/developer/Logo-somabay.png",
  backgroundImage: "/mix/images/developer/background.png",
  developerProjects: [
    {
      id: "mix",
      name: "Mix",
      thumbnail: "mix/thumbnails/zones/zone1.png",
      description: "Located at the tip of the peninsula, The Lighthouse Somabay gives you a unique panoramic view of the reef and the bay at once.",
      introVideo: "/mix/videos/intro.mp4",
      idleVideo: "/mix/videos/home/home_idle.mp4",
      zoomoutVideo: "/mix/videos/home/home_out.mp4",

      surroundings: {
        id: "surroundings",
        displayName: "Surroundings",
        zoomoutVideo: "/mix/videos/surroundings/surr_out.mp4",
        videos: {
          forwardVideo: "/mix/videos/surroundings/surr_gen_trans_from_home.mp4",
          reverseVideo: "/mix/videos/surroundings/surr_gen_rev_trans_to_home.mp4",
          idleVideo: "/mix/videos/surroundings/surr_idle.mp4",
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
        zoomoutVideo: "/mix/videos/amenities/amenities_out.mp4",
        videos: {
          forwardVideo: "/mix/videos/amenities/amenities_gen_trans_from_home.mp4",
          reverseVideo: "/mix/videos/amenities/amenities_gen_rev_trans_to_home.mp4",
          idleVideo: "/mix/videos/amenities/amenities_gen_idle.mp4",
        },
        items: [
          {
            id: "amenity1",
            displayName: "Landscapes",
            subtitle: "Amenity",
            thumbnail: "mix/thumbnails/amenities/f1.png",
            description: "Modern landscapes provide a beautiful view of the mall area.",
            x: 0.2, y: 0.67,
            videos: {
              forwardVideo: "/mix/videos/amenities/amenity1/amenity1_trans.mp4",
              reverseVideo: "/mix/videos/amenities/amenity1/amenity1_rev.mp4",
              idleVideo: "/mix/videos/amenities/amenity1/amenity1_idle.mp4",
            },
          },
          {
            id: "amenity2",
            displayName: "Shops",
            subtitle: "Amenity",
            thumbnail: "mix/thumbnails/amenities/f2.png",
            description: "A selection of fine shops.",
            x: 0.32, y: 0.65,
            videos: {
              forwardVideo: "/mix/videos/amenities/amenity2/amenity2_trans.mp4",
              reverseVideo: "/mix/videos/amenities/amenity2/amenity2_rev.mp4",
              idleVideo: "/mix/videos/amenities/amenity2/amenity2_idle.mp4",
            },
          },
        ]
      },

      zones: {
        id: "zones",
        displayName: "Zones",
        zoomoutVideo: "/mix/videos/home/home_out.mp4", // reuse home zoomout, but will change later to videos/zones/zones_out.
        videos: {
          forwardVideo: "/mix/videos/zones/zones_gen_trans.mp4",
          reverseVideo: "/mix/videos/zones/zones_gen_rev.mp4",
          idleVideo: "/mix/videos/zones/zones_gen_idle.mp4",
        },
        items: [
          {
            id: "zone1",
            projectId: "mix",
            displayName: "Zone 1",
            subtitle: "Residential Area",
            thumbnail: "mix/thumbnails/zones/zone1.png",
            highlight: "mix/highlight/zones/zone1.png",
            description: "Our towers hold different apartments options. They are at the center of the city.",
            x: 0.93, y: 0.53,
            videos: {
              forwardVideo: "/mix/videos/zones/zone1/zone1_gen_trans.mp4",
              reverseVideo: "/mix/videos/zones/zone1/zone1_gen_rev.mp4",
              idleVideo: "/mix/videos/zones/zone1/zone1_gen_idle.mp4",
            },
            properties: [
              {
                id: "tower1",
                projectId: "mix",
                zoneId: "zone1",
                type: "tower",
                displayName: "Tower 1",
                highlight: "mix/highlight/towers/tower1.png",
                description: "Tower 1 description...",
                x: 0.45, y: 0.53,
                videos: {
                  forwardVideo: "/mix/videos/zones/zone1/tower1/zone1_tower1_gen_trans.mp4",
                  reverseVideo: "/mix/videos/zones/zone1/tower1/zone1_tower1_gen_rev.mp4",
                  idleVideo: "mix/videos/zones/zone1/tower1/views/view1/zone1_tower1_view1_idle.mp4",
                },
                floors: [
                  {
                    id: "floor1",
                    projectId: "mix",
                    zoneId: "zone1",
                    buildingId: "tower1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: "mix/highlight/towers/tower1_floor1.png",
                    description: "First floor description...",
                    x: 0.27, y: 0.52,
                    videos: {
                      forwardVideo: "/mix/videos/zones/zone1/tower1/floors/zone1_tower1_floor1_trans.mp4",
                      reverseVideo: "/mix/videos/zones/zone1/tower1/floors/zone1_tower1_floor1_rev.mp4",
                      idleVideo: "mix/videos/zones/zone1/tower1/floors/floor1/zone1_tower1_floor1_idle.mp4",
                    },
                    units: [
                      // Tower 1, Floor 1
                      {
                        id: "apartment101",
                        projectId: "mix",
                        zoneId: "zone1",
                        buildingId: "tower1",
                        unitTypeId: "7B_BF_C03",
                        floorId: "floor1",
                        displayName: "A101",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7B_BF_C03/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment102", projectId: "mix", zoneId: "zone1", buildingId: "tower1", unitTypeId: "unit-type-b", floorId: "floor1", displayName: "A102", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                      { id: "apartment103", projectId: "mix", zoneId: "zone1", buildingId: "tower1", unitTypeId: "unit-type-c", floorId: "floor1", displayName: "A103", area: 120, price: 300000, bedrooms: 2, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.438, y: 0.3, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                      { id: "apartment104", projectId: "mix", zoneId: "zone1", buildingId: "tower1", unitTypeId: "unit-type-d", floorId: "floor1", displayName: "A104", area: 185, price: 350000, bedrooms: 3, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.65, y: 0.33, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                      { id: "apartment105", projectId: "mix", zoneId: "zone1", buildingId: "tower1", unitTypeId: "unit-type-b", floorId: "floor1", displayName: "A105", area: 250, price: 500000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.7, y: 0.65, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
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
                features: {
                  displayName: "Tower 1 Features",
                  x: 0.7, y: 0.65,
                  videos: {
                    forwardVideo: "/mix/videos/amenities/amenities_gen_trans_from_home.mp4",
                    reverseVideo: "/mix/videos/amenities/amenities_gen_rev_trans_to_home.mp4",
                    idleVideo: "/mix/videos/amenities/amenities_gen_idle.mp4",
                  },
                  items: [
                  {
                    id: "amenity1",
                    displayName: "Garage",
                    subtitle: "Tower Amenity",
                    description: "2-story garage...",
                    x: 0.2, y: 0.67,
                  },
                  {
                    id: "amenity2",
                    displayName: "Roof",
                    subtitle: "Tower Amenity",
                    description: "Spacious roof top suitable for family gatherings...",
                    x: 0.32, y: 0.65,
                  },
                ]
                },
                views: [
                  {
                    name: "Front View",
                    videos: {
                      forwardVideo: "mix/videos/zones/zone1/tower1/views/view1/zone1_tower1_view1_trans.mp4",
                      reverseVideo: "mix/videos/zones/zone1/tower1/views/view1/zone1_tower1_view1_rev.mp4",
                      idleVideo: "mix/videos/zones/zone1/tower1/views/view1/zone1_tower1_view1_idle.mp4",
                    }
                  },
                  {
                    name: "Right View",
                    videos: {
                      forwardVideo: "mix/videos/zones/zone1/tower1/views/view2/zone1_tower1_view2_trans.mp4",
                      reverseVideo: "mix/videos/zones/zone1/tower1/views/view2/zone1_tower1_view2_rev.mp4",
                      idleVideo: "mix/videos/zones/zone1/tower1/views/view2/zone1_tower1_view2_idle.mp4",
                    }
                  },
                  {
                    name: "Back View",
                    videos: {
                      forwardVideo: "mix/videos/zones/zone1/tower1/views/view3/zone1_tower1_view3_trans.mp4",
                      reverseVideo: "mix/videos/zones/zone1/tower1/views/view3/zone1_tower1_view3_rev.mp4",
                      idleVideo: "mix/videos/zones/zone1/tower1/views/view3/zone1_tower1_view3_idle.mp4",
                    }
                  },
                  {
                    name: "Left View",
                    videos: {
                      forwardVideo: "mix/videos/zones/zone1/tower1/views/view4/zone1_tower1_view4_trans.mp4",
                      reverseVideo: "mix/videos/zones/zone1/tower1/views/view4/zone1_tower1_view4_rev.mp4",
                      idleVideo: "mix/videos/zones/zone1/tower1/views/view4/zone1_tower1_view4_idle.mp4",
                    }
                  },

                ],
              },
              {
                id: "tower2",
                projectId: "mix",
                zoneId: "zone1",
                type: "tower",
                displayName: "Tower 2",
                highlight: "mix/highlight/towers/tower2.png",
                description: "Tower 2 description...",
                x: 0.65, y: 0.35,
                videos: {
                  forwardVideo: "/mix/videos/zones/zone1/tower2/zone1_tower2_gen_trans.mp4",
                  reverseVideo: "/mix/videos/zones/zone1/tower2/zone1_tower2_gen_rev.mp4",
                  idleVideo: "mix/videos/zones/zone1/tower2/views/view1/zone1_tower2_view1_idle.mp4",
                },
                floors: [
                  {
                    id: "floor1",
                    projectId: "mix",
                    zoneId: "zone1",
                    buildingId: "tower2",
                    type: "Residential",
                    displayName: "Floor 1",
                    description: "First floor description...",
                    x: 0.27, y: 0.57,
                    videos: {
                      forwardVideo: "/mix/videos/zones/zone1/tower2/floors/zone1_tower2_floor1_trans.mp4",
                      reverseVideo: "/mix/videos/zones/zone1/tower2/floors/zone1_tower2_floor1_rev.mp4",
                      idleVideo: "mix/videos/zones/zone1/tower2/floors/floor1/zone1_tower2_floor1_idle.mp4",
                    },
                    units: [
                      // Tower 2, Floor 1
                      { id: "apartment111", projectId: "mix", zoneId: "zone1", buildingId: "tower2", unitTypeId: "unit-type-g", floorId: "floor1", displayName: "A111", area: 140, price: 260000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.4, y: 0.58, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                      { id: "apartment112", projectId: "mix", zoneId: "zone1", buildingId: "tower2", unitTypeId: "unit-type-f", floorId: "floor1", displayName: "A112", area: 150, price: 325000, bedrooms: 2, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.21, y: 0.43, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                      { id: "apartment113", projectId: "mix", zoneId: "zone1", buildingId: "tower2", unitTypeId: "7B_BF_C03", floorId: "floor1", displayName: "A113", area: 85, price: 240000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.23, y: 0.2, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                      { id: "apartment114", projectId: "mix", zoneId: "zone1", buildingId: "tower2", unitTypeId: "unit-type-d", floorId: "floor1", displayName: "A114", area: 145, price: 375000, bedrooms: 3, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.6, y: 0.25, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                      { id: "apartment115", projectId: "mix", zoneId: "zone1", buildingId: "tower2", unitTypeId: "unit-type-b", floorId: "floor1", displayName: "A115", area: 220, price: 450000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.7, y: 0.65, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
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
                features: {
                  displayName: "Tower 2 Features",
                  x: 0.7, y: 0.65,
                  videos: {
                    forwardVideo: "/mix/videos/amenities/amenities_gen_trans_from_home.mp4",
                    reverseVideo: "/mix/videos/amenities/amenities_gen_rev_trans_to_home.mp4",
                    idleVideo: "/mix/videos/amenities/amenities_gen_idle.mp4",
                  },
                  items: [
                  {
                    id: "amenity1",
                    displayName: "Garage",
                    subtitle: "Tower Amenity",
                    description: "2-story garage...",
                    x: 0.2, y: 0.67,
                  },
                  {
                    id: "amenity2",
                    displayName: "Roof",
                    subtitle: "Tower Amenity",
                    description: "Spacious roof top suitable for family gatherings...",
                    x: 0.32, y: 0.65,
                  },
                ]
                },
                views: [
                  {
                    name: "Front View",
                    videos: {
                      forwardVideo: "mix/videos/zones/zone1/tower2/views/view1/zone1_tower2_view1_trans.mp4",
                      reverseVideo: "mix/videos/zones/zone1/tower2/views/view1/zone1_tower2_view1_rev.mp4",
                      idleVideo: "mix/videos/zones/zone1/tower2/views/view1/zone1_tower2_view1_idle.mp4",
                    }
                  },
                  {
                    name: "Right View",
                    videos: {
                      forwardVideo: "mix/videos/zones/zone1/tower2/views/view2/zone1_tower2_view2_trans.mp4",
                      reverseVideo: "mix/videos/zones/zone1/tower2/views/view2/zone1_tower2_view2_rev.mp4",
                      idleVideo: "mix/videos/zones/zone1/tower2/views/view2/zone1_tower2_view2_idle.mp4",
                    }
                  },
                  {
                    name: "Back View",
                    videos: {
                      forwardVideo: "mix/videos/zones/zone1/tower2/views/view3/zone1_tower2_view3_trans.mp4",
                      reverseVideo: "mix/videos/zones/zone1/tower2/views/view3/zone1_tower2_view3_rev.mp4",
                      idleVideo: "mix/videos/zones/zone1/tower2/views/view3/zone1_tower2_view3_idle.mp4",
                    }
                  },
                  {
                    name: "Left View",
                    videos: {
                      forwardVideo: "mix/videos/zones/zone1/tower2/views/view4/zone1_tower2_view4_trans.mp4",
                      reverseVideo: "mix/videos/zones/zone1/tower2/views/view4/zone1_tower2_view4_rev.mp4",
                      idleVideo: "mix/videos/zones/zone1/tower2/views/view4/zone1_tower2_view4_idle.mp4",
                    }
                  },

                ],
              },
            ],
          },
        ]
      },

      unitTypes: {
        // Type A: 2B1B, 85m² — e.g., apartment101, 113, 222
        "7B_BF_C03": {
          id: "7B_BF_C03",
          bedrooms: 2, bathrooms: 1,
          area: 85,
          serviceRooms: ["Hard Kitchen"],
          gallery: [{ id: "gallery1", src: "/mix/images//v1.svg" }, { id: "gallery2", src: "/mix/images/v2.svg" }, { id: "gallery3", src: "/mix/images/v3.svg" }, { id: "gallery4", src: "/mix/images/v4.svg" }],
          cutSections: [{ id: "cut1", src: "/mix/images/c1.png" }, { id: "cut2", src: "/mix/images/c2.png" }, { id: "cut3", src: "/mix/images/c3.png" }, { id: "cut4", src: "/mix/images/c4.png" }],
          floorPlans: [{ id: "floor1", src: "/mix/images/fp1.png" }],
          paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
          interior: {
            levels: [{
              id: "floor1",
              rooms: [
                {
                  id: "room1",
                  displayName: "B01",
                  furnitureImg: "/mix/panorama/7B_BF_C03/bedroom_f.jpg",
                  unfurnitureImg: "/mix/panorama/7B_BF_C03/bedroom_unf.jpg",
                  description: "A spacious livingroom...",
                  x: 0.48, y: 0.79,
                  hotspots: []
                },
                {
                  id: "room2",
                  displayName: "T01",
                  furnitureImg: "/mix/panorama/7B_BF_C03/toilet_f.jpg",
                  unfurnitureImg: "/mix/panorama/7B_BF_C03/toilet_unf.jpg",
                  x: 0.37, y: 0.46,
                  hotspots: []
                },
                {
                  id: "room3",
                  displayName: "D01",
                  furnitureImg: "/mix/panorama/7B_BF_C03/dining_f.jpg",
                  unfurnitureImg: "/mix/panorama/7B_BF_C03/dining_unf.jpg",
                  x: 0.52, y: 0.42,
                  hotspots: []
                },
                {
                  id: "room4",
                  displayName: "K01",
                  furnitureImg: "/mix/panorama/7B_BF_C03/kitchen_f.jpg",
                  unfurnitureImg: "/mix/panorama/7B_BF_C03/kitchen_unf.jpg",
                  x: 0.46, y: 0.59,
                  hotspots: []
                },
                {
                  id: "room5",
                  displayName: "L01",
                  furnitureImg: "/mix/panorama/7B_BF_C03/living_f.jpg",
                  unfurnitureImg: "/mix/panorama/7B_BF_C03/living_unf.jpg",
                  x: 0.5, y: 0.19,
                  hotspots: []
                }
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
            levels: [{
              id: "floor1",
              rooms: [
                { id: "room1", displayName: "Livingroom", furnitureImg: "/mix/panorama/livingroom.png", unfurnitureImg: "/mix/panorama/livingroom_unf.png", hotspots: [{ id: 'spot1', yaw: 25, pitch: -5, type: 'scene', label: "Bedroom" }, { id: 'spot2', yaw: 25, pitch: 5, type: 'scene', label: "Master Bedroom" }, { id: 'spot3', yaw: 0, pitch: 0, type: 'scene', label: "Dinning and Kitchen" }] },
                { id: "room2", displayName: "Dinning and Kitchen", furnitureImg: "/mix/panorama/dinning_kitchen.png", unfurnitureImg: "/mix/panorama/dinning_kitchen_unf.png", hotspots: [{ id: 'spot1', yaw: -65, pitch: -25, type: 'scene', label: "Livingroom" }, { id: 'spot2', yaw: 83, pitch: 0, type: 'scene', label: "Bedroom" }, { id: 'spot3', yaw: 83, pitch: -10, type: 'scene', label: "Master Bedroom" }] },
                { id: "room3", displayName: "Bedroom", furnitureImg: "/mix/panorama/bedroom.png", unfurnitureImg: "/mix/panorama/bedroom_unf.png", hotspots: [{ id: 'spot1', yaw: -105, pitch: -10, type: 'scene', label: "Livingroom" }] },
                { id: "room4", displayName: "Master Bedroom", furnitureImg: "/mix/panorama/master_bedroom.png", unfurnitureImg: "/mix/panorama/master_bedroom_unf.png", hotspots: [{ id: 'spot1', yaw: -115, pitch: -5, type: 'scene', label: "Livingroom" }, { id: 'spot2', yaw: -115, pitch: -15, type: 'scene', label: "Bathroom" }] },
                { id: "room5", displayName: "Bathroom", furnitureImg: "/mix/panorama/bathroom.png", unfurnitureImg: "/mix/panorama/bathroom_unf.png", hotspots: [{ id: 'spot1', yaw: -3, pitch: -20, type: 'scene', label: "Master Bedroom" }] }
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
            levels: [{
              id: "floor1",
              rooms: [
                {
                  id: "room1",
                  displayName: "Entrance 1", // must match the hotspot label
                  furnitureImg: "/mix/panorama/entrance01.png",
                  unfurnitureImg: "/mix/panorama/entrance01_unf.png",
                  hotspots: [
                    {
                      id: 'spot1',
                      yaw: 25,
                      pitch: -9,
                      type: 'scene',
                      label: "Entrance 2", // must match the room displayName
                    },
                  ]
                },
                {
                  id: "room2",
                  displayName: "Entrance 2",
                  furnitureImg: "/mix/panorama/entrance02.png",
                  unfurnitureImg: "/mix/panorama/entrance02_unf.png",
                  hotspots: [
                    {
                      id: 'spot1',
                      yaw: -135,
                      pitch: -10,
                      type: 'scene',
                      label: "Entrance 1",
                    },
                    {
                      id: 'spot2',
                      yaw: -20,
                      pitch: -2,
                      type: 'scene',
                      label: "Entrance 3-1",
                    },
                    {
                      id: 'spot3',
                      yaw: 27,
                      pitch: -12,
                      type: 'scene',
                      label: "Entrance 3-2",
                    }
                  ]
                },
                {
                  id: "room3",
                  displayName: "Entrance 3-1",
                  furnitureImg: "/mix/panorama/entrance03.1.png",
                  unfurnitureImg: "/mix/panorama/entrance03.1_unf.png",
                  hotspots: [
                    {
                      id: 'spot1',
                      yaw: -140,
                      pitch: -7,
                      type: 'scene',
                      label: "Entrance 2",
                    },
                    {
                      id: 'spot2',
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
                  furnitureImg: "/mix/panorama/entrance03.2.png",
                  unfurnitureImg: "/mix/panorama/entrance03.2_unf.png",
                  hotspots: [
                    {
                      id: 'spot1',
                      yaw: -165,
                      pitch: -8,
                      type: 'scene',
                      label: "Entrance 2",
                    },
                    {
                      id: 'spot2',
                      yaw: -80,
                      pitch: -5,
                      type: 'scene',
                      label: "Entrance 4",
                    },
                  ]
                },
                {
                  id: "room5",
                  displayName: "Entrance 4",
                  furnitureImg: "/mix/panorama/entrance04.png",
                  unfurnitureImg: "/mix/panorama/entrance04_unf.png",
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
      },
    },
  ],
};

