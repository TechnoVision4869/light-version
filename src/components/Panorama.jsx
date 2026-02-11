import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import View360, { EquirectProjection } from "@egjs/react-view360";

import { DATA } from "../data/layers";
import Pin from "./Pin";
import "@egjs/react-view360/css/view360.min.css";
import InteriorNav from "./InteriorNav";

export default function Panorama({ unit }) {

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
  const [hotspotPositions, setHotspotPositions] = useState({});
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false); // blur overlay state
  const transitionTimeoutRef = useRef(null);
  const [isFurnished, setIsFurnished] = useState(true);

  // Get unit data
  const unitType = DATA.project.unitTypes[unit.unitTypeId];  
  const levels = unitType.interior.levels;
  const [room, setRoom] = useState(levels[0].rooms[0]);  
  const [currentImage, setCurrentImage] = useState(room.furnitureImg);

  const hotspots = room.hotspots;
  const hotspotsRef = useRef();
  hotspotsRef.current = hotspots; // Sync on every render

  useEffect(() => {
    const allImages = levels.flatMap(l => l.rooms.map(r => r.furnitureImg));
    allImages.forEach(src => new Image().src = src);
  }, [levels]);

  // Update image when furniture toggle changes
  useEffect(() => {
    setIsTransitioning(true);
    const newImage = isFurnished ? room.furnitureImg : room.unfurnitureImg;
    setCurrentImage(newImage);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isFurnished, room]);

  // Calculate hotspot screen position (v4-compatible)
  const getHotspotScreenPosition = useCallback((viewer, yaw, pitch) => {
  const oyaw = viewer.camera.yaw;
  const opitch = viewer.camera.pitch;

  const rect = containerRef.current?.getBoundingClientRect();
  if (!rect || rect.width === 0 || rect.height === 0) return null;

  const { width, height } = rect;

  // Use HFOV directly from viewer (no conversions)
  const hfov = viewer.camera.fov; // HORIZONTAL FOV in degrees
  const toRadian = (deg) => (deg * Math.PI) / 180;

  // Normalize yaw delta
  let deltaYaw = yaw - oyaw;
  if (deltaYaw < -180) deltaYaw += 360;
  if (deltaYaw > 180) deltaYaw -= 360;
  if (Math.abs(deltaYaw) > 90) return null; // behind camera

  // Calculate screen position using HFOV directly
  const hfovRad = toRadian(hfov);
  const rx = Math.tan(hfovRad / 2);
  
  // For vertical, account for aspect ratio
  const aspectRatio = width / height;
  const ry = Math.tan(hfovRad / 2) / aspectRatio;

  const pointX = Math.tan(toRadian(-deltaYaw)) / rx;
  const pointY = Math.tan(toRadian(opitch - pitch)) / ry; // swapped for correct direction
  
  // Clamp to screen bounds with small margin
  const x = Math.max(0, Math.min(width, width / 2 + (pointX * width) / 2));
  const y = Math.max(0, Math.min(height, height / 2 + (pointY * height) / 2));

  return { x, y };
}, []);

  // Update hotspot positions
  const updateHotspots = useCallback(() => {
    if (!viewerRef.current) return;

    const positions = {};
    hotspotsRef.current.forEach((spot) => {
      const pos = getHotspotScreenPosition(viewerRef.current, spot.yaw, spot.pitch);
      if (pos) positions[spot.id] = pos;
    });
    setHotspotPositions(positions);
  }, [getHotspotScreenPosition]);

  // Projection (memoized)
  const projection = useMemo(() => new EquirectProjection({ src: currentImage }), [currentImage]);

  // Handle view changes (pan/zoom)
  const handleViewChange = useCallback(() => {
    updateHotspots();
  }, [updateHotspots]);

  // Find room by name
  const findRoomById = useCallback((roomLabel) => {
    return levels.flatMap(floor => floor.rooms).find(room => room.displayName === roomLabel);
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
    const newImage = isFurnished ? targetRoom.furnitureImg : targetRoom.unfurnitureImg;
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
    }, 750);
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);

    // 1. Zoom in old image with ease-in
    viewerRef.current.camera.animateTo({
      yaw: room.yaw,
      pitch: -5,
      zoom: ZOOM_IN,
      duration: ZOOM_DURATION,
      easing: easing.easeIn,
    });

    // 2. Switch room AFTER first zoom in completes
    setTimeout(() => {
      const targetRoom = findRoomById(room.label);
      // console.log(targetRoom);
      
      if (targetRoom) {
        const newImage = isFurnished ? targetRoom.furnitureImg : targetRoom.unfurnitureImg;
        setCurrentImage(newImage);
        setRoom(targetRoom);
        // onLoad will be called automatically when image finishes loading
        // and will handle step 3 (zoom out animation with ease-out)
      }
    }, ZOOM_DURATION);
  }, [findRoomById, isFurnished]);

   // Handle new image load (v4's "imageLoaded" equivalent)
  const handleLoad = useCallback(() => {
    if (!viewerRef.current) return;
    // console.log("load");

    // Set to zoom out position instantly (no animation)
    viewerRef.current.camera.lookAt({
      zoom: ZOOM_OUT,
    });

    // Animate back to normal with ease-out
    viewerRef.current.camera.animateTo({
      zoom: ZOOM_NORMAL,
      duration: ZOOM_DURATION,
      easing: easing.easeOut,
    });

    // Remove blur overlay after transition completes
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    updateHotspots();
  }, [updateHotspots]);

  return (
    <div className="relative w-screen h-screen" ref={containerRef} style={{ touchAction: "none" }}>
      {/* Current viewer */}
      <View360
        ref={viewerRef}
        className="view360-fullscreen"
        projection={projection}
        onLoad={handleLoad}
        onViewChange={handleViewChange}
        zoomRange={{ min: 0.8, max: ZOOM_IN }}
        initialYaw={190}
      />

      <InteriorNav 
        levels={levels} 
        isFurnished={isFurnished}
        currentRoom={room.displayName}
        currentFloor={findFloorByRoom(room)?.name}
        onFurnitureToggle={() => setIsFurnished(!isFurnished)}
        onRoomChange={handleDropdownChange}
      />

      {/* Blur overlay during transition (hides load gap) */}
      {isTransitioning && <div className="motion-blur-overlay absolute inset-0 pointer-events-none" />}

      {/* Hotspots */}
      {hotspots.map((spot) => {
        const pos = hotspotPositions[spot.id];
        if (!pos) return null;
        return (
          <Pin
            key={spot.id}
            type={spot.type}
            label={spot.label}
            onClick={() => handleHotspotClick(spot)}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: "translate(-50%, -50%)",
              zIndex: 40,
            }}
          />
        );
      })}
    </div>
  );
}