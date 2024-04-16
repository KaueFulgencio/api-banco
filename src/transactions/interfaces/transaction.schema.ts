import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  type: { type: String, enum: ['deposit', 'withdrawal', 'transfer'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
});
