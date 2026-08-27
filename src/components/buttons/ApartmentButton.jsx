import { useContext } from "react";
import { SidebarContext } from "../../store/SidebarContextProvider";
import { recordUnitView } from "../../lib/mockEngagementData";

export default function ApartmentButton({ apartment, isDisabled = false, goToItem }) {
    const { highlightedButton, setHighlightedButton } = useContext(SidebarContext);

    const isSelected = highlightedButton === apartment;

    const handleClick = () => {

        if (isSelected) {
            // console.log("ApartmentButton clicked");
            recordUnitView(apartment.id);
            goToItem();
            setHighlightedButton(null);
        }
        else setHighlightedButton(apartment);
    };
    
    return (
        <button
            onClick={handleClick}
            disabled={isDisabled}
            className={`w-full max-w-full mx-auto p-4 rounded-2xl transition
            ${isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected
                        ? "bg-white/10"
                        : "bg-black/10 hover:bg-white/7"
                }`}
        >
            <div className="flex items-center justify-between whitespace-nowrap min-w-0">
                {/* Floor Name */}
                <div className="text-md font-semibold text-white leading-tight flex-shrink-0">
                    {apartment.displayName? apartment.displayName : apartment.name}
                </div>

                {/* Vertical Divider + Floor Type */}
                <div className="flex items-center flex-shrink-0">
                    <div className="w-0.5 h-5 bg-white mx-3"></div>
                    <div>

                        <div className="text-xs text-white/60 leading-tight py-1">AREA
                        </div>
                        <div className="text-md font-bold text-white leading-tight">
                            {apartment.area}
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )
}