import { useState, useMemo, useRef, useEffect, useCallback, useContext } from "react";
import { SidebarContext } from '../store/SidebarContextProvider';
import View360, { EquirectProjection, EASING } from "@egjs/react-view360";
import { APP_CONFIG } from "@/config/appConfig";

import Pin from "./Pin";
import "@egjs/react-view360/css/view360.min.css";
import InteriorNav from "./InteriorNav";

export default function Panorama({ unit }) {  
  const { currentProject } = useContext(SidebarContext);
  const useStatic = APP_CONFIG.USE_STATIC;

  const ZOOM_OUT = 0.8; // zoomed out view (match FOV ≈ 118.07°)
  const ZOOM_NORMAL = 1; // default zoom (match FOV = 90°)
  const ZOOM_IN = 1.333; // zoomed in view (match FOV ≈ 61.93°)

  const ZOOM_DURATION = 750;

  const easing = {
    easeIn: (x) => x * x * x,
    easeOut: (x) => 1 - Math.pow(1 - x, 3),
    easeInOut: (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
  };

  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false); // blur overlay state
  const transitionTimeoutRef = useRef(null);
  const [isFurnished, setIsFurnished] = useState(true);
  const zoomOnLoadRef = useRef(true);
  const currentImageRef = useRef(null);
  const [textureError, setTextureError] = useState(null);

  // Check gl.getError() on the actual View360 canvas after render
  const checkGLError = useCallback((src) => {
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
  }, []);

  // Get unit data
  const unitType = useStatic 
        ? currentProject?.unitTypes?.[unit?.unitTypeId]
        : currentProject?.unitTypes?.find(type => type.name === unit?.visualTypeId);
  const levels = useStatic ? unitType.interior.levels : unitType.levels;
  const [room, setRoom] = useState(levels[0].rooms[0]);
  const [currentImage, setCurrentImage] = useState(room.furnitureImgId);

  const hotspots = room.hotspots;
  const hotspotsRef = useRef();
  hotspotsRef.current = hotspots; // Sync on every render
  currentImageRef.current = currentImage; // Sync on every render

  useEffect(() => {
    const allImages = levels.flatMap(l => l.rooms.map(r => r.furnitureImgId));
    allImages.forEach(src => new Image().src = src);
  }, [levels]);

  // Update image when furniture toggle changes
  useEffect(() => {
    setIsTransitioning(true);
    const newImage = isFurnished ? room.furnitureImgId : room.unfurnitureImgId;
    setTimeout(() => {
      setCurrentImage(newImage);
    }, 100);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isFurnished, room]);

  // Projection (memoized)
  const projection = useMemo(() => new EquirectProjection({ src: currentImage }), [currentImage]);

  // Refresh hotspot positions when data changes
  useEffect(() => {
    if (!viewerRef.current?.hotspot?.refresh) return;
    const refreshId = setTimeout(() => {
      viewerRef.current?.hotspot?.refresh?.();
    }, 0);
    return () => clearTimeout(refreshId);
  }, [hotspots, currentImage]);

  // Find room by composite key "FloorName/RoomDisplayName"
  const findRoomById = useCallback((roomLabel) => {
    const slashIndex = roomLabel.indexOf("/");
    if (slashIndex === -1) return undefined;
    const floorName = roomLabel.slice(0, slashIndex);
    const displayName = roomLabel.slice(slashIndex + 1);
    const floor = levels.find(f => f.name === floorName);
    return floor?.rooms.find(r => r.displayName === displayName);
  }, [levels]);

  // Find floor by room
  const findFloorByRoom = useCallback((targetRoom) => {
    return levels.find(floor => floor.rooms.includes(targetRoom));
  }, [levels]);

  // Handle dropdown change (floor or room) - no zoom, just blur
  const handleDropdownChange = useCallback((roomLabel) => {
    const targetRoom = findRoomById(roomLabel);
    if (!targetRoom) return;

    // Start blur overlay
    setIsTransitioning(true);

    // Set new room and image
    setRoom(targetRoom);
    const newImage = isFurnished ? targetRoom.furnitureImgId : targetRoom.unfurnitureImgId;
    setCurrentImage(newImage);

    // Remove blur overlay after transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [findRoomById, isFurnished]);

  // Handle hotspot click: zoom in → switch room
  const handleHotspotClick = useCallback((room) => {
    if (!viewerRef.current) return;
    // console.log("click");

    // Start blur overlay
    setTimeout(() => {
      setIsTransitioning(true);
    }, 250);
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);

    // 1. Zoom in old image with ease-in
    viewerRef.current.camera.animateTo({
      yaw: room.yaw,
      // pitch: -5,
      zoom: ZOOM_IN,
      duration: ZOOM_DURATION,
      easing: easing.easeIn,
    });

    // 2. Switch room AFTER first zoom in completes
    setTimeout(() => {
      const targetRoom = findRoomById(room.label);
      // console.log(targetRoom);

      if (targetRoom) {
        const newImage = isFurnished ? targetRoom.furnitureImgId : targetRoom.unfurnitureImgId;
        setCurrentImage(newImage);
        setRoom(targetRoom);
        // onLoad will be called automatically when image finishes loading
        // and will handle step 3 (zoom out animation with ease-out)
      }
    }, ZOOM_DURATION);
  }, [findRoomById, isFurnished]);

  const handleReady = useCallback(() => {
    if (!viewerRef.current) return;
    // configure rotate speed and easing
    viewerRef.current.control.rotate.pointerScale = [2, 2];
    viewerRef.current.control.rotate.duration = 1000;
    viewerRef.current.control.rotate.easing = EASING.EASE_OUT_CUBIC;
    checkGLError(currentImageRef.current);
  }, [checkGLError]);

  // Handle new image load (v4's "imageLoaded" equivalent)
  const handleLoad = useCallback(() => {
    if (!viewerRef.current) return;

    // Set to zoom out position instantly (no animation)
    viewerRef.current.camera.lookAt({ zoom: ZOOM_OUT });

    if (zoomOnLoadRef.current) {
      // Animate back to normal with ease-out
      viewerRef.current.camera.animateTo({
        zoom: ZOOM_NORMAL,
        duration: ZOOM_DURATION,
        easing: easing.easeOut,
      });
    }
    else zoomOnLoadRef.current = true;

    // Remove blur overlay after transition completes
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    checkGLError(currentImageRef.current);
  }, [checkGLError]);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen"
      style={{ touchAction: "none" }}
    >
      {/* Current viewer */}
      <View360
        ref={viewerRef}
        className="view360-fullscreen"
        projection={projection}
        onLoad={handleLoad}
        onReady={handleReady}
        zoomRange={{ min: 0.8, max: ZOOM_IN }}
        initialYaw={190}
        rotate={{ speed: 6 }}
        style={{ touchAction: "none" }}
        scrollable={false}
        pitchRange={{ min: -30, max: 15 }}
      >
        <div className="view360-hotspots">
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="view360-hotspot"
              data-yaw={spot.yaw}
              data-pitch={spot.pitch}
              onClick={() => handleHotspotClick(spot)}
            >
              <Pin type={spot.type} label={spot.label} />
            </div>
          ))}
        </div>
      </View360>

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

      <InteriorNav
        levels={levels}
        isFurnished={isFurnished}
        currentRoom={room.displayName}
        currentFloor={findFloorByRoom(room)?.name}
        hasUnfurnished={!!room.unfurnitureImgId}
        onFurnitureToggle={() => {
          zoomOnLoadRef.current = false; // no zoom on furniture toggle, just blur
          setIsFurnished(!isFurnished);
        }}
        onRoomChange={handleDropdownChange}
      />

      {/* Blur overlay during transition (hides load gap) */}
      {isTransitioning && <div className="motion-blur-overlay absolute inset-0 pointer-events-none" />}

    </div>
  );
}