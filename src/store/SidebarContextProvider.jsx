import { createContext, useCallback, useState } from "react";

import { TABS, TAB_CONFIG, LAYER_CONFIG, LAYERS } from "../data/layers";

export const SidebarContext = createContext({
    history: [],
    activeTab: "",
    activeLayer: "",
    currentItem: {},
    currentVideosPath: {},

    sidebarOpen: false,
    handleSidebarState: () => { },

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
            videosPath: TAB_CONFIG[TABS.HOME].videosPath,
        },
    ];

    const [history, setHistory] = useState(initHistory);
    const [sidebarOpen, setSidebarOpen] = useState(false); // set true when sidebar is open


    // Get current state from history
    const currentEntry = history[history.length - 1];
    const {
        tab: activeTab,
        layer: activeLayer,
        item: currentItem,
        videosPath: currentVideosPaths,
    } = currentEntry;

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
            goToTab(tab, isFromHome, isFromAnotherTab);
        }

        setTimeout(() => {
            setSidebarOpen(true);
        }, 750);
    };

    const goToTab = useCallback((tabKey, isFromHome = true) => {
        const config = TAB_CONFIG[tabKey];
        // console.log(tabKey);

        setHistory(() => [
            ...initHistory,
            {
                tab: tabKey,
                layer: null,
                item: {
                    id: tabKey,
                    displayName: tabKey,
                },
                videosPath: config.videosPath(isFromHome),
            },
        ]);
    }, []);

    const handleCurrentItem = useCallback((item, layerKey) => {
        // console.log("item: ", item);
        // console.log("layer: ", layerKey);

        if (history[2]?.layer === LAYERS.SURROUNDING_DETAIL) {

            const tempHistory = history.slice(0, -1);

            setHistory([
                ...tempHistory, {
                    tab: activeTab,
                    layer: layerKey,
                    item: item,
                    videosPath: null,
                },
            ]);

            return;
        }

        const config = LAYER_CONFIG[layerKey];
        const videosPath = config.videosPath?.(item);

        setHistory((prev) => [
            ...prev,
            {
                tab: activeTab,
                layer: layerKey,
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
        console.log(state);

        setSidebarOpen(state);
    })

    const ctxValue = {
        history,
        activeTab,
        activeLayer,
        currentItem,
        currentVideosPaths,

        sidebarOpen,
        handleSidebarState,

        goToItem: handleCurrentItem,
        goToTab: handleActiveTab,
        goBack: handleGoBack,
        goHome: handleGoHome
    };

    return <SidebarContext.Provider value={ctxValue}>{children}</SidebarContext.Provider>
}