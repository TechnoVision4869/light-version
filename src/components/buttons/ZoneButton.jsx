import { useContext } from "react";
import { SidebarContext } from "../../store/SidebarContextProvider";

export default function ZoneButton({ zone, isDisabled, goToItem }) {
    const { highlightedButton, setHighlightedButton } = useContext(SidebarContext);

    const isSelected = highlightedButton === zone;

    const handleClick = () => {
        
        if (isSelected) {
            console.log("ZoneButton clicked");
            goToItem();
            setHighlightedButton(null);
        }
        else setHighlightedButton(zone);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isDisabled}
            className={`w-full max-w-full mx-auto p-4 rounded-2xl transition
                        ${isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected ? "bg-white/10" : "bg-black/10 hover:bg-white/7"
                }`}
        >
            <div className="text-left">
                <div className="text-md font-bold text-white leading-tight">
                    {zone.displayName}
                </div>
                <div className="text-xs text-white/60 leading-tight py-1">
                    {zone.subtitle}
                </div>
            </div>
            <div className="w-full rounded-lg overflow-hidden bg-black/10">
                <img
                    src={zone.thumbnail}
                    alt={zone.displayName}
                    className="w-full h-full object-cover"
                />
            </div>
        </button>
    )
}