import { LAYERS } from "../../data/layers";
export default function ApartmentButton({ apartment, isDisabled, isSelected, goToApartment }) {
    return (
        <button
            key={apartment.id}
            onClick={() => {
                goToApartment(apartment, LAYERS.APARTMENT);
            }}
            disabled={isDisabled}
            className={`w-64 max-w-full mx-auto p-4 rounded-2xl transition
        ${isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected
                        ? "bg-white/10"
                        : "bg-black/10 hover:bg-white/7"
                }`}
        >
            <div className="flex items-center justify-between">
                {/* Floor Name */}
                <div className="text-md font-semibold text-white leading-tight">
                    {apartment.name}
                </div>

                {/* Vertical Divider + Floor Type */}
                <div className="flex items-center">
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