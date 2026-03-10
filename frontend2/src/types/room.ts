import { ChatMessage } from "./chat";

export interface Room {
    id: string;
    name: string;
    slug: string;
    description: string;
    room_type: 'public' | 'private' | 'direct';
    created_by: string;
    created_at: string;
    member_count: number;
}

export interface RoomState {
    getRooms: () => Promise<void>;
    setCurrentRoom: (room: Room | null) => void;
    rooms: Room[];
    currentRoom: Room | null;
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
}

export interface CreateRoomData {
    name: string;
    description?: string;
    room_type: 'public' | 'private' | 'direct';
}