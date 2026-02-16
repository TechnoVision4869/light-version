import { createContext, useCallback, useState } from "react";

import { TABS, LAYERS, DATA } from "../data/layers";

export const SidebarContext = createContext({
    currentProject: null,
    setCurrentProject: () => { },

    history: [],
    activeTab: "",
    activeLayer: "",
    currentItem: {},
    currentVideosPath: {},
    currentViews: null,

    highlightedButton: null,
    setHighlightedButton: () => { },

    sidebarOpen: false,
    handleSidebarState: () => { },

    currentItems: [],
    setCurrentItems: () => { },

    type: "",
    setType: () => { },

    goToItem: () => { },
    goToTab: () => { },
    goBack: () => { },
    goHome: () => { },
});

export default function SidebarContextProvider({ children }) {
    const [currentProject, setCurrentProject] = useState(null);

    const getInitHistory = useCallback((project) => ([
        {
            tab: TABS.HOME,
            layer: null,
            item: null,
            videosPath: {
                forwardVideo: project?.zoomoutVideo ?? null,
                reverseVideo: null,
                idleVideo: project?.idleVideo ?? null,
            },
            views: null,
        },
    ]), []);

    const [history, setHistory] = useState(getInitHistory(currentProject));
    const [sidebarOpen, setSidebarOpen] = useState(false); // set true when sidebar is open

    const [highlightedButton, setHighlightedButton] = useState(null);

    // Reset history when project changes
    const handleSetCurrentProject = useCallback((project) => {
        setCurrentProject(project);
        setHistory(getInitHistory(project));
    }, [getInitHistory]);

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

    const goToTab = useCallback((tabKey, selectedItem, isFromHome = true) => {
        // console.log(selectedItem);

        const calculatedVideosPath = isFromHome
            ? selectedItem.videos
            : {
                forwardVideo: selectedItem.zoomoutVideo,
                reverseVideo: selectedItem.videos.reverseVideo,
                idleVideo: selectedItem.videos.idleVideo,
            };

        const calculatedViews = selectedItem.views || null;

        setHistory(() => [
            ...getInitHistory(currentProject),
            {
                tab: tabKey,
                layer: null,
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
        let videosPath = item?.videos; // undefined if not present
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

    const ctxValue = {
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