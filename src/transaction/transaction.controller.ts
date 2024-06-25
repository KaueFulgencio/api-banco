import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './interfaces/transaction.interface';

@Controller('transaction')
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);

  constructor(
    private readonly transactionService: TransactionService,
  ) {}

  @Post(':email/transaction')
  async registerTransaction(
    @Param('email') email: string,
    @Body('type') type: 'entrada' | 'saída',
    @Body('amount') amount: number,
    @Body('description') description?: string
  ): Promise<Transaction[]> {
    const updatedAccount = await this.transactionService.registerTransaction(email, type, amount, description);
    return updatedAccount.transacoes;
  }

  @Get(':email/transactions')
  async listTransactions(@Param('email') email: string): Promise<Transaction[]> {
    return this.transactionService.listTransactions(email);
  }

}
