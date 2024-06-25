import { Schema, Document } from 'mongoose';

export const NotificationSchema = new Schema({
  email: { type: String, required: true },  
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});
