"use client";

import { useAuthStore } from "@/app/stores/authStore";
import { useChatStore } from "@/app/stores/chatStore";
import { ChatMessage } from "@/types/chat";

const MOCK_MESSAGES: ChatMessage[]  = [
  {
    _id: "1",
    roomId: "",
    userId: "other",
    username: "Alice",
    content: "Hey everyone, welcome to the channel!",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    edited: false,
  },
  {
    _id: "2",
    roomId: "",
    userId: "other",
    username: "Alice",
    content: "Hey everyone, welcome to the channel!",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    edited: false,
  },
  {
    _id: "3",
    roomId: "",
    userId: "me",
    username: "You",
    content: "Thanks! Excited to be here.",
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    edited: false,
  },
  {
    _id: "4",
    roomId: "",
    userId: "other",
    username: "Bob",
    content: "This UI is looking great so far 🎨",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    edited: false,
  },
  {
    _id: "5",
    roomId: "",
    userId: "me",
    username: "You",
    content: "Agreed! Love the dark theme.",
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    edited: false,
  },
];

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const MessageList = () => {
  const { messages } = useChatStore();
  const { user } = useAuthStore();
  let combinedMessages: ChatMessage[] = [...messages, ...MOCK_MESSAGES];

  return (
    <div className="flex flex-col gap-1">
      {combinedMessages.map((msg) => {
        const isOwn = msg.userId === user?.id;
        return (
          <div
            key={msg._id}
            className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-1`}
          >
            <div
              className={`relative max-w-[65%] px-3 py-2 rounded-lg shadow-sm
                                ${
                                  isOwn
                                    ? "bg-[#005c4b] text-white rounded-tr-none"
                                    : "bg-[#202c33] text-white rounded-tl-none"
                                }`}
            >
              {!isOwn && (
                <p className="text-[#53bdeb] text-xs font-semibold mb-1">
                  {msg.username}
                </p>
              )}
              <p className="text-sm leading-relaxed break-words pr-10">
                {msg.content}
              </p>
              <span className="absolute bottom-1.5 right-2 text-[10px] text-gray-400 select-none whitespace-nowrap">
                {formatTime(msg.createdAt)}
                {isOwn && <span className="ml-1 text-[#53bdeb]">✓✓</span>}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
