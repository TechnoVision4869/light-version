import { useContext } from "react";
import { SidebarContext } from "../../store/SidebarContextProvider";
import BED_ICON from "../../assets/icons/bed.svg";
import AREA_ICON from "../../assets/icons/area.svg"

export default function BuildingButton({ building, isDisabled, goToItem }) {
    const { highlightedButton, setHighlightedButton } = useContext(SidebarContext);

    const isSelected = highlightedButton === building;

    const handleClick = () => {
        if (isSelected) {
            console.log("building button clicked");
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
                    {building.displayName}
                </div>
                {/* <div className="text-xs text-white/60 leading-tight pt-1">
                    4 BR | 120 - 180 m²
                </div> */}
                <div className="text-xs items-center flex space-x-1 text-white/60 leading-tight pt-1">
                    <img className="w-6" src={BED_ICON}></img>
                    <div> 4 BR </div>
                    <img className="ms-3 w-4" src={AREA_ICON}></img>
                    <div> 120 - 180 m² </div>
                </div>
            </div>
        </button>
    )
}