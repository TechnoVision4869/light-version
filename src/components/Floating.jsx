import { useState, useEffect, useMemo, useCallback } from "react";
import FloatingButton from "./buttons/FloatingButton";
import { TABS, LAYERS } from '../data/layers';
import AnimButton from "./buttons/AnimButton";

export default function Floating({ items, mediaRef, tab, layer, filters = null, onSelectItem, onChangePoints }) {
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

    const [buttonPositions, setButtonPositions] = useState(
        items.map(() => ({ left: 0, top: 0 }))
    );

    const updatePositions = useCallback(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const videoW = h * (16 / 9);
        const videoLeft = (w - videoW) / 2;

        const newPositions = filteredItems.map(surr => ({
            left: (videoLeft + videoW * surr.x),
            top: h * surr.y,
        }));
        setButtonPositions(newPositions);
    }, [filteredItems, buttonPositions]);

    const updatePoints = (points) => {        
        const w = container.clientWidth;
        const h = container.clientHeight;
        const videoW = h * (16 / 9);
        const videoLeft = (w - videoW) / 2;

        const newPoints = points.map(point => ({
            // rounded = Math.round(number * 100) / 100;
            x: Math.round(((videoLeft + videoW * point.x)/1000)*100) / 100,
            y: Math.round(((h * point.y)/1000)*100) / 100,
        }))
        return newPoints;
    }

    useEffect(() => {
        const resizeObserver = new ResizeObserver(updatePositions);
        resizeObserver.observe(container);

        return () => resizeObserver.disconnect();
    },[]); // Empty dependency array ensures this runs once on mount

    // Update button positions whenever filteredItems changes
    useEffect(() => {
        if (!container || filteredItems.length === 0) {
            setButtonPositions([]);
            return;
        }
        updatePositions();
        
    }, [filteredItems]);

    // Don't render anything if there are no filtered items or no positions calculated yet
    if (filteredItems.length === 0 || buttonPositions.length !== filteredItems.length) {
        return null;
    }

    if(tab === TABS.SURROUNDINGS) {
        return (
        filteredItems.map((item, i) => (
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
                    onChangePoints(updatePoints(item.points));
                }
                }
            />
        ))
    );
}

    return (
        filteredItems.map((item, i) => (
            <FloatingButton
                key={item.id}
                name={item.displayName}
                tabType={tab}
                layerType={layer}
                style={{
                    left: `${buttonPositions[i].left}px`,
                    top: `${buttonPositions[i].top}px`,
                }}
                onSelect={() => onSelectItem(item, layer)}
            />
        ))
    );
}