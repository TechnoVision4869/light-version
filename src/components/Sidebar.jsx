import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../store/SidebarContextProvider";
import { TABS, LAYERS } from "../data/layers";

import UnitPanel from "../components/UnitPanel";
import FilterPanel from "../components/FilterPanel";
import SidebarButtons from "./SideBarButtons";

export default function Sidebar() {
    const { activeTab, activeLayer, currentItem, sidebarOpen } = useContext(SidebarContext);
    const [isFilter, setIsFilter] = useState(false); // 'navigate' or 'filter'

    useEffect(() => {
        // console.log(activeLayer);
        if (activeLayer !== LAYERS.FLOOR) {
            setIsFilter(false);
        }
    }, [activeLayer]);

    return (
        <aside
            className={`bg-white/9 rounded-2xl p-2 py-3 md:py-4 flex-shrink-0 transition-all duration-700 overflow-hidden
                     ${activeTab === TABS.HOME || activeLayer === LAYERS.AMENITY_DETAIL || activeLayer === LAYERS.SURROUNDING_DETAIL
                    ? "w-0 opacity-0 pointer-events-none"
                    : sidebarOpen
                        ? "w-44 md:w-68 opacity-100"
                        : "w-0 opacity-0 pointer-events-none"
                }`}
        >
            {activeTab === TABS.ZONES && activeLayer === LAYERS.APARTMENT ? (
                <UnitPanel />
            ) : (
                <div className="h-full pr-1">
                    {activeLayer === LAYERS.FLOOR && (
                        <div className="flex rounded-md overflow-hidden mb-4">
                            {/* Navigate Button */}
                            <button
                                onClick={() => setIsFilter(false)}
                                className={`flex-1 px-4 py-2 font-semibold transition rounded-l-md 
                            ${!isFilter
                                        ? "bg-white text-black"
                                        : "bg-[#2e2e2e] text-white hover:bg-white/7"
                                    }`}
                            >
                                Navigate
                            </button>

                            {/* Filter Button */}
                            <button
                                onClick={() => setIsFilter(true)}
                                className={`flex-1 px-4 py-2 font-semibold transition rounded-r-md 
                            ${isFilter
                                        ? "bg-white text-black"
                                        : "bg-[#2e2e2e] text-white hover:bg-white/7"
                                    }`}
                            >
                                Filter
                            </button>
                        </div>
                    )}

                    {isFilter ? (
                        <FilterPanel />
                    ) : (
                        <>
                            {/* Dynamic sidebar title based on active tab */}
                            <div className="text-white font-semibold my-1 px-3 whitespace-nowrap">
                                {String(currentItem?.displayName).charAt(0).toUpperCase() +
                                    String(currentItem?.displayName).slice(1)}
                            </div>
                            <div className="h-0.5 bg-white/50 mx-3 mb-4"></div>

                            {/* Render different content based on active tab and active layer */}
                           <SidebarButtons />
                        </>
                    )}
                </div>
            )}
        </aside>
    )
}