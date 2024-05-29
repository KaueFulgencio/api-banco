import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransferRequest } from './dto/transaction.dto';
import { Transaction } from './interfaces/transaction.interface';
import { UpdateBalanceRequest } from 'src/account/dto/update-amount.dto';
import { AccountService } from 'src/account/account.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly accountService: AccountService, 
  ) {}
  
  @Post()
  async create(@Body() createTransactionDto: TransferRequest): Promise<Transaction> {
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

  async transfer(transferRequest: TransferRequest): Promise<void> {
    const debitRequest: UpdateBalanceRequest = {
        accountId: transferRequest.fromAccount,
        amount: -transferRequest.amount
    };

    const creditRequest: UpdateBalanceRequest = {
        accountId: transferRequest.toAccount,
        amount: transferRequest.amount
    };

    await this.accountService.updateBalance(debitRequest.accountId, debitRequest);

    await this.accountService.updateBalance(creditRequest.accountId, creditRequest);

    await this.create({
      fromAccount: transferRequest.fromAccount,
      toAccount: transferRequest.toAccount,
      amount: transferRequest.amount,
      type: transferRequest.type,
      timestamp: new Date(),
    });
}
}
