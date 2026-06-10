import { PROPERTY_TYPE } from "../constants/roles";
import TBK_LOGO from '../assets/images/tbk-logo.png';
import TBK_BACKGROUND from '../assets/images/background.jpg';
import KS_THUMBNAIL from '../assets/images/ks-thumbnail.png';
import KOG_THUMBNAIL from '../assets/images/kog-thumbnail.png';
import B_THUMBNAIL from '../assets/images/b-thumbnail.png';

import VILLA_ICON from '../assets/icons/villa.svg';
import AIRPORT_ICON from '../assets/icons/airport.svg';
import MALL_ICON from '../assets/icons/mall.svg';
import CITY_ICON from '../assets/icons/city.svg';

export const projectPath = "projects/kog";

export const config = {
  // General
    USE_PREDEFINED_POS: false,
    USE_HOTSPOTS: true,
  
  // 360 Settings
  // Interior
    INTERIOR_ZOOM_RANGE: { min: 0.8, max: 1.333 },
    INTERIOR_PITCH_RANGE: { min: -30, max: 15 },
    INTERIOR_INITIAL_YAW: 190,

  // Balcony/Location
    BALCONY_ZOOM_RANGE: { min: 1, max: 1.333 },
    BALCONY_PITCH_RANGE: { min: 0, max: 25 },
    // BALCONY_YAW_RANGE: { min: -70, max: 70 },

  // Titles
    BALCONY_TITLE: "Location View",
}

// villas videos & views
// IRIS
const iris_1_videos = {
    forwardVideo: "/kog/videos/zones/zone2/iris/zone2_iris_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone2/iris/zone2_iris_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone2/iris/views/view1/zone2_iris_view1_idle.mp4",
};
const iris_2_videos = {
    forwardVideo: "/kog/videos/zones/zone3/iris/zone3_iris_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone3/iris/zone3_iris_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone2/iris/views/view1/zone2_iris_view1_idle.mp4",
};
const iris_views = [
    {
        name: "view 1",
        videos: {
            forwardVideo: "kog/videos/zones/zone2/iris/views/view1/zone2_iris_view1_trans.mp4",
            reverseVideo: "kog/videos/zones/zone2/iris/views/view1/zone2_iris_view1_rev.mp4",
            idleVideo: "kog/videos/zones/zone2/iris/views/view1/zone2_iris_view1_idle.mp4",
        }
    },
    {
        name: "view 2",
        videos: {
            forwardVideo: "kog/videos/zones/zone2/iris/views/view2/zone2_iris_view2_trans.mp4",
            reverseVideo: "kog/videos/zones/zone2/iris/views/view2/zone2_iris_view2_rev.mp4",
            idleVideo: "kog/videos/zones/zone2/iris/views/view2/zone2_iris_view2_idle.mp4",
        }
    },
    {
        name: "view 3",
        videos: {
            forwardVideo: "kog/videos/zones/zone2/iris/views/view3/zone2_iris_view3_trans.mp4",
            reverseVideo: "kog/videos/zones/zone2/iris/views/view3/zone2_iris_view3_rev.mp4",
            idleVideo: "kog/videos/zones/zone2/iris/views/view3/zone2_iris_view3_idle.mp4",
        }
    },
    {
        name: "view 4",
        videos: {
            forwardVideo: "kog/videos/zones/zone2/iris/views/view4/zone2_iris_view4_trans.mp4",
            reverseVideo: "kog/videos/zones/zone2/iris/views/view4/zone2_iris_view4_rev.mp4",
            idleVideo: "kog/videos/zones/zone2/iris/views/view4/zone2_iris_view4_idle.mp4",
        }
    },
    {
        name: "view 5",
        videos: {
            forwardVideo: "kog/videos/zones/zone2/iris/views/view5/zone2_iris_view5_trans.mp4",
            reverseVideo: "kog/videos/zones/zone2/iris/views/view5/zone2_iris_view5_rev.mp4",
            idleVideo: "kog/videos/zones/zone2/iris/views/view5/zone2_iris_view5_idle.mp4",
        }
    },
];
const iris_1_location = "kog/panorama/location/IrisGroup1.jpg"
const iris_2_location = "kog/panorama/location/IrisGroup2.jpg"

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
const meadows_1_videos = {
    forwardVideo: "/kog/videos/zones/zone4/meadows/zone4_meadows_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone4/meadows/zone4_meadows_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone4/meadows/views/view1/zone4_meadows_view1_idle.mp4",
};
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
const meadows1_location = "kog/panorama/location/Meadows1.jpg"
const meadows2_location = "kog/panorama/location/Meadows2.jpg"

// OAK 168
const oak168_videos = {
    forwardVideo: "/kog/videos/zones/zone6/oak168/zone6_oak168_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone6/oak168/zone6_oak168_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone6/oak168/views/view1/zone6_oak168_view1_idle.mp4",
};
const oak168_views = [
    {
        name: "view 1",
        videos: {
            forwardVideo: "kog/videos/zones/zone6/oak168/views/view1/zone6_oak168_view1_trans.mp4",
            reverseVideo: "kog/videos/zones/zone6/oak168/views/view1/zone6_oak168_view1_rev.mp4",
            idleVideo: "kog/videos/zones/zone6/oak168/views/view1/zone6_oak168_view1_idle.mp4",
        }
    },
    {
        name: "view 2",
        videos: {
            forwardVideo: "kog/videos/zones/zone6/oak168/views/view2/zone6_oak168_view2_trans.mp4",
            reverseVideo: "kog/videos/zones/zone6/oak168/views/view2/zone6_oak168_view2_rev.mp4",
            idleVideo: "kog/videos/zones/zone6/oak168/views/view2/zone6_oak168_view2_idle.mp4",
        }
    },
    {
        name: "view 3",
        videos: {
            forwardVideo: "kog/videos/zones/zone6/oak168/views/view3/zone6_oak168_view3_trans.mp4",
            reverseVideo: "kog/videos/zones/zone6/oak168/views/view3/zone6_oak168_view3_rev.mp4",
            idleVideo: "kog/videos/zones/zone6/oak168/views/view3/zone6_oak168_view3_idle.mp4",
        }
    },
    {
        name: "view 4",
        videos: {
            forwardVideo: "kog/videos/zones/zone6/oak168/views/view4/zone6_oak168_view4_trans.mp4",
            reverseVideo: "kog/videos/zones/zone6/oak168/views/view4/zone6_oak168_view4_rev.mp4",
            idleVideo: "kog/videos/zones/zone6/oak168/views/view4/zone6_oak168_view4_idle.mp4",
        }
    },
    {
        name: "view 5",
        videos: {
            forwardVideo: "kog/videos/zones/zone6/oak168/views/view5/zone6_oak168_view5_trans.mp4",
            reverseVideo: "kog/videos/zones/zone6/oak168/views/view5/zone6_oak168_view5_rev.mp4",
            idleVideo: "kog/videos/zones/zone6/oak168/views/view5/zone6_oak168_view5_idle.mp4",
        }
    },
];
const oak168_units = [
    {
        forwardVideo: "kog/videos/zones/zone6/oak168/1/zone6_oak168_1_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone6/oak168/1/zone6_oak168_1_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone6/oak168/1/zone6_oak168_1_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone6/oak168/2/zone6_oak168_2_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone6/oak168/2/zone6_oak168_2_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone6/oak168/2/zone6_oak168_2_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone6/oak168/3/zone6_oak168_3_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone6/oak168/3/zone6_oak168_3_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone6/oak168/3/zone6_oak168_3_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone6/oak168/4/zone6_oak168_4_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone6/oak168/4/zone6_oak168_4_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone6/oak168/4/zone6_oak168_4_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone6/oak168/5/zone6_oak168_5_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone6/oak168/5/zone6_oak168_5_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone6/oak168/5/zone6_oak168_5_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone6/oak168/6/zone6_oak168_6_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone6/oak168/6/zone6_oak168_6_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone6/oak168/6/zone6_oak168_6_gen_idle.mp4",
    },
];
const oak168_location = "kog/panorama/location/Oak168.jpg";

// OAK 170 - ZONE 7 - 4 UNITS
const oak170_4u_videos = {
    forwardVideo: "/kog/videos/zones/zone7/oak170/zone7_oak170_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone7/oak170/zone7_oak170_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone7/oak170/views/view1/zone7_oak170_view1_idle.mp4",
};
const oak170_4u_views = [
    {
        name: "view 1",
        videos: {
            forwardVideo: "kog/videos/zones/zone7/oak170/views/view1/zone7_oak170_view1_trans.mp4",
            reverseVideo: "kog/videos/zones/zone7/oak170/views/view1/zone7_oak170_view1_rev.mp4",
            idleVideo: "kog/videos/zones/zone7/oak170/views/view1/zone7_oak170_view1_idle.mp4",
        }
    },
    {
        name: "view 2",
        videos: {
            forwardVideo: "kog/videos/zones/zone7/oak170/views/view2/zone7_oak170_view2_trans.mp4",
            reverseVideo: "kog/videos/zones/zone7/oak170/views/view2/zone7_oak170_view2_rev.mp4",
            idleVideo: "kog/videos/zones/zone7/oak170/views/view2/zone7_oak170_view2_idle.mp4",
        }
    },
    {
        name: "view 3",
        videos: {
            forwardVideo: "kog/videos/zones/zone7/oak170/views/view3/zone7_oak170_view3_trans.mp4",
            reverseVideo: "kog/videos/zones/zone7/oak170/views/view3/zone7_oak170_view3_rev.mp4",
            idleVideo: "kog/videos/zones/zone7/oak170/views/view3/zone7_oak170_view3_idle.mp4",
        }
    },
    {
        name: "view 4",
        videos: {
            forwardVideo: "kog/videos/zones/zone7/oak170/views/view4/zone7_oak170_view4_trans.mp4",
            reverseVideo: "kog/videos/zones/zone7/oak170/views/view4/zone7_oak170_view4_rev.mp4",
            idleVideo: "kog/videos/zones/zone7/oak170/views/view4/zone7_oak170_view4_idle.mp4",
        }
    },
    {
        name: "view 5",
        videos: {
            forwardVideo: "kog/videos/zones/zone7/oak170/views/view5/zone7_oak170_view5_trans.mp4",
            reverseVideo: "kog/videos/zones/zone7/oak170/views/view5/zone7_oak170_view5_rev.mp4",
            idleVideo: "kog/videos/zones/zone7/oak170/views/view5/zone7_oak170_view5_idle.mp4",
        }
    },
];
const oak170_4u_location = "kog/panorama/location/Oak170-1V.jpg";
const oak170_4u_units_videos = [
    {
        forwardVideo: "kog/videos/zones/zone7/oak170/1/zone7_oak170_1_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone7/oak170/1/zone7_oak170_1_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone7/oak170/1/zone7_oak170_1_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone7/oak170/2/zone7_oak170_2_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone7/oak170/2/zone7_oak170_2_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone7/oak170/2/zone7_oak170_2_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone7/oak170/3/zone7_oak170_3_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone7/oak170/3/zone7_oak170_3_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone7/oak170/3/zone7_oak170_3_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone7/oak170/4/zone7_oak170_4_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone7/oak170/4/zone7_oak170_4_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone7/oak170/4/zone7_oak170_4_gen_idle.mp4",
    },
];
const oak170_4u_units = [
    {
        id: "oak170-4u-u1",
        displayName: "U1",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_4u_location,
        x: 0.25, y: 0.55,
        videos: oak170_4u_units_videos[0],
    },
    {
        id: "oak170-4u-u2",
        displayName: "U2",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_4u_location,
        x: 0.35, y: 0.55,
        videos: oak170_4u_units_videos[1],
    },
    {
        id: "oak170-4u-u3",
        displayName: "U3",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_4u_location,
        x: 0.565, y: 0.55,
        videos: oak170_4u_units_videos[2],
    },
    {
        id: "oak170-4u-u4",
        displayName: "U4",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_4u_location,
        x: 0.71, y: 0.55,
        videos: oak170_4u_units_videos[3],
    },
];

// OAK 170 - ZONE 7 - 6 UNITS
const oak170_z7_6u_videos = {
    forwardVideo: "/kog/videos/zones/zone7/oak172/zone7_oak172_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone7/oak172/zone7_oak172_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone7/oak172/views/view1/zone7_oak172_view1_idle.mp4",
};
const oak170_6u_views = [
    {
        name: "view 1",
        videos: {
            forwardVideo: "kog/videos/zones/zone7/oak172/views/view1/zone7_oak172_view1_trans.mp4",
            reverseVideo: "kog/videos/zones/zone7/oak172/views/view1/zone7_oak172_view1_rev.mp4",
            idleVideo: "kog/videos/zones/zone7/oak172/views/view1/zone7_oak172_view1_idle.mp4",
        }
    },
    {
        name: "view 2",
        videos: {
            forwardVideo: "kog/videos/zones/zone7/oak172/views/view2/zone7_oak172_view2_trans.mp4",
            reverseVideo: "kog/videos/zones/zone7/oak172/views/view2/zone7_oak172_view2_rev.mp4",
            idleVideo: "kog/videos/zones/zone7/oak172/views/view2/zone7_oak172_view2_idle.mp4",
        }
    },
    {
        name: "view 3",
        videos: {
            forwardVideo: "kog/videos/zones/zone7/oak172/views/view3/zone7_oak172_view3_trans.mp4",
            reverseVideo: "kog/videos/zones/zone7/oak172/views/view3/zone7_oak172_view3_rev.mp4",
            idleVideo: "kog/videos/zones/zone7/oak172/views/view3/zone7_oak172_view3_idle.mp4",
        }
    },
    {
        name: "view 4",
        videos: {
            forwardVideo: "kog/videos/zones/zone7/oak172/views/view4/zone7_oak172_view4_trans.mp4",
            reverseVideo: "kog/videos/zones/zone7/oak172/views/view4/zone7_oak172_view4_rev.mp4",
            idleVideo: "kog/videos/zones/zone7/oak172/views/view4/zone7_oak172_view4_idle.mp4",
        }
    },
    {
        name: "view 5",
        videos: {
            forwardVideo: "kog/videos/zones/zone7/oak172/views/view5/zone7_oak172_view5_trans.mp4",
            reverseVideo: "kog/videos/zones/zone7/oak172/views/view5/zone7_oak172_view5_rev.mp4",
            idleVideo: "kog/videos/zones/zone7/oak172/views/view5/zone7_oak172_view5_idle.mp4",
        }
    },
];
const oak170_z7_6u_location = "kog/panorama/location/Oak170-1H.jpg";
const oak170_6u_units_videos = [
    {
        forwardVideo: "kog/videos/zones/zone7/oak172/1/zone7_oak172_1_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone7/oak172/1/zone7_oak172_1_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone7/oak172/1/zone7_oak172_1_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone7/oak172/2/zone7_oak172_2_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone7/oak172/2/zone7_oak172_2_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone7/oak172/2/zone7_oak172_2_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone7/oak172/3/zone7_oak172_3_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone7/oak172/3/zone7_oak172_3_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone7/oak172/3/zone7_oak172_3_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone7/oak172/4/zone7_oak172_4_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone7/oak172/4/zone7_oak172_4_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone7/oak172/4/zone7_oak172_4_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone7/oak172/5/zone7_oak172_5_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone7/oak172/5/zone7_oak172_5_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone7/oak172/5/zone7_oak172_5_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone7/oak172/6/zone7_oak172_6_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone7/oak172/6/zone7_oak172_6_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone7/oak172/6/zone7_oak172_6_gen_idle.mp4",
    },
];
const oak170_z7_6u_units = [
    {
        id: "oak170-6u-u1",
        displayName: "U1",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z7_6u_location,
        x: 0.225, y: 0.72,
        videos: oak170_6u_units_videos[0],
    },
    {
        id: "oak170-6u-u2",
        displayName: "U2",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z7_6u_location,
        x: 0.32, y: 0.72,
        videos: oak170_6u_units_videos[1],
    },
    {
        id: "oak170-6u-u3",
        displayName: "U3",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z7_6u_location,
        x: 0.475, y: 0.72,
        videos: oak170_6u_units_videos[2],
    },
    {
        id: "oak170-6u-u4",
        displayName: "U4",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z7_6u_location,
        x: 0.565, y: 0.72,
        videos: oak170_6u_units_videos[3],
    },
    {
        id: "oak170-6u-u5",
        displayName: "U5",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z7_6u_location,
        x: 0.71, y: 0.72,
        videos: oak170_6u_units_videos[4],
    },
    {
        id: "oak170-6u-u6",
        displayName: "U6",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z7_6u_location,
        x: 0.795, y: 0.72,
        videos: oak170_6u_units_videos[5],
    },
];

// OAK 170 - ZONE 8 - 6 UNITS
const oak170_z8_6u_videos = {
    forwardVideo: "/kog/videos/zones/zone8/oak172/zone8_oak172_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone8/oak172/zone8_oak172_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone7/oak172/views/view1/zone7_oak172_view1_idle.mp4",
};
const oak170_z8_6u_location = "kog/panorama/location/Oak170-2.jpg";
const oak170_z8_6u_units = [
    {
        id: "oak170-6u-u1",
        displayName: "U1",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z8_6u_location,
        x: 0.225, y: 0.72,
        videos: oak170_6u_units_videos[0],
    },
    {
        id: "oak170-6u-u2",
        displayName: "U2",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z8_6u_location,
        x: 0.32, y: 0.72,
        videos: oak170_6u_units_videos[1],
    },
    {
        id: "oak170-6u-u3",
        displayName: "U3",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z8_6u_location,
        x: 0.475, y: 0.72,
        videos: oak170_6u_units_videos[2],
    },
    {
        id: "oak170-6u-u4",
        displayName: "U4",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z8_6u_location,
        x: 0.565, y: 0.72,
        videos: oak170_6u_units_videos[3],
    },
    {
        id: "oak170-6u-u5",
        displayName: "U5",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z8_6u_location,
        x: 0.71, y: 0.72,
        videos: oak170_6u_units_videos[4],
    },
    {
        id: "oak170-6u-u6",
        displayName: "U6",
        unitTypeId: "oak170",
        price: 950000,
        area: 170,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak170_z8_6u_location,
        x: 0.795, y: 0.72,
        videos: oak170_6u_units_videos[5],
    },
];

// OAK 178 - ZONE 9 - 6 UNITS
const oak178_z9_videos = {
    forwardVideo: "/kog/videos/zones/zone9/oak178/zone9_oak178_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone9/oak178/zone9_oak178_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone9/oak178/views/view1/zone9_oak178_view1_idle.mp4",
};
const oak178_z9_views = [
    {
        name: "view 1",
        videos: {
            forwardVideo: "kog/videos/zones/zone9/oak178/views/view1/zone9_oak178_view1_trans.mp4",
            reverseVideo: "kog/videos/zones/zone9/oak178/views/view1/zone9_oak178_view1_rev.mp4",
            idleVideo: "kog/videos/zones/zone9/oak178/views/view1/zone9_oak178_view1_idle.mp4",
        }
    },
    {
        name: "view 2",
        videos: {
            forwardVideo: "kog/videos/zones/zone9/oak178/views/view2/zone9_oak178_view2_trans.mp4",
            reverseVideo: "kog/videos/zones/zone9/oak178/views/view2/zone9_oak178_view2_rev.mp4",
            idleVideo: "kog/videos/zones/zone9/oak178/views/view2/zone9_oak178_view2_idle.mp4",
        }
    },
    {
        name: "view 3",
        videos: {
            forwardVideo: "kog/videos/zones/zone9/oak178/views/view3/zone9_oak178_view3_trans.mp4",
            reverseVideo: "kog/videos/zones/zone9/oak178/views/view3/zone9_oak178_view3_rev.mp4",
            idleVideo: "kog/videos/zones/zone9/oak178/views/view3/zone9_oak178_view3_idle.mp4",
        }
    },
    {
        name: "view 4",
        videos: {
            forwardVideo: "kog/videos/zones/zone9/oak178/views/view4/zone9_oak178_view4_trans.mp4",
            reverseVideo: "kog/videos/zones/zone9/oak178/views/view4/zone9_oak178_view4_rev.mp4",
            idleVideo: "kog/videos/zones/zone9/oak178/views/view4/zone9_oak178_view4_idle.mp4",
        }
    },
    {
        name: "view 5",
        videos: {
            forwardVideo: "kog/videos/zones/zone9/oak178/views/view5/zone9_oak178_view5_trans.mp4",
            reverseVideo: "kog/videos/zones/zone9/oak178/views/view5/zone9_oak178_view5_rev.mp4",
            idleVideo: "kog/videos/zones/zone9/oak178/views/view5/zone9_oak178_view5_idle.mp4",
        }
    },
];
const oak178_z9_location = "kog/panorama/location/Oak178.jpg";
const oak178_z9_units_videos = [
    {
        forwardVideo: "kog/videos/zones/zone9/oak178/1/zone9_oak178_1_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone9/oak178/1/zone9_oak178_1_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone9/oak178/1/zone9_oak178_1_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone9/oak178/2/zone9_oak178_2_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone9/oak178/2/zone9_oak178_2_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone9/oak178/2/zone9_oak178_2_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone9/oak178/3/zone9_oak178_3_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone9/oak178/3/zone9_oak178_3_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone9/oak178/3/zone9_oak178_3_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone9/oak178/4/zone9_oak178_4_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone9/oak178/4/zone9_oak178_4_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone9/oak178/4/zone9_oak178_4_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone9/oak178/5/zone9_oak178_5_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone9/oak178/5/zone9_oak178_5_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone9/oak178/5/zone9_oak178_5_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone9/oak178/6/zone9_oak178_6_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone9/oak178/6/zone9_oak178_6_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone9/oak178/6/zone9_oak178_6_gen_idle.mp4",
    },
];
const oak178_z9_units = [
    {
        id: "oak178-u1",
        displayName: "U1",
        unitTypeId: "oak178",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z9_location,
        x: 0.22, y: 0.5,
        videos: oak178_z9_units_videos[0],
    },
    {
        id: "oak178-u2",
        displayName: "U2",
        unitTypeId: "oak178",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z9_location,
        x: 0.33, y: 0.5,
        videos: oak178_z9_units_videos[1],
    },
    {
        id: "oak178-u3",
        displayName: "U3",
        unitTypeId: "oak178",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z9_location,
        x: 0.45, y: 0.5,
        videos: oak178_z9_units_videos[2],
    },
    {
        id: "oak178-u4",
        displayName: "U4",
        unitTypeId: "oak178",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z9_location,
        x: 0.57, y: 0.5,
        videos: oak178_z9_units_videos[3],
    },
    {
        id: "oak178-u5",
        displayName: "U5",
        unitTypeId: "oak178",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z9_location,
        x: 0.69, y: 0.5,
        videos: oak178_z9_units_videos[4],
    },
    {
        id: "oak178-u6",
        displayName: "U6",
        unitTypeId: "oak178",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z9_location,
        x: 0.78, y: 0.5,
        videos: oak178_z9_units_videos[5],
    },
];

// OAK 178 NEW - ZONE 10 - 6 UNITS
const oak178_z10_videos = {
    forwardVideo: "/kog/videos/zones/zone10/oak178new/zone10_oak178new_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone10/oak178new/zone10_oak178new_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone10/oak178new/views/view1/zone10_oak178new_view1_idle.mp4",
};
const oak178_z10_views = [
    {
        name: "view 1",
        videos: {
            forwardVideo: "kog/videos/zones/zone10/oak178new/views/view1/zone10_oak178new_view1_trans.mp4",
            reverseVideo: "kog/videos/zones/zone10/oak178new/views/view1/zone10_oak178new_view1_rev.mp4",
            idleVideo: "kog/videos/zones/zone10/oak178new/views/view1/zone10_oak178new_view1_idle.mp4",
        }
    },
    {
        name: "view 2",
        videos: {
            forwardVideo: "kog/videos/zones/zone10/oak178new/views/view2/zone10_oak178new_view2_trans.mp4",
            reverseVideo: "kog/videos/zones/zone10/oak178new/views/view2/zone10_oak178new_view2_rev.mp4",
            idleVideo: "kog/videos/zones/zone10/oak178new/views/view2/zone10_oak178new_view2_idle.mp4",
        }
    },
    {
        name: "view 3",
        videos: {
            forwardVideo: "kog/videos/zones/zone10/oak178new/views/view3/zone10_oak178new_view3_trans.mp4",
            reverseVideo: "kog/videos/zones/zone10/oak178new/views/view3/zone10_oak178new_view3_rev.mp4",
            idleVideo: "kog/videos/zones/zone10/oak178new/views/view3/zone10_oak178new_view3_idle.mp4",
        }
    },
    {
        name: "view 4",
        videos: {
            forwardVideo: "kog/videos/zones/zone10/oak178new/views/view4/zone10_oak178new_view4_trans.mp4",
            reverseVideo: "kog/videos/zones/zone10/oak178new/views/view4/zone10_oak178new_view4_rev.mp4",
            idleVideo: "kog/videos/zones/zone10/oak178new/views/view4/zone10_oak178new_view4_idle.mp4",
        }
    },
    {
        name: "view 5",
        videos: {
            forwardVideo: "kog/videos/zones/zone10/oak178new/views/view5/zone10_oak178new_view5_trans.mp4",
            reverseVideo: "kog/videos/zones/zone10/oak178new/views/view5/zone10_oak178new_view5_rev.mp4",
            idleVideo: "kog/videos/zones/zone10/oak178new/views/view5/zone10_oak178new_view5_idle.mp4",
        }
    },
];
const oak178_z10_location = "kog/panorama/location/Oak178New.jpg";
const oak178_z10_units_videos = [
    {
        forwardVideo: "kog/videos/zones/zone10/oak178new/1/zone10_oak178new_1_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone10/oak178new/1/zone10_oak178new_1_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone10/oak178new/1/zone10_oak178new_1_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone10/oak178new/2/zone10_oak178new_2_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone10/oak178new/2/zone10_oak178new_2_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone10/oak178new/2/zone10_oak178new_2_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone10/oak178new/3/zone10_oak178new_3_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone10/oak178new/3/zone10_oak178new_3_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone10/oak178new/3/zone10_oak178new_3_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone10/oak178new/4/zone10_oak178new_4_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone10/oak178new/4/zone10_oak178new_4_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone10/oak178new/4/zone10_oak178new_4_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone10/oak178new/5/zone10_oak178new_5_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone10/oak178new/5/zone10_oak178new_5_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone10/oak178new/5/zone10_oak178new_5_gen_idle.mp4",
    },
    {
        forwardVideo: "kog/videos/zones/zone10/oak178new/6/zone10_oak178new_6_gen_trans.mp4",
        reverseVideo: "kog/videos/zones/zone10/oak178new/6/zone10_oak178new_6_gen_rev.mp4",
        idleVideo: "kog/videos/zones/zone10/oak178new/6/zone10_oak178new_6_gen_idle.mp4",
    },
];
const oak178_z10_units = [
    {
        id: "oak178new-u1",
        displayName: "U1",
        unitTypeId: "oak178-new",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z10_location,
        x: 0.22, y: 0.65,
        videos: oak178_z10_units_videos[0],
    },
    {
        id: "oak178new-u2",
        displayName: "U2",
        unitTypeId: "oak178-new",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z10_location,
        x: 0.33, y: 0.65,
        videos: oak178_z10_units_videos[1],
    },
    {
        id: "oak178new-u3",
        displayName: "U3",
        unitTypeId: "oak178-new",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z10_location,
        x: 0.45, y: 0.65,
        videos: oak178_z10_units_videos[2],
    },
    {
        id: "oak178new-u4",
        displayName: "U4",
        unitTypeId: "oak178-new",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z10_location,
        x: 0.57, y: 0.65,
        videos: oak178_z10_units_videos[3],
    },
    {
        id: "oak178new-u5",
        displayName: "U5",
        unitTypeId: "oak178-new",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z10_location,
        x: 0.69, y: 0.65,
        videos: oak178_z10_units_videos[4],
    },
    {
        id: "oak178new-u6",
        displayName: "U6",
        unitTypeId: "oak178-new",
        price: 950000,
        area: 178,
        bedrooms: 4, bathrooms: 2,
        balconyView: oak178_z10_location,
        x: 0.78, y: 0.65,
        videos: oak178_z10_units_videos[5],
    },
];

// CAMILIA - ZONE 11 & 12 - 5 UNITS
const camilia_1_videos = {
    forwardVideo: "/kog/videos/zones/zone11/camilia/zone11_camilia_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone11/camilia/zone11_camilia_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone11/camilia/views/view1/zone11_camilia_view1_idle.mp4",
};
const camilia_2_videos = {
    forwardVideo: "/kog/videos/zones/zone12/camilia/zone12_camilia_gen_trans.mp4",
    reverseVideo: "/kog/videos/zones/zone12/camilia/zone12_camilia_gen_rev.mp4",
    idleVideo: "kog/videos/zones/zone11/camilia/views/view1/zone11_camilia_view1_idle.mp4",
};
const camilia_views = [
    {
        name: "view 1",
        videos: {
            forwardVideo: "kog/videos/zones/zone11/camilia/views/view1/zone11_camilia_view1_trans.mp4",
            reverseVideo: "kog/videos/zones/zone11/camilia/views/view1/zone11_camilia_view1_rev.mp4",
            idleVideo: "kog/videos/zones/zone11/camilia/views/view1/zone11_camilia_view1_idle.mp4",
        }
    },
    {
        name: "view 2",
        videos: {
            forwardVideo: "kog/videos/zones/zone11/camilia/views/view2/zone11_camilia_view2_trans.mp4",
            reverseVideo: "kog/videos/zones/zone11/camilia/views/view2/zone11_camilia_view2_rev.mp4",
            idleVideo: "kog/videos/zones/zone11/camilia/views/view2/zone11_camilia_view2_idle.mp4",
        }
    },
    {
        name: "view 3",
        videos: {
            forwardVideo: "kog/videos/zones/zone11/camilia/views/view3/zone11_camilia_view3_trans.mp4",
            reverseVideo: "kog/videos/zones/zone11/camilia/views/view3/zone11_camilia_view3_rev.mp4",
            idleVideo: "kog/videos/zones/zone11/camilia/views/view3/zone11_camilia_view3_idle.mp4",
        }
    },
    {
        name: "view 4",
        videos: {
            forwardVideo: "kog/videos/zones/zone11/camilia/views/view4/zone11_camilia_view4_trans.mp4",
            reverseVideo: "kog/videos/zones/zone11/camilia/views/view4/zone11_camilia_view4_rev.mp4",
            idleVideo: "kog/videos/zones/zone11/camilia/views/view4/zone11_camilia_view4_idle.mp4",
        }
    },
    {
        name: "view 5",
        videos: {
            forwardVideo: "kog/videos/zones/zone11/camilia/views/view5/zone11_camilia_view5_trans.mp4",
            reverseVideo: "kog/videos/zones/zone11/camilia/views/view5/zone11_camilia_view5_rev.mp4",
            idleVideo: "kog/videos/zones/zone11/camilia/views/view5/zone11_camilia_view5_idle.mp4",
        }
    },
];
const camilia_1_location = "kog/panorama/location/CamiliaGroup1.jpg";
const camilia_2_location = "kog/panorama/location/CamiliaGroup2.jpg";

export const DEVELOPER_TBK = {
    developerId: "TBK",
    developerLogo: TBK_LOGO,
    backgroundImage: TBK_BACKGROUND,
    developerProjects: [
        {
            id: "ks",
            name: "Key Stone",
            thumbnail: KS_THUMBNAIL,
            description: "Key Stone is a residential compound located in New Giza, offering a range of luxurious villas and townhouses. The project is designed to provide residents with a serene and upscale living experience, surrounded by lush greenery and modern amenities.",
            introVideo: null,
            idleVideo: null,
            zoomoutVideo: null,
        },

        {
            id: "kog",
            name: "Key of Greens",
            thumbnail: KOG_THUMBNAIL,
            description: "Key of Green is a residential compound located in New Giza, offering a range of luxurious villas and townhouses. The project is designed to provide residents with a serene and upscale living experience, surrounded by lush greenery and modern amenities.",
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
                        id: "surrounding1",
                        displayName: "SOLMANIA",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.44, y: 0.11,
                        svgPath: null,
                        nameDirection: "right",
                    },
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
                        id: "surrounding3",
                        displayName: "IVY New Giza",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.54, y: 0.17,
                        svgPath: null,
                        nameDirection: "right",
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
                        id: "surrounding5",
                        displayName: "Hills of One",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.54, y: 0.37,
                        svgPath: null,
                        nameDirection: "left",
                    },
                    {
                        id: "surrounding6",
                        displayName: "Rivers Tatweer",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.56, y: 0.43,
                        svgPath: null,
                        nameDirection: "left",
                    },
                    {
                        id: "surrounding7",
                        displayName: "The Estates Sodic",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.58, y: 0.49,
                        svgPath: null,
                        nameDirection: "left",
                    },
                    {
                        id: "surrounding8",
                        displayName: "Solana ORA",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.54, y: 0.63,
                        svgPath: null,
                        nameDirection: "left",
                    },
                    {
                        id: "surrounding9",
                        displayName: "VYE Sodic",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.6, y: 0.58,
                        svgPath: null,
                        nameDirection: "left",
                    },
                    {
                        id: "surrounding10",
                        displayName: "Karmeel Sodic",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.61, y: 0.66,
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
                        id: "surrounding13",
                        displayName: "Aliegria",
                        iconSrc: VILLA_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.79, y: 0.54,
                        svgPath: null,
                        nameDirection: "right",
                    },
                    {
                        id: "surrounding14",
                        displayName: " Smart Village",
                        iconSrc: CITY_ICON,
                        thumbnail: null,
                        distance: null,
                        description: null,
                        x: 0.88, y: 0.47,
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
                    {
                        id: "surrounding16",
                        displayName: "Arkan Plaza",
                        iconSrc: MALL_ICON,
                        thumbnail: null,
                        distance: "10 min",
                        description: null,
                        x: 0.85, y: 0.77,
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
                        id: "amenity3",
                        displayName: "Public Pool",
                        subtitle: "Aquatic Oasis",
                        thumbnail: "kog/thumbnails/amenities/amenity3.jpg",
                        description: "A sparkling community pool with dedicated lap lanes, shallow play zones for children, sun decks, and shaded cabanas for ultimate refreshment.",
                        x: 0.62, y: 0.51,
                        videos: {
                            forwardVideo: "/kog/videos/amenities/amenity3/amenity3_trans.mp4",
                            reverseVideo: "/kog/videos/amenities/amenity3/amenity3_rev.mp4",
                            idleVideo: "/kog/videos/amenities/amenity3/amenity3_idle.mp4",
                        },
                    },
                    {
                        id: "amenity4",
                        displayName: "Tracks",
                        subtitle: "Jogging and Cycling tracks",
                        thumbnail: "kog/thumbnails/amenities/amenity4.jpg",
                        description: "Jogging and cycling tracks that wind through lush landscapes, providing a refreshing outdoor experience.",
                        x: 0.54, y: 0.5,
                        videos: {
                            forwardVideo: "/kog/videos/amenities/amenity4/amenity4_trans.mp4",
                            reverseVideo: "/kog/videos/amenities/amenity4/amenity4_rev.mp4",
                            idleVideo: "/kog/videos/amenities/amenity4/amenity4_idle.mp4",
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
                    {
                        id: "amenity6",
                        displayName: "Lagoon",
                        subtitle: "Tranquil Lagoon",
                        thumbnail: "kog/thumbnails/amenities/amenity6.jpg",
                        description: "An artfully designed lagoon with crystal-clear waters, waterfall features, lush greenery, and intimate seating nooks for peaceful moments.",
                        x: 0.43, y: 0.43,
                        videos: {
                            forwardVideo: "/kog/videos/amenities/amenity6/amenity6_trans.mp4",
                            reverseVideo: "/kog/videos/amenities/amenity6/amenity6_rev.mp4",
                            idleVideo: "/kog/videos/amenities/amenity6/amenity6_idle.mp4",
                        },
                    },
                    {
                        id: "amenity7",
                        displayName: "Sports Area",
                        subtitle: "Padel Court and Football Court",
                        thumbnail: "kog/thumbnails/amenities/amenity7.jpg",
                        description: "A dedicated sports area featuring a padel court, football court, and squash court.",
                        x: 0.85, y: 0.57,
                        videos: {
                            forwardVideo: "/kog/videos/amenities/amenity7/amenity7_trans.mp4",
                            reverseVideo: "/kog/videos/amenities/amenity7/amenity7_rev.mp4",
                            idleVideo: "/kog/videos/amenities/amenity7/amenity7_idle.mp4",
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
                                type: PROPERTY_TYPE.TOWNHOUSE,
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
                    // ZONE 2 IRIS 1
                    {
                        id: "zone2",
                        displayName: "IRIS 1",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone2.png",
                        highlight: "kog/highlight/zones/zone2.png",
                        description: "A serene community of luxury villas and modern townhouses nestled in nature.",
                        x: 0.66, y: 0.57,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone2/zone2_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone2/zone2_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone2/zone2_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "iris-1",
                                type: PROPERTY_TYPE.VILLA,
                                videos: iris_1_videos,
                                views: iris_views,
                                units: [
                                    {
                                        id: "IRIS-1",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 1",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.14, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-1A",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 1A",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.174, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-2",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 2",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.211, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-2A",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 2A",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.245, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-3",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 3",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.282, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-4",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 4",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.319, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-5",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 5",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.355, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-6",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 6",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.389, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-7",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 7",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.422, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-8",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 8",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.458, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-9",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 9",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.494, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-10",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 10",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.536, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-11",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 11",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.573, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-12",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 12",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.607, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-13",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 13",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.643, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-14",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 14",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.678, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-15",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 15",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.712, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-16",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 16",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.75, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-17",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 17",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.784, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-18",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 18",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.819, y: 0.554,
                                    },
                                    {
                                        id: "IRIS-19",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 19",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_1_location,
                                        x: 0.854, y: 0.554,
                                    },
                                ],
                            },
                        ],
                    },
                    // ZONE 3 IRIS 2
                    {
                        id: "zone3",
                        displayName: "IRIS 2",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone3.png",
                        highlight: "kog/highlight/zones/zone3.png",
                        description: "A serene community of luxury villas and modern townhouses nestled in nature.",
                        x: 0.47, y: 0.37,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone3/zone3_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone3/zone3_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone3/zone3_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "iris-2",
                                type: PROPERTY_TYPE.VILLA,
                                highlight: "kog/highlight/types/type1.png",
                                description: "Luxury 4-bedroom villa with rooftop lounge.",
                                videos: iris_2_videos,
                                views: iris_views,
                                units: [
                                    {
                                        id: "IRIS-20",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 20",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_2_location,
                                        x: 0.775, y: 0.632,
                                    },
                                    {
                                        id: "IRIS-21",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 21",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_2_location,
                                        x: 0.775, y: 0.475,
                                    },
                                    {
                                        id: "IRIS-22",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 22",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_2_location,
                                        x: 0.636, y: 0.192,
                                    },
                                    {
                                        id: "IRIS-23",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 23",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_2_location,
                                        x: 0.55, y: 0.192,
                                    },
                                    {
                                        id: "IRIS-24",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 24",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_2_location,
                                        x: 0.454, y: 0.192,
                                    },
                                    {
                                        id: "IRIS-25",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 25",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_2_location,
                                        x: 0.368, y: 0.192,
                                    },
                                    {
                                        id: "IRIS-26",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 26",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_2_location,
                                        x: 0.226, y: 0.454,
                                    },
                                    {
                                        id: "IRIS-27",
                                        unitTypeId: "iris",
                                        displayName: "IRIS 27",
                                        price: 2200000,
                                        area: 293,
                                        bedrooms: 6, bathrooms: 7,
                                        balconyView: iris_2_location,
                                        x: 0.226, y: 0.612,
                                    },
                                ],
                            },
                        ],
                    },
                    // ZONE 4 MEADOWS 1
                    {
                        id: "zone4",
                        displayName: "Meadows 1",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone4.png",
                        highlight: "kog/highlight/zones/zone4.png",
                        description: "A charming community of townhouses in a verdant setting.",
                        x: 0.66, y: 0.445,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone4/zone4_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone4/zone4_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone4/zone4_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "meadows1",
                                type: PROPERTY_TYPE.TOWNHOUSE,
                                videos: meadows_1_videos,
                                views: meadows_views,
                                blocks: [
                                    // Meadows 1
                                    {
                                        id: "Meadows-3",
                                        displayName: "Meadows 3",
                                        x: 0.847, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-3-u1",
                                                displayName: "Meadows 3 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-3-u2",
                                                displayName: "Meadows 3 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-4",
                                        displayName: "Meadows 4",
                                        x: 0.787, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-4-u1",
                                                displayName: "Meadows 4 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-4-u2",
                                                displayName: "Meadows 4 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-5",
                                        displayName: "Meadows 5",
                                        x: 0.728, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-5-u1",
                                                displayName: "Meadows 5 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-5-u2",
                                                displayName: "Meadows 5 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-6",
                                        displayName: "Meadows 6",
                                        x: 0.675, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-6-u1",
                                                displayName: "Meadows 6 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-6-u2",
                                                displayName: "Meadows 6 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-7",
                                        displayName: "Meadows 7",
                                        x: 0.619, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-7-u1",
                                                displayName: "Meadows 7 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-7-u2",
                                                displayName: "Meadows 7 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-8",
                                        displayName: "Meadows 8",
                                        x: 0.564, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-8-u1",
                                                displayName: "Meadows 8 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-8-u2",
                                                displayName: "Meadows 8 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-9",
                                        displayName: "Meadows 9",
                                        x: 0.508, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-9-u1",
                                                displayName: "Meadows 9 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-9-u2",
                                                displayName: "Meadows 9 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-10",
                                        displayName: "Meadows 10",
                                        x: 0.451, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-10-u1",
                                                displayName: "Meadows 10 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-10-u2",
                                                displayName: "Meadows 10 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-11",
                                        displayName: "Meadows 11",
                                        x: 0.396, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-11-u1",
                                                displayName: "Meadows 11 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-11-u2",
                                                displayName: "Meadows 11 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-12",
                                        displayName: "Meadows 12",
                                        x: 0.339, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-12-u1",
                                                displayName: "Meadows 12 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
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
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-13",
                                        displayName: "Meadows 13",
                                        x: 0.282, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-13-u1",
                                                displayName: "Meadows 13 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-13-u2",
                                                displayName: "Meadows 13 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-14",
                                        displayName: "Meadows 14",
                                        x: 0.23, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-14-u1",
                                                displayName: "Meadows 14 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-14-u2",
                                                displayName: "Meadows 14 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-15",
                                        displayName: "Meadows 15",
                                        x: 0.179, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-15-u1",
                                                displayName: "Meadows 15 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                            {
                                                id: "Meadows-15-u2",
                                                displayName: "Meadows 15 U2",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.75, y: 0.39,
                                                videos: meadows_units_videos[1],
                                            },

                                        ]
                                    },
                                    {
                                        id: "Meadows-16",
                                        displayName: "Meadows 16",
                                        x: 0.138, y: 0.504,
                                        units: [
                                            {
                                                id: "Meadows-16-u1",
                                                displayName: "Meadows 16 U1",
                                                unitTypeId: "meadows",
                                                price: 950000,
                                                area: 233,
                                                bedrooms: 3, bathrooms: 5,
                                                balconyView: meadows1_location,
                                                x: 0.27, y: 0.33,
                                                videos: meadows_units_videos[0],
                                            },
                                        ]
                                    },
                                ]
                            }
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
                                type: PROPERTY_TYPE.TOWNHOUSE,
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
                    // ZONE 6 OAK168
                    {
                        id: "zone6",
                        displayName: "Oak 168",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone6.png",
                        highlight: "kog/highlight/zones/zone6.png",
                        description: "A tranquil enclave of elegant contemporary townhouses surrounded by lush greenery.",
                        x: 0.785, y: 0.37,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone6/zone6_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone6/zone6_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone6/zone6_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "town",
                                type: PROPERTY_TYPE.TOWNHOUSE,
                                videos: oak168_videos,
                                views: oak168_views,
                                blocks: [
                                    // Oak168 10
                                    {
                                        id: "oak168-10",
                                        displayName: "Oak168 10",
                                        x: 0.775, y: 0.45,
                                        units: [
                                            {
                                                id: "oak168-10-u1",
                                                displayName: "U1",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.225, y: 0.72,
                                                videos: oak168_units[0],
                                            },
                                            {
                                                id: "oak168-10-u2",
                                                displayName: "U2",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.32, y: 0.72,
                                                videos: oak168_units[1],
                                            },
                                            {
                                                id: "oak168-10-u3",
                                                displayName: "U3",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.475, y: 0.72,
                                                videos: oak168_units[2],
                                            },
                                            {
                                                id: "oak168-10-u4",
                                                displayName: "U4",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.565, y: 0.72,
                                                videos: oak168_units[3],
                                            },
                                            {
                                                id: "oak168-10-u5",
                                                displayName: "U5",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.71, y: 0.72,
                                                videos: oak168_units[4],
                                            },
                                            {
                                                id: "oak168-10-u6",
                                                displayName: "U6",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.795, y: 0.72,
                                                videos: oak168_units[5],
                                            },
                                        ],
                                    },
                                    // Oak168 11
                                    {
                                        id: "oak168-11",
                                        displayName: "Oak168 11",
                                        x: 0.597, y: 0.45,
                                        units: [
                                            {
                                                id: "oak168-11-u1",
                                                displayName: "U1",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.795, y: 0.72,
                                                videos: oak168_units[0],
                                            },
                                            {
                                                id: "oak168-11-u2",
                                                displayName: "U2",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.71, y: 0.72,
                                                videos: oak168_units[1],
                                            },
                                            {
                                                id: "oak168-11-u3",
                                                displayName: "U3",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.565, y: 0.72,
                                                videos: oak168_units[2],
                                            },
                                            {
                                                id: "oak168-11-u4",
                                                displayName: "U4",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.475, y: 0.72,
                                                videos: oak168_units[3],
                                            },
                                            {
                                                id: "oak168-11-u5",
                                                displayName: "U5",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.32, y: 0.72,
                                                videos: oak168_units[4],
                                            },
                                            {
                                                id: "oak168-11-u6",
                                                displayName: "U6",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.225, y: 0.72,
                                                videos: oak168_units[5],
                                            },
                                        ],
                                    },
                                    // Oak168 12
                                    {
                                        id: "oak168-12",
                                        displayName: "Oak168 12",
                                        x: 0.414, y: 0.45,
                                        units: [
                                            {
                                                id: "oak168-12-u1",
                                                displayName: "U1",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.795, y: 0.72,
                                                videos: oak168_units[0],
                                            },
                                            {
                                                id: "oak168-12-u2",
                                                displayName: "U2",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.71, y: 0.72,
                                                videos: oak168_units[1],
                                            },
                                            {
                                                id: "oak168-12-u3",
                                                displayName: "U3",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.565, y: 0.72,
                                                videos: oak168_units[2],
                                            },
                                            {
                                                id: "oak168-12-u4",
                                                displayName: "U4",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.475, y: 0.72,
                                                videos: oak168_units[3],
                                            },
                                            {
                                                id: "oak168-12-u5",
                                                displayName: "U5",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.32, y: 0.72,
                                                videos: oak168_units[4],
                                            },
                                            {
                                                id: "oak168-12-u6",
                                                displayName: "U6",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.225, y: 0.72,
                                                videos: oak168_units[5],
                                            },
                                        ],
                                    },
                                    // Oak168 13
                                    {
                                        id: "oak168-13",
                                        displayName: "Oak168 13",
                                        x: 0.231, y: 0.45,
                                        units: [
                                            {
                                                id: "oak168-13-u1",
                                                displayName: "U1",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.795, y: 0.72,
                                                videos: oak168_units[0],
                                            },
                                            {
                                                id: "oak168-13-u2",
                                                displayName: "U2",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.71, y: 0.72,
                                                videos: oak168_units[1],
                                            },
                                            {
                                                id: "oak168-13-u3",
                                                displayName: "U3",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.565, y: 0.72,
                                                videos: oak168_units[2],
                                            },
                                            {
                                                id: "oak168-13-u4",
                                                displayName: "U4",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.475, y: 0.72,
                                                videos: oak168_units[3],
                                            },
                                            {
                                                id: "oak168-13-u5",
                                                displayName: "U5",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.32, y: 0.72,
                                                videos: oak168_units[4],
                                            },
                                            {
                                                id: "oak168-13-u6",
                                                displayName: "U6",
                                                unitTypeId: "oak168",
                                                price: 950000,
                                                area: 168,
                                                bedrooms: 3, bathrooms: 4,
                                                balconyView: oak168_location,
                                                x: 0.225, y: 0.72,
                                                videos: oak168_units[5],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    // ZONE 8 OAK 170
                    {
                        id: "zone8",
                        displayName: "Oak 170 1",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone8.png",
                        highlight: "kog/highlight/zones/zone8.png",
                        description: "A tranquil enclave of elegant contemporary townhouses surrounded by lush greenery.",
                        x: 0.61, y: 0.37,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone8/zone8_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone8/zone8_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone8/zone8_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "town",
                                type: PROPERTY_TYPE.TOWNHOUSE,
                                videos: oak170_z8_6u_videos,
                                views: oak170_6u_views,
                                blocks: [
                                    // Oak170 13
                                    {
                                        id: "oak170-13",
                                        displayName: "Oak170 13",
                                        x: 0.768, y: 0.43,
                                        units: oak170_z8_6u_units,
                                    },
                                    // Oak170 14
                                    {
                                        id: "oak170-14",
                                        displayName: "Oak170 14",
                                        x: 0.579, y: 0.43,
                                        units: oak170_z8_6u_units,
                                    },
                                    // Oak170 15
                                    {
                                        id: "oak170-15",
                                        displayName: "Oak170 15",
                                        x: 0.388, y: 0.43,
                                        units: oak170_z8_6u_units,
                                    },
                                    // Oak170 16
                                    {
                                        id: "oak170-16",
                                        displayName: "Oak170 16",
                                        x: 0.211, y: 0.43,
                                        units: oak170_z8_6u_units,
                                    },
                                ],
                            },
                        ],
                    },
                    // ZONE 7 OAK 170 4 UNITS
                    {
                        id: "zone7-1",
                        displayName: "Oak 170 2",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone7.png",
                        highlight: "kog/highlight/zones/zone7-2.jpg",
                        description: "A tranquil enclave of elegant contemporary townhouses surrounded by lush greenery.",
                        x: 0.2, y: 0.41,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone7/zone7_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone7/zone7_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone7/zone7_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "town",
                                type: PROPERTY_TYPE.TOWNHOUSE,
                                videos: oak170_4u_videos,
                                views: oak170_4u_views,
                                blocks: [
                                    // Oak170 17
                                    {
                                        id: "oak170-17",
                                        displayName: "Oak170 17",
                                        x: 0.83, y: 0.479,
                                        units: oak170_4u_units,
                                    },
                                    // Oak170 19
                                    {
                                        id: "oak170-19",
                                        displayName: "Oak170 19",
                                        x: 0.68, y: 0.479,
                                        units: oak170_4u_units,
                                    },
                                    // Oak17 21
                                    {
                                        id: "oak170-20",
                                        displayName: "Oak170 20",
                                        x: 0.571, y: 0.479,
                                        units: oak170_4u_units,
                                    },
                                    // Oak170 22
                                    {
                                        id: "oak170-22",
                                        displayName: "Oak170 22",
                                        x: 0.42, y: 0.479,
                                        units: oak170_4u_units,
                                    },
                                    // Oak170 23
                                    {
                                        id: "oak170-23",
                                        displayName: "Oak170 23",
                                        x: 0.308, y: 0.479,
                                        units: oak170_4u_units,
                                    },
                                    // Oak170 25
                                    {
                                        id: "oak170-25",
                                        displayName: "Oak170 25",
                                        x: 0.153, y: 0.479,
                                        units: oak170_4u_units,
                                    },
                                ],
                            },
                        ],
                    },
                    // ZONE 7 OAK 170 6 UNITS
                    {
                        id: "zone7-2",
                        displayName: "Oak 170 3",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone7.png",
                        highlight: "kog/highlight/zones/zone7-3.jpg",
                        description: "A tranquil enclave of elegant contemporary townhouses surrounded by lush greenery.",
                        x: 0.27, y: 0.37,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone7/zone7_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone7/zone7_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone7/zone7_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "town",
                                type: PROPERTY_TYPE.TOWNHOUSE,
                                videos: oak170_z7_6u_videos,
                                views: oak170_6u_views,
                                blocks: [
                                    // Oak170 18
                                    {
                                        id: "oak170-18",
                                        displayName: "Oak170 18",
                                        x: 0.756, y: 0.346,
                                        units: oak170_z7_6u_units,
                                    },
                                    // Oak170 21
                                    {
                                        id: "oak170-21",
                                        displayName: "Oak170 21",
                                        x: 0.497, y: 0.333,
                                        units: oak170_z7_6u_units,
                                    },
                                    // Oak170 24
                                    {
                                        id: "oak170-24",
                                        displayName: "Oak170 24",
                                        x: 0.269, y: 0.331,
                                        units: oak170_z7_6u_units,
                                    },
                                ],
                            },
                        ],
                    },
                    // ZONE 9 OAK 178
                    {
                        id: "zone9",
                        displayName: "Oak 178",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone9.png",
                        highlight: "kog/highlight/zones/zone9.png",
                        description: "A tranquil enclave of elegant contemporary townhouses surrounded by lush greenery.",
                        x: 0.79, y: 0.63,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone9/zone9_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone9/zone9_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone9/zone9_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "town",
                                type: PROPERTY_TYPE.TOWNHOUSE,
                                videos: oak178_z9_videos,
                                views: oak178_z9_views,
                                blocks: [
                                    // Oak170 5
                                    {
                                        id: "oak178-5",
                                        displayName: "Oak178 5",
                                        x: 0.21, y: 0.557,
                                        units: oak178_z9_units,
                                    },
                                    // Oak178 6
                                    {
                                        id: "oak178-6",
                                        displayName: "Oak178 6",
                                        x: 0.399, y: 0.557,
                                        units: oak178_z9_units,
                                    },
                                    // Oak178 7
                                    {
                                        id: "oak178-7",
                                        displayName: "Oak178 7",
                                        x: 0.586, y: 0.557,
                                        units: oak178_z9_units,
                                    },
                                    // Oak178 8
                                    {
                                        id: "oak178-8",
                                        displayName: "Oak178 8",
                                        x: 0.775, y: 0.557,
                                        units: oak178_z9_units,
                                    },
                                ],
                            },
                        ],
                    },
                    // ZONE 10 OAK 178 NEW
                    {
                        id: "zone10",
                        displayName: "Oak 178 New",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone10.png",
                        highlight: "kog/highlight/zones/zone10.png",
                        description: "A tranquil enclave of elegant contemporary townhouses surrounded by lush greenery.",
                        x: 0.393, y: 0.65,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone10/zone10_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone10/zone10_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone10/zone10_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "town",
                                type: PROPERTY_TYPE.TOWNHOUSE,
                                videos: oak178_z10_videos,
                                views: oak178_z10_views,
                                blocks: [
                                    // Oak178 4
                                    {
                                        id: "Oak178-4",
                                        displayName: "Oak178 4",
                                        x: 0.846, y: 0.553,
                                        units: oak178_z10_units,
                                    },
                                    // Oak178 3
                                    {
                                        id: "Oak178-3",
                                        displayName: "Oak178 3",
                                        x: 0.788, y: 0.553,
                                        units: oak178_z10_units,
                                    },
                                    // Oak178 2
                                    {
                                        id: "Oak178-2",
                                        displayName: "Oak178 2",
                                        x: 0.73, y: 0.553,
                                        units: oak178_z10_units,
                                    },
                                    // Oak178 1A
                                    {
                                        id: "Oak178-1A",
                                        displayName: "Oak178 1A",
                                        x: 0.672, y: 0.553,
                                        units: oak178_z10_units,
                                    },
                                    // Oak178 1
                                    {
                                        id: "Oak178-1",
                                        displayName: "Oak178 1",
                                        x: 0.614, y: 0.553,
                                        units: oak178_z10_units,
                                    },
                                    // Oak178 32
                                    {
                                        id: "Oak178-32",
                                        displayName: "Oak178 32",
                                        x: 0.507, y: 0.565,
                                        units: oak178_z10_units,
                                    },
                                    // Oak178 31
                                    {
                                        id: "Oak178-31",
                                        displayName: "Oak178 31",
                                        x: 0.448, y: 0.565,
                                        units: oak178_z10_units,
                                    },
                                    // Oak178 30
                                    {
                                        id: "Oak178-30",
                                        displayName: "Oak178 30",
                                        x: 0.391, y: 0.565,
                                        units: oak178_z10_units,
                                    },
                                    // Oak178 29
                                    {
                                        id: "Oak178-29",
                                        displayName: "Oak178 29",
                                        x: 0.331, y: 0.565,
                                        units: oak178_z10_units,
                                    },
                                    // Oak178 28
                                    {
                                        id: "Oak178-28",
                                        displayName: "Oak178 28",
                                        x: 0.273, y: 0.565,
                                        units: oak178_z10_units,
                                    },
                                    // Oak178 27
                                    {
                                        id: "Oak178-27",
                                        displayName: "Oak178 27",
                                        x: 0.216, y: 0.565,
                                        units: oak178_z10_units,
                                    },
                                    // Oak178 26
                                    {
                                        id: "Oak178-26",
                                        displayName: "Oak178 26",
                                        x: 0.156, y: 0.565,
                                        units: oak178_z10_units,
                                    },
                                ],
                            },
                        ],
                    },
                    // ZONE 11 CAMILIA 1
                    {
                        id: "zone11",
                        displayName: "CAMILIA 1",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone11.png",
                        highlight: "kog/highlight/zones/zone11.png",
                        description: "A serene community of luxury villas and modern townhouses nestled in nature.",
                        x: 0.855, y: 0.52,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone11/zone11_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone11/zone11_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone11/zone11_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "camilia-z11",
                                type: PROPERTY_TYPE.VILLA,
                                videos: camilia_1_videos,
                                views: camilia_views,
                                units: [
                                    {
                                        id: "CAMILIA-1A",
                                        unitTypeId: "camilia",
                                        displayName: "CAMILIA 1A",
                                        price: 2200000,
                                        area: 385,
                                        bedrooms: 5, bathrooms: 7,
                                        balconyView: camilia_1_location,
                                        x: 0.423, y: 0.481,
                                    },
                                    {
                                        id: "CAMILIA-1B",
                                        unitTypeId: "camilia",
                                        displayName: "CAMILIA 1B",
                                        price: 2200000,
                                        area: 385,
                                        bedrooms: 5, bathrooms: 7,
                                        balconyView: camilia_1_location,
                                        x: 0.516, y: 0.481,
                                    },
                                ],
                            },
                        ],
                    },
                    // ZONE 12 CAMILIA 2
                    {
                        id: "zone12",
                        displayName: "CAMILIA 2",
                        subtitle: "Residential Zone",
                        thumbnail: "kog/thumbnails/zones/zone12.png",
                        highlight: "kog/highlight/zones/zone12.png",
                        description: "A serene community of luxury villas and modern townhouses nestled in nature.",
                        x: 0.4, y: 0.39,
                        videos: {
                            forwardVideo: "/kog/videos/zones/zone12/zone12_gen_trans.mp4",
                            reverseVideo: "/kog/videos/zones/zone12/zone12_gen_rev.mp4",
                            idleVideo: "/kog/videos/zones/zone12/zone12_gen_idle.mp4",
                        },
                        properties: [
                            {
                                id: "camilia-z12",
                                type: PROPERTY_TYPE.VILLA,
                                videos: camilia_2_videos,
                                views: camilia_views,
                                units: [
                                    {
                                        id: "CAMILIA-2",
                                        unitTypeId: "camilia",
                                        displayName: "CAMILIA 2",
                                        price: 2200000,
                                        area: 385,
                                        bedrooms: 5, bathrooms: 7,
                                        balconyView: camilia_2_location,
                                        x: 0.765, y: 0.245,
                                    },
                                    {
                                        id: "CAMILIA-3",
                                        unitTypeId: "camilia",
                                        displayName: "CAMILIA 3",
                                        price: 2200000,
                                        area: 385,
                                        bedrooms: 5, bathrooms: 7,
                                        balconyView: camilia_2_location,
                                        x: 0.26, y: 0.245,
                                    },
                                ],
                            },
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
                                            { id: "hp4", yaw: -52, pitch: -17, type: "scene", label: "Ground/Toilet" },
                                            { id: "hp5", yaw: -171.43, pitch: -14.63, type: "scene", label: "Ground/Living 1" },
                                            { id: "hp6", yaw: -105.42, pitch: -55.75, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "g-living01",
                                        displayName: "Living 1",
                                        furnitureImgId: "/kog/panorama/family_midd/f/ground/living01.jpg",
                                        unfurnitureImgId: "/kog/panorama/family_midd/unf/ground/living01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -17.89, pitch: -13.36, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g-living02",
                                        displayName: "Living 2",
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
                                        furnitureImgId: "/kog/panorama/Family_corner/f/ground/entrance_corner.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/ground/entrance_corner.jpg",
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
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/first/m.bedroom_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -90.09, pitch: -46.01, type: "scene", label: "First/Master Bedroom Dressing" }
                                        ]
                                    },
                                    {
                                        id: "f1-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/Family_corner/f/first/toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/Family_corner/unf/first/toilet.jpg",
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

                "iris": {
                    id: "iris",
                    bedrooms: 6, bathrooms: 7,
                    serviceRooms: null,
                    area: 293,
                    roofarea: 113,
                    gallery: [
                        { id: "v1", src: "/kog/images/iris/CAM03-Iris Villa Street View NO PPL.jpg" },
                        { id: "v2", src: "/kog/images/iris/CAM04-Iris Villa garden View No People.jpg" },
                    ],
                    cutSections: [
                        { id: "c1", src: "/kog/cut_section/iris/g.png" },
                        { id: "c2", src: "/kog/cut_section/iris/1.png" },
                        { id: "c3", src: "/kog/cut_section/iris/r.png" },
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
                                        id: "gr_entrance",
                                        displayName: "Entrance",
                                        furnitureImgId: "/kog/panorama/iris/f/ground/entrance_iris.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/ground/entrance_iris.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 170, pitch: -10,
                                                type: "scene",
                                                label: "Ground/Living",
                                            },
                                            {
                                                id: "hp2",
                                                yaw: 172, pitch: -32,
                                                type: "scene",
                                                label: "Ground/Dining",
                                            },
                                            {
                                                id: "hp3",
                                                yaw: 50, pitch: -19,
                                                type: "scene",
                                                label: "Ground/Kitchen",
                                            },
                                            {
                                                id: "hp4",
                                                yaw: -90, pitch: -25,
                                                type: "scene",
                                                label: "Ground/Toilet",
                                            },
                                            {
                                                id: "hp5",
                                                yaw: 0, pitch: -55,
                                                type: "scene",
                                                label: "First/Corridor",
                                            },
                                        ],
                                    },
                                    {
                                        id: "gr_living",
                                        displayName: "Living",
                                        furnitureImgId: "/kog/panorama/iris/f/ground/1_living_high.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/ground/living.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: -30, pitch: -12,
                                                type: "scene",
                                                label: "Ground/Entrance",
                                            },
                                        ],
                                    },
                                    {
                                        id: "gr-dining",
                                        displayName: "Dining",
                                        furnitureImgId: "/kog/panorama/iris/f/ground/2_dining_high.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/ground/dining.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 160, pitch: -17,
                                                type: "scene",
                                                label: "Ground/Living",
                                            },
                                            {
                                                id: "hp2",
                                                yaw: 25, pitch: -25,
                                                type: "scene",
                                                label: "Ground/Kitchen",
                                            },
                                            {
                                                id: "hp3",
                                                yaw: -60, pitch: -25,
                                                type: "scene",
                                                label: "Ground/Toilet",
                                            },
                                        ],
                                    },
                                    {
                                        id: "gr-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/iris/f/ground/3_toilet_high.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/ground/toilet.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 192, pitch: -35,
                                                type: "scene",
                                                label: "Ground/Entrance",
                                            },
                                        ],
                                    },
                                    {
                                        id: "gr-kitchen",
                                        displayName: "Kitchen",
                                        furnitureImgId: "/kog/panorama/iris/f/ground/4_kitchen.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/ground/kitchen.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 235, pitch: -25,
                                                type: "scene",
                                                label: "Ground/Entrance",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "first",
                                name: "First",
                                rooms: [
                                    {
                                        id: "f1-corridor",
                                        displayName: "Corridor",
                                        furnitureImgId: "/kog/panorama/iris/f/first/corridor.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/first/corridor.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 32, pitch: -42,
                                                type: "scene",
                                                label: "Ground/Entrance",
                                            },
                                            {
                                                id: "hp2",
                                                yaw: 5, pitch: -50,
                                                type: "scene",
                                                label: "Roof/Room",
                                            },
                                            {
                                                id: "hp3",
                                                yaw: -125, pitch: -25,
                                                type: "scene",
                                                label: "First/Living",
                                            },
                                            {
                                                id: "hp4",
                                                yaw: 170, pitch: -20,
                                                type: "scene",
                                                label: "First/Master Bedroom Corridor",
                                            },
                                            {
                                                id: "hp5",
                                                yaw: 145, pitch: -30,
                                                type: "scene",
                                                label: "First/Bedroom 1",
                                            },
                                            {
                                                id: "hp6",
                                                yaw: 55, pitch: -30,
                                                type: "scene",
                                                label: "First/Bedroom 2",
                                            },
                                            {
                                                id: "hp7",
                                                yaw: -55, pitch: -35,
                                                type: "scene",
                                                label: "First/Bedroom 3",
                                            },
                                            {
                                                id: "hp8",
                                                yaw: -93, pitch: -27,
                                                type: "scene",
                                                label: "First/Toilet",
                                            },
                                        ],
                                    },
                                    {
                                        id: "f1-living",
                                        displayName: "Living",
                                        furnitureImgId: "/kog/panorama/iris/f/first/6_living_high.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/first/living_first.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 52,
                                                pitch: -22,
                                                type: "scene",
                                                label: "First/Corridor",
                                            }
                                        ],
                                    },
                                    {
                                        id: "f1-master-bedroom-corridor",
                                        displayName: "Master Bedroom Corridor",
                                        furnitureImgId: "/kog/panorama/iris/f/first/7_m.bed_corridor.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/first/m.bedroom_corridor.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 175, pitch: -20,
                                                type: "scene",
                                                label: "First/Master Bedroom",
                                            },
                                            {
                                                id: "hp2",
                                                yaw: 0, pitch: -15,
                                                type: "scene",
                                                label: "First/Corridor",
                                            },
                                            {
                                                id: "hp3",
                                                yaw: 90, pitch: -25,
                                                type: "scene",
                                                label: "First/Master Toilet",
                                            }
                                        ],
                                    },
                                    {
                                        id: "f1-master-toilet",
                                        displayName: "Master Toilet",
                                        furnitureImgId: "/kog/panorama/iris/f/first/8_m.bed_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/first/m.bedroom_toilet.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: -90, pitch: -25,
                                                type: "scene",
                                                label: "First/Master Bedroom Corridor",
                                            }
                                        ],
                                    },
                                    {
                                        id: "f1-master-bedroom",
                                        displayName: "Master Bedroom",
                                        furnitureImgId: "/kog/panorama/iris/f/first/9_m.bedroom.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/first/m.bedroom.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: -7,
                                                pitch: -20,
                                                type: "scene",
                                                label: "First/Master Bedroom Corridor",
                                            }
                                        ],
                                    },
                                    {
                                        id: "f1-bedroom1",
                                        displayName: "Bedroom 1",
                                        furnitureImgId: "/kog/panorama/iris/f/first/bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/first/bedroom01.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 155,
                                                pitch: -22,
                                                type: "scene",
                                                label: "First/Corridor",
                                            },
                                            {
                                                id: "hp2",
                                                yaw: -105,
                                                pitch: -35,
                                                type: "scene",
                                                label: "First/Bedroom 1 Dressing Room",
                                            }
                                        ],
                                    },
                                    {
                                        id: "f1-bedroom2",
                                        displayName: "Bedroom 2",
                                        furnitureImgId: "/kog/panorama/iris/f/first/bedroom02.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/first/bedroom02.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: -8,
                                                pitch: -15,
                                                type: "scene",
                                                label: "First/Corridor",
                                            }
                                        ],
                                    },
                                    {
                                        id: "f1-bedroom3",
                                        displayName: "Bedroom 3",
                                        furnitureImgId: "/kog/panorama/iris/f/first/10_bedroom03.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/first/bedroom03.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 160, pitch: -25,
                                                type: "scene",
                                                label: "First/Corridor",
                                            }
                                        ],
                                    },
                                    {
                                        id: "f1-bedroom1-dressing",
                                        displayName: "Bedroom 1 Dressing Room",
                                        furnitureImgId: "/kog/panorama/iris/f/first/bedroom01_dressing.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/first/bedroom01_dressing.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 180,
                                                pitch: 0,
                                                type: "scene",
                                                label: "First/Bedroom 1",
                                            },
                                            {
                                                id: "hp2",
                                                yaw: 160,
                                                pitch: 0,
                                                type: "scene",
                                                label: "First/Bedroom 1 Toilet",
                                            },
                                        ],
                                    },
                                    {
                                        id: "f1-bedroom1-toilet",
                                        displayName: "Bedroom 1 Toilet",
                                        furnitureImgId: "/kog/panorama/iris/f/first/bedroom01_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/first/bedroom01_toilet.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 180,
                                                pitch: 0,
                                                type: "scene",
                                                label: "First/Bedroom 1",
                                            }
                                        ],
                                    },
                                    {
                                        id: "f1-toilet",
                                        displayName: "First Toilet",
                                        furnitureImgId: "/kog/panorama/iris/f/first/f1_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/first/f1_toilet.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: 4, pitch: -35,
                                                type: "scene",
                                                label: "First/Corridor",
                                            }
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "roof",
                                name: "Roof",
                                rooms: [
                                    {
                                        id: "roof-room",
                                        displayName: "Room",
                                        furnitureImgId: "/kog/panorama/iris/f/roof/roof_room.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/roof/roof_room.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: -245, pitch: -25,
                                                type: "scene",
                                                label: "Roof/Toilet",
                                            },
                                            {
                                                id: "hp2",
                                                yaw: -280, pitch: -35,
                                                type: "scene",
                                                label: "First/Corridor",
                                            },
                                        ],
                                    },
                                    {
                                        id: "roof-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/iris/f/roof/roof_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/iris/unf/roof/roof_toilet.jpg",
                                        hotspots: [
                                            {
                                                id: "hp1",
                                                yaw: -100,
                                                pitch: -35,
                                                type: "scene",
                                                label: "Roof/Room",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                },

                "meadows": {
                    id: "meadows",
                    bedrooms: 3, bathrooms: 5,
                    serviceRooms: null,
                    area: 233,
                    roofarea: 76,
                    gallery: [
                        { id: "m1", src: "/kog/images/meadows/01-FRONT TWIN P3.jpg" },
                        { id: "m2", src: "/kog/images/meadows/02-TWIN BACK.jpg" },
                        { id: "m3", src: "/kog/images/meadows/03-TWIN BACK.jpg" },
                    ],
                    cutSections: [
                        { id: "c1", src: "/kog/cut_section/meadows/g.png" },
                        { id: "c2", src: "/kog/cut_section/meadows/1.png" },
                        { id: "c3", src: "/kog/cut_section/meadows/r.png" },
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
                                        furnitureImgId: "/kog/panorama/Meadows/f/ground/entrance.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/ground/unf_entrance.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 94.17, pitch: -13.89, type: "scene", label: "Ground/Living" },
                                            { id: "hp2", yaw: 50.8, pitch: -36.87, type: "scene", label: "Ground/Toilet" },
                                            { id: "hp3", yaw: 83.01, pitch: -27.42, type: "scene", label: "First/Corridor" },
                                            { id: "hp4", yaw: 105.25, pitch: -21.23, type: "scene", label: "Ground/Dining" },
                                            { id: "hp5", yaw: 164.71, pitch: -35.51, type: "scene", label: "Ground/Kitchen" }
                                        ]
                                    },
                                    {
                                        displayName: "Dining",
                                        furnitureImgId: "/kog/panorama/Meadows/f/ground/dining.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/ground/dining.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 89.78, pitch: -26.19, type: "scene", label: "Ground/Living" },
                                            { id: "hp2", yaw: -45.18, pitch: -56.34, type: "scene", label: "First/Corridor" },
                                            { id: "hp3", yaw: -86.62, pitch: -27.07, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g-living",
                                        displayName: "Living",
                                        furnitureImgId: "/kog/panorama/Meadows/f/ground/living.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/ground/living.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -78.88, pitch: -36.34, type: "scene", label: "Ground/Dining" },
                                            { id: "hp2", yaw: -90.48, pitch: -16.79, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g-kitchen",
                                        displayName: "Kitchen",
                                        furnitureImgId: "/kog/panorama/Meadows/f/ground/kitchen.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/ground/kitchen.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 162.2, pitch: -32.3, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/Meadows/f/ground/g.toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/ground/g.toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -0.31, pitch: -37.05, type: "scene", label: "Ground/Entrance" }
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
                                        furnitureImgId: "/kog/panorama/Meadows/f/first/corridor.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/first/corridor.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 21.49, pitch: -53.88, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: -37.97, pitch: -48.52, type: "scene", label: "Roof/Roof Room" },
                                            { id: "hp3", yaw: -78.93, pitch: -34.8, type: "scene", label: "First/Bedroom 2" },
                                            { id: "hp4", yaw: -129.2, pitch: -47.37, type: "scene", label: "First/Toilet" },
                                            { id: "hp5", yaw: -91.67, pitch: -18.41, type: "scene", label: "First/Bedroom 1" },
                                            { id: "hp6", yaw: 95.01, pitch: -27.07, type: "scene", label: "First/Master Bedroom" },
                                            { id: "hp7", yaw: 50.41, pitch: -22.24, type: "scene", label: "First/Living 2" },
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom01",
                                        displayName: "Bedroom 1",
                                        furnitureImgId: "/kog/panorama/Meadows/f/first/bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/first/bedroom01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 108.24, pitch: -25.8, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom02",
                                        displayName: "Bedroom 2",
                                        furnitureImgId: "/kog/panorama/Meadows/f/first/bedroom02.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/first/bedroom02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 46.58, pitch: -29.49, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-living02",
                                        displayName: "Living 2",
                                        furnitureImgId: "/kog/panorama/Meadows/f/first/living02.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/first/living02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -58.49, pitch: -17.67, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom",
                                        displayName: "Master Bedroom",
                                        furnitureImgId: "/kog/panorama/Meadows/f/first/m.bedroom.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/first/m.bedroom.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 3.16, pitch: -14.28, type: "scene", label: "First/Corridor" },
                                            { id: "hp2", yaw: 4.83, pitch: -26.15, type: "scene", label: "First/Master Bedroom Dressing" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom_dressing",
                                        displayName: "Master Bedroom Dressing",
                                        furnitureImgId: "/kog/panorama/Meadows/f/first/m.bedroom_dressing.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/first/m.bedroom_dressing.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 158.03, pitch: -50.14, type: "scene", label: "First/Master Bedroom" },
                                            { id: "hp2", yaw: -83.06, pitch: -54.71, type: "scene", label: "First/Master Bedroom Toilet" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom_toilet",
                                        displayName: "Master Bedroom Toilet",
                                        furnitureImgId: "/kog/panorama/Meadows/f/first/m.bedroom_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/first/m.bedroom_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 84.02, pitch: -51.72, type: "scene", label: "First/Master Bedroom Dressing" }
                                        ]
                                    },
                                    {
                                        id: "f1-toilet01",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/Meadows/f/first/toilet01.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/first/toilet01.jpg",
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
                                        furnitureImgId: "/kog/panorama/Meadows/f/roof/roof_room.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/roof/roof_room.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 96.59, pitch: -17.8, type: "scene", label: "First/Corridor" },
                                            { id: "hp2", yaw: 110.52, pitch: -17.01, type: "scene", label: "Roof/Roof Toilet" }
                                        ]
                                    },
                                    {
                                        id: "r-roof_toilet",
                                        displayName: "Roof Toilet",
                                        furnitureImgId: "/kog/panorama/Meadows/f/roof/roof_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/Meadows/unf/roof/roof_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 13.8, pitch: -31.11, type: "scene", label: "Roof/Roof Room" },
                                            { id: "hp2", yaw: 21.14, pitch: -23.29, type: "scene", label: "First/Corridor" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }

                },

                "camilia": {
                    id: "camilia",
                    bedrooms: 5, bathrooms: 7,
                    serviceRooms: null,
                    area: 385,
                    roofarea: 139,
                    gallery: [
                        { id: "v1", src: "/kog/images/camilia/CAM01-PROTOTYPE FOREST FRONT VIEW NO PPL.jpg" },
                        { id: "v2", src: "/kog/images/camilia/CAM02-PROTOTYPE FOREST BACK VIEW NO PPL.jpg" },
                    ],
                    cutSections: [
                        { id: "c1", src: "/kog/cut_section/Camilia/g.png" },
                        { id: "c2", src: "/kog/cut_section/Camilia/1.png" },
                        { id: "c3", src: "/kog/cut_section/Camilia/r.png" },
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
                                        id: "entrance",
                                        displayName: "Entrance",
                                        furnitureImgId: "/kog/panorama/camilia/f/ground/entrance_camilia.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/ground/entrance_camilia.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -146.43, pitch: -11.69, type: "scene", label: "Ground/Living 2" },
                                            { id: "hp2", yaw: 171.21, pitch: -10.9, type: "scene", label: "Ground/Living 1" },
                                            { id: "hp3", yaw: 40.08, pitch: -21.36, type: "scene", label: "Ground/Bedroom" },
                                            { id: "hp4", yaw: 160.62, pitch: -29.88, type: "scene", label: "First/Corridor" },
                                            { id: "hp5", yaw: -145.06, pitch: -22.98, type: "scene", label: "Ground/Dining" },
                                            { id: "hp6", yaw: -108.19, pitch: -30.06, type: "scene", label: "Ground/Kitchen" }
                                        ]
                                    },
                                    {
                                        id: "dining",
                                        displayName: "Dining",
                                        furnitureImgId: "/kog/panorama/camilia/f/ground/dining.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/ground/dining.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 137.5, pitch: -18.06, type: "scene", label: "Ground/Living 1" },
                                            { id: "hp2", yaw: -135.22, pitch: -23.47, type: "scene", label: "Ground/Living 2" },
                                            { id: "hp3", yaw: 74.62, pitch: -25.14, type: "scene", label: "First/Corridor" },
                                            { id: "hp4", yaw: 19.56, pitch: -25.62, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g.toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/camilia/f/ground/g.toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/ground/g.toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -45.22, pitch: -34.94, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "kitchen",
                                        displayName: "Kitchen",
                                        furnitureImgId: "/kog/panorama/camilia/f/ground/kitchen.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/ground/kitchen.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 140.1, pitch: -16.52, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "living 1",
                                        displayName: "Living 1",
                                        furnitureImgId: "/kog/panorama/camilia/f/ground/living01.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/ground/living01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -17.89, pitch: -13.36, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "living02",
                                        displayName: "Living 2",
                                        furnitureImgId: "/kog/panorama/camilia/f/ground/living02.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/ground/living02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 28.26, pitch: -14.24, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: 17.97, pitch: -23.95, type: "scene", label: "Ground/Dining" }
                                        ]
                                    },
                                    {
                                        id: "bedroom",
                                        displayName: "Bedroom",
                                        furnitureImgId: "/kog/panorama/camilia/f/ground/bedroom.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/ground/bedroom.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 169.06, pitch: -27.91, type: "scene", label: "Ground/Bedroom Toilet" },
                                            { id: "hp2", yaw: -152.18, pitch: -13.71, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "bedroom_toilet",
                                        displayName: "Bedroom Toilet",
                                        furnitureImgId: "/kog/panorama/camilia/f/ground/bedroom_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/ground/bedroom_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -20.08, pitch: -27.16, type: "scene", label: "Ground/Bedroom" }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: "first",
                                name: "First",
                                rooms: [
                                    {
                                        id: "bedroom01",
                                        displayName: "Bedroom 1",
                                        furnitureImgId: "/kog/panorama/camilia/f/first/bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/first/bedroom01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -4.22, pitch: -36.91, type: "scene", label: "First/Bedroom 1 Toilet" },
                                            { id: "hp2", yaw: -9.54, pitch: -18.02, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "bedroom01_toilet",
                                        displayName: "Bedroom 1 Toilet",
                                        furnitureImgId: "/kog/panorama/camilia/f/first/bedroom01_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/first/bedroom01_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -95.54, pitch: -44.78, type: "scene", label: "First/Bedroom 1" }
                                        ]
                                    },
                                    {
                                        id: "bedroom02",
                                        displayName: "Bedroom 2",
                                        furnitureImgId: "/kog/panorama/camilia/f/first/bedroom02.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/first/bedroom02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -169.67, pitch: -21.67, type: "scene", label: "First/Corridor" },
                                            { id: "hp2", yaw: -133.64, pitch: -25.4, type: "scene", label: "First/Bedroom 2 Toilet" }
                                        ]
                                    },
                                    {
                                        id: "bedroom02_toilet",
                                        displayName: "Bedroom 2 Toilet",
                                        furnitureImgId: "/kog/panorama/camilia/f/first/bedroom02_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/first/bedroom02_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 43.37, pitch: -26.2, type: "scene", label: "First/Bedroom 2" }
                                        ]
                                    },
                                    {
                                        id: "bedroom03",
                                        displayName: "Bedroom 3",
                                        furnitureImgId: "/kog/panorama/camilia/f/first/bedroom03.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/first/bedroom03.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 176.92, pitch: -29.49, type: "scene", label: "First/Bedroom 2 Toilet" },
                                            { id: "hp2", yaw: -173.45, pitch: -17.93, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "corridor",
                                        displayName: "Corridor",
                                        furnitureImgId: "/kog/panorama/camilia/f/first/corridor_camilia.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/first/corridor_camilia.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -126.25, pitch: -21.88, type: "scene", label: "First/Living 3" },
                                            { id: "hp2", yaw: 161.63, pitch: -41.84, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp3", yaw: 36.61, pitch: -55.9, type: "scene", label: "Roof/Roof Room" },
                                            { id: "hp4", yaw: -86.04, pitch: -15.91, type: "scene", label: "First/Master Bedroom" },
                                            { id: "hp5", yaw: -76.6, pitch: -16, type: "scene", label: "First/Bedroom 2" },
                                            { id: "hp6", yaw: -176.84, pitch: -19.07, type: "scene", label: "First/Bedroom 1" },
                                            { id: "hp7", yaw: 5.71, pitch: -18.06, type: "scene", label: "First/Bedroom 3" }
                                        ]
                                    },
                                    {
                                        id: "living03",
                                        displayName: "Living 3",
                                        furnitureImgId: "/kog/panorama/camilia/f/first/living03.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/first/living03.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 41.79, pitch: -24.79, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "m.bedroom",
                                        displayName: "Master Bedroom",
                                        furnitureImgId: "/kog/panorama/camilia/f/first/m.bedroom.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/first/m.bedroom.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 4.83, pitch: -26.15, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "m_bedroom_toilet",
                                        displayName: "Master Bedroom Toilet",
                                        furnitureImgId: "/kog/panorama/camilia/f/first/m_bedroom_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/first/m_bedroom_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 97.03, pitch: -50.1, type: "scene", label: "First/Master Bedroom" }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: "roof",
                                name: "Roof",
                                rooms: [
                                    {
                                        id: "roof_room",
                                        displayName: "Room",
                                        furnitureImgId: "/kog/panorama/camilia/f/roof/roof_room.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/roof/roof_room.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 117.47, pitch: -24.48, type: "scene", label: "Roof/Toilet" },
                                            { id: "hp2", yaw: 79.58, pitch: -33.71, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/camilia/f/roof/roof_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/camilia/unf/roof/roof_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -101.6, pitch: -35.77, type: "scene", label: "Roof/Room" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                },

                "oak168": {
                    id: "oak168",
                    bedrooms: 3, bathrooms: 4,
                    area: 168,
                    roofarea: 55,
                    serviceRooms: null,
                    gallery: [
                        { id: "t1", src: "/kog/images/oak168/01-FRONT TOWN 6S.jpg" },
                        { id: "t2", src: "/kog/images/oak168/BACK.jpg" }
                    ],
                    cutSections: [
                        { id: "c1", src: "/kog/cut_section/oak168/g.png" },
                        { id: "c2", src: "/kog/cut_section/oak168/1.png" },
                        { id: "c3", src: "/kog/cut_section/oak168/r.png" },
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
                                        furnitureImgId: "/kog/panorama/Oak168/f/ground/entrance.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/ground/entrance.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 104.99, pitch: -14.55, type: "scene", label: "Ground/Living" },
                                            { id: "hp2", yaw: 103.49, pitch: -26.19, type: "scene", label: "Ground/Dining" },
                                            { id: "hp3", yaw: 154.6, pitch: -42.06, type: "scene", label: "Ground/Kitchen" },
                                            { id: "hp4", yaw: 50.54, pitch: -54.8, type: "scene", label: "First/Corridor" },
                                            { id: "hp5", yaw: -15.56, pitch: -43.9, type: "scene", label: "Ground/Toilet" }
                                        ]
                                    },
                                    {
                                        id: "g-dining",
                                        displayName: "Dining",
                                        furnitureImgId: "/kog/panorama/Oak168/f/ground/dining.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/ground/dining.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -107.84, pitch: -32.52, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: -45.66, pitch: -34.98, type: "scene", label: "Ground/Kitchen" },
                                            { id: "hp3", yaw: 102.04, pitch: -18.28, type: "scene", label: "Ground/Living" }
                                        ]
                                    },
                                    {
                                        id: "g-living",
                                        displayName: "Living",
                                        furnitureImgId: "/kog/panorama/Oak168/f/ground/living.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/ground/living.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -90.35, pitch: -16.7, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: -71.5, pitch: -12.57, type: "scene", label: "Ground/Kitchen" }
                                        ]
                                    },
                                    {
                                        id: "g-kitchen",
                                        displayName: "Kitchen",
                                        furnitureImgId: "/kog/panorama/Oak168/f/ground/kitchen.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/ground/kitchen.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 163.43, pitch: -31.07, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: 111.97, pitch: -13.89, type: "scene", label: "Ground/Living" }
                                        ]
                                    },
                                    {
                                        id: "g-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/Oak168/f/ground/g.toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/ground/g.toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 4.83, pitch: -45.18, type: "scene", label: "Ground/Entrance" }
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
                                        furnitureImgId: "/kog/panorama/Oak168/f/first/corridor.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/first/corridor.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 81.34, pitch: -25.14, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: 145.2, pitch: -30.81, type: "scene", label: "First/Bedroom 1" },
                                            { id: "hp3", yaw: 89.6, pitch: -11.29, type: "scene", label: "First/Master Bedroom" },
                                            { id: "hp4", yaw: -89.56, pitch: -22.72, type: "scene", label: "First/Toilet" },
                                            { id: "hp5", yaw: -133.24, pitch: -28.39, type: "scene", label: "First/Bedroom 2" },
                                            { id: "hp6", yaw: -79.41, pitch: -36.08, type: "scene", label: "Roof/Roof Room" }
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom01",
                                        displayName: "Bedroom 1",
                                        furnitureImgId: "/kog/panorama/Oak168/f/first/bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/first/bedroom01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -122.78, pitch: -30.06, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom02",
                                        displayName: "Bedroom 2",
                                        furnitureImgId: "/kog/panorama/Oak168/f/first/bedroom02.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/first/bedroom02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 136.67, pitch: -33.27, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom",
                                        displayName: "Master Bedroom",
                                        furnitureImgId: "/kog/panorama/Oak168/f/first/m.bedroom.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/first/m.bedroom.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -71.72, pitch: -26.24, type: "scene", label: "First/Master Bedroom Toilet" },
                                            { id: "hp2", yaw: -80.24, pitch: -17.93, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom_toilet",
                                        displayName: "Master Bedroom Toilet",
                                        furnitureImgId: "/kog/panorama/Oak168/f/first/m.bedroom_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/first/m.bedroom_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 167.7, pitch: -50.67, type: "scene", label: "First/Master Bedroom" }
                                        ]
                                    },
                                    {
                                        id: "f1-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/Oak168/f/first/toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/first/toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 89.82, pitch: -34.98, type: "scene", label: "First/Corridor" }
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
                                        furnitureImgId: "/kog/panorama/Oak168/f/roof/roof_room.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/roof/roof_room.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 144.71, pitch: -38.36, type: "scene", label: "First/Corridor" },
                                            { id: "hp2", yaw: 71.02, pitch: -34.67, type: "scene", label: "Roof/Roof Toilet" }
                                        ]
                                    },
                                    {
                                        id: "r-roof_toilet",
                                        displayName: "Roof Toilet",
                                        furnitureImgId: "/kog/panorama/Oak168/f/roof/roof_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/Oak168/unf/roof/roof_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -101.6, pitch: -35.77, type: "scene", label: "Roof/Roof Room" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                },

                "oak170": {
                    id: "oak170",
                    bedrooms: 3, bathrooms: 4,
                    serviceRooms: null,
                    area: 170,
                    roofarea: 46,
                    gallery: [
                        { id: "o1", src: "/kog/images/oak170/001-OAK 173 FRONT.jpg" },
                        { id: "o2", src: "/kog/images/oak170/02-OAK 173 BACK.jpg" },
                    ],
                    cutSections: [
                        { id: "c1", src: "/kog/cut_section/Oak170/1.png" },
                        { id: "c2", src: "/kog/cut_section/Oak170/g.png" },
                        { id: "c3", src: "/kog/cut_section/Oak170/r.png" },
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
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/ground/entrance.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/ground/entrance.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -78.66, pitch: -15.82, type: "scene", label: "Ground/Living" },
                                            { id: "hp2", yaw: -79.58, pitch: -34.45, type: "scene", label: "Ground/Dining" },
                                            { id: "hp3", yaw: 64.34, pitch: -42.01, type: "scene", label: "Ground/Toilet" },
                                            { id: "hp4", yaw: 164.53, pitch: -43.9, type: "scene", label: "Ground/Kitchen" },
                                            { id: "hp5", yaw: 7.16, pitch: -54.67, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "g-dining",
                                        displayName: "Dining",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/ground/dining.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/ground/dining.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 78.05, pitch: -22.85, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: 52.03, pitch: -22.06, type: "scene", label: "Ground/Kitchen" },
                                            { id: "hp3", yaw: -90.26, pitch: -23.69, type: "scene", label: "Ground/Living" }
                                        ]
                                    },
                                    {
                                        id: "g-living",
                                        displayName: "Living",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/ground/living.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/ground/living.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 88.86, pitch: -12.44, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: 87.41, pitch: -18.06, type: "scene", label: "Ground/Dining" }
                                        ]
                                    },
                                    {
                                        id: "g-kitchen",
                                        displayName: "Kitchen",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/ground/kitchen.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/ground/kitchen.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -146.69, pitch: -49.7, type: "scene", label: "Ground/Dining" },
                                            { id: "hp2", yaw: 157.28, pitch: -25.44, type: "scene", label: "Ground/Toilet" },
                                            { id: "hp3", yaw: 147.92, pitch: -35.42, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/ground/g.toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/ground/g.toilet.jpg",
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
                                        id: "f1-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -58.8, pitch: -44.12, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom01",
                                        displayName: "Bedroom 1",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/bedroom01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 144.54, pitch: -36.17, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-corridor",
                                        displayName: "Corridor",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/corridor.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/corridor.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 114.92, pitch: -32.48, type: "scene", label: "First/Master Bedroom 2" },
                                            { id: "hp2", yaw: 83.28, pitch: -33.57, type: "scene", label: "First/Roof Room" },
                                            { id: "hp3", yaw: 95.19, pitch: -25.66, type: "scene", label: "First/Toilet" },
                                            { id: "hp4", yaw: 164.44, pitch: -43.99, type: "scene", label: "First/Bedroom 1" },
                                            { id: "hp5", yaw: -87.45, pitch: -17.93, type: "scene", label: "First/Master Bedroom 1" },
                                            { id: "hp6", yaw: -75.63, pitch: -32.26, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom01",
                                        displayName: "Master Bedroom 1",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/m.bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/m.bedroom01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 95.27, pitch: -31.68, type: "scene", label: "First/Master Bedroom 1 Toilet" },
                                            { id: "hp2", yaw: 89.87, pitch: -17.93, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom01_toilet",
                                        displayName: "Master Bedroom 1 Toilet",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/m.bedroom01_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/m.bedroom01_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -165.28, pitch: -44.17, type: "scene", label: "First/Master Bedroom 1" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom02",
                                        displayName: "Master Bedroom 2",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/m.bedroom02.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/m.bedroom02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 73.39, pitch: -43.33, type: "scene", label: "First/Master Bedroom 2 Toilet" },
                                            { id: "hp2", yaw: -56.95, pitch: -20.17, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom02_toilet",
                                        displayName: "Master Bedroom 2 Toilet",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/m.bedroom02_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/m.bedroom02_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -19.12, pitch: -38.54, type: "scene", label: "First/Master Bedroom 2" }
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
                                        displayName: "Room",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/roof/roof_room.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/roof/roof_room.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -111.45, pitch: -35.77, type: "scene", label: "First/Corridor" },
                                            { id: "hp2", yaw: -108.28, pitch: -25.88, type: "scene", label: "Roof/Toilet" }
                                        ]
                                    },
                                    {
                                        id: "r-roof_toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/roof/roof_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/roof/roof_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -101.6, pitch: -35.77, type: "scene", label: "Roof/Room" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },

                "oak178": {
                    id: "oak178",
                    bedrooms: 3, bathrooms: 4,
                    serviceRooms: null,
                    area: 178,
                    roofarea: 60,
                    gallery: [
                        { id: "ok1", src: "/kog/images/oak 178/OAK 178-Front.jpg" },
                    ],
                    cutSections: [
                        { id: "c1", src: "/kog/cut_section/Oak178/1.png" },
                        { id: "c2", src: "/kog/cut_section/Oak178/g.png" },
                        { id: "c3", src: "/kog/cut_section/Oak178/r.png" },
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
                                        furnitureImgId: "/kog/panorama/oak178/f/ground/entrance.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/ground/entrance.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -69.92, pitch: -26.28, type: "scene", label: "Ground/Dining" },
                                            { id: "hp2", yaw: -63.15, pitch: -10.63, type: "scene", label: "Ground/Living" },
                                            { id: "hp3", yaw: -63.9, pitch: -58.67, type: "scene", label: "First/Corridor" },
                                            { id: "hp4", yaw: 46.45, pitch: -27.51, type: "scene", label: "Ground/Kitchen" },
                                            { id: "hp5", yaw: 19.6, pitch: -26.72, type: "scene", label: "Ground/Toilet" }
                                        ]
                                    },
                                    {
                                        id: "g-dining",
                                        displayName: "Dining",
                                        furnitureImgId: "/kog/panorama/oak178/f/ground/dining.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/ground/dining.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 79.89, pitch: -22.72, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: -112.94, pitch: -20.96, type: "scene", label: "Ground/Living" }
                                        ]
                                    },
                                    {
                                        id: "g-living",
                                        displayName: "Living",
                                        furnitureImgId: "/kog/panorama/oak178/f/ground/living.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/ground/living.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 71.63, pitch: -17.93, type: "scene", label: "Ground/Dining" }
                                        ]
                                    },
                                    {
                                        id: "g-kitchen",
                                        displayName: "Kitchen",
                                        furnitureImgId: "/kog/panorama/oak178/f/ground/kitchen.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/ground/kitchen.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -48.96, pitch: -25.84, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/oak178/f/ground/g.toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/ground/g.toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 1.85, pitch: -36.3, type: "scene", label: "Ground/Entrance" }
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
                                        furnitureImgId: "/kog/panorama/oak178/f/first/corridor.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/first/corridor.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 93.78, pitch: -23.73, type: "scene", label: "First/Master Bedroom" },
                                            { id: "hp2", yaw: -78.97, pitch: -36.25, type: "scene", label: "First/Bedroom 2" },
                                            { id: "hp3", yaw: -90.13, pitch: -17.89, type: "scene", label: "First/Bedroom 1" },
                                            { id: "hp4", yaw: 78.66, pitch: -34.28, type: "scene", label: "First/Toilet" },
                                            { id: "hp5", yaw: -34.19, pitch: -49.75, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp6", yaw: 23.38, pitch: -56.25, type: "scene", label: "Roof/Room" }
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom01",
                                        displayName: "Bedroom 1",
                                        furnitureImgId: "/kog/panorama/oak178/f/first/bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/first/bedroom01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 86.44, pitch: -17.67, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom02",
                                        displayName: "Bedroom 2",
                                        furnitureImgId: "/kog/panorama/oak178/f/first/bedroom02.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/first/bedroom02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 58.84, pitch: -28.39, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom",
                                        displayName: "Master Bedroom",
                                        furnitureImgId: "/kog/panorama/oak178/f/first/m.bedroom.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/first/m.bedroom.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -116.46, pitch: -45.66, type: "scene", label: "First/Master Bedroom Toilet" },
                                            { id: "hp2", yaw: -42.76, pitch: -26.02, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom_toilet",
                                        displayName: "Master Bedroom Toilet",
                                        furnitureImgId: "/kog/panorama/oak178/f/first/m.bedroom_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/first/m.bedroom_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -83.14, pitch: -54.8, type: "scene", label: "First/Master Bedroom" }
                                        ]
                                    },
                                    {
                                        id: "f1-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/oak178/f/first/toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/first/toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 6.86, pitch: -34.89, type: "scene", label: "First/Corridor" }
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
                                        displayName: "Room",
                                        furnitureImgId: "/kog/panorama/oak178/f/roof/roof_room.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/roof/roof_room.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -93.34, pitch: -31.03, type: "scene", label: "First/Corridor" },
                                            { id: "hp2", yaw: 160.4, pitch: -35.55, type: "scene", label: "Roof/Toilet" }
                                        ]
                                    },
                                    {
                                        id: "r-roof_toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/oak178/f/roof/roof_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak178/unf/roof/roof_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 20, pitch: -43.29, type: "scene", label: "Roof/Room" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },

                "oak178-new": {
                    id: "oak178-new",
                    bedrooms: 3, bathrooms: 5,
                    serviceRooms: null,
                    area: 178,
                    roofarea: 46,
                    gallery: [
                        { id: "on1", src: "/kog/images/oak 178 new/OAK 178-Front.jpg" },

                    ],
                    cutSections: [
                        { id: "c1", src: "/kog/cut_section/Oak178-new/g.png" },
                        { id: "c2", src: "/kog/cut_section/Oak178-new/1.png" },
                        { id: "c3", src: "/kog/cut_section/Oak178-new/r.png" },
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
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/ground/entrance.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/ground/entrance.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -78.66, pitch: -15.82, type: "scene", label: "Ground/Living" },
                                            { id: "hp2", yaw: -79.58, pitch: -34.45, type: "scene", label: "Ground/Dining" },
                                            { id: "hp3", yaw: 64.34, pitch: -42.01, type: "scene", label: "Ground/Toilet" },
                                            { id: "hp4", yaw: 164.53, pitch: -43.9, type: "scene", label: "Ground/Kitchen" },
                                            { id: "hp5", yaw: 7.16, pitch: -54.67, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "g-dining",
                                        displayName: "Dining",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/ground/dining.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/ground/dining.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 78.05, pitch: -22.85, type: "scene", label: "Ground/Entrance" },
                                            { id: "hp2", yaw: 52.03, pitch: -22.06, type: "scene", label: "Ground/Kitchen" },
                                            { id: "hp3", yaw: -90.26, pitch: -23.69, type: "scene", label: "Ground/Living" }
                                        ]
                                    },
                                    {
                                        id: "g-kitchen",
                                        displayName: "Kitchen",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/ground/kitchen.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/ground/kitchen.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -146.69, pitch: -49.7, type: "scene", label: "Ground/Dining" },
                                            { id: "hp2", yaw: 157.28, pitch: -25.44, type: "scene", label: "Ground/Toilet" },
                                            { id: "hp3", yaw: 147.92, pitch: -35.42, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "g-living",
                                        displayName: "Living",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/ground/living.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/ground/living.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 88.86, pitch: -12.44, type: "scene", label: "Ground/Entrance" },
                                        ]
                                    },
                                    {
                                        id: "g-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/ground/g.toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/ground/g.toilet.jpg",
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
                                        id: "f1-toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -58.8, pitch: -44.12, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-bedroom01",
                                        displayName: "Bedroom 1",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/bedroom01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 144.54, pitch: -36.17, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-corridor",
                                        displayName: "Corridor",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/corridor.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/corridor.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 114.92, pitch: -32.48, type: "scene", label: "First/Master Bedroom 2" },
                                            { id: "hp2", yaw: 83.28, pitch: -33.57, type: "scene", label: "Roof/Room" },
                                            { id: "hp3", yaw: 95.19, pitch: -25.66, type: "scene", label: "First/Toilet" },
                                            { id: "hp4", yaw: 164.44, pitch: -43.99, type: "scene", label: "First/Bedroom 1" },
                                            { id: "hp5", yaw: -87.45, pitch: -17.93, type: "scene", label: "First/Master Bedroom 1" },
                                            { id: "hp6", yaw: -75.63, pitch: -32.26, type: "scene", label: "Ground/Entrance" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom01",
                                        displayName: "Master Bedroom 1",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/m.bedroom01.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/m.bedroom01.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 95.27, pitch: -31.68, type: "scene", label: "First/Master Bedroom 1 Toilet" },
                                            { id: "hp2", yaw: 89.87, pitch: -17.93, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom01_toilet",
                                        displayName: "Master Bedroom 1 Toilet",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/m.bedroom01_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/m.bedroom01_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -165.28, pitch: -44.17, type: "scene", label: "First/Master Bedroom 1" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom02",
                                        displayName: "Master Bedroom 2",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/m.bedroom02.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/m.bedroom02.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: 73.39, pitch: -43.33, type: "scene", label: "First/Master Bedroom 2 Toilet" },
                                            { id: "hp2", yaw: -56.95, pitch: -20.17, type: "scene", label: "First/Corridor" }
                                        ]
                                    },
                                    {
                                        id: "f1-m_bedroom02_toilet",
                                        displayName: "Master Bedroom 2 Toilet",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/first/m.bedroom02_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/first/m.bedroom02_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -19.12, pitch: -38.54, type: "scene", label: "First/Master Bedroom 2" }
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
                                        displayName: "Room",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/roof/roof_room.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/roof/roof_room.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -111.45, pitch: -35.77, type: "scene", label: "First/Corridor" },
                                            { id: "hp2", yaw: -108.28, pitch: -25.88, type: "scene", label: "Roof/Toilet" }
                                        ]
                                    },
                                    {
                                        id: "r-roof_toilet",
                                        displayName: "Toilet",
                                        furnitureImgId: "/kog/panorama/oak170_178new/f/roof/roof_toilet.jpg",
                                        unfurnitureImgId: "/kog/panorama/oak170_178new/unf/roof/roof_toilet.jpg",
                                        hotspots: [
                                            { id: "hp1", yaw: -101.6, pitch: -35.77, type: "scene", label: "Roof/Room" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            },
        },

        {
            id: "b",
            name: "Beginnings",
            thumbnail: B_THUMBNAIL,
            description: "Beginnings is a residential compound located in New Giza, offering a range of luxurious villas and townhouses. The project is designed to provide residents with a serene and upscale living experience, surrounded by lush greenery and modern amenities.",
            introVideo: null,
            idleVideo: null,
            zoomoutVideo: null,
        },
    ],

}