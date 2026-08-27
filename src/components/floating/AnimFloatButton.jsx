export default function AnimFloatButton({
    icon,
    name,
    style = {},
    onSelect,
    isSelected = false,
    nameDirection = null,
}) {

    return (
        <button className={`flex items-center gap-0 transition-colors duration-200
            ${isSelected ? 'z-40' : 'z-30'}`}
            style={{
                position: 'absolute',
                transform: nameDirection === "right" ? 'translate(-13%, -50%)' : 'translate(-87%, -50%)',
                ...style,
            }}
            onClick={onSelect}
            disabled={isSelected}
        >
            {/* Name Part (Left) - Only if nameDirection is "left" */}
            {nameDirection === "left" && (
                <div className={`surr-btn px-[8px] py-[7px] flex items-center transition-all duration-200
                    ${icon ? 'rounded-l-full' : 'rounded-full'}
                    ${isSelected ? "selected" : ""}`}>
                    <span className={`whitespace-nowrap font-medium transition-all duration-200 text-white
                        ${isSelected
                            ? 'text-sm font-semibold'
                            : 'text-sm font-regular'}`}>{name}</span>
                </div>
            )}

            {/* Icon Part */}
            {icon && (
                <div className={`surr-icon px-[6px] py-[5px] flex items-center justify-center flex-shrink-0 transition-all duration-200
                    ${isSelected
                        ? `selected ${nameDirection && nameDirection === "left" ? 'rounded-r-full' : 'rounded-l-full'}`
                        : nameDirection !== "null" ? "rounded-l-full" : "rounded-full"} `}>
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <img src={icon} className="w-4 h-4 p-[1px]" />
                    </div>
                    <span className='icon-triangle'></span>
                </div>
            )}

            {/* Name Part (Right) - Only if nameDirection is "right" */}
            {nameDirection === "right" && (
                <div className={`surr-btn px-[8px] py-[7px] flex items-center gap-1 transition-all duration-200
                    ${icon ? 'rounded-r-full' : 'rounded-full'}
                    ${isSelected ? "selected" : ""} `}>
                    <span className={`whitespace-nowrap font-medium transition-all duration-200 text-white
                        ${isSelected
                            ? 'text-sm font-semibold'
                            : 'text-sm font-regular'}`}>{name}</span>
                </div>
            )}
        </button>
    )
}