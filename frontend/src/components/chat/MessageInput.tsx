"use client";

import { useRef, useState } from "react";
import { useAuthStore } from "@/app/stores/authStore";
import { useRoomStore } from "@/app/stores/roomStore";
import EmojiButton from "./EmojiButton";
import MessageTextField from "./MessageTextField";
import SendButton from "./SendButton";
import { useSocketStore } from "@/app/stores/socketStore";
import { useChatStore } from "@/app/stores/chatStore";
import { User } from "@/types/user";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const user: User | null = useAuthStore((state) => state.user);
  const { currentRoom } = useRoomStore();
  const { socket } = useSocketStore();

  // inside MessageInput
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setTypingUser, setStopTypingUser } = useChatStore();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    // Emit typing start
    setTypingUser(user?.username || "");

    // Reset the stop timer on every keystroke
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setStopTypingUser();
    }, 2000); // stop after 2s of inactivity
  };

  const handleSend = () => {
    if (!message.trim()) return;

    setStopTypingUser();
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    socket?.emit("send_message", {
      roomId: currentRoom?.id || "",
      userId: user?.id,
      username: user?.username || "Unknown",
      content: message,
    });

    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#202c33]">
      <EmojiButton />
      <MessageTextField
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SendButton hasMessage={!!message.trim()} onClick={handleSend} />
    </div>
  );
};

export default MessageInput;
