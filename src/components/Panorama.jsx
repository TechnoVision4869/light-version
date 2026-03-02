import { useState, useMemo, useRef, useEffect, useCallback, useContext } from "react";
import { SidebarContext } from '../store/SidebarContextProvider';
import View360, { EquirectProjection } from "@egjs/react-view360";

import Pin from "./Pin";
import "@egjs/react-view360/css/view360.min.css";
import InteriorNav from "./InteriorNav";

export default function Panorama({ unit }) {  
  const { currentProject } = useContext(SidebarContext);

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
  const [isTransitioning, setIsTransitioning] = useState(false); // blur overlay state
  const transitionTimeoutRef = useRef(null);
  const [isFurnished, setIsFurnished] = useState(true);
  const zoomOnLoadRef = useRef(true);

  // Get unit data
  const unitType = currentProject.unitTypes[unit.unitTypeId];
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

  }, []);

  return (
    <div
      className="relative w-screen h-screen"
      style={{ touchAction: "none" }}
    >
      {/* Current viewer */}
      <View360
        ref={viewerRef}
        className="view360-fullscreen"
        projection={projection}
        onLoad={handleLoad}
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

      <InteriorNav
        levels={levels}
        isFurnished={isFurnished}
        currentRoom={room.displayName}
        currentFloor={findFloorByRoom(room)?.name}
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