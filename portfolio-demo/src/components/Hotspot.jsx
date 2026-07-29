import { useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import { yawPitchToVector3 } from "../utils/sphericalMath";
import { HOTSPOT_RADIUS } from "../data/scenes";

const HIT_RADIUS = 2.2;

export default function Hotspot({ hotspot, hovered, registerMesh }) {
  const meshRef = useRef();
  const position = yawPitchToVector3(hotspot.yaw, hotspot.pitch, HOTSPOT_RADIUS);

  useEffect(() => {
    registerMesh(hotspot.id, meshRef.current);
    return () => registerMesh(hotspot.id, null);
  }, [hotspot.id, registerMesh]);

  return (
    <mesh ref={meshRef} position={position} userData={{ hotspotId: hotspot.id }}>
      {/* Invisible hit-target for the raycaster in HotspotLayer -- the
          visible marker below is plain CSS, layered on top via <Html>. */}
      <sphereGeometry args={[HIT_RADIUS, 12, 12]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      <Html center distanceFactor={30} style={{ pointerEvents: "none" }}>
        <div className="hotspot-anchor">
          <div
            className={`hotspot-marker hotspot-marker--${hotspot.type}${
              hovered ? " hotspot-marker--hovered" : ""
            }`}
          />
          <div className={`hotspot-label${hovered ? " hotspot-label--hovered" : ""}`}>
            {hotspot.label}
          </div>
        </div>
      </Html>
    </mesh>
  );
}
