import { useCallback, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import PanoramaSphere from "./PanoramaSphere";
import CameraRig from "./CameraRig";
import HotspotLayer from "./HotspotLayer";
import LoadingOverlay from "./LoadingOverlay";
import InfoOverlay from "./InfoOverlay";
import { useTextureSafe } from "../hooks/useTextureSafe";
import { scenes, getSceneById } from "../data/scenes";

export default function PanoramaViewer() {
  const [sceneId, setSceneId] = useState(scenes[0].id);
  const [error, setError] = useState(false);
  const [retryToken, setRetryToken] = useState(0);
  const [hasShownAny, setHasShownAny] = useState(false);
  const [infoOverlay, setInfoOverlay] = useState(null);
  const targetScene = getSceneById(sceneId);
  const handleError = useCallback(() => setError(true), []);
  const texture = useTextureSafe(targetScene.image, handleError, retryToken);

  // Camera framing and hotspots for a scene only take effect once that
  // scene's texture is actually ready. Without this, they'd apply the
  // instant sceneId changes -- snapping the camera to the new scene's
  // angle while the *old* image was still the one on screen, ahead of the
  // crossfade. Gating on displayedSceneId keeps the old scene fully in
  // control of the camera/hotspots until PanoramaSphere has something to
  // crossfade to. HotspotLayer is mounted off this too (not off `texture`,
  // which refers to the in-flight *target* scene) -- otherwise every
  // scene switch, and any failed load, would leave the viewer with no
  // hotspots at all until the target happened to succeed.
  const [displayedSceneId, setDisplayedSceneId] = useState(sceneId);
  useEffect(() => {
    if (texture) {
      setDisplayedSceneId(sceneId);
      setHasShownAny(true);
    }
  }, [texture, sceneId]);
  const displayedScene = getSceneById(displayedSceneId);
  const isSwitching = sceneId !== displayedSceneId && !error;

  const handleSelect = useCallback(
    (hotspotId) => {
      const hotspot = displayedScene.hotspots.find((candidate) => candidate.id === hotspotId);
      if (!hotspot) return;
      if (hotspot.type === "nav") {
        setError(false);
        setSceneId(hotspot.target);
      } else if (hotspot.type === "info") {
        setInfoOverlay(hotspot);
      }
    },
    [displayedScene],
  );

  const handleRetry = useCallback(() => {
    setError(false);
    setRetryToken((token) => token + 1);
  }, []);

  return (
    <div className="viewer-root">
      <div className="scene-label">
        {displayedScene.label}
        {isSwitching && <span className="scene-label-spinner" aria-hidden="true" />}
      </div>
      <Canvas camera={{ fov: 85, near: 0.1, far: 1000, position: [0, 0, 0.01] }}>
        <PanoramaSphere texture={texture} verticalFov={targetScene.verticalFov} />
        <CameraRig scene={displayedScene} />
        {hasShownAny && <HotspotLayer hotspots={displayedScene.hotspots} onSelect={handleSelect} />}
      </Canvas>
      <LoadingOverlay loading={!hasShownAny && !error} error={error} onRetry={handleRetry} />
      <InfoOverlay info={infoOverlay} onClose={() => setInfoOverlay(null)} />
    </div>
  );
}
