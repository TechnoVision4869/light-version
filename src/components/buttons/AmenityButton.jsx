export default function AmenityButton({ amenity, isDisabled, isSelected, goToItem }) {
    return (
        <button
            onClick={goToItem}
            disabled={isDisabled}
            className={`w-full max-w-full mx-auto p-4 rounded-2xl transition
                        ${isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected ? "bg-white/10" : "bg-black/10 hover:bg-white/7"
                }`}
        >
            <div className="text-left">
                <div className="text-md font-bold text-white leading-tight">
                    {amenity.displayName || amenity.name}
                </div>
                <div className="text-xs text-white/60 leading-tight py-1">
                    {amenity.subtitle}
                </div>
            </div>
            {(amenity.thumbnail || amenity.thumbnailAssetId) && <div className="w-full rounded-lg overflow-hidden bg-black/10">
                <img
                    src={amenity.thumbnail || amenity.thumbnailAssetId}
                    alt={amenity.displayName || amenity.name}
                    className="w-full h-full object-cover"
                />
            </div>}
        </button>
    )
}