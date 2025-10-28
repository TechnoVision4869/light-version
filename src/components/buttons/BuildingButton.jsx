import { LAYERS } from "../../data/layers";
export default function BuildingButton({ building, isDisabled, isSelected, goToBuilding }) {
    return (
        <button
            key={building.id}
            onClick={() => {
                goToBuilding(building, LAYERS.BUILDING);
            }}
            disabled={isDisabled}
            className={`w-64 max-w-full mx-auto p-4 rounded-2xl transition
            ${isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected ? "bg-white/10" : "bg-black/10 hover:bg-white/7"
                }`}
        >
            <div className="text-left">
                <div className="text-md font-bold text-white leading-tight">
                    {building.name}
                </div>
               
            </div>
        </button>
    )
}