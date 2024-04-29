import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionRequest } from './Models/index';
import { CreateTransactionResponse } from './Models/index';
import { TransferRequest } from './dto/transaction.dto';
import { AccountService } from 'src/account/account.service';
// import { AccountService } from '../account/account.service'; 
// import { UpdateBalanceRequest } from 'src/account/dto/update-amount.dto'; 

@Injectable()
export class TransactionsService {
    constructor(
        @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>,
        // private readonly accountService: AccountService  
    ) {}

    async create(createTransactionDto: TransferRequest): Promise<Transaction> {
        const createdTransaction = new this.transactionModel(createTransactionDto);
        return createdTransaction.save();
    }

    async findAll(accountId: string): Promise<Transaction[]> {
        return this.transactionModel.find({ accountId }).exec();
    }

    async findById(id: string): Promise<Transaction> {
        return this.transactionModel.findById(id).exec();
    }

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

    async transfer(transferRequest: TransferRequest): Promise<void> {
        // Lógica de transferência aqui
    }
    
}
