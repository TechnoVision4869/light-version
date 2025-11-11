import { useEffect, useState } from "react";

// import { LAYER_CONFIG, LAYERS } from "../data/layers"
// import { useNavigation } from "./hooks/useNavigation";

// const { currentItem } = useNavigation;

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
    UNIT: "L.E",
};

// Bedroom/Bathroom options
export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6];
export const BATHROOM_OPTIONS = [1, 2, 3, 4, 5, 6];

// const updateFilter = () => {
//     console.log("Filterred apartments: ");
//     const filtered = LAYER_CONFIG[LAYERS.FLOOR].getItems(currentItem.id);
//     console.log(filtered);
// }

function Slider({ name, unit, min, max }) {
    const [value, setVlue] = useState((min + max) / 2);

    const fillColor = 'white';
    const trackColor = '#7f7f7f';
    const sliderPercent = ((value - min) / (max - min)) * 100;

    return (
        <div className="flex flex-col gap-2 pb-2">
            <div className="flex justify-between">
                <span>{name}</span>
                <span>{Math.round(value).toLocaleString()} {unit}</span>
            </div>
            <div className="px-1 py-2 rounded-lg bg-[#2e2e2e]">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => setVlue(Number(e.target.value))}
                    className="w-full h-1 cursor-pointer slider"
                    style={{
                        background:
                            `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${sliderPercent}%, ${trackColor} ${sliderPercent}%, ${trackColor} 100%)`
                    }}
                />
            </div>
        </div>
    )
}

export default function FilterPanel() {
    const [unitType, setUnitType] = useState(null);
    const [bedrooms, setBedrooms] = useState(null);

    // useEffect(() => {
    //     updateFilter();
    // }, [unitType, bedrooms])

    return (
        <div className="flex flex-col gap-2 text-white font-light text-sm">
            <div className="flex flex-col gap-2">
                <span>Type</span>
                <div className="flex flex-row gap-2">
                    {Object.values(UNIT_TYPES).map((type) => (
                        <button
                            key={type}
                            onClick={() => setUnitType(type)}
                            className={`py-2 px-3 rounded-lg
                                ${unitType === type ?
                                    "bg-white/10" : "bg-[#2e2e2e] hover:bg-white/7"}`}
                        >
                            {String(type).charAt(0).toUpperCase() + String(type).slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            <Slider name="Surface Area" unit={AREA_RANGE.UNIT} min={AREA_RANGE.MIN} max={AREA_RANGE.MAX} />

            <div className="h-0.5 bg-white/50"></div>

            <Slider name="Budget" unit={BUDGET_RANGE.UNIT} min={BUDGET_RANGE.MIN} max={BUDGET_RANGE.MAX} />

            <div className="h-0.5 bg-white/50"></div>

            <div>
                <span>Bed Rooms</span>
                <div className="pt-2 flex gap-2">
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