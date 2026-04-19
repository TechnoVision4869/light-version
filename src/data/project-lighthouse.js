import SOMABAY_LOGO from '../assets/somabay-logo.svg';
// import SOMABAY_BG from '../assets/images/somabay-background.jpg';
const SOMABAY_BG = '/light-house/images/background.jpeg';

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
      name: "The Lighthouse",
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
                id: "7a",
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
                    id: "basement",
                    type: "Residential",
                    displayName: "Basement",
                    highlight: `/${projectName}/highlight/7A/basement.png`,
                    description: null,
                    x: 0.21, y: 0.96,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/floors/basement/7a_floors_basement_idle.mp4`,
                    },
                    units: [
                      {
                        id: "107AC01",
                        unitTypeId: "107AC01",
                        displayName: "107AC01",
                        area: 113.9,
                        price: null,
                        bedrooms: 2, bathrooms: 1,
                        x: 0.745, y: 0.35,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7a/basement/107AC01.png`
                        }
                      },
                      { id: "107AC02", unitTypeId: "107AC02", displayName: "107AC02", area: 95.9, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.635, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/basement/107AC02.png` } },
                      { id: "107AC03", unitTypeId: "107AC03", displayName: "107AC03", area: 128.3, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.48, y: 0.68, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/basement/107AC03.png` } },
                      { id: "107AC04", unitTypeId: "107AC04", displayName: "107AC04", area: 120.9, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.32, y: 0.45, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/basement/107AC04.png` } },
                    ],
                  },
                  {
                    id: "ground",
                    type: "Residential",
                    displayName: "Ground",
                    highlight: `/${projectName}/highlight/7A/ground.png`,
                    description: null,
                    x: 0.225, y: 0.84,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/floors/ground/7a_floors_ground_idle.mp4`,
                    },
                    units: [
                      {
                        id: "107A01",
                        unitTypeId: "107A01",
                        displayName: "107A01",
                        area: 113.9,
                        price: null,
                        bedrooms: 2, bathrooms: 1,
                        x: 0.745, y: 0.35,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7a/ground/107A01.png`
                        }
                      },
                      { id: "107A02", unitTypeId: "107A02", displayName: "107A02", area: 95.9, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.635, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/ground/107A02.png` } },
                      { id: "107A03", unitTypeId: "107A03", displayName: "107A03", area: 128.3, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.48, y: 0.68, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/ground/107A03.png` } },
                      { id: "107A04", unitTypeId: "107A04", displayName: "107A04", area: 120.9, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.32, y: 0.45, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/ground/107A04.png` } },
                    ],
                  },
                  {
                    id: "floor-1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectName}/highlight/7A/floor1.png`,
                    description: null,
                    x: 0.24, y: 0.705,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/floors/floor1/7a_floors_floor1_idle.mp4`,
                    },
                    units: [
                      {
                        id: "107A11",
                        unitTypeId: "107A11",
                        displayName: "107A11",
                        area: 113.9,
                        price: null,
                        bedrooms: 2, bathrooms: 1,
                        x: 0.745, y: 0.35,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7a/floor1/107A11.png`
                        }
                      },
                      { id: "107A12", unitTypeId: "107A12", displayName: "107A12", area: 95.9, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.635, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/floor1/107A12.png` } },
                      { id: "107A13", unitTypeId: "107A13", displayName: "107A13", area: 128.3, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.48, y: 0.68, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/floor1/107A13.png` } },
                      { id: "107A14", unitTypeId: "107A14", displayName: "107A14", area: 120.9, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.32, y: 0.45, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/floor1/107A14.png` } },
                    ],
                  },
                  {
                    id: "floor-2",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectName}/highlight/7A/floor2.png`,
                    description: null,
                    x: 0.245, y: 0.575,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/floors/floor2/7a_floors_floor2_idle.mp4`,
                    },
                    units: [
                      {
                        id: "107A21",
                        unitTypeId: "107A21",
                        displayName: "107A21",
                        area: 116.5,
                        price: null,
                        bedrooms: 2, bathrooms: 1,
                        x: 0.745, y: 0.35,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7a/floor2/107A21.png`
                        }
                      },
                      { id: "107A22", unitTypeId: "107A22", displayName: "107A22", area: 157, price: null, bedrooms: 2, bathrooms: 3,
                       x: 0.585, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/floor2/107A22.png` } },
                      { id: "107A23", unitTypeId: "107A23", displayName: "107A23", area: 160, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.325, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/floor2/107A23.png` } },
                    ],
                  },
                  {
                    id: "floor-3",
                    type: "Residential",
                    displayName: "Floor 3",
                    highlight: `/${projectName}/highlight/7A/floor3.png`,
                    description: null,
                    x: 0.255, y: 0.455,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7a/floors/floor3/7a_floors_floor3_idle.mp4`,
                    },
                    units: [
                      {
                        id: "107A31",
                        unitTypeId: "107A31",
                        displayName: "107A31",
                        area: 227.4,
                        price: null,
                        bedrooms: 3, bathrooms: 3,
                        x: 0.37, y: 0.5,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7a/floor3/107A31.png`
                        },
                      },
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
                    x: 0.62, y: 0.65,
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
                    x: 0.5, y: 0.65,
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
              
            ],
          },
        ]
      },

      unitTypes: {
        // 7A, Basement
        "107AC01": { id: "107AC01", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/L01.jpeg`, unfurnitureImgId: null, x: 0.753, y: 0.579, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/D01.jpeg`, unfurnitureImgId: null, x: 0.668, y: 0.619, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k12_unf.jpeg`, x: 0.631, y: 0.445, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.518, y: 0.458, hotspots: [] }, { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b03_f.jpg`, unfurnitureImgId: `/${projectName}/panorama/b03_unf.jpg`, x: 0.371, y: 0.458, hotspots: [] }, { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, x: 0.258, y: 0.458, hotspots: [] }] }] } },
        "107AC02": { id: "107AC02", bedrooms: 1, bathrooms: 1, area: 95.9,  serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l14_unf.jpeg`, x: 0.37, y: 0.653, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d14_unf.jpeg`, x: 0.443, y: 0.722, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k14_unf.jpeg`, x: 0.48, y: 0.432, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t11_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t11_unf.jpeg`, x: 0.597, y: 0.432, hotspots: [] }, { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectName}/panorama/b02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b02_unf.jpeg`, x: 0.731, y: 0.458, hotspots: [] }] }] } },
        "107AC03": { id: "107AC03", bedrooms: 2, bathrooms: 2, area: 128.3, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l14_unf.jpeg`, x: 0.384, y: 0.428, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d14_unf.jpeg`, x: 0.464, y: 0.428, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k14_unf.jpeg`, x: 0.485, y: 0.21, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.471, y: 0.747, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.572, y: 0.747, hotspots: [] }, { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b17_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b17_unf.jpeg`, x: 0.353, y: 0.65, hotspots: [] }, { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b01_unf.jpeg`, x: 0.687, y: 0.65, hotspots: [] }] }] } },
        "107AC04": { id: "107AC04", bedrooms: 2, bathrooms: 2, area: 120.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l14_unf.jpeg`, x: 0.277, y: 0.487, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d14_unf.jpeg`, x: 0.378, y: 0.487, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k14_unf.jpeg`, x: 0.408, y: 0.271, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t08_unf.jpeg`, x: 0.443, y: 0.721, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t08_unf.jpeg`, x: 0.536, y: 0.284, hotspots: [] }, { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, x: 0.627, y: 0.323, hotspots: [] }, { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, x: 0.663, y: 0.629, hotspots: [] }] }] } },
        // 7A, Ground
        "107A01": { id: "107A01", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l12_unf.jpeg`, x: 0.311, y: 0.46, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d12_unf.jpeg`, x: 0.396, y: 0.42, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k12_unf.jpeg`, x: 0.433, y: 0.555, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.526, y: 0.555, hotspots: [] }, { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b03_unf.jpeg`, x: 0.656, y: 0.555, hotspots: [] }, { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, x: 0.757, y: 0.555, hotspots: [] }] }] } },
        "107A02": { id: "107A02", bedrooms: 1, bathrooms: 1, area: 95.9,  serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l14_unf.jpeg`, x: 0.37, y: 0.653, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d14_unf.jpeg`, x: 0.443, y: 0.722, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k14_unf.jpeg`, x: 0.48, y: 0.432, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t11_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t11_unf.jpeg`, x: 0.597, y: 0.432, hotspots: [] }, { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectName}/panorama/b02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b02_unf.jpeg`, x: 0.731, y: 0.458, hotspots: [] }] }] } },
        "107A03": { id: "107A03", bedrooms: 2, bathrooms: 2, area: 128.3, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l14_unf.jpeg`, x: 0.406, y: 0.487, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d14_unf.jpeg`, x: 0.485, y: 0.487, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k14_unf.jpeg`, x: 0.5, y: 0.205, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.493, y: 0.773, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.599, y: 0.773, hotspots: [] }, { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b17_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b17_unf.jpeg`, x: 0.369, y: 0.663, hotspots: [] }, { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b01_unf.jpeg`, x: 0.728, y: 0.663, hotspots: [] }] }] } },
        "107A04": { id: "107A04", bedrooms: 2, bathrooms: 2, area: 120.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l14_unf.jpeg`, x: 0.277, y: 0.487, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d14_unf.jpeg`, x: 0.378, y: 0.487, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k14_unf.jpeg`, x: 0.408, y: 0.271, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t08_unf.jpeg`, x: 0.443, y: 0.721, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t08_unf.jpeg`, x: 0.536, y: 0.31, hotspots: [] }, { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, x: 0.627, y: 0.323, hotspots: [] }, { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, x: 0.663, y: 0.629, hotspots: [] }] }] } },
        // 7A, Floor 1
        "107A11": { id: "107A11", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l12_unf.jpeg`, x: 0.313, y: 0.419, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d12_unf.jpeg`, x: 0.399, y: 0.394, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k12_unf.jpeg`, x: 0.435, y: 0.552, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.535, y: 0.539, hotspots: [] }, { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b03_unf.jpeg`, x: 0.653, y: 0.526, hotspots: [] }, { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, x: 0.751, y: 0.526, hotspots: [] }] }] } },
        "107A12": { id: "107A12", bedrooms: 1, bathrooms: 1, area: 95.9,  serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l14_unf.jpeg`, x: 0.361, y: 0.731, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d14_unf.jpeg`, x: 0.444, y: 0.731, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k14_unf.jpeg`, x: 0.474, y: 0.417, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t11_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t11_unf.jpeg`, x: 0.595, y: 0.443, hotspots: [] }, { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectName}/panorama/b02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b02_unf.jpeg`, x: 0.731, y: 0.456, hotspots: [] }] }] } },
        "107A13": { id: "107A13", bedrooms: 2, bathrooms: 2, area: 128.3, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l14_unf.jpeg`, x: 0.399, y: 0.498, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d14_unf.jpeg`, x: 0.478, y: 0.498, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k14_unf.jpeg`, x: 0.507, y: 0.207, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.493, y: 0.784, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.601, y: 0.784, hotspots: [] }, { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b17_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b17_unf.jpeg`, x: 0.365, y: 0.674, hotspots: [] }, { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b01_unf.jpeg`, x: 0.732, y: 0.674, hotspots: [] }] }] } },
        "107A14": { id: "107A14", bedrooms: 2, bathrooms: 2, area: 120.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l14_unf.jpeg`, x: 0.277, y: 0.487, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d14_unf.jpeg`, x: 0.378, y: 0.487, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k14_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k14_unf.jpeg`, x: 0.408, y: 0.271, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t08_unf.jpeg`, x: 0.443, y: 0.721, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t08_unf.jpeg`, x: 0.536, y: 0.31, hotspots: [] }, { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, x: 0.627, y: 0.323, hotspots: [] }, { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, x: 0.663, y: 0.629, hotspots: [] }] }] } },
        // 7A, Floor 2
        "107A21": { id: "107A21", bedrooms: 2, bathrooms: 1, area: 116.5, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l12_unf.jpeg`, x: 0.334, y: 0.42, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d12_unf.jpeg`, x: 0.407, y: 0.42, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k12_unf.jpeg`, x: 0.432, y: 0.579, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.532, y: 0.566, hotspots: [] }, { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b03_unf.jpeg`, x: 0.659, y: 0.553, hotspots: [] }, { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, x: 0.749, y: 0.553, hotspots: [] }] }] } },
        "107A22": { id: "107A22", bedrooms: 2, bathrooms: 3, area: 157,   serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l16_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l16_unf.jpeg`, x: 0.361, y: 0.454, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d16_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d16_unf.jpeg`, x: 0.451, y: 0.414, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k16_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k16_unf.jpeg`, x: 0.586, y: 0.374, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t06_unf.jpeg`, x: 0.466, y: 0.194, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.586, y: 0.82, hotspots: [] }, { id: "room6", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.692, y: 0.826, hotspots: [] }, { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b25_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b25_unf.jpeg`, x: 0.473, y: 0.686, hotspots: [] }, { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b24_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b24_unf.jpeg`, x: 0.67, y: 0.619, hotspots: [] }] }] } },
        "107A23": { id: "107A23", bedrooms: 2, bathrooms: 2, area: 160,   serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l15_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l15_unf.jpeg`, x: 0.38, y: 0.634, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d15_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d15_unf.jpeg`, x: 0.557, y: 0.679, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k15_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k15_unf.jpeg`, x: 0.651, y: 0.608, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.5, y: 0.312, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.582, y: 0.312, hotspots: [] }, { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b17_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b17_unf.jpeg`, x: 0.366, y: 0.366, hotspots: [] }, { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b07_unf.jpeg`, x: 0.651, y: 0.312, hotspots: [] }] }] } },
        // 7A, Floor 3
        "107A31": { id: "107A31", bedrooms: 3, bathrooms: 3, area: 227.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [{ id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l17_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l17_unf.jpeg`, x: 0.284, y: 0.248, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d17_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d17_unf.jpeg`, x: 0.277, y: 0.474, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k17_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k17_unf.jpeg`, x: 0.299, y: 0.648, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t11_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t11_unf.jpeg`, x: 0.43, y: 0.5, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t06_unf.jpeg`, x: 0.507, y: 0.695, hotspots: [] }, { id: "room6", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.52, y: 0.814, hotspots: [] }, { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b26_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b26_unf.jpeg`, x: 0.493, y: 0.369, hotspots: [] }, { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b17_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b17_unf.jpeg`, x: 0.622, y: 0.369, hotspots: [] }, { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectName}/panorama/b18_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b18_unf.jpeg`, x: 0.648, y: 0.715, hotspots: [] }] }] } },
    
        // 7B 1, Basement
      },
    },
  ],
};