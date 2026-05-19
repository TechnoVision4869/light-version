import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { TABS, LAYERS } from "../../data/layers";

import { SidebarContext } from "../../store/SidebarContextProvider";
import { APP_CONFIG, ASSET_TYPES } from "../../config/appConfig";

export function useVideoViewer() {
  const {
    history,
    activeTab,
    activeLayer,
    currentViews,
    currentVideosPaths,
    goBack,
    isPlaying,
    setIsPlaying,
  } = useContext(SidebarContext);

  const [isVideosLoaded, setIsVideosLoaded] = useState(false);

  const [floatingOpacity, setFloatingOpacity] = useState(0);
  const [firstVideoOpacity, setFirstVideoOpacity] = useState(0);
  const [secondVideoOpacity, setSecondVideoOpacity] = useState(0);

  const firstVideoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const visibleRefRef = useRef("second"); // tracks which video element is currently visible/opaque
  const justNavigatedBackRef = useRef(false);
  const skipNextTransitionRef = useRef(false);
  const playSurroundingsIdleRef = useRef(false);
  const isInitPlayedRef = useRef(true); // Flag to indicate if we have played the initial video (Home idle)

  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const numViews = currentViews?.length || 0;

  // Function to handle view changes (uses activeTab and currentViews derived above)
  const changeView = useCallback(
    (direction) => {
      // console.log(
      //   "useVideoViewer: changeView called with direction:",
      //   direction,
      // );
      // Use the locally derived activeTab and currentViews

      let newIndex = currentViewIndex + (direction === "next" ? 1 : -1);
      // Handle wrap-around
      if (newIndex >= numViews) newIndex = 0;
      if (newIndex < 0) newIndex = numViews - 1;

      const newViewVideos = currentViews?.[newIndex]?.videos;
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
        const buildingViewVideos = currentViews?.[currentViewIndex]?.videos;
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
    [currentViewIndex, currentViews, numViews],
  );

  // Always returns the name of the ref that is currently hidden (safe to load into)
  const getHiddenRef = useCallback(
    () => (visibleRefRef.current === "second" ? "first" : "second"),
    [],
  );

  const playVideo = useCallback(
    (src, loop, onloaded = null, onEnded = null, targetRef) => {
      if (!src || !firstVideoRef.current || !secondVideoRef.current) {
        console.warn("playVideo called but src or videoRef is not available");
        return;
      }

      if (!loop) setIsPlaying(true);
      const video =
        targetRef === "second" ? secondVideoRef.current : firstVideoRef.current;
      video.loop = loop;
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
      video.onerror = () => {
        console.error("Video load error, src:", src);
        setIsPlaying(false);
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
      if (!idleVideoPath) return;
      if (!transitionVideoPath) {
        // If no transition video, directly play idle video
        console.log("No transition video, playing idle video:", idleVideoPath);
        playIdleVideo(idleVideoPath);
        return;
      }
      // console.log("playTransitionVideo called with videoPath:", transitionVideoPath);
      setFloatingOpacity(0);

      const target = getHiddenRef(); // load on the currently hidden ref — no flash
      const onloaded = () => {
        setFirstVideoOpacity(target === "first" ? 1 : 0);
        setSecondVideoOpacity(target === "second" ? 1 : 0);
        visibleRefRef.current = target;
      };
      const onEnded = () => {
        playIdleVideo(idleVideoPath);
      };
      playVideo(transitionVideoPath, false, onloaded, onEnded, target);
    },
    [currentVideosPaths, playVideo, getHiddenRef],
  );

  const playReverseVideo = useCallback(
    (
      navigatedBetweenTabs,
      onReverseEnded,
      videoPath = currentVideosPaths?.reverseVideo,
    ) => {
      if (!videoPath) {
        console.warn("no video path");
        justNavigatedBackRef.current = true;
        goBack();
        return;
      }
      // console.log(navigatedBetweenTabs);
      // console.log("StartReverse called with reverse video:", currentVideosPaths.reverseVideo);
      setFloatingOpacity(0);

      const target = getHiddenRef(); // load on the currently hidden ref — no flash
      const onloaded = () => {
        setFirstVideoOpacity(target === "first" ? 1 : 0);
        setSecondVideoOpacity(target === "second" ? 1 : 0);
        visibleRefRef.current = target;
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

      playVideo(videoPath, false, onloaded, onEnded, target);
    },
    [currentVideosPaths, playVideo, goBack, getHiddenRef],
  );

  const playIdleVideo = useCallback(
    (videoPath = currentVideosPaths?.idleVideo) => {
      if (!videoPath) return;
      // console.log("playIdleVideo called with idleVideo:", videoPath);

      if(activeLayer === LAYERS.UNIT) {
        const isImage = /\.(png|jpe?g|webp|avif)$/i.test(videoPath);
        if (isImage) {
          setFloatingOpacity(1);
          setIsPlaying(false);

          if (APP_CONFIG.IDLE_TYPE === ASSET_TYPES.VIDEO) {
            console.warn(
              "Idle video path is an image but APP_CONFIG.IDLE_TYPE is not set to IMAGE. Please check your configuration.",
            );
          }
          return;
        }

        if (APP_CONFIG.IDLE_TYPE === ASSET_TYPES.IMAGE) {
          console.warn(
            "Idle video path is a video but APP_CONFIG.IDLE_TYPE is not set to VIDEO. Please check your configuration.",
          );
        }
      }

      if(activeLayer === LAYERS.AMENITY_DETAIL) {

      }

      const target = getHiddenRef(); // always load into the hidden ref — no flash
      const onloaded = () => {
        setFirstVideoOpacity(target === "first" ? 1 : 0);
        setSecondVideoOpacity(target === "second" ? 1 : 0);
        setFloatingOpacity(1);
        visibleRefRef.current = target;
        setIsPlaying(false);
      };

      playVideo(videoPath, true, onloaded, null, target);
    },
    [currentVideosPaths, playVideo, getHiddenRef],
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

        if (shouldStayIdle || skipNextTransitionRef.current) {
          skipNextTransitionRef.current = false;
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
            if (activeTab !== TABS.SURROUNDINGS || activeLayer !== null) {
              // Flag was stale — effect didn't fire for the back navigation,
              // so this is a completely different destination. Play normally.
              playTransitionVideo();
            }
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
    } else setIsVideosLoaded(true);
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
    skipNextTransition: () => {
      skipNextTransitionRef.current = true;
    },
  };
}
