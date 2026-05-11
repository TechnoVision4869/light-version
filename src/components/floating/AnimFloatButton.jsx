export default function AnimFloatButton({
    icon,
    name,
    style = {},
    onSelect,
    isSelected = false,
    nameDirection = "right",
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
                <div className={`px-[8px] py-[7px] rounded-l-full flex items-center transition-all duration-200
                    ${isSelected
                        ? 'bg-[#1A5C55]'
                        : 'bg-[#59A198]/85'}`}>
                    <span className={`whitespace-nowrap font-medium transition-all duration-200 text-white
                        ${isSelected
                            ? 'text-sm'
                            : 'text-xs'}`}>{name}</span>
                </div>
            )}

            {/* Icon Part - Teal Background */}
            <div className={`px-[6px] py-[5px] flex items-center justify-center flex-shrink-0 transition-all duration-200
                ${isSelected
                    ? `bg-[#1A5C55] ${nameDirection === "left" ? 'rounded-r-full' : 'rounded-l-full'}`
                    : `bg-[#59A198]/85 rounded-l-full`}`}>
                {icon && (
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <img src={icon} className="w-4 h-4 p-[1px]" />
                    </div>
                )}
                <span className='icon-triangle'></span>
            </div>

            {/* Name Part (Right) - Only if nameDirection is "right" */}
            {nameDirection === "right" && (
                <div className={`px-[8px] py-[7px] rounded-r-full flex items-center gap-1 transition-all duration-200
                    ${isSelected
                        ? 'bg-[#1A5C55]'
                        : 'bg-[#59A198]/85'}`}>
                    <span className={`whitespace-nowrap font-medium transition-all duration-200 text-white
                        ${isSelected
                            ? 'text-sm'
                            : 'text-xs'}`}>{name}</span>
                </div>
            )}
        </button>
    )
}