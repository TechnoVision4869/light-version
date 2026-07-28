import { useCallback, useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Hotspot from "./Hotspot";

// Three.js objects aren't DOM elements -- a mesh floating in 3D space has no
// native "onClick". A Raycaster projects an invisible line from the camera
// through the pointer position each frame and reports which object it
// passes through first, which is how we detect hovering/clicking a hotspot.
export default function HotspotLayer({ hotspots, onSelect }) {
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster()).current;
  const pointer = useRef(new THREE.Vector2(-10, -10)).current;
  const meshRefs = useRef(new Map());
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

  const handlePointerDown = useCallback(
    (event) => {
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(Array.from(meshRefs.current.values()), false)[0];
      if (hit) onSelect(hit.object.userData.hotspotId);
    },
    [camera, onSelect, pointer, raycaster, updatePointer],
  );

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointermove", updatePointer);
    canvas.addEventListener("pointerdown", handlePointerDown);
    return () => {
      canvas.removeEventListener("pointermove", updatePointer);
      canvas.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [gl, updatePointer, handlePointerDown]);

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
