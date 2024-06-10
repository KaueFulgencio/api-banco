import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountSchema } from './interfaces/schemas/account.schema';
import { NotificationModule } from '../notification/notification.module';
import { AuthModule } from '../auth/auth.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotificationModule,
    AuthModule,
    forwardRef(() => TransactionModule),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
