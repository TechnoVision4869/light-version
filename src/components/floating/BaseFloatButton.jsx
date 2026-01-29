import { LAYERS } from '../../data/layers';

export default function BaseFloatButton({ name, layerType = null, style = {}, isOpaque, onSelect }) {
    const isFloor = layerType === LAYERS.BUILDING;

    let showName = true;
    if(layerType === LAYERS.TYPE) showName = false;
    
    return (
        <button className={`bg-[#418AFF] ${isOpaque ? "" : "opacity-75"} hover:bg-[#357AEE] text-white px-3 py-1 ${showName ? "rounded-lg" : "rounded-xl"} flex items-center gap-2 z-20`}
            style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                ...style, // apply computed left/top
            }}
            onClick={onSelect}
        >
            {!showName && <span className='whitespace-nowrap text-sm'>{name.slice(-1)}</span>}
            {showName && <span className='whitespace-nowrap text-sm'>{name}</span>}
            {isFloor ? <span className='triangle-right'></span> : showName ? <span className='triangle'></span> : <span className='triangle-small'></span>}
        </button>
    )
}