import { useState } from "react";

import { LAYER_CONFIG, LAYERS, FILTER_ENUM } from "../data/layers";

const UNIT_TYPES = {
  RESIDENTIAL: "residential",
  COMMERCIAL: "commercial",
};

// Surface area range (in square meters)
const AREA_RANGE = {
  MIN: LAYER_CONFIG[LAYERS.APARTMENT].getMinMaxRange(FILTER_ENUM.AREA).min,
  MAX: LAYER_CONFIG[LAYERS.APARTMENT].getMinMaxRange(FILTER_ENUM.AREA).max,
  UNIT: "m²",
};

// Budget range (in local currency)
const BUDGET_RANGE = {
  MIN: LAYER_CONFIG[LAYERS.APARTMENT].getMinMaxRange(FILTER_ENUM.PRICE).min,
  MAX: LAYER_CONFIG[LAYERS.APARTMENT].getMinMaxRange(FILTER_ENUM.PRICE).max,
  UNIT: "L.E",
};

// Bedroom/Bathroom options
const BEDROOM_OPTIONS = LAYER_CONFIG[LAYERS.APARTMENT].getDiscreteValues(
  FILTER_ENUM.BEDROOMS
);
const BATHROOM_OPTIONS = LAYER_CONFIG[LAYERS.APARTMENT].getDiscreteValues(
  FILTER_ENUM.BATHROOMS
);

function Slider({ name, unit, min, max, step = 1 }) {
  const [value, setValue] = useState(max);

  const fillColor = "white";
  const trackColor = "#7f7f7f";
  const sliderPercent = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2 pb-2">
      <div className="flex flex-col md:flex-row justify-between">
        <span>{name}</span>
        <span>
          {Math.round(value).toLocaleString()} {unit}
        </span>
      </div>
      <div className="px-1 py-2 rounded-lg bg-[#2e2e2e]">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-1 cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${sliderPercent}%, ${trackColor} ${sliderPercent}%, ${trackColor} 100%)`,
          }}
        />
      </div>
    </div>
  );
}

export default function FilterPanel() {
  const [unitType, setUnitType] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);

  return (
    <div className="flex flex-col gap-2 max-h-[calc(100vh-200px)] scrollbar-custom overflow-auto pe-2 text-white font-light text-sm">
      <div className="flex flex-col gap-2">
        <span>Type</span>
        <div className="flex flex-col md:flex-row gap-2">
          {Object.values(UNIT_TYPES).map((type) => (
            <button
              key={type}
              onClick={() => setUnitType(type)}
              className={`py-2 px-3 rounded-lg
                                ${
                                  unitType === type
                                    ? "bg-white/10"
                                    : "bg-[#2e2e2e] hover:bg-white/7"
                                }`}
            >
              {String(type).charAt(0).toUpperCase() + String(type).slice(1)}
            </button>
          ))}
        </div>
      </div>
      <Slider
        name="Surface Area"
        unit={AREA_RANGE.UNIT}
        min={AREA_RANGE.MIN}
        max={AREA_RANGE.MAX}
        step={5}
      />

      <div className="h-0.5 bg-white/50"></div>

      <Slider
        name="Budget"
        unit={BUDGET_RANGE.UNIT}
        min={BUDGET_RANGE.MIN}
        max={BUDGET_RANGE.MAX}
        step={1000}
      />

      <div className="h-0.5 bg-white/50"></div>

      <div>
        <span>Bedrooms</span>
        <div className="pt-2 flex flex-wrap gap-2">
          {BEDROOM_OPTIONS.map((num) => (
            <button
              key={num}
              onClick={() => setBedrooms(num)}
              className={`p-2 rounded-lg
                                ${
                                  bedrooms === num
                                    ? "bg-white/10"
                                    : "bg-[#2e2e2e] hover:bg-white/7"
                                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div>
        <span>Bathrooms</span>
        <div className="pt-2 flex flex-wrap gap-2">
          {BATHROOM_OPTIONS.map((num) => (
            <button
              key={num}
              onClick={() => setBathrooms(num)}
              className={`p-2 rounded-lg
                                ${
                                  bathrooms === num
                                    ? "bg-white/10"
                                    : "bg-[#2e2e2e] hover:bg-white/7"
                                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
