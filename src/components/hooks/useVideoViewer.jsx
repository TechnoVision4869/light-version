import { useState, useRef, useEffect, useCallback } from "react";
import { TABS } from "../../data/layers";

export function useVideoViewer({
  currentVideosPaths,
  history,
  activeTab,
  onGoBack
}) {
  // States
  const [isVideosLoaded, setIsVideosLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Refs
  const videoRef = useRef(null);
  const justNavigatedBackRef = useRef(false);

  // Play forward transition video
  const playForwardVideo = useCallback(() => {
    if (!currentVideosPaths?.forwardVideo || !videoRef.current) return;

    setIsPlaying(true);
    const video = videoRef.current;
    video.src = currentVideosPaths.forwardVideo;
    video.load();
    video.loop = false;

    video.onloadeddata = () => {
      video.play().catch(e => console.error("Forward video play failed:", e));
    };

    video.onended = () => {
      // Play idle video after forward transition
      playIdleVideo();
    };
  }, [currentVideosPaths]);

  // Play reverse transition video
  const playReverseVideo = useCallback(() => {
    if (!currentVideosPaths?.reverseVideo || !videoRef.current) return;

    setIsPlaying(true);
    const video = videoRef.current;
    video.src = currentVideosPaths.reverseVideo;
    video.load();
    video.loop = false;

    video.onloadeddata = () => {
      video.play().catch(e => console.error("Reverse video play failed:", e));
    };

    video.onended = () => {
      // Mark that we just navigated back
      justNavigatedBackRef.current = true;
      // Go back in history
      onGoBack();
    };
  }, [currentVideosPaths, onGoBack]);

  // Play idle (looping) video
  const playIdleVideo = useCallback(() => {
    if (!currentVideosPaths?.idleVideo || !videoRef.current) return;

    setIsPlaying(false); // Idle is not considered "playing" for UI purposes
    const video = videoRef.current;
    video.src = currentVideosPaths.idleVideo;
    video.load();
    video.loop = true;

    video.onloadeddata = () => {
      video.play().catch(e => console.error("Idle video play failed:", e));
    };
  }, [currentVideosPaths]);

  // Start reverse video (called from App.jsx)
  const StartReverse = useCallback(() => {
    if (history.length <= 1) return;
    playReverseVideo();
  }, [history.length, playReverseVideo]);

  // Load video assets when history changes
  useEffect(() => {
    // Reset states for new path
    setIsVideosLoaded(false);

    const loadVideoAssets = async () => {
      const shouldSkipAutoPlay = justNavigatedBackRef.current;
      justNavigatedBackRef.current = false;

      try {
        setIsVideosLoaded(true);

        if (shouldSkipAutoPlay) {
          // After back navigation, play idle video
          playIdleVideo();
        } else {
          if (activeTab === TABS.HOME) {
            // For HOME, just play idle
            console.log("Tab is Home, should play idle");
            playIdleVideo();
          } else {
            // Start forward video
            console.log("start transition");
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
    console.log(history);

  }, [history, currentVideosPaths]);

  // Cleanup on unmount
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
    playForwardVideo,
    playReverseVideo,
    playIdleVideo
  };
}