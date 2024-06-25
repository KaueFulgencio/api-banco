import { Document } from 'mongoose';

export interface Pix extends Document {
  type: string;
  key: string;
  createdAt: Date;
  account: string;
}

export interface SendPix extends Document {
  fromAccount: string;
  toAccount: string;
  amount: number;
  createdAt: Date;
}
