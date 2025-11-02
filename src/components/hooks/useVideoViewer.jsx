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
  // NEW: Flag to indicate if we are in a view transition process
  const isViewTransitioningRef = useRef(false);

  const playVideo = useCallback((src, loop = false, onEnded = null) => {
    if (!src || !videoRef.current) return;

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
    playVideo(currentVideosPaths.forwardVideo, false, playIdleVideo);
  }, [currentVideosPaths, playVideo]);

  const playReverseVideo = useCallback(() => {
    if (!currentVideosPaths?.reverseVideo) return;

    playVideo(currentVideosPaths.reverseVideo, false, () => {
      justNavigatedBackRef.current = true;
      onGoBack();
    });
  }, [currentVideosPaths, playVideo, onGoBack]);

  const playIdleVideo = useCallback(() => {
    if (!currentVideosPaths?.idleVideo) return;
    // Ensure we are not in a view transition when this runs due to main navigation
    isViewTransitioningRef.current = false;
    playVideo(currentVideosPaths.idleVideo, true);
  }, [currentVideosPaths, playVideo]);

  // NEW: Dedicated function for view transitions
  const playViewTransitionAndIdle = useCallback(
    (transitionVideoPath, idleVideoPath) => {
      if (!transitionVideoPath || !idleVideoPath || !videoRef.current) return;

      console.log("Starting view transition from:", transitionVideoPath, "to idle:", idleVideoPath);

      // Set flag to indicate we are now transitioning views
      isViewTransitioningRef.current = true;
      setIsPlaying(true);

      const video = videoRef.current;

      // Define the handler for the *transition* video ending
      const onTransitionEnded = () => {
        console.log("View transition video ended, switching to idle:", idleVideoPath);
        // Remove the handler from the transition video
        video.onended = null;

        // Check the flag again before proceeding (in case another transition started)
        if (isViewTransitioningRef.current) {
          // Switch to the new idle video
          video.src = idleVideoPath;
          video.load();
          video.loop = true;

          video.onloadeddata = () => {
            console.log("View idle video loaded, playing...");
            video
              .play()
              .catch((e) => console.error("View idle video play failed:", e));
            // Set playing state to false for idle video
            setIsPlaying(false);
            // Transition process is complete, unset the flag
            isViewTransitioningRef.current = false;
          };
        } else {
          console.log("View transition was interrupted, not switching to idle.");
        }
      };

      // Set the transition video source and handler
      video.src = transitionVideoPath;
      video.load();
      video.loop = false;
      video.onended = onTransitionEnded; // Attach handler for *this* transition

      video.onloadeddata = () => {
        console.log("View transition video loaded, playing...");
        video
          .play()
          .catch((e) => console.error("View transition play failed:", e));
      };
    },
    []
  );

  const StartReverse = useCallback(() => {
    if (history.length <= 1) return;
    playReverseVideo();
  }, [history.length, playReverseVideo]);

  useEffect(() => {
    setIsVideosLoaded(false);

    const loadVideoAssets = async () => {
      const shouldSkipAutoPlay = justNavigatedBackRef.current;
      justNavigatedBackRef.current = false;

      try {
        setIsVideosLoaded(true);

        // Check if we are in the middle of a view transition, if so, don't interfere
        if (isViewTransitioningRef.current) {
             console.log("Main history changed, but a view transition is ongoing, skipping main load logic.");
            // Maybe just ensure isVideosLoaded is true if needed by UI?
            // Or potentially cancel the ongoing view transition if history changed unexpectedly.
            // For now, just skip loading main videos.
            return;
        }

        if (shouldSkipAutoPlay) {
          playIdleVideo();
        } else {
          if (activeTab === TABS.HOME) {
            playIdleVideo();
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
  }, [history, currentVideosPaths]); // Watch history and currentVideosPaths

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