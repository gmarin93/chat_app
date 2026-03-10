import mongoose, { Model } from "mongoose";
import { Server, Socket } from "socket.io";
import { IMessage } from "../models/message";


const validateMessage = (data: { roomId: string; userId: string; username: string; content: string }) => {
    if (!data.roomId || !data.userId || !data.username || !data.content) {
        throw new Error('Missing required fields');
    }
    if (data.content.length > 1000) {
        throw new Error('Message too long');
    }
}

// Socket.io connection handling
export const socketHandler = (io: Server, Message: Model<IMessage>) => {
    io.on('connection', (socket: Socket) => {
        console.log(`🔌 User connected: ${socket.id}`);

        // Join a room
        socket.on('join_room', (roomId: string) => {
            socket.join(roomId);
            console.log(`👤 User ${socket.id} joined room: ${roomId}`);
            socket.to(roomId).emit('user_joined', { userId: socket.id });
        });

        // Leave a room
        socket.on('leave_room', (roomId: string) => {
            socket.leave(roomId);
            console.log(`👋 User ${socket.id} left room: ${roomId}`);
            socket.to(roomId).emit('user_left', { userId: socket.id });
        });

        // Send message
        socket.on('send_message', async (data: {
            roomId: string;
            userId: string;
            username: string;
            content: string;
        }) => {
            try {

                validateMessage(data);

                // Save message to MongoDB
                const message = await Message.create({
                    roomId: data.roomId,
                    userId: data.userId,
                    username: data.username,
                    content: data.content,
                    createdAt: new Date()
                });

                // Broadcast to all users in the room
                io.to(data.roomId).emit('receive_message', {
                    _id: message._id,
                    roomId: message.roomId,
                    userId: message.userId,
                    username: message.username,
                    content: message.content,
                    createdAt: message.createdAt
                });

                console.log(`💬 Message sent in room ${data.roomId} by ${data.username}`);
            } catch (error) {
                console.error('Error saving message:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        // Typing indicator
        socket.on('typing', (data: { roomId: string; username: string }) => {
            console.log(`👤 User ${data.username} is typing in room ${data.roomId}`);
            socket.to(data.roomId).emit('user_typing', {
                userId: socket.id,
                username: data.username
            });
        });

        // Stop typing
        socket.on('stop_typing', (data: { roomId: string; username: string }) => {
            console.log(`👤 User ${data.username} stopped typing in room ${data.roomId}`);
            socket.to(data.roomId).emit('user_stop_typing', {
                userId: socket.id,
                username: data.username
            });
        });

        // Get message history
        socket.on('get_messages', async (data: { roomId: string; limit?: number }) => {
            try {
                const messages = await Message
                    .find({ roomId: data.roomId })
                    .sort({ createdAt: -1 })
                    .limit(data.limit || 50)
                    .lean();

                socket.emit('message_history', messages.reverse());
            } catch (error) {
                console.error('Error fetching messages:', error);
                socket.emit('error', { message: 'Failed to fetch messages' });
            }
        });

        // Disconnect
        socket.on('disconnect', () => {
            console.log(`❌ User disconnected: ${socket.id}`);
        });
    })
};