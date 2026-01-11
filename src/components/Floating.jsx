import { useState, useEffect, useMemo, useCallback } from "react";
import FloatingButton from "./buttons/FloatingButton";
import { TABS, LAYERS } from '../data/layers';
import AnimButton from "./buttons/AnimButton";

export default function Floating({ items, mediaRef, tab, layer, filters = null, onSelectItem }) {
    const container = mediaRef.current;

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

    if (tab === TABS.SURROUNDINGS) {
        return (
            items.map((item, i) => (
                <AnimButton
                    key={item.id}
                    name={item.displayName}
                    icon={item.iconSrc}
                    style={{
                        left: `${buttonPositions[i].left}px`,
                        top: `${buttonPositions[i].top}px`,
                    }}
                    onSelect={() => {
                        onSelectItem(item, LAYERS.SURROUNDING_DETAIL);
                        // onChangeItem(item.id);
                    }}
                />
            ))
        );
    }

    return (
        filteredItems.map((item) => {
            const pos = itemIdToPosition.get(item.id);
                if (!pos) return null;
            return (
            <FloatingButton
                key={item.id}
                name={item.displayName}
                tabType={tab}
                layerType={layer}
                style={{
                    left: `${pos.left}px`,
                    top: `${pos.top}px`,
                }}
                onSelect={() => onSelectItem(item, layer)}
            />
        )
    })
    );
}