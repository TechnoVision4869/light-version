export default function AnimButton({ 
    icon,
    name, 
    style = {},
    onSelect
    }) {

    return (
        <button className="bg-[#94846D]/75 hover:bg-[#94846D]/85  text-white px-3 py-1 rounded-lg flex items-center gap-2 z-20"
            style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                ...style, // apply computed left/top
            }}
            onClick={onSelect}
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