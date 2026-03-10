import { CHAT_ENDPOINTS } from '@/config/endpoints';
import apiClient from './api';
import { SendMessageData } from '@/types/chat';
import { ChatMessage } from '@/types/chat';

class ChatService {

    /**
     * Send a message to a room
     */
    async sendMessage(data: SendMessageData): Promise<ChatMessage> {
        try {
            const response = await apiClient.post(CHAT_ENDPOINTS.MESSAGES, data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to send message");
        }
    }
}

export default new ChatService();