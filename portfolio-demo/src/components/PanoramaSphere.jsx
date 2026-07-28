import * as THREE from "three";
import { SPHERE_RADIUS } from "../data/scenes";

// Equirectangular panoramas are meant to be viewed from inside a sphere.
// A sphere's "front" faces point outward by default, so from the camera's
// position at the center, those faces are invisible (back-face culled).
// side: BackSide flips which faces the renderer keeps, showing the inward
// surface -- the correct surface for a viewer standing inside the sphere.
//
// verticalFov restricts the sphere to only the vertical band the source
// photo actually covers (real panoramas rarely reach the zenith/nadir),
// centered on the horizon -- otherwise the image would be stretched to
// cover a full sphere it was never shot to fill.
export default function PanoramaSphere({ texture, verticalFov = 180, opacity = 1 }) {
  if (!texture) return null;
  const thetaLength = THREE.MathUtils.degToRad(verticalFov);
  const thetaStart = (Math.PI - thetaLength) / 2;
  return (
    <mesh>
      <sphereGeometry args={[SPHERE_RADIUS, 60, 40, 0, Math.PI * 2, thetaStart, thetaLength]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        transparent={opacity < 1}
        opacity={opacity}
        depthWrite={opacity >= 1}
      />
    </mesh>
  );
}
