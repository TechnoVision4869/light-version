import SOMABAY_LOGO from '../assets/somabay-logo.svg';
// import SOMABAY_BG from '../assets/images/somabay-background.jpg';

import AirportIcon from '../assets/icons/airport.svg';
import CairoAirportSvg from '../assets/paths/airport.svg?raw';

const projectName = "light-house-test";
const SOMABAY_BG = `/${projectName}/images/background.jpeg`;

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
            displayName: "Amenity 1",
            subtitle: "Amenity",
            thumbnail: `/${projectName}/thumbnails/amenities/amenity1.jpeg`,
            description: "...",
            x: 0.56, y: 0.56,
            videos: {
              forwardVideo: null,
              reverseVideo: null,
              idleVideo: `/${projectName}/videos/amenities/amenity1/1.mp4`,
            },
          },
          {
            id: "amenity2",
            displayName: "Amenity 2",
            subtitle: "Amenity",
            thumbnail: `/${projectName}/thumbnails/amenities/amenity2.jpeg`,
            description: "...",
            x: 0.24, y: 0.8,
            videos: {
              forwardVideo: null,
              reverseVideo: null,
              idleVideo: `/${projectName}/videos/amenities/amenity2/2.mp4`,
            },
          },
          {
            id: "amenity3",
            displayName: "Amenity 3",
            subtitle: "Amenity",
            thumbnail: `/${projectName}/thumbnails/amenities/amenity4.jpeg`,
            description: "...",
            x: 0.36, y: 0.87,
            videos: {
              forwardVideo: null,
              reverseVideo: null,
              idleVideo: `/${projectName}/videos/amenities/amenity4/4.mp4`,
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
                  //test floor
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
                        unitTypeId: "test",
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
                      { id: "107A12", unitTypeId: "test", displayName: "107A12", area: 95.9, price: null, bedrooms: 1, bathrooms: 1,
                        x: 0.635, y: 0.5, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/floor1/107A12.png` } },
                      { id: "107A13", unitTypeId: "test", displayName: "107A13", area: 128.3, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.48, y: 0.68, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/floor1/107A13.png` } },
                      { id: "107A14", unitTypeId: "test", displayName: "107A14", area: 120.9, price: null, bedrooms: 2, bathrooms: 2,
                        x: 0.32, y: 0.45, videos: { forwardVideo: `/${projectName}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectName}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectName}/units/7a/floor1/107A14.png` } },
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
            ],
          },
        ]
      },

      unitTypes: {
        // test
        "test": { id: "test", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Bedroom 1 old", furnitureImgId: `/${projectName}/panorama/Bedroom/Furn/b01_f.jpeg`, unfurnitureImgId: null, x: 0.753, y: 0.579, hotspots: [] }, 
          { id: "room2", displayName: "Bedroom 1 new", furnitureImgId: `/${projectName}/panorama/b01_f.png`, unfurnitureImgId: null, x: 0.668, y: 0.619, hotspots: [] }, 
          { id: "room3", displayName: "Bedroom 2 old", furnitureImgId: `/${projectName}/panorama/Bedroom/Furn/b02_f.jpeg`, unfurnitureImgId: null, x: 0.631, y: 0.445, hotspots: [] }, 
          { id: "room4", displayName: "Bedroom 2 new", furnitureImgId: `/${projectName}/panorama/b02_f.png`, unfurnitureImgId: null, x: 0.518, y: 0.458, hotspots: [] }, 
        ] }] } },
      },
    },
  ],
};