// components/PanoViewer.jsx
import { useEffect, useRef } from 'react';
import { PanoViewer } from '@egjs/view360';

import BEDROOM from "../assets/panorama/bedroom.png"

export default function Panorama({ options = {} }) {
    const containerRef = useRef(null);
    const viewerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clean up previous instance if exists
        if (viewerRef.current) {
            viewerRef.current.destroy();
        }

        const defaultOptions = {
            image: BEDROOM,
            ...options,
        };

        viewerRef.current = new PanoViewer(containerRef.current, defaultOptions);

        // Optional: expose viewer instance via ref if needed externally
        // e.g., for hotspots or programmatic control

        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
            }
        };
    }, [JSON.stringify(options)]);

    return (
        <div
            ref={containerRef}
            className="w-screen h-screen bg-[#2f2f2f]"
            style={{ minHeight: '400px' }} // Tailwind doesn't support arbitrary h% without parent context
        />
    );
};