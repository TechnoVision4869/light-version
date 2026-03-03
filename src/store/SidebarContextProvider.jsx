import { useCallback, useState, useEffect } from "react";

import { SidebarContext } from "./SidebarContext";
import { TABS, LAYERS, DATA } from "../data/layers";
import { enrichProjectData } from "../lib/enrichProjectData";
import { APP_CONFIG } from "../config/appConfig";

export { SidebarContext };

export default function SidebarContextProvider({ children }) {
    const useMockup = APP_CONFIG.USE_MOCKUP;
    const [currentProject, setCurrentProject] = useState(null);

    const getInitHistory = useCallback((project) => {
        // Helper to get the video URL from project, checking both naming patterns
        // (mock data uses zoomoutVideo/idleVideo, API uses zoomoutAssetId/idleAssetId after enrichment)
        const getVideoUrl = (project, ...keys) => {
            if (!project) return null;
            for (const key of keys) {
                if (project[key]) return project[key];
            }
            return null;
        };

        return [
        {
            tab: TABS.HOME,
            layer: null,
            item: null,
            videosPath: {
                forwardVideo: getVideoUrl(project, 'zoomoutVideo', 'zoomoutAssetId') ?? null,
                reverseVideo: null,
                idleVideo: getVideoUrl(project, 'idleVideo', 'idleAssetId') ?? null,
            },
            views: null,
        },
    ]
    }, []);


    const [history, setHistory] = useState(getInitHistory(currentProject));
    const [sidebarOpen, setSidebarOpen] = useState(false); // set true when sidebar is open

    const [highlightedButton, setHighlightedButton] = useState(null);

    // Reset history when project changes
    const handleSetCurrentProject = useCallback((project) => {
        const enrich = async () => {
            try {
                const enrichedProject = await enrichProjectData(project, useMockup);
                setCurrentProject(enrichedProject);
                setHistory(getInitHistory(enrichedProject));
            } catch (error) {
                console.error('Error enriching project data:', error);
                // Fall back to non-enriched project
                setCurrentProject(project);
                setHistory(getInitHistory(project));
            }
        };
        enrich();
    }, [useMockup, getInitHistory]);

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
        if (!zone?.properties?.length) return null;
        if (zone.properties.length === 1) return zone.properties[0];

        return zone.properties.find((property) => {
            if (property.blocks?.some((block) => block.id === targetItem?.id)) return true;
            if (property.units?.some((unit) => unit.id === targetItem?.id)) return true;
            return false;
        }) || null;
    }, []);

    const goToTab = useCallback((tabKey, layerKey = null, selectedItem, isFromHome = true) => {
        console.log(tabKey);
        // console.log(selectedItem);
        let calculatedVideosPath = null;
        if(useMockup) {
            calculatedVideosPath = isFromHome
            ? selectedItem.videos
            : {
                forwardVideo: selectedItem.zoomoutVideo,
                reverseVideo: selectedItem.videos.reverseVideo,
                idleVideo: selectedItem.videos.idleVideo,
            };
        }else {
            calculatedVideosPath = isFromHome
            ? {
                forwardVideo: tabKey === "zones" ? selectedItem.zonesForwardVideoId : selectedItem.forwardVideoId,
                reverseVideo: tabKey === "zones" ? selectedItem.zonesReverseVideoId : selectedItem.reverseVideoId,
                idleVideo: tabKey === "zones" ? selectedItem.zonesSideVideoId : selectedItem.sideVideoId,
            }
            : {
                forwardVideo: tabKey === "zones" ? selectedItem.zonesZoomoutVideoId : selectedItem.zoomoutVideoId,
                reverseVideo: tabKey === "zones" ? selectedItem.zonesReverseVideoId : selectedItem.reverseVideoId,
                idleVideo: tabKey === "zones" ? selectedItem.zonesSideVideoId : selectedItem.sideVideoId,
            };
        }
        

        const calculatedViews = selectedItem.views || null;

        setHistory(() => [
            ...getInitHistory(currentProject),
            {
                tab: tabKey,
                layer: layerKey,
                item: selectedItem,
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
        if(useMockup) {
            videosPath = item?.videos; // undefined if not present
        } else {
                videosPath = {
                    forwardVideo: item.forwardVideoId,
                    reverseVideo: item.reverseVideoId,
                    idleVideo: item.sideVideoId,
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

        if (videosPath === undefined) videosPath = property?.videos; // still undefined if not present on property

        // Views availability rules:
        // - If navigating into a UNIT layer: views should be available only for `villa` properties.
        // - For other layers (e.g., BUILDING) try to use property's views when not present on the item.
        if (targetLayer === LAYERS.UNIT) {
            if (property?.type === "villa") {
                if (views === undefined) views = property?.views; // allow views for villa units
            } else {
                views = null; // explicitly no views for town/tower units
            }
        } else {
            if (views === undefined) views = property?.views; // use property's views for building/floor layers
        }

        // Final fallbacks to the previously-current values if still undefined
        if (videosPath === undefined) videosPath = currentVideosPaths ?? null;
        if (views === undefined) views = currentViews ?? null;

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
        // console.log(state);
        setSidebarOpen(state);
    }, []);

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
                    if (property.type === "villa") {
                        items = property.units || [];
                        if (items.length > 8) itemType = "small";
                    }
                    else if (property.type === "town") {
                        items = property.blocks || [];
                        if (items.length > 9) itemType = "small";
                    }
                }
            }
            else if (activeLayer === LAYERS.BUILDING) {
                if (currentItem?.type === "tower") {
                    items = currentItem.floors || [];
                }
                else {
                    items = currentItem?.units || [];
                    if (items.length > 8) itemType = "small";
                }
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
                // Get rooms from unit type interior for floating buttons
                const unitType = currentProject.unitTypes?.[currentItem?.unitTypeId];
                if (unitType?.interior?.levels) {
                    items = unitType.interior.levels.flatMap(level => level.rooms || []);
                }
            }
        }

        setCurrentItems(items);
        setType(itemType);
    }, [activeTab, activeLayer, currentItem, currentProject]);

    const ctxValue = {
        useMockup,
        
        currentProject,
        setCurrentProject: handleSetCurrentProject,

        history,
        activeTab,
        activeLayer,
        currentItem,
        currentVideosPaths,
        currentViews,

        highlightedButton,
        setHighlightedButton,

        sidebarOpen,
        handleSidebarState,

        currentItems,
        setCurrentItems,

        type,
        setType,

        goToItem: handleCurrentItem,
        goToTab,
        goBack: handleGoBack,
        goHome: handleGoHome
    };

    return <SidebarContext.Provider value={ctxValue}>{children}</SidebarContext.Provider>
}