import mongoose from "mongoose";

export interface Transaction extends mongoose.Document {
    type: 'entrada' | 'saída';
    amount: number;
    date: Date;
    description?: string;
}
