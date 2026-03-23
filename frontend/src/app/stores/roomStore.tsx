import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CreateRoomData, Room, RoomState } from "@/types/room";
import RoomService from "@/services/room";

export const useRoomStore = create<RoomState>()(
  persist(
    (set) => ({
      rooms: [],
      currentRoom: null,
      messages: [],
      isLoading: false,
      error: null,

      setCurrentRoom: (room: Room | null) => set({ currentRoom: room }),

      getRooms: async () => {
        set({ isLoading: true });
        try {
          const response = await RoomService.getRooms();
          set({ rooms: response });
        } catch (error) {
          set({ error: error as string });
        } finally {
          set({ isLoading: false });
        }
      },
      getRoom: async (slug: string) => {
        set({ isLoading: true });
        try {
          const response = await RoomService.getRoom(slug);
          set({ currentRoom: response });
        } catch (error) {
          set({ error: error as string });
        } finally {
          set({ isLoading: false });
        }
      },
      createRoom: async (data: CreateRoomData) => {
        set({ isLoading: true });
        try {
          const response = await RoomService.createRoom(data);
          set((state) => ({ rooms: [...state.rooms, response] }));
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Failed to create room' });
        } finally {
          set({ isLoading: false });
        }
      },
      joinRoom: async (roomId: string) => {
        set({ isLoading: true });
        try {
          await RoomService.joinRoom(roomId);
        } catch (error) {
          set({ error: error as string });
        } finally {
          set({ isLoading: false });
        }
      },
      leaveRoom: async (roomId: string) => {
        set({ isLoading: true });
        try {
          await RoomService.leaveRoom(roomId);
        } catch (error) {
          set({ error: error as string });
        } finally {
          set({ isLoading: false });
        }
      },
      startDirectMessage: async (targetUserId: string) => {
        console.log("startDirectMessage:", targetUserId);
        
        set({ isLoading: true });
        try {
            const room = await RoomService.startDirectMessage(targetUserId);
            set((state) => ({
                currentRoom: room,
                rooms: state.rooms.find((r) => r.id === room.id)
                    ? state.rooms
                    : [...state.rooms, room],
            }));
        } catch (error) {
            set({ error: error as string });
        } finally {
            set({ isLoading: false });
        }
    },
    }),
    {
      name: "room-storage",
      partialize: (state) => ({
        rooms: state.rooms,
        currentRoom: state.currentRoom,
        messages: state.messages,
        isLoading: state.isLoading,
        error: state.error,
      }),
    },
  ),
);
