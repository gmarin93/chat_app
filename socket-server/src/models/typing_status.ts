import mongoose, { Document, Schema } from "mongoose";

export interface ITypingStatus extends Document {
    roomId: string;
    userId: string;
    username: string;
    isTyping: boolean;
    lastTyping: Date;
}

export const typingStatusSchema = new Schema<ITypingStatus>({
    roomId: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    isTyping: { type: Boolean, default: false },
    lastTyping: { type: Date, default: Date.now }
});

// Auto-delete old typing statuses (cleanup)
typingStatusSchema.index(
    { lastTyping: 1 },
    { expireAfterSeconds: 30 }  // Delete after 30 seconds
);