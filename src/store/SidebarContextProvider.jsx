import { createContext, useCallback, useState } from "react";

import { TABS, LAYERS, DATA } from "../data/layers";

export const SidebarContext = createContext({
    history: [],
    activeTab: "",
    activeLayer: "",
    currentItem: {},
    currentVideosPath: {},

    highlightedButton: null,
    setHighlightedButton: () => { },

    sidebarOpen: false,
    handleSidebarState: () => { },

    currentItems: [],
    setCurrentItems: () => { },
    goToItem: () => { },
    goToTab: () => { },
    goBack: () => { },
    goHome: () => { },
});

export default function SidebarContextProvider({ children }) {
    const initHistory = [
        {
            tab: TABS.HOME,
            layer: null,
            item: null,
            videosPath: {
                forwardVideo: DATA.project.zoomoutVideo,
                reverseVideo: null,
                idleVideo: DATA.project.idleVideo,
            }
        },
    ];

    const [history, setHistory] = useState(initHistory);
    const [sidebarOpen, setSidebarOpen] = useState(false); // set true when sidebar is open

    const [highlightedButton, setHighlightedButton] = useState(null);

    // Get current state from history
    const currentEntry = history[history.length - 1];
    const {
        tab: activeTab,
        layer: activeLayer,
        item: currentItem,
        videosPath: currentVideosPaths,
    } = currentEntry;

    const goToTab = useCallback((tabKey, selectedItem, isFromHome = true) => {
        // console.log(selectedItem);

        const calculatedVideosPath = isFromHome
            ? selectedItem.videos
            : {
                forwardVideo: selectedItem.zoomoutVideo,
                reverseVideo: selectedItem.videos.reverseVideo,
                idleVideo: selectedItem.videos.idleVideo,
            };

        setHistory(() => [
            ...initHistory,
            {
                tab: tabKey,
                layer: null,
                item: selectedItem,
                videosPath: calculatedVideosPath,
            },
        ]);
    }, []);

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
                },
            ]);
            return;
        }

        const videosPath = item.videos;

        setHistory((prev) => [
            ...prev,
            {
                tab: activeTab,
                layer: targetLayer,
                item: item,
                videosPath: videosPath,
            },
        ]);
    }, [history]);

    // Go back one step
    const handleGoBack = useCallback(() => {
        // console.log("go back: ", history);

        if (history.length <= 1) return; // Can't go back from home
        setHistory((prev) => prev.slice(0, -1));
    }, [history.length]);

    // Go to home (reset everything)
    const handleGoHome = useCallback(() => {
        setHistory(initHistory);
    }, []);

    const handleSidebarState = useCallback((state) => {
        // console.log(state);
        setSidebarOpen(state);
    }, []);

    const [currentItems, setCurrentItems] = useState([]);

    const ctxValue = {
        history,
        activeTab,
        activeLayer,
        currentItem,
        currentVideosPaths,

        highlightedButton,
        setHighlightedButton,

        sidebarOpen,
        handleSidebarState,

        currentItems,
        setCurrentItems,
        goToItem: handleCurrentItem,
        goToTab,
        goBack: handleGoBack,
        goHome: handleGoHome
    };

    return <SidebarContext.Provider value={ctxValue}>{children}</SidebarContext.Provider>
}