import { useRef } from "react";
import View360, { EquirectProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

/**
 * Generic Balcony/360 View Component
 * @param {string} imageSource - The image URL/path to display (360° equirectangular image)
 * @param {Object} [apartmentData] - Optional: Legacy prop for backward compatibility
 */
export default function Balcony({ view }) {
  const ZOOM_OUT = 1; // zoomed out view (match FOV ≈ 118.07°)
  const ZOOM_NORMAL = 1; // default zoom (match FOV = 90°)
  const ZOOM_IN = 1.33; // zoomed in view (match FOV ≈ 61.93°)

  const ZOOM_OUT_TIME = 600;

  const viewerRef = useRef(null);

  if (!view) {
    console.warn('Balcony component requires imageSource prop');
    return null;
  }

  const projection = new EquirectProjection({ src: view });

  // Handle initial load
  const handleReady = () => {
    viewerRef.current.camera.animateTo({
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
        initialZoom={ZOOM_NORMAL}
        zoomRange={{ min: ZOOM_OUT, max: ZOOM_IN }}
        pitchRange={{ min: 0, max: 25 }}
        rotate={{ speed: 6 }}
        style={{ touchAction: "none" }}
        scrollable={false}
      />
    </div>
  );
}