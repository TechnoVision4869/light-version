import { LAYERS } from '../../data/layers';

export default function BaseFloatButton({ name, layerType = null, style = {}, isOpaque, onSelect, showName = true, triClass = "triangle" }) {
    // const isFloor = layerType === LAYERS.BUILDING;

    return (
        <button className={`bg-[#418AFF] ${isOpaque ? "" : "opacity-75"}
         hover:bg-[#357AEE] text-sm text-white px-[10px] py-1 ${triClass ? "rounded-lg" : "rounded-xl"} flex items-center gap-2 z-20`}
            style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                ...style, // apply computed left/top
            }}
            onClick={onSelect}
        >
            {!showName && <span className='whitespace-nowrap'>{name.split(" ")[1]}</span>}
            {showName && <span className='whitespace-nowrap'>{name}</span>}
            {/* {isFloor ? <span className='triangle-right'></span> : showName ? <span className='triangle'></span> : <span className='triangle-small'></span>} */}
            <span className={triClass}></span>
        </button>
    )
}