import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { yawPitchToVector3 } from "../utils/sphericalMath";

const polarFromPitch = (pitchDeg) => THREE.MathUtils.degToRad(90 - pitchDeg);

export default function CameraRig({ scene }) {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  // Point the camera at the scene's initial yaw before OrbitControls takes
  // over, so each scene opens facing a deliberate direction instead of
  // wherever the previous scene's camera happened to end up. The camera
  // itself stays fixed near the sphere's center -- what moves is the
  // OrbitControls *target* it looks toward (setting camera.position instead
  // would point the camera 180° away from the intended yaw, since it'd be
  // looking back toward the origin rather than out toward `facing`).
  useEffect(() => {
    camera.position.set(0, 0, 0.01);
    const facing = yawPitchToVector3(scene.initialYaw, 0, 1);
    controlsRef.current?.target.copy(facing);
    camera.fov = (scene.fovRange.min + scene.fovRange.max) / 2;
    camera.updateProjectionMatrix();
    controlsRef.current?.update();
  }, [scene.id, camera, scene.initialYaw, scene.fovRange]);

  // Zoom is expressed as field-of-view, not camera distance: the camera
  // never leaves the center of the panorama sphere, so "zooming in" means
  // narrowing the FOV rather than moving toward the surface.
  useEffect(() => {
    const canvas = gl.domElement;
    const handleWheel = (event) => {
      event.preventDefault();
      const next = THREE.MathUtils.clamp(
        camera.fov + event.deltaY * 0.05,
        scene.fovRange.min,
        scene.fovRange.max,
      );
      camera.fov = next;
      camera.updateProjectionMatrix();
    };
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, [camera, gl, scene.fovRange]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={-0.3}
      autoRotate
      autoRotateSpeed={0.35}
      minPolarAngle={polarFromPitch(scene.pitchRange.max)}
      maxPolarAngle={polarFromPitch(scene.pitchRange.min)}
    />
  );
}
