import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionRequest } from './Models/index';
import { CreateTransactionResponse } from './Models/index';

@Injectable()
export class TransactionsService {
    constructor(@InjectModel('Transaction') private readonly transactionModel: Model<Transaction>) {}

    async createTransaction(transactionData: CreateTransactionRequest): Promise<CreateTransactionResponse> {
        const createdTransaction = new this.transactionModel(transactionData);
        const savedTransaction = await createdTransaction.save();
        return {
            success: true,
            message: 'Transação criada com sucesso',
            transaction: savedTransaction
        };
    }

    async getTransactionById(transactionId: string): Promise<Transaction> {
        const transaction = await this.transactionModel.findById(transactionId).exec();
        if (!transaction) {
            throw new NotFoundException('Transação não encontrada');
        }
        return transaction;
    }

    async getTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
        return await this.transactionModel.find({ $or: [{ fromAccount: accountId }, { toAccount: accountId }] }).exec();
    }
}
