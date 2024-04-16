import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/transaction.dto';
import { Transaction } from './interfaces/transaction.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionService.create(createTransactionDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Transaction> {
    const transaction = await this.transactionService.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transação não encontrada');
    }
    return transaction;
  }

  @Get('/account/:accountId')
  async findAllByAccountId(@Param('accountId') accountId: string): Promise<Transaction[]> {
    return this.transactionService.findAll(accountId);
  }
}
