import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    type: { type: String, enum: ['entrada', 'saída'], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
});
