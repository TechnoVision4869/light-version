import { useState, useRef } from "react";
import View360, { EquirectProjection, EASING } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

import FURNITURE from "../assets/icons/furniture.svg";
import UNFURNITURE from "../assets/icons/un-furniture.svg";

export default function Room({ room }) {
  const ZOOM_OUT = 0.8;
  const ZOOM_NORMAL = 1;
  const ZOOM_IN = 1.333;

  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const initialProjection = useRef(new EquirectProjection({ src: room.furnitureImgId }));
  const [isFurnished, setIsFurnished] = useState(true);
  const currentSrcRef = useRef(room.furnitureImgId);
  const [textureError, setTextureError] = useState(null);

  // Check gl.getError() on the actual View360 canvas after render
  const checkGLError = (src) => {
    requestAnimationFrame(() => {
      const canvas = containerRef.current?.querySelector('.view360-canvas');
      if (!canvas) return;
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return;
      const error = gl.getError();
      if (error !== gl.NO_ERROR) {
        const maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        const img = new Image();
        img.onload = () => setTextureError({ maxSize, width: img.width, height: img.height });
        img.src = src;
      } else {
        setTextureError(null);
      }
    });
  };

  const handleReady = () => {
    viewerRef.current.camera.lookAt({ zoom: ZOOM_NORMAL });
    viewerRef.current.control.rotate.pointerScale = [2, 2];
    viewerRef.current.control.rotate.duration = 1000;
    viewerRef.current.control.rotate.easing = EASING.EASE_OUT_CUBIC;
    checkGLError(currentSrcRef.current);
  };

  const handleLoad = () => {
    checkGLError(currentSrcRef.current);
  };

  const handleToggle = () => {
    if (!viewerRef.current) return;
    const newFurnished = !isFurnished;
    setIsFurnished(newFurnished);
    const newView = newFurnished ? room.furnitureImgId : room.unfurnitureImgId;
    currentSrcRef.current = newView;
    // load() swaps the image without remounting — camera position is preserved automatically
    viewerRef.current.load(new EquirectProjection({ src: newView }));
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <View360
        ref={viewerRef}
        className="view360-fullscreen"
        projection={initialProjection.current}
        onReady={handleReady}
        onLoad={handleLoad}
        initialZoom={ZOOM_NORMAL}
        zoomRange={{ min: ZOOM_OUT, max: ZOOM_IN }}
        pitchRange={{ min: -30, max: 15 }}
        // rotate={rotateConfig.current}
        style={{ touchAction: "none" }}
        scrollable={false}
      />

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

      {/* Furniture toggle button — only shown when two distinct images exist */}
      {room.unfurnitureImgId && room.furnitureImgId !== room.unfurnitureImgId && (
        <div className="absolute bottom-4 right-4 z-40">
          <button
            className="w-10 h-10 rounded-2xl p-2 bg-[#383838] flex items-center justify-center hover:bg-white/7 transition"
            onClick={handleToggle}
          >
            <img
              className="w-auto h-6 object-contain"
              src={isFurnished ? UNFURNITURE : FURNITURE}
              alt={isFurnished ? "Unfurnish" : "Furnish"}
            />
          </button>
        </div>
      )}
    </div>
  );
}