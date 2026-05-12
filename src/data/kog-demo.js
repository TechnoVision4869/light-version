import TECHNO_LOGO from '/default-logo.png';
import DEMO_BACKGROUND from '../assets/images/background.jpg';
import KS_THUMBNAIL from '../assets/images/ks-thumbnail.png';
import KOG_THUMBNAIL from '../assets/images/kog-thumbnail.png';
import B_THUMBNAIL from '../assets/images/b-thumbnail.png';

import VILLA_ICON from '../assets/icons/villa.svg';
import AIRPORT_ICON from '../assets/icons/airport.svg';
import MALL_ICON from '../assets/icons/mall.svg';
import CITY_ICON from '../assets/icons/city.svg';

// Townhouse views
// SAGE FAMILY
const sage_family_videos = {
    forwardVideo: "/kog/videos/zones/zone1/sagefamily/zone1_sagefamily_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone1/sagefamily/zone1_sagefamily_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone1/sagefamily/views/view1/zone1_sagefamily_view1_idle.mp4",
};
const sage_family_views = [
    {
        name: "view 1",
        videos: {
            forwardVideo: "kog/videos/zones/zone1/sagefamily/views/view1/zone1_sagefamily_view1_trans.mp4",
            reverseVideo: "kog/videos/zones/zone1/sagefamily/views/view1/zone1_sagefamily_view1_rev.mp4",
            idleVideo: "kog/videos/zones/zone1/sagefamily/views/view1/zone1_sagefamily_view1_idle.mp4",
        }
    },
    {
        name: "view 2",
        videos: {
            forwardVideo: "kog/videos/zones/zone1/sagefamily/views/view2/zone1_sagefamily_view2_trans.mp4",
            reverseVideo: "kog/videos/zones/zone1/sagefamily/views/view2/zone1_sagefamily_view2_rev.mp4",
            idleVideo: "kog/videos/zones/zone1/sagefamily/views/view2/zone1_sagefamily_view2_idle.mp4",
        }
    },
    {
        name: "view 3",
        videos: {
            forwardVideo: "kog/videos/zones/zone1/sagefamily/views/view3/zone1_sagefamily_view3_trans.mp4",
            reverseVideo: "kog/videos/zones/zone1/sagefamily/views/view3/zone1_sagefamily_view3_rev.mp4",
            idleVideo: "kog/videos/zones/zone1/sagefamily/views/view3/zone1_sagefamily_view3_idle.mp4",
        }
    },
    {
        name: "view 4",
        videos: {
            forwardVideo: "kog/videos/zones/zone1/sagefamily/views/view4/zone1_sagefamily_view4_trans.mp4",
            reverseVideo: "kog/videos/zones/zone1/sagefamily/views/view4/zone1_sagefamily_view4_rev.mp4",
            idleVideo: "kog/videos/zones/zone1/sagefamily/views/view4/zone1_sagefamily_view4_idle.mp4",
        }
    },
    {
        name: "view 5",
        videos: {
            forwardVideo: "kog/videos/zones/zone1/sagefamily/views/view5/zone1_sagefamily_view5_trans.mp4",
            reverseVideo: "kog/videos/zones/zone1/sagefamily/views/view5/zone1_sagefamily_view5_rev.mp4",
            idleVideo: "kog/videos/zones/zone1/sagefamily/views/view5/zone1_sagefamily_view5_idle.mp4",
        }
    },
];
const sagefamily_location = "kog/panorama/location/SageFamily.jpg"
const sage_family_units_videos = [
    {
        forwardVideo: "kog/videos/zones/zone1/sagefamily/1/zone1_sagefamily_1_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone1/sagefamily/1/zone1_sagefamily_1_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone1/sagefamily/1/zone1_sagefamily_1_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone1/sagefamily/2/zone1_sagefamily_2_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone1/sagefamily/2/zone1_sagefamily_2_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone1/sagefamily/2/zone1_sagefamily_2_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone1/sagefamily/3/zone1_sagefamily_3_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone1/sagefamily/3/zone1_sagefamily_3_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone1/sagefamily/3/zone1_sagefamily_3_gen_idle.mp4",
    },
];
const sage_family_units = [
    {
        id: "SageFamily-1-unit1",
        displayName: "Sage Family U1",
        unitTypeId: "family_corner",
        price: 950000,
        area: 167,
        bedrooms: 3, bathrooms: 4,
        balconyView: sagefamily_location,
        x: 0.2, y: 0.36,
        videos: sage_family_units_videos[0],
    },
    {
        id: "SageFamily-1-unit2",
        displayName: "Sage Family U2",
        unitTypeId: "family_midd",
        price: 950000,
        area: 325,
        bedrooms: 4, bathrooms: 5,
        balconyView: sagefamily_location,
        x: 0.6, y: 0.31,
        videos: sage_family_units_videos[1],
    },
    {
        id: "SageFamily-1-unit3",
        displayName: "Sage Family U3",
        unitTypeId: "family_corner",
        price: 950000,
        area: 167,
        bedrooms: 3, bathrooms: 4,
        balconyView: sagefamily_location,
        x: 0.84, y: 0.4,
        videos: sage_family_units_videos[2],
    },
];

// MEADOWS
const meadows_2_videos = {
    forwardVideo: "/kog/videos/zones/zone5/meadows/zone5_meadows_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone5/meadows/zone5_meadows_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone4/meadows/views/view1/zone4_meadows_view1_idle.mp4",
};
const meadows_views = [
    {
        name: "view 1",
        videos: {
            forwardVideo: "kog/videos/zones/zone4/meadows/views/view1/zone4_meadows_view1_trans.mp4",
            reverseVideo: "kog/videos/zones/zone4/meadows/views/view1/zone4_meadows_view1_rev.mp4",
            idleVideo: "kog/videos/zones/zone4/meadows/views/view1/zone4_meadows_view1_idle.mp4",
        }
    },
    {
        name: "view 2",
        videos: {
            forwardVideo: "kog/videos/zones/zone4/meadows/views/view2/zone4_meadows_view2_trans.mp4",
            reverseVideo: "kog/videos/zones/zone4/meadows/views/view2/zone4_meadows_view2_rev.mp4",
            idleVideo: "kog/videos/zones/zone4/meadows/views/view2/zone4_meadows_view2_idle.mp4",
        }
    },
    {
        name: "view 3",
        videos: {
            forwardVideo: "kog/videos/zones/zone4/meadows/views/view3/zone4_meadows_view3_trans.mp4",
            reverseVideo: "kog/videos/zones/zone4/meadows/views/view3/zone4_meadows_view3_rev.mp4",
            idleVideo: "kog/videos/zones/zone4/meadows/views/view3/zone4_meadows_view3_idle.mp4",
        }
    },
    {
        name: "view 4",
        videos: {
            forwardVideo: "kog/videos/zones/zone4/meadows/views/view4/zone4_meadows_view4_trans.mp4",
            reverseVideo: "kog/videos/zones/zone4/meadows/views/view4/zone4_meadows_view4_rev.mp4",
            idleVideo: "kog/videos/zones/zone4/meadows/views/view4/zone4_meadows_view4_idle.mp4",
        }
    },
    {
        name: "view 5",
        videos: {
            forwardVideo: "kog/videos/zones/zone4/meadows/views/view5/zone4_meadows_view5_trans.mp4",
            reverseVideo: "kog/videos/zones/zone4/meadows/views/view5/zone4_meadows_view5_rev.mp4",
            idleVideo: "kog/videos/zones/zone4/meadows/views/view5/zone4_meadows_view5_idle.mp4",
        }
    },
];
const meadows_units_videos = [
    {
        forwardVideo: "kog/videos/zones/zone4/meadows/1/zone4_meadows_1_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone4/meadows/1/zone4_meadows_1_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone4/meadows/1/zone4_meadows_1_gen_idle.mp4"
    },
    {
        forwardVideo: "kog/videos/zones/zone4/meadows/2/zone4_meadows_2_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone4/meadows/2/zone4_meadows_2_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone4/meadows/2/zone4_meadows_2_gen_idle.mp4"
    }
];
const meadows2_location = "kog/panorama/location/Meadows2.jpg"

export const DEVELOPER_TECHNO = {
    developerId: "TECHNO",
    developerLogo: TECHNO_LOGO,
    backgroundImage: DEMO_BACKGROUND,
    developerProjects: [
        {
            id: "ks",
            name: "Emerald Heights",
            thumbnail: KS_THUMBNAIL,
            description: "Emerald Heights is a residential compound located in New Giza, offering a selection of elegant villas and townhouses. The project is crafted to provide residents with a peaceful and upscale lifestyle, surrounded by lush landscapes and premium amenities.",
            introVideo: null,
            idleVideo: null,
            zoomoutVideo: null,
        },

        {
            id: "kog",
            name: "Palm Oasis",
            thumbnail: KOG_THUMBNAIL,
            description: "Palm Oasis is a residential compound located in New Giza, featuring a variety of luxurious villas and townhouses. The project is designed to offer residents a tranquil and refined living environment, set amidst verdant greenery and modern facilities.",
            introVideo: "/kog/videos/home/intro.mp4",
            idleVideo: "/kog/videos/home/home_idle.mp4",
            zoomoutVideo: "/kog/videos/home/home_out.mp4",

            surroundings: {
                id: "surroundings",
                displayName: "Surroundings",
                zoomoutVideo: "/kog/videos/surroundings/surr_out.mp4",
                videos: {
                    forwardVideo: "/kog/videos/surroundings/surr_gen_trans_from_home.mp4",
                    reverseVideo: "/kog/videos/surroundings/surr_gen_rev_trans_to_home.mp4",
                    idleVideo: "/kog/videos/surroundings/surr_gen_idle.mp4",
                },
                items: [
                    {
                        id: "surrounding2",
                        displayName: "Wadi Elnakheel",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.5, y: 0.17,
                        svgPath: null,
                        nameDirection: "left",
                    },
                    {
                        id: "surrounding4",
                        displayName: "Sphinx Int. Airport",
                        iconSrc: AIRPORT_ICON,
                        thumbnail: null,
                        distance: "5 min",
                        description: null,
                        x: 0.61, y: 0.33,
                        svgPath: null,
                        nameDirection: "right",
                    },
                    {
                        id: "surrounding11",
                        displayName: "Belle Vie Emmar",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.65, y: 0.6,
                        svgPath: null,
                        nameDirection: "right",
                    },
                    {
                        id: "surrounding12",
                        displayName: "Beverly Hills Zayed",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.73, y: 0.4,
                        svgPath: null,
                        nameDirection: "left",
                    },
                    {
                        id: "surrounding15",
                        displayName: "Mall Of Arabia",
                        iconSrc: MALL_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.81, y: 0.85,
                        svgPath: null,
                        nameDirection: "left",
                    },
                ],
            },

            amenities: {
                id: "amenities",
                displayName: "Amenities",
                zoomoutVideo: "/kog/videos/amenities/amenities_out.mp4",
                videos: {
                    forwardVideo: "/kog/videos/amenities/amenities_gen_trans_from_home.mp4",
                    reverseVideo: "/kog/videos/amenities/amenities_gen_rev_trans_to_home.mp4",
                    idleVideo: "/kog/videos/amenities/amenities_gen_idle.mp4",
                },
                items: [
                    {
                        id: "amenity1",
                        displayName: "Fitness",
                        subtitle: "Gym & Training",
                        thumbnail: "kog/thumbnails/amenities/amenity1.jpg",
                        description: "A luxurious clubhouse with a lounge, restaurant, and dedicated kids' area.",
                        x: 0.47, y: 0.55,
                        videos: {
                            forwardVideo: "/kog/videos/amenities/amenity1/amenity1_trans.mp4",
                            reverseVideo: "/kog/videos/amenities/amenity1/amenity1_rev.mp4",
                            idleVideo: "/kog/videos/amenities/amenity1/amenity1_idle.mp4",
                        },
                    },
                    {
                        id: "amenity2",
                        displayName: "1 KM Lake",
                        subtitle: "Waterfront Promenade",
                        thumbnail: "kog/thumbnails/amenities/amenity2.jpg",
                        description: "A tranquil 1-kilometer lake surrounded by walking paths, native landscaping, and serene seating areas perfect for relaxation and nature immersion.",
                        x: 0.24, y: 0.52,
                        videos: {
                            forwardVideo: "/kog/videos/amenities/amenity2/amenity2_trans.mp4",
                            reverseVideo: "/kog/videos/amenities/amenity2/amenity2_rev.mp4",
                            idleVideo: "/kog/videos/amenities/amenity2/amenity2_idle.mp4",
                        },
                    },
                    {
                        id: "amenity5",
                        displayName: "Clubhouse",
                        subtitle: "Lounge, Restaurant & Kids Area",
                        thumbnail: "kog/thumbnails/amenities/amenity5.jpg",
                        description: "A luxurious clubhouse with a lounge, restaurant, and dedicated kids' area.",
                        x: 0.4, y: 0.53,
                        videos: {
                            forwardVideo: "/kog/videos/amenities/amenity5/amenity5_trans.mp4",
                            reverseVideo: "/kog/videos/amenities/amenity5/amenity5_rev.mp4",
                            idleVideo: "/kog/videos/amenities/amenity5/amenity5_idle.mp4",
                        },
                    },
                ],
            },

            zones: {
                id: "zones",
                displayName: "Zones",
                zoomoutVideo: "/kog/videos/zones/zones_out.mp4",
                videos: {
                    forwardVideo: "/kog/videos/zones/zones_gen_trans_from_home.mp4",
                    reverseVideo: "/kog/videos/zones/zones_gen_rev_to_home.mp4",
                    idleVideo: "/kog/videos/zones/zones_gen_idle.mp4",
                },
                items: [
                    // ZONE 1 SAGEFAMILY
                    {
                        id: "zone1",
                        displayName: "Sage Family",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone1.png",
                        highlight: "kog/highlight/zones/zone1.png",
                        description: "A tranquil enclave of elegant contemporary townhouses surrounded by lush greenery.",
                        x: 0.85, y: 0.43,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone1/zone1_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone1/zone1_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone1/zone1_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "town",
                                type: "town",
                                videos: sage_family_videos,
                                views: sage_family_views,
                                blocks: [
                                    // SageFamily 1
                                    {
                                        id: "SageFamily-1",
                                        displayName: "Sage Family 1",
                                        x: 0.29, y: 0.47,
                                        units: sage_family_units,
                                    },
                                    // SageFamily 2
                                    {
                                        id: "SageFamily-2",
                                        displayName: "Sage Family 2",
                                        x: 0.66, y: 0.47,
                                        units: sage_family_units,
                                    },
                                ],
                            },
                        ],
                    },
                    // ZONE 5 MEADOWS 2
                    {
                        id: "zone5",
                        displayName: "Meadows 2",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone5.png",
                        highlight: "kog/highlight/zones/zone5.png",
                        description: "A charming community of townhouses in a verdant setting.",
                        x: 0.19, y: 0.56,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone5/zone5_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone5/zone5_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone5/zone5_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "meadows1",
                                type: "town",
                                videos: meadows_2_videos,
                                views: meadows_views,
                                blocks: [
                                    // Meadows 2
                                    {
                                        id: "Meadows-17",
                                        displayName: "Meadows 17",
                                        x: 0.73, y: 0.467,
                                        units: [
                                            {
                                                id: "Meadows-17-u1",
                                                displayName: "Meadows 17 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-18",
                                        displayName: "Meadows 18",
                                        x: 0.681, y: 0.467,
                                        units: [
                                            {
                                                id: "Meadows-18-u1",
                                                displayName: "Meadows 18 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-18-u2",
                                                displayName: "Meadows 18 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-19",
                                        displayName: "Meadows 19",
                                        x: 0.625, y: 0.465,
                                        units: [
                                            {
                                                id: "Meadows-19-u1",
                                                displayName: "Meadows 19 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-19-u2",
                                                displayName: "Meadows 19 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-20",
                                        displayName: "Meadows 20",
                                        x: 0.568, y: 0.465,
                                        units: [
                                            {
                                                id: "Meadows-20-u1",
                                                displayName: "Meadows 20 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-20-u2",
                                                displayName: "Meadows 20 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-21",
                                        displayName: "Meadows 21",
                                        x: 0.514, y: 0.461,
                                        units: [
                                            {
                                                id: "Meadows-21-u1",
                                                displayName: "Meadows 21 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-21-u2",
                                                displayName: "Meadows 21 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-22",
                                        displayName: "Meadows 22",
                                        x: 0.455, y: 0.461,
                                        units: [
                                            {
                                                id: "Meadows-22-u1",
                                                displayName: "Meadows 22 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-22-u2",
                                                displayName: "Meadows 22 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-23",
                                        displayName: "Meadows 23",
                                        x: 0.399, y: 0.456,
                                        units: [
                                            {
                                                id: "Meadows-23-u1",
                                                displayName: "Meadows 23 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-23-u2",
                                                displayName: "Meadows 23 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-24",
                                        displayName: "Meadows 24",
                                        x: 0.341, y: 0.456,
                                        units: [
                                            {
                                                id: "Meadows-24-u1",
                                                displayName: "Meadows 24 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-24-u2",
                                                displayName: "Meadows 24 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-25",
                                        displayName: "Meadows 25",
                                        x: 0.284, y: 0.451,
                                        units: [
                                            {
                                                id: "Meadows-25-u1",
                                                displayName: "Meadows 25 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-25-u2",
                                                displayName: "Meadows 25 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-26",
                                        displayName: "Meadows 26",
                                        x: 0.226, y: 0.451,
                                        units: [
                                            {
                                                id: "Meadows-26-u1",
                                                displayName: "Meadows 26 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-12-u2",
                                                displayName: "Meadows 11 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-27",
                                        displayName: "Meadows 27",
                                        x: 0.168, y: 0.451,
                                        units: [
                                            {
                                                id: "Meadows-27-u1",
                                                displayName: "Meadows 27 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-27-u2",
                                                displayName: "Meadows 27 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-28",
                                        displayName: "Meadows 28",
                                        x: 0.152, y: 0.593,
                                        units: [
                                            {
                                                id: "Meadows-28-u1",
                                                displayName: "Meadows 28 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-28-u2",
                                                displayName: "Meadows 28 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-29",
                                        displayName: "Meadows 29",
                                        x: 0.152, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-29-u1",
                                                displayName: "Meadows 29 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-29-u2",
                                                displayName: "Meadows 29 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-30",
                                        displayName: "Meadows 30",
                                        x: 0.211, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-30-u1",
                                                displayName: "Meadows 30 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-30-u2",
                                                displayName: "Meadows 30 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-31",
                                        displayName: "Meadows 31",
                                        x: 0.268, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-31-u1",
                                                displayName: "Meadows 31 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-31-u2",
                                                displayName: "Meadows 31 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-32",
                                        displayName: "Meadows 32",
                                        x: 0.325, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-32-u1",
                                                displayName: "Meadows 32 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-32-u2",
                                                displayName: "Meadows 32 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-33",
                                        displayName: "Meadows 33",
                                        x: 0.385, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-33-u1",
                                                displayName: "Meadows 33 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-33-u2",
                                                displayName: "Meadows 33 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-34",
                                        displayName: "Meadows 34",
                                        x: 0.442, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-34-u1",
                                                displayName: "Meadows 34 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-34-u2",
                                                displayName: "Meadows 34 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-35",
                                        displayName: "Meadows 35",
                                        x: 0.5, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-35-u1",
                                                displayName: "Meadows 35 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-35-u2",
                                                displayName: "Meadows 35 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-36",
                                        displayName: "Meadows 36",
                                        x: 0.561, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-36-u1",
                                                displayName: "Meadows 36 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-36-u2",
                                                displayName: "Meadows 36 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-37",
                                        displayName: "Meadows 37",
                                        x: 0.615, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-37-u1",
                                                displayName: "Meadows 37 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-37-u2",
                                                displayName: "Meadows 37 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-38",
                                        displayName: "Meadows 38",
                                        x: 0.678, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-38-u1",
                                                displayName: "Meadows 38 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-38-u2",
                                                displayName: "Meadows 38 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-39",
                                        displayName: "Meadows 39",
                                        x: 0.736, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-39-u1",
                                                displayName: "Meadows 39 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-39-u2",
                                                displayName: "Meadows 39 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-40",
                                        displayName: "Meadows 40",
                                        x: 0.792, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-40-u1",
                                                displayName: "Meadows 40 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-40-u2",
                                                displayName: "Meadows 40 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                    {
                                        id: "Meadows-41",
                                        displayName: "Meadows 41",
                                        x: 0.85, y: 0.739,
                                        units: [
                                            {
                                                id: "Meadows-41-u1",
                                                displayName: "Meadows 41 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-41-u2",
                                                displayName: "Meadows 41 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows2_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },
                                        ]
                                    },
                                ]
                            }
                        ],
                    },
                ],
            },

            unitTypes: {
                "family_midd": {
                    id: "family_midd",
                    bedrooms: 4, bathrooms: 5,
                    serviceRooms: null,
                    area: 325,
                    roofarea: 126,
                    gallery: [
                        { id: "f1", src: "/kog/images/family/01-FAMILY HOUSE FRONT.jpg" },
                        { id: "f2", src: "/kog/images/family/02-FAMILY HOUSE BACK.jpg" },
                    ],
                    cutSections: [
                        { id: "c1", src: "/kog/cut_section/family_midd/g.png" },
                        { id: "c2", src: "/kog/cut_section/family_midd/1.png" },
                        { id: "c3", src: "/kog/cut_section/family_midd/r.png" },
                    ],
                    floorPlans: null,
                    paymentPlans: null,
                    interior: {
                        levels: [
                            {
                                id: "ground",
                                name: "Ground",
                                rooms: [
                                    {
                                        id: "g-entrance",
                                        displayName: "Entrance",
                                        furnitureImgId: "/kog/panorama/family_midd/f/ground/entrance.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/ground/entrance.jpg",
                                        hotspots: [
                                            { id: "hp2", yaw: 162.69, pitch: -11.91, type: "scene", label: "Ground/Living 2" },
                                            { id: "hp3", yaw: 67.19, pitch: -20.96, type: "scene", label: "Ground/Kitchen" },
                                            { id: "hp4", yaw: -78.18, pitch: -27.69, type: "scene", label: "Ground/Toilet" },
                                            { id: "hp5", yaw: -171.43, pitch: -14.63, type: "scene", label: "Ground/Living 1" },
                                            { id: "hp6", yaw: -105.42, pitch: -55.75, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "g-living01",
                                        displayName: "Living01",
                                        furnitureImgId: "/kog/panorama/family_midd/f/ground/living01.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/ground/living01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -17.89, pitch: -13.36, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g-living02",
                                        displayName: "Living02",
                                        furnitureImgId: "/kog/panorama/family_midd/f/ground/living02.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/ground/living02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 28.26, pitch: -14.24, type: "scene", label: "Ground/Entrance" },
                                        ]
                                    },
                                    {
                                        id: "g-kitchen",
                                        displayName: "Kitchen",
                                        furnitureImgId: "/kog/panorama/family_midd/f/ground/kitchen.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/ground/kitchen.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 140.1, pitch: -16.52, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/family_midd/f/ground/g.toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/ground/g.toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -167.96, pitch: -38.63, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: "first",
                                name: "First",
                                rooms: [
                                    {
                                        id: "f1-corridor",
                                        displayName: "Corridor",
                                        furnitureImgId: "/kog/panorama/family_midd/f/first/corridor.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/first/corridor.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -39.07, pitch: -36.39, type: "scene", label: "First/Master Bedroom 2" },
                                            { id: "hp2", yaw: 174.9, pitch: -12.66, type: "scene", label: "First/Bedroom 1" },
                                            { id: "hp3", yaw: 153.37, pitch: -22.72, type: "scene", label: "First/Bedroom 2" },
                                            { id: "hp4", yaw: 81.34, pitch: -21.88, type: "scene", label: "First/Toilet" },
                                            { id: "hp5", yaw: 7.91, pitch: -22.32, type: "scene", label: "First/Master Bedroom 1" },
                                            { id: "hp6", yaw: -72.51, pitch: -48.96, type: "scene", label: "Roof/Roof Room" },
                                            { id: "hp7", yaw: -111.93, pitch: -37.97, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp8", yaw: -137.64, pitch: -18.63, type: "scene", label: "First/Living" }
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom01",
                                        displayName: "Bedroom 1",
                                        furnitureImgId: "/kog/panorama/family_midd/f/first/bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/first/bedroom01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -2.15, pitch: -17.75, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom02",
                                        displayName: "Bedroom 2",
                                        furnitureImgId: "/kog/panorama/family_midd/f/first/bedroom02.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/first/bedroom02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 29.31, pitch: -26.1, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom01",
                                        displayName: "Master Bedroom 1",
                                        furnitureImgId: "/kog/panorama/family_midd/f/first/m.bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/first/m.bedroom01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -7, pitch: -12, type: "scene", label: "First/Corridor" },
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom02",
                                        displayName: "Master Bedroom 2",
                                        furnitureImgId: "/kog/panorama/family_midd/f/first/m.bedroom02.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/first/m.bedroom02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -7, pitch: -12, type: "scene", label: "First/Corridor" },
                                        ]
                                    },
                                    {
                                        id: "f1-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/family_midd/f/first/toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/first/toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 169.63, pitch: -44.25, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-living",
                                        displayName: "Living",
                                        furnitureImgId: "/kog/panorama/family_midd/f/first/living.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/first/living.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 16.39, pitch: -17.23, type: "scene", label: "First/Corridor" }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: "roof",
                                name: "Roof",
                                rooms: [
                                    {
                                        id: "r-roof_room",
                                        displayName: "Roof Room",
                                        furnitureImgId: "/kog/panorama/family_midd/f/roof/roof_room.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/roof/roof_room.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 144.71, pitch: -38.36, type: "scene", label: "First/Corridor" },
                                            { id: "hp2", yaw: 71.02, pitch: -34.67, type: "scene", label: "Roof/Roof Toilet" }
                                        ]
                                    },
                                    {
                                        id: "r-roof_toilet",
                                        displayName: "Roof Toilet",
                                        furnitureImgId: "/kog/panorama/family_midd/f/roof/roof_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/roof/roof_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -101.6, pitch: -35.77, type: "scene", label: "Roof/Roof Room" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },

                "family_corner": {
                    id: "family_corner",
                    bedrooms: 3, bathrooms: 4,
                    serviceRooms: null,
                    area: 167,
                    roofarea: 57,
                    gallery: [
                        { id: "fc1", src: "/kog/images/family/01-FAMILY HOUSE FRONT.jpg" },
                        { id: "fc2", src: "/kog/images/family/02-FAMILY HOUSE BACK.jpg" },
                    ],
                    cutSections: [
                        { id: "c1", src: "/kog/cut_section/family Corner/g.png" },
                        { id: "c2", src: "/kog/cut_section/family Corner/1.png" },
                        { id: "c3", src: "/kog/cut_section/family Corner/r.png" },
                    ],
                    floorPlans: null,
                    paymentPlans: null,
                    interior: {
                        levels: [
                            {
                                id: "ground",
                                name: "Ground",
                                rooms: [
                                    {
                                        id: "g-entrance",
                                        displayName: "Entrance",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/ground/entrance_corner.jpeg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/ground/entrance_corner.jpeg",
                                        hotspots: [
                                            { id: "hp1", yaw: 174.59, pitch: -44.91, type: "scene", label: "First/Corridor" },
                                            { id: "hp2", yaw: -87.67, pitch: -28.3, type: "scene", label: "Ground/Toilet" },
                                            { id: "hp3", yaw: -64.12, pitch: -27.07, type: "scene", label: "Ground/Kitchen" },
                                            { id: "hp4", yaw: -177.41, pitch: -27.95, type: "scene", label: "Ground/Dining" },
                                            { id: "hp5", yaw: -177.71, pitch: -10.59, type: "scene", label: "Ground/Living" }
                                        ]
                                    },
                                    {
                                        id: "g-dining",
                                        displayName: "Dining",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/ground/dining.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/ground/dining.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -3.52, pitch: -33.4, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: -176.18, pitch: -14.68, type: "scene", label: "Ground/Living" }
                                        ]
                                    },
                                    {
                                        id: "g-living",
                                        displayName: "Living",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/ground/living.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/ground/living.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 14.72, pitch: -17.23, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g-kitchen",
                                        displayName: "Kitchen",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/ground/kitchen.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/ground/kitchen.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 136.36, pitch: -41.31, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/ground/g.toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/ground/g.toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -167.96, pitch: -38.63, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: "first",
                                name: "First",
                                rooms: [
                                    {
                                        id: "f1-corridor",
                                        displayName: "Corridor",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/first/corridor.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/first/corridor.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -65.43, pitch: -57.83, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: -13.4, pitch: -44.34, type: "scene", label: "Roof/Roof Room" },
                                            { id: "hp3", yaw: -14.41, pitch: -24.7, type: "scene", label: "First/Toilet" },
                                            { id: "hp4", yaw: -175.17, pitch: -26.72, type: "scene", label: "First/Bedroom 2" },
                                            { id: "hp5", yaw: -136.1, pitch: -40.3, type: "scene", label: "First/Bedroom 1" },
                                            { id: "hp6", yaw: -2.55, pitch: -19.38, type: "scene", label: "First/Master Bedroom" }
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom01",
                                        displayName: "Bedroom 1",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/first/bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/first/bedroom01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 29.31, pitch: -26.1, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom02",
                                        displayName: "Bedroom 2",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/first/bedroom02.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/first/bedroom02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -2.15, pitch: -17.75, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom",
                                        displayName: "Master Bedroom",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/first/m.bedroom.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/first/m.bedroom.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 154.82, pitch: -20.61, type: "scene", label: "First/Corridor" },
                                            { id: "hp2", yaw: -101.78, pitch: -35.82, type: "scene", label: "First/Master Bedroom Dressing" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom_dressing",
                                        displayName: "Master Bedroom Dressing",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/first/m.bedroom_dressing.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/first/m.bedroom_dressing.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -169.41, pitch: -47.86, type: "scene", label: "First/Master Bedroom Toilet" },
                                            { id: "hp2", yaw: 97.08, pitch: -54.71, type: "scene", label: "First/Master Bedroom" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom_toilet",
                                        displayName: "Master Bedroom Toilet",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/first/m.bed_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/first/m.bedroom_toilet.jpeg",
                                        hotspots: [
                                            { id: "hp1", yaw: -90.09, pitch: -46.01, type: "scene", label: "First/Master Bedroom Dressing" }
                                        ]
                                    },
                                    {
                                        id: "f1-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/first/toilet.jpeg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/first/toilet.jpeg",
                                        hotspots: [
                                            { id: "hp1", yaw: 169.63, pitch: -44.25, type: "scene", label: "First/Corridor" }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: "roof",
                                name: "Roof",
                                rooms: [
                                    {
                                        id: "r-roof_room",
                                        displayName: "Roof Room",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/roof/roof_room.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/roof/roof_room.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 144.71, pitch: -38.36, type: "scene", label: "First/Corridor" },
                                            { id: "hp2", yaw: 71.02, pitch: -34.67, type: "scene", label: "Roof/Roof Toilet" }
                                        ]
                                    },
                                    {
                                        id: "r-roof_toilet",
                                        displayName: "Roof Toilet",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/roof/roof_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/roof/roof_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -101.6, pitch: -35.77, type: "scene", label: "Roof/Roof Room" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
            },
        },

        {
            id: "b",
            name: "Sunset Residences",
            thumbnail: B_THUMBNAIL,
            description: "Sunset Residences is a residential compound located in New Giza, presenting a range of sophisticated villas and townhouses. The project aims to deliver a serene and high-end living experience, enveloped by beautiful gardens and contemporary amenities.",
            introVideo: null,
            idleVideo: null,
            zoomoutVideo: null,
        },
    ],

}