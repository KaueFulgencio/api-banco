import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PixService } from './pix.service';
import { PixController } from './pix.controller';
import { PixSchema } from './interfaces/schemas/pix-key.schema';
import { PixTransactionSchema } from './interfaces/schemas/pix-transaction.schema';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Pix', schema: PixSchema },
      { name: 'PixTransaction', schema: PixTransactionSchema }
    ]),
    AccountModule,
  ],
  controllers: [PixController],
  providers: [PixService],
  exports: [PixService],
})
export class PixModule {}
