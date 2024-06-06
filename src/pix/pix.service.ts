import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountService } from '../account/account.service';
import { Pix } from './interfaces/pix.interface';
import { CreatePixDto } from './dto/create-pix.dto';
import { Account } from '../account/interfaces/account.interface';

@Injectable()
export class PixService {
  constructor(
    @InjectModel('Pix') private readonly pixModel: Model<Pix>,
    private readonly accountService: AccountService,
  ) {}

  async createPixKey(accountId: string, createPixDto: CreatePixDto): Promise<Pix> {
    const account: Account = await this.accountService.findById(accountId);
    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }
    if (account.pixKeys.length >= 5) {
      throw new BadRequestException('Limite máximo de chaves Pix atingido');
    }
    const newPixKey = new this.pixModel({
      ...createPixDto,
      account: accountId,
    });
    const savedPixKey = await newPixKey.save();
    account.pixKeys.push(savedPixKey._id); 
    await account.save();
    return savedPixKey;
  }

  async listPixKeys(accountId: string): Promise<Pix[]> {
    const account: Account = await this.accountService.findAccountWithPixKeys(accountId);
    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }
    return account.pixKeys as unknown as Pix[];
  }

  async deletePixKey(accountId: string, pixId: string): Promise<void> {
    const account = await this.accountService.findById(accountId);
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
  
  
}
