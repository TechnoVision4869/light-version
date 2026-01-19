import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { SidebarContext } from "../store/SidebarContextProvider";
import FloatingButton from "./buttons/FloatingButton";
import AnimButton from "./buttons/AnimButton";
import { TABS, LAYERS } from '../data/layers';

export default function Pins({ items, mediaRef }) {
    const container = mediaRef.current;

    const { activeTab, activeLayer, goToItem } = useContext(SidebarContext);

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
                        goToItem(item, LAYERS.SURROUNDING_DETAIL);
                        // onChangeItem(item.id);
                    }}
                />
            ))
        );
    }

    return (
        items.map((item) => {
            const pos = itemIdToPosition.get(item.id);
            if (!pos) return null;
            return (
                <FloatingButton
                    key={item.id}
                    name={item.displayName}
                    tabType={activeTab}
                    layerType={activeLayer}
                    style={{
                        left: `${pos.left}px`,
                        top: `${pos.top}px`,
                    }}
                    onSelect={() => goToItem(item, activeLayer)}
                />
            )
        })
    );
}