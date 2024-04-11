import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountRequest } from '../account/Models/request/create-account.request';
import { CreateAccountResponse } from '../account/Models/response/create-account.response';
import { Account } from '../account/interfaces/account.interface';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post()
    async create(@Body() createAccountRequest: CreateAccountRequest): Promise<CreateAccountResponse> {
        return this.accountService.create(createAccountRequest);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Account> {
        const account = await this.accountService.findById(id);
        if (!account) {
            throw new NotFoundException('Conta não encontrada');
        }
        return account;
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string): Promise<Account> {
        const account = await this.accountService.findByEmail(email);
        if (!account) {
            throw new NotFoundException('Conta não encontrada');
        }
        return account;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatedAccount: Account): Promise<Account> {
        const account = await this.accountService.update(id, updatedAccount);
        if (!account) {
            throw new NotFoundException('Conta não encontrada');
        }
        return account;
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<boolean> {
        const deleted = await this.accountService.delete(id);
        if (!deleted) {
            throw new NotFoundException('Conta não encontrada');
        }
        return deleted;
    }

    @Post('authenticate')
    @HttpCode(HttpStatus.OK)
    async authenticate(@Body() credentials: { email: string, senha: string }): Promise<Account> {
        const account = await this.accountService.authenticate(credentials.email, credentials.senha);
        if (!account) {
            throw new NotFoundException('Credenciais inválidas');
        }
        return account;
    }
}
