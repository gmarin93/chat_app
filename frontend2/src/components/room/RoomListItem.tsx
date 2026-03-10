import { Room } from "@/types/room";

interface RoomListItemProps {
    room: Room;
    isActive: boolean;
    onClick: (room: Room) => void;
}

const roomTypeIcon = (type: Room['room_type']) => {
    if (type === 'direct') return '👤';
    if (type === 'private') return '🔒';
    return '#';
};

const RoomListItem = ({ room, isActive, onClick }: RoomListItemProps) => {
    return (
        <button
            onClick={() => onClick(room)}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left
                ${isActive ? 'bg-[#2a3942]' : 'hover:bg-[#202c33]'}
            `}
        >
            <div className="w-12 h-12 rounded-full bg-[#2a3942] flex-shrink-0 flex items-center justify-center text-xl select-none">
                {roomTypeIcon(room.room_type)}
            </div>

            <div className="flex-1 min-w-0 border-b border-[#2a3942] pb-3">
                <div className="flex justify-between items-baseline">
                    <span className="text-white text-sm font-medium truncate">{room.name}</span>
                    <span className="text-gray-500 text-xs flex-shrink-0 ml-2">
                        {new Date(room.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                </div>
                <p className="text-gray-500 text-xs truncate mt-0.5">
                    {room.description || (room.room_type === 'direct' ? 'Direct message' : `${room.member_count ?? 0} members`)}
                </p>
            </div>
        </button>
    );
};

export default RoomListItem;
