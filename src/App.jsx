import { useState } from "react";
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
// Components
import LandscapePrompt from "./components/LandscapePrompt";
import Loading from "./components/Loading";
import InfoPopup from "./components/InfoPopup";
import ZoneButton from "./components/buttons/ZoneButton";
import AmenityButton from "./components/buttons/AmenityButton";
import SurroundingButton from "./components/buttons/SurroundingButton";
import HomeButton from "./components/buttons/HomeButton";
import BuildingButton from "./components/buttons/BuildingButton";

export default function App() {
  // console.log("App renders");

  //states
  const [sidebarOpen, setSidebarOpen] = useState(false); // set true when sidebar is open
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  // Navigation hook
  const {
    history,
    activeTab,
    activeLayer,
    currentItemId,
    currentPath,
    currentVideosPaths,
    goToTab,
    goToItem,
    goBack,
    goToHome,
  } = useNavigation();

  // Conditionally use video or sequence viewer
  let viewerProps;
  if (MODE_CONFIG === MODE.VIDEO) {
    const videoViewer = useVideoViewer({
      currentVideosPaths,
      history,
      activeTab,
      onGoBack: goBack,
    });
    viewerProps = {
      isMediaLoaded: videoViewer.isVideosLoaded,
      isPlaying: videoViewer.isPlaying,
      mediaRef: videoViewer.videoRef,
      StartReverse: videoViewer.StartReverse,
      mediaElement: "video",
    };
  } else {
    const sequenceViewer = useSequenceViewer({
      currentPath,
      history,
      activeTab,
      onGoBack: goBack,
    });
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

  const isDisabled = !viewerProps.isMediaLoaded || viewerProps.isPlaying;

  const handleActiveTab = (tab) => {
    setSidebarOpen(true);
    if (tab === TABS.HOME) {
      goToHome();
    } else {
      goToTab(tab);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#2f2f2f] p-2 sm:p-4">
      <LandscapePrompt />
      <div className="w-full h-full flex flex-col">
        {/* Top Tabs */}
        <div className="flex items-center justify-between mb-4 px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={viewerProps.StartReverse}
              disabled={isDisabled || history.length <= 1}
              className="w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center 
              hover:bg-white/7 transition
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* back/chev icon */}
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
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleActiveTab(TABS.SURROUNDINGS)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                activeTab === TABS.SURROUNDINGS
                  ? "bg-white text-black"
                  : "text-white/80"
              }`}
            >
              SURROUNDINGS
            </button>
            <button
              onClick={() => handleActiveTab(TABS.ZONES)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                activeTab === TABS.ZONES
                  ? "bg-white text-black"
                  : "text-white/80"
              }`}
            >
              ZONES
            </button>
            <button
              onClick={() => handleActiveTab(TABS.AMENITIES)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                activeTab === TABS.AMENITIES
                  ? "bg-white text-black"
                  : "text-white/80"
              }`}
            >
              AMENITIES
            </button>
          </div>
          <HomeButton onHomeClick={goToHome} />
        </div>

        <div
          className={`flex ${
            sidebarOpen ? "gap-3" : "gap-0"
          } flex-1 min-h-0 overflow-hidden`}
        >
          {/* Sidebar */}
          <aside
            className={`bg-white/9 rounded-2xl p-2 py-3 md:p-3 md:py-4 flex-shrink-0 transition-all duration-300 overflow-hidden
             ${
               activeTab === TABS.HOME
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
                        isSeected={currentItemId === zone.id}
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
                        isSelected={currentItemId === item.id}
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
                        isSelected={currentItemId === item.id}
                        goToAmenity={handleGoToItem}
                      />
                    ))}
                {activeTab === TABS.ZONES &&
                  activeLayer === LAYERS.ZONE_DETAIL &&
                  LAYER_CONFIG[LAYERS.ZONE_DETAIL]
                    .getData("zone1")
                    .map((building) => (
                      <BuildingButton
                        building={building}
                        key={building.id}
                        isDisabled={isDisabled}
                        isSelected={currentItemId === building.id}
                        goToBuilding={handleGoToItem}
                      />
                    ))}
              </div>

              {/* history */}
            </div>
          </aside>

          {/* Main content area */}
          <main className="flex-1 relative">
            <div className="w-full h-full flex items-center justify-center bg-white/9 rounded-2xl overflow-hidden shadow-inner">
              {/* img or video element */}
              {viewerProps.isMediaLoaded ? (
                viewerProps.mediaElement === "video" ? (
                  <video
                    ref={viewerProps.mediaRef}
                    className="w-full h-full object-contain rounded-2xl"
                    alt="Video"
                    // src={viewerProps.mediaRef?.current?.src}
                    muted
                    playsInline
                    onLoad={() => {
                      // This ensures the video element is ready
                      console.warn("Video element loaded");
                    }}
                  />
                ) : (
                  <img
                    ref={viewerProps.mediaRef}
                    className="w-full h-full object-contain rounded-2xl"
                    alt="Transition frame"
                    src={
                      viewerProps.imagesRef?.current?.[
                        viewerProps.currentIndexRef?.current
                      ]?.src
                    }
                  />
                )
              ) : (
                <Loading />
              )}

              {/* Example center marker */}
              {/* <div className="absolute left-1/2 top-28 -translate-x-1/2 flex flex-col items-center">
                <div className="bg-[#3b82f6] px-4 py-2 rounded-full text-white font-semibold shadow-lg">SAND VIL</div>
              </div> */}

              {/* left floating chevron to collapse sidebar */}
              {activeTab !== TABS.HOME && (
                <button
                  onClick={() => setSidebarOpen((s) => !s)}
                  className="absolute left-[-18px] top-75 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow"
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
              {showInfoPopup && currentItemId && (
                <InfoPopup
                  showInfoPopup={showInfoPopup}
                  layer={activeLayer}
                  itemId={currentItemId}
                  onClose={closeInfoPopup}
                />
              )}
            </div>
          </main>
        </div>

        {/* Breadcrumbs */}
        {history.length > 1 && (
          <div className="px-6 pt-3">
            <div className="inline-flex items-center gap-3 bg-white/9 rounded-full px-4 py-2 text-sm">
              {history.slice(1).map(
                (entry, index) =>
                  entry.itemId && (
                    <div key={entry.itemId} className=" flex gap-2">
                      <button
                        className="w-auto cursor-pointer text-white"
                        onClick={() => console.log(`${entry.itemId} clicked`)}
                      >
                        {String(entry.itemId).charAt(0).toUpperCase() +
                          String(entry.itemId).slice(1)}
                      </button>
                      {entry.itemId !== currentItemId && (
                        <span className="text-white">›</span>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
