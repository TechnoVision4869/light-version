import { useState, useCallback } from "react";
import { MODE, MODE_CONFIG, TABS, TAB_CONFIG, LAYER_CONFIG } from "../../data/layers";

export function useNavigation() {
    const initHistory = [
        {
            tab: TABS.HOME,
            layer: null,
            itemId: null,
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
        itemId: currentItemId,
        path: currentPath,
        videosPath: currentVideosPaths,
    } = currentEntry;

    // Navigate to a main tab (ZONES, SURROUNDINGS, AMENITIES)
    const goToTab = useCallback((tabKey) => {
        const config = TAB_CONFIG[tabKey];
        setHistory(() => [
            initHistory,
            {
                tab: tabKey,
                layer: null,
                itemId: tabKey,
                path: MODE_CONFIG === MODE.VIDEO ? null : config.path,
                videosPath: MODE_CONFIG === MODE.VIDEO ? config.videosPath : null,
            },
        ]);
    }, []);

    // Navigate to a specific item within current tab
    const goToItem = useCallback((item, layerKey) => {
        const config = LAYER_CONFIG[layerKey];
        const path = config.path(item.id);
        const videosPath = config.videosPath(item.id);

        setHistory((prev) => [
            ...prev,
            {
                tab: activeTab,
                layer: layerKey,
                itemId: item.id,
                path: path,
                videosPath: videosPath,
            },
        ]);
    }, [activeTab]);

    // Go back one step
    const goBack = useCallback(() => {
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
        currentItemId,
        currentPath,
        currentVideosPaths,
        goToTab,
        goToItem,
        goBack,
        goToHome
    };
}