import { useState, useRef, useEffect, useCallback } from "react";
import { TABS, LAYERS, LAYER_CONFIG } from "../../data/layers";

export function useVideoViewer({ currentVideosPaths, history, onGoBack }) {
  const [isVideosLoaded, setIsVideosLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [floatingOpacity, setFloatingOpacity] = useState(0);
  const [firstVideoOpacity, setFirstVideoOpacity] = useState(0);
  const [secondVideoOpacity, setSecondVideoOpacity] = useState(1);

  const firstVideoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const justNavigatedBackRef = useRef(false);
  const isViewTransitioningRef = useRef(false); // Flag to indicate if we are in a view transition process
  const isInitPlayedRef = useRef(true); // Flag to indicate if we have played the initial video (Home idle)

  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  const currentHistoryEntry = history[history.length - 1]; // Get the current (top) entry
  const activeTab = currentHistoryEntry?.tab || null;
  const activeLayer = currentHistoryEntry?.layer || null;
  const currentItem = currentHistoryEntry?.item || null;
  const numViews = 4;

  // Function to handle view changes (uses activeTab and currentItem derived above)
  const changeView = useCallback(
    (direction) => {
      // console.log("useVideoViewer: changeView called with direction:", direction);
      // Use the locally derived activeTab and currentItem

      const buildingConfig = LAYER_CONFIG[LAYERS.BUILDING];
      if (!buildingConfig) {
        console.error("LAYER_CONFIG for BUILDING not found.");
        return;
      }
      // console.log("current item", currentItem);

      let newIndex = currentViewIndex + (direction === "next" ? 1 : -1);
      // Handle wrap-around
      if (newIndex >= numViews) newIndex = 0;
      if (newIndex < 0) newIndex = numViews - 1;

      const newViewVideos = buildingConfig.getVideosPathForView(
        currentItem,
        newIndex
      );
      if (!newViewVideos) {
        console.error("Could not get video paths for view index:", newIndex);
        return;
      }

      if (direction === "next") {
        playViewTransitionAndIdle(
          newViewVideos.forwardVideo,
          newViewVideos.idleVideo
        );
      } else {
        const buildingViewVideos = buildingConfig.getVideosPathForView(
          currentItem,
          currentViewIndex
        );
        if (!buildingViewVideos?.reverseVideo) {
          console.error(
            "Could not get reverse video path for current view index:",
            currentViewIndex
          );
          return;
        }
        playViewTransitionAndIdle(
          buildingViewVideos.reverseVideo,
          newViewVideos.idleVideo
        );
      }

      setCurrentViewIndex(newIndex);
    },
    [history, currentViewIndex]
  );

  const playVideo = useCallback((src, loop, onloaded = null, onEnded = null, targetRef) => {
    if (!src || !firstVideoRef.current || !secondVideoRef.current) {
      console.warn("playVideo called but src or videoRef is not available");
      return;
    }

    setIsPlaying(!loop);
    const video = targetRef === "second" ? secondVideoRef.current : firstVideoRef.current;
    video.src = src;
    video.load();
    video.onloadeddata = () => {
      if (onloaded) {
        onloaded();
      }
      video.play().catch((e) => console.error("Video play failed:", e, "video src:", src));
    }

    if (onEnded) {
      video.onended = onEnded;
    } else {
      video.onended = null;
    }
  }, []);

  const playTransitionVideo = useCallback((
    transitionVideoPath = currentVideosPaths?.forwardVideo,
    idleVideoPath = currentVideosPaths?.idleVideo
  ) => {
    if (!transitionVideoPath) return;
    console.log("playTransitionVideo called with videoPath:", transitionVideoPath);
    setFloatingOpacity(0);

    const onloaded = () => {
      setFirstVideoOpacity(1);
      setSecondVideoOpacity(0);
    }
    const onEnded = () => {
      playIdleVideo(idleVideoPath);
    }
    playVideo(transitionVideoPath, false, onloaded, onEnded, "first");

  }, [currentVideosPaths, playVideo]);

  const playReverseVideo = useCallback((navigatedBetweenTabs, onReverseEnded, videoPath = currentVideosPaths?.reverseVideo) => {
    if (!videoPath) {
      return;
    }
    console.log("StartReverse called with reverse video:", currentVideosPaths.reverseVideo);
    setFloatingOpacity(0);

    const onloaded = () => {
      setFirstVideoOpacity(1);
      setSecondVideoOpacity(0);
    }

    const onEnded = () => {
      if (navigatedBetweenTabs) {
        onGoBack();
        console.log(currentVideosPaths);

        onReverseEnded();
        return;
      }
      justNavigatedBackRef.current = true;
      onGoBack();
    }

    playVideo(videoPath, false, onloaded, onEnded, "first");
  },
    [currentVideosPaths, playVideo, onGoBack]
  );

  const playIdleVideo = useCallback((videoPath = currentVideosPaths?.idleVideo) => {
    if (!videoPath) return;
    console.log("playIdleVideo called with idleVideo:", videoPath);

    // Ensure we are not in a view transition when this runs due to main navigation
    isViewTransitioningRef.current = false;

    const onloaded = () => {
      setFirstVideoOpacity(0);
      setSecondVideoOpacity(1);
      setFloatingOpacity(1);
    }

    playVideo(videoPath, true, onloaded, null, "second");
  }, [currentVideosPaths, playVideo]);

  // NEW: Dedicated function for view transitions
  const playViewTransitionAndIdle = useCallback(
    (transitionVideoPath, idleVideoPath) => {
      // console.log(`transition vieo path: ${transitionVideoPath},
      //  idle video path: ${idleVideoPath},
      //  videoRef current: ${videoRef.current}`);
      if (!transitionVideoPath || !idleVideoPath || !firstVideoRef.current)
        return;

      // console.log("Starting view transition from:", transitionVideoPath, "to idle:", idleVideoPath);

      // Set flag to indicate we are now transitioning views
      isViewTransitioningRef.current = true;
      setIsPlaying(true);

      const video1 = firstVideoRef.current;
      const video2 = secondVideoRef.current;

      // Define the handler for the *transition* video ending
      const onTransitionEnded = () => {
        // console.log("View transition video ended, switching to idle:", idleVideoPath);
        // Remove the handler from the transition video
        video1.onended = null;

        // Check the flag again before proceeding (in case another transition started)

        // Switch to the new idle video
        video2.src = idleVideoPath;
        video2.load();
        // video2.loop = true;

        video2.onloadeddata = () => {
          setFirstVideoOpacity(0);
          setSecondVideoOpacity(1);
          setFloatingOpacity(1);

          // console.log("View idle video loaded, playing...");
          video2
            .play()
            .catch((e) => console.error("View idle video play failed:", e));
          // Set playing state to false for idle video
          setIsPlaying(false);
          // Transition process is complete, unset the flag
          isViewTransitioningRef.current = false;
        };
      };

      video1.src = transitionVideoPath;
      video1.load();
      // video1.loop = false;
      video1.onended = onTransitionEnded; // Attach handler for *this* transition

      video1.onloadeddata = () => {
        // console.log("View transition video loaded, playing...");
        setFirstVideoOpacity(1);
        setSecondVideoOpacity(0);
        video1
          .play()
          .catch((e) => console.error("View transition play failed:", e));
      };
    },
    []
  );

  const StartReverse = useCallback(
    (isFromAnotherTab, onReverseEnded) => {
      if (history.length <= 1) return;
      if (activeLayer === LAYERS.SURROUNDING_DETAIL) {
        onGoBack();
        return;
      }
      playReverseVideo(isFromAnotherTab, onReverseEnded);
    },
    [history.length, playReverseVideo]
  );

  useEffect(() => {
    if (activeLayer !== LAYERS.SURROUNDING_DETAIL)
      setIsVideosLoaded(false);

    const loadVideoAssets = async () => {
      const shouldStayIdle = justNavigatedBackRef.current;
      justNavigatedBackRef.current = false;

      // Check if we are in the middle of a view transition, if so, don't interfere
      if (isViewTransitioningRef.current) {
        // console.log("Main videos paths changed, but a view transition is ongoing, skipping main load logic.");
        return;
      }

      try {
        setIsVideosLoaded(true);

        setCurrentViewIndex(0);

        if (shouldStayIdle) {
          playIdleVideo();
        } else {
          if (activeTab === TABS.HOME && isInitPlayedRef.current) {
            // console.log("initial HOME tab, playing idle video.");
            setTimeout(() => {
              playIdleVideo();
              isInitPlayedRef.current = false;
            }, 200);
          } else {
            playTransitionVideo();
          }
        }
      } catch (error) {
        console.error("Video loading failed:", error);
      }
    };

    if (currentVideosPaths) {
      loadVideoAssets();
    }
  }, [history, firstVideoRef]); // Watch history and videoRef

  useEffect(() => {
    return () => {
      if (firstVideoRef.current) {
        firstVideoRef.current.pause();
        firstVideoRef.current.src = null;
      }
      if (secondVideoRef.current) {
        secondVideoRef.current.pause();
        secondVideoRef.current.src = null;
      }
    };
  }, []);

  return {
    isVideosLoaded,
    isPlaying,
    firstVideoRef,
    secondVideoRef,
    firstVideoOpacity,
    secondVideoOpacity,
    floatingOpacity,
    StartReverse,
    playViewTransitionAndIdle,
    currentViewIndex,
    changeView,
  };
}
