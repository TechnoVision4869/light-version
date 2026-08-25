import { useContext, useState } from "react";

import { SidebarContext } from "../store/SidebarContextProvider";
import { APP_CONFIG } from "../config/appConfig";

import Room from "./Room";
import { RoomList } from "./RoomList";

export default function InteriorBrowser({ unit, onClose }) {
    const { currentProject } = useContext(SidebarContext);
    const useStatic = APP_CONFIG.USE_STATIC;

    const unitType = useStatic
        ? currentProject?.unitTypes?.[unit?.unitTypeId]
        : currentProject?.unitTypes?.find(type => type.id === unit?.unitTypeId);
    const levels = useStatic ? unitType?.interior?.levels : unitType?.levels;
    const rooms = (levels || []).flatMap(level => level.rooms || []);

    const [activeRoom, setActiveRoom] = useState(rooms[0]);

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
            <div className="relative z-10 w-full h-full max-w-[110rem] bg-[#2f2f2f] rounded-2xl shadow-2xl overflow-hidden flex">
                <div className="w-44 md:w-64 flex-shrink-0 border-r border-white/10 py-2 px-1">
                    <RoomList
                        title={unit?.displayName || unit?.name}
                        rooms={rooms}
                        activeRoomId={activeRoom?.id}
                        onSelectRoom={setActiveRoom}
                    />
                </div>
                <div className="flex-1 relative">
                    <Room key={activeRoom?.id} room={activeRoom} />
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-40 w-10 h-10 rounded-xl bg-[#8B3A3A] hover:bg-[#A24242] flex items-center justify-center
                        transition
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Close interior browser"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
