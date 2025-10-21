import { useState, useRef, useEffect } from "react";
import { MODE, MODE_CONFIG, TABS, LAYERS, TAB_CONFIG, LAYER_CONFIG } from "./data/layers";
// Assets
import HOME_LOGO from "./assets/images/logo.png";
// Animations
import Lottie from "lottie-react";
import LoadingAnim from "./assets/animation/Loading.json";
import LandscapePrompt from "./components/LandscapePrompt";

export default function App() {
  //states
  const [sidebarOpen, setSidebarOpen] = useState(true); // set true when sidebar is open
  const [isImagesLoaded, setIsImagesLoaded] = useState(false); //set true when async loading is done
  const [isPlaying, setIsPlaying] = useState(false); //set true when transition is playing
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  //refs
  const imagesRef = useRef([]); //ref to array of images
  const intervalRef = useRef(null); //ref to interval id to remove in useEffect
  const currentIndexRef = useRef(0); //current index of image being displayed
  const imageRef = useRef(null); //ref to image element to set src
  const justNavigatedBackRef = useRef(false);

  const initHistory = [
    {
      tab: TABS.HOME,
      layer: null,
      itemId: null,
      path: TAB_CONFIG[TABS.HOME].path,
    },
  ];
  // state to manage history stack
  const [history, setHistory] = useState(initHistory);

  // Get current state from history
  const currentEntry = history[history.length - 1];
  const {
    tab: activeTab,
    layer: activeLayer,
    itemId: currentItemId,
    path: currentPath,
  } = currentEntry;

  // Navigate to a main tab (ZONES, SURROUNDINGS, AMENITIES)
  const goToTab = (tabKey) => {
    const config = TAB_CONFIG[tabKey];
    setHistory((prev) => [
      ...prev,
      {
        tab: tabKey,
        layer: null,
        itemId: null,
        path: config.path,
      },
    ]);
    // console.log(history);
  };

  // Navigate to a specific item within current tab
  const goToItem = (item, layerKey) => {
    const config = LAYER_CONFIG[layerKey];
    // Since this is only called for detail layers, path is always a function
    const path = config.path(item.id);

    setHistory((prev) => [
      ...prev,
      {
        tab: activeTab,
        layer: layerKey,
        itemId: item.id,
        path: path,
      },
    ]);

    const itemData = config.getData(item.id);
    if (itemData?.description) {
      setShowInfoPopup(true);
    }

    const hasDescription = LAYER_CONFIG[layerKey].getData(item.id)?.description;
    if (hasDescription) {
      setShowInfoPopup(true); // Auto-show on first click
    }
  };

  // Go back one step
  const goBack = () => {
    if (history.length <= 1) return; // Can't go back from home
    setHistory((prev) => prev.slice(0, -1));
    justNavigatedBackRef.current = true;
  };

  // Go to home (reset everything)
  const goToHome = () => {
    setHistory(initHistory);
  };

  //Constants
  const NO_OF_FRAMES = activeTab === TABS.HOME ? 1 : 45;
  const FPS = 45;



  // load all images once
  // we use useEffect so loading images won't happen during the rendering and blocks the UI
  // or potentially run mutiple times
  useEffect(() => {
    // Clean up previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Reset states for new path
    setIsImagesLoaded(false);

    // 1. define a function that returns a Promise.
    // Promise is an object that represents a value that will be available in the future. It's either loading, resolved or rejected
    const loadImage = (src) => {
      // we use Promise because loading images takes time and JS doesn't wait for it to finish
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img); // When loaded, resolved with the img
        img.onerror = () => reject(new Error(`Failed to load: ${src}`)); // When failed, rejected with an error
        img.src = src; // Set src to start loading
      });
    };

    const loadAllImages = async () => {
      const shouldSkipAutoPlay = justNavigatedBackRef.current;
      // Immediately reset the ref (safe because we stored the value)
      justNavigatedBackRef.current = false;

      let paths;
      // Special handling for HOME layer
      if (activeTab === TABS.HOME) {
        // For HOME, just load a single image at "/home.jpg"
        paths = [currentPath];
      } else {
        // For all other layers, use the sequence pattern
        paths = Array.from(
          { length: NO_OF_FRAMES },
          (_, i) =>
            `${MODE_CONFIG}${currentPath}${currentPath}_${(i + 1)
              .toString()
              .padStart(2, "0")}.jpg`
        );
      }

      // 2. use Promise.all to load all images in parallel
      // Promise.all takes an array of Promises and returns a single Promise
      // that resolves when all of the Promises in the array have resolved
      try {
        const loadedImages = await Promise.all(paths.map(loadImage));
        imagesRef.current = loadedImages;
        setIsImagesLoaded(true);

        if (shouldSkipAutoPlay) {
          // ✅ Start at the LAST frame (which matches the previous sequence's first frame)
          currentIndexRef.current = NO_OF_FRAMES - 1;
          updateImage();
        } else {
          // ✅ Start at the FIRST frame (normal forward navigation)
          currentIndexRef.current = 0;
          updateImage();
        }

        // Only auto-play for non-HOME layers
        if (activeTab !== TABS.HOME && !shouldSkipAutoPlay) {
          setTimeout(() => StartTransition(), 100); // slight delay to ensure DOM is ready
        } else {
          setIsPlaying(false);
        }
      } catch (error) {
        console.error("Image loading failed:", error);
      }
    };
    if (currentPath) {
      loadAllImages();
    }
  }, [history]); // Run when component mounts and when history changes

  // Play forward sequence
  const StartTransition = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    setIsPlaying(true);

    // intervalRef.current stores the interval ID from setInterval
    intervalRef.current = setInterval(() => {
      // Then, we update the currentIndexRef.current
      if (currentIndexRef.current >= NO_OF_FRAMES - 1) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsPlaying(false);
        return;
      }
      currentIndexRef.current += 1;
      updateImage();
    }, 1000 / FPS);
  };

  const StartReverse = () => {
    if (intervalRef.current || history.length <= 1) return; // Prevent multiple intervals
    setIsPlaying(true);

    intervalRef.current = setInterval(() => {
      if (currentIndexRef.current <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsPlaying(false);

        goBack();
        return;
      }
      currentIndexRef.current -= 1;
      updateImage();
    }, 1000 / FPS);
  };

  // Update image src when currentIndexRef changes and imagesLoaded is true
  const updateImage = () => {
    const currentImage = imagesRef.current[currentIndexRef.current];
    if (imageRef.current && currentImage) {
      imageRef.current.src = currentImage.src;
    }
  };

  // Cleanup intervals on unmount
  // we separated the cleanup from the async loading process
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const isDisabled = !isImagesLoaded || isPlaying;

  const handleActiveTab = (tab) => {
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
              onClick={StartReverse}
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
          <div>
            <button
              onClick={goToHome}
              className="w-20 h-10 rounded-xl flex items-center justify-center 
              hover:bg-white/10 transition-all duration-200"
              aria-label="Home"
            >
              <img
                src={HOME_LOGO}
                alt="home logo"
                className="w-auto h-6 object-contain"
              />
            </button>
          </div>
        </div>

        <div className="flex gap-3 flex-1 min-h-0 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`bg-white/9 rounded-2xl p-2 py-3 md:p-3 md:py-4 flex-shrink-0 transition-all duration-300 overflow-hidden
             ${activeTab === TABS.HOME
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
                  TAB_CONFIG[TABS.ZONES].getItems().map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() => {
                        goToItem(zone, LAYERS.ZONE_DETAIL);
                      }}
                      disabled={isDisabled}
                      className={`w-64 max-w-full mx-auto p-4 rounded-2xl transition
                        ${isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : currentItemId === zone.id
                            ? "bg-white/10"
                            : "bg-black/10 hover:bg-white/7"
                        }`}
                    >
                      <div className="text-left">
                        <div className="text-md font-bold text-white leading-tight">
                          {zone.name}
                        </div>
                        <div className="text-xs text-white/60 leading-tight py-1">
                          {zone.subtitle}
                        </div>
                      </div>
                      <div className="w-full rounded-lg overflow-hidden bg-black/10">
                        <img
                          src={zone.thumbnail}
                          alt={zone.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
                {activeTab === TABS.SURROUNDINGS &&
                  activeLayer === null &&
                  TAB_CONFIG[TABS.SURROUNDINGS].getItems().map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        goToItem(item, LAYERS.SURROUNDING_DETAIL);
                      }}
                      disabled={isDisabled}
                      className={`w-64 max-w-full mx-auto p-4 rounded-2xl transition
            ${isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : currentItemId === item.id
                            ? "bg-white/10"
                            : "bg-black/10 hover:bg-white/7"
                        }`}
                    >
                      <div className="text-left">
                        <div className="text-md font-bold text-white leading-tight">
                          {item.name}
                        </div>
                        <div className="text-xs text-white/60 leading-tight py-1">
                          {item.distance}
                        </div>
                      </div>
                    </button>
                  ))}

                {activeTab === TABS.AMENITIES &&
                  activeLayer === null &&
                  TAB_CONFIG[TABS.AMENITIES].getItems().map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        goToItem(item, LAYERS.AMENITY_DETAIL);
                      }}
                      disabled={isDisabled}
                      className={`w-64 max-w-full mx-auto p-4 rounded-2xl transition
            ${isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : currentItemId === item.id
                            ? "bg-white/10"
                            : "bg-black/10 hover:bg-white/7"
                        }`}
                    >
                      <div className="text-left">
                        <div className="text-md font-bold text-white leading-tight">
                          {item.name}
                        </div>
                        <div className="text-xs text-white/60 leading-tight py-1">
                          {item.subtitle}
                        </div>
                      </div>
                      <div className="w-full rounded-lg overflow-hidden bg-black/10">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
              </div>

              {/* history */}
            </div>
          </aside>

          {/* Main content area */}
          <main className="flex-1 relative">
            <div className="w-full h-full flex items-center justify-center bg-white/9 rounded-2xl overflow-hidden shadow-inner">
              {/* img element */}
              {isImagesLoaded ? (
                <img
                  ref={imageRef}
                  className="w-full h-full object-contain rounded-2xl" // object-contain preserves aspect ratio
                  alt="Transition frame"
                  src={imagesRef.current[currentIndexRef.current]?.src}
                />
              ) : (
                <div className="text-center text-white p-6">
                  <Lottie
                    animationData={LoadingAnim}
                    loop={true}
                    style={{ width: 120, height: 120 }}
                  />
                </div>
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
                <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[85%] max-w-[760px]">
                  <div className="bg-black/70 backdrop-blur-sm text-white p-4 rounded-2xl shadow-2xl">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-bold text-sm">
                          {
                            LAYER_CONFIG[activeLayer].getData(currentItemId)
                              .name
                          }
                        </div>
                        <p className="text-xs text-white/80 mt-2">
                          {
                            LAYER_CONFIG[activeLayer].getData(currentItemId)
                              .description
                          }
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setShowInfoPopup(false);
                          }}
                          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M18 6L6 18M6 6L18 18"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
