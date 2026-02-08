import { Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';

import FURNITURE from "../assets/icons/furniture.svg";
import UNFURNITURE from "../assets/icons/un-furniture.svg";

const Dropdown = ({ label, options, value, onChange }) => {
    const [selected, setSelected] = useState(value || options[0]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setSelected(newValue);
        onChange?.(newValue);
    };

    // Update selected when value prop changes
    useEffect(() => {
        setSelected(value || options[0]);
    }, [value, options]);

    return (
        <div className="flex items-center space-x-2">
            <span className="md:text-base font-medium">{label}</span>
            <Select
                value={selected}
                onChange={handleChange}
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

export default function InteriorNav({levels, isFurnished = true, currentFloor, currentRoom, onFurnitureToggle, onRoomChange}) {
    const levelsOptions = levels.map(level => level.name);
    const [selectedFloor, setSelectedFloor] = useState(currentFloor || levels[0].name);
    const [roomsOptions, setRoomsOptions] = useState(levels[0].rooms.map(room => room.displayName));
    const [selectedRoom, setSelectedRoom] = useState(currentRoom || levels[0].rooms[0].displayName);

    // Update rooms when floor changes
    const handleFloorChange = (floorName) => {
        setSelectedFloor(floorName);
        const selectedLevel = levels.find(level => level.name === floorName);
        if (selectedLevel) {
            const newRoomsOptions = selectedLevel.rooms.map(room => room.displayName);
            setRoomsOptions(newRoomsOptions);
            setSelectedRoom(newRoomsOptions[0]);
            // Call onRoomChange with first room of new floor
            onRoomChange?.(newRoomsOptions[0]);
        }
    };

    // Handle room change
    const handleRoomChange = (roomName) => {
        setSelectedRoom(roomName);
        onRoomChange?.(roomName);
    };

    // Update dropdowns when current floor/room change (e.g., from hotspot click)
    useEffect(() => {
        if (currentFloor) {
            setSelectedFloor(currentFloor);
            const selectedLevel = levels.find(level => level.name === currentFloor);
            if (selectedLevel) {
                const newRoomsOptions = selectedLevel.rooms.map(room => room.displayName);
                setRoomsOptions(newRoomsOptions);
            }
        }
    }, [currentFloor, levels]);

    useEffect(() => {
        if (currentRoom) {
            setSelectedRoom(currentRoom);
        }
    }, [currentRoom]);

    return (
        <div className="absolute bottom-3 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-50px)] lg:max-w-[760px] px-3 lg:px-0 z-40 pointer-events-auto">
            <div className=" flex justify-around items-center bg-[#535353C9] text-white rounded-2xl shadow-2xl p-3 md:p-4 relative overflow-hidden">
                <Dropdown label="Floor :" options={levelsOptions} value={selectedFloor} onChange={handleFloorChange} />
                <Dropdown label="Room :" options={roomsOptions} value={selectedRoom} onChange={handleRoomChange} />
                <div>
                    <button 
                        className={`w-10 h-10 rounded-2xl ${isFurnished ? 'p-1' : 'p-2'} bg-black flex items-center justify-center hover:bg-white/7 transition`}
                        onClick={onFurnitureToggle}
                    >
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