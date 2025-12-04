import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import View360, { EquirectProjection } from "@egjs/react-view360";
import { DATA } from "../data/layers";
import Pin from "./pin";
import "@egjs/react-view360/css/view360.min.css";

export default function Panorama({ apartment }) {
  const MIN_FOV = 60;
  const MAX_FOV = 105;
  const NORMAL_FOV = 90;

  const ZOOM_IN_TIME = 1000;
  const ZOOM_OUT_TIME = 1000;

  const viewerRef = useRef(null);
  const [hotspotPositions, setHotspotPositions] = useState({});
  const containerRef = useRef(null);

  // Get apartment data
  const apartmentData = DATA.apartments.find((a) => a.id === apartment.id);
  const interior = apartmentData.interior;
  const floors = interior.floors;
  const [room, setRoom] = useState(floors[0].rooms[0]);

  const image = room.image;

  const hotspots = room.hotspots;
  const hotspotsRef = useRef();
  hotspotsRef.current = hotspots; // ✅ Sync on every render

  useEffect(() => {
    const allImages = floors.flatMap(f => f.rooms.map(r => r.image));
    allImages.forEach(src => new Image().src = src);
  }, [floors]);

  // ✅ Calculate hotspot screen position (v4-compatible)
  const getHotspotScreenPosition = useCallback((viewer, yaw, pitch) => {
    const oyaw = viewer.camera.yaw;
    const opitch = viewer.camera.pitch;
    const fov = viewer.camera.fov;

    let deltaYaw = yaw - oyaw;
    if (deltaYaw < -180) deltaYaw += 360;
    if (deltaYaw > 180) deltaYaw -= 360;
    if (Math.abs(deltaYaw) > 90) return null;

    const toRadian = (deg) => (deg * Math.PI) / 180;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return null;

    const { width, height } = rect;
    const hFov = Math.atan((width / height) * Math.tan(toRadian(fov) / 2)) * (180 / Math.PI) * 2;
    const rx = Math.tan(toRadian(hFov) / 2);
    const ry = Math.tan(toRadian(fov) / 2);

    const pointX = Math.tan(toRadian(-deltaYaw)) / rx;
    const pointY = Math.tan(toRadian(-pitch + opitch)) / ry;

    const x = width / 2 + (pointX * width) / 2;
    const y = height / 2 + (pointY * height) / 2;

    return { x, y };
  }, []);

  // ✅ Update hotspot positions
  const updateHotspots = useCallback(() => {
    if (!viewerRef.current) return;

    const positions = {};
    hotspotsRef.current.forEach((spot) => {
      const pos = getHotspotScreenPosition(viewerRef.current, spot.yaw, spot.pitch);
      if (pos) positions[spot.id] = pos;
    });
    setHotspotPositions(positions);
  }, [getHotspotScreenPosition]);

  // ✅ Projection (memoized)
  const projection = useMemo(() => new EquirectProjection({ src: image }), [image]);

  // ✅ Handle initial load
  const handleReady = useCallback(() => {
    // Initial view
    console.log("ready");

    viewerRef.current.camera.animateTo({
      // yaw: 0,
      // pitch: 0,
      zoom: 0.85,
      duration: ZOOM_OUT_TIME,
    });
    updateHotspots();
  }, [updateHotspots]);

  // ✅ Handle view changes (pan/zoom)
  const handleViewChange = useCallback(() => {
    updateHotspots();
  }, [updateHotspots]);

  // ✅ Handle new image load (v4's "imageLoaded" equivalent)
  const handleLoad = useCallback(() => {
    console.log("load");

    // Animate to default view AFTER image loads
    viewerRef.current.camera.animateTo({
      // yaw: 0,
      // pitch: 0,
      zoom: 1,
      duration: 100,
    });
    updateHotspots();
  }, [updateHotspots]);

  // ✅ Find room by name
  const findRoomById = useCallback((roomLabel) => {
    return floors.flatMap(floor => floor.rooms).find(room => room.name === roomLabel);
  }, [floors]);

  // ✅ Handle hotspot click: zoom in → switch room
  const handleHotspotClick = useCallback((room) => {
    if (!viewerRef.current) return;

    // Zoom in current room
    viewerRef.current.camera.animateTo({
      yaw: room.yaw,
      pitch: room.pitch,
      zoom: 1.5,
      duration: ZOOM_IN_TIME,
    });

    // Switch room AFTER zoom completes
    setTimeout(() => {
      const targetRoom = findRoomById(room.label);
      console.log(targetRoom.image);

      if (targetRoom) {
        setRoom(targetRoom);
      }

    }, ZOOM_IN_TIME);
  }, [findRoomById]);

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      {/* View360 v4 React Component */}
      <View360
        ref={viewerRef}
        className="w-screen h-screen"
        projection={projection}
        style={{ backgroundColor: "#2f2f2f" }}
        onReady={handleReady}
        onLoad={handleLoad}
        onViewChange={handleViewChange}
        camera={{
          fovRange: [MIN_FOV, MAX_FOV],
        }}
      />

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