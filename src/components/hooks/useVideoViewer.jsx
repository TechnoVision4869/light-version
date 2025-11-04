import { useState, useRef, useEffect, useCallback } from "react";
import { TABS } from "../../data/layers";

export function useVideoViewer({
  currentVideosPaths,
  history,
  activeTab,
  onGoBack,
}) {
  const [isVideosLoaded, setIsVideosLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);
  const justNavigatedBackRef = useRef(false);
  // Flag to indicate if we are in a view transition process
  const isViewTransitioningRef = useRef(false);
  // Flag to indicate if we have played the initial video (Home idle)
  const isInitPlayedRef = useRef(true);

  const playVideo = useCallback((src, loop = false, onEnded = null) => {
    if (!src || !videoRef.current) {
      console.warn("playVideo called but src or videoRef.current is not available", { src, videoRefCurrent: videoRef.current });
      return; // Exit if not ready
    }

    setIsPlaying(!loop);
    const video = videoRef.current;
    video.src = src;
    video.load();
    video.loop = loop;

    video.onloadeddata = () => {
      video.play().catch((e) => console.error("Video play failed:", e));
    };

    // Clear previous onended and set the new one if provided
    if (onEnded) {
      video.onended = onEnded;
    } else {
      video.onended = null;
    }
  }, []);

  const playForwardVideo = useCallback(() => {
    if (!currentVideosPaths?.forwardVideo) return;
    console.log("playForwardVideo called with forwardVideo:", currentVideosPaths.forwardVideo);

    playVideo(currentVideosPaths.forwardVideo, false, playIdleVideo);
  }, [currentVideosPaths, playVideo]);

  const playReverseVideo = useCallback(() => {
    if (!currentVideosPaths?.reverseVideo) return;
    console.log("Reverse video", currentVideosPaths.reverseVideo);

    playVideo(currentVideosPaths.reverseVideo, false, () => {
      justNavigatedBackRef.current = true;
      onGoBack();
    });
  }, [currentVideosPaths, playVideo, onGoBack]);

  const playIdleVideo = useCallback(() => {
    if (!currentVideosPaths?.idleVideo) return;
    // console.log("playIdleVideo called with idleVideo:", currentVideosPaths.idleVideo);
    // Ensure we are not in a view transition when this runs due to main navigation
    isViewTransitioningRef.current = false;
    playVideo(currentVideosPaths.idleVideo, true);
  }, [currentVideosPaths, playVideo]);

  // NEW: Dedicated function for view transitions
  const playViewTransitionAndIdle = useCallback(
    (transitionVideoPath, idleVideoPath) => {
      console.log(`transition vieo path: ${transitionVideoPath},
         idle video path: ${idleVideoPath},
         videoRef current: ${videoRef.current}`);
      if (!transitionVideoPath || !idleVideoPath || !videoRef.current) return;

      // console.log("Starting view transition from:", transitionVideoPath, "to idle:", idleVideoPath);

      // Set flag to indicate we are now transitioning views
      isViewTransitioningRef.current = true;
      setIsPlaying(true);

      const video = videoRef.current;

      // Define the handler for the *transition* video ending
      const onTransitionEnded = () => {
        // console.log("View transition video ended, switching to idle:", idleVideoPath);
        // Remove the handler from the transition video
        video.onended = null;

        // Check the flag again before proceeding (in case another transition started)

        // Switch to the new idle video
        video.src = idleVideoPath;
        video.load();
        video.loop = true;

        video.onloadeddata = () => {
          // console.log("View idle video loaded, playing...");
          video
            .play()
            .catch((e) => console.error("View idle video play failed:", e));
          // Set playing state to false for idle video
          setIsPlaying(false);
          // Transition process is complete, unset the flag
          isViewTransitioningRef.current = false;
        };

      };

      // Set the transition video source and handler
      video.src = transitionVideoPath;
      video.load();
      video.loop = false;
      video.onended = onTransitionEnded; // Attach handler for *this* transition

      video.onloadeddata = () => {
        // console.log("View transition video loaded, playing...");
        video
          .play()
          .catch((e) => console.error("View transition play failed:", e));
      };
    },
    []
  );

  const StartReverse = useCallback(() => {
    if (history.length <= 1) return;
    console.log("StartReverse called with current reverse video:", currentVideosPaths.reverseVideo);
    
    playReverseVideo();
  }, [history.length, playReverseVideo]);

  useEffect(() => {
    console.log(currentVideosPaths);
    console.log(history);
  }, [currentVideosPaths, history])

  useEffect(() => {
    setIsVideosLoaded(false);

    const loadVideoAssets = async () => {
      const shouldStayIdle = justNavigatedBackRef.current;
      justNavigatedBackRef.current = false;

      try {
        setIsVideosLoaded(true);

        // Check if we are in the middle of a view transition, if so, don't interfere
        if (isViewTransitioningRef.current) {
          // console.log("Main videos paths changed, but a view transition is ongoing, skipping main load logic.");
          return;
        }

        if (shouldStayIdle) {
          playIdleVideo();
        } else {
          if (activeTab === TABS.HOME) {
            // console.log("Active tab is HOME, playing idle video.");
            if (isInitPlayedRef.current) {
              setTimeout(() => {
                playIdleVideo();
              }, 200);
            } else {
              playIdleVideo();
            }
          } else {
            playForwardVideo();
          }
        }
      } catch (error) {
        console.error("Video loading failed:", error);
      }
    };

    if (currentVideosPaths) {
      loadVideoAssets();
    }
  }, [history, videoRef]); // Watch history and videoRef

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = null;
      }
    };
  }, []);

  return {
    isVideosLoaded,
    isPlaying,
    videoRef,
    StartReverse,
    playViewTransitionAndIdle,
    playForwardVideo,
    playReverseVideo,
    playIdleVideo,
  };
}