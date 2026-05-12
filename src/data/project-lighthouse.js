import SOMABAY_LOGO from '../assets/somabay-logo.svg';

import MALL_ICON from '../assets/icons/mall.svg';
import SERVICE_SVG from '../assets/svgs/service.svg?raw';

export const projectPath = "projects/light-house";
const SOMABAY_BG = `/${projectPath}/images/background.jpeg`;

const gallery_7A = [
  { id: "7A_gallery_1", src: `/${projectPath}/images/gallery/exterior/7A.jpg` }, 
  { id: "7A_gallery_2", src: `/${projectPath}/images/gallery/exterior/7A-2.jpg` }, 
  { id: "7A_gallery_3", src: `/${projectPath}/images/gallery/exterior/7A-3.png` }, 
  { id: "7A_gallery_4", src: `/${projectPath}/images/gallery/exterior/7A-4.png` }
];
const gallery_7B = [
  { id: "7B_gallery_1", src: `/${projectPath}/images/gallery/exterior/7B-1.jpg` }, 
  { id: "7B_gallery_2", src: `/${projectPath}/images/gallery/exterior/7B-2.jpg` }, 
  { id: "7B_gallery_3", src: `/${projectPath}/images/gallery/exterior/7B-3.png` }, 
  { id: "7B_gallery_4", src: `/${projectPath}/images/gallery/exterior/7B-4.png` }
];
const gallery_7C = [
  { id: "7C_gallery_1", src: `/${projectPath}/images/gallery/exterior/7C-1.jpg` }, 
  { id: "7C_gallery_2", src: `/${projectPath}/images/gallery/exterior/7C-2.jpg` }, 
  { id: "7C_gallery_3", src: `/${projectPath}/images/gallery/exterior/7C-3.jpg` }, 
  { id: "7C_gallery_4", src: `/${projectPath}/images/gallery/exterior/7C-4.png` },
  { id: "7C_gallery_5", src: `/${projectPath}/images/gallery/exterior/7C-5.png` }
];
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
const penta1 = [
  { id: "penta1_1", src: `/${projectPath}/images/gallery/interior/PENTHOUSE/01.jpg` },
  { id: "penta1_2", src: `/${projectPath}/images/gallery/interior/PENTHOUSE/02.jpg` },
  { id: "penta1_3", src: `/${projectPath}/images/gallery/interior/PENTHOUSE/03.jpg` },
  { id: "penta1_4", src: `/${projectPath}/images/gallery/interior/PENTHOUSE/04.jpg` },
  { id: "penta1_5", src: `/${projectPath}/images/gallery/interior/PENTHOUSE/05.jpg` },
];
const penta2 = [
  { id: "penta2_1", src: `/${projectPath}/images/gallery/interior/PENTHOUSE/03-.jpg` },
  { id: "penta2_2", src: `/${projectPath}/images/gallery/interior/PENTHOUSE/05.jpg` },
  { id: "penta2_3", src: `/${projectPath}/images/gallery/interior/PENTHOUSE/06.jpg` },
  { id: "penta2_4", src: `/${projectPath}/images/gallery/interior/PENTHOUSE/07.jpg` },
  { id: "penta2_5", src: `/${projectPath}/images/gallery/interior/PENTHOUSE/08.jpg` },
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
            x: 0.39, y: 0.39,
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
          reverseVideo: `/${projectPath}/videos/amenities/amenities_gen_rev_trans_to_home.mp4`,
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
            projectId: "mix",
            displayName: "Towers",
            subtitle: "Residential Area",
            thumbnail: null,
            highlight: null,
            description: "Our towers hold different apartments options. They are at the center of the city.",
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
                  {
                    id: "basement",
                    type: "Residential",
                    displayName: "Basement",
                    highlight: `/${projectPath}/highlight/7A/7a_basement.png`,
                    description: null,
                    x: 0.21, y: 0.96,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7a/floors/basement/7a_floors_basement_idle.mp4`,
                    },
                    units: [
                      {
                        id: "107AC01",
                        unitTypeId: "107AC01",
                        displayName: "107AC01",
                        area: 113.9,
                        price: 8,
                        bedrooms: 2, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107AC01.jpg`,
                        x: 0.745, y: 0.35,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7a/basement/107AC01.png`
                        }
                      },
                      { id: "107AC02", unitTypeId: "107AC02", displayName: "107AC02", area: 95.9, price: 5, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107AC02.jpg`, x: 0.635, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/basement/107AC02.png` } },
                      { id: "107AC03", unitTypeId: "107AC03", displayName: "107AC03", area: 128.3, price: 6, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/balcony/107AC03.jpg`, x: 0.48, y: 0.68, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/basement/107AC03.png` } },
                      { id: "107AC04", unitTypeId: "107AC04", displayName: "107AC04", area: 120.9, price: 7, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/balcony/107AC04.jpg`, x: 0.32, y: 0.45, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/basement/107AC04.png` } },
                    ],
                  },
                  {
                    id: "ground",
                    type: "Residential",
                    displayName: "Ground",
                    highlight: `/${projectPath}/highlight/7A/7a_ground.png`,
                    description: null,
                    x: 0.225, y: 0.84,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7a/floors/ground/7a_floors_ground_idle.mp4`,
                    },
                    units: [
                      {
                        id: "107A01",
                        unitTypeId: "107A01",
                        displayName: "107A01",
                        area: 113.9,
                        price: 8,
                        bedrooms: 2, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107A01.jpg`,
                        x: 0.745, y: 0.35,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7a/ground/107A01.png`
                        }
                      },
                      { id: "107A02", unitTypeId: "107A02", displayName: "107A02", area: 95.9, price: 5, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107A02.jpg`, x: 0.635, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/ground/107A02.png` } },
                      { id: "107A03", unitTypeId: "107A03", displayName: "107A03", area: 128.3, price: 6, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/balcony/107A03.jpg`, x: 0.48, y: 0.68, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/ground/107A03.png` } },
                      { id: "107A04", unitTypeId: "107A04", displayName: "107A04", area: 120.9, price: 7, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/balcony/107A04.jpg`, x: 0.32, y: 0.45, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/ground/107A04.png` } },
                    ],
                  },
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
                        balconyView: `/${projectPath}/panorama/balcony/107A11.jpg`,
                        x: 0.745, y: 0.35,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7a/floor1/107A11.png`
                        }
                      },
                      { id: "107A12", unitTypeId: "107A12", displayName: "107A12", area: 95.9, price: 6, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107A12.jpg`, x: 0.635, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/floor1/107A12.png` } },
                      { id: "107A13", unitTypeId: "107A13", displayName: "107A13", area: 128.3, price: 5, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/balcony/107A13.jpg`, x: 0.48, y: 0.68, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/floor1/107A13.png` } },
                      { id: "107A14", unitTypeId: "107A14", displayName: "107A14", area: 120.9, price: 7, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/balcony/107A14.jpg`, x: 0.32, y: 0.45, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/floor1/107A14.png` } },
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
                        balconyView: `/${projectPath}/panorama/balcony/107A21.jpg`,
                        x: 0.745, y: 0.35,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7a/floor2/107A21.png`
                        }
                      },
                      { id: "107A22", unitTypeId: "107A22", displayName: "107A22", area: 157, price: 6, bedrooms: 2, bathrooms: 3,
                       balconyView: `/${projectPath}/panorama/balcony/107A22.jpg`, x: 0.585, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/floor2/107A22.png` } },
                      { id: "107A23", unitTypeId: "107A23", displayName: "107A23", area: 160, price: 7, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/balcony/107A23.jpg`, x: 0.325, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7a/floor2/107A23.png` } },
                    ],
                  },
                  {
                    id: "floor-3",
                    type: "Residential",
                    displayName: "Floor 3",
                    highlight: `/${projectPath}/highlight/7A/7a_floor3.png`,
                    description: null,
                    x: 0.255, y: 0.455,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7a/floors/7a_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7a/floors/floor3/7a_floors_floor3_idle.mp4`,
                    },
                    units: [
                      {
                        id: "107A31",
                        unitTypeId: "107A31",
                        displayName: "107A31",
                        area: 227.4,
                        price: 9,
                        bedrooms: 3, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107A31.jpg`,
                        x: 0.37, y: 0.5,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7a/floor3/107A31.png`
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
              {
                id: "7b1",
                type: "tower",
                displayName: "7B 1",
                highlight: `/${projectPath}/highlight/7B1 Tower.png`,
                description: null,
                x: 0.54, y: 0.33,
                videos: {
                  forwardVideo: `/${projectPath}/videos/zones/7b1/7b1_gen_trans.mp4`,
                  reverseVideo: `/${projectPath}/videos/zones/7b1/7b1_gen_rev.mp4`,
                  idleVideo: `/${projectPath}/videos/zones/7b1/views/view1/7b1_view1_idle.mp4`,
                },
				        floors: [
                  {
                    id: "basement",
                    type: "Residential",
                    displayName: "Basement",
                    highlight: `/${projectPath}/highlight/7B1/7b1_basement.png`,
                    description: null,
                    x: 0.135, y: 0.85,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b1/floors/basement/7b1_floors_basement_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Basement Units
                      {
                        id: "107BC01",
                        unitTypeId: "107BC01",
                        displayName: "107BC01",
                        area: 95.3,
                        price: 6,
                        bedrooms: 2, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC01.jpg`,
                        x: 0.769, y: 0.57,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7b1/basement/107BC01.png`
                        }
                      },
                      { id: "107BC02", unitTypeId: "107BC02", displayName: "107BC02", area: 81.4, price: 5, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC02.jpg`, x: 0.694, y: 0.583, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/basement/107BC02.png` } },
                      { id: "107BC03", unitTypeId: "107BC03", displayName: "107BC03", area: 77.4, price: 4, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC03.jpg`, x: 0.613, y: 0.57, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/basement/107BC03.png` } },
                      { id: "107BC04", unitTypeId: "107BC04", displayName: "107BC04", area: 97, price: 6, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC04.jpg`, x: 0.513, y: 0.564, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/basement/107BC04.png` } },
                      { id: "107BC05", unitTypeId: "107BC05", displayName: "107BC05", area: 105.1, price: 7, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC05.jpg`, x: 0.439, y: 0.481, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/basement/107BC05.png` } },
                      { id: "107BC06", unitTypeId: "107BC06", displayName: "107BC06", area: 68.1, price: 4, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC06.jpg`, x: 0.364, y: 0.474, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/basement/107BC06.png` } },
                      { id: "107BC07", unitTypeId: "107BC07", displayName: "107BC07", area: 88.4, price: 5, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC07.jpg`, x: 0.28, y: 0.474, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/basement/107BC07.png` } },
                      { id: "107BC08", unitTypeId: "107BC08", displayName: "107BC08", area: 90.7, price: 6, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC08.jpg`, x: 0.211, y: 0.446, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/basement/107BC08.png` } },
                      ],
                  },
                  {
                    id: "ground",
                    type: "Residential",
                    displayName: "Ground",
                    highlight: `/${projectPath}/highlight/7B1/7b1_ground.png`,
                    description: null,
                    x: 0.144, y: 0.759,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b1/floors/ground/7b1_floors_ground_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Ground - Units
                      { id: "107B01", unitTypeId: "107B01", displayName: "107B01", area: 249.9, price: 8, bedrooms: 3, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B01.jpg`, x: 0.678, y: 0.525, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/ground/107B01.png` } },
                      { id: "107B02", unitTypeId: "107B02", displayName: "107B02", area: 207.2, price: 6, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B02.jpg`, x: 0.496, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/ground/107B02.png` } },
                      { id: "107B03", unitTypeId: "107B03", displayName: "107B03", area: 249, price: 7, bedrooms: 3, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B03.jpg`, x: 0.28, y: 0.422, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/ground/107B03.png` } },
                    ],
                  },
                  {
                    id: "floor-1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectPath}/highlight/7B1/7b1_floor1.png`,
                    description: null,
                    x: 0.159, y: 0.668,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b1/floors/floor1/7b1_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 1 - Units
                      { id: "107B11", unitTypeId: "107B11", displayName: "107B11", area: 249.9, price: 8, bedrooms: 3, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B11.jpg`, x: 0.678, y: 0.525, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/floor1/107B11.png` } },
                      { id: "107B12", unitTypeId: "107B12", displayName: "107B12", area: 207.2, price: 6, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B12.jpg`, x: 0.496, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/floor1/107B12.png` } },
                      { id: "107B13", unitTypeId: "107B13", displayName: "107B13", area: 249, price: 7, bedrooms: 3, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B13.jpg`, x: 0.28, y: 0.422, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/floor1/107B13.png` } },
                    ],
                  },
                  {
                    id: "floor-2",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectPath}/highlight/7B1/7b1_floor2.png`,
                    description: null,
                    x: 0.17, y: 0.587,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b1/floors/floor2/7b1_floors_floor2_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 2 - Units
                      { id: "107B21", unitTypeId: "107B21", displayName: "107B21", area: 213, price: 8, bedrooms: 3, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B21.jpg`, x: 0.678, y: 0.525, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/floor2/107B21.png` } },
                      { id: "107B22", unitTypeId: "107B22", displayName: "107B22", area: 180.6, price: 6, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B22.jpg`, x: 0.496, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/floor2/107B22.png` } },
                      { id: "107B23", unitTypeId: "107B23", displayName: "107B23", area: 211.9, price: 7, bedrooms: 3, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B23.jpg`, x: 0.28, y: 0.422, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/floor2/107B23.png` } },

                     
                    ],
                  },
                  {
                    id: "floor-3",
                    type: "Residential",
                    displayName: "Floor 3",
                    highlight: `/${projectPath}/highlight/7B1/7b1_floor3.png`,
                    description: null,
                    x: 0.172, y: 0.499,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b1/floors/7b1_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b1/floors/7b1_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b1/floors/floor3/7b1_floors_floor3_idle.mp4`,
                    },
                    units: [
                      // 7B 1, Floor 3 - Units
                      { id: "107B31", unitTypeId: "107B31", displayName: "107B31", area: 173.7, price: 7, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B31.jpg`, x: 0.718, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/floor3/107B31.png` } },
                      { id: "107B32", unitTypeId: "107B32", displayName: "107B32", area: 173.7, price: 6, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B32.jpg`, x: 0.27, y: 0.408, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b1/floor3/107B32.png` } },
                    ],
                  },
                ],
                views: [
                  {
                    name: "View 1",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b1/views/view1/7b1_view1_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b1/views/view1/7b1_view1_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b1/views/view1/7b1_view1_idle.mp4`,
                    }
                  },
                  {
                    name: "View 2",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b1/views/view2/7b1_view2_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b1/views/view2/7b1_view2_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b1/views/view2/7b1_view2_idle.mp4`,
                    }
                  },
                  {
                    name: "View 3",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b1/views/view3/7b1_view3_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b1/views/view3/7b1_view3_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b1/views/view3/7b1_view3_idle.mp4`,
                    }
                  },
                  {
                    name: "View 4",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b1/views/view4/7b1_view4_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b1/views/view4/7b1_view4_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b1/views/view4/7b1_view4_idle.mp4`,
                    }
                  },
                ],
              },
              {
                id: "7b2",
                type: "tower",
                displayName: "7B 2",
                highlight: `/${projectPath}/highlight/7B2 Tower.png`,
                description: null,
                x: 0.4, y: 0.62,
                videos: {
                  forwardVideo: `/${projectPath}/videos/zones/7b2/7b2_gen_trans.mp4`,
                  reverseVideo: `/${projectPath}/videos/zones/7b2/7b2_gen_rev.mp4`,
                  idleVideo: `/${projectPath}/videos/zones/7b2/views/view1/7b2_view1_idle.mp4`,
                },
                floors: [
                  {
                    id: "basement",
                    type: "Residential",
                    displayName: "Basement",
                    highlight: `/${projectPath}/highlight/7B2/7b2_basement.png`,
                    description: null,
                    x: 0.183, y: 0.872,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b2/floors/basement/7b2_floors_basement_idle.mp4`,
                    },
                    units: [
                      // 7B 2, Basement Units
                      {
                        id: "107BC09",
                        unitTypeId: "107BC09",
                        displayName: "107BC09",
                        area: 113.2,
                        price: 7,
                        bedrooms: 2, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC09.jpg`,
                        x: 0.272, y: 0.442,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7b2/basement/107BC09.png`
                        }
                      },
                      { id: "107BC10", unitTypeId: "107BC10", displayName: "107BC10", area: 100.5, price: 7, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC10.jpg`, x: 0.39, y: 0.52, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b2/basement/107BC10.png` } },
                      { id: "107BC11", unitTypeId: "107BC11", displayName: "107BC11", area: 78, price: 5, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC11.jpg`, x: 0.496, y: 0.55, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b2/basement/107BC11.png` } },
                      { id: "107BC12", unitTypeId: "107BC12", displayName: "107BC12", area: 115.5, price: 8, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/balcony/107BC12.jpg`, x: 0.673, y: 0.63, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b2/basement/107BC12.png` } },
                      { id: "107BC13", unitTypeId: "107BC13", displayName: "107BC13", area: 88.9, price: 6, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107BC13.jpg`, x: 0.688, y: 0.314, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b2/basement/107BC13.png` } },
                      ],
                  },
                  {
                    id: "ground",
                    type: "Residential",
                    displayName: "Ground",
                    highlight: `/${projectPath}/highlight/7B2/7b2_ground.png`,
                    description: null,
                    x: 0.187, y: 0.752,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b2/floors/ground/7b2_floors_ground_idle.mp4`,
                    },
                    units: [
                      // 7B 2, Ground - Units
                      {
                        id: "107B04",
                        unitTypeId: "107B04",
                        displayName: "107B04",
                        area: 109.8,
                        price: 7,
                        bedrooms: 2, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107B04.jpg`,
                        x: 0.279, y: 0.429,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7b2/ground/107B04.png`
                        }
                      },
                      { id: "107B05", unitTypeId: "107B05", displayName: "107B05", area: 162.4, price: 8, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107B05.jpg`, x: 0.436, y: 0.525, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b2/ground/107B05.png` } },
                      { id: "107B06", unitTypeId: "107B06", displayName: "107B06", area: 211.4, price: 9, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107B06.jpg`, x: 0.665, y: 0.442, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b2/ground/107B06.png` } },
                      ],
                  },
                  {
                    id: "floor-1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectPath}/highlight/7B2/7b2_floor1.png`,
                    description: null,
                    x: 0.198, y: 0.597,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b2/floors/floor1/7b2_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7B 2, Floor 1 - Units
                      {
                        id: "107B14",
                        unitTypeId: "107B14",
                        displayName: "107B14",
                        area: 109.8,
                        price: 7,
                        bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107B14.jpg`,
                        x: 0.279, y: 0.429,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7b2/floor1/107B14.png`
                        }
                      },
                      { id: "107B15", unitTypeId: "107B15", displayName: "107B15", area: 162.4, price: 8, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/balcony/107B15.jpg`, x: 0.436, y: 0.525, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b2/floor1/107B15.png` } },
                      { id: "107B16", unitTypeId: "107B16", displayName: "107B16", area: 212.1, price: 9, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B16.jpg`, x: 0.665, y: 0.442, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b2/floor1/107B16.png` } },
                      ],
                  },
                  {
                    id: "floor-2",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectPath}/highlight/7B2/7b2_floor2.png`,
                    description: null,
                    x: 0.204, y: 0.479,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b2/floors/floor2/7b2_floors_floor2_idle.mp4`,
                    },
                    units: [
                      // 7B 2, Floor 2 - Units
                      {
                        id: "107B24",
                        unitTypeId: "107B24",
                        displayName: "107B24",
                        area: 208.5,
                        price: 9,
                        bedrooms: 3, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B24.jpg`,
                        x: 0.327, y: 0.448,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7b2/floor2/107B24.png`
                        }
                      },
                      { id: "107B25", unitTypeId: "107B25", displayName: "107B25", area: 180.8, price: 8, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/balcony/107B25.jpg`, x: 0.635, y: 0.435, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7b2/floor2/107B25.png` } },
                      ],
                  },
                  {
                    id: "floor-3",
                    type: "Residential",
                    displayName: "Floor 3",
                    highlight: `/${projectPath}/highlight/7B2/7b2_floor3.png`,
                    description: null,
                    x: 0.206, y: 0.336,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b2/floors/7b2_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b2/floors/7b2_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b2/floors/floor3/7b2_floors_floor3_idle.mp4`,
                    },
                    units: [
                      // 7B 2, Floor 3 - Units
                      {
                        id: "107B33",
                        unitTypeId: "107B33",
                        displayName: "107B33",
                        area: 173.8,
                        price: 9,
                        bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107B33.jpg`,
                        x: 0.347, y: 0.435,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7b2/floor3/107B33.png`
                        }
                      },
                      ],
                  },
                ],
                views: [
                  {
                    name: "View 1",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b2/views/view1/7b2_view1_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b2/views/view1/7b2_view1_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b2/views/view1/7b2_view1_idle.mp4`,
                    }
                  },
                  {
                    name: "View 2",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b2/views/view2/7b2_view2_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b2/views/view2/7b2_view2_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b2/views/view2/7b2_view2_idle.mp4`,
                    }
                  },
                  {
                    name: "View 3",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b2/views/view3/7b2_view3_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b2/views/view3/7b2_view3_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b2/views/view3/7b2_view3_idle.mp4`,
                    }
                  },
                  {
                    name: "View 4",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7b2/views/view4/7b2_view4_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7b2/views/view4/7b2_view4_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7b2/views/view4/7b2_view4_idle.mp4`,
                    }
                  },
                ],
              },
              {
                id: "7c",
                type: "tower",
                displayName: "7C",
                highlight: `/${projectPath}/highlight/7C Tower.png`,
                description: null,
                x: 0.44, y: 0.16,
                videos: {
                  forwardVideo: `/${projectPath}/videos/zones/7c/7c_gen_trans.mp4`,
                  reverseVideo: `/${projectPath}/videos/zones/7c/7c_gen_rev.mp4`,
                  idleVideo: `/${projectPath}/videos/zones/7c/views/view1/7c_view1_idle.mp4`,
                },
                floors: [
                  {
                    id: "ground",
                    type: "Residential",
                    displayName: "Ground",
                    highlight: `/${projectPath}/highlight/7C/7c_ground.png`,
                    description: null,
                    x: 0.137, y: 0.861,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7c/floors/ground/7c_floors_ground_idle.mp4`,
                    },
                    units: [
                      // 7C, Ground - Units
                      {
                        id: "107C01",
                        unitTypeId: "107C01",
                        displayName: "107C01",
                        area: 192.4,
                        price: 8,
                        bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107C01.jpg`,
                        x: 0.246, y: 0.357,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7c/ground/107C01.png`
                        }
                      },
                      { id: "107C02", unitTypeId: "107C02", displayName: "107C02", area: 107.4, price: 6, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107C02.jpg`, x: 0.372, y: 0.421, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7c/ground/107C02.png` } },
                      { id: "107C03", unitTypeId: "107C03", displayName: "107C03", area: 158.8, price: 7, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107C03.jpg`, x: 0.496, y: 0.55, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7c/ground/107C03.png` } },
                      { id: "107C04", unitTypeId: "107C04", displayName: "107C04", area: 193.6, price: 9, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107C04.jpg`, x: 0.68, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7c/ground/107C04.png` } },
                      ],
                  },
                  {
                    id: "floor-1",
                    type: "Residential",
                    displayName: "Floor 1",
                    highlight: `/${projectPath}/highlight/7C/7c_floor1.png`,
                    description: null,
                    x: 0.152, y: 0.769,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7c/floors/floor1/7c_floors_floor1_idle.mp4`,
                    },
                    units: [
                      // 7C 1, Floor 1 - Units
                      {
                        id: "107C11",
                        unitTypeId: "107C11",
                        displayName: "107C11",
                        area: 192.4,
                        price: 9,
                        bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107C11.jpg`,
                        x: 0.246, y: 0.357,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7c/floor1/107C11.png`
                        }
                      },
                      { id: "107C12", unitTypeId: "107C12", displayName: "107C12", area: 107.4, price: 6, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107C12.jpg`, x: 0.372, y: 0.421, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7c/floor1/107C12.png` } },
                      { id: "107C13", unitTypeId: "107C13", displayName: "107C13", area: 158.8, price: 7, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107C13.jpg`, x: 0.496, y: 0.55, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7c/floor1/107C13.png` } },
                      { id: "107C14", unitTypeId: "107C14", displayName: "107C14", area: 193.6, price: 9, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107C14.jpg`, x: 0.68, y: 0.5, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7c/floor1/107C14.png` } },
                      ],
                  },
                  {
                    id: "floor-2",
                    type: "Residential",
                    displayName: "Floor 2",
                    highlight: `/${projectPath}/highlight/7C/7c_floor2.png`,
                    description: null,
                    x: 0.154, y: 0.69,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7c/floors/floor2/7c_floors_floor2_idle.mp4`,
                    },
                    units: [
                      // 7C, Floor 2 - Units
                      {
                        id: "107C21",
                        unitTypeId: "107C21",
                        displayName: "107C21",
                        area: 158.2,
                        price: 7,
                        bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107C21.jpg`,
                        x: 0.254, y: 0.349,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7c/floor2/107C21.png`
                        }
                      },
                      { id: "107C22", unitTypeId: "107C22", displayName: "107C22", area: 168.1, price: 8, bedrooms: 2, bathrooms: 2,
                        balconyView: `/${projectPath}/panorama/balcony/107C22.jpg`, x: 0.417, y: 0.494, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7c/floor2/107C22.png` } },
                      { id: "107C23", unitTypeId: "107C23", displayName: "107C23", area: 79.7, price: 5, bedrooms: 1, bathrooms: 1,
                        balconyView: `/${projectPath}/panorama/balcony/107C23.jpg`, x: 0.552, y: 0.513, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7c/floor2/107C23.png` } },
                      { id: "107C24", unitTypeId: "107C24", displayName: "107C24", area: 158.9, price: 7, bedrooms: 2, bathrooms: 3,
                        balconyView: `/${projectPath}/panorama/balcony/107C24.jpg`, x: 0.683, y: 0.461, videos: { forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`, reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`, idleVideo: `/${projectPath}/units/7c/floor2/107C24.png` } },
                      ],
                  },
                  {
                    id: "floor-3",
                    type: "Residential",
                    displayName: "Floor 3",
                    highlight: `/${projectPath}/highlight/7C/7c_floor3.png`,
                    description: null,
                    x: 0.293, y: 0.572,
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7c/floors/7c_floors_gen_trans_to_floor3.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7c/floors/7c_floors_gen_rev_from_floor3.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7c/floors/floor3/7c_floors_floor3_idle.mp4`,
                    },
                    units: [
                      // 7C, Floor 3 - Units
                      {
                        id: "107C31",
                        unitTypeId: "107C31",
                        displayName: "107C31",
                        area: 221.8,
                        price: 9,
                        bedrooms: 3, bathrooms: 4,
                        balconyView: `/${projectPath}/panorama/balcony/107C31.jpg`, x: 0.471, y: 0.487,
                        videos: {
                          forwardVideo: `/${projectPath}/units/trans_from_floors_to_units.mp4`,
                          reverseVideo: `/${projectPath}/units/rev_from_units_to_floors.mp4`,
                          idleVideo: `/${projectPath}/units/7c/floor3/107C31.png`
                        }
                      },
                    ],
                  },
                ],
                features: null,
                // {
                //   displayName: "7C Features",
                //   x: 0.7, y: 0.65,
                //   videos: {
                //     forwardVideo: null,
                //     reverseVideo: null,
                //     idleVideo: null,
                //   },
                //   items: [
                //   {
                //     id: "feature1",
                //     displayName: "Entrance",
                //     subtitle: "7C Feature",
                //     description: "Main entrance providing access to the building, designed for both aesthetics and functionality.",
                //     x: 0.2, y: 0.67,
                //     videos: {
                //       forwardVideo: null,
                //       reverseVideo: null,
                //       idleVideo: `/${projectName}/features/7C/`,
                //     },
                //   },
                //   {
                //     id: "feature2",
                //     displayName: "Public Toilets",
                //     subtitle: "7C Feature",
                //     description: "Well-maintained and conveniently located public restrooms for residents and visitors, ensuring comfort and accessibility throughout the community.",
                //     x: 0.62, y: 0.65,
                //     videos: {
                //       forwardVideo: null,
                //       reverseVideo: null,
                //       idleVideo: `/${projectName}/features/7C/`,
                //     },
                //   },
                //   {
                //     id: "feature3",
                //     displayName: "Storage",
                //     subtitle: "7C Feature",
                //     description: "Secure and convenient storage solutions for residents, providing ample space for personal belongings and seasonal items.",
                //     x: 0.5, y: 0.65,
                //     videos: {
                //       forwardVideo: null,
                //       reverseVideo: null,
                //       idleVideo: `/${projectName}/features/7C/`,
                //     },
                //   },
                // ]
                // },
                views: [
                  {
                    name: "View 1",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7c/views/view1/7c_view1_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7c/views/view1/7c_view1_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7c/views/view1/7c_view1_idle.mp4`,
                    }
                  },
                  {
                    name: "View 2",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7c/views/view2/7c_view2_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7c/views/view2/7c_view2_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7c/views/view2/7c_view2_idle.mp4`,
                    }
                  },
                  {
                    name: "View 3",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7c/views/view3/7c_view3_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7c/views/view3/7c_view3_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7c/views/view3/7c_view3_idle.mp4`,
                    }
                  },
                  {
                    name: "View 4",
                    videos: {
                      forwardVideo: `/${projectPath}/videos/zones/7c/views/view4/7c_view4_trans.mp4`,
                      reverseVideo: `/${projectPath}/videos/zones/7c/views/view4/7c_view4_rev.mp4`,
                      idleVideo: `/${projectPath}/videos/zones/7c/views/view4/7c_view4_idle.mp4`,
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
        "107AC01": { id: "107AC01", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [...gallery1, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107AC01", src: `/${projectPath}/images/floorplans/107AC01.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l12_unf.jpg`, x: 0.753, y: 0.579, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d12_unf.jpg`, x: 0.668, y: 0.619, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k12_unf.jpg`, x: 0.631, y: 0.445, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.518, y: 0.458, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b03_unf.jpg`, x: 0.371, y: 0.458, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, x: 0.258, y: 0.458, hotspots: [] }
        ] }] } },

        "107AC02": { id: "107AC02", bedrooms: 1, bathrooms: 1, area: 95.9,  serviceRooms: [], gallery: [...gallery2, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107AC02", src: `/${projectPath}/images/floorplans/107AC02.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l14_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l14_unf.jpg`, x: 0.37, y: 0.653, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d14_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d14_unf.jpg`, x: 0.443, y: 0.722, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k14_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k14_unf.jpg`, x: 0.48, y: 0.432, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t11_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t11_unf.jpg`, x: 0.597, y: 0.432, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, x: 0.731, y: 0.458, hotspots: [] }
        ] }] } },

        "107AC03": { id: "107AC03", bedrooms: 2, bathrooms: 2, area: 128.3, serviceRooms: [], gallery: [...gallery3, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107AC03", src: `/${projectPath}/images/floorplans/107AC03.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l14_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l14_unf.jpg`, x: 0.384, y: 0.428, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d14_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d14_unf.jpg`, x: 0.464, y: 0.428, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k14_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k14_unf.jpg`, x: 0.485, y: 0.21, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.471, y: 0.747, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.572, y: 0.747, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b17_unf.jpg`, x: 0.353, y: 0.65, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.687, y: 0.65, hotspots: [] }
        ] }] } },

        "107AC04": { id: "107AC04", bedrooms: 2, bathrooms: 2, area: 120.9, serviceRooms: [], gallery: [...gallery1, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107AC04", src: `/${projectPath}/images/floorplans/107AC04.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l14_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l14_unf.jpg`, x: 0.277, y: 0.487, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d14_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d14_unf.jpg`, x: 0.378, y: 0.487, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k14_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k14_unf.jpg`, x: 0.408, y: 0.271, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, x: 0.443, y: 0.721, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, x: 0.536, y: 0.284, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.627, y: 0.323, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b27_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b27_unf.jpg`, x: 0.663, y: 0.629, hotspots: [] }
        ] }] } },

        // 7A, Ground
        "107A01": { id: "107A01", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [...gallery2, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A01", src: `/${projectPath}/images/floorplans/107A01.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l19_unf.jpg`, x: 0.311, y: 0.46, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d19_unf.jpg`, x: 0.396, y: 0.42, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k19_unf.jpg`, x: 0.433, y: 0.555, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.526, y: 0.555, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b03_unf.jpg`, x: 0.656, y: 0.555, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, x: 0.757, y: 0.555, hotspots: [] }
        ] }] } },

        "107A02": { id: "107A02", bedrooms: 1, bathrooms: 1, area: 95.9,  serviceRooms: [], gallery: [...gallery3, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A02", src: `/${projectPath}/images/floorplans/107A02.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.37, y: 0.653, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.443, y: 0.722, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.48, y: 0.432, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t11_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t11_unf.jpg`, x: 0.597, y: 0.432, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, x: 0.731, y: 0.458, hotspots: [] }
        ] }] } },

        "107A03": { id: "107A03", bedrooms: 2, bathrooms: 2, area: 128.3, serviceRooms: [], gallery: [...gallery1, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A03", src: `/${projectPath}/images/floorplans/107A03.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.406, y: 0.487, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.485, y: 0.487, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.5, y: 0.205, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.493, y: 0.773, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.599, y: 0.773, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b17_unf.jpg`, x: 0.369, y: 0.663, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.728, y: 0.663, hotspots: [] }
        ] }] } },

        "107A04": { id: "107A04", bedrooms: 2, bathrooms: 2, area: 120.9, serviceRooms: [], gallery: [...gallery2, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A04", src: `/${projectPath}/images/floorplans/107A04.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.277, y: 0.487, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.378, y: 0.487, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.408, y: 0.271, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, x: 0.443, y: 0.721, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, x: 0.536, y: 0.31, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.627, y: 0.323, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b27_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b27_unf.jpg`, x: 0.663, y: 0.629, hotspots: [] }
        ] }] } },

        // 7A, Floor 1
        "107A11": { id: "107A11", bedrooms: 2, bathrooms: 1, area: 113.9, serviceRooms: [], gallery: [...gallery3, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A11", src: `/${projectPath}/images/floorplans/107A11.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l19_unf.jpg`, x: 0.313, y: 0.419, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d19_unf.jpg`, x: 0.399, y: 0.394, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k19_unf.jpg`, x: 0.435, y: 0.552, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.535, y: 0.539, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b03_unf.jpg`, x: 0.653, y: 0.526, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, x: 0.751, y: 0.526, hotspots: [] }
        ] }] } },

        "107A12": { id: "107A12", bedrooms: 1, bathrooms: 1, area: 95.9,  serviceRooms: [], gallery: [...gallery1, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A12", src: `/${projectPath}/images/floorplans/107A12.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.361, y: 0.731, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.444, y: 0.731, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.474, y: 0.417, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t11_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t11_unf.jpg`, x: 0.595, y: 0.443, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, x: 0.731, y: 0.456, hotspots: [] }
        ] }] } },

        "107A13": { id: "107A13", bedrooms: 2, bathrooms: 2, area: 128.3, serviceRooms: [], gallery: [...gallery2, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A13", src: `/${projectPath}/images/floorplans/107A13.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.399, y: 0.498, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.478, y: 0.498, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.507, y: 0.207, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.493, y: 0.784, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.601, y: 0.784, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b17_unf.jpg`, x: 0.365, y: 0.674, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.732, y: 0.674, hotspots: [] }
        ] }] } },

        "107A14": { id: "107A14", bedrooms: 2, bathrooms: 2, area: 120.9, serviceRooms: [], gallery: [...gallery3, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A14", src: `/${projectPath}/images/floorplans/107A14.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l18_unf.jpg`, x: 0.277, y: 0.487, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d18_unf.jpg`, x: 0.378, y: 0.487, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k18_unf.jpg`, x: 0.408, y: 0.271, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, x: 0.443, y: 0.721, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, x: 0.536, y: 0.31, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.627, y: 0.323, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b27_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b27_unf.jpg`, x: 0.663, y: 0.629, hotspots: [] }
        ] }] } },

        // 7A, Floor 2
        "107A21": { id: "107A21", bedrooms: 2, bathrooms: 1, area: 116.5, serviceRooms: [], gallery: [...gallery1, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A21", src: `/${projectPath}/images/floorplans/107A21.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l12_unf.jpg`, x: 0.334, y: 0.42, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d12_unf.jpg`, x: 0.407, y: 0.42, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k12_unf.jpg`, x: 0.432, y: 0.579, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.532, y: 0.566, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b03_unf.jpg`, x: 0.659, y: 0.553, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, x: 0.749, y: 0.553, hotspots: [] }
        ] }] } },

        "107A22": { id: "107A22", bedrooms: 2, bathrooms: 3, area: 157,   serviceRooms: [], gallery: [...gallery2, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A22", src: `/${projectPath}/images/floorplans/107A22.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l16_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l16_unf.jpg`, x: 0.361, y: 0.454, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d16_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d16_unf.jpg`, x: 0.451, y: 0.414, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k16_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k16_unf.jpg`, x: 0.586, y: 0.374, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t06_unf.jpg`, x: 0.466, y: 0.194, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.586, y: 0.82, hotspots: [] }, 
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.692, y: 0.826, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b25_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b25_unf.jpg`, x: 0.473, y: 0.686, hotspots: [] }, 
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b24_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b24_unf.jpg`, x: 0.67, y: 0.619, hotspots: [] }
        ] }] } },

        "107A23": { id: "107A23", bedrooms: 2, bathrooms: 2, area: 160,   serviceRooms: [], gallery: [...gallery3, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A23", src: `/${projectPath}/images/floorplans/107A23.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l15_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l15_unf.jpg`, x: 0.38, y: 0.634, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d15_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d15_unf.jpg`, x: 0.557, y: 0.679, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k15_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k15_unf.jpg`, x: 0.651, y: 0.608, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.5, y: 0.312, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.582, y: 0.312, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b17_unf.jpg`, x: 0.366, y: 0.366, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b07_unf.jpg`, x: 0.651, y: 0.312, hotspots: [] }
        ] }] } },

        // 7A, Floor 3
        "107A31": { id: "107A31", bedrooms: 3, bathrooms: 3, area: 227.4, serviceRooms: [], gallery: [...penta1, ...gallery_7A], cutSections: [], floorPlans: [{ id: "107A31", src: `/${projectPath}/images/floorplans/107A31.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l17_unf.jpg`, x: 0.284, y: 0.248, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d17_unf.jpg`, x: 0.277, y: 0.474, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k17_unf.jpg`, x: 0.299, y: 0.648, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t11_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t11_unf.jpg`, x: 0.43, y: 0.5, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t06_unf.jpg`, x: 0.507, y: 0.695, hotspots: [] }, 
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.52, y: 0.814, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b26_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b26_unf.jpg`, x: 0.493, y: 0.369, hotspots: [] }, 
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b17_unf.jpg`, x: 0.622, y: 0.369, hotspots: [] }, 
          { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b18_unf.jpg`, x: 0.648, y: 0.715, hotspots: [] }
        ] }] } },

    
        // 7B 1, Basement
        "107BC01": { id: "107BC01", bedrooms: 2, bathrooms: 1, area: 95.3, serviceRooms: [], gallery: [...gallery1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC01", src: `/${projectPath}/images/floorplans/107BC01.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ 
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l01_unf.jpg`, x: 0.233, y: 0.603, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d01_unf.jpg`, x: 0.337, y: 0.545, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k01_unf.jpg`, x: 0.434, y: 0.655, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t02_unf.jpg`, x: 0.42, y: 0.298, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b03_unf.jpg`, x: 0.617, y: 0.629, hotspots: [] }, 
          { id: "room6", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.723, y: 0.587, hotspots: [] } 
        ] }] } },

        "107BC02": { id: "107BC02", bedrooms: 1, bathrooms: 1, area: 81.4, serviceRooms: [], gallery: [...gallery2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC02", src: `/${projectPath}/images/floorplans/107BC02.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ 
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l02_unf.jpg`, x: 0.23, y: 0.569, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d02_unf.jpg`, x: 0.334, y: 0.543, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k02_unf.jpg`, x: 0.465, y: 0.53, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t02_unf.jpg`, x: 0.588, y: 0.356, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, x: 0.762, y: 0.369, hotspots: [] } 
        ] }] } },

        "107BC03": { id: "107BC03", bedrooms: 1, bathrooms: 1, area: 77.4, serviceRooms: [], gallery: [...gallery3, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC03", src: `/${projectPath}/images/floorplans/107BC03.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ 
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l03_unf.jpg`, x: 0.288, y: 0.315, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d03_unf.jpg`, x: 0.517, y: 0.315, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k03_unf.jpg`, x: 0.56, y: 0.532, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.477, y: 0.749, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, x: 0.736, y: 0.372, hotspots: [] } 
        ] }] } },

        "107BC04": { id: "107BC04", bedrooms: 1, bathrooms: 1, area: 97, serviceRooms: [], gallery: [...gallery1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC04", src: `/${projectPath}/images/floorplans/107BC04.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ 
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l04_unf.jpg`, x: 0.253, y: 0.581, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d04_unf.jpg`, x: 0.435, y: 0.607, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k04_unf.jpg`, x: 0.481, y: 0.369, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t03_unf.jpg`, x: 0.604, y: 0.356, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, x: 0.753, y: 0.466, hotspots: [] } 
        ] }] } },

        "107BC05": { id: "107BC05", bedrooms: 1, bathrooms: 1, area: 105.1, serviceRooms: [], gallery: [...gallery2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC05", src: `/${projectPath}/images/floorplans/107BC05.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ 
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l05_unf.jpg`, x: 0.372, y: 0.401, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d05_unf.jpg`, x: 0.507, y: 0.388, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k05_unf.jpg`, x: 0.516, y: 0.543, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t02_unf.jpg`, x: 0.618, y: 0.556, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b04_unf.jpg`, x: 0.738, y: 0.5, hotspots: [] } 
        ] }] } },

        "107BC06": { id: "107BC06", bedrooms: 1, bathrooms: 1, area: 68.1, serviceRooms: [], gallery: [...gallery3, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC06", src: `/${projectPath}/images/floorplans/107BC06.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ 
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l01_unf.jpg`, x: 0.285, y: 0.704, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d01_unf.jpg`, x: 0.523, y: 0.704, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k01_unf.jpg`, x: 0.523, y: 0.487, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t02_unf.jpg`, x: 0.471, y: 0.28, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.745, y: 0.613, hotspots: [] } 
        ] }] } },

        "107BC07": { id: "107BC07", bedrooms: 1, bathrooms: 1, area: 88.4, serviceRooms: [], gallery: [...gallery1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC07", src: `/${projectPath}/images/floorplans/107BC07.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ 
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l07_unf.jpg`, x: 0.27, y: 0.428, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d07_unf.jpg`, x: 0.37, y: 0.454, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k07_unf.jpg`, x: 0.457, y: 0.37, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.566, y: 0.6, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, x: 0.745, y: 0.639, hotspots: [] } 
        ] }] } },

        "107BC08": { id: "107BC08", bedrooms: 1, bathrooms: 1, area: 90.7, serviceRooms: [], gallery: [...gallery2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC08", src: `/${projectPath}/images/floorplans/107BC08.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ 
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l04_unf.jpg`, x: 0.255, y: 0.626, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d04_unf.jpg`, x: 0.37, y: 0.53, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k04_unf.jpg`, x: 0.482, y: 0.556, hotspots: [] }, 
          { id: "room4", displayName: "Toilet", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.598, y: 0.39, hotspots: [] }, 
          { id: "room5", displayName: "Bedroom", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, x: 0.763, y: 0.543, hotspots: [] } 
        ] }] } },

        // 7B 1, Ground
        "107B01": { id: "107B01", bedrooms: 3, bathrooms: 3, area: 249.9, serviceRooms: [], gallery: [...gallery3, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B01", src: `/${projectPath}/images/floorplans/107B01.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ 
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, x: 0.536, y: 0.439, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, x: 0.536, y: 0.727, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, x: 0.46, y: 0.766, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.677, y: 0.753, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, x: 0.446, y: 0.875, hotspots: [] }, 
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.329, y: 0.64, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b06_unf.jpg`, x: 0.358, y: 0.491, hotspots: [] }, 
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b08_unf.jpg`, x: 0.63, y: 0.452, hotspots: [] }, 
          { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b07_unf.jpg`, x: 0.336, y: 0.779, hotspots: [] } 
        ] }] } },

        "107B02": { id: "107B02", bedrooms: 3, bathrooms: 3, area: 207.2, serviceRooms: [], gallery: [...gallery1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B02", src: `/${projectPath}/images/floorplans/107B02.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ 
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l05_unf.jpg`, x: 0.367, y: 0.548, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d05_unf.jpg`, x: 0.534, y: 0.548, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k05_unf.jpg`, x: 0.534, y: 0.743, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.698, y: 0.288, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, x: 0.671, y: 0.535, hotspots: [] }, 
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.622, y: 0.288, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b09_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b09_unf.jpg`, x: 0.423, y: 0.362, hotspots: [] }, 
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b10_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b10_unf.jpg`, x: 0.765, y: 0.288, hotspots: [] } 
        ] }] } },

        "107B03": { id: "107B03", bedrooms: 3, bathrooms: 3, area: 249, serviceRooms: [], gallery: [...gallery2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B03", src: `/${projectPath}/images/floorplans/107B03.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [ 
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, x: 0.465, y: 0.405, hotspots: [] }, 
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, x: 0.457, y: 0.666, hotspots: [] }, 
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, x: 0.527, y: 0.705, hotspots: [] }, 
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.64, y: 0.621, hotspots: [] }, 
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, x: 0.541, y: 0.828, hotspots: [] }, 
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.33, y: 0.692, hotspots: [] }, 
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b08_unf.jpg`, x: 0.37, y: 0.431, hotspots: [] }, 
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b11_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b11_unf.jpg`, x: 0.613, y: 0.456, hotspots: [] }, 
          { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b12_unf.jpg`, x: 0.613, y: 0.744, hotspots: [] } 
        ] }] } },

        // 7B 1, Floor 1
        "107B11": { id: "107B11", bedrooms: 3, bathrooms: 3, area: 249.9, serviceRooms: [], gallery: [...gallery3, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B11", src: `/${projectPath}/images/floorplans/107B11.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, x: 0.536, y: 0.426, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, x: 0.544, y: 0.727, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, x: 0.46, y: 0.727, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.671, y: 0.727, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, x: 0.453, y: 0.856, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.329, y: 0.622, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b06_unf.jpg`, x: 0.37, y: 0.465, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b08_unf.jpg`, x: 0.63, y: 0.439, hotspots: [] },
          { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b07_unf.jpg`, x: 0.336, y: 0.753, hotspots: [] }
        ] }] } },
        "107B12": { id: "107B12", bedrooms: 3, bathrooms: 3, area: 207.2, serviceRooms: [], gallery: [...gallery1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B12", src: `/${projectPath}/images/floorplans/107B12.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l05_unf.jpg`, x: 0.36, y: 0.548, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d05_unf.jpg`, x: 0.527, y: 0.548, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k05_unf.jpg`, x: 0.527, y: 0.731, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.691, y: 0.288, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, x: 0.664, y: 0.535, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.615, y: 0.288, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b09_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b09_unf.jpg`, x: 0.421, y: 0.361, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b10_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b10_unf.jpg`, x: 0.758, y: 0.288, hotspots: [] }
        ] }] } },
        "107B13": { id: "107B13", bedrooms: 3, bathrooms: 3, area: 249, serviceRooms: [], gallery: [...gallery2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B13", src: `/${projectPath}/images/floorplans/107B13.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, x: 0.468, y: 0.406, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, x: 0.454, y: 0.649, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, x: 0.539, y: 0.719, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.653, y: 0.623, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, x: 0.553, y: 0.839, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.332, y: 0.706, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b08_unf.jpg`, x: 0.373, y: 0.419, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b11_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b11_unf.jpg`, x: 0.625, y: 0.458, hotspots: [] },
          { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b12_unf.jpg`, x: 0.638, y: 0.754, hotspots: [] }
        ] }] } },
        // 7B 1, Floor 2
        "107B21": { id: "107B21", bedrooms: 3, bathrooms: 3, area: 213, serviceRooms: [], gallery: [...gallery3, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B21", src: `/${projectPath}/images/floorplans/107B21.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, x: 0.534, y: 0.419, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, x: 0.548, y: 0.681, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, x: 0.466, y: 0.719, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.677, y: 0.706, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, x: 0.446, y: 0.849, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.32, y: 0.597, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.361, y: 0.432, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b08_unf.jpg`, x: 0.638, y: 0.432, hotspots: [] },
          { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b07_unf.jpg`, x: 0.328, y: 0.732, hotspots: [] }
        ] }] } },
        "107B22": { id: "107B22", bedrooms: 3, bathrooms: 3, area: 180.6, serviceRooms: [], gallery: [...gallery1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B22", src: `/${projectPath}/images/floorplans/107B22.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, x: 0.371, y: 0.57, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, x: 0.515, y: 0.557, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, x: 0.547, y: 0.739, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.575, y: 0.283, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, x: 0.628, y: 0.531, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.664, y: 0.283, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b09_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b09_unf.jpg`, x: 0.378, y: 0.366, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b10_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b10_unf.jpg`, x: 0.727, y: 0.283, hotspots: [] }
        ] }] } },
        "107B23": { id: "107B23", bedrooms: 3, bathrooms: 3, area: 211.9, serviceRooms: [], gallery: [...gallery2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B23", src: `/${projectPath}/images/floorplans/107B23.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, x: 0.468, y: 0.406, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, x: 0.454, y: 0.649, hotspots: [] },
          { id: "room3", displayName: "Kitchen", furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, x: 0.539, y: 0.719, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.653, y: 0.623, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, x: 0.553, y: 0.839, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, x: 0.332, y: 0.706, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b08_unf.jpg`, x: 0.373, y: 0.419, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.625, y: 0.458, hotspots: [] },
          { id: "room9", displayName: "Bedroom 3", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b12_unf.jpg`, x: 0.638, y: 0.754, hotspots: [] }
        ] }] } },
        // 7B 1, Floor 3
        "107B31": { id: "107B31", bedrooms: 2, bathrooms: 3, area: 173.7, serviceRooms: [], gallery: [...penta2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B31", src: `/${projectPath}/images/floorplans/107B31.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l13_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l13_unf.jpg`, x: 0.564, y: 0.326, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d13_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d13_unf.jpg`, x: 0.64, y: 0.565, hotspots: [] },
          { id: "room3", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.308, y: 0.469, hotspots: [] },
          { id: "room4", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t06_unf.jpg`, x: 0.522, y: 0.735, hotspots: [] },
          { id: "room5", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.447, y: 0.735, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b17_unf.jpg`, x: 0.355, y: 0.259, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, x: 0.316, y: 0.644, hotspots: [] }
        ] }] } },
        "107B32": { id: "107B32", bedrooms: 2, bathrooms: 3, area: 173.7, serviceRooms: [], gallery: [...penta1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B32", src: `/${projectPath}/images/floorplans/107B32.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", furnitureImgId: `/${projectPath}/panorama/Living/f/l05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l05_unf.jpg`, x: 0.439, y: 0.298, hotspots: [] },
          { id: "room2", displayName: "Dining", furnitureImgId: `/${projectPath}/panorama/Dining/f/d05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d05_unf.jpg`, x: 0.37, y: 0.569, hotspots: [] },
          { id: "room3", displayName: "Toilet 1", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.702, y: 0.487, hotspots: [] },
          { id: "room4", displayName: "Toilet 2", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t06_unf.jpg`, x: 0.482, y: 0.74, hotspots: [] },
          { id: "room5", displayName: "Toilet 3", furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, x: 0.564, y: 0.74, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b21_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b21_unf.jpg`, x: 0.652, y: 0.714, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b17_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b17_unf.jpg`, x: 0.652, y: 0.259, hotspots: [] }
        ] }] } },

        // 7B 2, Basement
        "107BC09": { id: "107BC09", bedrooms: 2, bathrooms: 1, area: 113.2, serviceRooms: [], gallery: [...gallery1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC09", src: `/${projectPath}/images/floorplans/107BC09.jpg` }], paymentPlans: [], interior: { levels: [{ id: "basement", rooms: [
          { id: "room1", displayName: "Living", x: 0.773, y: 0.444, furnitureImgId: `/${projectPath}/panorama/Living/f/l12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l12_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.597, y: 0.444, furnitureImgId: `/${projectPath}/panorama/Dining/f/d12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d12_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.544, y: 0.581, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k12_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet", x: 0.47, y: 0.581, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom 1", x: 0.327, y: 0.581, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b03_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 2", x: 0.247, y: 0.543, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, hotspots: [] }
        ] }] } },
        "107BC10": { id: "107BC10", bedrooms: 2, bathrooms: 1, area: 100.5, serviceRooms: [], gallery: [...gallery2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC10", src: `/${projectPath}/images/floorplans/107BC10.jpg` }], paymentPlans: [], interior: { levels: [{ id: "basement", rooms: [
          { id: "room1", displayName: "Living", x: 0.736, y: 0.569, furnitureImgId: `/${projectPath}/panorama/Living/f/l01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l01_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.651, y: 0.665, furnitureImgId: `/${projectPath}/panorama/Dining/f/d01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d01_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.521, y: 0.569, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k01_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet", x: 0.398, y: 0.384, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.255, y: 0.41, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, hotspots: [] }
        ] }] } },
        "107BC11": { id: "107BC11", bedrooms: 2, bathrooms: 1, area: 78, serviceRooms: [], gallery: [...gallery3, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC11", src: `/${projectPath}/images/floorplans/107BC11.jpg` }], paymentPlans: [], interior: { levels: [{ id: "basement", rooms: [
          { id: "room1", displayName: "Living", x: 0.697, y: 0.401, furnitureImgId: `/${projectPath}/panorama/Living/f/l03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l03_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.5, y: 0.344, furnitureImgId: `/${projectPath}/panorama/Dining/f/d03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d03_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.433, y: 0.601, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k03_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet", x: 0.532, y: 0.785, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.285, y: 0.453, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b02_unf.jpg`, hotspots: [] }
        ] }] } },
        "107BC12": { id: "107BC12", bedrooms: 2, bathrooms: 2, area: 115.5, serviceRooms: [], gallery: [...gallery1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC12", src: `/${projectPath}/images/floorplans/107BC12.jpg` }], paymentPlans: [], interior: { levels: [{ id: "basement", rooms: [
          { id: "room1", displayName: "Living", x: 0.605, y: 0.535, furnitureImgId: `/${projectPath}/panorama/Living/f/l11_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l11_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.456, y: 0.548, furnitureImgId: `/${projectPath}/panorama/Dining/f/d11_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d11_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.464, y: 0.762, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k11_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k11_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.366, y: 0.587, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.366, y: 0.436, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", x: 0.415, y: 0.232, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b03_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", x: 0.574, y: 0.394, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, hotspots: [] }
        ] }] } },
        "107BC13": { id: "107BC13", bedrooms: 2, bathrooms: 1, area: 88.9, serviceRooms: [], gallery: [...gallery2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107BC13", src: `/${projectPath}/images/floorplans/107BC13.jpg` }], paymentPlans: [], interior: { levels: [{ id: "basement", rooms: [
          { id: "room1", displayName: "Living", x: 0.583, y: 0.372, furnitureImgId: `/${projectPath}/panorama/Living/f/l10_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l10_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.549, y: 0.569, furnitureImgId: `/${projectPath}/panorama/Dining/f/d10_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d10_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.683, y: 0.702, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k10_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k10_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet", x: 0.456, y: 0.333, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.366, y: 0.359, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, hotspots: [] }
        ] }] } },

        // 7B 2, Ground
        "107B04": { id: "107B04", bedrooms: 1, bathrooms: 1, area: 109.8, serviceRooms: [], gallery: [...gallery3, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B04", src: `/${projectPath}/images/floorplans/107B04.jpg` }], paymentPlans: [], interior: { levels: [{ id: "ground", rooms: [
          { id: "room1", displayName: "Living", x: 0.599, y: 0.422, furnitureImgId: `/${projectPath}/panorama/Living/f/l12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l12_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.426, y: 0.422, furnitureImgId: `/${projectPath}/panorama/Dining/f/d12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d12_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.426, y: 0.559, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k12_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet", x: 0.345, y: 0.533, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.247, y: 0.533, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, hotspots: [] }
        ] }] } },
        "107B05": { id: "107B05", bedrooms: 2, bathrooms: 2, area: 162.4, serviceRooms: [], gallery: [...gallery1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B05", src: `/${projectPath}/images/floorplans/107B05.jpg` }], paymentPlans: [], interior: { levels: [{ id: "ground", rooms: [
          { id: "room1", displayName: "Living", x: 0.554, y: 0.575, furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.364, y: 0.575, furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.349, y: 0.802, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.238, y: 0.75, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t06_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.443, y: 0.291, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", x: 0.311, y: 0.353, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b15_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b15_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", x: 0.58, y: 0.366, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b06_unf.jpg`, hotspots: [] }
        ] }] } },
        "107B06": { id: "107B06", bedrooms: 2, bathrooms: 3, area: 211.4, serviceRooms: [], gallery: [...gallery2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B06", src: `/${projectPath}/images/floorplans/107B06.jpg` }], paymentPlans: [], interior: { levels: [{ id: "ground", rooms: [
          { id: "room1", displayName: "Living", x: 0.612, y: 0.584, furnitureImgId: `/${projectPath}/panorama/Living/f/l05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l05_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.475, y: 0.584, furnitureImgId: `/${projectPath}/panorama/Dining/f/d05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d05_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.475, y: 0.77, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k05_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.329, y: 0.558, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.314, y: 0.309, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.386, y: 0.309, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.597, y: 0.296, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b09_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b09_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.242, y: 0.309, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b13_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b13_unf.jpg`, hotspots: [] }
        ] }] } },

        // 7B 2, Floor1
        "107B14": { id: "107B14", bedrooms: 1, bathrooms: 1, area: 109.8, serviceRooms: [], gallery: [...gallery3, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B14", src: `/${projectPath}/images/floorplans/107B14.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor1", rooms: [
          { id: "room1", displayName: "Living", x: 0.599, y: 0.422, furnitureImgId: `/${projectPath}/panorama/Living/f/l12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l12_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.426, y: 0.422, furnitureImgId: `/${projectPath}/panorama/Dining/f/d12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d12_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.426, y: 0.559, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k12_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet", x: 0.345, y: 0.533, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.247, y: 0.533, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, hotspots: [] }
        ] }] } },
        "107B15": { id: "107B15", bedrooms: 2, bathrooms: 2, area: 162.4, serviceRooms: [], gallery: [...gallery1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B15", src: `/${projectPath}/images/floorplans/107B15.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor1", rooms: [
          { id: "room1", displayName: "Living", x: 0.554, y: 0.575, furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.364, y: 0.575, furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.349, y: 0.802, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.238, y: 0.75, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t06_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.443, y: 0.291, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", x: 0.311, y: 0.353, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b15_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b15_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", x: 0.58, y: 0.366, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b06_unf.jpg`, hotspots: [] }
        ] }] } },
        "107B16": { id: "107B16", bedrooms: 2, bathrooms: 3, area: 212.1, serviceRooms: [], gallery: [...gallery2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B16", src: `/${projectPath}/images/floorplans/107B16.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor1", rooms: [
          { id: "room1", displayName: "Living", x: 0.614, y: 0.596, furnitureImgId: `/${projectPath}/panorama/Living/f/l05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l05_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.482, y: 0.57, furnitureImgId: `/${projectPath}/panorama/Dining/f/d05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d05_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.475, y: 0.742, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k05_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.343, y: 0.557, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.329, y: 0.334, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.401, y: 0.334, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.593, y: 0.321, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b09_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b09_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.257, y: 0.321, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b13_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b13_unf.jpg`, hotspots: [] }
        ] }] } },

        // 7B 2 - Floor2
        "107B24": { id: "107B24", bedrooms: 3, bathrooms: 3, area: 208.5, serviceRooms: [], gallery: [...gallery3, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B24", src: `/${projectPath}/images/floorplans/107B24.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor2", rooms: [
          { id: "room1", displayName: "Living", x: 0.528, y: 0.394, furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.415, y: 0.394, furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.4, y: 0.572, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.407, y: 0.222, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.457, y: 0.8, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t07_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.333, y: 0.559, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t06_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.376, y: 0.774, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b12_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b12_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.557, y: 0.248, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b08_unf.jpg`, hotspots: [] },
          { id: "room9", displayName: "Bedroom 3", x: 0.542, y: 0.761, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, hotspots: [] }
        ] }] } },
        "107B25": { id: "107B25", bedrooms: 2, bathrooms: 2, area: 180.8, serviceRooms: [], gallery: [...gallery1, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B25", src: `/${projectPath}/images/floorplans/107B25.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor2", rooms: [
          { id: "room1", displayName: "Living", x: 0.586, y: 0.559, furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.454, y: 0.546, furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.442, y: 0.705, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.361, y: 0.324, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.427, y: 0.324, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", x: 0.307, y: 0.324, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b13_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b13_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", x: 0.596, y: 0.324, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b16_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b16_unf.jpg`, hotspots: [] }
        ] }] } },

        // 7B 2 - Floor 3 
        "107B33": { id: "107B33", bedrooms: 2, bathrooms: 3, area: 173.8, serviceRooms: [], gallery: [...penta2, ...gallery_7B], cutSections: [], floorPlans: [{ id: "107B33", src: `/${projectPath}/images/floorplans/107B33.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor3", rooms: [
          { id: "room1", displayName: "Living", x: 0.619, y: 0.357, furnitureImgId: `/${projectPath}/panorama/Living/f/l13_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l13_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.57, y: 0.53, furnitureImgId: `/${projectPath}/panorama/Dining/f/d13_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d13_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.513, y: 0.543, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k13_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k13_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.648, y: 0.627, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t06_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.691, y: 0.627, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.794, y: 0.458, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t07_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.752, y: 0.331, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b19_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b19_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.78, y: 0.556, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b18_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b18_unf.jpg`, hotspots: [] }
        ] }] } },

        // 7C - Ground
        "107C01": { id: "107C01", bedrooms: 2, bathrooms: 3, area: 192.4, serviceRooms: [], gallery: [...gallery2, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C01", src: `/${projectPath}/images/floorplans/107C01.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.553, y: 0.259, furnitureImgId: `/${projectPath}/panorama/Living/f/l08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l08_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.426, y: 0.259, furnitureImgId: `/${projectPath}/panorama/Dining/f/d08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d08_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.36, y: 0.461, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k08_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.252, y: 0.349, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.281, y: 0.559, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.418, y: 0.744, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t03_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.531, y: 0.666, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b20_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b20_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.319, y: 0.744, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b21_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b21_unf.jpg`, hotspots: [] }
        ] }] } },
        "107C02": { id: "107C02", bedrooms: 1, bathrooms: 1, area: 107.4, serviceRooms: [], gallery: [...gallery3, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C02", src: `/${projectPath}/images/floorplans/107C02.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.616, y: 0.439, furnitureImgId: `/${projectPath}/panorama/Living/f/l05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l05_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.539, y: 0.439, furnitureImgId: `/${projectPath}/panorama/Dining/f/d08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d08_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.481, y: 0.596, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k05_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet", x: 0.384, y: 0.556, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.26, y: 0.5, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, hotspots: [] }
        ] }] } },
        "107C03": { id: "107C03", bedrooms: 2, bathrooms: 3, area: 158.8, serviceRooms: [], gallery: [...gallery1, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C03", src: `/${projectPath}/images/floorplans/107C03.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.593, y: 0.739, furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.46, y: 0.803, furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.373, y: 0.564, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.289, y: 0.657, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.296, y: 0.473, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t09_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t09_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.432, y: 0.252, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t02_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.303, y: 0.308, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b21_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b21_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.622, y: 0.362, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b20_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b20_unf.jpg`, hotspots: [] }
        ] }] } },
        "107C04": { id: "107C04", bedrooms: 2, bathrooms: 3, area: 193.6, serviceRooms: [], gallery: [...gallery2, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C04", src: `/${projectPath}/images/floorplans/107C04.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.557, y: 0.739, furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.391, y: 0.752, furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.365, y: 0.563, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.282, y: 0.455, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.253, y: 0.671, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.424, y: 0.304, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t02_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.289, y: 0.317, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b21_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b21_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.53, y: 0.363, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b20_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b20_unf.jpg`, hotspots: [] }
        ] }] } },
        // 7A - Floor 1
        "107C11": { id: "107C11", bedrooms: 2, bathrooms: 3, area: 192.4, serviceRooms: [], gallery: [...gallery3, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C11", src: `/${projectPath}/images/floorplans/107C11.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.553, y: 0.259, furnitureImgId: `/${projectPath}/panorama/Living/f/l08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l08_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.426, y: 0.259, furnitureImgId: `/${projectPath}/panorama/Dining/f/d08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d08_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.36, y: 0.461, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k08_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.252, y: 0.349, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.281, y: 0.559, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.418, y: 0.785, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t03_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.531, y: 0.656, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b20_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b20_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.319, y: 0.744, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b21_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b21_unf.jpg`, hotspots: [] }
        ] }] } },
        "107C12": { id: "107C12", bedrooms: 1, bathrooms: 1, area: 107.4, serviceRooms: [], gallery: [...gallery1, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C12", src: `/${projectPath}/images/floorplans/107C12.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.616, y: 0.439, furnitureImgId: `/${projectPath}/panorama/Living/f/l05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l05_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.539, y: 0.439, furnitureImgId: `/${projectPath}/panorama/Dining/f/d08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d08_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.481, y: 0.596, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k05_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet", x: 0.384, y: 0.556, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t01_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.254, y: 0.487, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b05_unf.jpg`, hotspots: [] }
        ] }] } },
        "107C13": { id: "107C13", bedrooms: 2, bathrooms: 3, area: 158.8, serviceRooms: [], gallery: [...gallery2, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C13", src: `/${projectPath}/images/floorplans/107C13.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.593, y: 0.739, furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.46, y: 0.803, furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.373, y: 0.564, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.289, y: 0.657, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.296, y: 0.473, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t09_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t09_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.432, y: 0.252, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t02_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.303, y: 0.308, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b21_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b21_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.622, y: 0.362, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b20_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b20_unf.jpg`, hotspots: [] }
        ] }] } },
        "107C14": { id: "107C14", bedrooms: 2, bathrooms: 3, area: 193.6, serviceRooms: [], gallery: [...gallery3, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C14", src: `/${projectPath}/images/floorplans/107C14.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.557, y: 0.739, furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.391, y: 0.752, furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.365, y: 0.563, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.282, y: 0.455, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.253, y: 0.671, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.424, y: 0.304, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t02_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t02_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.289, y: 0.317, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b21_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b21_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.53, y: 0.363, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b20_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b20_unf.jpg`, hotspots: [] }
        ] }] } },
        // 7A - Floor 2
        "107C21": { id: "107C21", bedrooms: 2, bathrooms: 3, area: 158.2, serviceRooms: [], gallery: [...gallery1, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C21", src: `/${projectPath}/images/floorplans/107C21.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.557, y: 0.289, furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.381, y: 0.263, furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.358, y: 0.45, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.25, y: 0.331, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.282, y: 0.563, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.413, y: 0.769, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t03_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.334, y: 0.743, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b21_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b21_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.53, y: 0.645, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b20_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b20_unf.jpg`, hotspots: [] }
        ] }] } },
        "107C22": { id: "107C22", bedrooms: 2, bathrooms: 2, area: 168.1, serviceRooms: [], gallery: [...gallery2, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C22", src: `/${projectPath}/images/floorplans/107C22.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.681, y: 0.411, furnitureImgId: `/${projectPath}/panorama/Living/f/l07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l07_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.508, y: 0.487, furnitureImgId: `/${projectPath}/panorama/Dining/f/d07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d07_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.406, y: 0.424, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k07_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k07_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.333, y: 0.474, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.485, y: 0.717, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Bedroom 1", x: 0.381, y: 0.743, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 2", x: 0.655, y: 0.641, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b22_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b22_unf.jpg`, hotspots: [] }
        ] }] } },
        "107C23": { id: "107C23", bedrooms: 1, bathrooms: 1, area: 79.7, serviceRooms: [], gallery: [...gallery3, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C23", src: `/${projectPath}/images/floorplans/107C23.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.62, y: 0.291, furnitureImgId: `/${projectPath}/panorama/Living/f/l08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l08_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.47, y: 0.513, furnitureImgId: `/${projectPath}/panorama/Dining/f/d08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d08_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.456, y: 0.25, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k08_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet", x: 0.236, y: 0.608, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Bedroom", x: 0.25, y: 0.437, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b01_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b01_unf.jpg`, hotspots: [] }
        ] }] } },
        "107C24": { id: "107C24", bedrooms: 2, bathrooms: 3, area: 158.9, serviceRooms: [], gallery: [...gallery1, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C24", src: `/${projectPath}/images/floorplans/107C24.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.554, y: 0.55, furnitureImgId: `/${projectPath}/panorama/Living/f/l06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l06_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.443, y: 0.754, furnitureImgId: `/${projectPath}/panorama/Dining/f/d06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d06_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.398, y: 0.55, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k06_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.47, y: 0.295, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t10_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t10_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.327, y: 0.471, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t08_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t08_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.306, y: 0.681, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t05_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t05_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Bedroom 1", x: 0.334, y: 0.321, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b21_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b21_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 2", x: 0.577, y: 0.357, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b20_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b20_unf.jpg`, hotspots: [] }
        ] }] } },
        // 7A - Floor 3
        "107C31": { id: "107C31", bedrooms: 3, bathrooms: 4, area: 221.8, serviceRooms: [], gallery: [...penta1, ...gallery_7C], cutSections: [], floorPlans: [{ id: "107C31", src: `/${projectPath}/images/floorplans/107C31.jpg` }], paymentPlans: [], interior: { levels: [{ id: "floor", rooms: [
          { id: "room1", displayName: "Living", x: 0.72, y: 0.669, furnitureImgId: `/${projectPath}/panorama/Living/f/l09_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Living/unf/l09_unf.jpg`, hotspots: [] },
          { id: "room2", displayName: "Dining", x: 0.652, y: 0.5, furnitureImgId: `/${projectPath}/panorama/Dining/f/d09_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Dining/unf/d09_unf.jpg`, hotspots: [] },
          { id: "room3", displayName: "Kitchen", x: 0.705, y: 0.344, furnitureImgId: `/${projectPath}/panorama/Kitchen/f/k09_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Kitchen/unf/k09_unf.jpg`, hotspots: [] },
          { id: "room4", displayName: "Toilet 1", x: 0.563, y: 0.537, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t03_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t03_unf.jpg`, hotspots: [] },
          { id: "room5", displayName: "Toilet 2", x: 0.304, y: 0.424, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t04_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t04_unf.jpg`, hotspots: [] },
          { id: "room6", displayName: "Toilet 3", x: 0.493, y: 0.208, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t06_unf.jpg`, hotspots: [] },
          { id: "room7", displayName: "Toilet 4", x: 0.421, y: 0.221, furnitureImgId: `/${projectPath}/panorama/Toilet/f/t06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Toilet/unf/t06_unf.jpg`, hotspots: [] },
          { id: "room8", displayName: "Bedroom 1", x: 0.311, y: 0.302, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b24_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b24_unf.jpg`, hotspots: [] },
          { id: "room9", displayName: "Bedroom 2", x: 0.35, y: 0.619, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b06_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b06_unf.jpg`, hotspots: [] },
          { id: "room10", displayName: "Bedroom 3", x: 0.5, y: 0.619, furnitureImgId: `/${projectPath}/panorama/Bedroom/f/b23_f.jpg`, unfurnitureImgId: `/${projectPath}/panorama/Bedroom/unf/b23_unf.jpg`, hotspots: [] }
        ] }] } },
      },
    },
  ],
};