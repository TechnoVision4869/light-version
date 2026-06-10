import { LAYERS } from "../data/layers";
import { SidebarContext } from "../store/SidebarContextProvider";
import CAR_ICON from "../assets/icons/car.svg"
import { useContext, useState, useEffect } from "react";

// components/InfoPopup.jsx
export default function InfoPopup({ showInfoPopup, onClose }) {
    const { currentItem, activeLayer } = useContext(SidebarContext);

    // Animate in on mount
    const [mounted, setMounted] = useState(false);
    // Animate out before unmounting
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Double RAF: ensures the browser has committed the initial scale-0 paint
        // before we flip to scale-100 so the CSS transition actually fires.
        let id1 = requestAnimationFrame(() => {
            let id2 = requestAnimationFrame(() => setMounted(true));
            return () => cancelAnimationFrame(id2);
        });
        return () => cancelAnimationFrame(id1);
    }, []);

    // Guards — after all hooks
    if (!currentItem || !showInfoPopup || !activeLayer) return null;
    if (!currentItem.description) return null;

    const isActive = mounted && !isExiting;

    // Start exit animation; actual unmount happens after transition ends
    const handleClose = () => setIsExiting(true);

    // Called when the CSS transition finishes — only act on opacity to fire once
    const handleTransitionEnd = (e) => {
        if (isExiting && e.propertyName === 'opacity') {
            onClose();
        }
    };

    // Shared wrapper: positions the popup, owns the expand/collapse animation.
    // origin-bottom-right makes it scale toward/from the info button corner.
    // `transition` (built-in utility) includes transform + opacity; duration-300 overrides timing.
    const wrapperClass = `absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 w-[70%] z-40 pointer-events-auto
        transition duration-300 origin-bottom-right
        ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`;

    const closeBtn = (
        <button
            onClick={handleClose}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center z-10"
        >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </button>
    );

    if (activeLayer === LAYERS.SURROUNDING_DETAIL) {
        return (
            <div className={wrapperClass} onTransitionEnd={handleTransitionEnd}>
                <div className="info-bg-main text-white rounded-2xl shadow-2xl p-3 md:p-4 relative overflow-hidden">
                    {closeBtn}

                    {/* Horizontal layout */}
                    <div className="flex items-center space-x-3 md:space-x-4">
                        {currentItem.thumbnail && (
                            <img
                                src={currentItem.thumbnail}
                                alt={currentItem.displayName}
                                className="h-20 w-28 sm:h-24 sm:w-36 object-cover rounded-lg flex-shrink-0"
                            />
                        )}

                        <div className="min-w-0">
                            <div className="flex flex-row space-x-2 items-center">
                                <h3 className="font-bold text-sm md:text-base">
                                    {currentItem.displayName}
                                </h3>
                                <div className="info-bg-sub mt-1 inline-flex items-center space-x-1 px-2 py-1 rounded-xl">
                                    <img src={CAR_ICON} className="w-6 h-4" />
                                    <span className="text-sm md:text-base">
                                        {currentItem.distance}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm md:text-md lg:text-base text-white/90 mt-1">
                                {currentItem.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={wrapperClass} onTransitionEnd={handleTransitionEnd}>
            <div className="bg-black/70 backdrop-blur-sm text-white rounded-2xl shadow-2xl p-3 md:p-4 relative overflow-hidden">
                {closeBtn}
                <div className="font-bold text-sm md:text-md lg:text-base">{currentItem.displayName}</div>
                <p className="text-sm md:text-md lg:text-base text-white/90 mt-1">{currentItem.description}</p>
            </div>
        </div>
    );
}