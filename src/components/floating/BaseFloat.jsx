import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { SidebarContext } from "../../store/SidebarContextProvider";
import BaseFloatButton from "./BaseFloatButton";
import AnimFloatButton from "./AnimFloatButton";
import { TABS, LAYERS } from '../../data/layers';

export default function BaseFloating({ items, mediaRef }) {
    const container = mediaRef.current;

    const { activeTab, activeLayer, currentItem, goToItem } = useContext(SidebarContext);


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

    if (activeTab === TABS.SURROUNDINGS) {
        return (
            items.map((item, i) => {
                const isSelected = currentItem?.id === item.id;
                return (
                <AnimFloatButton
                    key={item.id}
                    name={item.displayName}
                    icon={item.iconSrc}
                    style={{
                        left: `${buttonPositions[i].left}px`,
                        top: `${buttonPositions[i].top}px`,
                    }}
                    onSelect={() => {
                        goToItem(item, LAYERS.SURROUNDING_DETAIL);
                    }}
                    isSelected={isSelected}
                />
            );
        })
        );
    }

    return (
        items.map((item) => {
            const pos = itemIdToPosition.get(item.id);
            if (!pos) return null;
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
                    onSelect={() => {
                        switch (activeLayer) {
                            case null:
                                if(activeTab === TABS.ZONES) goToItem(item, LAYERS.ZONE_DETAIL);
                                else if(activeTab === TABS.AMENITIES) goToItem(item, LAYERS.AMENITY_DETAIL);
                                break;
                            case LAYERS.ZONE_DETAIL:
                                goToItem(item, LAYERS.BUILDING);
                                break;

                            case LAYERS.BUILDING:
                                goToItem(item, LAYERS.FLOOR);
                                break;

                            case LAYERS.FLOOR:
                                goToItem(item, LAYERS.APARTMENT);
                                break;
                        
                            default:
                                break;
                        }
                    }}
                />
            )
        })
    );
}