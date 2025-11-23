import { useState, useEffect, useMemo } from "react";
import { DATA } from "../data/layers";
import FloatingButton from "./buttons/FloatingButton";

export default function FloatingFilter({ items, mediaRef, tab, filters = null }) {
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

    useEffect(() => {
        // Update button positions whenever filteredItems changes
        const container = mediaRef.current;
        if (!container || filteredItems.length === 0) {
            setButtonPositions([]);
            return;
        }

        const updatePositions = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            const videoW = h * (16 / 9);
            const videoLeft = (w - videoW) / 2;

            const newPositions = filteredItems.map(surr => ({
                left: videoLeft + videoW * surr.x,
                top: h * surr.y,
            }));
            setButtonPositions(newPositions);
        };

        updatePositions();

        const resizeObserver = new ResizeObserver(updatePositions);
        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, [mediaRef, DATA, filteredItems]); // Remove DATA dependency if it's not needed here

    // Don't render anything if there are no filtered items or no positions calculated yet
    if (filteredItems.length === 0 || buttonPositions.length !== filteredItems.length) {
        return null;
    }

    return (
        filteredItems.map((btn, i) => (
            <FloatingButton
                key={btn.id}
                name={btn.name}
                iconType={btn.icon}
                tabType={tab}
                style={{
                    left: `${buttonPositions[i].left}px`,
                    top: `${buttonPositions[i].top}px`,
                }}
            />
        ))
    );
}