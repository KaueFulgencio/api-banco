import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './interfaces/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]) 
  ],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
