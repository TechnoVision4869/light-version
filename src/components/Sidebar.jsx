import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../store/SidebarContextProvider";
import { TABS, LAYERS, LAYER_CONFIG, TAB_CONFIG } from "../data/layers";

import UnitPanel from "../components/UnitPanel";
import FilterPanel from "../components/FilterPanel";

import ZoneButton from "./buttons/ZoneButton";
import BuildingButton from "./buttons/BuildingButton";
import FloorButton from "./buttons/FloorButton";
import ApartmentButton from "./buttons/ApartmentButton";

import AmenityButton from "./buttons/AmenityButton";
import SurroundingButton from "./buttons/SurroundingButton";

export default function Sidebar() {
    const { activeTab, activeLayer, currentItem, sidebarOpen, goToItem } = useContext(SidebarContext);
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

                            <div className="max-h-[calc(100vh-205px)] scrollbar-custom overflow-y-auto overflow-x-hidden space-y-3 px-2 py-2">
                                {/* Render different content based on active tab */}
                                {activeTab === TABS.ZONES &&
                                    activeLayer === null &&
                                    TAB_CONFIG[TABS.ZONES]
                                        .getItems()
                                        .map((zone) => {
                                            return (
                                                <ZoneButton
                                                    zone={zone}
                                                    key={zone.id}
                                                    goToZone={goToItem}
                                                />
                                            )
                                        })}
                                {activeTab === TABS.SURROUNDINGS &&
                                    activeLayer === null &&
                                    TAB_CONFIG[TABS.SURROUNDINGS]
                                        .getItems()
                                        .map((item) => (
                                            <SurroundingButton
                                                surrounding={item}
                                                key={item.id}
                                                // isDisabled={isDisabled}
                                                isSelected={currentItem === item}
                                                goToSurrounding={goToItem}
                                            />
                                        ))}

                                {activeTab === TABS.AMENITIES &&
                                    activeLayer === null &&
                                    TAB_CONFIG[TABS.AMENITIES]
                                        .getItems()
                                        .map((item) => (
                                            <AmenityButton
                                                amenity={item}
                                                key={item.id}
                                                // isDisabled={isDisabled}
                                                isSelected={currentItem === item}
                                                goToAmenity={goToItem}
                                            />
                                        ))}
                                {activeTab === TABS.ZONES &&
                                    activeLayer === LAYERS.ZONE_DETAIL &&
                                    LAYER_CONFIG[LAYERS.ZONE_DETAIL]
                                        .getItems(currentItem)
                                        .map((building) => (
                                            <BuildingButton
                                                building={building}
                                                key={building.id}
                                                goToBuilding={goToItem}
                                            />
                                        ))}
                                {activeTab === TABS.ZONES &&
                                    activeLayer === LAYERS.BUILDING &&
                                    LAYER_CONFIG[LAYERS.BUILDING]
                                        .getItems(currentItem)
                                        .map((floor) => (
                                            <FloorButton
                                                floor={floor}
                                                key={floor.id}
                                                goToFloor={goToItem}
                                            />
                                        ))}
                                {activeTab === TABS.ZONES &&
                                    activeLayer === LAYERS.FLOOR &&
                                    LAYER_CONFIG[LAYERS.FLOOR]
                                        .getItems(currentItem)
                                        .map((apartment) => (
                                            <ApartmentButton
                                                apartment={apartment}
                                                key={apartment.id}
                                                goToApartment={goToItem}
                                            />
                                        ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </aside>
    )
}