import { useState, useEffect, useContext } from "react";
import { FilterContext } from "../store/FilterContextProvider";
import { SidebarContext } from "../store/SidebarContextProvider";
// import helper functions
import { FILTER_ENUM, getMinMaxRange, getDiscreteValues } from "./helpers/filterHelper";

const AREA_STEP = 5;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getStepAlignedMax(min, actualMax, step) {
  if (step <= 0) return actualMax;
  const stepsNeeded = Math.ceil((actualMax - min) / step);
  return min + stepsNeeded * step;
}

function Slider({ name, unit, min, max, step = 1, value, onValueChange }) {
  const fillColor = "white";
  const trackColor = "#7f7f7f";
  const safeValue = clamp(value, min, max);
  const sliderPercent = max === min ? 100 : ((safeValue - min) / (max - min)) * 100;

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
          value={safeValue}
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
  // console.log(options);

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

export default function FilterPanel() {
  const { onFilterChange } = useContext(FilterContext);
  const { currentItem } = useContext(SidebarContext);
  // console.log(currentItem);

  const currentApartments = currentItem?.units || [];
  // console.log(currentApartments);

  const UNIT_TYPES = getDiscreteValues(currentApartments, FILTER_ENUM.TYPE);

  const areaMinMax = getMinMaxRange(currentApartments, FILTER_ENUM.AREA);
  const priceMinMax = getMinMaxRange(currentApartments, FILTER_ENUM.PRICE);
  const areaMin = Math.floor(areaMinMax.min);
  const areaActualMax = Math.ceil(areaMinMax.max);
  const areaSliderMax = getStepAlignedMax(areaMin, areaActualMax, AREA_STEP);

  // Surface area range (in square meters)
  const AREA_RANGE = {
    MIN: areaMin,
    MAX: areaSliderMax,
    ACTUAL_MAX: areaActualMax,
    UNIT: "m²",
  };

  // Budget range (in local currency)
  const BUDGET_RANGE = {
    MIN: priceMinMax.min,
    MAX: priceMinMax.max,
    UNIT: "SAR",
  };

  // Bedroom/Bathroom options
  const BEDROOM_OPTIONS = getDiscreteValues(currentApartments, FILTER_ENUM.BEDROOMS);
  const BATHROOM_OPTIONS = getDiscreteValues(currentApartments, FILTER_ENUM.BATHROOMS);

  const [unitType, setUnitType] = useState([]);
  const [bedrooms, setBedrooms] = useState([]);
  const [bathrooms, setBathrooms] = useState([]);
  const [area, setArea] = useState(AREA_RANGE.MAX);
  const [price, setPrice] = useState(BUDGET_RANGE.MAX);

  useEffect(() => {
    setArea(AREA_RANGE.MAX);
    setPrice(BUDGET_RANGE.MAX);
    setUnitType([]);
    setBedrooms([]);
    setBathrooms([]);
  }, [AREA_RANGE.MAX, BUDGET_RANGE.MAX, currentItem?.id]);

  useEffect(() => {
    onFilterChange({
      unitType,
      bedrooms,
      bathrooms,
      area,
      price,
    });
  }, [unitType, bedrooms, bathrooms, area, price]);

  // Log the available filter ranges once, when the Filter tab is opened (Sidebar.jsx mounts this
  // component on that click) — not on every slider drag, which would spam the console.
  useEffect(() => {
    console.log("Filter ranges:", {
      area: AREA_RANGE,
      budget: BUDGET_RANGE,
      bedroomOptions: BEDROOM_OPTIONS,
      bathroomOptions: BATHROOM_OPTIONS,
      unitTypes: UNIT_TYPES,
    });
    // Deliberately mount-only — see comment above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentItem) return null;

  return (
    <div className="flex flex-col gap-2 max-h-[calc(100vh-205px)] scrollbar-custom overflow-auto pe-2 text-white font-light text-sm">
      {/* <Discrete
        name="Type"
        options={UNIT_TYPES}
        array={unitType}
        onValueChange={setUnitType}
      /> */}

      <div className="h-divider"></div>

      <Slider
        name="Surface Area"
        unit={AREA_RANGE.UNIT}
        min={AREA_RANGE.MIN}
        max={AREA_RANGE.MAX}
        step={AREA_STEP}
        value={area}
        onValueChange={setArea}
      />

      <div className="h-divider"></div>

      <Slider
        name="Budget"
        unit={BUDGET_RANGE.UNIT}
        min={BUDGET_RANGE.MIN}
        max={BUDGET_RANGE.MAX}
        step={Math.max(1, Math.round((BUDGET_RANGE.MAX - BUDGET_RANGE.MIN) / 100))}
        value={price}
        onValueChange={setPrice}
      />

      <div className="h-divider"></div>

      {BEDROOM_OPTIONS.some((option) => option != null) && (
        <Discrete
          name="Bedrooms"
          options={BEDROOM_OPTIONS}
          array={bedrooms}
          onValueChange={setBedrooms}
        />
      )}

      {BATHROOM_OPTIONS.some((option) => option != null) && (
        <Discrete
          name="Bathrooms"
          options={BATHROOM_OPTIONS}
          array={bathrooms}
          onValueChange={setBathrooms}
        />
      )}

    </div>
  );
}
