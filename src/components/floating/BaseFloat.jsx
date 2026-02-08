import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { SidebarContext } from "../../store/SidebarContextProvider";
import BaseFloatButton from "./BaseFloatButton";
import AnimFloatButton from "./AnimFloatButton";
import { TABS, LAYERS } from '../../data/layers';

export default function BaseFloating({ mediaRef }) {
    const container = mediaRef.current;

    const { activeTab, activeLayer, currentItem, currentItems, type, goToItem, highlightedButton, setHighlightedButton } = useContext(SidebarContext);
    // console.log(currentItems);

    const [buttonPositions, setButtonPositions] = useState([]);
    const triangleOffsetPx = -24; // Approximate triangle tip distance below button center

    const updatePositions = useCallback(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const videoW = h * (16 / 9);
        const videoLeft = (w - videoW) / 2;

        const newPositions = currentItems.map(item => ({
            left: videoLeft + videoW * item.x,
            top: h * item.y + triangleOffsetPx,
        }));

        setButtonPositions(newPositions);
    }, [currentItems]);

    // Create a map for O(1) lookup: id → position
    const itemIdToPosition = useMemo(() => {
        const map = new Map();
        currentItems.forEach((item, index) => {
            map.set(item.id, buttonPositions[index]);
        });
        return map;
    }, [currentItems, buttonPositions]);

    // Observe resize
    useEffect(() => {
        // console.log("mount");
        if (!container) return;

        const resizeObserver = new ResizeObserver(updatePositions);
        resizeObserver.observe(container);

        updatePositions();

        return () => {
            // console.log("un mount");
            resizeObserver.disconnect();
        }
    }, []); // Empty dependency array ensures this runs once on mount

    // console.log(buttonPositions.length);
    // console.log(currentItems.length);

    // Don't render until positions are ready
    if (buttonPositions.length !== currentItems.length) return null;
    if (activeLayer === LAYERS.UNIT) return;

    if (activeTab === TABS.SURROUNDINGS) {
        return (
            currentItems.map((item, i) => {
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

    let layerKey = null;
    if (activeLayer !== null) {
        switch (activeLayer) {
            case LAYERS.ZONE_DETAIL:
                layerKey = LAYERS.BUILDING;
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

    return (
        currentItems.map((item) => {
            // console.log(itemIdToPosition);
            // console.log(item.id);

            const pos = itemIdToPosition.get(item.id);
            // console.log(pos);

            if (!pos) return null;

            const isOpaque = (highlightedButton === null || highlightedButton === item);
            const isSelected = highlightedButton === item;

            return (
                <BaseFloatButton
                    key={item.id}
                    name={item.displayName}
                    tabType={activeTab}
                    layerType={activeLayer}
                    showName={type !== "villa"}
                    style={{
                        left: `${pos.left}px`,
                        top: `${pos.top}px`,
                    }}
                    isOpaque={isOpaque}
                    onSelect={() => {
                        if (isSelected) {
                            // console.log("Selected item:", item);

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