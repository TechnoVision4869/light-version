import { useContext, useMemo } from "react";
import { FilterContext } from "../../store/FilterContextProvider";
import { SidebarContext } from "../../store/SidebarContextProvider";
import { useFloatingPositions } from "../../hooks/useFloatingPositions";
import BaseFloatButton from "./BaseFloatButton";
import AnimFloatButton from "./AnimFloatButton";
import { TABS, LAYERS } from '../../data/layers';
import { MainContext } from "@/store/MainContextProvider";

export default function BaseFloating({ mediaRef }) {
    const { filters } = useContext(FilterContext);
    const { activeTab, activeLayer, currentItem, currentItems, type, goToItem, highlightedButton, setHighlightedButton } = useContext(SidebarContext);
    const { openRoomInterior } = useContext(MainContext);

    // For FLOOR layer, use filtered items; otherwise use currentItems
    const itemsToRender = useMemo(() => {
        if (activeLayer === LAYERS.FLOOR) {
            // Apply filtering to units
            const units = currentItems;
            
            if (!filters) return units;

            return units.filter(item => {
                // Apply unit type filter
                // if (filters.unitType.length > 0 && !filters.unitType.includes(item.unitType)) {
                //     return false;
                // }

                // Apply bedroom filter
                if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(item.bedrooms)) {
                    return false;
                }

                // Apply bathroom filter
                if (filters.bathrooms.length > 0 && !filters.bathrooms.includes(item.bathrooms)) {
                    return false;
                }

                // Apply surface area filter
                if (filters.area !== null && item.area > filters.area) {
                    return false;
                }

                // Apply budget filter
                if (filters.price !== null && item.price > filters.price) {
                    return false;
                }
                return true;
            });
        }
        return currentItems;
    }, [activeLayer, currentItem, currentItems, filters]);

    const { buttonPositions, itemIdToPosition } = useFloatingPositions(currentItems, mediaRef);

    if (!itemsToRender) return null;
    
    let layerKey = null;
    if (activeLayer !== null) {
        switch (activeLayer) {
            case LAYERS.ZONE_DETAIL:
                if (currentItem.properties[0].type === "villa") layerKey = LAYERS.UNIT;
                else layerKey = LAYERS.BUILDING;
                break;
            case LAYERS.BUILDING:
                if (currentItem.type === "tower") layerKey = LAYERS.FLOOR;
                else layerKey = LAYERS.UNIT;
                break;
            case LAYERS.FLOOR:
                layerKey = LAYERS.UNIT;
                break;
            case LAYERS.UNIT:
                break;
            default:
                break;
        }
    } else {
        switch (activeTab) {
            case TABS.ZONES:
                layerKey = LAYERS.ZONE_DETAIL;
                break;
            case TABS.AMENITIES:
                layerKey = LAYERS.AMENITY_DETAIL;
                break;
            case TABS.SURROUNDINGS:
                layerKey = LAYERS.SURROUNDING_DETAIL;
                break;
            default:
                break;
        }
    }

    // FLOOR layer - render filtered units
    if (activeLayer === LAYERS.FLOOR) {
        return (
            itemsToRender.map((item) => {
                const pos = itemIdToPosition.get(item.id);
                if (!pos) return null;

                const isSelected = highlightedButton === item;

                return (
                    <BaseFloatButton
                        key={item.id}
                        name={item.displayName}
                        tabType={activeTab}
                        layerType={activeLayer}
                        style={{
                            left: `${pos.left}px`,
                            top: `${pos.top}px`,
                        }}
                        isSelected={isSelected}
                        onSelect={() => {
                            if (isSelected) {
                                goToItem(item, LAYERS.UNIT);
                                setHighlightedButton(null);
                            }
                            else setHighlightedButton(item);
                        }}
                    />
                )
            })
        );
    }

    if (activeTab === TABS.SURROUNDINGS) {
        return (
            itemsToRender.map((item) => {
                const pos = itemIdToPosition.get(item.id);

                if (!pos) return null;
                const isSelected = currentItem?.id === item.id;
                
                return (
                    <AnimFloatButton
                        key={item.id}
                        name={item.displayName}
                        icon={item.iconSrc}
                        style={{
                            left: `${pos.left}px`,
                            top: `${pos.top}px`,
                        }}
                        onSelect={() => {
                            goToItem(item, LAYERS.SURROUNDING_DETAIL);
                        }}
                        isSelected={isSelected}
                        nameDirection={item.nameDirection || "right"}
                    />
                );
            })
        );
    }

    // Handle UNIT layer - show room buttons
    if (activeLayer === LAYERS.UNIT) {
        return (
            itemsToRender.map((room) => {
                const pos = itemIdToPosition.get(room.id);
                if (!pos) return null;

                const isSelected = highlightedButton === room;

                return (
                    <BaseFloatButton
                        key={room.id}
                        name={room.displayName}
                        tabType={activeTab}
                        layerType={activeLayer}
                        style={{
                            left: `${pos.left}px`,
                            top: `${pos.top}px`,
                        }}
                        isSelected={isSelected}
                        onSelect={() => {
                            // if (isSelected) {
                            //     setHighlightedButton(null);
                            // }
                            // else {
                            //     setHighlightedButton(room);
                                // Pass room data directly to context handler
                                openRoomInterior(room);
                            // }
                        }}
                    />
                );
            })
        );
    }

    // Default rendering for other layers
    return (
        itemsToRender.map((item) => {
            const pos = itemIdToPosition.get(item.id);

            if (!pos) return null;

            const isSelected = highlightedButton === item;

            if (type !== "small") {
                return (
                    <BaseFloatButton
                        key={item.id}
                        name={item.displayName}
                        tabType={activeTab}
                        layerType={activeLayer}
                        style={{
                            left: `${pos.left}px`,
                            top: `${pos.top}px`,
                        }}
                        isSelected={isSelected}
                        onSelect={() => {
                            if (isSelected) {
                                goToItem(item, layerKey);
                                setHighlightedButton(null);
                            }
                            else setHighlightedButton(item);
                        }}
                    />
                )
            }

            return (
                <BaseFloatButton
                    key={item.id}
                    name={item.displayName}
                    tabType={activeTab}
                    layerType={activeLayer}
                    showName={false}
                    triClass="triangle-small-down"
                    style={{
                        left: `${pos.left}px`,
                        top: `${pos.top}px`,
                    }}
                    isSelected={isSelected}
                    onSelect={() => {
                        if (isSelected) {
                            goToItem(item, layerKey);
                            setHighlightedButton(null);
                        }
                        else setHighlightedButton(item);
                    }}
                />
            )
        })
    );
}