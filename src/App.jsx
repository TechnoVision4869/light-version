import { useState, useEffect, useRef } from "react";
import {
  MODE,
  MODE_CONFIG,
  TABS,
  LAYERS,
  TAB_CONFIG,
  LAYER_CONFIG,
} from "./data/layers";
// Hooks
import { useNavigation } from "./components/hooks/useNavigation";
import { useSequenceViewer } from "./components/hooks/useSequenceViewer";
import { useVideoViewer } from "./components/hooks/useVideoViewer";
import { useVideoPreloader } from "./components/hooks/useVideoPreloader";

// Components
import VideoPreloader from "./components/VideoPreloader";

import LandscapePrompt from "./components/LandscapePrompt";
import Loading from "./components/Loading";
import InfoPopup from "./components/InfoPopup";
import ZoneButton from "./components/buttons/ZoneButton";
import AmenityButton from "./components/buttons/AmenityButton";
import SurroundingButton from "./components/buttons/SurroundingButton";
import HomeButton from "./components/buttons/HomeButton";
import BuildingButton from "./components/buttons/BuildingButton";
import FloorButton from "./components/buttons/FloorButton";
import ApartmentButton from "./components/buttons/ApartmentButton";
import HistoryBreadcrumbs from "./components/HistoryBreadcrumbs";
import FloatingButton from "./components/buttons/FloatingButton";

export default function App() {
  // console.log("App renders");

  // Preload state, function and content
  const [videosPreloaded, setVideosPreloaded] = useState(false);
  const { isLoading, loadingProgress } = useVideoPreloader();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setVideosPreloaded(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading])

  //states
  const [sidebarOpen, setSidebarOpen] = useState(false); // set true when sidebar is open
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  // Navigation hook
  const {
    history,
    activeTab,
    activeLayer,
    currentItem,
    currentPath,
    currentVideosPaths, // This is the main navigation video path
    goToTab,
    goToItem,
    goBack,
    goToHome,
  } = useNavigation();

  const videoViewer = useVideoViewer({
    currentVideosPaths,
    buildingViewPaths: null,
    history,
    onGoBack: goBack,
  });

  const sequenceViewer = useSequenceViewer({
    currentPath,
    history,
    onGoBack: goBack,
  });

  let viewerProps;
  // Conditionally, set viewerProps to use video or sequence viewer
  if (MODE_CONFIG === MODE.VIDEO) {
    viewerProps = {
      isMediaLoaded: videoViewer.isVideosLoaded,
      isPlaying: videoViewer.isPlaying,
      mediaRef: videoViewer.videoRef,
      StartReverse: videoViewer.StartReverse,
      playViewTransitionAndIdle: videoViewer.playViewTransitionAndIdle,
      currentViewIndex: videoViewer.currentViewIndex, // Now managed by the hook
      changeView: videoViewer.changeView, // Now managed by the hook
      mediaElement: "video",
    };
  } else {
    viewerProps = {
      isMediaLoaded: sequenceViewer.isImagesLoaded,
      isPlaying: sequenceViewer.isPlaying,
      mediaRef: sequenceViewer.imageRef,
      imagesRef: sequenceViewer.imagesRef,
      currentIndexRef: sequenceViewer.currentIndexRef,
      StartReverse: sequenceViewer.StartReverse,
      mediaElement: "img",
    };
  }
  const isDisabled = !viewerProps.isMediaLoaded || viewerProps.isPlaying;

  // Show info popup when item has description
  const handleGoToItem = (item, layerKey) => {
    goToItem(item, layerKey);

    // Show info popup if item has description
    const itemData = LAYER_CONFIG[layerKey].getData(item.id);

    if (itemData?.description) {
      setShowInfoPopup(true);
    }
  };

  // Close popup
  const closeInfoPopup = () => {
    setShowInfoPopup(false);
  };

  const handleActiveTab = (tab) => {
    if (tab === activeTab) return;

    if (tab === TABS.HOME) {
      goToHome();
    } else {
      const isFromHome = activeTab === TABS.HOME;
      const isFromAnotherTab = (activeTab === TABS.ZONES || activeTab === TABS.AMENITIES || activeTab === TABS.SURROUNDINGS)
      if (isFromAnotherTab && activeLayer === null) {
        viewerProps.StartReverse(isFromAnotherTab, () => goToTab(tab, true));
        return;
      }
      goToTab(tab, isFromHome, isFromAnotherTab);
    }

    setTimeout(() => {
      setSidebarOpen(true);
    }, 800)
  };

  // Test buttons
  const SURROUNDING_BUTTONS = [
    { id: 'airport', name: 'Cairo Airport', icon: 'airport', x: 0.30, y: 0.80 },
    { id: 'tower', name: 'Iconic Tower', icon: 'tower', x: 0.70, y: 0.40 },
    { id: 'gym', name: 'Gym', icon: 'muscle', x: 0.75, y: 0.25 },
  ];

  const mediaContainerRef = useRef(null);
  const [buttonPositions, setButtonPositions] = useState(
    SURROUNDING_BUTTONS.map(() => ({ left: 0, top: 0 }))
  );

  useEffect(() => {
    const container = mediaContainerRef.current;
    if (!container) return;

    const updatePositions = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const videoW = h * (16 / 9);
      const videoLeft = (w - videoW) / 2;

      const newPositions = SURROUNDING_BUTTONS.map(btn => ({
        left: videoLeft + videoW * btn.x,
        top: h * btn.y,
      }));

      setButtonPositions(newPositions);
    };

    updatePositions();

    const resizeObserver = new ResizeObserver(updatePositions);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [mediaContainerRef]);

  return (
    <>
      {!videosPreloaded && <VideoPreloader loadingProgress={loadingProgress} />}
      <div className={`w-screen h-screen bg-[#2f2f2f] p-2 sm:p-4 ${!videosPreloaded ? 'blur-sm' : ''}`}>
        <LandscapePrompt />
        <div className="w-full h-full flex flex-col">
          {/* Top Tabs */}
          <div className="flex items-center justify-between mb-4 px-4">
            <div className="flex items-center gap-3">
              {viewerProps.currentViewIndex === 0 && <button
                onClick={() => {
                  if ((activeTab === TABS.ZONES || activeTab === TABS.AMENITIES || activeTab === TABS.SURROUNDINGS) && activeLayer === null) setSidebarOpen(false);
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
              </button>}
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleActiveTab(TABS.SURROUNDINGS)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === TABS.SURROUNDINGS
                  ? "bg-white text-black"
                  : "text-white/80"
                  }`}
              >
                SURROUNDINGS
              </button>
              <button
                onClick={() => handleActiveTab(TABS.ZONES)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === TABS.ZONES
                  ? "bg-white text-black"
                  : "text-white/80"
                  }`}
              >
                ZONES
              </button>
              <button
                onClick={() => handleActiveTab(TABS.AMENITIES)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === TABS.AMENITIES
                  ? "bg-white text-black"
                  : "text-white/80"
                  }`}
              >
                AMENITIES
              </button>
            </div>
            <HomeButton onHomeClick={() => {
              if ((activeTab === TABS.ZONES || activeTab === TABS.AMENITIES || activeTab === TABS.SURROUNDINGS) && activeLayer === null) {
                viewerProps.StartReverse(false, () => { });
                return;
              }
              goToHome();
            }} />
          </div>

          <div
            className={`flex ${sidebarOpen ? "gap-3" : "gap-0"
              } flex-1 min-h-0 overflow-hidden`}
          >
            {/* Sidebar */}
            <aside
              className={`bg-white/9 rounded-2xl p-2 py-3 md:p-3 md:py-4 flex-shrink-0 transition-all duration-700 overflow-hidden
             ${activeTab === TABS.HOME || activeLayer === LAYERS.AMENITY_DETAIL || viewerProps.currentViewIndex !== 0
                  ? "w-0 opacity-0 pointer-events-none"
                  : sidebarOpen
                    ? "w-44 md:w-60 opacity-100"
                    : "w-0 opacity-0 pointer-events-none"
                }`}
            >
              <div className="h-full pr-2">
                {/* Dynamic sidebar title based on active tab */}
                <div className="text-white font-semibold mb-4 px-3">
                  {activeTab === TABS.ZONES
                    ? TAB_CONFIG[TABS.ZONES]?.title
                    : activeTab === TABS.SURROUNDINGS
                      ? TAB_CONFIG[TABS.SURROUNDINGS]?.title
                      : activeTab === TABS.AMENITIES
                        ? TAB_CONFIG[TABS.AMENITIES]?.title
                        : ""}
                </div>
                <div className="h-0.5 bg-white/50 mx-3 mb-4"></div>

                <div className="max-h-[calc(100vh-200px)] scrollbar-custom overflow-auto space-y-3 px-2 py-2">
                  {/* Render different content based on active tab */}
                  {activeTab === TABS.ZONES &&
                    activeLayer === null &&
                    TAB_CONFIG[TABS.ZONES]
                      .getItems()
                      .map((zone) => (
                        <ZoneButton
                          zone={zone}
                          key={zone.id}
                          isDisabled={isDisabled}
                          isSeected={currentItem === zone}
                          goToZone={handleGoToItem}
                        />
                      ))}
                  {activeTab === TABS.SURROUNDINGS &&
                    activeLayer === null &&
                    TAB_CONFIG[TABS.SURROUNDINGS]
                      .getItems()
                      .map((item) => (
                        <SurroundingButton
                          surrounding={item}
                          key={item.id}
                          isDisabled={isDisabled}
                          isSelected={currentItem === item}
                          goToSurrounding={handleGoToItem}
                        />
                      ))}

                  {activeTab === TABS.AMENITIES &&
                    activeLayer === null &&
                    TAB_CONFIG[TABS.AMENITIES]
                      .getItems()
                      .map((item) => (
                        <AmenityButton
                          amenity={item}
                          key={item.id}
                          isDisabled={isDisabled}
                          isSelected={currentItem === item}
                          goToAmenity={handleGoToItem}
                        />
                      ))}
                  {activeTab === TABS.ZONES &&
                    activeLayer === LAYERS.ZONE_DETAIL &&
                    LAYER_CONFIG[LAYERS.ZONE_DETAIL]
                      .getItems(currentItem)
                      .map((building) => (
                        <BuildingButton
                          building={building}
                          key={building.id}
                          isDisabled={isDisabled}
                          isSelected={currentItem === building}
                          goToBuilding={handleGoToItem}
                        />
                      ))}
                  {activeTab === TABS.ZONES &&
                    activeLayer === LAYERS.BUILDING &&
                    LAYER_CONFIG[LAYERS.BUILDING]
                      .getItems(currentItem)
                      .map((floor) => (
                        <FloorButton
                          floor={floor}
                          key={floor.id}
                          isDisabled={isDisabled}
                          isSelected={currentItem === floor}
                          goToFloor={handleGoToItem}
                        />
                      ))}
                  {activeTab === TABS.ZONES &&
                    activeLayer === LAYERS.FLOOR &&
                    LAYER_CONFIG[LAYERS.FLOOR]
                      .getItems(currentItem)
                      .map((apartment) => (
                        <ApartmentButton
                          apartment={apartment}
                          key={apartment.id}
                          isSelected={currentItem === apartment}
                          goToApartment={handleGoToItem}
                        />
                      ))}
                </div>

                {/* history */}
              </div>
            </aside>

            {/* Main content area */}
            <main className="flex-1 relative">
              <div
                className="w-full h-full bg-white/9 rounded-2xl overflow-hidden shadow-inner"
                ref={mediaContainerRef}
              >
                {/* img or video element */}
                {viewerProps.mediaElement === "video" ? (
                  <video
                    ref={viewerProps.mediaRef}
                    className="w-auto min-w-full h-full object-cover object-center rounded-2xl"
                    alt="Video"
                    // src={viewerProps.mediaRef?.current?.src}
                    muted
                    playsInline
                    preload="auto"
                  />
                ) : (
                  <img
                    ref={viewerProps.mediaRef}
                    className="w-auto min-w-full h-full object-cover object-center rounded-2xl"
                    alt="Transition frame"
                    src={
                      viewerProps.imagesRef?.current?.[
                        viewerProps.currentIndexRef?.current
                      ]?.src
                    }
                  />
                )}
                {!viewerProps.isMediaLoaded && <Loading />}

                {activeTab === TABS.SURROUNDINGS &&
                  activeLayer === null &&
                  SURROUNDING_BUTTONS.map((btn, i) => (
                    <FloatingButton
                      key={btn.id}
                      name={btn.name}
                      iconType={btn.icon}
                      buttonType="surrounding"
                      style={{
                        left: `${buttonPositions[i].left}px`,
                        top: `${buttonPositions[i].top}px`,
                      }}
                    />
                  ))}


                {/* left floating chevron to collapse sidebar */}
                {activeTab !== TABS.HOME &&
                  activeLayer !== LAYERS.AMENITY_DETAIL &&
                  viewerProps.currentViewIndex === 0 && (
                    <button
                      onClick={() => setSidebarOpen((s) => !s)}
                      className="absolute left-[-18px] top-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow z-50"
                      aria-label={sidebarOpen ? "close sidebar" : "open sidebar"}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

                {/* bottom info popup */}
                {showInfoPopup && currentItem?.id && (
                  <InfoPopup
                    showInfoPopup={showInfoPopup}
                    layer={activeLayer}
                    itemId={currentItem.id}
                    onClose={closeInfoPopup}
                  />
                )}
              </div>
            </main>
          </div>

          {/* Breadcrumbs */}
          {history.length > 1 && (
            <div className="flex px-6 pt-3">
              <div className="flex-shrink-0">
                <HistoryBreadcrumbs history={history} currentItem={currentItem} />
              </div>
              {/* Views visuals */}
              {activeLayer === LAYERS.BUILDING && (
                <div className="flex-1 flex justify-center items-center justify-center text-white gap-3 px-4 py-2 text-sm">
                  <div className=" flex gap-2">
                    <div className=""> Views </div>
                    {/* prev button */}
                    <button
                      className={`w-auto text-white mx-2 ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      disabled={isDisabled}
                      onClick={() => { viewerProps.changeView("prev"); }}
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

                    {Array.from({ length: 4 }).map((_, index) => (
                      <span key={index}>
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill={index === viewerProps.currentViewIndex ? "white" : "none"}
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
                      className={`w-auto text-white mx-2 ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      disabled={isDisabled}
                      onClick={() => { viewerProps.changeView("next"); }}
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
              )}
            </div>
          )}
        </div >
      </div >
    </>
  );
}
