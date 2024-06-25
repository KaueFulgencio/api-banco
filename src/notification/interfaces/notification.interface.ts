import { Document } from 'mongoose';

export interface Notification extends Document {
    email: string;
    message: string;
    createdAt: Date;
    read: boolean;
  }
