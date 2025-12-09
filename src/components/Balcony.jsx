import { useRef } from "react";
import View360, { EquirectProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

export default function Panorama({ apartment }) {
    console.log("enter");

    const ZOOM_MIN = 0.75; // = FOV 105 (max zoom-out)
    const ZOOM_MAX = 1.5; // = FOV 60 (max zoom-in)
    const ZOOM_NORMAL = 0.85; // = FOV 90

    const ZOOM_OUT_TIME = 600;

    const viewerRef = useRef(null);

    const view = apartment.balconyView;
    console.log(view);

    const projection = new EquirectProjection({ src: view });

    // Handle initial load
    const handleReady = () => {
        // Initial view
        console.log("ready");

        viewerRef.current.camera.animateTo({
            // yaw: 0,
            // pitch: 0,
            zoom: ZOOM_NORMAL,
            duration: ZOOM_OUT_TIME,
        });
    };

    return (
        <div className="relative w-screen h-screen">
            <View360
                ref={viewerRef}
                className="view360-fullscreen"
                projection={projection}
                onReady={handleReady}
                zoomRange={{ min: ZOOM_MIN, max: ZOOM_MAX }}
            />
        </div>
    );
}