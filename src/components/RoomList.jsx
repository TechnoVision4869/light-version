export function RoomList({ title, rooms, activeRoomId, onSelectRoom }) {
    return (
        <div className="h-full flex flex-col text-white px-2 py-2">
            <div className="font-semibold mb-1 px-1 whitespace-nowrap">{title}</div>
            <div className="h-0.5 bg-white/50 mx-1 mb-3" />
            <div className="flex flex-col gap-2.5 overflow-auto scrollbar-custom">
                {rooms.map((room) => (
                    <button
                        key={room.id}
                        onClick={() => onSelectRoom(room)}
                        className={`text-left px-3 py-4 rounded-xl text-sm font-semibold transition
                            ${activeRoomId === room.id
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
