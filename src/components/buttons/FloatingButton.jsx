
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
    x = "50%", y = "50%" }) {
    const icon = getIcon(iconType);
    return (
        <button className={`absolute text-white px-4 py-2 rounded-lg flex items-center gap-2
        ${buttonType === 'surrounding' ? 'bg-[#94846D]/70' : 'bg-[#418AFF]'}`}
            style={{
                position: 'absolute',
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)', // centers the button on (x, y)
            }}>
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
                className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-4 pointer-events-none"
                style={{
                    backgroundColor: 'rgba(148, 132, 109, 0.7)',
                    clipPath: 'polygon(100% 0%, 0% 0%, 50% 100%)',
                }}
            ></div>
        </button>

    )
}