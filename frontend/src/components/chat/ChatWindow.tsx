"use client";

import { useRoomStore } from "@/app/stores/roomStore";
import { useChat } from "@/hooks/useChat";
import useTypingIndicator from "@/hooks/useTypingIndicator";
import ChatEmptyState from "./ChatEmptyState";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./Messagelist";

const ChatWindow = () => {
    useChat();
    const { currentRoom } = useRoomStore();
    const { typingUser } = useTypingIndicator();

    if (!currentRoom) {
        return <ChatEmptyState />;
    }

    return (
        <div className="flex flex-col h-full bg-[#0b141a]">
            <ChatHeader room={currentRoom} typingUser={typingUser} />

            <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#0b141a]">
                <MessageList />
            </div>

            <div className="flex-shrink-0">
                <MessageInput />
            </div>
        </div>
    );
};

export default ChatWindow;
