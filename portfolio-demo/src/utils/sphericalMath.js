import * as THREE from "three";

// Converts a yaw/pitch pair in degrees (the same convention used by the
// production panorama viewer's hotspot data) into a 3D point on a sphere of
// the given radius, so a hotspot can be placed as a real object in the scene.
export function yawPitchToVector3(yawDeg, pitchDeg, radius = 5) {
  const yaw = THREE.MathUtils.degToRad(yawDeg);
  const pitch = THREE.MathUtils.degToRad(pitchDeg);
  return new THREE.Vector3(
    radius * Math.cos(pitch) * Math.sin(yaw),
    radius * Math.sin(pitch),
    -radius * Math.cos(pitch) * Math.cos(yaw),
  );
}
