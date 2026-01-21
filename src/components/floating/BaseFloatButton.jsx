import { LAYERS } from '../../data/layers';

export default function BaseFloatButton({ 
    name, 
    layerType = null,
    style = {},
    onSelect 
    }) {
    const isFloor = layerType === LAYERS.FLOOR;

    return (
        <button className="bg-[#418AFF] hover:bg-[#357AEE] text-white px-3 py-1 rounded-lg flex items-center gap-2 z-20"
            style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                ...style, // apply computed left/top
            }}
            onClick={onSelect}
        >
            
            <span className='whitespace-nowrap text-sm'>{name}</span>
            {isFloor ? <span className='triangle-right'></span> : <span className='triangle'></span>}
        </button>
    )
}