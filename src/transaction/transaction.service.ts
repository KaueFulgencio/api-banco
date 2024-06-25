import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from 'src/account/interfaces/account.interface';
import { Transaction } from './interfaces/transaction.interface';
import { NotificationService } from 'src/notification/notification.service';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>,
    private readonly notificationService: NotificationService,
    private readonly accountService: AccountService,
  ) {}

  async registerTransaction(email: string, type: 'entrada' | 'saída', amount: number, description?: string): Promise<Account> {
    const account = await this.accountService.findByEmail(email);
    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }
  
    const transaction = new this.transactionModel({
      type,
      amount,
      description,
    });
  
    try {
      const savedTransaction = await transaction.save();
      account.transacoes.push(savedTransaction);
      account.saldo += type === 'entrada' ? amount : -amount;
  
      const updatedAccount = await account.save();
  
      return updatedAccount;
    } catch (error) {
      throw new Error('Erro ao salvar transação: ' + error.message);
    }
  }
  

  async listTransactions(email: string): Promise<Transaction[]> {
    const account = await this.accountService.findAccountWithTransactions(email);
    return account.transacoes;
  }
  
}
