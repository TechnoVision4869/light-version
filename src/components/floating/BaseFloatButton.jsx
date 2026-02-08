import { LAYERS } from '../../data/layers';

export default function BaseFloatButton({ name, layerType = null, style = {}, isOpaque, onSelect, showName = true }) {
    const isFloor = layerType === LAYERS.BUILDING;
    
    return (
        <button className={`bg-[#418AFF] ${isOpaque ? "" : "opacity-75"} hover:bg-[#357AEE] text-white px-3 py-1 ${showName ? "rounded-lg" : "rounded-xl"} flex items-center gap-2 z-20`}
            style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                ...style, // apply computed left/top
            }}
            onClick={onSelect}
        >
            {!showName && <span className='whitespace-nowrap text-sm'>{name.split(" ")[1]}</span>}
            {showName && <span className='whitespace-nowrap text-sm'>{name}</span>}
            {isFloor ? <span className='triangle-right'></span> : showName ? <span className='triangle'></span> : <span className='triangle-small'></span>}
        </button>
    )
}