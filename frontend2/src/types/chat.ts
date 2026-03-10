
export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  typingUser: string;
  setMessages: (msgs: ChatMessage[]) => void;
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
  setTypingUser: (username: string) => void;
  setStopTypingUser: () => void;
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