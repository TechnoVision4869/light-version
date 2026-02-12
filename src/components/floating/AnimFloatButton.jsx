export default function AnimFloatButton({
    icon,
    name,
    style = {},
    onSelect,
    isSelected = false,
    nameDirection = "right",
}) {

    return (
        <button className={`flex items-center gap-0 transition-all duration-200
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
                        ? 'bg-[#40321E]'
                        : 'bg-transparent'}`}>
                    <span className={`whitespace-nowrap font-medium transition-all duration-200
                        ${isSelected
                            ? 'text-white text-sm'
                            : 'text-black text-xs'}`}>{name}</span>
                </div>
            )}

            {/* Icon Part - Brown Background */}
            <div className={`px-[6px] py-[5px] flex items-center justify-center flex-shrink-0 transition-all duration-200
                ${isSelected
                    ? `bg-[#40321E] ${nameDirection === "left" ? 'rounded-r-full' : 'rounded-l-full'}`
                    : `bg-[#94846D]/75 hover:bg-[#94846D]/85 rounded-full`}`}>
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
                        ? 'bg-[#40321E]'
                        : 'bg-transparent'}`}>
                    <span className={`whitespace-nowrap font-medium transition-all duration-200
                        ${isSelected
                            ? 'text-white text-sm'
                            : 'text-black text-xs'}`}>{name}</span>
                </div>
            )}
        </button>
    )
}