import { Injectable, NotFoundException, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountRequest, CreateAccountResponse } from './Models';
import { Account } from '../account/interfaces/account.interface';
import { UpdateBalanceRequest } from './dto/update-amount.dto';
import { UpdateAccountDto } from './interfaces/update-account.interface';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AccountService {
    private readonly logger = new Logger(AccountService.name);

    constructor(
        @InjectModel('Account') private readonly accountModel: Model<Account>,
        private readonly authService: AuthService,  
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
    
          const createUserDto = {
            email: createAccountRequest.email,
            password: createAccountRequest.password,
            roles: ['user']  
          };
          const newUser = await this.authService.register(createUserDto);
          
          // Gere o token JWT
          const token = await this.authService.login({ email: createAccountRequest.email, userId: newUser._id });
    
          this.logger.log(`Account created with ID: ${savedAccount._id}`);
          return {
            success: true,
            message: 'Conta criada com sucesso',
            account: savedAccount,
            token: token.access_token  
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

    async findAccountWithTransactions(email: string): Promise<Account> {
      const account = await this.accountModel.findOne({ email }).populate('transacoes').exec();
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

    async updateByEmail(email: string, updatedAccount: UpdateAccountDto): Promise<Account> {
        const account = await this.accountModel.findOne({ email });
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

      async delete(email: string): Promise<boolean> {
        this.logger.log(`Deleting account email: ${email}`);
        const result = await this.accountModel.deleteOne({ email }).exec(); 
        const success = result.deletedCount > 0;
        if (success) {
          this.logger.log(`Account deleted for email: ${email}`);
        } else {
          this.logger.warn(`Account not found for email: ${email}`);
          throw new NotFoundException('Conta não encontrada');
        }
        return success;
      }
      
    async getBalance(email: string): Promise<{ balance: number }> {
      this.logger.log(`Getting balance for account email: ${email}`);
      const account = await this.findByEmail(email);
      if (!account) {
          throw new NotFoundException('Conta não encontrada');
      }
      const balance = account.saldo;
      this.logger.log(`Balance for account email ${email}: ${balance}`);
      return { balance };
     }

     async findAccountWithPixKeysByEmail(email: string): Promise<Account> {
      const account = await this.accountModel
          .findOne({ email })
          .populate('pixKeys')
          .exec();
      if (!account) {
          this.logger.warn(`Conta não encontrada para o email: ${email}`);
          throw new NotFoundException('Conta não encontrada');
      }
      return account;
  }
    
      async findAccountByPixKey(pixKey: string): Promise<Account> {
        return await this.accountModel.findOne({ 'pixKeys.key': pixKey });
      }

      async sendPix(fromEmail: string, toEmail: string, amount: number): Promise<{ success: boolean, message: string }> {
        this.logger.log(`Initiating PIX transfer from ${fromEmail} to ${toEmail} with amount: ${amount}`);

        if (amount <= 0) {
            throw new BadRequestException('O valor deve ser maior que zero');
        }

        const fromAccount = await this.findByEmail(fromEmail);
        const toAccount = await this.findByEmail(toEmail);

        if (!fromAccount || !toAccount) {
            throw new NotFoundException('Uma das contas não foi encontrada');
        }

        if (fromAccount.saldo < amount) {
            throw new BadRequestException('Saldo insuficiente na conta de origem');
        }

        const session = await this.accountModel.db.startSession();
        session.startTransaction();

        try {
            fromAccount.saldo -= amount;
            toAccount.saldo += amount;

            await fromAccount.save({ session });
            await toAccount.save({ session });

            await session.commitTransaction();
            session.endSession();

            this.logger.log(`PIX transfer from ${fromEmail} to ${toEmail} completed successfully`);

            return { success: true, message: 'Transferência PIX realizada com sucesso' };
        } catch (error) {
            await session.abortTransaction();
            session.endSession();

            this.logger.error(`Failed to complete PIX transfer from ${fromEmail} to ${toEmail}: ${error.message}`);
            throw new InternalServerErrorException('Erro ao realizar transferência PIX');
        }
    }
}
