import { useEffect } from "react";
import { useSocketStore } from "@/app/stores/socketStore";
import { useRoomStore } from "@/app/stores/roomStore";
import { useAuthStore } from "@/app/stores/authStore";
import { useChatStore } from "@/app/stores/chatStore";

function useTypingIndicator() {
  const { typingUser, setTypingUser, setStopTypingUser } = useChatStore();
  const { socket, isConnected } = useSocketStore();
  const { currentRoom } = useRoomStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!socket || !user || !currentRoom || !isConnected) return;

    socket.on("typing", (data: { userId: string; username: string }) => {
      setTypingUser(data.username);
      console.log("typingUser:", data.username);
    });

    socket.on("stop_typing", (data: { userId: string; username: string }) => {
      setStopTypingUser();
      console.log("stop_typing:", data.username);
    });

    return () => {
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [socket, user, currentRoom, isConnected]);

  return { typingUser, setTypingUser, setStopTypingUser };
}

export default useTypingIndicator;
