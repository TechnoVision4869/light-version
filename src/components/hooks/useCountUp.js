import { useState, useEffect, useRef } from "react";

export function useCountUp(target, stepMs = 100) {
    const [display, setDisplay] = useState(target);
    const displayRef = useRef(target);

    useEffect(() => {
        if (displayRef.current === target) return;

        const id = setInterval(() => {
            const step = displayRef.current < target ? 1 : -1;
            const next = displayRef.current + step;
            displayRef.current = next;
            setDisplay(next);
            if (next === target) clearInterval(id);
        }, stepMs);

        return () => clearInterval(id);
    }, [target, stepMs]);

    return display;
}
