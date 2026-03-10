import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const mongoConnect = () => mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/chatapp_messages')
  .then((db) => {
    console.log('✅ Connected to MongoDB');
    return db;
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));