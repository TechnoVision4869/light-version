import { useState } from "react";

const UNIT_TYPES = {
    RESIDENTIAL: "residential",
    COMMERCIAL: "commercial"
}

// Surface area range (in square meters)
export const AREA_RANGE = {
    MIN: 65,
    MAX: 400,
    UNIT: "m²",
};

// Budget range (in local currency)
export const BUDGET_RANGE = {
    MIN: 100_000,
    MAX: 20_000_000,
    CURRENCY: "L.E",
};

// Bedroom/Bathroom options
export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6];
export const BATHROOM_OPTIONS = [1, 2, 3, 4, 5, 6];

export default function FilterPanel() {
    const [unitType, setUnitType] = useState(null);
    const [area, setArea] = useState(100);
    const [budget, setBudget] = useState(5_000_000);
    const [bedrooms, setBedrooms] = useState(null);

    const fillColor = 'white';
    const trackColor = '#7f7f7f';
    const areaPercent =
        ((area - AREA_RANGE.MIN) / (AREA_RANGE.MAX - AREA_RANGE.MIN)) * 100;
    const budgetPercent =
        ((budget - BUDGET_RANGE.MIN) / (BUDGET_RANGE.MAX - BUDGET_RANGE.MIN)) * 100;

    return (
        <div className="text-white font-light text-sm">
            <div>
                <div className="flex justify-between">
                    <span>Surface Area</span>
                    <span>{area} {AREA_RANGE.UNIT}</span>
                </div>
                <div className="px-1 py-2 rounded-lg bg-[#2e2e2e]">
                    <input
                        type="range"
                        min={AREA_RANGE.MIN}
                        max={AREA_RANGE.MAX}
                        value={area}
                        onChange={(e) => setArea(Number(e.target.value))}
                        className="w-full h-1 cursor-pointer slider"
                        style={{
                            background: `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${areaPercent}%, ${trackColor} ${areaPercent}%, ${trackColor} 100%)`
                        }}
                    />
                </div>

            </div>

            <div className="h-[1px] bg-white/50 mb-4"></div>

            <div>
                <div className="flex justify-between">
                    <span>Budget</span>
                    <span>{budget} {BUDGET_RANGE.CURRENCY}</span>
                </div>
                <div className="px-1 py-2 rounded-lg bg-[#2e2e2e]">

                    <input
                        type="range"
                        min={BUDGET_RANGE.MIN}
                        max={BUDGET_RANGE.MAX}
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full h-1  cursor-pointer slider"
                        style={{
                            background: `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${budgetPercent}%, ${trackColor} ${areaPercent}%, ${trackColor} 100%)`
                        }}
                    />
                </div>
            </div>

            <div className="h-[1px] bg-white/50 mb-4"></div>

            <div>
                <span>Bed Rooms</span>
                <div className="flex gap-2">
                    {BEDROOM_OPTIONS.map((num) => (
                        <button
                            key={num}
                            onClick={() => setBedrooms(num)}
                            className={`p-2 rounded-lg
                                ${bedrooms === num ?
                                    "bg-white/10" : "bg-[#2e2e2e] hover:bg-white/7"}`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}