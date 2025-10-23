// components/InfoPopup.jsx
import { LAYER_CONFIG } from "../data/layers";

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