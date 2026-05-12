import { useRef, useState, useEffect } from "react";
import View360, { EquirectProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

/**
 * Generic Balcony/360 View Component
 * @param {string} imageSource - The image URL/path to display (360° equirectangular image)
 */
export default function Balcony({ view }) {
  const ZOOM_OUT = 1; // zoomed out view (match FOV ≈ 118.07°)
  const ZOOM_NORMAL = 1; // default zoom (match FOV = 90°)
  const ZOOM_IN = 1.33; // zoomed in view (match FOV ≈ 61.93°)

  const ZOOM_OUT_TIME = 600;

  const viewerRef = useRef(null);
  const [textureError, setTextureError] = useState(null);

  // Check if image exceeds device MAX_TEXTURE_SIZE
  useEffect(() => {
    if (!view) return;
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    const maxSize = gl ? gl.getParameter(gl.MAX_TEXTURE_SIZE) : 4096;
    const img = new Image();
    img.onload = () => {
      if (img.width > maxSize || img.height > maxSize) {
        setTextureError({ maxSize, width: img.width, height: img.height });
      } else {
        setTextureError(null);
      }
    };
    img.src = view;
  }, [view]);

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
      {textureError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/90 pointer-events-none">
          <p className="text-white/60 text-sm text-center px-8 leading-relaxed">
            360° view unavailable on this device.<br />
            Image resolution exceeds the graphics limit.<br />
            <span className="text-white/40 text-xs">
              Image: {textureError.width}×{textureError.height}&nbsp;·&nbsp;Device limit: {textureError.maxSize}px
            </span>
          </p>
        </div>
      )}
      <View360
        ref={viewerRef}
        className="view360-fullscreen"
        projection={projection}
        onReady={handleReady}
        initialZoom={ZOOM_NORMAL}
        zoomRange={{ min: ZOOM_OUT, max: ZOOM_IN }}
        pitchRange={{ min: 0, max: 25 }}
        yawRange={ {min:-70, max:70 }}
        rotate={{ speed: 6 }}
        style={{ touchAction: "none" }}
        scrollable={false}
      />
    </div>
  );
}