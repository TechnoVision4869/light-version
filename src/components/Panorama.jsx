import { useState, useEffect, useRef } from "react";
import { PanoViewer } from "@egjs/view360";
import { DATA } from "../data/layers";
import Pin from "./pin";

export default function Panorama({ apartment }) {
  const MIN_FOV = 60;
  const MAX_FOV = 105;
  const NORMAL_FOV = 90;

  const ZOOM_IN_TIME = 1000;
  const ZOOM_OUT_TIME = 1000;

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

  // const readyRef = useRef(false);

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
      fovRange: [MIN_FOV, MAX_FOV],
      showPolePoint: true,
      fov: 95,
      // fovRange: [45, 65],
    });

    // Smaller FOV = more zoomed-in (e.g., 45°)
    // Larger FOV = more zoomed-out (e.g., 110°)

    // The "ready" event fires once: only when the viewer is fully initialized and ready for interaction.
    viewerRef.current.on("ready", () => {
      // if (readyRef.current) return
      // readyRef.current = true;
      console.log("Viewer is ready!");
      viewerRef.current.lookAt({ yaw: 0, pitch: 0, fov: NORMAL_FOV }, 1000);
      updateHotspots();
    });

    // The "animationEnd" event fires when lookAt finished its animation
    viewerRef.current.on("animationEnd", () => {
      console.log("animation end");
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
      console.log("viewer ref is destroyed");
      viewerRef.current = null; //
    };
  }, []); // 👈 Run only once on mount

  // console.log(viewerRef.current?.getFov());

  useEffect(() => {
    if (!viewerRef.current) return;
    // Sync hotspots ref
    hotspotsRef.current = hotspots;

    //  Animate current view to FOV 75 (zoom in)
    viewerRef.current.lookAt({ fov: MIN_FOV }, ZOOM_IN_TIME);

    // Step 2: After zoom-in completes, switch image
    const switchImage = () => {
      viewerRef.current.setImage(image);
      // setImage() is asynchronous — it starts loading but doesn’t block.
    };

    // Wait for zoom-in to finish before switching
    const zoomInTimeout = setTimeout(switchImage, ZOOM_IN_TIME);

    return () => {
      console.log("Cleanup");
      clearTimeout(zoomInTimeout);
    };
  }, [room]);

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
