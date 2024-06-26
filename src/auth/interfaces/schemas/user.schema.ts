import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['user'] },
  mfaCode: { type: String },
  mfaCodeExpire: { type: Date },
});
