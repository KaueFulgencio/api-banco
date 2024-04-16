import { Transaction } from '../interfaces/transaction.interface';

export class CreateTransactionResponse {
    success: boolean;
    message: string;
    transaction?: Transaction;
}
