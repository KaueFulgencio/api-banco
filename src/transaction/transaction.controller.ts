import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './interfaces/transaction.interface';

@Controller('transaction')
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);

  constructor(
    private readonly transactionService: TransactionService,
  ) {}

  @Post(':id/transaction')
  async registerTransaction(
    @Param('id') id: string,
    @Body('type') type: 'entrada' | 'saída',
    @Body('amount') amount: number,
    @Body('description') description?: string
  ) {
    const updatedAccount = await this.transactionService.registerTransaction(id, type, amount, description);
    return updatedAccount.transacoes;
  }

  @Get(':id/transactions')
  async listTransactions(@Param('id') id: string): Promise<Transaction[]> {
    return this.transactionService.listTransactions(id);
  }
}
