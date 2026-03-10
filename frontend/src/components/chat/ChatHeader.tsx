import { Room } from "@/types/room";
import TypingIndicator from "./TypingIndicator";

interface ChatHeaderProps {
    room: Room;
    typingUser: string;
}

const roomTypeIcon = (type: Room["room_type"]) => {
    if (type === "direct") return "👤";
    if (type === "private") return "🔒";
    return "#";
};

const ChatHeader = ({ room, typingUser }: ChatHeaderProps) => {
    return (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#202c33] flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#2a3942] flex items-center justify-center text-lg select-none">
                {roomTypeIcon(room.room_type)}
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{room.name}</p>
                <p className="text-gray-400 text-xs truncate">
                    {room.description || `${room.member_count ?? 0} members`}
                </p>
            </div>

            {typingUser && <TypingIndicator typingUser={typingUser} />}

            <div className="flex items-center gap-1">
                <button className="p-2 rounded-full hover:bg-[#2a3942] text-gray-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-[#2a3942] text-gray-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="19" r="1" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
