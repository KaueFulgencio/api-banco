import { Schema } from 'mongoose';

export const PixSchema = new Schema({
  type: { type: String, required: true },
  key: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
});
