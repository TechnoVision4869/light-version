import { useState, useEffect } from "react";
import { DATA } from "../data/layers";
import FloatingButton from "./buttons/FloatingButton"

export default function Flaoting({ buttons, mediaRef, tab }) {
    const [buttonPositions, setButtonPositions] = useState(
        buttons.map(() => ({ left: 0, top: 0 }))
    );

    useEffect(() => {
        const container = mediaRef.current;
        if (!container) return;

        const updatePositions = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            const videoW = h * (16 / 9);
            const videoLeft = (w - videoW) / 2;

            const newPositions = buttons.map(surr => ({
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
    }, [mediaRef, DATA]);

    return (
        buttons.map((btn, i) => (
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
    )

}