import { useCallback, useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Hotspot from "./Hotspot";

const CLICK_MOVE_THRESHOLD = 6; // px -- beyond this, treat it as a drag, not a click

// Three.js objects aren't DOM elements -- a mesh floating in 3D space has no
// native "onClick". A Raycaster projects an invisible line from the camera
// through the pointer position each frame and reports which object it
// passes through first, which is how we detect hovering/clicking a hotspot.
export default function HotspotLayer({ hotspots, onSelect }) {
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster()).current;
  const pointer = useRef(new THREE.Vector2(-10, -10)).current;
  const meshRefs = useRef(new Map());
  const pointerDownAt = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  const registerMesh = useCallback((id, mesh) => {
    if (mesh) meshRefs.current.set(id, mesh);
    else meshRefs.current.delete(id);
  }, []);

  const updatePointer = useCallback(
    (event) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    },
    [gl, pointer],
  );

  const handlePointerMove = useCallback(
    (event) => {
      updatePointer(event);
    },
    [updatePointer],
  );

  const handlePointerDown = useCallback((event) => {
    pointerDownAt.current = { x: event.clientX, y: event.clientY };
  }, []);

  // OrbitControls also starts its drag-to-look on pointerdown on this same
  // canvas, so selecting a hotspot immediately on pointerdown would hijack
  // every orbit gesture that happens to start near one. Requiring the
  // pointer to still be near its down-position on release is what tells a
  // click apart from the start of a drag.
  const handlePointerUp = useCallback(
    (event) => {
      const start = pointerDownAt.current;
      pointerDownAt.current = null;
      if (!start) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.hypot(dx, dy) > CLICK_MOVE_THRESHOLD) return;

      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(Array.from(meshRefs.current.values()), false)[0];
      if (hit) onSelect(hit.object.userData.hotspotId);
    },
    [camera, onSelect, pointer, raycaster, updatePointer],
  );

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.style.cursor = "auto";
    };
  }, [gl, handlePointerMove, handlePointerDown, handlePointerUp]);

  useFrame(() => {
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(Array.from(meshRefs.current.values()), false);
    const nextHoveredId = hits[0]?.object.userData.hotspotId ?? null;
    setHoveredId((current) => (current === nextHoveredId ? current : nextHoveredId));
    gl.domElement.style.cursor = nextHoveredId ? "pointer" : "auto";
  });

  return (
    <>
      {hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          hotspot={hotspot}
          hovered={hoveredId === hotspot.id}
          registerMesh={registerMesh}
        />
      ))}
    </>
  );
}
