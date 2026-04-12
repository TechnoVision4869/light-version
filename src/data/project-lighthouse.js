import SOMABAY_LOGO from '../assets/somabay-logo.svg';
// import SOMABAY_BG from '../assets/images/somabay-background.jpg';
import SOMABAY_BG from '../../public/light-house/images/background.jpeg';

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
              {
                id: "7b1",
                type: "tower",
                displayName: "7B 1",
                highlight: `/${projectName}/highlight/7B1 Tower.png`,
                description: null,
                x: 0.54, y: 0.33,
                videos: {
                  forwardVideo: `/${projectName}/videos/zones/7b1/7b1_gen_trans.mp4`,
                  reverseVideo: `/${projectName}/videos/zones/7b1/7b1_gen_rev.mp4`,
                  idleVideo: `/${projectName}/videos/zones/7b1/views/view1/7b1_view1_idle.mp4`,
                },
                floors: [
                  {
                    id: "floor1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectName}/highlight/7A/Floor 1.png`,
                    description: null,
                    x: 0.14, y: 0.94,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/floors/basement/7b1_floors_basement_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 1
                      { id: "apartment111", unitTypeId: "unit-type-g", displayName: "A111", area: 140, price: 260000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.4, y: 0.58, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                      { id: "apartment112", unitTypeId: "unit-type-f", displayName: "A112", area: 150, price: 325000, bedrooms: 2, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.21, y: 0.43, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                  {
                    id: "floor-2",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectName}/highlight/7A/Floor 2.png`,
                    description: null,
                    x: 0.14, y: 0.81,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/floors/ground/7b1_floors_ground_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 2
                      {
                        id: "apartment201",
                        unitTypeId: "7b1-unit",
                        displayName: "A201",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7b1_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment202", unitTypeId: "7b1-unit", displayName: "A202", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7b1_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
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
                    x: 0.14, y: 0.68,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/floors/floor1/7b1_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 3
                      {
                        id: "apartment301",
                        unitTypeId: "7b1-unit",
                        displayName: "A301",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7b1_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment302", unitTypeId: "7b1-unit", displayName: "A302", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7b1_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                  {
                    id: "floor-4",
                    type: "Residential",
                    displayName: "Floor 4",
                    highlight: `/${projectName}/highlight/7A/Floor 4.png`,
                    description: null,
                    x: 0.14, y: 0.55,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/floors/floor1/7b1_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 4
                      {
                        id: "apartment401",
                        unitTypeId: "7b1-unit",
                        displayName: "A401",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7b1_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment402", unitTypeId: "7b1-unit", displayName: "A402", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7b1_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
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
                    x: 0.14, y: 0.42,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/floors/floor1/7b1_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Roof
                      {
                        id: "apartment501",
                        unitTypeId: "7b1-unit",
                        displayName: "A501",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7b1_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment502", unitTypeId: "7b1-unit", displayName: "A502", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7b1_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                ],
                views: [
                  {
                    name: "View 1",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/views/view1/7b1_view1_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/views/view1/7b1_view1_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/views/view1/7b1_view1_idle.mp4`,
                    }
                  },
                  {
                    name: "View 2",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/views/view2/7b1_view2_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/views/view2/7b1_view2_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/views/view2/7b1_view2_idle.mp4`,
                    }
                  },
                  {
                    name: "View 3",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/views/view3/7b1_view3_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/views/view3/7b1_view3_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/views/view3/7b1_view3_idle.mp4`,
                    }
                  },
                  {
                    name: "View 4",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/views/view4/7b1_view4_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/views/view4/7b1_view4_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/views/view4/7b1_view4_idle.mp4`,
                    }
                  },
                ],
              },
              {
                id: "7b2",
                type: "tower",
                displayName: "7B 2",
                highlight: `/${projectName}/highlight/7B2 Tower.png`,
                description: null,
                x: 0.4, y: 0.62,
                videos: {
                  forwardVideo: `/${projectName}/videos/zones/7b2/7b2_gen_trans.mp4`,
                  reverseVideo: `/${projectName}/videos/zones/7b2/7b2_gen_rev.mp4`,
                  idleVideo: `/${projectName}/videos/zones/7b2/views/view1/7b2_view1_idle.mp4`,
                },
                floors: [
                  {
                    id: "floor1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectName}/highlight/7A/Floor 1.png`,
                    description: null,
                    x: 0.14, y: 0.94,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/floors/basement/7b2_floors_basement_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 1
                      { id: "apartment111", unitTypeId: "unit-type-g", displayName: "A111", area: 140, price: 260000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.4, y: 0.58, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                      { id: "apartment112", unitTypeId: "unit-type-f", displayName: "A112", area: 150, price: 325000, bedrooms: 2, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.21, y: 0.43, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                  {
                    id: "floor-2",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectName}/highlight/7A/Floor 2.png`,
                    description: null,
                    x: 0.14, y: 0.81,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/floors/ground/7b2_floors_ground_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 2
                      {
                        id: "apartment201",
                        unitTypeId: "7b2-unit",
                        displayName: "A201",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7b2_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment202", unitTypeId: "7b2-unit", displayName: "A202", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7b2_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
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
                    x: 0.14, y: 0.68,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/floors/floor1/7b2_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 3
                      {
                        id: "apartment301",
                        unitTypeId: "7b2-unit",
                        displayName: "A301",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7b2_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment302", unitTypeId: "7b2-unit", displayName: "A302", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7b2_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                  {
                    id: "floor-4",
                    type: "Residential",
                    displayName: "Floor 4",
                    highlight: `/${projectName}/highlight/7A/Floor 4.png`,
                    description: null,
                    x: 0.14, y: 0.55,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/floors/floor1/7b2_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 4
                      {
                        id: "apartment401",
                        unitTypeId: "7b2-unit",
                        displayName: "A401",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7b2_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment402", unitTypeId: "7b2-unit", displayName: "A402", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7b2_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
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
                    x: 0.14, y: 0.42,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/floors/floor1/7b2_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Roof
                      {
                        id: "apartment501",
                        unitTypeId: "7b2-unit",
                        displayName: "A501",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7b2_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment502", unitTypeId: "7b2-unit", displayName: "A502", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7b2_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                ],
                views: [
                  {
                    name: "View 1",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/views/view1/7b2_view1_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/views/view1/7b2_view1_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/views/view1/7b2_view1_idle.mp4`,
                    }
                  },
                  {
                    name: "View 2",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/views/view2/7b2_view2_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/views/view2/7b2_view2_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/views/view2/7b2_view2_idle.mp4`,
                    }
                  },
                  {
                    name: "View 3",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/views/view3/7b2_view3_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/views/view3/7b2_view3_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/views/view3/7b2_view3_idle.mp4`,
                    }
                  },
                  {
                    name: "View 4",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/views/view4/7b2_view4_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/views/view4/7b2_view4_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/views/view4/7b2_view4_idle.mp4`,
                    }
                  },
                ],
              },
              {
                id: "7c",
                type: "tower",
                displayName: "7C",
                highlight: `/${projectName}/highlight/7C Tower.png`,
                description: null,
                x: 0.44, y: 0.16,
                videos: {
                  forwardVideo: `/${projectName}/videos/zones/7c/7c_gen_trans.mp4`,
                  reverseVideo: `/${projectName}/videos/zones/7c/7c_gen_rev.mp4`,
                  idleVideo: `/${projectName}/videos/zones/7c/views/view1/7c_view1_idle.mp4`,
                },
                floors: [
                  {
                    id: "floor1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectName}/highlight/7A/Floor 1.png`,
                    description: null,
                    x: 0.14, y: 0.94,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/floors/basement/7c_floors_basement_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 1
                      { id: "apartment111", unitTypeId: "unit-type-g", displayName: "A111", area: 140, price: 260000, bedrooms: 2, bathrooms: 1, balconyView: "/mix/panorama/balcony.jpg", x: 0.4, y: 0.58, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                      { id: "apartment112", unitTypeId: "unit-type-f", displayName: "A112", area: 150, price: 325000, bedrooms: 2, bathrooms: 2, balconyView: "/mix/panorama/balcony.jpg", x: 0.21, y: 0.43, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                  {
                    id: "floor-2",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectName}/highlight/7A/Floor 2.png`,
                    description: null,
                    x: 0.14, y: 0.81,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/floors/ground/7c_floors_ground_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 2
                      {
                        id: "apartment201",
                        unitTypeId: "7c-unit",
                        displayName: "A201",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7c_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment202", unitTypeId: "7c-unit", displayName: "A202", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7c_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
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
                    x: 0.14, y: 0.68,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/floors/floor1/7c_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 3
                      {
                        id: "apartment301",
                        unitTypeId: "7c-unit",
                        displayName: "A301",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7c_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment302", unitTypeId: "7c-unit", displayName: "A302", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7c_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                  {
                    id: "floor-4",
                    type: "Residential",
                    displayName: "Floor 4",
                    highlight: `/${projectName}/highlight/7A/Floor 4.png`,
                    description: null,
                    x: 0.14, y: 0.55,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/floors/floor1/7c_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 4
                      {
                        id: "apartment401",
                        unitTypeId: "7c-unit",
                        displayName: "A401",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7c_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment402", unitTypeId: "7c-unit", displayName: "A402", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7c_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
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
                    x: 0.14, y: 0.42,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/floors/floor1/7c_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Roof
                      {
                        id: "apartment501",
                        unitTypeId: "7c-unit",
                        displayName: "A501",
                        area: 85,
                        price: 250000,
                        bedrooms: 2,
                        bathrooms: 1,
                        balconyView: "/mix/panorama/7c_unit/balcony.jpg",
                        x: 0.40, y: 0.60,
                        videos: {
                          forwardVideo: "/cutsection.mp4",
                          reverseVideo: "/cutsection.mp4",
                          idleVideo: "/cutsection.mp4",
                        }
                      },
                      { id: "apartment502", unitTypeId: "7c-unit", displayName: "A502", area: 200, price: 400000, bedrooms: 4, bathrooms: 2, balconyView: "/mix/panorama/7c_unit/balcony.jpg", x: 0.25, y: 0.4, videos: { forwardVideo: "/cutsection.mp4", reverseVideo: "/cutsection.mp4", idleVideo: "/cutsection.mp4" } },
                    ],
                  },
                ],
                views: [
                  {
                    name: "View 1",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/views/view1/7c_view1_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/views/view1/7c_view1_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/views/view1/7c_view1_idle.mp4`,
                    }
                  },
                  {
                    name: "View 2",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/views/view2/7c_view2_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/views/view2/7c_view2_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/views/view2/7c_view2_idle.mp4`,
                    }
                  },
                  {
                    name: "View 3",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/views/view3/7c_view3_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/views/view3/7c_view3_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/views/view3/7c_view3_idle.mp4`,
                    }
                  },
                  {
                    name: "View 4",
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/views/view4/7c_view4_trans.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/views/view4/7c_view4_rev.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/views/view4/7c_view4_idle.mp4`,
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
        "7b1-unit": {
          id: "7b1-unit",
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
        "7b2-unit": {
          id: "7b1-unit",
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
        "7c-unit": {
          id: "7c-unit",
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
        "107A01": { id: "107A01", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107A02": { id: "107A02", bedrooms: 1, bathrooms: 1, area: 95.9,  serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107A03": { id: "107A03", bedrooms: 2, bathrooms: 2, area: 128.3, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107A04": { id: "107A04", bedrooms: 2, bathrooms: 2, area: 120.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107A11": { id: "107A11", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107A12": { id: "107A12", bedrooms: 1, bathrooms: 1, area: 95.9,  serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107A13": { id: "107A13", bedrooms: 2, bathrooms: 2, area: 128.3, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107A14": { id: "107A14", bedrooms: 2, bathrooms: 2, area: 120.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107A21": { id: "107A21", bedrooms: 2, bathrooms: 1, area: 116.5, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107A22": { id: "107A22", bedrooms: 2, bathrooms: 3, area: 157,   serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107A23": { id: "107A23", bedrooms: 2, bathrooms: 2, area: 160,   serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107A31": { id: "107A31", bedrooms: 3, bathrooms: 3, area: 227.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107AC01": { id: "107AC01", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107AC02": { id: "107AC02", bedrooms: 1, bathrooms: 1, area: 95.9,  serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107AC03": { id: "107AC03", bedrooms: 2, bathrooms: 2, area: 128.3, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
        "107AC04": { id: "107AC04", bedrooms: 2, bathrooms: 2, area: 120.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [] } },
      },
    },
  ],
};

