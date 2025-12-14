import { TABS, LAYERS } from '../../data/layers';

export default function FloatingButton({ name, icon = null, tabType = null, layerType = null, isSelected = false,
    style = {}, onSelect }) {
    const isSurrounding = tabType === TABS.SURROUNDINGS;
    const isFloor = layerType === LAYERS.FLOOR;

    const color = isSurrounding ? 'bg-[#94846D]/75 hover:bg-[#94846D]/85' : 'bg-[#418AFF] hover:bg-[#357AEE]';

    return (
        <button className={`${color} text-white px-3 py-1 rounded-lg flex items-center gap-2 z-20`}
            style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                ...style, // apply computed left/top
            }}
            onClick={onSelect}
        >
            {(isSurrounding && icon) && (
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <img src={icon} className="w-4 h-4 p-[1px]" />
                </div>
            )}
            <span className='whitespace-nowrap text-sm'>{name}</span>
            {isFloor ? <span className='triangle-right'></span> : <span className='triangle'></span>}
        </button>
    )
}