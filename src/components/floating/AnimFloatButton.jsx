export default function AnimFloatButton({
    icon,
    name,
    style = {},
    onSelect,
    isSelected = false,
}) {

    return (
        <button className={`anim-btn text-white px-3 py-1 rounded-lg flex items-center gap-2 z-30 transition
            ${isSelected
                ? 'bg-[#40321E] hover:bg-[#6B5635]'
                : 'bg-[#94846D]/75 hover:bg-[#94846D]/85 text-white'}`}
            style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                ...style, // apply computed left/top
            }}
            onClick={onSelect}
            disabled={isSelected}
        >
            {icon && (
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <img src={icon} className="w-4 h-4 p-[1px]" />
                </div>
            )}
            <span className='whitespace-nowrap text-sm'>{name}</span>
            <span className='triangle'></span>
        </button>
    )
}