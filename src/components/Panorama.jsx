import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import View360, { EquirectProjection, EVENTS } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import styles from "./Panorama.module.css";

export default function Panorama() {
  const [currentScene, setCurrentScene] = useState(1);
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [preloadedScene, setPreloadedScene] = useState(null);
  const viewerRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const scenes = {
    1: {
      src: "/src/assets/panorama/livingroom.png",
      name: "Living Room",
      hotspots: [
        { yaw: 90, pitch: -10, text: "Kitchen", targetScene: 3 },
        { yaw: 180, pitch: -5, text: "Bedroom", targetScene: 2 }
      ]
    },
    2: {
      src: "/src/assets/panorama/bedroom.png",
      name: "Bedroom",
      hotspots: [
        { yaw: 270, pitch: 0, text: "Back to Living", targetScene: 1 }
      ]
    },
    3: {
      src: "/src/assets/panorama/dinning_kitchen.png",
      name: "Kitchen",
      hotspots: [
        { yaw: 180, pitch: -10, text: "Living Room", targetScene: 1 }
      ]
    }
  };

  const projection = useMemo(
    () => new EquirectProjection({ src: scenes[currentScene].src }),
    [currentScene]
  );

  // Preload next image silently
  const preloadImage = useCallback((sceneId) => {
    const img = new Image();
    img.src = scenes[sceneId].src;
    setPreloadedScene(sceneId);
  }, []);

  // Handle hotspot click with coordinated loading and fade
  const handleHotspotClick = useCallback((hotspot) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setFadeOpacity(1); // Start fade out

    // Clear any pending timeouts
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    const viewer = viewerRef.current;
    if (!viewer) return;

    // Start camera zoom immediately
    // Zoom duration matches fade animation (1000ms)
    viewer.camera.animateTo(
      {
        yaw: hotspot.targetYaw || 0,
        pitch: hotspot.targetPitch || 0,
        zoom: 3
      },
      1000
    );

    // Preload the next scene image immediately
    preloadImage(hotspot.targetScene);

    // Wait for animation + load to complete
    // Total time: 1000ms for zoom + extra buffer for loading
    transitionTimeoutRef.current = setTimeout(() => {
      setCurrentScene(hotspot.targetScene);
      setFadeOpacity(0); // Fade in
      setIsTransitioning(false);
    }, 1100); // Slightly longer than zoom for safety
  }, [isTransitioning, preloadImage]);

  // Handle load event (v4 specific - fires when image is ready)
  const handleLoad = useCallback((evt) => {
    console.log("Image loaded and ready to display:", evt);
  }, []);

  // Handle loadStart event (v4 specific - fires when loading begins)
  const handleLoadStart = useCallback((evt) => {
    console.log("Started loading panorama:", evt.src);
  }, []);

  // Handle projectionChange (v4 specific - fires when switching to new image)
  const handleProjectionChange = useCallback((evt) => {
    console.log("Projection changed, displaying new image");
  }, []);

  // Handle beforeRender for smooth fade coordination (v4 specific)
  const handleBeforeRender = useCallback(() => {
    // This fires every frame before rendering
    // Use for precise fade opacity timing if needed
  }, []);

  const currentSceneData = scenes[currentScene];

  return (
    <div className={styles.tourContainer}>
      <div className={styles.viewerWrapper}>
        <View360
          ref={viewerRef}
          className={styles.viewer}
          projection={projection}
          on={{
            [EVENTS.LOAD]: handleLoad,
            [EVENTS.LOAD_START]: handleLoadStart,
            [EVENTS.PROJECTION_CHANGE]: handleProjectionChange,
            [EVENTS.BEFORE_RENDER]: handleBeforeRender
          }}
        />

        {/* Fade overlay with smooth transition */}
        <div
          className={styles.fadeOverlay}
          style={{
            opacity: fadeOpacity,
            transition: isTransitioning ? "opacity 1s ease-in-out" : "none",
            pointerEvents: fadeOpacity > 0.5 ? "auto" : "none"
          }}
        />

        {/* Hotspots - disabled during transition */}
        <div className={styles.hotspotsLayer}>
          {currentSceneData.hotspots.map((hotspot, idx) => (
            <button
              key={idx}
              className={styles.hotspot}
              style={{
                left: `${((hotspot.yaw || 0) / 360) * 100}%`,
                top: `${50 + ((hotspot.pitch || 0) / 90) * 50}%`,
              }}
              onClick={() => handleHotspotClick({
                targetScene: hotspot.targetScene,
                targetYaw: hotspot.yaw || 0,
                targetPitch: hotspot.pitch || 0
              })}
              disabled={isTransitioning}
              title={hotspot.text}
            >
              {hotspot.text}
            </button>
          ))}
        </div>

        {/* Loading indicator (optional) */}
        {isTransitioning && (
          <div className={styles.loadingIndicator}>
            <div className={styles.spinner} />
          </div>
        )}
      </div>

      <div className={styles.info}>
        <p>Room: {currentSceneData.name}</p>
        <p className={styles.subtitle}>
          {isTransitioning ? "Transitioning..." : "Click room names to navigate"}
        </p>
        {preloadedScene && preloadedScene !== currentScene && (
          <p className={styles.preloadStatus}>
            (Preloading: {scenes[preloadedScene].name})
          </p>
        )}
      </div>
    </div>
  );
}
