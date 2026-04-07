import SOMABAY_LOGO from '../assets/somabay-logo.svg';
// import SOMABAY_BG from '../assets/images/somabay-background.jpg';
import SOMABAY_BG from '../../public/light-house/images/background.png';

import AirportIcon from '../assets/icons/airport.svg';
import CairoAirportSvg from '../assets/paths/airport.svg?raw';

const projectName = "light-house"

export const DEVELOPER_SOMABAY = {
  developerId: "somabay",
  developerLogo: SOMABAY_LOGO,
  backgroundImage: SOMABAY_BG,
  developerProjects: [
    {
      id: "light-house",
      name: "Light House",
      thumbnail: null,
      description: "Located at the tip of the peninsula, The Lighthouse Somabay gives you a unique panoramic view of the reef and the bay at once.",
      introVideo: `/${projectName}/videos/loading.mp4`,
      idleVideo: `/${projectName}/videos/home/home_idle.mp4`,
      zoomoutVideo: `/${projectName}/videos/home/home_out.mp4`,

      surroundings: {
        id: "surroundings",
        displayName: "Surroundings",
        zoomoutVideo: "",
        videos: {
          forwardVideo: "",
          reverseVideo: "",
          idleVideo: "",
        },
        items: [
          {
            id: "surrounding1",
            displayName: "Cairo Airport",
            iconSrc: AirportIcon,
            thumbnail: "",
            distance: "",
            description: "Cairo International Airport is the principal international airport of Cairo and the largest and busiest airport in Egypt. It serves as the primary hub for Egyptair and Nile Air as well as several other airlines.",
            x: 0.49, y: 0.28,
            svgPath: CairoAirportSvg,
          },
        ],
      },

      amenities: {
        id: "amenities",
        displayName: "Amenities",
        zoomoutVideo: `/${projectName}/videos/amenities/amenities_out.mp4`,
        videos: {
          forwardVideo: `/${projectName}/videos/amenities/amenities_gen_trans_from_home.mp4`,
          reverseVideo: `/${projectName}/videos/amenities/amenities_gen_rev_trans_to_home.mp4`,
          idleVideo: `/${projectName}/videos/amenities/amenities_gen_idle.mp4`,
        },
        items: [
          {
            id: "amenity1",
            displayName: "Landscapes",
            subtitle: "Amenity",
            thumbnail: `/${projectName}/thumbnails/amenities/f1.png`,
            description: "Modern landscapes provide a beautiful view of the mall area.",
            x: 0.2, y: 0.67,
            videos: {
              forwardVideo: `/${projectName}/videos/amenities/amenity1/amenity1_trans.mp4`,
              reverseVideo: `/${projectName}/videos/amenities/amenity1/amenity1_rev.mp4`,
              idleVideo: `/${projectName}/videos/amenities/amenity1/amenity1_idle.mp4`,
            },
          },
        ]
      },

      zones: {
        id: "zones",
        displayName: "Zones",
        zoomoutVideo: `/${projectName}/videos/zones/zones_out.mp4`, // reuse home zoomout, but will change later to videos/zones/zones_out.
        videos: {
          forwardVideo: null,
          reverseVideo: null,
          idleVideo: null,
        },
        items: [
          {
            id: "zone1",
            projectId: "mix",
            displayName: "Towers",
            subtitle: "Residential Area",
            thumbnail: null,
            highlight: null,
            description: "Our towers hold different apartments options. They are at the center of the city.",
            x: 0.93, y: 0.53,
            videos: {
              forwardVideo: `/${projectName}/videos/zones/zones_gen_trans_from_home.mp4`,
              reverseVideo: `/${projectName}/videos/zones/zones_gen_rev_to_home.mp4`,
              idleVideo: `/${projectName}/videos/zones/zones_gen_idle.mp4`,
            },
            properties: [
              {
                id: "tower1",
                projectId: "mix",
                zoneId: "zone1",
                type: "tower",
                displayName: "7A",
                highlight: `/${projectName}/highlight/7A Tower.png`,
                description: null,
                x: 0.57, y: 0.2,
                videos: {
                  forwardVideo: `/${projectName}/videos/zones/7a/7a_gen_trans.mp4`,
                  reverseVideo: `/${projectName}/videos/zones/7a/7a_gen_rev.mp4`,
                  idleVideo: `/${projectName}/videos/zones/7a/views/view1/7a_view1_idle.mp4`,
                },
                floors: [
                  {
                    id: "floor-1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectName}/highlight/7A/Floor 1.png`,
                    description: null,
                    x: 0.37, y: 0.94,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/floors/basement/7a_floors_basement_idle.mp4`,
                    },
                    units: [
                      // 7A, Floor 1
                      {
                        id: "apartment101",
                        unitTypeId: "7a-unit",
                        displayName: "A101",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7a_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment102", unitTypeId: "7a-unit", displayName: "A102", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7a_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                  {
                    id: "floor-2",
                    projectId: "mix",
                    zoneId: "zone1",
                    buildingId: "tower1",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectName}/highlight/7A/Floor 2.png`,
                    description: null,
                    x: 0.37, y: 0.81,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/floors/ground/7a_floors_ground_idle.mp4`,
                    },
                    units: [
                      // 7A, Floor 2
                      {
                        id: "apartment201",
                        unitTypeId: "7a-unit",
                        displayName: "A201",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7a_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment202", unitTypeId: "7a-unit", displayName: "A202", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7a_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                  {
                    id: "floor-3",
                    projectId: "mix",
                    zoneId: "zone1",
                    buildingId: "tower1",
                    type: "Residential",
                    displayName: "Floor 3",
                    highlight: `/${projectName}/highlight/7A/Floor 3.png`,
                    description: null,
                    x: 0.37, y: 0.68,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/floors/floor1/7a_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7A, Floor 3
                      {
                        id: "apartment301",
                        unitTypeId: "7a-unit",
                        displayName: "A301",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7a_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment302", unitTypeId: "7a-unit", displayName: "A302", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7a_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                  {
                    id: "floor-4",
                    projectId: "mix",
                    zoneId: "zone1",
                    buildingId: "tower1",
                    type: "Residential",
                    displayName: "Floor 4",
                    highlight: `/${projectName}/highlight/7A/Floor 4.png`,
                    description: null,
                    x: 0.37, y: 0.55,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/floors/floor1/7a_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7A, Floor 4
                      {
                        id: "apartment401",
                        unitTypeId: "7a-unit",
                        displayName: "A401",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7a_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment402", unitTypeId: "7a-unit", displayName: "A402", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7a_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                  {
                    id: "roof",
                    projectId: "mix",
                    zoneId: "zone1",
                    buildingId: "tower1",
                    type: "Residential",
                    displayName: "Roof",
                    highlight: `/${projectName}/highlight/7A/Roof.png`,
                    description: null,
                    x: 0.37, y: 0.42,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/floors/floor1/7a_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7A, Roof
                      {
                        id: "apartment501",
                        unitTypeId: "7a-unit",
                        displayName: "A501",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7a_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment502", unitTypeId: "7a-unit", displayName: "A502", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7a_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                ],
                features: {
                  displayName: "7A Features",
                  x: 0.7, y: 0.65,
                  videos: {
                    forwardVideo: `/${projectName}/videos/zones/7a/features/features_gen_trans.mp4`,
                    reverseVideo: `/${projectName}/videos/zones/7a/features/features_gen_rev.mp4`,
                    idleVideo: `/${projectName}/videos/zones/7a/features/features_gen_idle.mp4`,
                  },
                  items: [
                  {
                    id: "feature1",
                    displayName: "Garage",
                    subtitle: "7A Feature",
                    description: "2-story garage...",
                    x: 0.2, y: 0.67,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/features/feature1/feature1_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/features/feature1/feature1_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/features/feature1/feature1_idle.mp4`,
                    },
                  },
                  {
                    id: "feature2",
                    displayName: "Roof",
                    subtitle: "7A Feature",
                    description: "Spacious roof top suitable for family gatherings...",
                    x: 0.32, y: 0.65,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/features/feature2/feature2_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/features/feature2/feature2_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/features/feature2/feature2_idle.mp4`,
                    },
                  },
                  {
                    id: "feature3",
                    displayName: "Room Service",
                    subtitle: "7A Feature",
                    description: "Exclusive room service for residents, offering a variety of dining options and amenities delivered directly to your apartment.",
                    x: 0.32, y: 0.65,
                    videos: {
                      forwardVideo: null,
                      reverseVideo: null,
                      idleVideo: `/${projectName}/panorama/7a-features/feature3.jpg`,
                    },
                  },
                ]
                },
                views: [
                  {
                    name: "View 1",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/views/view1/7a_view1_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/views/view1/7a_view1_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/views/view1/7a_view1_idle.mp4`,
                    }
                  },
                  {
                    name: "View 2",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/views/view2/7a_view2_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/views/view2/7a_view2_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/views/view2/7a_view2_idle.mp4`,
                    }
                  },
                  {
                    name: "View 3",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/views/view3/7a_view3_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/views/view3/7a_view3_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/views/view3/7a_view3_idle.mp4`,
                    }
                  },
                  {
                    name: "View 4",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/views/view4/7a_view4_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/views/view4/7a_view4_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/views/view4/7a_view4_idle.mp4`,
                    }
                  },
                ],
              },
              // {
              //   id: "tower2",
              //   projectId: "mix",
              //   zoneId: "zone1",
              //   type: "tower",
              //   displayName: "Tower 2",
              //   highlight: "mix/highlight/towers/tower2.png",
              //   description: "Tower 2 description...",
              //   x: 0.65, y: 0.35,
              //   videos: {
              //     forwardVideo: "/mix/videos/zones/zone1/tower2/zone1_tower2_gen_trans.mp4",
              //     reverseVideo: "/mix/videos/zones/zone1/tower2/zone1_tower2_gen_rev.mp4",
              //     idleVideo: "mix/videos/zones/zone1/tower2/views/view1/zone1_tower2_view1_idle.mp4",
              //   },
              //   floors: [
              //     {
              //       id: "floor1",
              //       projectId: "mix",
              //       zoneId: "zone1",
              //       buildingId: "tower2",
              //       type: "Residential",
              //       displayName: "Floor 1",
              //       description: "First floor description...",
              //       x: 0.27, y: 0.57,
              //       videos: {
              //         forwardVideo: "/mix/videos/zones/zone1/tower2/floors/zone1_tower2_floor1_trans.mp4",
              //         reverseVideo: "/mix/videos/zones/zone1/tower2/floors/zone1_tower2_floor1_rev.mp4",
              //         idleVideo: "mix/videos/zones/zone1/tower2/floors/floor1/zone1_tower2_floor1_idle.mp4",
              //       },
              //       units: [
              //         // Tower 2, Floor 1
              //         { id: "apartment111", projectId: "mix", zoneId: "zone1", buildingId: "tower2", unitTypeId: "unit-type-g", floorId: "floor1", displayName: "A111", area: 140, price: 260000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.4, y: 0.58, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
              //         { id: "apartment112", projectId: "mix", zoneId: "zone1", buildingId: "tower2", unitTypeId: "unit-type-f", floorId: "floor1", displayName: "A112", area: 150, price: 325000, bedrooms: 2, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.21, y: 0.43, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
              //         { id: "apartment113", projectId: "mix", zoneId: "zone1", buildingId: "tower2", unitTypeId: "7B_BF_C03", floorId: "floor1", displayName: "A113", area: 85, price: 240000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.23, y: 0.2, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
              //         { id: "apartment114", projectId: "mix", zoneId: "zone1", buildingId: "tower2", unitTypeId: "unit-type-d", floorId: "floor1", displayName: "A114", area: 145, price: 375000, bedrooms: 3, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.6, y: 0.25, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
              //         { id: "apartment115", projectId: "mix", zoneId: "zone1", buildingId: "tower2", unitTypeId: "unit-type-b", floorId: "floor1", displayName: "A115", area: 220, price: 450000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.7, y: 0.65, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
              //       ],
              //       features: [
              //         {
              //           id: "amenity1",
              //           displayName: "Meeting Room",
              //           subtitle: "Corridor Amenity",
              //           description: "...",
              //           x: 0.17, y: 0.69,
              //         },
              //       ],
              //     },
              //   ],
              //   features: {
              //     displayName: "Tower 2 Features",
              //     x: 0.7, y: 0.65,
              //     videos: {
              //       forwardVideo: "/mix/videos/amenities/amenities_gen_trans_from_home.mp4",
              //       reverseVideo: "/mix/videos/amenities/amenities_gen_rev_trans_to_home.mp4",
              //       idleVideo: "/mix/videos/amenities/amenities_gen_idle.mp4",
              //     },
              //     items: [
              //     {
              //       id: "amenity1",
              //       displayName: "Garage",
              //       subtitle: "Tower Amenity",
              //       description: "2-story garage...",
              //       x: 0.2, y: 0.67,
              //     },
              //     {
              //       id: "amenity2",
              //       displayName: "Roof",
              //       subtitle: "Tower Amenity",
              //       description: "Spacious roof top suitable for family gatherings...",
              //       x: 0.32, y: 0.65,
              //     },
              //   ]
              //   },
              //   views: [
              //     {
              //       name: "Front View",
              //       videos: {
              //         forwardVideo: "mix/videos/zones/zone1/tower2/views/view1/zone1_tower2_view1_trans.mp4",
              //         reverseVideo: "mix/videos/zones/zone1/tower2/views/view1/zone1_tower2_view1_rev.mp4",
              //         idleVideo: "mix/videos/zones/zone1/tower2/views/view1/zone1_tower2_view1_idle.mp4",
              //       }
              //     },
              //     {
              //       name: "Right View",
              //       videos: {
              //         forwardVideo: "mix/videos/zones/zone1/tower2/views/view2/zone1_tower2_view2_trans.mp4",
              //         reverseVideo: "mix/videos/zones/zone1/tower2/views/view2/zone1_tower2_view2_rev.mp4",
              //         idleVideo: "mix/videos/zones/zone1/tower2/views/view2/zone1_tower2_view2_idle.mp4",
              //       }
              //     },
              //     {
              //       name: "Back View",
              //       videos: {
              //         forwardVideo: "mix/videos/zones/zone1/tower2/views/view3/zone1_tower2_view3_trans.mp4",
              //         reverseVideo: "mix/videos/zones/zone1/tower2/views/view3/zone1_tower2_view3_rev.mp4",
              //         idleVideo: "mix/videos/zones/zone1/tower2/views/view3/zone1_tower2_view3_idle.mp4",
              //       }
              //     },
              //     {
              //       name: "Left View",
              //       videos: {
              //         forwardVideo: "mix/videos/zones/zone1/tower2/views/view4/zone1_tower2_view4_trans.mp4",
              //         reverseVideo: "mix/videos/zones/zone1/tower2/views/view4/zone1_tower2_view4_rev.mp4",
              //         idleVideo: "mix/videos/zones/zone1/tower2/views/view4/zone1_tower2_view4_idle.mp4",
              //       }
              //     },

              //   ],
              // },
            ],
          },
        ]
      },

      unitTypes: {
        // Type A: 2B1B, 85m² — e.g., apartment101, 113, 222
        "7a-unit": {
          id: "7a-unit",
          bedrooms: 2, bathrooms: 1,
          area: 85,
          serviceRooms: ["Hard Kitchen"],
          gallery: [{ id: "gallery1", src: `/${projectName}/images/v1.svg` }, { id: "gallery2", src: `/${projectName}/images/v2.svg` }, { id: "gallery3", src: `/${projectName}/images/v3.svg` }, { id: "gallery4", src: `/${projectName}/images/v4.svg` }],
          cutSections: [{ id: "cut1", src: `/${projectName}/images/c1.png` }, { id: "cut2", src: `/${projectName}/images/c2.png` }, { id: "cut3", src: `/${projectName}/images/c3.png` }, { id: "cut4", src: `/${projectName}/images/c4.png` }],
          floorPlans: [{ id: "floor1", src: `/${projectName}/images/fp1.png` }],
          paymentPlans: [{ downPayment: 4999999, monthly: 499999, years: 8 }, { downPayment: 2999999, monthly: 299999, years: 20 }],
          interior: {
            levels: [{
              id: "floor1",
              rooms: [
                {
                  id: "room1",
                  displayName: "B01",
                  furnitureImg: `/${projectName}/panorama/7a-unit/bedroom_f.jpg`,
                  unfurnitureImg: `/${projectName}/panorama/7a-unit/bedroom_unf.jpg`,
                  description: "A spacious livingroom...",
                  x: 0.48, y: 0.79,
                  hotspots: []
                },
                {
                  id: "room2",
                  displayName: "T01",
                  furnitureImg: `/${projectName}/panorama/7a-unit/toilet_f.jpg`,
                  unfurnitureImg: `/${projectName}/panorama/7a-unit/toilet_unf.jpg`,
                  x: 0.37, y: 0.46,
                  hotspots: []
                },
                {
                  id: "room3",
                  displayName: "D01",
                  furnitureImg: `/${projectName}/panorama/7a-unit/dining_f.jpg`,
                  unfurnitureImg: `/${projectName}/panorama/7a-unit/dining_unf.jpg`,
                  x: 0.52, y: 0.42,
                  hotspots: []
                },
                {
                  id: "room4",
                  displayName: "K01",
                  furnitureImg: `/${projectName}/panorama/7a-unit/kitchen_f.jpg`,
                  unfurnitureImg: `/${projectName}/panorama/7a-unit/kitchen_unf.jpg`,
                  x: 0.46, y: 0.59,
                  hotspots: []
                },
                {
                  id: "room5",
                  displayName: "L01",
                  furnitureImg: `/${projectName}/panorama/7a-unit/living_f.jpg`,
                  unfurnitureImg: `/${projectName}/panorama/7a-unit/living_unf.jpg`,
                  x: 0.5, y: 0.19,
                  hotspots: []
                }
              ]
            }]
          }
        },
      },
    },
  ],
};

