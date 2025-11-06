import { useState, useCallback, useRef } from "react";
import { MODE, MODE_CONFIG, TABS, TAB_CONFIG, LAYER_CONFIG, LAYERS } from "../../data/layers";

export function useNavigation() {
    const initHistory = [
        {
            tab: TABS.HOME,
            layer: null,
            item: null,
            path: TAB_CONFIG[TABS.HOME].path,
            videosPath: TAB_CONFIG[TABS.HOME].videosPath,
        },
    ];

    // state to manage history stack
    const [history, setHistory] = useState(initHistory);

    // Get current state from history
    const currentEntry = history[history.length - 1];
    const {
        tab: activeTab,
        layer: activeLayer,
        item: currentItem,
        path: currentPath,
        videosPath: currentVideosPaths,
    } = currentEntry;

    // Navigate to a main tab (ZONES, SURROUNDINGS, AMENITIES)
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
                    name: tabKey,
                },
                path: MODE_CONFIG === MODE.VIDEO ? null : config.path,
                videosPath: MODE_CONFIG === MODE.VIDEO ? config.videosPath(isFromHome) : null,
            },
        ]);
    }, []);

    // Navigate to a specific item within current tab
    const goToItem = useCallback((item, layerKey) => {
        // console.log("item: ", item);
        // console.log("layer: ", layerKey);
        const config = LAYER_CONFIG[layerKey];
        const path = config.path?.(item.id);
        const videosPath = config.videosPath?.(item);

        setHistory((prev) => [
            ...prev,
            {
                tab: activeTab,
                layer: layerKey,
                item: item,
                path: path,
                videosPath: videosPath,
            },
        ]);
    }, [activeTab]);

    // Go back one step
    const goBack = useCallback(() => {
        // console.log(history);

        if (history.length <= 1) return; // Can't go back from home
        setHistory((prev) => prev.slice(0, -1));
    }, [history.length]);

    // Go to home (reset everything)
    const goToHome = useCallback(() => {
        setHistory(initHistory);
    }, []);

    return {
        history,
        activeTab,
        activeLayer,
        currentItem,
        currentPath,
        currentVideosPaths,
        goToTab,
        goToItem,
        goBack,
        goToHome
    };
}