import { Select, MenuItem } from '@mui/material';
import { useState } from 'react';

import FURNITURE from "../assets/icons/furniture.svg";
import UNFURNITURE from "../assets/icons/un-furniture.svg";

const Dropdown = ({ label, options }) => {
    const [selected, setSelected] = useState(options[0]);

    return (
        <div className="flex items-center space-x-2">
            <span className="md:text-base font-medium">{label}</span>
            <Select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="bg-black text-white"
                size='small'
                sx={{
                    color: 'white',
                    borderRadius: '11.1px',
                    '& .MuiSvgIcon-root': { color: 'white', },
                }}
            >
                {options.map((opt, index) => (
                    <MenuItem key={index} value={opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default function InteriorNav({levels, isFurnished = true}) {
    const levelsOptions = levels.map(level => level.name);
    const roomsOptions = levels[0].rooms.map(room => room.displayName);
    return (
        <div className="absolute bottom-3 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-50px)] lg:max-w-[760px] px-3 lg:px-0 z-40 pointer-events-auto">
            <div className=" flex justify-around items-center bg-[#535353C9] text-white rounded-2xl shadow-2xl p-3 md:p-4 relative overflow-hidden">
                <Dropdown label="Floor :" options={levelsOptions} />
                <Dropdown label="Room :" options={roomsOptions} />
                <div>
                    <button className={`w-10 h-10 rounded-2xl ${isFurnished ? 'p-1' : 'p-2'} bg-black flex items-center justify-center hover:bg-white/7 transition`}>
                        <img className="w-auto h-6 object-contain"
                            src={isFurnished ? UNFURNITURE : FURNITURE}
                            alt={isFurnished ? "Furniture icon" : "Unfurniture icon"}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}