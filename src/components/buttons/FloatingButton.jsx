
import AirportIcon from '../../assets/icons/airport.svg';
import TowerIcon from '../../assets/icons/tower.svg';
import MuscleIcon from '../../assets/icons/muscle.svg';

const getIcon = (type) => {
    switch (type) {
        case 'airport':
            return AirportIcon;
        case 'tower':
            return TowerIcon;
        case 'muscle':
            return MuscleIcon;
        default:
            return null;
    }
};

export default function FloatingButton({ name, iconType = null, buttonType, isSelected = false,
    style = {}, }) {
    const icon = getIcon(iconType);
    return (
        <button className={`relative text-white px-4 py-2 rounded-lg flex items-center gap-2 z-20
        ${buttonType === 'surrounding' ? 'bg-[#94846D]/70' : 'bg-[#418AFF]'}`}
            style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                ...style, // apply computed left/top
            }}
        >
            {/* Icon Circle */}
            {(buttonType === 'surrounding' && icon) && (
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <img src={icon} alt={iconType} className="w-4 h-4 p-[1px]" />
                </div>
            )}

            {/* Text */}
            <span className='whitespace-nowrap text-sm'>{name}</span>

            {/* Pointed Bottom Triangle */}
            <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-6 h-4 pointer-events-none"
                style={{
                    backgroundColor: 'rgba(148, 132, 109, 0.7)',
                    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)'
                }}
            ></div>
        </button>

    )
}