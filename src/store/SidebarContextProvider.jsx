import { useCallback, useState, useEffect, useContext, useRef } from "react";

import { SidebarContext } from "./SidebarContext";
import { AuthContext } from "./jwt-context";
import { TABS, LAYERS } from "../data/layers";
import { PROPERTY_TYPE } from "../constants/roles";
import { enrichProjectData, prefetchProjectByLevels, getLevelAssetTotal } from "../lib/enrichProjectData";
import { APP_CONFIG } from "../config/appConfig";
import { fetchProjectById } from "../lib/projectFetcher";
import { pruneCompareUnits } from "../lib/compareStorage";
import { sortFloors } from "../lib/sortFloors";
import { resolveDeveloperData, FALLBACK_RESOLVED } from "../data/register-developer";
import {
    PROJECT_STORAGE_KEY,
    DEVELOPER_STORAGE_KEY,
    HOME_IDLE_VIDEO_STORAGE_KEY,
    PROJECT_INTRO_VIDEO_STORAGE_KEY,
} from "../constants/storageKeys";

export { SidebarContext };

const STORAGE_KEY = PROJECT_STORAGE_KEY;

// Get a video URL from a project, checking both naming patterns (static data uses
// zoomoutVideo/idleVideo, API uses zoomoutAssetId/idleAssetId after enrichment).
function getVideoUrl(project, ...keys) {
    if (!project) return null;
    for (const key of keys) {
        if (project[key]) return project[key];
    }
    return null;
}

function cacheVideo(storageKey, url, type) {
    if (!url) return;
    try {
        localStorage.setItem(storageKey, JSON.stringify({ url, type: type ?? null }));
    } catch {
        // Storage full/unavailable — this cache is a pure UX optimization, safe to skip.
    }
}

// Refreshes the "last-known-good" Home idle video and project intro video used as reload
// placeholders — see HOME_IDLE_VIDEO_STORAGE_KEY/PROJECT_INTRO_VIDEO_STORAGE_KEY and
// Home.jsx's ReloadLoadingSplash.
function cacheReloadPlaceholders(project) {
    cacheVideo(
        HOME_IDLE_VIDEO_STORAGE_KEY,
        getVideoUrl(project, 'idleVideo', 'idleVideoId', 'idleAssetId'),
        getVideoUrl(project, 'idleVideoType', 'idleAssetType'),
    );
    cacheVideo(
        PROJECT_INTRO_VIDEO_STORAGE_KEY,
        getVideoUrl(project, 'introVideo', 'introAssetId'),
        getVideoUrl(project, 'introVideoType', 'introAssetType'),
    );
}

export default function SidebarContextProvider({ children }) {
    const useStatic = APP_CONFIG.USE_STATIC;
    const [currentProject, setCurrentProject] = useState(null);
    const { isInitialized: isAuthInitialized, user } = useContext(AuthContext);

    // Explicit developer pick (from SelectionFlow's DeveloperSelector) or restored value —
    // separate from currentProject.developerId, which is more authoritative once a project
    // is actually open. See register-developer.js for the resolution this drives.
    const [activeDeveloperId, setActiveDeveloperIdState] = useState(
        () => localStorage.getItem(DEVELOPER_STORAGE_KEY) || null
    );
    const [developerData, setDeveloperData] = useState(FALLBACK_RESOLVED);
    const developerRequestIdRef = useRef(0);

    // Sync with user.developerId once auth resolves (developer-scoped roles) if no explicit
    // pick/restore has already set it.
    useEffect(() => {
        if (!activeDeveloperId && user?.developerId) {
            setActiveDeveloperIdState(user.developerId);
        }
    }, [user, activeDeveloperId]);

    const setActiveDeveloper = useCallback((developerId) => {
        setActiveDeveloperIdState(developerId);
    }, []);

    // currentProject.developerId (once a project is open) wins over the explicitly-picked/
    // restored activeDeveloperId — same priority data-model.md documents for other
    // developerId consumers.
    const effectiveDeveloperId = currentProject?.developerId || activeDeveloperId || null;

    useEffect(() => {
        const requestId = ++developerRequestIdRef.current;
        resolveDeveloperData(effectiveDeveloperId).then((resolved) => {
            if (developerRequestIdRef.current !== requestId) return; // stale, a newer id was picked meanwhile
            setDeveloperData(resolved);
        });
    }, [effectiveDeveloperId]);

    const getInitHistory = useCallback((project) => {
        const initHistory = [
            {
                tab: TABS.HOME,
                layer: null,
                item: null,
                videosPath: {
                    // Falls back to the intro video when the project has no zoomout video set
                    // (e.g. zoomoutAssetId is null) so returning to Home still plays something.
                    forwardVideo: getVideoUrl(project, 'zoomoutVideo', 'zoomoutVideoId', 'zoomoutAssetId', 'introVideo', 'introAssetId') ?? null,
                    reverseVideo: null,
                    idleVideo: getVideoUrl(project, 'idleVideo', 'idleVideoId', 'idleAssetId') ?? null,
                    idleVideoType: getVideoUrl(project, 'idleVideoType', 'idleAssetType') ?? null,
                },
                views: null,
            },
        ];

        return initHistory;
    }, []);


    const [history, setHistory] = useState(getInitHistory(currentProject));
    const [sidebarOpen, setSidebarOpen] = useState(false); // set true when sidebar is open

    const [highlightedButton, setHighlightedButton] = useState(null);

    // True while SideBarButtons is showing a floor's features list in place of its units list.
    // Not a MainContext overlay (it renders inline in the sidebar, not over the video area), but
    // Home.jsx's back button needs to know about it so it can close this before falling back to
    // normal layer navigation — same priority as it already gives MainContext's `overlay`.
    const [viewingFloorFeatures, setViewingFloorFeatures] = useState(false);

    const [preloadStats, setPreloadStats] = useState({
        1: { name: 'Top Tabs', loaded: 0, total: 0, status: 'idle' },
        2: { name: 'Properties in Zones', loaded: 0, total: 0, status: 'idle' },
        3: { name: 'Units + Interiors', loaded: 0, total: 0, status: 'idle' },
    });

    // Bumped on every new handleSetCurrentProject call and on explicit clear, so a
    // still-running enrich() from a previous call can tell it's stale and skip writing
    // state/localStorage — without stopping the underlying asset fetch/caching itself,
    // which should keep running (and populating the SW cache) regardless. See
    // handleSetCurrentProject and handleClearSelectedProject below.
    const currentRequestIdRef = useRef(0);

    // Reset history when project changes
    const handleSetCurrentProject = useCallback((project, developerId) => {
        // console.log("project", project);
        const requestId = ++currentRequestIdRef.current;
        const isStale = () => currentRequestIdRef.current !== requestId;

        // Persist the project id immediately, before any enrichment/prefetch work starts —
        // on weak connectivity that work can take a long time (or never finish before the
        // app is killed), and the id is already known at this point regardless.
        localStorage.setItem(STORAGE_KEY, project.id);

        // Compare-list unit IDs only make sense within the project they were added from —
        // prune any that don't resolve in whatever project ends up set below.
        const setCurrentProjectAndPrune = (resolvedProject) => {
            setCurrentProject(resolvedProject);
            pruneCompareUnits(resolvedProject);
            cacheReloadPlaceholders(resolvedProject);
        };

        const enrich = async () => {
            try {
                if (useStatic) {
                    setCurrentProjectAndPrune(project);
                    setHistory(getInitHistory(project));
                } else {
                    // Merge in the developerId known from selection context, since the
                    // project entity itself never carries one — see Feature C.
                    const projectToEnrich = developerId
                        ? { ...project, developerId: project.developerId || developerId }
                        : project;

                    // URL resolution runs once here, depth 0 assets prefetched
                    const enrichedProject = await enrichProjectData(projectToEnrich, useStatic, 0);
                    if (isStale()) return;
                    setCurrentProjectAndPrune(enrichedProject);
                    setHistory(getInitHistory(enrichedProject));

                    // Know all three levels' totals upfront (no network calls), so the
                    // panel shows the true grand total immediately instead of it growing
                    // as each level's prefetch starts.
                    setPreloadStats((prev) => {
                        const next = { ...prev };
                        [1, 2, 3].forEach((level) => {
                            next[level] = { ...next[level], total: getLevelAssetTotal(enrichedProject, level) };
                        });
                        return next;
                    });

                    // Each call only walks and fetches its own level. The prefetch call
                    // itself is never skipped even if stale — it must keep running so its
                    // assets still get cached by the SW for whoever opens this project next.
                    for (const depth of [1, 2, 3]) {
                        if (!isStale()) setPreloadStats((prev) => ({ ...prev, [depth]: { ...prev[depth], status: 'loading' } }));
                        try {
                            await prefetchProjectByLevels(enrichedProject, depth, depth, ({ loaded, total }) => {
                                if (isStale()) return;
                                setPreloadStats((prev) => ({ ...prev, [depth]: { ...prev[depth], loaded, total } }));
                            });
                            if (isStale()) continue;
                            setPreloadStats((prev) => ({ ...prev, [depth]: { ...prev[depth], status: 'done' } }));
                        } catch (levelError) {
                            if (!isStale()) setPreloadStats((prev) => ({ ...prev, [depth]: { ...prev[depth], status: 'error' } }));
                            throw levelError;
                        }
                    }
                }
            } catch (error) {
                console.error('Error enriching project data:', error);
                if (isStale()) return;
                setCurrentProjectAndPrune(project);
                setHistory(getInitHistory(project));
            }
        };
        enrich();
    }, [useStatic, getInitHistory]);

    // Restore project from localStorage on mount (after auth is initialized)
    const restoreProject = useCallback(async () => {
        try {
            let isMounted = true;
            const projectId = localStorage.getItem(STORAGE_KEY);

            if (projectId && isMounted) {
                // For API mode, only restore after auth is initialized
                // For static mode, restore immediately
                if (useStatic || isAuthInitialized) {
                    const project = await fetchProjectById(projectId, useStatic);
                    if (project && isMounted) {
                        const storedDeveloperId = localStorage.getItem(DEVELOPER_STORAGE_KEY);
                        handleSetCurrentProject(project, storedDeveloperId || user?.developerId);
                    }
                }
            }

            return () => { isMounted = false; };
        } catch (error) {
            console.warn("Failed to restore project:", error);
        }
    }, [handleSetCurrentProject, useStatic, isAuthInitialized, user]);

    useEffect(() => {
        restoreProject();
    }, [restoreProject]);

    // Get current state from history
    const currentEntry = history[history.length - 1] ?? getInitHistory(currentProject)[0];
    const {
        tab: activeTab,
        layer: activeLayer,
        item: currentItem,
        videosPath: currentVideosPaths,
        views: currentViews,
    } = currentEntry;

    const findPropertyForItem = useCallback((zone, targetItem) => {
        // console.log(zone, targetItem);

        if (!zone?.properties?.length) return null;
        if (zone.properties.length === 1) return zone.properties[0];

        return zone.properties.find((property) => {
            if (property.blocks?.some((block) => block.id === targetItem?.id)) return true;
            if (property.units?.some((unit) => unit.id === targetItem?.id)) return true;
            return false;
        }) || null;
    }, []);

    const goToTab = useCallback((tabKey, layerKey = null, selectedItem, isFromHome = true) => {
        // console.log(tabKey);
        // console.log(selectedItem);
        let calculatedVideosPath = null;
        if (useStatic) {
            calculatedVideosPath = isFromHome
                ? selectedItem.videos
                : {
                    forwardVideo: selectedItem.zoomoutVideo,
                    reverseVideo: selectedItem.videos.reverseVideo,
                    idleVideo: selectedItem.videos.idleVideo,
                };
        } else {
            calculatedVideosPath = isFromHome
                ? {
                    forwardVideo: selectedItem.zonesForwardVideoId || selectedItem.forwardVideoId || selectedItem.forwardAssetId,
                    reverseVideo: selectedItem.zonesReverseVideoId || selectedItem.reverseVideoId || selectedItem.reverseAssetId,
                    idleVideo: selectedItem.zonesSideVideoId || selectedItem.sideVideoId || selectedItem.idleAssetId,
                    idleVideoType: selectedItem.zonesSideVideoType || selectedItem.sideVideoType || selectedItem.idleAssetType,
                }
                : {
                    forwardVideo: selectedItem.zonesZoomoutVideoId || selectedItem.zoomoutVideo || selectedItem.zoomOutVideo,
                    reverseVideo: selectedItem.zonesReverseVideoId || selectedItem.reverseVideoId || selectedItem.reverseAssetId,
                    idleVideo: selectedItem.zonesSideVideoId || selectedItem.sideVideoId || selectedItem.idleAssetId,
                    idleVideoType: selectedItem.zonesSideVideoType || selectedItem.sideVideoType || selectedItem.idleAssetType,
                };
        }

        let calculatedViews = selectedItem.views || null;
        if (!useStatic) {
            calculatedViews = calculatedViews?.map(view => {
                return {
                    name: view.name,
                    videos: {
                        forwardVideo: view.forwardAssetId,
                        reverseVideo: view.reverseAssetId,
                        idleVideo: view.sideAssetId,
                        idleVideoType: view.sideAssetType,
                    },
                }
            }).sort((a, b) => {
                // Extract numbers from "View N" format and sort numerically
                const aNum = parseInt(a.name.match(/\d+/)?.[0] || 0);
                const bNum = parseInt(b.name.match(/\d+/)?.[0] || 0);
                return aNum - bNum;
            }) ?? null;
        }

        setHistory(() => [
            ...getInitHistory(currentProject),
            {
                tab: tabKey,
                layer: layerKey,
                item: {
                    displayName: String(tabKey).charAt(0).toUpperCase() + String(tabKey).slice(1),
                    ...selectedItem
                },
                videosPath: calculatedVideosPath,
                views: calculatedViews,
            },
        ]);
    }, [currentProject, getInitHistory]);

    const handleCurrentItem = useCallback((item, layerKey) => {
        const targetLayer = layerKey;
        if (!targetLayer) {
            console.warn('No layer specified for navigation', item);
            return;
        }

        if (history[2]?.layer === LAYERS.SURROUNDING_DETAIL) {
            const tempHistory = history.slice(0, -1);
            setHistory([
                ...tempHistory, {
                    tab: activeTab,
                    layer: targetLayer,
                    item: item,
                    videosPath: null,
                    views: null,
                },
            ]);
            return;
        }

        // Determine videosPath and views with careful fallbacks.
        // Use `undefined` to detect missing values and `null` to represent explicit absence.
        let videosPath = null;
        if (useStatic) {
            videosPath = item?.videos; // undefined if not present
        } else {
            const forwardVideo = item.forwardVideoId || item.forwardAssetId;
            const reverseVideo = item.reverseVideoId || item.reverseAssetId;
            const idleVideo = item.sideVideoId || item.idleAssetId || item.sideAssetId;
            const idleVideoType = item.sideVideoType || item.idleAssetType || item.sideAssetType;

            // Only create videosPath if at least one field has a value
            if (forwardVideo || reverseVideo || idleVideo) {
                videosPath = { forwardVideo, reverseVideo, idleVideo, idleVideoType };
            } else {
                videosPath = undefined;  // Falls back to property?.videos
            }
        }

        let views = item?.views; // undefined if not present

        // Try to determine the parent property depending on where we are coming from.
        let property = null;
        if (activeLayer === LAYERS.BUILDING) {
            property = currentItem; // we're currently on a property/building
        } else if (activeLayer === LAYERS.ZONE_DETAIL) {
            property = findPropertyForItem(currentItem, item);
        }

        if (videosPath === undefined) {
            if (useStatic) {
                videosPath = property?.videos;
            } else {
                videosPath = {
                    forwardVideo: property?.forwardAssetId,
                    reverseVideo: property?.reverseAssetId,
                    idleVideo: property?.idleAssetId,
                    idleVideoType: property?.idleAssetType,
                }
            }
        } // still undefined if not present on property

        // Views availability rules:
        // - If navigating into a UNIT layer: views should be available only for `villa` properties.
        // - If navigating into a FLOOR layer: no views.
        // - For other layers (e.g., BUILDING) try to use property's views when not present on the item.
        if (targetLayer === LAYERS.FLOOR || targetLayer === LAYERS.BUILDING_FEATURE) {
            views = null; // explicitly no views for floors or building features
        }
        else if (targetLayer === LAYERS.UNIT) {
            if (property?.type === PROPERTY_TYPE.VILLA) {
                if (views === undefined) views = property?.views; // allow views for villa units
            } else {
                views = null; // explicitly no views for townhouse/tower units
            }
        } else {
            if (views === undefined) views = property?.views; // use property's views for building layers
        }

        // Final fallbacks to the previously-current values if still undefined
        if (videosPath === undefined) videosPath = currentVideosPaths ?? null;
        if (views === undefined) views = currentViews ?? null;

        if (!useStatic) {
            views = views?.map(view => {
                return {
                    name: view.name,
                    videos: {
                        forwardVideo: view.forwardAssetId,
                        reverseVideo: view.reverseAssetId,
                        idleVideo: view.sideAssetId,
                        idleVideoType: view.sideAssetType,
                    },
                }
            }).sort((a, b) => {
                // Extract numbers from "View N" format and sort numerically
                const aNum = parseInt(a.name.match(/\d+/)?.[0] || 0);
                const bNum = parseInt(b.name.match(/\d+/)?.[0] || 0);
                return aNum - bNum;
            })
        }

        setHistory((prev) => [
            ...prev,
            {
                tab: activeTab,
                layer: targetLayer,
                item: item,
                videosPath: videosPath,
                views: views,
            },
        ]);
    }, [history, currentVideosPaths, currentViews, activeLayer, activeTab, currentItem, findPropertyForItem]);

    // Switch directly to another floor (replaces last history entry)
    const handleSwitchToFloor = useCallback((floor) => {
        let videosPath = null;
        if (useStatic) {
            videosPath = floor.videos ?? null;
        } else {
            const forwardVideo = floor.forwardVideoId || floor.forwardAssetId;
            const reverseVideo = floor.reverseVideoId || floor.reverseAssetId;
            const idleVideo = floor.sideVideoId || floor.idleAssetId || floor.sideAssetId;
            const idleVideoType = floor.sideVideoType || floor.idleAssetType || floor.sideAssetType;
            if (forwardVideo || reverseVideo || idleVideo) {
                videosPath = { forwardVideo, reverseVideo, idleVideo, idleVideoType };
            }
        }

        setHistory((prev) => [
            ...prev.slice(0, -1),
            {
                tab: activeTab,
                layer: LAYERS.FLOOR,
                item: floor,
                videosPath: videosPath,
                views: null,
            },
        ]);
    }, [activeTab, useStatic]);

    // Go back one step
    const handleGoBack = useCallback(() => {
        // console.log("go back: ", history);

        if (history.length <= 1) return; // Can't go back from home
        setHistory((prev) => prev.slice(0, -1));
    }, [history.length]);

    // Go to home (reset everything)
    const handleGoHome = useCallback(() => {
        setHistory(getInitHistory(currentProject));
    }, [currentProject, getInitHistory]);

    const handleSidebarState = useCallback((state) => {
        // Support both direct boolean and functional state updates.
        setSidebarOpen((prev) => (typeof state === "function" ? state(prev) : state));
    }, []);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentItems, setCurrentItems] = useState([]);
    const [type, setType] = useState("");

    // Calculate currentItems based on activeTab, activeLayer, and currentItem
    useEffect(() => {
        if (!currentProject) {
            setCurrentItems([]);
            setType("");
            return;
        }

        let items = [];
        let itemType = "";

        if (activeLayer === null) {
            // Home level navigation
            if (activeTab === TABS.ZONES) {
                items = currentProject.zones?.items || [];
                // If only one zone, show its properties directly
                if (items.length === 1) {
                    items = items[0].properties || [];
                }
            }
            else if (activeTab === TABS.AMENITIES) {
                items = currentProject.amenities?.items || [];
            }
            else if (activeTab === TABS.SURROUNDINGS) {
                items = currentProject.surroundings?.items || [];
            }
        }
        else {
            // Deeper layer navigation
            if (activeLayer === LAYERS.ZONE_DETAIL) {
                items = currentItem?.properties || [];
                if (items.length === 1) {
                    const property = items[0];
                    if (property.type === PROPERTY_TYPE.VILLA) {
                        items = property.units || [];
                        if (items.length > 8) itemType = "small";
                    }
                    else if (property.type === PROPERTY_TYPE.TOWNHOUSE) {
                        items = property.blocks || [];
                        if (items.length > 9) itemType = "small";
                    }
                }
            }
            else if (activeLayer === LAYERS.BUILDING) {
                if (currentItem?.type === PROPERTY_TYPE.TOWER) {
                    items = sortFloors(currentItem.floors || []);
                }
                else {
                    items = currentItem?.units || [];
                    if (items.length > 8) itemType = "small";
                }
            }
            else if (activeLayer === LAYERS.BUILDING_FEATURE) {
                items = currentItem?.items || [];
            }
            else if (activeLayer === LAYERS.FLOOR) {
                items = currentItem?.units || [];
                if (items.length > 8) itemType = "small";
            }
            else if (activeLayer === LAYERS.SURROUNDING_DETAIL) {
                // Keep showing surroundings items when viewing detail
                items = currentProject.surroundings?.items || [];
            }
            else if (activeLayer === LAYERS.UNIT) {
                // Get rooms from unit type interior for floating buttons (only in hotspot/panorama mode)
                if (!developerData.config.USE_HOTSPOTS) {
                    const unitType = useStatic
                        ? currentProject?.unitTypes?.[currentItem?.unitTypeId]
                        : currentProject?.unitTypes?.find(type => type.id === currentItem?.unitTypeId);
                    const levels = useStatic ? unitType?.interior?.levels : unitType?.levels;
                    if (levels) {
                        items = levels.flatMap(level => level.rooms || []);
                    }
                }
            }
        }

        setCurrentItems(items);
        setType(itemType);
    }, [activeTab, activeLayer, currentItem, currentProject, developerData]);

    // Clear selected project from localStorage
    const handleClearSelectedProject = useCallback(() => {
        // Invalidate any in-flight handleSetCurrentProject enrich() run so it can't
        // resurrect currentProject/localStorage once it finally resolves — its asset
        // fetching/caching keeps running regardless, only the state write is skipped.
        currentRequestIdRef.current++;
        localStorage.removeItem(STORAGE_KEY);
        setCurrentProject(null);
        setHistory(getInitHistory(null));
    }, [getInitHistory]);

    const ctxValue = {
        useStatic,

        currentProject,
        setCurrentProject: handleSetCurrentProject,
        clearSelectedProject: handleClearSelectedProject,

        activeDeveloperId: effectiveDeveloperId,
        setActiveDeveloper,
        developerConfig: developerData.config,
        developerPath: developerData.projectPath,
        developerStaticData: developerData.DEVELOPER,

        history,
        activeTab,
        activeLayer,
        currentItem,
        currentVideosPaths,
        currentViews,

        highlightedButton,
        setHighlightedButton,

        preloadStats,

        sidebarOpen,
        handleSidebarState,

        viewingFloorFeatures,
        setViewingFloorFeatures,

        currentItems,
        setCurrentItems,

        type,
        setType,

        goToItem: handleCurrentItem,
        goToTab,
        goBack: handleGoBack,
        goHome: handleGoHome,
        switchToFloor: handleSwitchToFloor,
        isPlaying,
        setIsPlaying,
    };

    return <SidebarContext.Provider value={ctxValue}>{children}</SidebarContext.Provider>
}