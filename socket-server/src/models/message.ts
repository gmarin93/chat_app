import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
    roomId: string;
    userId: string;
    username: string;
    content: string;
    createdAt: Date;
    edited: boolean;
    editedAt?: Date;
}

export const messageSchema = new Schema<IMessage>({
    roomId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false },
    editedAt: { type: Date }
});

// Add indexes for performance
messageSchema.index({ roomId: 1, createdAt: -1 });