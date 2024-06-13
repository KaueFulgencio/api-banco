import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountRequest, CreateAccountResponse } from './Models';
import { Account } from '../account/interfaces/account.interface';
import { UpdateBalanceRequest } from './dto/update-amount.dto';
import { UpdateAccountDto } from './interfaces/update-account.interface';

@Injectable()
export class AccountService {
    private readonly logger = new Logger(AccountService.name);

    constructor(
    @InjectModel('Account') private readonly accountModel: Model<Account>,
) {}

    async create(createAccountRequest: CreateAccountRequest): Promise<CreateAccountResponse> {
        this.logger.log(`Creating account for email: ${createAccountRequest.email}`);
        try {
            const existingAccount = await this.accountModel.findOne({ email: createAccountRequest.email }).exec();
            if (existingAccount) {
                throw new BadRequestException('Já existe uma conta com este email');
            }
            const newAccount = new this.accountModel(createAccountRequest);
            const savedAccount = await newAccount.save();
            this.logger.log(`Account created with ID: ${savedAccount._id}`);
            return {
                success: true,
                message: 'Conta criada com sucesso',
                account: savedAccount
            };
        } catch (error) {
            throw new Error('Erro ao criar conta: ' + error.message);
        }
    }

    async updateBalance(id: string, updateBalanceRequest: UpdateBalanceRequest): Promise<Account> {
        this.logger.log(`Updating balance for account ID: ${id}`);
        const account = await this.findById(id);
        if (!account) {
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
                throw new NotFoundException('Conta não encontrada');
            }
            return account;
        } catch (error) {
            throw new NotFoundException('Conta não encontrada');
        }
    }

    async findAccountWithTransactions(id: string): Promise<Account> {
        const account = await this.accountModel.findById(id).populate('transacoes').exec();
        if (!account) {
          throw new NotFoundException('Conta não encontrada');
        }
        return account;
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

    async findAccountWithPixKeys(accountId: string): Promise<Account> {
        const account = await this.accountModel.findById(accountId).populate('pixKeys').exec();
        if (!account) {
            throw new NotFoundException('Conta não encontrada');
        }
        return account;
    }

    async update(id: string, updatedAccount: UpdateAccountDto): Promise<Account> {
        const account = await this.accountModel.findById(id);
        if (!account) {
            throw new NotFoundException('Conta não encontrada');
        }
    
        if (updatedAccount.pixKeys && !Array.isArray(updatedAccount.pixKeys)) {
            updatedAccount.pixKeys = JSON.parse(updatedAccount.pixKeys); 
        }
    
        Object.assign(account, updatedAccount);
    
        try {
            const updated = await account.save();
            return updated;
        } catch (error) {
            throw new Error('Erro ao salvar a conta atualizada');
        }
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

    async getBalance(id: string): Promise<{ balance: number }> {
        this.logger.log(`Getting balance for account ID: ${id}`);
        const account = await this.findById(id);
        if (!account) {
            throw new NotFoundException('Conta não encontrada');
        }
        const balance = account.saldo;
        this.logger.log(`Balance for account ID ${id}: ${balance}`);
        return { balance };
    }

    async createPixKey(accountId: string, type: string, key: string): Promise<Account> {
        if (!['CPF', 'QR_CODE', 'TELEFONE', 'CHAVE_ALEATORIA'].includes(type)) {
            throw new BadRequestException('Tipo de chave Pix inválido');
        }
        const account = await this.accountModel.findById(accountId);
        if (!account) {
            throw new NotFoundException('Conta não encontrada');
        }
        if (account.pixKeys.length >= 5) {
            throw new BadRequestException('Limite máximo de chaves Pix atingido');
        }
        const pixKey = { type, key, createdAt: new Date() };
        const updatedAccount = await this.accountModel.findByIdAndUpdate(
            accountId,
            { $push: { pixKeys: pixKey } },
            { new: true }
        ).exec();
        if (!updatedAccount) {
            throw new NotFoundException('Conta não encontrada após a atualização');
        }
        return updatedAccount;
    }
    
    async listPixKeys(accountId: string): Promise<{ type: string; key: string; createdAt: Date }[]> {
        const account = await this.accountModel.findById(accountId).lean().exec();
    
        if (!account) {
            throw new NotFoundException('Conta não encontrada'); 
        }
        if (!Array.isArray(account.pixKeys)) {
            throw new Error('Tipo de dados inválido para pixKeys');
        }
        return account.pixKeys.map((pixKey: any) => ({
            type: pixKey.type,
            key: pixKey.key,
            createdAt: pixKey.createdAt,
        }));
    }
}
