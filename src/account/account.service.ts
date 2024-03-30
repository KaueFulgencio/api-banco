import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountRequest } from '../account/Models/request/create-account.request';
import { CreateAccountResponse } from '../account/Models/response/create-account.response';
import { Account } from '../account/interfaces/account.interface';

@Injectable()
export class AccountService {
    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) {}

    async create(createAccountRequest: CreateAccountRequest): Promise<CreateAccountResponse> {
        const createdAccount = new this.accountModel(createAccountRequest);
        const savedAccount = await createdAccount.save();
        return {
            success: true,
            message: 'Conta criada com sucesso',
            account: savedAccount
        };
    }

    async findById(id: string): Promise<Account> {
        return await this.accountModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<Account> {
        return await this.accountModel.findOne({ email }).exec();
    }

    async update(id: string, updatedAccount: Account): Promise<Account> {
        return await this.accountModel.findByIdAndUpdate(id, updatedAccount, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.accountModel.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0;
    }

    async authenticate(email: string, senha: string): Promise<Account> {
        return await this.accountModel.findOne({ email, senha }).exec();
    }
}
