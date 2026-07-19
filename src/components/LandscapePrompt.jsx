import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { APP_CONFIG } from "../config/appConfig";
import LandscapeAnim from "../assets/animation/Rotate Phone.gif";

export default function LandscapePrompt() {
    // state to show prompt for landscape orientation
    const [showLandscapePrompt, setShowLandscapePrompt] = useState(false);

    useEffect(() => {
        if (Capacitor.getPlatform() !== "web") return;

        const portraitMq = window.matchMedia("(orientation: portrait)");
        const tabletMq = window.matchMedia(`(max-width: ${APP_CONFIG.TABLET_MAX_WIDTH}px)`);

        const update = () => {
            setShowLandscapePrompt(tabletMq.matches && portraitMq.matches);
        };

        update();
        portraitMq.addEventListener("change", update);
        tabletMq.addEventListener("change", update);

        return () => {
            portraitMq.removeEventListener("change", update);
            tabletMq.removeEventListener("change", update);
        };
    }, []);

    return (
        <>
            {showLandscapePrompt && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                        <img
                            src={LandscapeAnim}
                            alt="Rotate your phone"
                            style={{ width: 165, height: 165 }}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
