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
                    highlight: `/${projectName}/highlight/7A/7a_basement.png`,
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
                    highlight: `/${projectName}/highlight/7A/7a_ground.png`,
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
                    highlight: `/${projectName}/highlight/7A/7a_floor1.png`,
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
                    highlight: `/${projectName}/highlight/7A/7a_floor2.png`,
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
                    highlight: `/${projectName}/highlight/7A/7a_floor3.png`,
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
                features: null,
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
                    id: "basement",
                    type: "Residential",
                    displayName: "Basement",
                    highlight: `/${projectName}/highlight/7B1/7b1_basement.png`,
                    description: null,
                    x: 0.135, y: 0.85,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/floors/basement/7b1_floors_basement_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Basement Units
                      {
                        id: "107BC01",
                        unitTypeId: "107BC01",
                        displayName: "107BC01",
                        area: 95.3,
                        price: null,
                        bedrooms: 2, bathrooms: 1,
                        x: 0.769, y: 0.57,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7b1/basement/107BC01.png`
                        }
                      },
                      { id: "107BC02", unitTypeId: "107BC02", displayName: "107BC02", area: 81.4, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.694, y: 0.583, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/basement/107BC02.png` } },
                      { id: "107BC03", unitTypeId: "107BC03", displayName: "107BC03", area: 77.4, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.613, y: 0.57, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/basement/107BC03.png` } },
                      { id: "107BC04", unitTypeId: "107BC04", displayName: "107BC04", area: 97, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.513, y: 0.564, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/basement/107BC04.png` } },
                      { id: "107BC05", unitTypeId: "107BC05", displayName: "107BC05", area: 105.1, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.439, y: 0.481, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/basement/107BC05.png` } },
                      { id: "107BC06", unitTypeId: "107BC06", displayName: "107BC06", area: 68.1, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.364, y: 0.474, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/basement/107BC06.png` } },
                      { id: "107BC07", unitTypeId: "107BC07", displayName: "107BC07", area: 88.4, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.28, y: 0.474, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/basement/107BC07.png` } },
                      { id: "107BC08", unitTypeId: "107BC08", displayName: "107BC08", area: 90.7, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.211, y: 0.446, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/basement/107BC08.png` } },
                      ],
                  },
                  {
                    id: "ground",
                    type: "Residential",
                    displayName: "Ground",
                    highlight: `/${projectName}/highlight/7B1/7b1_ground.png`,
                    description: null,
                    x: 0.144, y: 0.759,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/floors/ground/7b1_floors_ground_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Ground - Units
                      { id: "107B01", unitTypeId: "107B01", displayName: "107B01", area: 249.9, price: null, bedrooms: 3, bathrooms: 3,
                        x: 0.678, y: 0.525, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/ground/107B01.png` } },
                      { id: "107B02", unitTypeId: "107B02", displayName: "107B02", area: 207.2, price: null, bedrooms: 2, bathrooms: 3,
                        x: 0.496, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/ground/107B02.png` } },
                      { id: "107B03", unitTypeId: "107B03", displayName: "107B03", area: 249, price: null, bedrooms: 3, bathrooms: 3,
                        x: 0.28, y: 0.422, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/ground/107B03.png` } },
                    ],
                  },
                  {
                    id: "floor-1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectName}/highlight/7B1/7b1_floor1.png`,
                    description: null,
                    x: 0.159, y: 0.668,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/floors/floor1/7b1_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 1 - Units
                      { id: "107B11", unitTypeId: "107B11", displayName: "107B11", area: 249.9, price: null, bedrooms: 3, bathrooms: 3,
                        x: 0.678, y: 0.525, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/floor1/107B11.png` } },
                      { id: "107B12", unitTypeId: "107B12", displayName: "107B12", area: 207.2, price: null, bedrooms: 2, bathrooms: 3,
                        x: 0.496, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/floor1/107B12.png` } },
                      { id: "107B13", unitTypeId: "107B13", displayName: "107B13", area: 249, price: null, bedrooms: 3, bathrooms: 3,
                        x: 0.28, y: 0.422, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/floor1/107B13.png` } },
                    ],
                  },
                  {
                    id: "floor-2",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectName}/highlight/7B1/7b1_floor2.png`,
                    description: null,
                    x: 0.17, y: 0.587,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/floors/floor2/7b1_floors_floor2_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 2 - Units
                      { id: "107B21", unitTypeId: "107B21", displayName: "107B21", area: 213, price: null, bedrooms: 3, bathrooms: 3,
                        x: 0.678, y: 0.525, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/floor2/107B21.png` } },
                      { id: "107B22", unitTypeId: "107B22", displayName: "107B22", area: 180.6, price: null, bedrooms: 2, bathrooms: 3,
                        x: 0.496, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/floor2/107B22.png` } },
                      { id: "107B23", unitTypeId: "107B23", displayName: "107B23", area: 211.9, price: null, bedrooms: 3, bathrooms: 3,
                        x: 0.28, y: 0.422, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/floor2/107B23.png` } },

                     
                    ],
                  },
                  {
                    id: "floor-3",
                    type: "Residential",
                    displayName: "Floor 3",
                    highlight: `/${projectName}/highlight/7B1/7b1_floor3.png`,
                    description: null,
                    x: 0.172, y: 0.499,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b1/floors/floor3/7b1_floors_floor3_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 3 - Units
                      { id: "107B31", unitTypeId: "107B31", displayName: "107B31", area: 173.7, price: null, bedrooms: 2, bathrooms: 3,
                        x: 0.718, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/floor3/107B31.png` } },
                      { id: "107B32", unitTypeId: "107B32", displayName: "107B32", area: 173.7, price: null, bedrooms: 2, bathrooms: 3,
                        x: 0.27, y: 0.408, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b1/floor3/107B32.png` } },
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
                    id: "basement",
                    type: "Residential",
                    displayName: "Basement",
                    highlight: `/${projectName}/highlight/7B2/7b2_basement.png`,
                    description: null,
                    x: 0.183, y: 0.872,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/floors/basement/7b2_floors_basement_idle.mp4`,
                    },
                    units: [
                      // 7B 2, Basement Units
                      {
                        id: "107BC09",
                        unitTypeId: "107BC09",
                        displayName: "107BC09",
                        area: 113.2,
                        price: null,
                        bedrooms: 2, bathrooms: 1,
                        x: 0.272, y: 0.442,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7b2/basement/107BC09.png`
                        }
                      },
                      { id: "107BC10", unitTypeId: "107BC10", displayName: "107BC10", area: 100.5, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.39, y: 0.52, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b2/basement/107BC10.png` } },
                      { id: "107BC11", unitTypeId: "107BC11", displayName: "107BC11", area: 78, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.496, y: 0.55, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b2/basement/107BC11.png` } },
                      { id: "107BC12", unitTypeId: "107BC12", displayName: "107BC12", area: 115.5, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.673, y: 0.63, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b2/basement/107BC12.png` } },
                      { id: "107BC13", unitTypeId: "107BC13", displayName: "107BC13", area: 88.9, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.688, y: 0.314, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b2/basement/107BC13.png` } },
                      ],
                  },
                  {
                    id: "ground",
                    type: "Residential",
                    displayName: "Ground",
                    highlight: `/${projectName}/highlight/7B2/7b2_ground.png`,
                    description: null,
                    x: 0.187, y: 0.752,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/floors/ground/7b2_floors_ground_idle.mp4`,
                    },
                    units: [
                      // 7B 2, Ground - Units
                      {
                        id: "107B04",
                        unitTypeId: "107B04",
                        displayName: "107B04",
                        area: 109.8,
                        price: null,
                        bedrooms: 2, bathrooms: 1,
                        x: 0.279, y: 0.429,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7b2/ground/107B04.png`
                        }
                      },
                      { id: "107B05", unitTypeId: "107B05", displayName: "107B05", area: 162.4, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.436, y: 0.525, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b2/ground/107B05.png` } },
                      { id: "107B06", unitTypeId: "107B06", displayName: "107B06", area: 211.4, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.665, y: 0.442, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b2/ground/107B06.png` } },
                      ],
                  },
                  {
                    id: "floor-1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectName}/highlight/7B2/7b2_floor1.png`,
                    description: null,
                    x: 0.198, y: 0.597,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/floors/floor1/7b2_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 2, Floor 1 - Units
                      {
                        id: "107B14",
                        unitTypeId: "107B14",
                        displayName: "107B14",
                        area: 109.8,
                        price: null,
                        bedrooms: 1, bathrooms: 1,
                        x: 0.279, y: 0.429,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7b2/floor1/107B14.png`
                        }
                      },
                      { id: "107B15", unitTypeId: "107B15", displayName: "107B15", area: 162.4, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.436, y: 0.525, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b2/floor1/107B15.png` } },
                      { id: "107B16", unitTypeId: "107B16", displayName: "107B16", area: 212.1, price: null, bedrooms: 2, bathrooms: 3,
                        x: 0.665, y: 0.442, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b2/floor1/107B16.png` } },
                      ],
                  },
                  {
                    id: "floor-2",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectName}/highlight/7B2/7b2_floor2.png`,
                    description: null,
                    x: 0.204, y: 0.479,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/floors/floor2/7b2_floors_floor2_idle.mp4`,
                    },
                    units: [
                      // 7B 2, Floor 2 - Units
                      {
                        id: "107B24",
                        unitTypeId: "107B24",
                        displayName: "107B24",
                        area: 208.5,
                        price: null,
                        bedrooms: 3, bathrooms: 3,
                        x: 0.327, y: 0.448,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7b2/floor2/107B24.png`
                        }
                      },
                      { id: "107B25", unitTypeId: "107B25", displayName: "107B25", area: 180.8, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.635, y: 0.435, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7b2/floor2/107B25.png` } },
                      ],
                  },
                  {
                    id: "floor-3",
                    type: "Residential",
                    displayName: "Floor 3",
                    highlight: `/${projectName}/highlight/7B2/7b2_floor3.png`,
                    description: null,
                    x: 0.206, y: 0.336,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7b2/floors/floor3/7b2_floors_floor3_idle.mp4`,
                    },
                    units: [
                      // 7B 2, Floor 3 - Units
                      {
                        id: "107B33",
                        unitTypeId: "107B33",
                        displayName: "107B33",
                        area: 173.8,
                        price: null,
                        bedrooms: 2, bathrooms: 3,
                        x: 0.347, y: 0.435,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7b2/floor3/107B33.png`
                        }
                      },
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
                    id: "ground",
                    type: "Residential",
                    displayName: "Ground",
                    highlight: `/${projectName}/highlight/7C/7c_ground.png`,
                    description: null,
                    x: 0.137, y: 0.861,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/floors/ground/7c_floors_ground_idle.mp4`,
                    },
                    units: [
                      // 7C, Ground - Units
                      {
                        id: "107C01",
                        unitTypeId: "107C01",
                        displayName: "107C01",
                        area: 192.4,
                        price: null,
                        bedrooms: 2, bathrooms: 3,
                        x: 0.246, y: 0.357,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7c/ground/107C01.png`
                        }
                      },
                      { id: "107C02", unitTypeId: "107C02", displayName: "107C02", area: 107.4, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.372, y: 0.421, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7c/ground/107C02.png` } },
                      { id: "107C03", unitTypeId: "107C03", displayName: "107C03", area: 158.8, price: null, bedrooms: 2, bathrooms: 3,
                        x: 0.496, y: 0.55, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7c/ground/107C03.png` } },
                      { id: "107C04", unitTypeId: "107C04", displayName: "107C04", area: 193.6, price: null, bedrooms: 2, bathrooms: 3,
                        x: 0.68, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7c/ground/107C04.png` } },
                      ],
                  },
                  {
                    id: "floor-1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectName}/highlight/7C/7c_floor1.png`,
                    description: null,
                    x: 0.152, y: 0.769,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/floors/floor1/7c_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 1 - Units
                      {
                        id: "107C11",
                        unitTypeId: "107C11",
                        displayName: "107C11",
                        area: 192.4,
                        price: null,
                        bedrooms: 2, bathrooms: 3,
                        x: 0.246, y: 0.357,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7c/floor1/107C11.png`
                        }
                      },
                      { id: "107C12", unitTypeId: "107C12", displayName: "107C12", area: 107.4, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.372, y: 0.421, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7c/floor1/107C12.png` } },
                      { id: "107C13", unitTypeId: "107C13", displayName: "107C13", area: 158.8, price: null, bedrooms: 2, bathrooms: 3,
                        x: 0.496, y: 0.55, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7c/floor1/107C13.png` } },
                      { id: "107C14", unitTypeId: "107C14", displayName: "107C14", area: 193.6, price: null, bedrooms: 2, bathrooms: 3,
                        x: 0.68, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7c/floor1/107C14.png` } },
                      ],
                  },
                  {
                    id: "floor-2",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectName}/highlight/7C/7c_floor2.png`,
                    description: null,
                    x: 0.154, y: 0.69,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/floors/floor2/7c_floors_floor2_idle.mp4`,
                    },
                    units: [
                      // 7C, Floor 2 - Units
                      {
                        id: "107C21",
                        unitTypeId: "107C21",
                        displayName: "107C21",
                        area: 158.2,
                        price: null,
                        bedrooms: 2, bathrooms: 3,
                        x: 0.254, y: 0.349,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7c/floor2/107C21.png`
                        }
                      },
                      { id: "107C22", unitTypeId: "107C22", displayName: "107C22", area: 168.1, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.417, y: 0.494, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7c/floor2/107C22.png` } },
                      { id: "107C23", unitTypeId: "107C23", displayName: "107C23", area: 79.7, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.552, y: 0.513, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7c/floor2/107C23.png` } },
                      { id: "107C24", unitTypeId: "107C24", displayName: "107C24", area: 158.9, price: null, bedrooms: 2, bathrooms: 3,
                        x: 0.683, y: 0.461, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7c/floor2/107C24.png` } },
                      ],
                  },
                  {
                    id: "floor-3",
                    type: "Residential",
                    displayName: "Floor 3",
                    highlight: `/${projectName}/highlight/7C/7c_floor3.png`,
                    description: null,
                    x: 0.293, y: 0.572,
                    videos: {
                      forwardVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectName}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectName}/videos/zones/7c/floors/floor3/7c_floors_floor3_idle.mp4`,
                    },
                    units: [
                      // 7C, Floor 3 - Units
                      {
                        id: "107C31",
                        unitTypeId: "107C31",
                        displayName: "107C31",
                        area: 221.8,
                        price: null,
                        bedrooms: 3, bathrooms: 4,
                        x: 0.471, y: 0.487,
                        videos: {
                          forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectName}/units/7c/floor3/107C31.png`
                        }
                      },
                    ],
                  },
                ],
                features: {
                  displayName: "7C Features",
                  x: 0.7, y: 0.65,
                  videos: {
                    forwardVideo: null,
                    reverseVideo: null,
                    idleVideo: null,
                  },
                  items: [
                  {
                    id: "feature1",
                    displayName: "Entrance",
                    subtitle: "7C Feature",
                    description: "Main entrance providing access to the building, designed for both aesthetics and functionality.",
                    x: 0.2, y: 0.67,
                    videos: {
                      forwardVideo: null,
                      reverseVideo: null,
                      idleVideo: `/${projectName}/features/7C/`,
                    },
                  },
                  {
                    id: "feature2",
                    displayName: "Public Toilets",
                    subtitle: "7C Feature",
                    description: "Well-maintained and conveniently located public restrooms for residents and visitors, ensuring comfort and accessibility throughout the community.",
                    x: 0.62, y: 0.65,
                    videos: {
                      forwardVideo: null,
                      reverseVideo: null,
                      idleVideo: `/${projectName}/features/7C/`,
                    },
                  },
                  {
                    id: "feature3",
                    displayName: "Storage",
                    subtitle: "7C Feature",
                    description: "Secure and convenient storage solutions for residents, providing ample space for personal belongings and seasonal items.",
                    x: 0.5, y: 0.65,
                    videos: {
                      forwardVideo: null,
                      reverseVideo: null,
                      idleVideo: `/${projectName}/features/7C/`,
                    },
                  },
                ]
                },
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
        "107BC01": { id: "107BC01", bedrooms: 2, bathrooms: 1, area: 95.3, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l01_unf.jpeg`, x: 0.233, y: 0.603, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d01_unf.jpeg`, x: 0.337, y: 0.545, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k01_unf.jpeg`, x: 0.434, y: 0.655, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t02_unf.jpeg`, x: 0.42, y: 0.298, hotspots: [] }, { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b03_unf.jpeg`, x: 0.617, y: 0.629, hotspots: [] }, { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b01_unf.jpeg`, x: 0.723, y: 0.587, hotspots: [] } ] }] } },
        "107BC02": { id: "107BC02", bedrooms: 1, bathrooms: 1, area: 81.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l02_unf.jpeg`, x: 0.23, y: 0.569, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d02_unf.jpeg`, x: 0.334, y: 0.543, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k02_unf.jpeg`, x: 0.465, y: 0.53, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t02_unf.jpeg`, x: 0.588, y: 0.356, hotspots: [] }, { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectName}/panorama/b02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b02_unf.jpeg`, x: 0.762, y: 0.369, hotspots: [] } ] }] } },
        "107BC03": { id: "107BC03", bedrooms: 1, bathrooms: 1, area: 77.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l03_unf.jpeg`, x: 0.288, y: 0.315, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d03_unf.jpeg`, x: 0.517, y: 0.315, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k03_unf.jpeg`, x: 0.56, y: 0.532, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.477, y: 0.749, hotspots: [] }, { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectName}/panorama/b02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b02_unf.jpeg`, x: 0.736, y: 0.372, hotspots: [] } ] }] } },
        "107BC04": { id: "107BC04", bedrooms: 1, bathrooms: 1, area: 97, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l04_unf.jpeg`, x: 0.253, y: 0.581, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d04_unf.jpeg`, x: 0.435, y: 0.607, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k04_unf.jpeg`, x: 0.481, y: 0.369, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t03_unf.jpeg`, x: 0.604, y: 0.356, hotspots: [] }, { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectName}/panorama/b02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b02_unf.jpeg`, x: 0.753, y: 0.466, hotspots: [] } ] }] } },
        "107BC05": { id: "107BC05", bedrooms: 1, bathrooms: 1, area: 105.1, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l05_unf.jpeg`, x: 0.372, y: 0.401, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d05_unf.jpeg`, x: 0.507, y: 0.388, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k05_unf.jpeg`, x: 0.516, y: 0.543, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t02_unf.jpeg`, x: 0.618, y: 0.556, hotspots: [] }, { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectName}/panorama/b04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b04_unf.jpeg`, x: 0.738, y: 0.5, hotspots: [] } ] }] } },
        "107BC06": { id: "107BC06", bedrooms: 1, bathrooms: 1, area: 68.1, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l01_unf.jpeg`, x: 0.285, y: 0.704, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d01_unf.jpeg`, x: 0.523, y: 0.704, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k01_unf.jpeg`, x: 0.523, y: 0.487, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t02_unf.jpeg`, x: 0.471, y: 0.28, hotspots: [] }, { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectName}/panorama/b01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b01_unf.jpeg`, x: 0.745, y: 0.613, hotspots: [] } ] }] } },
        "107BC07": { id: "107BC07", bedrooms: 1, bathrooms: 1, area: 88.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l07_unf.jpeg`, x: 0.27, y: 0.428, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d07_unf.jpeg`, x: 0.37, y: 0.454, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k07_unf.jpeg`, x: 0.457, y: 0.37, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.566, y: 0.6, hotspots: [] }, { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectName}/panorama/b02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b02_unf.jpeg`, x: 0.745, y: 0.639, hotspots: [] } ] }] } },
        "107BC08": { id: "107BC08", bedrooms: 1, bathrooms: 1, area: 90.7, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l04_unf.jpeg`, x: 0.255, y: 0.626, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d04_unf.jpeg`, x: 0.37, y: 0.53, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k04_unf.jpeg`, x: 0.482, y: 0.556, hotspots: [] }, { id: "room4", displayName: "Bathroom", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.598, y: 0.39, hotspots: [] }, { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectName}/panorama/b02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b02_unf.jpeg`, x: 0.763, y: 0.543, hotspots: [] } ] }] } },
        // 7B 1, Ground
        "107B01": { id: "107B01", bedrooms: 3, bathrooms: 3, area: 249.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, x: 0.536, y: 0.439, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, x: 0.536, y: 0.727, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, x: 0.46, y: 0.766, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.677, y: 0.753, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, x: 0.446, y: 0.875, hotspots: [] }, { id: "room6", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.329, y: 0.64, hotspots: [] }, { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b06_unf.jpeg`, x: 0.358, y: 0.491, hotspots: [] }, { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b08_unf.jpeg`, x: 0.63, y: 0.452, hotspots: [] }, { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectName}/panorama/b07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b07_unf.jpeg`, x: 0.336, y: 0.779, hotspots: [] } ] }] } },
        "107B02": { id: "107B02", bedrooms: 3, bathrooms: 3, area: 207.2, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l05_unf.jpeg`, x: 0.367, y: 0.548, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d05_unf.jpeg`, x: 0.534, y: 0.548, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k05_unf.jpeg`, x: 0.534, y: 0.743, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.698, y: 0.288, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, x: 0.671, y: 0.535, hotspots: [] }, { id: "room6", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.622, y: 0.288, hotspots: [] }, { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b09_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b09_unf.jpeg`, x: 0.423, y: 0.362, hotspots: [] }, { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b10_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b10_unf.jpeg`, x: 0.765, y: 0.288, hotspots: [] } ] }] } },
        "107B03": { id: "107B03", bedrooms: 3, bathrooms: 3, area: 249, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, x: 0.465, y: 0.405, hotspots: [] }, { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, x: 0.457, y: 0.666, hotspots: [] }, { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, x: 0.527, y: 0.705, hotspots: [] }, { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.64, y: 0.621, hotspots: [] }, { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, x: 0.541, y: 0.828, hotspots: [] }, { id: "room6", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.33, y: 0.692, hotspots: [] }, { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b08_unf.jpeg`, x: 0.37, y: 0.431, hotspots: [] }, { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b11_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b11_unf.jpeg`, x: 0.613, y: 0.456, hotspots: [] }, { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectName}/panorama/b12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b12_unf.jpeg`, x: 0.613, y: 0.744, hotspots: [] } ] }] } },
        // 7B 1, Floor 1
        "107B11": { id: "107B11", bedrooms: 3, bathrooms: 3, area: 249.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, x: 0.536, y: 0.426, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, x: 0.544, y: 0.727, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, x: 0.46, y: 0.727, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.671, y: 0.727, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, x: 0.453, y: 0.856, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.329, y: 0.622, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b06_unf.jpeg`, x: 0.37, y: 0.465, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b08_unf.jpeg`, x: 0.63, y: 0.439, hotspots: [] },
          { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectName}/panorama/b07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b07_unf.jpeg`, x: 0.336, y: 0.753, hotspots: [] }
        ] }] } },
        "107B12": { id: "107B12", bedrooms: 3, bathrooms: 3, area: 207.2, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l05_unf.jpeg`, x: 0.36, y: 0.548, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d05_unf.jpeg`, x: 0.527, y: 0.548, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k05_unf.jpeg`, x: 0.527, y: 0.731, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.691, y: 0.288, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, x: 0.664, y: 0.535, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.615, y: 0.288, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b09_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b09_unf.jpeg`, x: 0.421, y: 0.361, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b10_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b10_unf.jpeg`, x: 0.758, y: 0.288, hotspots: [] }
        ] }] } },
        "107B13": { id: "107B13", bedrooms: 3, bathrooms: 3, area: 249, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, x: 0.468, y: 0.406, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, x: 0.454, y: 0.649, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, x: 0.539, y: 0.719, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.653, y: 0.623, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, x: 0.553, y: 0.839, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.332, y: 0.706, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b08_unf.jpeg`, x: 0.373, y: 0.419, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b11_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b11_unf.jpeg`, x: 0.625, y: 0.458, hotspots: [] },
          { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectName}/panorama/b12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b12_unf.jpeg`, x: 0.638, y: 0.754, hotspots: [] }
        ] }] } },
        // 7B 1, Floor 2
        "107B21": { id: "107B21", bedrooms: 3, bathrooms: 3, area: 213, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, x: 0.534, y: 0.419, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, x: 0.548, y: 0.681, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, x: 0.466, y: 0.719, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.677, y: 0.706, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, x: 0.446, y: 0.849, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.32, y: 0.597, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b01_unf.jpeg`, x: 0.361, y: 0.432, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b08_unf.jpeg`, x: 0.638, y: 0.432, hotspots: [] },
          { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectName}/panorama/b07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b07_unf.jpeg`, x: 0.328, y: 0.732, hotspots: [] }
        ] }] } },
        "107B22": { id: "107B22", bedrooms: 3, bathrooms: 3, area: 180.6, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, x: 0.371, y: 0.57, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, x: 0.515, y: 0.557, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, x: 0.547, y: 0.739, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.575, y: 0.283, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, x: 0.628, y: 0.531, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.664, y: 0.283, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b09_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b09_unf.jpeg`, x: 0.378, y: 0.366, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b10_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b10_unf.jpeg`, x: 0.727, y: 0.283, hotspots: [] }
        ] }] } },
        "107B23": { id: "107B23", bedrooms: 3, bathrooms: 3, area: 211.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, x: 0.468, y: 0.406, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, x: 0.454, y: 0.649, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, x: 0.539, y: 0.719, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.653, y: 0.623, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, x: 0.553, y: 0.839, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, x: 0.332, y: 0.706, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b08_unf.jpeg`, x: 0.373, y: 0.419, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b11_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b11_unf.jpeg`, x: 0.625, y: 0.458, hotspots: [] },
          { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectName}/panorama/b12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b12_unf.jpeg`, x: 0.638, y: 0.754, hotspots: [] }
        ] }] } },
        // 7B 1, Floor 3
        "107B31": { id: "107B31", bedrooms: 2, bathrooms: 3, area: 173.7, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l13_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l13_unf.jpeg`, x: 0.564, y: 0.326, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d13_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d13_unf.jpeg`, x: 0.64, y: 0.565, hotspots: [] },
          { id: "room3", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.308, y: 0.469, hotspots: [] },
          { id: "room4", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t06_unf.jpeg`, x: 0.522, y: 0.735, hotspots: [] },
          { id: "room5", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.447, y: 0.735, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b17_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b17_unf.jpeg`, x: 0.355, y: 0.259, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b01_unf.jpeg`, x: 0.316, y: 0.644, hotspots: [] }
        ] }] } },
        "107B32": { id: "107B32", bedrooms: 2, bathrooms: 3, area: 173.7, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectName}/panorama/l05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l05_unf.jpeg`, x: 0.439, y: 0.298, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectName}/panorama/d05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d05_unf.jpeg`, x: 0.37, y: 0.569, hotspots: [] },
          { id: "room3", displayName: "Bathroom 1", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.702, y: 0.487, hotspots: [] },
          { id: "room4", displayName: "Bathroom 2", furnitureImgId: `/${projectName}/panorama/t06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t06_unf.jpeg`, x: 0.482, y: 0.74, hotspots: [] },
          { id: "room5", displayName: "Bathroom 3", furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, x: 0.564, y: 0.74, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectName}/panorama/b09_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b09_unf.jpeg`, x: 0.652, y: 0.714, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectName}/panorama/b17_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b17_unf.jpeg`, x: 0.652, y: 0.259, hotspots: [] }
        ] }] } },

        // 7B 2, Basement - Units
        "107BC09": { id: "107BC09", bedrooms: 2, bathrooms: 1, area: 113.2, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "basement", rooms: [
          { id: "room1", displayName: "Living", x: 0.773, y: 0.444, furnitureImgId: `/${projectName}/panorama/l12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l12_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.597, y: 0.444, furnitureImgId: `/${projectName}/panorama/d12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d12_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.544, y: 0.581, furnitureImgId: `/${projectName}/panorama/k12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k12_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom", x: 0.47, y: 0.581, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom 1", x: 0.327, y: 0.581, furnitureImgId: `/${projectName}/panorama/b03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b03_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 2", x: 0.247, y: 0.543, furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107BC10": { id: "107BC10", bedrooms: 2, bathrooms: 1, area: 100.5, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "basement", rooms: [
          { id: "room1", displayName: "Living", x: 0.736, y: 0.569, furnitureImgId: `/${projectName}/panorama/l01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l01_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.651, y: 0.665, furnitureImgId: `/${projectName}/panorama/d01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d01_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.521, y: 0.569, furnitureImgId: `/${projectName}/panorama/k01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k01_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom", x: 0.398, y: 0.384, furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.255, y: 0.41, furnitureImgId: `/${projectName}/panorama/b02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b02_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107BC11": { id: "107BC11", bedrooms: 2, bathrooms: 1, area: 78, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "basement", rooms: [
          { id: "room1", displayName: "Living", x: 0.697, y: 0.401, furnitureImgId: `/${projectName}/panorama/l03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l03_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.5, y: 0.344, furnitureImgId: `/${projectName}/panorama/d03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d03_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.433, y: 0.601, furnitureImgId: `/${projectName}/panorama/k03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k03_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom", x: 0.532, y: 0.785, furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.285, y: 0.453, furnitureImgId: `/${projectName}/panorama/b02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b02_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107BC12": { id: "107BC12", bedrooms: 2, bathrooms: 2, area: 115.5, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "basement", rooms: [
          { id: "room1", displayName: "Living", x: 0.605, y: 0.535, furnitureImgId: `/${projectName}/panorama/l11_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l11_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.456, y: 0.548, furnitureImgId: `/${projectName}/panorama/d11_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d11_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.464, y: 0.762, furnitureImgId: `/${projectName}/panorama/k11_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k11_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.366, y: 0.587, furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.366, y: 0.436, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", x: 0.415, y: 0.232, furnitureImgId: `/${projectName}/panorama/b03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b03_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", x: 0.574, y: 0.394, furnitureImgId: `/${projectName}/panorama/b01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b01_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107BC13": { id: "107BC13", bedrooms: 2, bathrooms: 1, area: 88.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "basement", rooms: [
          { id: "room1", displayName: "Living", x: 0.583, y: 0.372, furnitureImgId: `/${projectName}/panorama/l10_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l10_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.549, y: 0.569, furnitureImgId: `/${projectName}/panorama/d10_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d10_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.683, y: 0.702, furnitureImgId: `/${projectName}/panorama/k10_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k10_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom", x: 0.456, y: 0.333, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.366, y: 0.359, furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107B04": { id: "107B04", bedrooms: 1, bathrooms: 1, area: 109.8, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "ground", rooms: [
          { id: "room1", displayName: "Living", x: 0.599, y: 0.422, furnitureImgId: `/${projectName}/panorama/l12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l12_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.426, y: 0.422, furnitureImgId: `/${projectName}/panorama/d12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d12_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.426, y: 0.559, furnitureImgId: `/${projectName}/panorama/k12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k12_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom", x: 0.345, y: 0.533, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.247, y: 0.533, furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107B05": { id: "107B05", bedrooms: 2, bathrooms: 2, area: 162.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "ground", rooms: [
          { id: "room1", displayName: "Living", x: 0.554, y: 0.575, furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.364, y: 0.575, furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.349, y: 0.802, furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.238, y: 0.75, furnitureImgId: `/${projectName}/panorama/t06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t06_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.443, y: 0.291, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", x: 0.311, y: 0.353, furnitureImgId: `/${projectName}/panorama/b15_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b15_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", x: 0.58, y: 0.366, furnitureImgId: `/${projectName}/panorama/b06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b06_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107B06": { id: "107B06", bedrooms: 2, bathrooms: 3, area: 211.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "ground", rooms: [
          { id: "room1", displayName: "Living", x: 0.612, y: 0.584, furnitureImgId: `/${projectName}/panorama/l05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l05_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.475, y: 0.584, furnitureImgId: `/${projectName}/panorama/d05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d05_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.475, y: 0.77, furnitureImgId: `/${projectName}/panorama/k05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k05_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.329, y: 0.558, furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.314, y: 0.309, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.386, y: 0.309, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.597, y: 0.296, furnitureImgId: `/${projectName}/panorama/b09_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b09_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.242, y: 0.309, furnitureImgId: `/${projectName}/panorama/b13_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b13_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107B14": { id: "107B14", bedrooms: 1, bathrooms: 1, area: 109.8, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor1", rooms: [
          { id: "room1", displayName: "Living", x: 0.599, y: 0.422, furnitureImgId: `/${projectName}/panorama/l12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l12_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.426, y: 0.422, furnitureImgId: `/${projectName}/panorama/d12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d12_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.426, y: 0.559, furnitureImgId: `/${projectName}/panorama/k12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k12_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom", x: 0.345, y: 0.533, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.247, y: 0.533, furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107B15": { id: "107B15", bedrooms: 2, bathrooms: 2, area: 162.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor1", rooms: [
          { id: "room1", displayName: "Living", x: 0.554, y: 0.575, furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.364, y: 0.575, furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.349, y: 0.802, furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.238, y: 0.75, furnitureImgId: `/${projectName}/panorama/t06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t06_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.443, y: 0.291, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", x: 0.311, y: 0.353, furnitureImgId: `/${projectName}/panorama/b15_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b15_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", x: 0.58, y: 0.366, furnitureImgId: `/${projectName}/panorama/b06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b06_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107B16": { id: "107B16", bedrooms: 2, bathrooms: 3, area: 212.1, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor1", rooms: [
          { id: "room1", displayName: "Living", x: 0.614, y: 0.596, furnitureImgId: `/${projectName}/panorama/l05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l05_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.482, y: 0.57, furnitureImgId: `/${projectName}/panorama/d05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d05_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.475, y: 0.742, furnitureImgId: `/${projectName}/panorama/k05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k05_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.343, y: 0.557, furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.329, y: 0.334, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.401, y: 0.334, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.593, y: 0.321, furnitureImgId: `/${projectName}/panorama/b09_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b09_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.257, y: 0.321, furnitureImgId: `/${projectName}/panorama/b13_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b13_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107B24": { id: "107B24", bedrooms: 3, bathrooms: 3, area: 208.5, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor2", rooms: [
          { id: "room1", displayName: "Living", x: 0.528, y: 0.394, furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.415, y: 0.394, furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.4, y: 0.572, furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.407, y: 0.222, furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.457, y: 0.8, furnitureImgId: `/${projectName}/panorama/t07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t07_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.333, y: 0.559, furnitureImgId: `/${projectName}/panorama/t06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t06_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.376, y: 0.774, furnitureImgId: `/${projectName}/panorama/b12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b12_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.557, y: 0.248, furnitureImgId: `/${projectName}/panorama/b08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b08_unf.jpeg`, hotspots: [] },
          { id: "room9", displayName: "Bedroom 3", x: 0.542, y: 0.761, furnitureImgId: `/${projectName}/panorama/b01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b01_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107B25": { id: "107B25", bedrooms: 2, bathrooms: 2, area: 180.8, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor2", rooms: [
          { id: "room1", displayName: "Living", x: 0.586, y: 0.559, furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.454, y: 0.546, furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.442, y: 0.705, furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.361, y: 0.324, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.427, y: 0.324, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", x: 0.307, y: 0.324, furnitureImgId: `/${projectName}/panorama/b13_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b13_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", x: 0.596, y: 0.324, furnitureImgId: `/${projectName}/panorama/b16_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b16_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107B33": { id: "107B33", bedrooms: 2, bathrooms: 3, area: 173.8, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor3", rooms: [
          { id: "room1", displayName: "Living", x: 0.619, y: 0.357, furnitureImgId: `/${projectName}/panorama/l13_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l13_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.57, y: 0.53, furnitureImgId: `/${projectName}/panorama/d13_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d13_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.513, y: 0.543, furnitureImgId: `/${projectName}/panorama/k13_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k13_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.648, y: 0.627, furnitureImgId: `/${projectName}/panorama/t06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t06_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.691, y: 0.627, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.794, y: 0.458, furnitureImgId: `/${projectName}/panorama/t07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t07_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.752, y: 0.331, furnitureImgId: `/${projectName}/panorama/b19_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b19_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.78, y: 0.556, furnitureImgId: `/${projectName}/panorama/b18_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b18_unf.jpeg`, hotspots: [] }
        ] }] } },

        // 7C 
        "107C01": { id: "107C01", bedrooms: 2, bathrooms: 3, area: 192.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.553, y: 0.259, furnitureImgId: `/${projectName}/panorama/l01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l01_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.426, y: 0.259, furnitureImgId: `/${projectName}/panorama/d01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d01_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.36, y: 0.461, furnitureImgId: `/${projectName}/panorama/k12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k12_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.252, y: 0.349, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.281, y: 0.559, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.418, y: 0.744, furnitureImgId: `/${projectName}/panorama/t12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t12_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.531, y: 0.666, furnitureImgId: `/${projectName}/panorama/b03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b03_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.319, y: 0.744, furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C02": { id: "107C02", bedrooms: 1, bathrooms: 1, area: 107.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.616, y: 0.439, furnitureImgId: `/${projectName}/panorama/l02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l02_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.539, y: 0.439, furnitureImgId: `/${projectName}/panorama/d02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d02_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.481, y: 0.596, furnitureImgId: `/${projectName}/panorama/k12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k12_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom", x: 0.384, y: 0.556, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.26, y: 0.5, furnitureImgId: `/${projectName}/panorama/b02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b02_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C03": { id: "107C03", bedrooms: 2, bathrooms: 3, area: 158.8, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.593, y: 0.739, furnitureImgId: `/${projectName}/panorama/l03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l03_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.46, y: 0.803, furnitureImgId: `/${projectName}/panorama/d03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d03_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.373, y: 0.564, furnitureImgId: `/${projectName}/panorama/k12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k12_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.289, y: 0.657, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.296, y: 0.473, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.432, y: 0.252, furnitureImgId: `/${projectName}/panorama/t12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t12_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.303, y: 0.308, furnitureImgId: `/${projectName}/panorama/b03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b03_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.622, y: 0.362, furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C04": { id: "107C04", bedrooms: 2, bathrooms: 3, area: 193.6, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.557, y: 0.739, furnitureImgId: `/${projectName}/panorama/l04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l04_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.391, y: 0.752, furnitureImgId: `/${projectName}/panorama/d04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d04_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.365, y: 0.563, furnitureImgId: `/${projectName}/panorama/k12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k12_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.282, y: 0.455, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.253, y: 0.671, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.424, y: 0.304, furnitureImgId: `/${projectName}/panorama/t12_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t12_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.289, y: 0.317, furnitureImgId: `/${projectName}/panorama/b03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b03_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.53, y: 0.363, furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C11": { id: "107C11", bedrooms: 2, bathrooms: 3, area: 192.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.553, y: 0.259, furnitureImgId: `/${projectName}/panorama/l08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l08_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.426, y: 0.259, furnitureImgId: `/${projectName}/panorama/d08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d08_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.36, y: 0.461, furnitureImgId: `/${projectName}/panorama/k08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k08_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.252, y: 0.349, furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.281, y: 0.559, furnitureImgId: `/${projectName}/panorama/t08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t08_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.418, y: 0.785, furnitureImgId: `/${projectName}/panorama/t03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t03_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.531, y: 0.656, furnitureImgId: `/${projectName}/panorama/b20_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b20_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.319, y: 0.744, furnitureImgId: `/${projectName}/panorama/b21_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b21_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C12": { id: "107C12", bedrooms: 1, bathrooms: 1, area: 107.4, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.616, y: 0.439, furnitureImgId: `/${projectName}/panorama/l05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l05_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.539, y: 0.439, furnitureImgId: `/${projectName}/panorama/d08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d08_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.481, y: 0.596, furnitureImgId: `/${projectName}/panorama/k05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k05_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom", x: 0.384, y: 0.556, furnitureImgId: `/${projectName}/panorama/t01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t01_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.254, y: 0.487, furnitureImgId: `/${projectName}/panorama/b05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b05_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C13": { id: "107C13", bedrooms: 2, bathrooms: 3, area: 158.8, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.593, y: 0.739, furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.46, y: 0.803, furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.373, y: 0.564, furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.289, y: 0.657, furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.296, y: 0.473, furnitureImgId: `/${projectName}/panorama/t09_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t09_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.432, y: 0.252, furnitureImgId: `/${projectName}/panorama/t02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t02_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.303, y: 0.308, furnitureImgId: `/${projectName}/panorama/b21_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b21_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.622, y: 0.362, furnitureImgId: `/${projectName}/panorama/b20_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b20_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C14": { id: "107C14", bedrooms: 2, bathrooms: 3, area: 193.6, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.557, y: 0.739, furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.391, y: 0.752, furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.365, y: 0.563, furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.282, y: 0.455, furnitureImgId: `/${projectName}/panorama/t08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t08_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.253, y: 0.671, furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.424, y: 0.304, furnitureImgId: `/${projectName}/panorama/t02_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t02_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.289, y: 0.317, furnitureImgId: `/${projectName}/panorama/b21_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b21_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.53, y: 0.363, furnitureImgId: `/${projectName}/panorama/b20_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b20_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C21": { id: "107C21", bedrooms: 2, bathrooms: 3, area: 158.2, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.557, y: 0.289, furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.381, y: 0.263, furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.358, y: 0.45, furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.25, y: 0.331, furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.282, y: 0.563, furnitureImgId: `/${projectName}/panorama/t08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t08_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.413, y: 0.769, furnitureImgId: `/${projectName}/panorama/t03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t03_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.334, y: 0.743, furnitureImgId: `/${projectName}/panorama/b21_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b21_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.53, y: 0.645, furnitureImgId: `/${projectName}/panorama/b20_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b20_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C22": { id: "107C22", bedrooms: 2, bathrooms: 2, area: 168.1, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.681, y: 0.411, furnitureImgId: `/${projectName}/panorama/l07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l07_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.508, y: 0.487, furnitureImgId: `/${projectName}/panorama/d07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d07_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.406, y: 0.424, furnitureImgId: `/${projectName}/panorama/k07_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k07_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.333, y: 0.474, furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.485, y: 0.717, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", x: 0.381, y: 0.743, furnitureImgId: `/${projectName}/panorama/b21_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b21_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", x: 0.655, y: 0.641, furnitureImgId: `/${projectName}/panorama/b22_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b22_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C23": { id: "107C23", bedrooms: 1, bathrooms: 1, area: 79.7, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.62, y: 0.291, furnitureImgId: `/${projectName}/panorama/l08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l08_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.47, y: 0.513, furnitureImgId: `/${projectName}/panorama/d08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d08_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.456, y: 0.25, furnitureImgId: `/${projectName}/panorama/k08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k08_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom", x: 0.236, y: 0.608, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.25, y: 0.437, furnitureImgId: `/${projectName}/panorama/b01_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b01_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C24": { id: "107C24", bedrooms: 2, bathrooms: 3, area: 158.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.554, y: 0.55, furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.443, y: 0.754, furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.398, y: 0.55, furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.47, y: 0.295, furnitureImgId: `/${projectName}/panorama/t10_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t10_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.327, y: 0.471, furnitureImgId: `/${projectName}/panorama/t08_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t08_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.306, y: 0.681, furnitureImgId: `/${projectName}/panorama/t05_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t05_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.334, y: 0.321, furnitureImgId: `/${projectName}/panorama/b21_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b21_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.577, y: 0.357, furnitureImgId: `/${projectName}/panorama/b20_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b20_unf.jpeg`, hotspots: [] }
        ] }] } },
        "107C31": { id: "107C31", bedrooms: 3, bathrooms: 4, area: 221.8, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.72, y: 0.669, furnitureImgId: `/${projectName}/panorama/l06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/l06_unf.jpeg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.652, y: 0.5, furnitureImgId: `/${projectName}/panorama/d06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/d06_unf.jpeg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.705, y: 0.344, furnitureImgId: `/${projectName}/panorama/k06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/k06_unf.jpeg`, hotspots: [] },
          { id: "room4", displayName: "Bathroom 1", x: 0.563, y: 0.537, furnitureImgId: `/${projectName}/panorama/t03_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t03_unf.jpeg`, hotspots: [] },
          { id: "room5", displayName: "Bathroom 2", x: 0.304, y: 0.424, furnitureImgId: `/${projectName}/panorama/t04_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t04_unf.jpeg`, hotspots: [] },
          { id: "room6", displayName: "Bathroom 3", x: 0.493, y: 0.208, furnitureImgId: `/${projectName}/panorama/t06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t06_unf.jpeg`, hotspots: [] },
          { id: "room7", displayName: "Bathroom 4", x: 0.421, y: 0.221, furnitureImgId: `/${projectName}/panorama/t06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/t06_unf.jpeg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 1", x: 0.311, y: 0.302, furnitureImgId: `/${projectName}/panorama/b24_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b24_unf.jpeg`, hotspots: [] },
          { id: "room9", displayName: "Bedroom 2", x: 0.35, y: 0.619, furnitureImgId: `/${projectName}/panorama/b06_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b06_unf.jpeg`, hotspots: [] },
          { id: "room10", displayName: "Bedroom 3", x: 0.5, y: 0.619, furnitureImgId: `/${projectName}/panorama/b23_f.jpeg`, unfurnitureImgId: `/${projectName}/panorama/b23_unf.jpeg`, hotspots: [] }
        ] }] } },
      },
    },
  ],
};