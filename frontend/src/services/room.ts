import { CreateRoomData, Room } from "@/types/room";
import apiClient from "./api";
import { ROOM_ENDPOINTS } from "@/config/endpoints";

class RoomService {
    async getRooms(): Promise<Room[]> {
        const response = await apiClient.get<Room[]>(ROOM_ENDPOINTS.ROOMS);
        return response.data;
    }

    /**
     * Get room by slug
     */
    async getRoom(slug: string): Promise<Room> {
        const response = await apiClient.get<Room>(ROOM_ENDPOINTS.ROOM_DETAIL.replace(':slug', slug));
        return response.data;
    }

    /**
     * Create new room
     */
    async createRoom(data: CreateRoomData): Promise<Room> {
        const response = await apiClient.post<Room>(ROOM_ENDPOINTS.ROOMS, data);
        return response.data;
    }

    /**
     * Join room
     */
    async joinRoom(roomId: string): Promise<void> {
        await apiClient.post(ROOM_ENDPOINTS.ROOM_MEMBERSHIP_DETAIL.replace(':pk', roomId));
    }

    /**
     * Leave room
     */
    async leaveRoom(roomId: string): Promise<void> {
        await apiClient.post(ROOM_ENDPOINTS.ROOM_MEMBERSHIP_DETAIL.replace(':pk', roomId));
    }

    /**
     * Get room members
     */
    async getRoomMembers(roomId: string): Promise<any[]> {
        const response = await apiClient.get(ROOM_ENDPOINTS.ROOM_MEMBERSHIP_DETAIL.replace(':pk', roomId));
        return response.data;
    }

    async startDirectMessage(targetUserId: string): Promise<Room> {
        const response = await apiClient.post<Room>(ROOM_ENDPOINTS.ROOMS, {
            target_user_id: targetUserId,
        });
        return response.data;
    }
}

export default new RoomService();