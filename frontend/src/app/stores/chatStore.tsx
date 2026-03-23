import { create } from "zustand";
import { ChatMessage } from "@/types/chat";
import { ChatState } from "@/types/chat";
import { User } from "@/types/user";
import ChatService from "@/services/chat";


export const useChatStore = create<ChatState>()((set) => ({
    messages: [],
    contacts: [],
    isLoading: false,
    username: "",
    setMessages: (msgs: ChatMessage[]) => set({ messages: msgs }),
    setContacts: (contacts: User[]) => set({ contacts: contacts }),
    addMessage: (msg: ChatMessage) => set((state) => ({ messages: [...state.messages, msg] })),
    clearMessages: () => set({ messages: [] }),
    setTypingUser: (username: string) => set({ username: username }),
    setStopTypingUser: () => set({ username: "" }),
    setLeaveUser: (username: string) => set({ username: username }),
    getAllUsers: async () => {
        set({ isLoading: true });
        const response = await ChatService.getAllUsers();
        console.log("response:", response);
        set({ contacts: response });
        set({ isLoading: false });
    },
}));