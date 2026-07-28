import { useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import { yawPitchToVector3 } from "../utils/sphericalMath";
import { HOTSPOT_RADIUS } from "../data/scenes";

export default function Hotspot({ hotspot, hovered, registerMesh }) {
  const meshRef = useRef();
  const position = yawPitchToVector3(hotspot.yaw, hotspot.pitch, HOTSPOT_RADIUS);

  useEffect(() => {
    registerMesh(hotspot.id, meshRef.current);
    return () => registerMesh(hotspot.id, null);
  }, [hotspot.id, registerMesh]);

  const color = hotspot.type === "nav" ? "#4fc3f7" : "#ffca28";

  return (
    <mesh ref={meshRef} position={position} userData={{ hotspotId: hotspot.id }}>
      <sphereGeometry args={[hovered ? 1.7 : 1.2, 16, 16]} />
      <meshBasicMaterial color={color} />
      <Html center distanceFactor={30} style={{ pointerEvents: "none" }}>
        <div className={`hotspot-label${hovered ? " hotspot-label--hovered" : ""}`}>
          {hotspot.label}
        </div>
      </Html>
    </mesh>
  );
}
