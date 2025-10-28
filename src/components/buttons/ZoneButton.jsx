import { LAYERS } from "../../data/layers";
export default function ZoneButton({ zone, isDisabled, isSelected, goToZone }) {
    return (
        <button
            onClick={() => { goToZone(zone, LAYERS.BUILDING); }}
            disabled={isDisabled}
            className={`w-64 max-w-full mx-auto p-4 rounded-2xl transition
                        ${isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected ? "bg-white/10" : "bg-black/10 hover:bg-white/7"
                }`}
        >
            <div className="text-left">
                <div className="text-md font-bold text-white leading-tight">
                    {zone.name}
                </div>
                <div className="text-xs text-white/60 leading-tight py-1">
                    {zone.subtitle}
                </div>
            </div>
            <div className="w-full rounded-lg overflow-hidden bg-black/10">
                <img
                    src={zone.thumbnail}
                    alt={zone.name}
                    className="w-full h-full object-cover"
                />
            </div>
        </button>
    )
}