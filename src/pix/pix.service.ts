import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountService } from '../account/account.service';
import { Pix, SendPix } from './interfaces/pix.interface';
import { SendPixDto } from './dto/send-pix.dto';
import { Account } from '../account/interfaces/account.interface';
import { CreatePixDto } from './dto/create-pix.dto';

@Injectable()
export class PixService {
  constructor(
    @InjectModel('Pix') private readonly pixModel: Model<Pix>,
    @InjectModel('PixTransaction') private readonly pixTransactionModel: Model<SendPix>,
    private readonly accountService: AccountService,
  ) {}

  async createPixKey(email: string, createPixDto: CreatePixDto): Promise<Pix> {
    const account: Account = await this.accountService.findAccountWithPixKeysByEmail(email);
    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }
    if (account.pixKeys.length >= 5) {
      throw new BadRequestException('Limite máximo de chaves Pix atingido');
    }
    const newPixKey = new this.pixModel({
      ...createPixDto,
      account: account._id,
    });
    const savedPixKey = await newPixKey.save();
    account.pixKeys.push(savedPixKey._id);
    await account.save();
    return savedPixKey;
  }

  async listPixKeys(email: string): Promise<Pix[]> {
    const account: Account = await this.accountService.findAccountWithPixKeysByEmail(email);
    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }
    return account.pixKeys as unknown as Pix[];
  }

  async deletePixKey(email: string, pixId: string): Promise<void> {
    const account = await this.accountService.findAccountWithPixKeysByEmail(email);
    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }
  
    if (!account.pixKeys) {
      throw new NotFoundException('Chave Pix não encontrada');
    }
  
    let index = -1;
    for (let i = 0; i < account.pixKeys.length; i++) {
      if (account.pixKeys[i].toString() === pixId) {
        index = i;
        break;
      }
    }
  
    if (index !== -1) {
      account.pixKeys.splice(index, 1);
  
      await this.pixModel.findByIdAndDelete(pixId);
    }
  
    // Salva a conta atualizada
    await account.save();
  }
  
  async sendPix(sendPixDto: SendPixDto): Promise<SendPix> {
    const { fromAccount, toAccount, amount } = sendPixDto;

    const senderAccount: Account = await this.accountService.findAccountWithPixKeys(fromAccount);
    const receiverAccount: Account = await this.accountService.findAccountWithPixKeys(toAccount);

    if (!senderAccount || !receiverAccount) {
      throw new NotFoundException('Uma das contas não foi encontrada');
    }

    if (senderAccount.saldo < amount) {
      throw new BadRequestException('Saldo insuficiente na conta de origem');
    }

    senderAccount.saldo -= amount;
    receiverAccount.saldo += amount;

    await senderAccount.save();
    await receiverAccount.save();

    const newPixTransaction = new this.pixTransactionModel({ fromAccount, toAccount, amount });
    return await newPixTransaction.save();
  }
}
