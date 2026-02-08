import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { TABS, LAYERS } from "../../data/layers";

import { SidebarContext } from "../../store/SidebarContextProvider";

export function useVideoViewer() {
  const { history, activeTab, activeLayer, currentItem, currentVideosPaths, goBack } = useContext(SidebarContext);

  const [isVideosLoaded, setIsVideosLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [floatingOpacity, setFloatingOpacity] = useState(0);
  const [firstVideoOpacity, setFirstVideoOpacity] = useState(0);
  const [secondVideoOpacity, setSecondVideoOpacity] = useState(1);

  const firstVideoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const justNavigatedBackRef = useRef(false);
  const playSurroundingsIdleRef = useRef(false);
  const isInitPlayedRef = useRef(true); // Flag to indicate if we have played the initial video (Home idle)

  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const numViews = currentItem?.views?.length || 0;

  // Function to handle view changes (uses activeTab and currentItem derived above)
  const changeView = useCallback(
    (direction) => {
      console.log(
        "useVideoViewer: changeView called with direction:",
        direction,
      );
      // Use the locally derived activeTab and currentItem
      // console.log("current item", currentItem);

      let newIndex = currentViewIndex + (direction === "next" ? 1 : -1);
      // Handle wrap-around
      if (newIndex >= numViews) newIndex = 0;
      if (newIndex < 0) newIndex = numViews - 1;

      const newViewVideos = currentItem.views[newIndex]?.videos;
      if (!newViewVideos) {
        console.error("Could not get video paths for view index:", newIndex);
        return;
      }

      if (direction === "next") {
        // console.log("Starting view transition from:", newViewVideos.forwardVideo, "to idle:", newViewVideos.idleVideo);
        playTransitionVideo(
          newViewVideos.forwardVideo,
          newViewVideos.idleVideo,
        );
      } else {
        const buildingViewVideos = currentItem.views[currentViewIndex]?.videos;
        if (!buildingViewVideos?.reverseVideo) {
          console.error(
            "Could not get reverse video path for current view index:",
            currentViewIndex,
          );
          return;
        }
        // console.log("Starting view reverse from:", buildingViewVideos.reverseVideo, "to idle:", newViewVideos.idleVideo);
        playTransitionVideo(
          buildingViewVideos.reverseVideo,
          newViewVideos.idleVideo,
        );
      }
      setCurrentViewIndex(newIndex);
    },
    [history, currentViewIndex],
  );

  const playVideo = useCallback(
    (src, loop, onloaded = null, onEnded = null, targetRef) => {
      if (!src || !firstVideoRef.current || !secondVideoRef.current) {
        console.warn("playVideo called but src or videoRef is not available");
        return;
      }

      setIsPlaying(!loop);
      const video =
        targetRef === "second" ? secondVideoRef.current : firstVideoRef.current;
      video.src = src;
      video.load();
      video.onloadeddata = () => {
        if (onloaded) {
          onloaded();
        }
        video
          .play()
          .catch((e) =>
            console.error("Video play failed:", e, "video src:", src),
          );
      };

      if (onEnded) {
        video.onended = onEnded;
      } else {
        video.onended = null;
      }
    },
    [],
  );

  const playTransitionVideo = useCallback(
    (
      transitionVideoPath = currentVideosPaths?.forwardVideo,
      idleVideoPath = currentVideosPaths?.idleVideo,
    ) => {
      if (!transitionVideoPath || !idleVideoPath) return;
      // console.log("playTransitionVideo called with videoPath:", transitionVideoPath);
      setFloatingOpacity(0);

      const onloaded = () => {
        setFirstVideoOpacity(1);
        setSecondVideoOpacity(0);
      };
      const onEnded = () => {
        playIdleVideo(idleVideoPath);
      };
      playVideo(transitionVideoPath, false, onloaded, onEnded, "first");
    },
    [currentVideosPaths, playVideo],
  );

  const playReverseVideo = useCallback(
    (
      navigatedBetweenTabs,
      onReverseEnded,
      videoPath = currentVideosPaths?.reverseVideo,
    ) => {
      if (!videoPath) {
        return;
      }
      // console.log(navigatedBetweenTabs);

      // console.log("StartReverse called with reverse video:", currentVideosPaths.reverseVideo);
      setFloatingOpacity(0);

      const onloaded = () => {
        setFirstVideoOpacity(1);
        setSecondVideoOpacity(0);
      };

      const onEnded = () => {
        if (navigatedBetweenTabs) {
          goBack();
          // console.log(currentVideosPaths);

          onReverseEnded();
          return;
        }
        justNavigatedBackRef.current = true;
        goBack();
      };

      playVideo(videoPath, false, onloaded, onEnded, "first");
    },
    [currentVideosPaths, playVideo, goBack],
  );

  const playIdleVideo = useCallback(
    (videoPath = currentVideosPaths?.idleVideo) => {
      if (!videoPath) return;
      // console.log("playIdleVideo called with idleVideo:", videoPath);

      const onloaded = () => {
        setFirstVideoOpacity(0);
        setSecondVideoOpacity(1);
        setFloatingOpacity(1);
      };

      playVideo(videoPath, true, onloaded, null, "second");
    },
    [currentVideosPaths, playVideo],
  );

  const StartReverse = useCallback(
    (isFromAnotherTab, onReverseEnded) => {
      if (history.length <= 1) return;
      if (activeLayer === LAYERS.SURROUNDING_DETAIL) {
        playSurroundingsIdleRef.current = true;
        goBack();
        return;
      }
      playReverseVideo(isFromAnotherTab, onReverseEnded);
    },
    [history.length, playReverseVideo],
  );

  useEffect(() => {
    if (activeLayer !== LAYERS.SURROUNDING_DETAIL) setIsVideosLoaded(false);

    const loadVideoAssets = async () => {
      const shouldStayIdle = justNavigatedBackRef.current;
      justNavigatedBackRef.current = false;

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
          } else if (playSurroundingsIdleRef.current) {
            playSurroundingsIdleRef.current = false;
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
    else setIsVideosLoaded(true);
    
  }, [currentVideosPaths]); // Watch history

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
    currentViewIndex,
    changeView,
  };
}
