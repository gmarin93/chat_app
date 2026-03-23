import { useQuery, useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import RoomService from "@/services/room";

export const ROOM_KEYS = {
  all: ["rooms"] as const,
  detail: (slug: string) => ["rooms", slug] as const,
};

export const useRoomsQuery = () => {
  return useSuspenseQuery({
    queryKey: ROOM_KEYS.all,
    queryFn: () => RoomService.getRooms(),
  });
};

export const useStartDirectMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: string) =>
      RoomService.startDirectMessage(targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_KEYS.all });
    },
  });
};