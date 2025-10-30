import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import LandscapeAnim from "../assets/animation/Rotate Phone.json";

export default function LandscapePrompt() {
    // state to show prompt for landscape orientation
    const [showLandscapePrompt, setShowLandscapePrompt] = useState(false);
    useEffect(() => {
        const checkOrientation = () => {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isPortrait = window.innerHeight > window.innerWidth;
            setShowLandscapePrompt(isMobile && isPortrait);
        };

        // Check on load and resize
        checkOrientation();
        window.addEventListener("resize", checkOrientation);
        return () => window.removeEventListener("resize", checkOrientation);
    }, []);

    return (
        <>
            {showLandscapePrompt && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                        <Lottie
                            animationData={LandscapeAnim}
                            loop={true}
                            style={{ width: 250, height: 250 }}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
