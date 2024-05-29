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
    UseGuards,
    Logger,
  } from '@nestjs/common';
  import { AccountService } from './account.service';
  import { CreateAccountRequest, CreateAccountResponse } from './Models';
  import { Account } from '../account/interfaces/account.interface';
  import { UpdateBalanceRequest } from './dto/update-amount.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('accounts')
  export class AccountController {
    private readonly logger = new Logger(AccountController.name);
  
    constructor(private readonly accountService: AccountService) {}
  
    @Post()
    async create(@Body() createAccountRequest: CreateAccountRequest): Promise<CreateAccountResponse> {
      this.logger.log('Received request to create account');
      return this.accountService.create(createAccountRequest);
    }
  
    @UseGuards(JwtAuthGuard)
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
  
    @UseGuards(JwtAuthGuard)
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
  
    @UseGuards(JwtAuthGuard)
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
  
    @UseGuards(JwtAuthGuard)
    @Put(':id/saldo')
    async updateBalance(@Param('id') id: string, @Body() updateBalanceRequest: UpdateBalanceRequest): Promise<Account> {
      this.logger.log(`Received request to update balance for account ID: ${id}`);
      const account = await this.accountService.updateBalance(id, updateBalanceRequest);
      if (!account) {
        this.logger.warn(`Account not found for ID: ${id}`);
        throw new NotFoundException('Conta não encontrada');
      }
      return account;
    }
  
    @UseGuards(JwtAuthGuard)
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
  }
  