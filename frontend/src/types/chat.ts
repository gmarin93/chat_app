import { Room } from "./room";
import { User } from "@/types/user";
export interface ChatState {
  messages: ChatMessage[];
  contacts: User[];
  isLoading: boolean;
  username: string;
  setMessages: (msgs: ChatMessage[]) => void;
  setContacts: (contacts: User[]) => void;
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
  setTypingUser: (username: string) => void;
  setStopTypingUser: () => void;
  setLeaveUser: (username: string) => void;
  getAllUsers: () => Promise<void>;
}

export interface SendMessageData {
  roomId: string;
  userId: string;
  username: string;
  content: string;
}

export interface ChatMessage {
  _id: string;
  roomId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
  edited: boolean;
}

export interface ChatHeaderProps {
  room: Room;
  username: string;
}
