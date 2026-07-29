import { useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import PanoramaSphere from "./PanoramaSphere";
import CameraRig from "./CameraRig";
import HotspotLayer from "./HotspotLayer";
import LoadingOverlay from "./LoadingOverlay";
import { useTextureSafe } from "../hooks/useTextureSafe";
import { scenes, getSceneById } from "../data/scenes";

export default function PanoramaViewer() {
  const [sceneId, setSceneId] = useState(scenes[0].id);
  const [error, setError] = useState(false);
  const scene = getSceneById(sceneId);
  const handleError = useCallback(() => setError(true), []);
  const texture = useTextureSafe(scene.image, handleError);

  const handleSelect = useCallback(
    (hotspotId) => {
      const hotspot = scene.hotspots.find((candidate) => candidate.id === hotspotId);
      if (!hotspot?.target) return;
      setError(false);
      setSceneId(hotspot.target);
    },
    [scene],
  );

  return (
    <div className="viewer-root">
      <div className="scene-label">{scene.label}</div>
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 0.01] }}>
        <PanoramaSphere texture={texture} verticalFov={scene.verticalFov} />
        <CameraRig scene={scene} />
        {texture && <HotspotLayer hotspots={scene.hotspots} onSelect={handleSelect} />}
      </Canvas>
      <LoadingOverlay loading={!texture && !error} error={error} />
    </div>
  );
}
