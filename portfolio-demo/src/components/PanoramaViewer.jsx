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
  const [retryToken, setRetryToken] = useState(0);
  const targetScene = getSceneById(sceneId);
  const handleError = useCallback(() => setError(true), []);
  const texture = useTextureSafe(targetScene.image, handleError, retryToken);

  // Camera framing and hotspots for a scene only take effect once that
  // scene's texture is actually ready. Without this, they'd apply the
  // instant sceneId changes -- snapping the camera to the new scene's
  // angle while the *old* image was still the one on screen, ahead of the
  // crossfade. Gating on displayedSceneId keeps the old scene fully in
  // control of the camera/hotspots until PanoramaSphere has something to
  // crossfade to.
  const [displayedSceneId, setDisplayedSceneId] = useState(sceneId);
  useEffect(() => {
    if (texture) setDisplayedSceneId(sceneId);
  }, [texture, sceneId]);
  const displayedScene = getSceneById(displayedSceneId);

  const handleSelect = useCallback(
    (hotspotId) => {
      const hotspot = displayedScene.hotspots.find((candidate) => candidate.id === hotspotId);
      if (!hotspot?.target) return;
      setError(false);
      setSceneId(hotspot.target);
    },
    [displayedScene],
  );

  const handleRetry = useCallback(() => {
    setError(false);
    setRetryToken((token) => token + 1);
  }, []);

  return (
    <div className="viewer-root">
      <div className="scene-label">{displayedScene.label}</div>
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 0.01] }}>
        <PanoramaSphere texture={texture} verticalFov={targetScene.verticalFov} />
        <CameraRig scene={displayedScene} />
        {texture && (
          <HotspotLayer hotspots={displayedScene.hotspots} onSelect={handleSelect} />
        )}
      </Canvas>
      <LoadingOverlay
        loading={!texture && !error && sceneId === displayedSceneId}
        error={error}
        onRetry={handleRetry}
      />
    </div>
  );
}
