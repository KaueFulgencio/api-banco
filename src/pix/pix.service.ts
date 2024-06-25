import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountService } from '../account/account.service';
import { Pix} from './interfaces/pix.interface';
import { Account } from '../account/interfaces/account.interface';
import { CreatePixDto } from './dto/create-pix.dto';

@Injectable()
export class PixService {
  private readonly logger = new Logger(PixService.name);
  
  constructor(
    @InjectModel('Pix') private readonly pixModel: Model<Pix>,
    private readonly accountService: AccountService,
  ) {}

  async createPixKey(email: string, createPixDto: CreatePixDto): Promise<Pix> {
    const account: Account = await this.accountService.findAccountWithPixKeysByEmail(email);
    if (!account) {
      this.logger.error(`Conta não encontrada para o email ${email}`);
      throw new NotFoundException('Conta não encontrada');
    }
    if (account.pixKeys.length >= 5) {
      this.logger.error(`Limite máximo de chaves Pix atingido para a conta ${account._id}`);
      throw new BadRequestException('Limite máximo de chaves Pix atingido');
    }
  
    const existingPixKey = await this.pixModel.findOne({ key: createPixDto.key }).exec();
    if (existingPixKey) {
      this.logger.error(`Chave Pix duplicada: ${createPixDto.key}`);
      throw new BadRequestException('Chave Pix já existe');
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
      this.logger.error(`Conta não encontrada para o email ${email}`);
      throw new NotFoundException('Conta não encontrada');
    }
    return this.pixModel.find({ _id: { $in: account.pixKeys } }).exec();
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
  
    await account.save();
  }
  
}
