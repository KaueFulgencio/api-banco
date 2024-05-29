import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateAccountRequest, CreateAccountResponse } from './Models';
import { Account } from '../account/interfaces/account.interface';
import { UpdateBalanceRequest } from './dto/update-amount.dto';

@Injectable()
export class AccountService {
    private readonly logger = new Logger(AccountService.name);

    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) {}

    async create(createAccountRequest: CreateAccountRequest): Promise<CreateAccountResponse> {
        this.logger.log(`Creating account for email: ${createAccountRequest.email}`);
        createAccountRequest.senha = await this.hashPassword(createAccountRequest.senha);
        const newAccount = new this.accountModel(createAccountRequest);
        const savedAccount = await newAccount.save();
        this.logger.log(`Account created with ID: ${savedAccount._id}`);
        return {
            success: true,
            message: 'Conta criada com sucesso',
            account: savedAccount
        };
    }

    async updateBalance(id: string, updateBalanceRequest: UpdateBalanceRequest): Promise<Account> {
        this.logger.log(`Updating balance for account ID: ${id}`);
        const account = await this.findById(id);
        if (!account) {
            this.logger.warn(`Account not found for ID: ${id}`);
            throw new NotFoundException('Conta não encontrada');
        }
        account.saldo += updateBalanceRequest.amount;
        const updatedAccount = await account.save();
        this.logger.log(`Balance updated for account ID: ${id}`);
        return updatedAccount;
    }

    async findById(id: string): Promise<Account | null> {
        this.logger.log(`Finding account by ID: ${id}`);
        try {
            const account = await this.accountModel.findById(id).exec();
            if (!account) {
                this.logger.warn(`Account not found for ID: ${id}`);
                throw new NotFoundException('Conta não encontrada');
            }
            return account;
        } catch (error) {
            this.logger.error(`Error finding account by ID: ${id}`, error.stack);
            throw new NotFoundException('Conta não encontrada');
        }
    }

    async findByEmail(email: string): Promise<Account | null> {
        this.logger.log(`Finding account by email: ${email}`);
        try {
            const account = await this.accountModel.findOne({ email }).exec();
            if (!account) {
                this.logger.warn(`Account not found for email: ${email}`);
                throw new NotFoundException('Conta não encontrada');
            }
            return account;
        } catch (error) {
            this.logger.error(`Error finding account by email: ${email}`, error.stack);
            throw new NotFoundException('Conta não encontrada');
        }
    }

    async update(id: string, updatedAccount: Account): Promise<Account> {
        this.logger.log(`Updating account ID: ${id}`);
        const account = await this.findById(id);
        if (!account) {
            this.logger.warn(`Account not found for ID: ${id}`);
            throw new NotFoundException('Conta não encontrada');
        }
        Object.assign(account, updatedAccount);
        const updated = await account.save();
        this.logger.log(`Account updated for ID: ${id}`);
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        this.logger.log(`Deleting account ID: ${id}`);
        const result = await this.accountModel.deleteOne({ _id: id }).exec();
        const success = result.deletedCount > 0;
        if (success) {
            this.logger.log(`Account deleted for ID: ${id}`);
        } else {
            this.logger.warn(`Account not found for ID: ${id}`);
        }
        return success;
    }

    async authenticate(email: string, senha: string): Promise<Account | null> {
        this.logger.log(`Authenticating account with email: ${email}`);
        try {
            const account = await this.accountModel.findOne({ email }).exec();
            if (!account) {
                this.logger.warn(`Invalid credentials for email: ${email}`);
                throw new NotFoundException('Credenciais inválidas');
            }
            const isPasswordValid = await this.comparePasswords(senha, account.senha);
            if (!isPasswordValid) {
                this.logger.warn(`Invalid credentials for email: ${email}`);
                throw new NotFoundException('Credenciais inválidas');
            }
            return account;
        } catch (error) {
            this.logger.error(`Error authenticating account with email: ${email}`, error.stack);
            throw new NotFoundException('Credenciais inválidas');
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    private async comparePasswords(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
