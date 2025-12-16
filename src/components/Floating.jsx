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

    const [itemLayouts, setItemLayouts] = useState([]);

    const computeItemLayouts = useCallback(() => {
        if (!container || filteredItems.length === 0) {
            setItemLayouts([]);
            return;
        }

        const w = container.clientWidth;
        const h = container.clientHeight;
        const videoW = h * (16 / 9);
        const videoLeft = (w - videoW) / 2;

        const layouts = filteredItems.map(item => {
            // 1. Button position (in pixels, for CSS)
            const buttonPos = {
                left: videoLeft + videoW * item.x,
                top: h * item.y,
            };

            // 2. Path points (normalized to [0,1] for SVG viewBox)
            const pathPoints = (item.points || []).map(p => ({
                x: (videoLeft + videoW * p.x) / w, // normalized to full container width
                y: (h * p.y) / h                   // = p.y, but keep for clarity; or just p.y
            }));

            return { item, buttonPos, pathPoints };
        });

        setItemLayouts(layouts);
    }, []);

    useEffect(() => {
        if (!container) return;

        const resizeObserver = new ResizeObserver(computeItemLayouts);
        resizeObserver.observe(container);

        return () => resizeObserver.disconnect();
    }, []); // Empty dependency array ensures this runs once on mount

    if (tab === TABS.SURROUNDINGS) {
        return (
            itemLayouts.map(({ item, buttonPos, pathPoints }) => (
                <AnimButton
                    key={item.id}
                    name={item.displayName}
                    icon={item.iconSrc}
                    style={{
                        left: `${buttonPos.left}px`,
                        top: `${buttonPos.top}px`,
                    }}
                    onSelect={() => {
                        onSelectItem(item, LAYERS.SURROUNDING_DETAIL);
                        onChangePoints(pathPoints);
                    }}
                />
            ))
        );
    }

    return (
        itemLayouts.map(({ item, buttonPos }) => (
            <FloatingButton
                key={item.id}
                name={item.displayName}
                tabType={tab}
                layerType={layer}
                style={{
                    left: `${buttonPos.left}px`,
                    top: `${buttonPos.top}px`,
                }}
                onSelect={() => onSelectItem(item, layer)}
            />
        ))
    );
}