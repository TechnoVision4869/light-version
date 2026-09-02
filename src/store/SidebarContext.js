import { createContext } from "react";

export const SidebarContext = createContext({
    useMockup: false,
    
    currentProject: null,
    setCurrentProject: () => { },

    activeDeveloperId: null,
    setActiveDeveloper: () => { },
    developerConfig: {},
    developerPath: null,
    developerStaticData: null,

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

    viewingFloorFeatures: false,
    setViewingFloorFeatures: () => { },

    currentItems: [],
    setCurrentItems: () => { },

    type: "",
    setType: () => { },

    goToItem: () => { },
    goToTab: () => { },
    goBack: () => { },
    goHome: () => { },
    isPlaying: false,
    setIsPlaying: () => { },
});