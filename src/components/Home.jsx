import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "@capacitor/status-bar";
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from "@capacitor/app"
import { TABS, LAYERS, CONFIG } from "../data/layers.js";
// Hooks
import { useVideoViewer } from "./hooks/useVideoViewer.jsx";

// Components
import LandscapePrompt from "./LandscapePrompt.jsx";
import { useTabletImmersiveMode } from "./hooks/useTabletImmersiveMode";
import InfoPopup from "./InfoPopup.jsx";

import HomeButton from "./buttons/HomeButton";

import HistoryBreadcrumbs from "./HistoryBreadcrumbs";
import BaseFloat from "./floating/BaseFloat";

import Panorama from "./Panorama";
import Balcony from "./Balcony";
import Room from "./Room";
import Gallery from "./Gallery";
import AnimatedPath from "./AnimatedPath";

// Context
import FilterContextProvider from "../store/FilterContextProvider";
import { SidebarContext } from "../store/SidebarContextProvider";
import Sidebar from "./Sidebar";
import { MainContext } from "../store/MainContextProvider";

// logo
import TECHNO_LOGO from "../assets/techno.png";
import Highlight from "./Highlight.jsx";
import Test from "./Test.jsx";
import { APP_CONFIG } from "../config/appConfig";
import PreloadProgressPanel from "./dev/PreloadProgressPanel.jsx";
export default function Home({ introVideoUrl = null, onExitRequest }) {
  //states
  const { eligible: tabletImmersiveEligible, isFullscreen, requestImmersive } = useTabletImmersiveMode();
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showI, setShowI] = useState(false);
  const [floorSwitchBlur, setFloorSwitchBlur] = useState(false);
  // Ref
  const mediaContainerRef = useRef(null);

  // Navigation
  const navigate = useNavigate();

  // Context
  const {
    currentProject,
    history,
    activeTab,
    activeLayer,
    currentItem,
    currentViews,
    setHighlightedButton,
    sidebarOpen,
    handleSidebarState,
    goToTab,
    goHome,
    clearSelectedProject,
    switchToFloor,
    currentVideosPaths } = useContext(SidebarContext);

  const { overlay, closeOverlay } = useContext(MainContext);

  const videoViewer = useVideoViewer();

  let viewerProps = {
    isMediaLoaded: videoViewer.isVideosLoaded,
    isIdleImage: videoViewer.isIdleImage,
    isPlaying: videoViewer.isPlaying,
    firstMediaRef: videoViewer.firstVideoRef,
    secondMediaRef: videoViewer.secondVideoRef,
    firstVideoOpacity: videoViewer.firstVideoOpacity,
    secondVideoOpacity: videoViewer.secondVideoOpacity,
    floatingOpacity: videoViewer.floatingOpacity,
    StartReverse: videoViewer.StartReverse,
    currentViewIndex: videoViewer.currentViewIndex, // Now managed by the hook
    changeView: videoViewer.changeView, // Now managed by the hook
    changeViewToIndex: videoViewer.changeViewToIndex,
    isFloorTransitionBlur: videoViewer.isFloorTransitionBlur,
  };

  const isDisabled = !viewerProps.isMediaLoaded || viewerProps.isPlaying;
  const isSidebarSupportedLayer =
    activeTab !== TABS.HOME &&
    activeLayer !== LAYERS.AMENITY_DETAIL &&
    activeLayer !== LAYERS.SURROUNDING_DETAIL;
  const shouldApplySidebarGap = isSidebarSupportedLayer && sidebarOpen;

  // Floors available when at FLOOR layer — pulled from the parent BUILDING entry
  const parentBuilding = activeLayer === LAYERS.FLOOR ? history[history.length - 2]?.item : null;
  const floors = parentBuilding?.floors || [];

  const handleFloorSwitch = useCallback((floor) => {
    if (floor.id === currentItem?.id) return;
    const doSwitch = () => {
      setFloorSwitchBlur(true);
      setTimeout(() => {
        videoViewer.skipNextTransition();
        switchToFloor(floor);
        setTimeout(() => setFloorSwitchBlur(false), 600);
      }, 250);
    };
    if (videoViewer.currentViewIndex !== 0) {
      videoViewer.changeViewToIndex(0, doSwitch);
    } else {
      doSwitch();
    }
  }, [currentItem, switchToFloor, videoViewer]);

  const handleBack = useCallback(() => {
    if (
      (activeTab === TABS.ZONES || activeTab === TABS.AMENITIES || activeTab === TABS.SURROUNDINGS) &&
      activeLayer === null
    ) {
      handleSidebarState(false);
    }
    if (overlay) {
      closeOverlay();
      return;
    }
    const doBack = () => videoViewer.StartReverse(false, () => {});
    if (videoViewer.currentViewIndex !== 0) {
      videoViewer.changeViewToIndex(0, doBack);
      return;
    }
    doBack();
  }, [activeTab, activeLayer, overlay, videoViewer, handleSidebarState, closeOverlay]);

  const { currentViewIndex: viewerViewIndex, changeViewToIndex } = videoViewer;
  const onNavigate = useCallback((action) => {
    if (viewerViewIndex !== 0) {
      changeViewToIndex(0, action);
    } else {
      action();
    }
  }, [viewerViewIndex, changeViewToIndex]);

  const handleActiveTab = useCallback((tab) => {
    if (tab === activeTab) {
      if (tab === TABS.HOME) return;
      if (activeLayer === null) return;
      if (tab === TABS.ZONES && activeLayer === LAYERS.ZONE_DETAIL) return;
      if (tab === TABS.SURROUNDINGS && activeLayer === LAYERS.SURROUNDING_DETAIL) {
       viewerProps.StartReverse(false, () => { });
       return;
      }     
    }

    let selectedItem = null;
    let layer = null;

    switch (tab) {
      case TABS.HOME:
        goHome();
        break;
      case TABS.ZONES:
        selectedItem = currentProject.zones;
        if(selectedItem.items.length === 1) {
          const zonesZoomoutVideo = selectedItem.zoomoutVideo || selectedItem.zonesZoomoutVideoId;
          selectedItem = { ...selectedItem.items[0], zoomoutVideo: zonesZoomoutVideo };
          layer = LAYERS.ZONE_DETAIL;
        }
        checkSwithingBetweenTabs();
        break;
      case TABS.AMENITIES:
        selectedItem = currentProject.amenities;
        checkSwithingBetweenTabs();
        break;
      case TABS.SURROUNDINGS:
        selectedItem = currentProject.surroundings;
        checkSwithingBetweenTabs();
        break;
      default:
        break;
    }

    function checkSwithingBetweenTabs() {
      const isFromHome = activeTab === TABS.HOME;

      // uncomment to play reverse then forward when switching between non-home tabs
      //  if(!isFromHome && !activeLayer) {
      //     viewerProps.StartReverse(true, () => goToTab(tab, item, true));
      //     return;
      //   }
      goToTab(tab, layer, selectedItem, isFromHome);
    }

    setTimeout(() => {
      handleSidebarState(true);
    }, 750);
  }, [activeTab, activeLayer, goToTab, videoViewer.StartReverse]);

  useEffect(() => {
    setHighlightedButton(null);
    // Show info popup if item has description
    if (!currentItem) return

    if (currentItem?.description) setShowInfoPopup(true);
    setShowI(false);

  }, [currentItem])

  // Close popup
  const closeInfoPopup = () => {
    setShowInfoPopup(false);
    setShowI(true);
  };

  // Swipe States
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const threshold = 50;

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
  };
  const handleMouseUp = (e) => {
    setTranslateX(startX - e.clientX);
  };

  const handleTouchStart = (e) => {
    if (currentViews?.length) {
      setStartX(e.changedTouches[0].clientX);
    }
  };

  const handleTouchEnd = (e) => {
    if (currentViews?.length) {
      // e.preventDefault();
      setTranslateX(startX - e.changedTouches[0].clientX);
    }
  }

  useEffect(() => {
    if (!currentViews?.length) return;

    if (isDisabled) return;
    // console.log(translateX);

    if (translateX > threshold) viewerProps.changeView("next");
    else if (translateX < -threshold) viewerProps.changeView("prev");
  }, [translateX]);

  useEffect(() => {
    const hideBars = async () => {
      if (Capacitor.getPlatform() !== 'web') {
        await StatusBar.hide();
        await StatusBar.setOverlaysWebView({ overlay: true });
      }
    };
    hideBars();
    const resumeListener = CapApp.addListener("resume", hideBars);

    return () => {
      resumeListener.then(listener => listener.remove());
    }
  }, []);

  // Close any overlay when navigating away from UNIT layer
  useEffect(() => {
    if (overlay && activeLayer !== LAYERS.UNIT) {
      closeOverlay();
    }
  }, [activeLayer]);

  return (
    <>
      {/* Unified Overlay Management */}
      {overlay?.type === 'panorama' && (
        <div className="absolute inset-0 z-60">
          <div className={`w-screen h-screen bg-[#2f2f2f] p-2 sm:p-4`} />
          <div className="absolute top-2 left-7 z-40">
            <button
              onClick={closeOverlay}
              className="w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center
                hover:bg-white/7 transition
                disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Close panorama view"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31 12H2M2 12L9 6M2 12L9 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="absolute inset-0">
            <Panorama key="panorama-viewer" unit={overlay.data.unit} />
          </div>
        </div>
      )}

      {overlay?.type === 'balcony' && (
        <div className="absolute inset-0 z-60">
          <div className={`w-screen h-screen bg-[#2f2f2f] p-2 sm:p-4`} />
          <div className="absolute top-2 left-7 z-40">
            <button
              onClick={closeOverlay}
              className="w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center
                hover:bg-white/7 transition
                disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Close balcony view"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31 12H2M2 12L9 6M2 12L9 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="absolute inset-0">
            <Balcony view={overlay.data?.view} />
          </div>
        </div>
      )}

      {overlay?.type === 'gallery' && (
        <div className="fixed inset-0 z-60">
          {/* Blurred Background */}
          <div className="absolute inset-0 blurred-layer" />
          <div className="absolute top-2 left-7 z-40">
            <button
              onClick={closeOverlay}
              className="w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center
                hover:bg-white/7 transition
                disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Close gallery"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31 12H2M2 12L9 6M2 12L9 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="absolute inset-0">
            <Gallery unit={overlay.data?.unit} galleryType={overlay.data?.galleryType} onClose={closeOverlay} />
          </div>
        </div>
      )}
      <div className="w-full h-screen bg-[#2f2f2f] py-2 px-3 xl:p-4 overflow-hidden">
        <div className="w-full h-full flex flex-col">
          {/* Top Tabs */}
          <div className="flex items-center justify-between mb-2 xl:mb-3 px-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBack}
                disabled={isDisabled || history.length <= 1}
                className={`w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/70 transition disabled:opacity-50 disabled:cursor-not-allowed ${videoViewer.currentViewIndex !== 0 ? 'bg-white/95' : 'bg-white/85'}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31 12H2M2 12L9 6M2 12L9 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => {
                if (activeTab === TABS.HOME) return;
                if (
                  (activeTab === TABS.ZONES ||
                    activeTab === TABS.AMENITIES ||
                    activeTab === TABS.SURROUNDINGS) &&
                  activeLayer === null
                ) {
                  viewerProps.StartReverse(false, () => { });
                  return;
                }
                goHome();
              }}
                disabled={isDisabled}
                className={`px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed ${activeTab === TABS.HOME
                  ? "bg-white/85 text-black hover:bg-white/95"
                  : "text-white"
                  }`}
                aria-label="Go to Home"
              >
                HOME
              </button>
              <button
                onClick={() => handleActiveTab(TABS.SURROUNDINGS)}
                disabled={isDisabled}
                className={`px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed ${activeTab === TABS.SURROUNDINGS
                  ? "bg-white/85 text-black hover:bg-white/95"
                  : "text-white"
                  }`}
              >
                SURROUNDINGS
              </button>
              <button
                onClick={() => handleActiveTab(TABS.ZONES)}
                disabled={isDisabled}
                className={`px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed ${activeTab === TABS.ZONES
                  ? "bg-white/85 text-black hover:bg-white/95"
                  : "text-white"
                  }`}
              >
                {CONFIG.ZONES_TAB_TITLE || "ZONES"}
              </button>
              <button
                onClick={() => handleActiveTab(TABS.AMENITIES)}
                disabled={isDisabled}
                className={`px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed ${activeTab === TABS.AMENITIES
                  ? "bg-white/85 text-black hover:bg-white/95"
                  : "text-white"
                  }`}
              >
                AMENITIES
              </button>
            </div>
            <HomeButton
              onHomeClick={() => {
                if (introVideoUrl) {
                  onExitRequest?.();
                } else {
                  clearSelectedProject();
                  navigate("/");
                }
              }}
            />
          </div>

          <FilterContextProvider>
            <div
              className={`flex ${shouldApplySidebarGap ? "space-x-3" : "space-x-0"} flex-1 min-h-0 overflow-hidden`}
            >
              {/* Sidebar */}
              <Sidebar onNavigate={onNavigate} />

              {/* Main content area */}
              <main className="flex-1 relative">
                <LandscapePrompt />
                <PreloadProgressPanel />
                {tabletImmersiveEligible && !isFullscreen && (
                  <button
                    onClick={requestImmersive}
                    aria-label="Enter fullscreen"
                    className="absolute bottom-3 left-3 z-50 bg-gradient-to-bl from-black/60 to-transparent rounded-full p-2.5 text-white hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                    </svg>
                  </button>
                )}
                <div
                  className="w-full h-full bg-white/9 rounded-2xl overflow-hidden shadow-inner select-none"
                  style={{ touchAction: "none" }}
                  ref={mediaContainerRef}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* video element */}
                  <div className="absolute inset-0">
                    {/* <Test /> */}
                    {!viewerProps.isPlaying && viewerProps.currentViewIndex === 0 && <Highlight />}
                    {/* First Video (e.g., transition, or initial idle) */}
                    <video
                      ref={viewerProps.firstMediaRef}
                      className="w-full h-full object-cover object-center rounded-2xl absolute inset-0 z-10"
                      style={{ opacity: viewerProps.firstVideoOpacity }}
                      alt="Video 1"
                      muted
                      playsInline
                      preload="auto"
                      disableRemotePlayback
                      controlsList="nodownload nofullscreen noremoteplayback"
                      poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%23434343' width='1' height='1'/%3E%3C/svg%3E"
                    />
                    {/* Second Video (e.g., target idle after transition) */}
                    <video
                      ref={viewerProps.secondMediaRef}
                      className="w-full h-full object-cover object-center rounded-2xl absolute inset-0 z-10"
                      style={{ opacity: viewerProps.secondVideoOpacity }}
                      alt="Video 2"
                      muted
                      playsInline
                      preload="auto"
                      disableRemotePlayback
                      controlsList="nodownload nofullscreen noremoteplayback"
                      poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%23434343' width='1' height='1'/%3E%3C/svg%3E"
                    />

                    {/* Idle image (shown when the current idle asset is an image, not a video) */}
                    {viewerProps.isIdleImage && !viewerProps.isPlaying && (
                      <img
                        src={currentViews?.[viewerProps.currentViewIndex]?.videos?.idleVideo ?? currentVideosPaths?.idleVideo}
                        className="w-full h-full object-cover object-center rounded-2xl absolute inset-0 z-[11]"
                        alt="idle view"
                      />
                    )}

                    {activeLayer === LAYERS.SURROUNDING_DETAIL && (currentItem.svgPath || currentItem.svg) && (
                      <AnimatedPath path={currentItem.svgPath || currentItem?.svg} />
                    )}

                    {/* Transparent overlay to suppress Android WebView native video controls */}
                    <div className="absolute inset-0 z-[12] pointer-events-none" />
                  </div>

                  {/* Floor switch blur overlay */}
                  <div
                    className="absolute inset-0 z-20 backdrop-blur-sm rounded-2xl pointer-events-none transition-opacity duration-300"
                    style={{ opacity: (floorSwitchBlur || viewerProps.isFloorTransitionBlur) ? 1 : 0 }}
                  />

                  {/* Vertical floor buttons */}
                  {activeLayer === LAYERS.FLOOR && floors.length > 0 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5 max-h-[80%] overflow-y-auto py-1 items-center">
                      <p className="pb-1">Floors</p>
                      {[...floors].reverse().map((floor) => (
                        <button
                          key={floor.id}
                          onClick={() => handleFloorSwitch(floor)}
                          disabled={isDisabled || floor.id === currentItem?.id}
                          className={`w-9 h-9 rounded-lg font-semibold transition-all flex items-center justify-center
                            ${
                              floor.id === currentItem?.id
                                ? 'bg-white text-black shadow-md'
                                : 'bg-black/50 backdrop-blur-sm text-white hover:bg-white/20'
                            }
                            disabled:cursor-default`}
                        >
                          {floor.displayName
                            .replace(/^roof$/i, "R")
                            .replace(/^basement$/i, "B")
                            .replace(/^ground$/i, "G")
                            .replace(/^penthouse$/i, "P")
                            .replace(/^floor\s+(\d+)$/i, (_, n) => String(n).padStart(2, "0"))}
                        </button>
                      ))}
                    </div>
                  )}

                  {viewerProps.floatingOpacity &&
                    viewerProps.currentViewIndex === 0 && (
                      <BaseFloat mediaRef={mediaContainerRef} />
                    )}

                  {/* info re-open button */}
                  {showI && (
                    <button
                      className={`absolute -bottom-1 -right-1 flex items-center justify-center z-25
                        ${activeTab === TABS.SURROUNDINGS ? "bg-[#59A198]/60 backdrop-blur" : 'bg-black/60 backdrop-blur-sm'}
                        w-10 h-10 hover:w-11 hover:h-11
                        transition-all duration-500 ease-in-out
                        rounded-tl-xl rounded-bl-2xl rounded-tr-2xl`}
                      onClick={() => setShowInfoPopup(true)}
                    >
                      <span className="absolute inset-0 rounded-tl-xl rounded-bl-2xl rounded-tr-2xl border-2 border-white/70 ping-3 pointer-events-none" />
                      <svg width="30" height="30" viewBox="0 0 23 23" fill="none">
                        <circle cx="11" cy="5" r="1.5" fill="white" />
                        <path d="M11 9 C11.8 11, 10.2 13, 11 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}

                  {/* bottom info popup */}
                  {showInfoPopup && currentItem?.id && (
                    <InfoPopup
                      showInfoPopup={showInfoPopup}
                      onClose={closeInfoPopup}
                    />
                  )}
                </div>

                {/* left floating chevron — direct child of main so z-[70] beats the overlay's z-60 */}
                {isSidebarSupportedLayer && (
                    <button
                      onClick={() => handleSidebarState((s) => !s)}
                      className={`absolute top-1/2 w-9 h-9 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 ${sidebarOpen ? 'left-[-16px]' : 'left-2'} ${overlay?.type === 'room-interior' ? 'z-[70]' : 'z-[50]'}`}                      aria-label={sidebarOpen ? "close sidebar" : "open sidebar"}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        {sidebarOpen ? (
                          <path d="M15 18L9 12L15 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        ) : (
                          <path d="M9 18L15 12L9 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                      </svg>
                    </button>
                  )}

                {/* Room interior overlay — scoped to video area */}
                {overlay?.type === 'room-interior' && (
                  <div className="absolute inset-0 z-60 flex items-center justify-center rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeOverlay} />
                    <div className="relative z-70 w-full h-full bg-[#2f2f2f] rounded-3xl shadow-2xl overflow-hidden">
                      <button
                        onClick={closeOverlay}
                        className="absolute top-4 right-4 z-40 w-10 h-10 rounded-xl bg-[#8B3A3A] hover:bg-[#A24242] flex items-center justify-center
                          transition
                          disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Close room interior"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <div className="w-full h-full">
                        <Room key={overlay.data?.room?.id} room={overlay.data?.room} />
                      </div>
                    </div>
                  </div>
                )}
              </main>
            </div>
          </FilterContextProvider>

          {/* Breadcrumbs */}
          <div className="flex px-4 pt-1 xl:pt-2">
            <div className="flex-shrink-0">
              <HistoryBreadcrumbs />
            </div>

            {/* Views visuals */}
            {currentViews?.length ?
              <div className="flex-1 flex items-center justify-center text-white space-x-3 px-4 py-2 text-sm">
                <div className="flex space-x-2">
                  <div className=""> Views </div>
                  {/* prev button */}
                  <button
                    className={`w-auto text-white mx-2 ${isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                      }`}
                    disabled={isDisabled}
                    onClick={() => {
                      viewerProps.changeView("prev");
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31 12H2M2 12L9 6M2 12L9 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {Array.from({ length: currentViews?.length || 0 }).map((_, index) => (
                    <span key={index}>
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill={
                          index === viewerProps.currentViewIndex
                            ? "white"
                            : "none"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          stroke="white"
                          strokeWidth="1"
                        />
                      </svg>
                    </span>
                  ))}

                  {/* next button */}
                  <button
                    className={`w-auto text-white mx-2 ${isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                      }`}
                    disabled={isDisabled}
                    onClick={() => {
                      viewerProps.changeView("next");
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 12H22M22 12L15 6M22 12L15 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              : null}

            <div className="w-18 h-auto ml-auto">
              <button onClick={() => { console.log(history); }}>
                <img src={TECHNO_LOGO} alt="Techno Vision Logo" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
