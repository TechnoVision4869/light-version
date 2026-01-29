export default function TypeButton({ type, isDisabled = false, isSelected, goToItem }) {
    return (
        <button
            key={type.id}
            onClick={() => {
            console.log("TypeButton clicked");
                goToItem();
            }}
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
                    {type.displayName}
                </div>

                {/* Vertical Divider + Floor Type */}
                <div className="flex items-center flex-shrink-0">
                    <div className="w-0.5 h-5 bg-white mx-3"></div>
                    <div>

                        <div className="text-xs text-white/60 leading-tight py-1">AREA
                        </div>
                        <div className="text-md font-bold text-white leading-tight">
                            {type.area}
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )
}