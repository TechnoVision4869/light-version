import { useContext } from "react";
import { SidebarContext } from "../../store/SidebarContextProvider";
import { LAYERS } from "../../data/layers";
export default function BuildingButton({ building, isDisabled, goToBuilding }) {
    const { highlightedButton, setHighlightedButton } = useContext(SidebarContext);

    const isSelected = highlightedButton === building;

    const handleClick = () => {
        if (isSelected) {
            goToBuilding(building, LAYERS.BUILDING);
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
            <div className="text-left">
                <div className="text-md font-bold text-white leading-tight whitespace-nowrap">
                    {building.displayName}
                </div>

            </div>
        </button>
    )
}