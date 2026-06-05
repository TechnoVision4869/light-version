import { PROPERTY_TYPE } from "../constants/roles";

import SOMABAY_LOGO from '../assets/somabay-logo.svg';

import MALL_ICON from '../assets/icons/mall.svg';
import SERVICE_SVG from '../assets/svgs/service.svg?raw';

export const projectPath = "projects/light-light";
const SOMABAY_BG = `/${projectPath}/images/somabay.jpg`;

export const config = {
  // General
    USE_PREDEFINED_POS: true,
    USE_HOTSPOTS: false,

  // 360 Settings
  // Interior
    INTERIOR_ZOOM_RANGE: { min: 0.8, max: 1.333 },
    INTERIOR_PITCH_RANGE: { min: -30, max: 15 },

  // Balcony/Location
    BALCONY_ZOOM_RANGE: { min: 1, max: 1.333 },
    BALCONY_PITCH_RANGE: { min: 0, max: 25 },
    BALCONY_YAW_RANGE: { min: -70, max: 70 },

  // ZONES Tab Title
    ZONES_TAB_TITLE: "PROPERTIES",
    BALCONY_TITLE: "Balcony View",
}

export const DEVELOPER_SOMABAY = {
  developerId: "somabay",
  developerLogo: SOMABAY_LOGO,
  backgroundImage: SOMABAY_BG,
  developerProjects: [
    {
      id: "light-light",
      name: "The Lighthouse",
      thumbnail: `/${projectPath}/images/project-highlight.png`,
      description: "Located at the tip of the peninsula, The Lighthouse Somabay gives you a unique panoramic view of the reef and the bay at once.",
      introVideo: `/${projectPath}/videos/intro.mp4`,
      idleVideo: `/${projectPath}/videos/home/home_idle.jpg`,
      zoomoutVideo: `/${projectPath}/videos/home/home_out.mp4`,

      surroundings: {
        id: "surroundings",
        displayName: "Surroundings",
        zoomoutVideo: `/${projectPath}/videos/surroundings/surrounding_out.mp4`,
        videos: {
          forwardVideo: `/${projectPath}/videos/surroundings/surrounding_gen_trans_from_home.mp4`,
          reverseVideo: `/${projectPath}/videos/surroundings/surrounding_gen_rev_to_home.mp4`,
          idleVideo: `/${projectPath}/videos/surroundings/surroundings_gen_idle.jpg`,
        },
        items: [
          {
            id: "surrounding1",
            displayName: "Service Area",
            iconSrc: MALL_ICON,
            thumbnail: "",
            distance: "6 min - 3 km",
            description: "Service area with restaurants, cafes, and shops.",
            x: 0.38, y: 0.3,
            svgPath: SERVICE_SVG,
          },
        ],
      },

      amenities: {
        id: "amenities",
        displayName: "Amenities",
        zoomoutVideo: `/${projectPath}/videos/amenities/amenities_out.mp4`,
        videos: {
          forwardVideo: `/${projectPath}/videos/amenities/amenities_gen_trans_from_home.mp4`,
          reverseVideo: `/${projectPath}/videos/amenities/amenities_gen_rev_to_home.mp4`,
          idleVideo: `/${projectPath}/videos/amenities/amenities_gen_idle.jpg`,
        },
        items: [
          {
            id: "amenity1",
            displayName: "Azure Lagoons",
            subtitle: "Amenity",
            thumbnail: `/${projectPath}/thumbnails/amenities/amenity1.jpg`,
            description: "Azure Lagoons is a unique water park that offers a variety of pools, slides, and water activities for all ages. It is designed to provide a fun and refreshing experience for residents and visitors alike.",
            x: 0.535, y: 0.57,
            videos: {
              forwardVideo: `/${projectPath}/videos/amenities/amenity1/amenity1_trans.mp4`,
              reverseVideo: `/${projectPath}/videos/amenities/amenity1/amenity1_rev.mp4`,
              idleVideo: `/${projectPath}/videos/amenities/amenity1/amenity1_idle.jpg`,
            },
          },
          {
            id: "amenity2",
            displayName: "Verde Walks",
            subtitle: "Amenity",
            thumbnail: `/${projectPath}/thumbnails/amenities/amenity2.jpg`,
            description: "A scenic walking path surrounded by lush greenery, perfect for a leisurely stroll or morning jog.",
            x: 0.24, y: 0.81,
            videos: {
              forwardVideo: `/${projectPath}/videos/amenities/amenity2/amenity2_trans.mp4`,
              reverseVideo: `/${projectPath}/videos/amenities/amenity2/amenity2_rev.mp4`,
              idleVideo: `/${projectPath}/videos/amenities/amenity2/amenity2_idle.jpg`,
            },
          },
          {
            id: "amenity3",
            displayName: "Breezy Retreat",
            subtitle: "Amenity",
            thumbnail: `/${projectPath}/thumbnails/amenities/amenity3.jpg`,
            description: "A breezy retreat area with comfortable seating and stunning views, perfect for relaxation and socializing.",
            x: 0.36, y: 0.88,
            videos: {
              forwardVideo: `/${projectPath}/videos/amenities/amenity3/amenity3_trans.mp4`,
              reverseVideo: `/${projectPath}/videos/amenities/amenity3/amenity3_rev.mp4`,
              idleVideo: `/${projectPath}/videos/amenities/amenity3/amenity3_idle.jpg`,
            },
          },
        ]
      },

      zones: {
        id: "zones",
        displayName: "Zones",
        zoomoutVideo: `/${projectPath}/videos/zones/zones_out.mp4`, // reuse home zoomout, but will change later to videos/zones/zones_out.
        videos: {
          forwardVideo: null,
          reverseVideo: null,
          idleVideo: null,
        },
        items: [
          {
            id: "zone1",
            projectId: "lightlight",
            displayName: "Towers",
            subtitle: "Residential Area",
            thumbnail: null,
            highlight: null,
            description: null,
            x: 0.93, y: 0.53,
            videos: {
              forwardVideo: `/${projectPath}/videos/zones/zones_gen_trans_from_home.mp4`,
              reverseVideo: `/${projectPath}/videos/zones/zones_gen_rev_to_home.mp4`,
              idleVideo: `/${projectPath}/videos/zones/zones_gen_idle.jpg`,
            },
            properties: [
              {
                id: "7a",
                type: PROPERTY_TYPE.TOWER,
                displayName: "7A",
                highlight: `/${projectPath}/highlight/7A Tower.png`,
                description: null,
                x: 0.57, y: 0.2,
                videos: {
                  forwardVideo: `/${projectPath}/videos/zones/7a/7a_gen_trans.mp4`,
                  reverseVideo: `/${projectPath}/videos/zones/7a/7a_gen_rev.mp4`,
                  idleVideo: `/${projectPath}/videos/zones/7a/views/view1/7a_view1_idle.jpg`,
                },
                floors: [
                  {
                    id: "floor-1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectPath}/highlight/7A/7a_floor1.png`,
                    description: null,
                    x: 0.2, y: 0.59,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7a/floors/floor1/7a_floors_floor1_idle.jpg`,
                    },
                    units: [
                      {
                        id: "107A11",
                        unitTypeId: "107A11",
                        displayName: "107A11",
                        area: 113.9,
                        price: 8,
                        bedrooms: 2, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/Balcony/7a/107A11.jpg`,
                        x: 0.745, y: 0.35,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7a/floor1/107A11.png`
                        }
                      },
                      { id: "107A12", unitTypeId: "107A12", displayName: "107A12", area: 95.9, price: 6, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/Balcony/7a/107A12.jpg`, x: 0.635, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/floor1/107A12.png` } },
                      { id: "107A13", unitTypeId: "107A13", displayName: "107A13", area: 128.3, price: 5, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/Balcony/7a/107A13.jpg`, x: 0.48, y: 0.68, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/floor1/107A13.png` } },
                      { id: "107A14", unitTypeId: "107A14", displayName: "107A14", area: 120.9, price: 7, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/Balcony/7a/107A14.jpg`, x: 0.32, y: 0.45, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/floor1/107A14.png` } },
                    ],
                  },
                ],
                features: null,
                views: [
                  {
                    name: "View 1",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7a/views/view1/7a_view1_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7a/views/view1/7a_view1_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7a/views/view1/7a_view1_idle.jpg`,
                    }
                  },
                  {
                    name: "View 2",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7a/views/view2/7a_view2_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7a/views/view2/7a_view2_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7a/views/view2/7a_view2_idle.jpg`,
                    }
                  },
                ],
              },
            ],
          },
        ]
      },

      unitTypes: {
        // 7A, Floor 1
        "107A11": { id: "107A11", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [{ id: "107A11", src: `/${projectPath}/images/floorplans/107A11.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l19_unf.jpg`, x: 0.313, y: 0.419, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d19_unf.jpg`, x: 0.399, y: 0.394, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k19_unf.jpg`, x: 0.435, y: 0.552, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.535, y: 0.539, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b03_unf.jpg`, x: 0.653, y: 0.526, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, x: 0.751, y: 0.526, hotspots: [] }
        ] }] } },

        "107A12": { id: "107A12", bedrooms: 1, bathrooms: 1, area: 95.9,  serviceRooms: [], gallery: [], cutSections: [], floorPlans: [{ id: "107A12", src: `/${projectPath}/images/floorplans/107A12.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.361, y: 0.731, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.444, y: 0.731, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.474, y: 0.417, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t11_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t11_unf.jpg`, x: 0.595, y: 0.443, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, x: 0.731, y: 0.456, hotspots: [] }
        ] }] } },

        "107A13": { id: "107A13", bedrooms: 2, bathrooms: 2, area: 128.3, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [{ id: "107A13", src: `/${projectPath}/images/floorplans/107A13.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.399, y: 0.498, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.478, y: 0.498, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.507, y: 0.207, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.493, y: 0.784, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.601, y: 0.784, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b17_unf.jpg`, x: 0.365, y: 0.674, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.732, y: 0.674, hotspots: [] }
        ] }] } },

        "107A14": { id: "107A14", bedrooms: 2, bathrooms: 2, area: 120.9, serviceRooms: [], gallery: [], cutSections: [], floorPlans: [{ id: "107A14", src: `/${projectPath}/images/floorplans/107A14.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.277, y: 0.487, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.378, y: 0.487, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.408, y: 0.271, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, x: 0.443, y: 0.721, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, x: 0.536, y: 0.31, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.627, y: 0.323, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b27_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b27_unf.jpg`, x: 0.663, y: 0.629, hotspots: [] }
        ] }] } },
      },
    },
  ],
};