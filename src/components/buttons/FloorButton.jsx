import { useContext } from "react";
import { SidebarContext } from "../../store/SidebarContextProvider";

export default function FloorButton({ floor, isDisabled, goToItem, }) {
  const { highlightedButton, setHighlightedButton } = useContext(SidebarContext);
  const isSelected = highlightedButton === floor;

  const handleClick = () => {
        
        if (isSelected) {
            goToItem();
            setHighlightedButton(null);
        }
        else setHighlightedButton(floor);
    };
  
  return (
    <button
      key={floor.id}
      onClick={handleClick}
      disabled={isDisabled}
      className={`w-full max-w-full mx-auto p-4 rounded-2xl transition whitespace-nowrap
        ${isDisabled
          ? "opacity-50 cursor-not-allowed"
          : isSelected
            ? "bg-white/10"
            : "bg-black/10 hover:bg-white/7"
        }`}
    >
      {/* <div className="flex items-center justify-between"> */}
      <div className="text-left">
        {/* Floor Name */}
        <div className="text-md font-semibold text-white leading-tight">
          {floor.displayName}
        </div>
        {floor.units && <div className="text-xs text-white/60 leading-tight py-1">
          {floor.units.length} Units
        </div>}

        {/* Vertical Divider + Floor Type */}
        {/* {<div className="flex items-center">
          <div className="w-0.5 h-5 bg-white mx-3"></div>
          <div className="font-bold text-white">{floor.type || floor.subtitle}</div>
        </div>} */}
      </div>
    </button>
  );
}