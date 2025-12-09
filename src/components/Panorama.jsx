import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import View360, { EquirectProjection } from "@egjs/react-view360";
import Pin from "./pin";
import "@egjs/react-view360/css/view360.min.css";

export default function Panorama({ apartment }) {
  const ZOOM_MIN = 0.85; // = FOV 105 (max zoom-out)
  const ZOOM_MAX = 1.5; // = FOV 60 (max zoom-in)
  const ZOOM_NORMAL = 1.0; // = FOV 90

  const ZOOM_IN_TIME = 500;
  const ZOOM_OUT_TIME = 1000;
  const FADE_DURATION = 750;

  const viewerRef = useRef(null);
  const [hotspotPositions, setHotspotPositions] = useState({});
  const containerRef = useRef(null);

  // Get apartment data
  const interior = apartment.interior;
  const floors = interior.floors;
  const [room, setRoom] = useState(floors[0].rooms[0]);

  const [currentImage, setCurrentImage] = useState(room.image);
  const [nextImage, setNextImage] = useState(null);
  const [isFading, setIsFading] = useState(false);

  const hotspots = room.hotspots;
  const hotspotsRef = useRef();
  hotspotsRef.current = hotspots; // Sync on every render

  useEffect(() => {
    const allImages = floors.flatMap(f => f.rooms.map(r => r.image));
    allImages.forEach(src => new Image().src = src);
  }, [floors]);

  // Calculate hotspot screen position (v4-compatible)
  const getHotspotScreenPosition = useCallback((viewer, yaw, pitch) => {
    const oyaw = viewer.camera.yaw;
    const opitch = viewer.camera.pitch;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return null;

    const { width, height } = rect;
    const aspectRatio = height / width;

    // v4 returns HORIZONTAL FOV
    const hfov = viewer.camera.fov; // in degrees

    // Convert HFOV → VFOV (vertical field of view)
    const hfovRad = (hfov * Math.PI) / 180;
    const vfovRad = 2 * Math.atan(Math.tan(hfovRad / 2) * aspectRatio);
    const vfov = (vfovRad * 180) / Math.PI; // in degrees

    // Normalize yaw delta
    let deltaYaw = yaw - oyaw;
    if (deltaYaw < -180) deltaYaw += 360;
    if (deltaYaw > 180) deltaYaw -= 360;
    if (Math.abs(deltaYaw) > 90) return null; // hide behind camera

    const toRadian = (deg) => (deg * Math.PI) / 180;

    // Compute horizontal FOV for screen projection (used only for rx)
    const hFovForProjection = Math.atan((width / height) * Math.tan(toRadian(vfov) / 2)) * (180 / Math.PI) * 2;

    const rx = Math.tan(toRadian(hFovForProjection) / 2);
    const ry = Math.tan(toRadian(vfov) / 2);

    const pointX = Math.tan(toRadian(-deltaYaw)) / rx;
    const pointY = Math.tan(toRadian(-pitch + opitch)) / ry;

    const x = width / 2 + (pointX * width) / 2;
    const y = height / 2 + (pointY * height) / 2;

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
  const nextProjection = useMemo(() => {
    return nextImage ? new EquirectProjection({ src: nextImage }) : null;
  }, [nextImage]);

  // Handle initial load
  const handleReady = useCallback(() => {
    // Initial view
    // console.log("ready");

    viewerRef.current.camera.animateTo({
      // yaw: 0,
      // pitch: 0,
      zoom: ZOOM_NORMAL,
      duration: ZOOM_OUT_TIME,
    });
    updateHotspots();
  }, [updateHotspots]);

  // Handle view changes (pan/zoom)
  const handleViewChange = useCallback(() => {
    updateHotspots();
  }, [updateHotspots]);

  // Handle new image load (v4's "imageLoaded" equivalent)
  const handleLoad = useCallback(() => {
    // console.log("load");

    // Animate to default view AFTER image loads
    viewerRef.current.camera.animateTo({
      // yaw: 0,
      // pitch: 0,
      zoom: ZOOM_NORMAL,
      duration: 10,
    });
    updateHotspots();
  }, [updateHotspots]);

  // Find room by name
  const findRoomById = useCallback((roomLabel) => {
    return floors.flatMap(floor => floor.rooms).find(room => room.name === roomLabel);
  }, [floors]);

  const switchRoomWithFade = useCallback((newRoom) => {
    if (isFading) return; // prevent rapid clicks

    // 1. PREPARE next image (render next viewer WHILE current is still visible)
    setNextImage(newRoom.image);

    // 2. AFTER next viewer is rendered, START fade
    requestAnimationFrame(() => {
      setIsFading(true);
    });

    // 3. CLEANUP after fade completes
    setTimeout(() => {
      setCurrentImage(newRoom.image);
      setNextImage(null);
      setIsFading(false);
      setRoom(newRoom);
    }, FADE_DURATION); // must match CSS duration
  }, [isFading]);

  // Handle hotspot click: zoom in → switch room
  const handleHotspotClick = useCallback((room) => {
    if (!viewerRef.current) return;

    // Zoom in current room
    viewerRef.current.camera.animateTo({
      yaw: room.yaw,
      // pitch: room.pitch,
      zoom: ZOOM_MAX,
      duration: ZOOM_IN_TIME,
    });

    // Switch room AFTER zoom completes
    setTimeout(() => {
      const targetRoom = findRoomById(room.label);
      // console.log(targetRoom.image);

      if (targetRoom) {
        switchRoomWithFade(targetRoom);
      }

    }, ZOOM_IN_TIME - ZOOM_IN_TIME / 2);
  }, [findRoomById]);

  return (
    <div className="relative w-screen h-screen" ref={containerRef}>
      {/* Next viewer */}
      {isFading && (
        <View360
          className="view360-fullscreen opacity-100"
          projection={nextProjection}
        // zoomRange={{ min: ZOOM_MIN, max: ZOOM_MAX }}
        // draggable={false}
        // pinchZoom={false}
        // keyboard={false}
        // wheel={false}
        />
      )}

      {/* Current viewer */}
      <View360
        ref={viewerRef}
        className="view360-fullscreen"
        style={{
          opacity: isFading ? 0 : 1,
          transition: isFading
            ? `opacity ${FADE_DURATION}ms ease-in`
            : 'none', // ← no transition when fading in (not needed here)
        }}
        projection={projection}
        onReady={handleReady}
        onLoad={handleLoad}
        onViewChange={handleViewChange}
        zoomRange={{ min: ZOOM_MIN, max: ZOOM_MAX }}
      />

      {/* Hotspots */}
      {!isFading && (hotspots.map((spot) => {
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
      }))}
    </div>
  );
}