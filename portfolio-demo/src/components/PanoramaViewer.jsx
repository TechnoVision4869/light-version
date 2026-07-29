import { useCallback, useEffect, useState } from "react";
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
  const [isSwitching, setIsSwitching] = useState(false);
  const [retryToken, setRetryToken] = useState(0);
  const scene = getSceneById(sceneId);
  const handleError = useCallback(() => setError(true), []);
  const texture = useTextureSafe(scene.image, handleError, retryToken);

  // The new scene's camera framing and hotspots apply the instant sceneId
  // changes, but the new texture arrives an async tick later -- without this,
  // there'd be a flash of the new camera angle/hotspots over the old image.
  // Keeping the overlay up until the new texture is actually in hand covers
  // that gap.
  useEffect(() => {
    if (texture) setIsSwitching(false);
  }, [texture]);

  const handleSelect = useCallback(
    (hotspotId) => {
      const hotspot = scene.hotspots.find((candidate) => candidate.id === hotspotId);
      if (!hotspot?.target) return;
      setError(false);
      setIsSwitching(true);
      setSceneId(hotspot.target);
    },
    [scene],
  );

  const handleRetry = useCallback(() => {
    setError(false);
    setRetryToken((token) => token + 1);
  }, []);

  return (
    <div className="viewer-root">
      <div className="scene-label">{scene.label}</div>
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 0.01] }}>
        <PanoramaSphere texture={texture} verticalFov={scene.verticalFov} />
        <CameraRig scene={scene} />
        {texture && <HotspotLayer hotspots={scene.hotspots} onSelect={handleSelect} />}
      </Canvas>
      <LoadingOverlay
        loading={isSwitching || (!texture && !error)}
        error={error}
        onRetry={handleRetry}
      />
    </div>
  );
}
