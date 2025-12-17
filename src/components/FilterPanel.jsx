import { useState, useEffect } from "react";

import { LAYER_CONFIG, LAYERS, FILTER_ENUM } from "../data/layers";

const UNIT_TYPES = LAYER_CONFIG[LAYERS.APARTMENT].getDiscreteValues(FILTER_ENUM.TYPE);

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

function Slider({ name, unit, min, max, step = 1, value, onValueChange }) {
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
          onChange={(e) => onValueChange(Number(e.target.value))}
          className="w-full h-1 cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${sliderPercent}%, ${trackColor} ${sliderPercent}%, ${trackColor} 100%)`,
          }}
        />
      </div>
    </div>
  );
}

function Discrete({ name, options, array, onValueChange }) {
  const toggleOption = (option) => {
    if (array.includes(option)) {
      // Remove if already selected
      onValueChange(array.filter(item => item !== option));
    } else {
      // Add if not selected
      onValueChange([...array, option]);
    }
  };

  const isSelected = (option) => {
    return array.includes(option);
  };

  return (
    <div>
      <span>{name}</span>
      <div className="pt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`py-2 px-3 rounded-lg
                                ${isSelected(option)
                ? "bg-white/10 border border-white/90 hover:bg-[#2e2e2e]"
                : "bg-[#2e2e2e] border border-[#2e2e2e] hover:bg-white/7 hover:border-white/7"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function FilterPanel({ onFilterChange }) {
  const [unitType, setUnitType] = useState([]);
  const [bedrooms, setBedrooms] = useState([]);
  const [bathrooms, setBathrooms] = useState([]);
  const [area, setArea] = useState(AREA_RANGE.MAX);
  const [price, setPrice] = useState(BUDGET_RANGE.MAX);

  useEffect(() => {
    onFilterChange({
      unitType,
      bedrooms,
      bathrooms,
      area,
      price,
    });
  }, [unitType, bedrooms, bathrooms, area, price, onFilterChange]);

  return (
    <div className="flex flex-col gap-2 max-h-[calc(100vh-235px)] scrollbar-custom overflow-auto pe-2 text-white font-light text-sm">
      <Discrete
        name="Type"
        options={UNIT_TYPES}
        array={unitType}
        onValueChange={setUnitType}
      />

      <div className="h-divider"></div>

      <Slider
        name="Surface Area"
        unit={AREA_RANGE.UNIT}
        min={AREA_RANGE.MIN}
        max={AREA_RANGE.MAX}
        step={5}
        value={area}
        onValueChange={setArea}
      />

      <div className="h-divider"></div>

      <Slider
        name="Budget"
        unit={BUDGET_RANGE.UNIT}
        min={BUDGET_RANGE.MIN}
        max={BUDGET_RANGE.MAX}
        step={1000}
        value={price}
        onValueChange={setPrice}
      />

      <div className="h-divider"></div>

      <Discrete
        name="Bedrooms"
        options={BEDROOM_OPTIONS}
        array={bedrooms}
        onValueChange={setBedrooms}
      />

      <Discrete
        name="Bathrooms"
        options={BATHROOM_OPTIONS}
        array={bathrooms}
        onValueChange={setBathrooms}
      />

    </div>
  );
}
