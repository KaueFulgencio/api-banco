import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionSchema } from './interfaces/transaction.schema';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
    AccountModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
