import { Controller, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountRequest } from '../account/Models/request/create-account.request';
import { CreateAccountResponse } from '../account/Models/response/create-account.response';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post()
    async create(@Body() createAccountRequest: CreateAccountRequest): Promise<CreateAccountResponse> {
        return this.accountService.create(createAccountRequest);
    }
}
