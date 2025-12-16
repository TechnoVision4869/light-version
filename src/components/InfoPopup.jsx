// components/InfoPopup.jsx
import { LAYER_CONFIG, LAYERS } from "../data/layers";

import CAR_ICON from "../assets/icons/car.svg"

// components/InfoPopup.jsx
export default function InfoPopup({
    showInfoPopup,
    layer,
    itemId,
    onClose
}) {
    if (!showInfoPopup || !itemId || !layer) {
        return null;
    }

    const itemData = LAYER_CONFIG[layer]?.getData(itemId);
    if (!itemData?.description) {
        return null;
    }

    if (layer === LAYERS.SURROUNDING_DETAIL) {
        return (
            <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[85%] max-w-[760px]">
                <div className="bg-[#94846D] backdrop-blur-sm text-white p-4 rounded-2xl shadow-2xl">
                    <div className="flex items-center gap-4">
                        <img src={itemData.thumbnail} alt={itemData.displayName} className="h-29 w-auto rounded-lg flex-shrink-0" />
                        <div>
                            <div className="font-bold text pb-1">{itemData.displayName}</div>
                            <div className="bg-[#40321EBD] text-white p-2 rounded-2xl shadow-2xl inline-flex items-center gap-1 pe-3">
                                <img src={CAR_ICON} className="w-8 h-6 p-[1px]" />
                                <p>{itemData.distance}</p>
                            </div>
                            <p className="text-xs text-white/80 mt-2">{itemData.description}</p>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={onClose}
                            className="absolute top-1/12 right-1/50 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[85%] max-w-[760px]">
            <div className="bg-black/70 backdrop-blur-sm text-white p-4 rounded-2xl shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="font-bold text-sm">{itemData.name}</div>
                        <p className="text-xs text-white/80 mt-2">{itemData.description}</p>
                    </div>
                    <div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}