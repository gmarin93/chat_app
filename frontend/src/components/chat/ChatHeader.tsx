"use client";

import { useRef, useState, useEffect } from "react";
import { Room } from "@/types/room";
import { ChatHeaderProps } from "@/types/chat";
import { SidebarHeaderAction } from "@/types/ui";
import TypingIndicator from "./TypingIndicator";
import SidebarHeader from "@/components/ui/Header";
import { useSocketStore } from "@/app/stores/socketStore";
import { useRoomStore } from "@/app/stores/roomStore";

const roomTypeIcon = (type: Room["room_type"]) => {
    if (type === "direct") return "👤";
    if (type === "private") return "🔒";
    return "#";
};

const ChatHeader = ({ room, username }: ChatHeaderProps) => {
    const { socket } = useSocketStore();
    const { setCurrentRoom } = useRoomStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLeaveRoom = () => {
        socket?.emit("leave_room", room.id);
        setCurrentRoom(null);
        setMenuOpen(false);
    };

    const handleAddMember = () => {
        // TODO: open add member modal
        setMenuOpen(false);
    };

    const actions: SidebarHeaderAction[] = [
        {
            label: "Search messages",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            ),
        },
    ];

    const dropdown = (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="More options"
                className="p-2 rounded-full hover:bg-[#2a3942] text-gray-400 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="19" r="1" />
                </svg>
            </button>

            {menuOpen && (
                <div className="absolute right-0 top-10 w-48 bg-[#233138] rounded-lg shadow-xl z-50 overflow-hidden">
                    <button
                        onClick={handleAddMember}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-[#2a3942] transition-colors text-left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <line x1="19" y1="8" x2="19" y2="14" />
                            <line x1="22" y1="11" x2="16" y2="11" />
                        </svg>
                        Add member
                    </button>

                    <div className="border-t border-[#2a3942]" />

                    <button
                        onClick={handleLeaveRoom}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-[#2a3942] transition-colors text-left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Leave room
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <SidebarHeader
            avatar={roomTypeIcon(room.room_type)}
            title={room.name}
            subtitle={room.description || `${room.member_count ?? 0} members`}
            extra={
                <div className="flex items-center gap-1">
                    {username && <TypingIndicator username={username} />}
                    {dropdown}
                </div>
            }
            actions={actions}
        />
    );
};

export default ChatHeader;
