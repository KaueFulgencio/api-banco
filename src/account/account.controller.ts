import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
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
        return this.accountService.findById(id);
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string): Promise<Account> {
        return this.accountService.findByEmail(email);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatedAccount: Account): Promise<Account> {
        return this.accountService.update(id, updatedAccount);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<boolean> {
        return this.accountService.delete(id);
    }

    @Post('authenticate')
    async authenticate(@Body() credentials: { email: string, senha: string }): Promise<Account> {
        return this.accountService.authenticate(credentials.email, credentials.senha);
    }
}
