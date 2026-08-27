import { findUnitsByType } from "../lib/findUnitById";

export default function SimilarUnits({ currentItem, unitType, currentProject, onSelect }) {
    const similarUnits = findUnitsByType(currentProject, currentItem?.unitTypeId, currentItem?.id);

    if (similarUnits.length === 0) return null;

    const thumbnail = unitType?.gallery?.[0]?.src || unitType?.floorPlans?.[0]?.src || null;

    return (
        <>
            <hr className="h-divider" />
            <div>
                <span className="font-semibold">Similar Units</span>
                <div className="flex gap-2 overflow-x-auto mt-2 pb-1 scrollbar-custom">
                    {similarUnits.map((similar) => (
                        <button
                            key={similar.id}
                            onClick={() => onSelect(similar)}
                            className="flex-shrink-0 w-30 bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden text-left transition"
                        >
                            {thumbnail && (
                                <img src={thumbnail} alt="" className="w-full h-16 object-cover" />
                            )}
                            <div className="p-2">
                                <div className="text-xs font-medium truncate">{similar.displayName || similar.name}</div>
                                {similar.price > 0 && (
                                    <div className="text-xs text-white/70">{Math.round(similar.price).toLocaleString()} SAR</div>
                                )}
                                <div className="text-[10px] text-white/50">
                                    {Math.round(unitType?.area)} m² · {similar.bedrooms} BR
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
