import { Document } from 'mongoose';

export interface Notification extends Document {
    userId: string;
    message: string;
    date: Date;
    read: boolean;
}
