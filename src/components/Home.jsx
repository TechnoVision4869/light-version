import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "@capacitor/status-bar";
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from "@capacitor/app"
import { TABS, LAYERS } from "../data/layers.js";
// Hooks
import { useVideoViewer } from "./hooks/useVideoViewer.jsx";

// Components
// import LandscapePrompt from "./LandscapePrompt.jsx";
import InfoPopup from "./InfoPopup.jsx";

import HomeButton from "./buttons/HomeButton";

import HistoryBreadcrumbs from "./HistoryBreadcrumbs";
import BaseFloat from "./floating/BaseFloat";

import Panorama from "./Panorama";
import Balcony from "./Balcony";
import Gallery from "./Gallery";
// import AnimatedPath from "./AnimatedPath";

// Context
import FilterContextProvider from "../store/FilterContextProvider";
import { SidebarContext } from "../store/SidebarContextProvider";
import Sidebar from "./Sidebar";
import { MainContext } from "../store/MainContextProvider";

// logo
import TECHNO_LOGO from "../assets/techno.png";
import Highlight from "./Highlight.jsx";
import Test from "./Test.jsx";

export default function Home() {
  //states
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showI, setShowI] = useState(false);

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
    clearSelectedProject } = useContext(SidebarContext);

  const { overlay, closeOverlay } = useContext(MainContext);

  const videoViewer = useVideoViewer();

  let viewerProps = {
    isMediaLoaded: videoViewer.isVideosLoaded,
    isPlaying: videoViewer.isPlaying,
    firstMediaRef: videoViewer.firstVideoRef,
    secondMediaRef: videoViewer.secondVideoRef,
    firstVideoOpacity: videoViewer.firstVideoOpacity,
    secondVideoOpacity: videoViewer.secondVideoOpacity,
    floatingOpacity: videoViewer.floatingOpacity,
    StartReverse: videoViewer.StartReverse,
    currentViewIndex: videoViewer.currentViewIndex, // Now managed by the hook
    changeView: videoViewer.changeView, // Now managed by the hook
  };

  const isDisabled = !viewerProps.isMediaLoaded || viewerProps.isPlaying;

  const handleActiveTab = useCallback((tab) => {
    let selectedItem = null;
    let layer = null;
    switch (tab) {
      case activeTab:
        break;
      case TABS.HOME:
        goHome();
        break;
      case TABS.ZONES:
        selectedItem = currentProject.zones;
        if(selectedItem.items.length === 1) {
          selectedItem = selectedItem.items[0];
          layer = LAYERS.ZONE_DETAIL;
          checkSwithingBetweenTabs(tab, layer, selectedItem);
        }
        checkSwithingBetweenTabs(tab, layer, selectedItem);
        break;
      case TABS.AMENITIES:
        selectedItem = currentProject.amenities;
        checkSwithingBetweenTabs(tab, layer, selectedItem);
        break;
      case TABS.SURROUNDINGS:
        selectedItem = currentProject.surroundings;
        checkSwithingBetweenTabs(tab, layer, selectedItem);
        break;
      default:
        break;
    }

    function checkSwithingBetweenTabs(tab, layer, item) {
      const isFromHome = activeTab === TABS.HOME;

      // uncomment to play reverse then forward when switching between non-home tabs
      //  if(!isFromHome && !activeLayer) {
      //     viewerProps.StartReverse(true, () => goToTab(tab, item, true));
      //     return;
      //   }
      goToTab(tab, layer, item, isFromHome);
    }

    setTimeout(() => {
      handleSidebarState(true);
    }, 750);
  }, [activeTab, goToTab, videoViewer.StartReverse]);

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

      {overlay?.type === 'room-interior' && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          {/* Semi-transparent backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal popup */}
          <div className="relative z-70 w-11/12 h-5/6 bg-[#2f2f2f] rounded-3xl shadow-2xl overflow-hidden">
            {/* Back button inside modal */}
            <button
              onClick={closeOverlay}
              className="absolute top-4 left-4 z-40 w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center
                hover:bg-white/7 transition
                disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Close room interior"
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
            
            {/* Room interior content */}
            <div className="w-full h-full">
              <Balcony view={overlay.data?.view} />
            </div>
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
            <Gallery unit={overlay.data?.unit} galleryType={overlay.data?.galleryType} />
          </div>
        </div>
      )}
      <div className="w-full h-screen bg-[#2f2f2f] py-2 px-3 xl:p-4 overflow-hidden">
        <div className="w-full h-full flex flex-col">
          {/* Top Tabs */}
          <div className="flex items-center justify-between mb-2 xl:mb-4 px-4">
            <div className="flex items-center space-x-3">
              {viewerProps.currentViewIndex === 0 ? (
                <button
                  onClick={() => {
                    if ((activeTab === TABS.ZONES || activeTab === TABS.AMENITIES || activeTab === TABS.SURROUNDINGS) && activeLayer === null)
                      handleSidebarState(false);

                    viewerProps.StartReverse(false, () => { });
                  }}
                  disabled={isDisabled || history.length <= 1}
                  className="w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center 
              hover:bg-white/7 transition
              disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* back chev icon */}
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
              ) : (
                <button
                  onClick={() => {
                    if (viewerProps.currentViewIndex >= 3) {
                      viewerProps.changeView("next");
                      return;
                    }
                    viewerProps.changeView("prev");
                  }}
                  disabled={isDisabled || history.length <= 1}
                  className="w-10 h-10 rounded-xl bg-white/95 flex items-center justify-center 
              hover:bg-white/7 transition
              disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* back chev icon */}
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
              )}
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => {
                  clearSelectedProject();
                  navigate("/");
                }}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white hover:bg-white/10 transition"
                aria-label="Back to projects"
              >
                HOME
              </button>
              <button
                onClick={() => handleActiveTab(TABS.SURROUNDINGS)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === TABS.SURROUNDINGS
                  ? "bg-white/85 text-black"
                  : "text-white"
                  }`}
              >
                SURROUNDINGS
              </button>
              <button
                onClick={() => handleActiveTab(TABS.ZONES)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === TABS.ZONES
                  ? "bg-white/85 text-black"
                  : "text-white"
                  }`}
              >
                ZONES
              </button>
              <button
                onClick={() => handleActiveTab(TABS.AMENITIES)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === TABS.AMENITIES
                  ? "bg-white/85 text-black"
                  : "text-white"
                  }`}
              >
                AMENITIES
              </button>
            </div>
            <HomeButton
              onHomeClick={() => {
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
            />
          </div>

          <FilterContextProvider>
            <div
              className={`flex ${sidebarOpen ? "space-x-3" : "space-x-0"} flex-1 min-h-0 overflow-hidden`}
            >
              {/* Sidebar */}
              <Sidebar />

              {/* Main content area */}
              <main className="flex-1 relative">
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
                    {!viewerProps.isPlaying && <Highlight />}
                    {/* First Video (e.g., transition, or initial idle) */}
                    <video
                      ref={viewerProps.firstMediaRef}
                      className="w-full h-full object-cover object-center rounded-2xl absolute inset-0 z-10"
                      style={{ opacity: viewerProps.firstVideoOpacity }}
                      alt="Video 1"
                      muted
                      playsInline
                      preload="auto"
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
                      loop
                    />

                    {/* {activeLayer === LAYERS.SURROUNDING_DETAIL && (
                      <AnimatedPath path={currentItem.svgPath} />
                    )} */}
                  </div>

                  {viewerProps.floatingOpacity &&
                    viewerProps.currentViewIndex === 0 && (
                      <BaseFloat mediaRef={mediaContainerRef} />
                    )}


                  {/* left floating chevron to collapse sidebar */}
                  {activeTab !== TABS.HOME &&
                    activeLayer !== LAYERS.AMENITY_DETAIL &&
                    activeLayer !== LAYERS.SURROUNDING_DETAIL && (
                      <button
                        onClick={() => handleSidebarState((s) => !s)}
                        className="absolute left-[-16px] top-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow z-50"
                        aria-label={
                          sidebarOpen ? "close sidebar" : "open sidebar"
                        }
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          {sidebarOpen ? (
                            // Chevron pointing left (close sidebar)
                            <path
                              d="M15 18L9 12L15 6"
                              stroke="#111827"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          ) : (
                            // Chevron pointing right (open sidebar)
                            <path
                              d="M9 18L15 12L9 6"
                              stroke="#111827"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          )}
                        </svg>
                      </button>
                    )}

                  {/* info re-open button */}
                  {showI && <button className={`absolute -bottom-1 -right-1 flex items-center justify-center z-25
                  ${activeTab === TABS.SURROUNDINGS ? "bg-[#94846D]/70 backdrop-blur" : 'bg-black/70 backdrop-blur-sm'}
                  w-8 h-8 hover:w-9 hover:h-9 
                  transition-all duration-500 ease-in-out
                  rounded-tl-xl rounded-bl-xl rounded-tr-xl`}
                    onClick={() => setShowInfoPopup(true)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="5" r="1.5" fill="white" />
                      <path d="M11 9 C11.8 11, 10.2 13, 11 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </button>}

                  {/* bottom info popup */}
                  {showInfoPopup && currentItem?.id && (
                    <InfoPopup
                      showInfoPopup={showInfoPopup}
                      onClose={closeInfoPopup}
                    />
                  )}
                </div>
              </main>
            </div>
          </FilterContextProvider>

          {/* Breadcrumbs */}
          <div className="flex px-4 pt-2 xl:pt-3">
            <div className="flex-shrink-0">
              <HistoryBreadcrumbs />
            </div>

            {/* Views visuals */}
            {currentViews?.length ?
              <div className="flex-1 flex items-center justify-center text-white space-x-3 px-4 py-2 text-sm">
                <div className=" flex space-x-2">
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
