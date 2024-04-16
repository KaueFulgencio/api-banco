import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    fromAccount: { type: String, required: true },
    toAccount: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
