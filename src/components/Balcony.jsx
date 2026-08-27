import { useRef, useState, useEffect } from "react";
import View360, { EquirectProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import { CONFIG } from "../data/layers";

/**
 * Generic Balcony/360 View Component
 * @param {string} imageSource - The image URL/path to display (360° equirectangular image)
 */
export default function Balcony({ view }) {
  const ZOOM_OUT_TIME = 600;

  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const glRef = useRef(null);
  const [textureError, setTextureError] = useState(null);

  // Check gl.getError() off the render timeline — setTimeout avoids a GPU pipeline stall on the current frame
  const checkGLError = () => {
    setTimeout(() => {
      if (!glRef.current) {
        const canvas = containerRef.current?.querySelector('.view360-canvas');
        if (!canvas) return;
        glRef.current = canvas.getContext('webgl2') || canvas.getContext('webgl');
      }
      const gl = glRef.current;
      if (!gl) return;
      const error = gl.getError();
      if (error !== gl.NO_ERROR) {
        const maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        const img = new Image();
        img.onload = () => setTextureError({ maxSize, width: img.width, height: img.height });
        img.src = view;
      } else {
        setTextureError(null);
      }
    }, 0);
  };

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
      zoom: CONFIG.BALCONY_INITIAL_ZOOM ?? 1,
      duration: ZOOM_OUT_TIME,
    });
    checkGLError();
  };

  return (
    <div ref={containerRef} className="relative w-screen h-screen">
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
        zoomRange={CONFIG.BALCONY_ZOOM_RANGE}
        pitchRange={CONFIG.BALCONY_PITCH_RANGE}
        yawRange={CONFIG.BALCONY_YAW_RANGE}
        style={{ touchAction: "none" }}
        scrollable={false}
      />
    </div>
  );
}