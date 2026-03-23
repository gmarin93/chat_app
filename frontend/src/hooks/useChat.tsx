import { useEffect } from "react";
import { useSocketStore } from "@/app/stores/socketStore";
import { useRoomStore } from "@/app/stores/roomStore";
import { useChatStore } from "@/app/stores/chatStore";
import router from "next/router";

export const useChat = () => {
  const { socket, isConnected, connect } = useSocketStore();
  const { currentRoom } = useRoomStore();
  const {
    setMessages,
    addMessage,
    clearMessages,
    setTypingUser,
    setStopTypingUser,
    setLeaveUser,
  } = useChatStore();

  // Ensure socket is connected
  useEffect(() => {
    if (!isConnected) connect();
  }, []);

  // Join room & wire up listeners when room changes
  useEffect(() => {
    if (!socket || !currentRoom) return;

    clearMessages();
    socket.emit("join_room", currentRoom.id);
    socket.emit("get_messages", { roomId: currentRoom.id });

    socket.on("message_history", setMessages);
    socket.on("receive_message", addMessage);

    socket.on("user_typing", (data: { userId: string; username: string }) => {
      console.log(
        `👤 User ${data.username} is typing in room ${currentRoom?.id}`,
      );
      setTypingUser(data.username);
    });

    socket.on(
      "user_stop_typing",
      (data: { userId: string; username: string }) => {
        console.log(
          `👤 User ${data.username} stopped typing in room ${currentRoom?.id}`,
        );
        setStopTypingUser();
      },
    );

    socket.on("leave_room", (data: { roomId: string; username: string }) => {
      if (data.roomId === currentRoom?.id) {
        setLeaveUser(data.username);
        clearMessages();
        router.push("/");
      }
    });

    return () => {
      socket.emit("leave_room", currentRoom.id);
      socket.off("message_history");
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, [socket, currentRoom?.id, isConnected]);
};
