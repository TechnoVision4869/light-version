import { LAYERS } from "../../data/layers";
export default function SurroundingButton({ surrounding, isDisabled = true, isSelected, goToSurrounding }) {
    return (
        <button
            key={surrounding.id}
            onClick={() => {
                goToSurrounding(surrounding, LAYERS.SURROUNDING_DETAIL);
            }}
            disabled={isDisabled}
            className={`w-full max-w-full mx-auto p-4 rounded-2xl transition
            ${isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected ? "bg-white/10" : "bg-black/10 hover:bg-white/7"
                }`}
        >
            <div className="text-left">
                <div className="text-md font-bold text-white leading-tight whitespace-nowrap">
                    {surrounding.displayName}
                </div>
                <div className="text-xs text-white/60 leading-tight py-1 whitespace-nowrap">
                    {surrounding.distance}
                </div>
            </div>
        </button>
    )
}