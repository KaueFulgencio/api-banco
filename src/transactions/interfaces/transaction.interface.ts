import { Document } from 'mongoose';

export interface Transaction extends Document {
  accountId: string;
  type: string;
  amount: number;
  date: Date;
  description?: string;
}
