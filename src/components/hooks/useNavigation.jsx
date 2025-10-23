import { useState, useCallback } from "react";
import { TABS, TAB_CONFIG, LAYER_CONFIG } from "../../data/layers";

export function useNavigation() {
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
    const goToTab = useCallback((tabKey) => {
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
    }, []);

    // Navigate to a specific item within current tab
    const goToItem = useCallback((item, layerKey) => {
        const config = LAYER_CONFIG[layerKey];
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
        goToTab,
        goToItem,
        goBack,
        goToHome
    };
}