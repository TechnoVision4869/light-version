import { useState, useEffect, useRef, useMemo } from "react";
import { TABS, LAYERS, TAB_CONFIG, LAYER_CONFIG, DATA } from "./data/layers";
import { setProject } from "./data/ProjectState";
// Hooks
import { useNavigation } from "./components/hooks/useNavigation";
import { useVideoViewer } from "./components/hooks/useVideoViewer";

// Components
import LandscapePrompt from "./components/LandscapePrompt";
import InfoPopup from "./components/InfoPopup";
import ZoneButton from "./components/buttons/ZoneButton";
import AmenityButton from "./components/buttons/AmenityButton";
import SurroundingButton from "./components/buttons/SurroundingButton";
import HomeButton from "./components/buttons/HomeButton";
import BuildingButton from "./components/buttons/BuildingButton";
import FloorButton from "./components/buttons/FloorButton";
import ApartmentButton from "./components/buttons/ApartmentButton";
import HistoryBreadcrumbs from "./components/HistoryBreadcrumbs";
import Floating from "./components/Floating";
import FilterPanel from "./components/FilterPanel";
import UnitPanel from "./components/UnitPanel";
import Panorama from "./components/Panorama";
import Balcony from "./components/Balcony";
import Gallery from "./components/Gallery";
import AnimatedPath from "./components/AnimatedPath";

// logo
import TECHNO_LOGO from "./assets/techno.png";

export default function App() {
  // console.log("App renders");

  //states
  const [sidebarOpen, setSidebarOpen] = useState(false); // set true when sidebar is open
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [isFilter, setIsFilter] = useState(false); // 'navigate' or 'filter'
  const [isPanorama, setIsPanorama] = useState(false);
  const [isBalconyView, setIsBalconyView] = useState(false);
  const [galleryType, setGalleryType] = useState(null);
  const [selectedSurroundingId, setSelectedSurroundingId] = useState(null);

  const handleBack = () => {
    setIsPanorama(false);
    setSelectedSurroundingId(null);
    setIsBalconyView(false);
    setGalleryType(null);
  };
  const handleInterior = () => setIsPanorama(true);
  const handleBalconyView = () => setIsBalconyView(true);
  const handleGallery = (type) => {
    setGalleryType(type);
  };

  // Ref
  const mediaContainerRef = useRef(null);

  const selectedSurrounding = useMemo(() => {
    if (!selectedSurroundingId) return null;
    return DATA.surroundings.find(s => s.id === selectedSurroundingId);
  }, [selectedSurroundingId]);

  const currentPathPoints = useMemo(() => {
    if (!selectedSurrounding || !mediaContainerRef.current) return null;

    const container = mediaContainerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const videoW = h * (16 / 9);
    const videoLeft = (w - videoW) / 2;

    return (selectedSurrounding.points || []).map(p => ({
      x: (videoLeft + videoW * p.x) / w,
      y: p.y, // since y is already normalized to [0,1] in your data
    }));
  }, [selectedSurrounding, mediaContainerRef.current?.clientWidth, mediaContainerRef.current?.clientHeight]);

  // Navigation hook
  const {
    history,
    activeTab,
    activeLayer,
    currentItem,
    currentVideosPaths, // This is the main navigation video path
    goToProject,
    goToTab,
    goToItem,
    goBack,
    goToHome,
  } = useNavigation();

  useEffect(() => {
    setProject(history[1]?.item);    
  }, [history]);

  const navigationDisabled = activeTab === TABS.PROJECT;

  console.log(history);

  const videoViewer = useVideoViewer({
    currentVideosPaths,
    history,
    onGoBack: goBack,
  });

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

  const handleActiveProject = (project) => {
    goToProject(project);
  }

  const handleActiveTab = (tab) => {
    if (tab === activeTab) return;

    if (tab === TABS.HOME) {
      goToHome();
    } else {
      const isFromHome = activeTab === TABS.HOME;
      const isFromAnotherTab =
        activeTab === TABS.ZONES ||
        activeTab === TABS.AMENITIES ||
        activeTab === TABS.SURROUNDINGS;
      if (isFromAnotherTab && activeLayer === null) {
        viewerProps.StartReverse(isFromAnotherTab, () => goToTab(tab, true));
        return;
      }
      goToTab(tab, isFromHome);
    }

    setTimeout(() => {
      setSidebarOpen(true);
    }, 800);
  };

  // Swipe States
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
  };
  const handleMouseUp = (e) => {
    setTranslateX(startX - e.clientX);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTranslateX(startX - e.touches[0].clientX);
  };

  useEffect(() => {
    if (activeLayer !== LAYERS.FLOOR) {
      setIsFilter(false);
    }
  }, [activeLayer]);

  useEffect(() => {
    if (activeLayer !== LAYERS.BUILDING) return;
    if (isDisabled) return;
    // console.log(translateX);

    if (translateX > 0) viewerProps.changeView("next");
    else if (translateX < 0) viewerProps.changeView("prev");
  }, [translateX]);

  //filters variables
  const [filters, setFilters] = useState({
    unitType: [],
    bedrooms: [],
    bathrooms: [],
    area: null,
    price: null,
  });

  return (
    <>
      {isPanorama && (
        <div className="absolute inset-0 z-60">
          <div className={`w-screen h-screen bg-[#2f2f2f] p-2 sm:p-4`} />
          <div className="absolute top-4 left-8 z-40">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center
                hover:bg-white/7 transition
                disabled:opacity-50 disabled:cursor-not-allowed"
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
            <Panorama key="panorama-viewer" apartment={currentItem} />
          </div>
        </div>
      )}

      {isBalconyView && (
        <div className="absolute inset-0 z-60">
          <div className={`w-screen h-screen bg-[#2f2f2f] p-2 sm:p-4`} />
          <div className="absolute top-4 left-8 z-40">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center
                hover:bg-white/7 transition
                disabled:opacity-50 disabled:cursor-not-allowed"
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
            <Balcony apartment={currentItem} />
          </div>
        </div>
      )}

      {galleryType && (
        <div className="absolute inset-0 z-60">
          {/* Blurred Background */}
          <div className="absolute inset-0 blurred-layer" />
          <div className={`w-screen h-screen p-2 sm:p-4`} />
          <div className="absolute top-4 left-8 z-40">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center
                hover:bg-white/7 transition
                disabled:opacity-50 disabled:cursor-not-allowed"
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
            <Gallery apartment={currentItem} galleryType={galleryType} />
          </div>
        </div>
      )}
      <div className={`w-screen h-screen bg-[#2f2f2f] py-2 px-3 xl:p-4`}>
        <LandscapePrompt />
        <div className="w-full h-full flex flex-col">

          {/* Top Tabs */}
          <div className="flex items-center justify-between mb-2 xl:mb-4 px-4">
            <div className="flex items-center gap-3">
              {viewerProps.currentViewIndex === 0 ? (
                <button
                  onClick={() => {
                    if (
                      (activeTab === TABS.ZONES ||
                        activeTab === TABS.AMENITIES ||
                        activeTab === TABS.SURROUNDINGS) &&
                      activeLayer === null
                    )
                      setSidebarOpen(false);
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
                    if (viewerProps.currentViewIndex === 3) {
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
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleActiveTab(TABS.SURROUNDINGS)}
                disabled={navigationDisabled}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${navigationDisabled ? "opacity-50 cursor-not-allowed" : ""}
                ${activeTab === TABS.SURROUNDINGS ? "bg-white/85 text-black" : "text-white"}`}
              >
                SURROUNDINGS
              </button>
              <button
                onClick={() => handleActiveTab(TABS.ZONES)}
                disabled={navigationDisabled}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${navigationDisabled ? "opacity-50 cursor-not-allowed" : ""}
                ${activeTab === TABS.ZONES ? "bg-white/85 text-black" : "text-white"}`}
              >
                ZONES
              </button>
              <button
                onClick={() => handleActiveTab(TABS.AMENITIES)}
                disabled={navigationDisabled}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${navigationDisabled ? "opacity-50 cursor-not-allowed" : ""}
                ${activeTab === TABS.AMENITIES ? "bg-white/85 text-black" : "text-white"}`}
              >
                AMENITIES
              </button>
            </div>
            <HomeButton
              disabled={navigationDisabled}
              onHomeClick={() => {
                if (
                  (activeTab === TABS.ZONES ||
                    activeTab === TABS.AMENITIES ||
                    activeTab === TABS.SURROUNDINGS) &&
                  activeLayer === null
                ) {
                  viewerProps.StartReverse(false, () => { });
                  return;
                }
                goToHome();
              }}
            />
          </div>

          {/* side bar & main content */}
          <div
            className={`flex ${sidebarOpen ? "gap-3" : "gap-0"
              } flex-1 min-h-0 overflow-hidden`}
          >
            {/* Sidebar */}
            <aside
              className={`bg-white/9 rounded-2xl p-2 py-3 md:py-4 flex-shrink-0 transition-all duration-700 overflow-hidden
             ${activeTab === TABS.HOME || activeLayer === LAYERS.AMENITY_DETAIL || activeLayer === LAYERS.SURROUNDING_DETAIL
                  ? "w-0 opacity-0 pointer-events-none"
                  : sidebarOpen
                    ? "w-44 md:w-68 opacity-100"
                    : "w-0 opacity-0 pointer-events-none"
                }`}
            >
              {activeTab === TABS.ZONES && activeLayer === LAYERS.APARTMENT ? (
                <UnitPanel
                  unit={currentItem}
                  onInterior={handleInterior}
                  onBalconyView={handleBalconyView}
                  onGallery={handleGallery}
                />
              ) : (
                <div className="h-full pr-1">
                  {activeLayer === LAYERS.FLOOR && (
                    <div className="flex rounded-md overflow-hidden mb-4">
                      {/* Navigate Button */}
                      <button
                        onClick={() => setIsFilter(false)}
                        className={`flex-1 px-4 py-2 font-semibold transition rounded-l-md 
                    ${!isFilter
                            ? "bg-white text-black"
                            : "bg-[#2e2e2e] text-white hover:bg-white/7"
                          }`}
                      >
                        Navigate
                      </button>

                      {/* Filter Button */}
                      <button
                        onClick={() => setIsFilter(true)}
                        className={`flex-1 px-4 py-2 font-semibold transition rounded-r-md 
                    ${isFilter
                            ? "bg-white text-black"
                            : "bg-[#2e2e2e] text-white hover:bg-white/7"
                          }`}
                      >
                        Filter
                      </button>
                    </div>
                  )}

                  {isFilter ? (
                    <FilterPanel currentItem={currentItem} onFilterChange={setFilters} />
                  ) : (
                    <>
                      {/* Dynamic sidebar title based on active tab */}
                      <div className="text-white font-semibold my-1 px-3">
                        {String(currentItem?.displayName).charAt(0).toUpperCase() +
                          String(currentItem?.displayName).slice(1)}
                        {/* {activeTab === TABS.ZONES
                    ? TAB_CONFIG[TABS.ZONES]?.title
                    : activeTab === TABS.SURROUNDINGS
                      ? TAB_CONFIG[TABS.SURROUNDINGS]?.title
                      : activeTab === TABS.AMENITIES
                        ? TAB_CONFIG[TABS.AMENITIES]?.title
                        : ""} */}
                      </div>
                      <div className="h-0.5 bg-white/50 mx-3 mb-4"></div>

                      <div className="max-h-[calc(100vh-285px)] scrollbar-custom overflow-auto space-y-3 px-2 py-2">
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
                                isSelected={currentItem === zone}
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
                                isDisabled={isDisabled}
                                isSelected={currentItem === apartment}
                                goToApartment={handleGoToItem}
                              />
                            ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </aside>

            {/* Main content area */}
            <main className="flex-1 relative">
              <div
                className="w-full h-full bg-white/9 rounded-2xl overflow-hidden shadow-inner"
                ref={mediaContainerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              >
                {/* video element */}
                <div className="absolute inset-0">
                  {/* First Video (e.g., transition, or initial idle) */}
                  <video
                    ref={viewerProps.firstMediaRef}
                    className="w-full h-full object-cover object-center rounded-2xl absolute inset-0"
                    style={{ opacity: viewerProps.firstVideoOpacity }}
                    alt="Video 1"
                    muted
                    playsInline
                    preload="auto"
                  />
                  {/* Second Video (e.g., target idle after transition) */}
                  <video
                    ref={viewerProps.secondMediaRef}
                    className="w-full h-full object-cover object-center rounded-2xl absolute inset-0"
                    style={{ opacity: viewerProps.secondVideoOpacity }}
                    alt="Video 2"
                    muted
                    playsInline
                    preload="auto"
                    loop
                  />
                  {activeLayer === LAYERS.SURROUNDING_DETAIL && (
                    <AnimatedPath points={currentPathPoints} />
                  )}
                </div>

                {activeTab === TABS.SURROUNDINGS &&
                  activeLayer === null &&
                  viewerProps.floatingOpacity && (
                    <Floating
                      items={TAB_CONFIG[TABS.SURROUNDINGS].getItems()}
                      mediaRef={mediaContainerRef}
                      tab={activeTab}
                      onSelectItem={handleGoToItem}
                      onChangeItem={(id) => setSelectedSurroundingId(id)}
                    />
                  )}

                {activeTab === TABS.AMENITIES &&
                  activeLayer === null &&
                  viewerProps.floatingOpacity && (
                    <Floating
                      items={TAB_CONFIG[TABS.AMENITIES].getItems()}
                      mediaRef={mediaContainerRef}
                      layer={LAYERS.AMENITY_DETAIL}
                      onSelectItem={handleGoToItem}
                    />
                  )}

                {activeLayer === LAYERS.ZONE_DETAIL &&
                  viewerProps.floatingOpacity && (
                    <Floating
                      items={LAYER_CONFIG[LAYERS.ZONE_DETAIL].getItems(
                        currentItem
                      )}
                      mediaRef={mediaContainerRef}
                      layer={LAYERS.BUILDING}
                      onSelectItem={handleGoToItem}
                    />
                  )}

                {activeLayer === LAYERS.BUILDING &&
                  viewerProps.floatingOpacity &&
                  viewerProps.currentViewIndex === 0 && (
                    <Floating
                      items={LAYER_CONFIG[LAYERS.BUILDING].getItems(
                        currentItem
                      )}
                      mediaRef={mediaContainerRef}
                      layer={LAYERS.FLOOR}
                      onSelectItem={handleGoToItem}
                    />
                  )}

                {activeLayer === LAYERS.FLOOR &&
                  viewerProps.floatingOpacity && (
                    <Floating
                      items={LAYER_CONFIG[LAYERS.FLOOR].getItems(currentItem)}
                      mediaRef={mediaContainerRef}
                      filters={filters}
                      layer={LAYERS.APARTMENT}
                      onSelectItem={handleGoToItem}
                    />
                  )}

                {/* left floating chevron to collapse sidebar */}
                {activeTab !== TABS.HOME &&
                  activeLayer !== LAYERS.AMENITY_DETAIL &&
                  activeLayer !== LAYERS.SURROUNDING_DETAIL && (
                    <button
                      onClick={() => setSidebarOpen((s) => !s)}
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

          {activeTab === TABS.PROJECT &&
            (
              <div className="w-full h-full flex items-center">
                {DATA.projects.map((project) =>
                  <button key={project.id}
                    onClick={() => handleActiveProject(project)}
                    className="w-64 max-w-full mx-auto px-4 pt-4 pb-2 rounded-2xl transition bg-black/10 hover:bg-white/7"
                  >
                    <div className="w-full rounded-lg overflow-hidden bg-black/10">
                      <img
                        src={project.thumbnail}
                        alt={project.displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center pt-2">
                      <div className="text-md font-bold text-white leading-tight">
                        {project.displayName}
                      </div>
                    </div>
                  </button>)
                }
              </div>
            )
          }

          {/* Breadcrumbs */}
          <div className="flex px-4 pt-2 xl:pt-3">
            {history.length > 1 && (
              <div className="flex-shrink-0">
                <HistoryBreadcrumbs
                  history={history}
                  currentItem={currentItem}
                />
              </div>
            )}
            {/* Views visuals */}
            {activeLayer === LAYERS.BUILDING && (
              <div className="flex-1 flex items-center justify-center text-white gap-3 px-4 py-2 text-sm">
                <div className=" flex gap-2">
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

                  {Array.from({ length: 4 }).map((_, index) => (
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
            )}
            <div className="w-18 h-auto ml-auto">
              <img src={TECHNO_LOGO} alt="Techno Vision Logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
