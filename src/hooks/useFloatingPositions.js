import { useState, useEffect, useMemo, useCallback } from "react";

const triangleOffsetPx = -24; // Approximate triangle tip distance below button center

/**
 * Custom hook to calculate floating button positions
 * @param {Array} items - Array of items with x, y coordinates
 * @param {React.RefObject} mediaRef - Reference to container element
 * @returns {Object} - { buttonPositions, itemIdToPosition }
 */
export function useFloatingPositions(items, mediaRef) {
    const container = mediaRef?.current;
    const [buttonPositions, setButtonPositions] = useState([]);

    const updatePositions = useCallback(() => {
        if (!items || !container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        const videoW = h * (16 / 9);
        const videoLeft = (w - videoW) / 2;

        const newPositions = items.map(item => ({
            left: videoLeft + videoW * item.x,
            top: h * item.y + triangleOffsetPx,
        }));

        setButtonPositions(newPositions);
    }, [items, container]);

    // Create a map for O(1) lookup: id → position
    const itemIdToPosition = useMemo(() => {
        if (!items) return new Map();
        const map = new Map();
        items.forEach((item, index) => {
            map.set(item.id, buttonPositions[index]);
        });
        return map;
    }, [items, buttonPositions]);

    // Observe resize and re-run when items or container changes
    useEffect(() => {
        if (!container) return;

        const resizeObserver = new ResizeObserver(updatePositions);
        resizeObserver.observe(container);

        updatePositions();

        return () => {
            resizeObserver.disconnect();
        }
    }, [container, updatePositions]);

    return {
        buttonPositions,
        itemIdToPosition,
    };
}
