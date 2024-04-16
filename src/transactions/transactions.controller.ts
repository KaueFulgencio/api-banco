import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionRequest } from './Models/index';
import { CreateTransactionResponse } from './Models/index';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    async createTransaction(@Body() transactionData: CreateTransactionRequest): Promise<CreateTransactionResponse> {
        return await this.transactionsService.createTransaction(transactionData);
    }

    @Get(':id')
    async getTransactionById(@Param('id') id: string): Promise<Transaction> {
        const transaction = await this.transactionsService.getTransactionById(id);
        if (!transaction) {
            throw new NotFoundException('Transação não encontrada');
        }
        return transaction;
    }

    @Get('account/:accountId')
    async getTransactionsByAccountId(@Param('accountId') accountId: string): Promise<Transaction[]> {
        return await this.transactionsService.getTransactionsByAccountId(accountId);
    }
}
