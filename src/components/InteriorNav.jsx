import { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import FURNITURE from "../assets/icons/furniture.svg";
import UNFURNITURE from "../assets/icons/un-furniture.svg";

const Dropdown = ({ label, options, value, onChange }) => {
    const [selected, setSelected] = useState(value || options[0]);

    const handleChange = (newValue) => {
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
            <Select value={selected} onValueChange={handleChange}>
                <SelectTrigger className="w-36 bg-[#383838] text-white border-none">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#53535380] backdrop-blur-md text-white border-[#FFFFFF5E] z-[9999]"
                    side="top"
                    sideOffset={2}
                    position="popper"
                >
                    {options.map((opt) => (
                        <SelectItem key={opt} value={opt} className='text-white hover:bg-[#383838] focus:bg-[#383838] focus:text-[#dddddd]'>
                            {opt}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default function InteriorNav({ levels, isFurnished = true, currentFloor, currentRoom, hasUnfurnished = true, onFurnitureToggle, onRoomChange }) {
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
            // Call onRoomChange with composite key
            onRoomChange?.(`${floorName}/${newRoomsOptions[0]}`);
        }
    };

    // Handle room change
    const handleRoomChange = (roomName) => {
        setSelectedRoom(roomName);
        onRoomChange?.(`${selectedFloor}/${roomName}`);
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
        <div className="absolute bottom-3 md:bottom-6 lg:bottom-8 
        left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-50px)] lg:max-w-[760px] px-3 lg:px-0 z-40 pointer-events-auto">
            <div className="flex items-center justify-around bg-[#53535380] backdrop-blur-md text-white rounded-2xl shadow-2xl px-2 md:px-2 py-3 md:py-3 relative">
                <Dropdown label="Floor " options={levelsOptions} value={selectedFloor} onChange={handleFloorChange} />
                <Dropdown label="Room " options={roomsOptions} value={selectedRoom} onChange={handleRoomChange} />
                {hasUnfurnished && (
                <div>
                    <button
                        className={`w-10 h-10 rounded-2xl p-2 bg-[#383838] flex items-center justify-center hover:bg-white/7 transition`}
                        onClick={onFurnitureToggle}
                    >
                        <img className="w-auto h-6 object-contain"
                            src={isFurnished ? UNFURNITURE : FURNITURE}
                            alt={isFurnished ? "Furniture icon" : "Unfurniture icon"}
                        />
                    </button>
                </div>
                )}
            </div>
        </div>
    );
}