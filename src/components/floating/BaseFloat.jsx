import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { SidebarContext } from "../../store/SidebarContextProvider";
import BaseFloatButton from "./BaseFloatButton";
import AnimFloatButton from "./AnimFloatButton";
import { TABS, LAYERS } from '../../data/layers';

export default function BaseFloating({ mediaRef }) {
    const container = mediaRef.current;

    const { activeTab, activeLayer, currentItem, currentItems, type, goToItem, highlightedButton, setHighlightedButton } = useContext(SidebarContext);
    const [buttonPositions, setButtonPositions] = useState([]);

    // console.log('=== BaseFloating Debug ===');
    // console.log('activeTab:', activeTab);
    // console.log('activeLayer:', activeLayer);
    // console.log('currentItems:', currentItems);
    // console.log('currentItems length:', currentItems?.length);
    // console.log('buttonPositions length:', buttonPositions.length);
    // console.log('container:', container);

    const triangleOffsetPx = -24; // Approximate triangle tip distance below button center

    const updatePositions = useCallback(() => {
        if (!currentItems || !container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        const videoW = h * (16 / 9);
        const videoLeft = (w - videoW) / 2;

        const newPositions = currentItems.map(item => ({
            left: videoLeft + videoW * item.x,
            top: h * item.y + triangleOffsetPx,
        }));

        setButtonPositions(newPositions);
    }, [currentItems, container]);

    // Create a map for O(1) lookup: id → position
    const itemIdToPosition = useMemo(() => {
        if (!currentItems) return new Map();
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

    useEffect(() => {
        if (activeLayer === LAYERS.UNIT) {
            setButtonPositions([]);
        }
    }, [activeLayer]);

    // console.log(buttonPositions.length);
    // console.log(currentItems.length);

    // Don't render until positions are ready
    if (!currentItems || buttonPositions.length !== currentItems.length) return null;
    if (activeLayer === LAYERS.UNIT) return;

    
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

    if (activeTab === TABS.SURROUNDINGS) {
        // console.log("🔍 SURROUNDINGS DEBUG");
        // console.log("Container dims:", { w: container.clientWidth, h: container.clientHeight });
        // console.log("Video calc:", {
        //     videoW: container.clientHeight * (16 / 9),
        //     videoLeft: (container.clientWidth - (container.clientHeight * 16 / 9)) / 2
        // });

        // currentItems.forEach((item, i) => {
        //     console.log(`Item ${item.id} | x:${item.x} y:${item.y} → POS:`, {
        //         left: (container.clientWidth - (container.clientHeight * 16 / 9)) / 2 + (container.clientHeight * 16 / 9) * (item.x || 0),
        //         top: container.clientHeight * (item.y || 0) + triangleOffsetPx
        //     });
        // });

        return (
            currentItems.map((item, i) => {
                const pos = itemIdToPosition.get(item.id);
                console.log(item.id, pos);

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
                    />
                );
            })
        );
    }


    return (
        currentItems.map((item, index) => {
            // console.log(itemIdToPosition);
            // console.log(item.id);
            const pos = itemIdToPosition.get(item.id);
            // console.log(pos);

            if (!pos) return null;

            const isOpaque = (highlightedButton === null || highlightedButton === item);
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
            }
            // if (index % 2 === 0)
            //     return (
            //         <BaseFloatButton
            //             key={item.id}
            //             name={item.displayName}
            //             tabType={activeTab}
            //             layerType={activeLayer}
            //             showName={false}
            //             triClass="triangle-small-up"
            //             style={{
            //                 left: `${pos.left}px`,
            //                 top: `${pos.top}px`,
            //             }}
            //             isOpaque={isOpaque}
            //             onSelect={() => {
            //                 if (isSelected) {
            //                     // console.log("Selected item:", item);

            //                     goToItem(item, layerKey);
            //                     setHighlightedButton(null);
            //                 }
            //                 else setHighlightedButton(item);
            //             }}
            //         />
            //     )

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