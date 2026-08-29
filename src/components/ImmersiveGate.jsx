import { useLocation } from "react-router-dom";
import { useTabletImmersiveMode } from "./hooks/useTabletImmersiveMode";
import LandscapeAnim from "../assets/animation/Rotate Phone.gif";
import FullscreenAnim from "../assets/animation/Full screen mode.svg";

// Routes that stay usable without fullscreen/landscape — the admin dashboard is a
// data-entry screen, not part of the cinematic tour, so it shouldn't be gated.
const EXEMPT_PATHS = ["/dashboard"];

export default function ImmersiveGate() {
    const { eligible, isPortrait, isFullscreen, requestImmersive } = useTabletImmersiveMode();
    const { pathname } = useLocation();

    const exempt = EXEMPT_PATHS.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`)
    );
    const needsGate = !exempt && eligible && (isPortrait || !isFullscreen);
    if (!needsGate) return null;

    const content = isPortrait ? (
        <>
            <img
                src={LandscapeAnim}
                alt="Rotate your phone"
                style={{ width: 120, height: 120 }}
                className="mx-auto"
            />
            <p className="text-white mt-2">Rotate to landscape</p>
        </>
    ) : (
        <button
            onClick={requestImmersive}
            className="flex flex-col items-center gap-2"
        >
            <img src={FullscreenAnim} alt="" style={{ width: 110, height: 110 }} />
            <span className="text-white font-medium">Continue in fullscreen</span>
        </button>
    );

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <div className="text-center p-6">{content}</div>
        </div>
    );
}
