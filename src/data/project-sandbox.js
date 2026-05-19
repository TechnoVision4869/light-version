// import TECHNO_LOGO from '/default-logo.png';
import SOMABAY_LOGO from '../assets/somabay-logo.svg';

import MALL_ICON from '../assets/icons/mall.svg';
import SERVICE_SVG from '../assets/svgs/service.svg?raw';

export const projectPath = "projects/light-house-sandbox";
const SOMABAY_BG = `/${projectPath}/images/background.jpeg`;

const gallery1 = [
  { id: "group1_1", src: `/${projectPath}/images/gallery/interior/1BR/01.jpg` },
  { id: "group1_2", src: `/${projectPath}/images/gallery/interior/1BR/02 copy.jpg` },
  { id: "group1_3", src: `/${projectPath}/images/gallery/interior/1BR/02.jpg` },
  { id: "group1_4", src: `/${projectPath}/images/gallery/interior/1BR/03.jpg` },
];
const gallery2 = [
  { id: "group1_5", src: `/${projectPath}/images/gallery/interior/1BR/05.jpg` },
  { id: "group1_6", src: `/${projectPath}/images/gallery/interior/1BR/06.jpg` },
  { id: "group1_7", src: `/${projectPath}/images/gallery/interior/1BR/07.jpg` },
  { id: "group1_8", src: `/${projectPath}/images/gallery/interior/1BR/08.jpg` },
];
const gallery3 = [
  { id: "group1_9", src: `/${projectPath}/images/gallery/interior/1BR/09.jpg` },
  { id: "group1_10", src: `/${projectPath}/images/gallery/interior/1BR/bedroom 01.jpg` },
  { id: "group1_11", src: `/${projectPath}/images/gallery/interior/1BR/02 copy.jpg` },
  { id: "group1_12", src: `/${projectPath}/images/gallery/interior/1BR/01.jpg` },
];

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
      introVideo: `/${projectPath}/videos/loading.mp4`,
      idleVideo: `/${projectPath}/videos/home/home_idle.mp4`,
      zoomoutVideo: `/${projectPath}/videos/home/home_out.mp4`,

      surroundings: {
              id: "surroundings",
              displayName: "Surroundings",
              zoomoutVideo: `/${projectPath}/videos/surroundings/surrounding_out.mp4`,
              videos: {
                forwardVideo: `/${projectPath}/videos/surroundings/surrounding_gen_trans_from_home.mp4`,
                reverseVideo: `/${projectPath}/videos/surroundings/surrounding_gen_rev_to_home.mp4`,
                idleVideo: `/${projectPath}/videos/surroundings/surroundings_gen_idle.mp4`,
              },
              items: [
                {
                  id: "surrounding1",
                  displayName: "Service Area",
                  iconSrc: MALL_ICON,
                  thumbnail: "",
                  distance: "6 min - 3 km",
                  description: "Service area with restaurants, cafes, and shops.",
                  x: 0.3, y: 0.4,
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
          idleVideo: `/${projectPath}/videos/amenities/amenities_gen_idle.mp4`,
        },
        items: [
          {
            id: "amenity1",
            displayName: "Azure Lagoons",
            subtitle: "Amenity",
            thumbnail: `/${projectPath}/thumbnails/amenities/amenity1.jpeg`,
            description: "Azure Lagoons is a unique water park that offers a variety of pools, slides, and water activities for all ages. It is designed to provide a fun and refreshing experience for residents and visitors alike.",
            x: 0.535, y: 0.57,
            videos: {
              forwardVideo: null,
              reverseVideo: null,
              idleVideo: `/${projectPath}/videos/amenities/amenity1/1.mp4`,
            },
          },
          {
            id: "amenity2",
            displayName: "Verde Walks",
            subtitle: "Amenity",
            thumbnail: `/${projectPath}/thumbnails/amenities/amenity2.jpeg`,
            description: "A scenic walking path surrounded by lush greenery, perfect for a leisurely stroll or morning jog.",
            x: 0.24, y: 0.81,
            videos: {
              forwardVideo: null,
              reverseVideo: null,
              idleVideo: `/${projectPath}/videos/amenities/amenity2/2.mp4`,
            },
          },
          {
            id: "amenity3",
            displayName: "Breezy Retreat",
            subtitle: "Amenity",
            thumbnail: `/${projectPath}/thumbnails/amenities/amenity4.jpeg`,
            description: "A breezy retreat area with comfortable seating and stunning views, perfect for relaxation and socializing.",
            x: 0.36, y: 0.88,
            videos: {
              forwardVideo: null,
              reverseVideo: null,
              idleVideo: `/${projectPath}/videos/amenities/amenity4/4.mp4`,
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
            projectId: "lighthouse",
            displayName: "Towers",
            subtitle: "Residential Area",
            thumbnail: null,
            highlight: null,
            description: "Our towers hold different apartments options.",
            x: 0.93, y: 0.53,
            videos: {
              forwardVideo: `/${projectPath}/videos/zones/zones_gen_trans_from_home.mp4`,
              reverseVideo: `/${projectPath}/videos/zones/zones_gen_rev_to_home.mp4`,
              idleVideo: `/${projectPath}/videos/zones/zones_gen_idle.mp4`,
            },
            properties: [
              {
                id: "7a",
                type: "tower",
                displayName: "7A",
                highlight: `/${projectPath}/highlight/7A Tower.png`,
                description: null,
                x: 0.57, y: 0.2,
                videos: {
                  forwardVideo: `/${projectPath}/videos/zones/7a/7a_gen_trans.mp4`,
                  reverseVideo: `/${projectPath}/videos/zones/7a/7a_gen_rev.mp4`,
                  idleVideo: `/${projectPath}/videos/zones/7a/views/view1/7a_view1_idle.mp4`,
                },
                floors: [
                  //test floor
                  {
                    id: "floor-1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectPath}/highlight/7A/7a_floor1.png`,
                    description: null,
                    x: 0.24, y: 0.705,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7a/floors/floor1/7a_floors_floor1_idle.mp4`,
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
                  {
                    id: "floor-2",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectPath}/highlight/7A/7a_floor2.png`,
                    description: null,
                    x: 0.245, y: 0.575,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7a/floors/floor2/7a_floors_floor2_idle.mp4`,
                    },
                    units: [
                      {
                        id: "107A21",
                        unitTypeId: "107A21",
                        displayName: "107A21",
                        area: 116.5,
                        price: 8,
                        bedrooms: 2, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/Balcony/7a/107A21.jpg`,
                        x: 0.745, y: 0.35,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7a/floor2/107A21.png`
                        }
                      },
                      { id: "107A22", unitTypeId: "107A22", displayName: "107A22", area: 157, price: 6, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/Balcony/7a/107A22.jpg`, x: 0.585, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/floor2/107A22.png` } },
                      { id: "107A23", unitTypeId: "107A23", displayName: "107A23", area: 160, price: 7, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/Balcony/7a/107A23.jpg`, x: 0.325, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/floor2/107A23.png` } },
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
                      idleVideo: `/${projectPath}/videos/zones/7a/views/view1/7a_view1_idle.mp4`,
                    }
                  },
                  {
                    name: "View 2",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7a/views/view2/7a_view2_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7a/views/view2/7a_view2_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7a/views/view2/7a_view2_idle.mp4`,
                    }
                  },
                  {
                    name: "View 3",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7a/views/view3/7a_view3_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7a/views/view3/7a_view3_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7a/views/view3/7a_view3_idle.mp4`,
                    }
                  },
                  {
                    name: "View 4",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7a/views/view4/7a_view4_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7a/views/view4/7a_view4_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7a/views/view4/7a_view4_idle.mp4`,
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
        "107A11": { id: "107A11", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [...gallery3], cutSections: [], floorPlans: [{ id: "107A11", src: `/${projectPath}/images/floorplans/107A11.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l19_unf.jpg`, x: 0.313, y: 0.419, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d19_unf.jpg`, x: 0.399, y: 0.394, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k19_unf.jpg`, x: 0.435, y: 0.552, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.535, y: 0.539, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b03_unf.jpg`, x: 0.653, y: 0.526, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, x: 0.751, y: 0.526, hotspots: [] }
        ] }] } },

        "107A12": { id: "107A12", bedrooms: 1, bathrooms: 1, area: 95.9,  serviceRooms: [], gallery: [...gallery1], cutSections: [], floorPlans: [{ id: "107A12", src: `/${projectPath}/images/floorplans/107A12.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.361, y: 0.731, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.444, y: 0.731, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.474, y: 0.417, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t11_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t11_unf.jpg`, x: 0.595, y: 0.443, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, x: 0.731, y: 0.456, hotspots: [] }
        ] }] } },

        "107A13": { id: "107A13", bedrooms: 2, bathrooms: 2, area: 128.3, serviceRooms: [], gallery: [...gallery2], cutSections: [], floorPlans: [{ id: "107A13", src: `/${projectPath}/images/floorplans/107A13.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.399, y: 0.498, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.478, y: 0.498, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.507, y: 0.207, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.493, y: 0.784, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.601, y: 0.784, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b17_unf.jpg`, x: 0.365, y: 0.674, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.732, y: 0.674, hotspots: [] }
        ] }] } },

        "107A14": { id: "107A14", bedrooms: 2, bathrooms: 2, area: 120.9, serviceRooms: [], gallery: [...gallery3], cutSections: [], floorPlans: [{ id: "107A14", src: `/${projectPath}/images/floorplans/107A14.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.277, y: 0.487, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.378, y: 0.487, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.408, y: 0.271, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, x: 0.443, y: 0.721, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, x: 0.536, y: 0.31, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.627, y: 0.323, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b27_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b27_unf.jpg`, x: 0.663, y: 0.629, hotspots: [] }
        ] }] } },

        // 7A, Floor 2
        "107A21": { id: "107A21", bedrooms: 2, bathrooms: 1, area: 116.5, serviceRooms: [], gallery: [...gallery1], cutSections: [], floorPlans: [{ id: "107A21", src: `/${projectPath}/images/floorplans/107A21.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l12_unf.jpg`, x: 0.334, y: 0.42, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d12_unf.jpg`, x: 0.407, y: 0.42, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k12_unf.jpg`, x: 0.432, y: 0.579, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.532, y: 0.566, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b03_unf.jpg`, x: 0.659, y: 0.553, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, x: 0.749, y: 0.553, hotspots: [] }
        ] }] } },

        "107A22": { id: "107A22", bedrooms: 2, bathrooms: 3, area: 157,   serviceRooms: [], gallery: [...gallery2], cutSections: [], floorPlans: [{ id: "107A22", src: `/${projectPath}/images/floorplans/107A22.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l16_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l16_unf.jpg`, x: 0.361, y: 0.454, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d16_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d16_unf.jpg`, x: 0.451, y: 0.414, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k16_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k16_unf.jpg`, x: 0.586, y: 0.374, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, x: 0.466, y: 0.194, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.586, y: 0.82, hotspots: [] }, 
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.692, y: 0.826, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b25_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b25_unf.jpg`, x: 0.473, y: 0.686, hotspots: [] }, 
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b24_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b24_unf.jpg`, x: 0.67, y: 0.619, hotspots: [] }
        ] }] } },

        "107A23": { id: "107A23", bedrooms: 2, bathrooms: 2, area: 160,   serviceRooms: [], gallery: [...gallery3], cutSections: [], floorPlans: [{ id: "107A23", src: `/${projectPath}/images/floorplans/107A23.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l15_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l15_unf.jpg`, x: 0.38, y: 0.634, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d15_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d15_unf.jpg`, x: 0.557, y: 0.679, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k15_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k15_unf.jpg`, x: 0.651, y: 0.608, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.5, y: 0.312, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.582, y: 0.312, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b17_unf.jpg`, x: 0.366, y: 0.366, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b07_unf.jpg`, x: 0.651, y: 0.312, hotspots: [] }
        ] }] } },
      },
    },
  ],
};