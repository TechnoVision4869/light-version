import { LAYERS } from "../data/layers";
import { SidebarContext } from "../store/SidebarContextProvider";
import CAR_ICON from "../assets/icons/car.svg"
import { useContext } from "react";

// components/InfoPopup.jsx
export default function InfoPopup({ showInfoPopup, onClose }) {
    const {currentItem, activeLayer} = useContext(SidebarContext);

    if (!currentItem || !showInfoPopup || !activeLayer) return null;

    if (!currentItem.description) return null;

    if (activeLayer === LAYERS.SURROUNDING_DETAIL) {
        return (
            <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-50px)] lg:max-w-[760px] px-3 lg:px-0 z-40 pointer-events-auto">
                <div className="bg-[#94846D] text-white rounded-2xl shadow-2xl p-3 md:p-4 relative overflow-hidden">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center z-10"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    {/* Horizontal layout */}
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <img
                            src={currentItem.thumbnail}
                            alt={currentItem.displayName}
                            className="h-20 w-28 sm:h-24 sm:w-36 object-cover rounded-lg flex-shrink-0" />

                        <div className="min-w-0">
                            <div className="flex flex-row space-x-2 items-center">
                                <h3 className="font-bold text-sm md:text-base">
                                    {currentItem.displayName}
                                </h3>

                                <div className="mt-1 inline-flex items-center space-x-1 bg-[#40321EBD] px-2 py-1 rounded-xl">
                                    <img src={CAR_ICON} className="w-6 h-4" />
                                    <span className=" text-sm md:text-base">
                                        {currentItem.distance}
                                    </span>
                                </div>
                            </div>


                            <p className="text-sm md:text-base text-white/80 mt-1">
                                {currentItem.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-50px)] lg:max-w-[760px] px-3 lg:px-0 z-40 pointer-events-auto">
            <div className="bg-black/70 backdrop-blur-sm text-white p-4 rounded-2xl shadow-2xl  p-3 md:p-4 relative overflow-hidden">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center z-10"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                <div>
                    <div>
                        <div className="font-bold text-sm md:text-base">{currentItem.displayName}</div>
                        <p className="text-sm md:text-base text-white/80 mt-1">{currentItem.description}</p>
                    </div>

                </div>
            </div>
        </div>
    );
}