import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { FilterContext } from "../../store/FilterContextProvider";
import { SidebarContext } from "../../store/SidebarContextProvider";
import BaseFloatButton from "./BaseFloatButton";
import { LAYERS } from "../../data/layers";

export default function BaseFloating({ items, mediaRef }) {
    const container = mediaRef.current;

    const { filters } = useContext(FilterContext);
    const { activeTab, activeLayer, goToItem, highlightedButton, setHighlightedButton } = useContext(SidebarContext);

    // Filter items based on current filter state
    const filteredItems = useMemo(() => {
        if (!filters) return items;

        return items.filter(item => {
            // Apply unit type filter - check if item's unitType is in the selected array
            if (filters.unitType.length > 0 && !filters.unitType.includes(item.unitType)) {
                return false;
            }

            // Apply bedroom filter - check if item's bedroom count is in the selected array
            if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(item.bedrooms)) {
                return false;
            }

            // Apply bathroom filter - check if item's bathroom count is in the selected array
            if (filters.bathrooms.length > 0 && !filters.bathrooms.includes(item.bathrooms)) {
                return false;
            }

            // Apply surface area filter (assuming item has area property)
            if (filters.area !== null && item.area > filters.area) {
                return false;
            }

            // Apply budget filter (assuming item has price property)
            if (filters.price !== null && item.price > filters.price) {
                return false;
            }

            return true;
        });
    }, [items, filters]);

    const [buttonPositions, setButtonPositions] = useState([]);

    const updatePositions = useCallback(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const videoW = h * (16 / 9);
        const videoLeft = (w - videoW) / 2;

        const newPositions = items.map(item => ({
            left: videoLeft + videoW * item.x,
            top: h * item.y,
        }));
        setButtonPositions(newPositions);
    }, [items]);

    // Create a map for O(1) lookup: id → position
    const itemIdToPosition = useMemo(() => {
        const map = new Map();
        items.forEach((item, index) => {
            map.set(item.id, buttonPositions[index]);
        });
        return map;
    }, [items, buttonPositions]);

    // Observe resize
    useEffect(() => {
        if (!container) return;

        const resizeObserver = new ResizeObserver(updatePositions);
        resizeObserver.observe(container);

        updatePositions();

        return () => resizeObserver.disconnect();
    }, []); // Empty dependency array ensures this runs once on mount

    // Don't render until positions are ready
    if (buttonPositions.length !== items.length) return null;

    return (
        filteredItems.map((item) => {
            const pos = itemIdToPosition.get(item.id);
            if (!pos) return null;

            const isOpaque = (highlightedButton === null || highlightedButton === item);
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
                    isOpaque={isOpaque}
                    onSelect={() => {
                        if (isSelected) {
                            console.log("Selected item:", item);
                            
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