import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { messageSchema } from './models/message';
import { mongoConnect } from './config/mongo_db';
import { socketHandler } from './sockets/socket_handler';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
const httpServer = createServer(app);

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));

// Socket.io setup
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'socket-server',
        uptime: process.uptime(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// MongoDB connection and server initialization
const initializeServer = async () => {
    try {
        console.log('📡 CORS enabled for:', process.env.CORS_ORIGIN || 'http://localhost:3000');
        
        await mongoConnect();
        const Message = mongoose.model('Message', messageSchema);

        socketHandler(io, Message);

        httpServer.listen(PORT, () => {
            console.log(`🚀 Socket server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
};

// Graceful shutdown
const gracefulShutdown = async () => {
    console.log('⏳ Shutting down gracefully...');
    
    httpServer.close(() => {
        console.log('✅ HTTP server closed');
    });
    
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    
    process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

initializeServer();