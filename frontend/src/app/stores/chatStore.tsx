import { create } from "zustand";
import { ChatMessage } from "@/types/chat";
import { ChatState } from "@/types/chat";


export const useChatStore = create<ChatState>()((set) => ({
    messages: [],
    isLoading: false,
    typingUser: "",
    setMessages: (msgs: ChatMessage[]) => set({ messages: msgs }),
    addMessage: (msg: ChatMessage) => set((state) => ({ messages: [...state.messages, msg] })),
    clearMessages: () => set({ messages: [] }),
    setTypingUser: (username: string) => set({ typingUser: username }),
    setStopTypingUser: () => set({ typingUser: "" }),
}));