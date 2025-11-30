// components/PanoViewer.jsx
import { useState, useEffect, useRef } from "react";
import { PanoViewer } from "@egjs/view360";
import { DATA } from "../data/layers";
import Pin from "./pin";

export default function Panorama({ apartment }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [hotspotPositions, setHotspotPositions] = useState({});

  const apartmentData = DATA.apartments.find((a) => a.id === apartment.id);
  const interior = apartmentData.interior;

  const floors = interior.floors;
  const [room, setRoom] = useState(floors[0].rooms[0]);

  const image = room.image;
  const hotspots = room.hotspots;
  const hotspotsRef = useRef(hotspots);

  const getHotspotScreenPosition = (viewer, yaw, pitch) => {
    const oyaw = viewer.getYaw();
    const opitch = viewer.getPitch();
    const fov = viewer.getFov();

    let deltaYaw = yaw - oyaw;
    if (deltaYaw < -180) deltaYaw += 360;
    if (deltaYaw > 180) deltaYaw -= 360;

    // Hide if behind camera
    if (Math.abs(deltaYaw) > 90) return null;

    const toRadian = (deg) => (deg * Math.PI) / 180;
    const rect = containerRef.current?.getBoundingClientRect();
    const width = rect?.width;
    const height = rect?.height;

    const hFov =
      Math.atan((width / height) * Math.tan(toRadian(fov) / 2)) *
      (180 / Math.PI) *
      2;

    const rx = Math.tan(toRadian(hFov) / 2);
    const ry = Math.tan(toRadian(fov) / 2);

    const pointX = Math.tan(toRadian(-deltaYaw)) / rx;
    const pointY = Math.tan(toRadian(-pitch + opitch)) / ry;

    const x = width / 2 + (pointX * width) / 2;
    const y = height / 2 + (pointY * height) / 2;

    return { x, y };
  };

  const updateHotspots = () => {
    if (!viewerRef.current) return;

    const positions = {};
    hotspotsRef.current.forEach((spot) => {
      const pos = getHotspotScreenPosition(
        viewerRef.current,
        spot.yaw,
        spot.pitch
      );
      positions[spot.id] = pos;
    });
    setHotspotPositions(positions);
  };

  // Initialize viewer ONCE
  useEffect(() => {
    if (!containerRef.current) return;

    viewerRef.current = new PanoViewer(containerRef.current, {
      image: image,
      useZoom: true,
      fovRange: [45, 65], // allow zoom-in, restrict zoom-out
    });

    // Smaller FOV = more zoomed-in (e.g., 45°)
    // Larger FOV = more zoomed-out (e.g., 110°)

    viewerRef.current.on("ready", () => {
      viewerRef.current.lookAt({ fov: 65 }); // start at max FOV (no zoom-out beyond this)
      updateHotspots();
    });

    viewerRef.current.on("viewChange", updateHotspots);

    const handleResize = () => {
      viewerRef.current?.updateViewportDimensions();
      updateHotspots();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      viewerRef.current?.destroy();
    };
  }, []); // 👈 Run only once on mount

  useEffect(() => {
    if (!viewerRef.current) return;
    // Sync hotspots ref
    hotspotsRef.current = hotspots;

    const handleImageLoaded = () => {
      // Optional: animate to reset view or look toward entrance
      viewerRef.current.lookAt({ fov: 65 }, 300);
      // update positions after image loads
      setTimeout(updateHotspots, 250); // allow animation to start
    };

    viewerRef.current.once("imageLoaded", handleImageLoaded);
    viewerRef.current.setImage(image);

    return () => {
      viewerRef.current?.off("imageLoaded", handleImageLoaded);
    };
  }, [image, hotspots]);

  const findRoomById = (roomLabel) => {
    return floors.flatMap(floor => floor.rooms).find(room => room.name === roomLabel);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-screen h-screen bg-[#2f2f2f]" />
      {hotspots.map((spot) => {
        const pos = hotspotPositions[spot.id];
        if (!pos) return null;

        return (
          <Pin
            key={spot.id}
            type={spot.type}
            label={spot.label}
            onClick={() => setRoom(findRoomById(spot.label))}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
}
