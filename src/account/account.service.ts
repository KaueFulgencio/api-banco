import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountRequest } from './Models/index';
import { CreateAccountResponse } from './Models/index';
import { Account } from '../account/interfaces/account.interface';
import { UpdateBalanceRequest } from './dto/update-amount.dto';

@Injectable()
export class AccountService {
    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) {}

    async create(createAccountRequest: CreateAccountRequest): Promise<CreateAccountResponse> {
        const newAccount = new this.accountModel(createAccountRequest);
        const savedAccount = await newAccount.save();
        return {
            success: true,
            message: 'Conta criada com sucesso',
            account: savedAccount
        };
    }

    async updateBalance(id: string, updateBalanceRequest: UpdateBalanceRequest): Promise<Account> {
        const account = await this.findById(id);
        if (!account) {
            throw new NotFoundException('Conta não encontrada');
        }
    
        account.saldo += updateBalanceRequest.amount;
        const updatedAccount = await account.save();
        return updatedAccount;
    }

    async findById(id: string): Promise<Account | null> {
        try {
            const account = await this.accountModel.findById(id).exec();
            if (!account) {
                throw new NotFoundException('Conta não encontrada');
            }
            return account;
        } catch (error) {
            throw new NotFoundException('Conta não encontrada');
        }
    }

    async findByEmail(email: string): Promise<Account | null> {
        try {
            const account = await this.accountModel.findOne({ email }).exec();
            if (!account) {
                throw new NotFoundException('Conta não encontrada');
            }
            return account;
        } catch (error) {
            throw new NotFoundException('Conta não encontrada');
        }
    }

    async update(id: string, updatedAccount: Account): Promise<Account> {
        const account = await this.findById(id);
        if (!account) {
            throw new NotFoundException('Conta não encontrada');
        }
        
        Object.assign(account, updatedAccount);
        const updated = await account.save();
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.accountModel.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0;
    }

    async authenticate(email: string, senha: string): Promise<Account | null> {
        try {
            const account = await this.accountModel.findOne({ email, senha }).exec();
            if (!account) {
                throw new NotFoundException('Credenciais inválidas');
            }
            return account;
        } catch (error) {
            throw new NotFoundException('Credenciais inválidas');
        }
    }

}
