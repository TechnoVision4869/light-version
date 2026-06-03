import { LAYERS } from '../../data/layers';

export default function BaseFloatButton({ name, layerType = null, style = {}, isSelected, onSelect, showName = true, triClass = "triangle" }) {
    const isFloor = layerType === LAYERS.BUILDING;

    return (
        <button className={`blur-backdrop-button ${isSelected ? "selected" : ""} text-sm text-white px-[8px] py-1 ${triClass ? "rounded-lg" : "rounded-xl"} flex items-center gap-2 z-20 hover:bg-[#4a6082] transition-colors`}
            style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                ...style, // apply computed left/top
            }}
            onClick={onSelect}
        >
            {!showName && <span className='whitespace-nowrap'>{name.split(" ")[1]}</span>}
            {showName && <span className='whitespace-nowrap'>{name}</span>}
            {isFloor ? <span className='triangle-right backdrop-blur-sm'></span> : <span className='triangle-small-down'></span>}
            {/* <span className={triClass}></span> */}
        </button>
    )
}