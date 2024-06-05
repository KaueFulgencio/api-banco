import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Logger,
  Patch,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountRequest, CreateAccountResponse } from './Models';
import { Account } from '../account/interfaces/account.interface';
import { UpdateBalanceRequest } from './dto/update-amount.dto';
import { Transaction } from './interfaces/transaction.interface';

@Controller('accounts')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);

  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountRequest: CreateAccountRequest): Promise<CreateAccountResponse> {
    this.logger.log('Received request to create account');
    return this.accountService.create(createAccountRequest);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Account> {
    this.logger.log(`Received request to find account by ID: ${id}`);
    const account = await this.accountService.findById(id);
    if (!account) {
      this.logger.warn(`Account not found for ID: ${id}`);
      throw new NotFoundException('Conta não encontrada');
    }
    return account;
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<Account> {
    this.logger.log(`Received request to find account by email: ${email}`);
    const account = await this.accountService.findByEmail(email);
    if (!account) {
      this.logger.warn(`Account not found for email: ${email}`);
      throw new NotFoundException('Conta não encontrada');
    }
    return account;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedAccount: Account): Promise<Account> {
    this.logger.log(`Received request to update account ID: ${id}`);
    const account = await this.accountService.update(id, updatedAccount);
    if (!account) {
      this.logger.warn(`Account not found for ID: ${id}`);
      throw new NotFoundException('Conta não encontrada');
    }
    return account;
  }

  @Get(':id/saldo')
  async getBalance(@Param('id') id: string): Promise<number> {
    this.logger.log(`Received request to get balance for account ID: ${id}`);
    const balance = await this.accountService.getBalance(id);
    return balance;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    this.logger.log(`Received request to delete account ID: ${id}`);
    const deleted = await this.accountService.delete(id);
    if (!deleted) {
      this.logger.warn(`Account not found for ID: ${id}`);
      throw new NotFoundException('Conta não encontrada');
    }
    return deleted;
  }

  @Post(':id/pix')
  async createPixKey(@Param('id') id: string, @Body() pixKeyDto: { type: string, key: string }): Promise<Account> {
    const { type, key } = pixKeyDto;
    return this.accountService.createPixKey(id, type, key);
  }


  @Get(':id/pix')
  async listPixKeys(@Param('id') id: string): Promise<{ type: string; key: string; createdAt: Date }[]> {
    return this.accountService.listPixKeys(id);
  }

  @Patch(':id/balance')
  async updateBalance(@Param('id') id: string, @Body() updateBalanceRequest: UpdateBalanceRequest) {
    return this.accountService.updateBalance(id, updateBalanceRequest);
  }

  @Post(':id/transaction')
    async registerTransaction(
        @Param('id') id: string,
        @Body('type') type: 'entrada' | 'saída',
        @Body('amount') amount: number,
        @Body('description') description?: string
    ) {
        const updatedAccount = await this.accountService.registerTransaction(id, type, amount, description);
        return updatedAccount.transacoes; 
    }

  @Get(':id/transactions')
  async listTransactions(@Param('id') id: string): Promise<Transaction[]> {
    return this.accountService.listTransactions(id);
}


}
