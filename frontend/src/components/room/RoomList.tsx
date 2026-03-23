"use client";

import { useRoomStore } from "@/app/stores/roomStore";
import { Room } from "@/types/room";
import SidebarList from "@/components/ui/SidebarList";
import SidebarListItem from "@/components/ui/SidebarListItem";
import RoomListHeader from "./RoomListHeader";
import { useRoomsQuery } from "@/hooks/queries/useRoomsQuery";

const roomTypeIcon = (type: Room["room_type"]) => {
  if (type === "direct") return "👤";
  if (type === "private") return "🔒";
  return "#";
};

const RoomList = () => {

  const { data: rooms = [], isLoading } = useRoomsQuery();
  const { currentRoom, setCurrentRoom } = useRoomStore();

  return (
    <SidebarList
      items={rooms}
      keyExtractor={(room) => room.id}
      filterKey={(room) => room.name}
      header={<RoomListHeader />}
      searchPlaceholder="Search or start new chat"
      emptyMessage="No rooms yet"
      emptySearchMessage="No rooms match your search"
      renderItem={(room) => (
        <SidebarListItem
          avatar={roomTypeIcon(room.room_type)}
          title={room.name}
          subtitle={
            room.description ||
            (room.room_type === "direct"
              ? "Direct message"
              : `${room.member_count ?? 0} members`)
          }
          meta={new Date(room.created_at).toLocaleDateString([], {
            month: "short",
            day: "numeric",
          })}
          isActive={currentRoom?.id === room.id}
          onClick={() => setCurrentRoom(room)}
        />
      )}
    />
  );
};

export default RoomList;
