import { useContext } from "react";
import { APP_CONFIG } from "../config/appConfig";
import { MainContext } from "../store/MainContextProvider";
import { SidebarContext } from "../store/SidebarContextProvider";

export function RoomList() {
    const { currentItem, currentItems } = useContext(SidebarContext);
    const { overlay, openRoomInterior } = useContext(MainContext);
    const rooms = currentItems

    return (
        <div className="h-full flex flex-col text-white px-2 py-2">
            <div className="font-semibold mb-1 px-1 whitespace-nowrap">{currentItem?.displayName || currentItem?.name}</div>
            <div className="h-0.5 bg-white/50 mx-1 mb-3" />
            <div className="flex flex-col gap-2.5 overflow-auto scrollbar-custom">
                {rooms.map((room) => (
                    <button
                        key={room.id}
                        onClick={() => openRoomInterior(room)}
                        className={`text-left px-3 py-4 rounded-xl text-sm font-semibold transition
                            ${overlay?.data?.room?.id === room.id
                                ? 'bg-white/85 text-black'
                                : 'bg-black/40 hover:bg-white/20 text-white'
                            }`}
                    >
                        {room.displayName}
                    </button>
                ))}
            </div>
        </div>
    );
}