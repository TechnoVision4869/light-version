import { useEffect, useState } from 'react';
import { TABS } from '../../data/layers';

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

export default function FloatingButton({ name, iconType = null, tabType, isSelected = false,
    style = {}, }) {
    const [hasStartedFade, setHasStartedFade] = useState(false);

    useEffect(() => {
        setHasStartedFade(true);
    }, []);

    const icon = getIcon(iconType);
    const isSurrounding = tabType === TABS.SURROUNDINGS;
    const color = isSurrounding ? 'bg-[#94846D]/75 hover:bg-[#94846D]/85' : 'bg-[#418AFF] hover:bg-[#357AEE]';

    return (
        <button className={`${color} 
        fade-in-element ${hasStartedFade ? 'fade-in-started' : ''}
         relative text-white px-4 py-2 rounded-lg flex items-center gap-2 z-20`}
            style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                ...style, // apply computed left/top
            }}
        >
            {/* Icon Circle */}
            {(isSurrounding && icon) && (
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <img src={icon} alt={iconType} className="w-4 h-4 p-[1px]" />
                </div>
            )}

            {/* Text */}
            <span className='whitespace-nowrap text-sm'>{name}</span>

            {/* Pointed Bottom Triangle */}
            <span className='triangle'></span>
        </button>
    )
}