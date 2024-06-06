import { Document } from 'mongoose';

export interface Pix extends Document {
  type: string;
  key: string;
  createdAt: Date;
  account: string;
}
