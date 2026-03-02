import { createContext } from "react";

export const SidebarContext = createContext({
    useMockup: false,
    
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
