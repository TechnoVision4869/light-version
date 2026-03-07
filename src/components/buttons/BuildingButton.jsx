import { useContext } from "react";
import { SidebarContext } from "../../store/SidebarContextProvider";
// Icons
import AREA_ICON from "../../assets/icons/area.svg"
import BED_ICON from "../../assets/icons/bed.png"

// import helper functions
import { FILTER_ENUM, getMinMaxRange } from "../helpers/filterHelper";

export default function BuildingButton({ building, isDisabled, goToItem }) {    
    const { highlightedButton, setHighlightedButton } = useContext(SidebarContext);

    let unitsToFilter = [];
    if (building.type === "tower") unitsToFilter = building.floors.flatMap(floor => floor.units);
    else unitsToFilter = building.units;
    
    const { min: minBedrooms, max: maxBedrooms } = getMinMaxRange(unitsToFilter, FILTER_ENUM.BEDROOMS);
    const { min: minArea, max: maxArea } = getMinMaxRange(unitsToFilter, FILTER_ENUM.AREA);

    const isSelected = highlightedButton === building;

    const handleClick = () => {
        if (isSelected) {
            // console.log("building button clicked");
            goToItem();
            setHighlightedButton(null);
        }
        else setHighlightedButton(building);
    };

    return (
        <button
            key={building.id}
            onClick={handleClick}
            disabled={isDisabled}
            className={`w-full max-w-full mx-auto p-4 rounded-2xl transition
            ${isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected ? "bg-white/10" : "bg-black/10 hover:bg-white/7"
                }`}
        >
            <div className="text-left text-white">
                <div className="text-md font-bold leading-tight whitespace-nowrap">
                    {building.displayName ? building.displayName : building.name}
                </div>
                <div className="text-sm items-left flex flex-col space-x-0 space-y-2 text-white/60 leading-tight pt-1
                                        md:items-center md:flex-row md:space-x-3 md:space-y-0">
                    <div className="flex items-center space-x-1">
                        <img src={BED_ICON} className="w-5 h-auto" />
                        {minBedrooms === maxBedrooms ? <div>{minBedrooms}</div> : <div>{minBedrooms} - {maxBedrooms}</div>} <span>BR</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <img src={AREA_ICON} className="w-4 h-auto" />
                        {minArea === maxArea ? <div>{Math.round(minArea)}</div> : <div>{Math.round(minArea)} - {Math.round(maxArea)}</div>} <span>m²</span>
                    </div>

                </div>
            </div>
        </button>
    )
}