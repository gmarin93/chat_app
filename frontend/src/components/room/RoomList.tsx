'use client';

import { useEffect, useState, useMemo } from "react";
import { useRoomStore } from "@/app/stores/roomStore";
import RoomListHeader from "./RoomListHeader";
import RoomSearchBar from "../room/RoomSearchBar";
import RoomListItem from "../room/RoomListItem";

const RoomList = () => {
    const { rooms, getRooms, currentRoom, setCurrentRoom } = useRoomStore();
    const [search, setSearch] = useState("");

    useEffect(() => {
        getRooms();
    }, [getRooms]);

    const filteredRooms = useMemo(() => rooms.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase())
    ), [rooms, search]);

    return (
        <div className="flex flex-col h-full bg-[#111b21]">
            <RoomListHeader />
            <RoomSearchBar value={search} onChange={setSearch} />

            <div className="flex-1 overflow-y-auto">
                {filteredRooms.length === 0 && (
                    <p className="text-gray-500 text-sm text-center mt-8">
                        {search ? 'No rooms match your search' : 'No rooms yet'}
                    </p>
                )}
                {filteredRooms.map((room) => (
                    <RoomListItem
                        key={room.id}
                        room={room}
                        isActive={currentRoom?.id === room.id}
                        onClick={setCurrentRoom}
                    />
                ))}
            </div>
        </div>
    );
};

export default RoomList;