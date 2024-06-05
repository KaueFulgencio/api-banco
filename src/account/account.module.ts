import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountSchema } from './interfaces/schemas/account.schema';
import { TransactionSchema } from './interfaces/schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }, { name: 'Transaction', schema: TransactionSchema }]),
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
