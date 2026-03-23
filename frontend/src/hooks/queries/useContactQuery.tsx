import { useSuspenseQuery } from "@tanstack/react-query";
import ChatService from "@/services/chat";

export const CONTACT_KEYS = {
  all: ["contacts"] as const,
};

export const useContactsQuery = () => {
  return useSuspenseQuery({
    queryKey: CONTACT_KEYS.all,
    queryFn: () => ChatService.getAllUsers(),
  });
};