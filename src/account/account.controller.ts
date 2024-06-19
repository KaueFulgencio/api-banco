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
  UseGuards 
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountRequest, CreateAccountResponse } from './Models';
import { Account } from '../account/interfaces/account.interface';
import { UpdateBalanceRequest } from './dto/update-amount.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAccountDto } from './interfaces/update-account.interface';

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

  @Patch(':email')
  async update(@Param('email') email: string, @Body() updatedAccount: UpdateAccountDto): Promise<Account> {
    try {
      const account = await this.accountService.updateByEmail(email, updatedAccount);
      return account;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get(':email/saldo')
  //@UseGuards(AuthGuard('jwt'))
  async getBalance(@Param('email') email: string): Promise<{ balance: number }> {
    this.logger.log(`Received request to get balance for account email: ${email}`);
    const balance = await this.accountService.getBalance(email);
    return balance;
  }

  @Delete(':email')
  async delete(@Param('email') email: string): Promise<boolean> {
    this.logger.log(`Received request to delete email: ${email}`);
    const deleted = await this.accountService.delete(email);
    if (!deleted) {
      this.logger.warn(`Account not found for email: ${email}`);
      throw new NotFoundException('Conta não encontrada');
    }
    return deleted;
  }

  /*
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
  }*/
}
