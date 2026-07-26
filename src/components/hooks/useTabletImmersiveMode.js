import { useCallback, useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { APP_CONFIG } from "../../config/appConfig";

export function useTabletImmersiveMode() {
    const [eligible, setEligible] = useState(false);
    const [isPortrait, setIsPortrait] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

    useEffect(() => {
        if (Capacitor.getPlatform() !== "web") return;

        const tabletMq = window.matchMedia(`(max-width: ${APP_CONFIG.TABLET_MAX_WIDTH}px)`);
        const update = () => setEligible(tabletMq.matches);

        update();
        tabletMq.addEventListener("change", update);
        return () => tabletMq.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (Capacitor.getPlatform() !== "web") return;

        const portraitMq = window.matchMedia("(orientation: portrait)");
        const update = () => setIsPortrait(portraitMq.matches);

        update();
        portraitMq.addEventListener("change", update);
        return () => portraitMq.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
    }, []);

    const requestImmersive = useCallback(() => {
        if (!document.documentElement.requestFullscreen) return;

        document.documentElement
            .requestFullscreen()
            .then(() => {
                try {
                    screen.orientation?.lock?.("landscape")?.catch(() => {});
                } catch {
                    // Screen Orientation Lock unsupported in this browser — ignore.
                }
            })
            .catch((error) => {
                console.warn("Failed to enter fullscreen", error);
            });
    }, []);

    return { eligible, isPortrait, isFullscreen, requestImmersive };
}
