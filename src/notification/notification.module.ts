import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationSchema } from './interfaces/schemas/notification.schema';
import { AccountSchema } from 'src/account/interfaces/schemas/account.schema';
import { TransactionSchema } from 'src/account/interfaces/schemas/transaction.schema';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: 'Account', schema: AccountSchema }, 
          { name: 'Transaction', schema: TransactionSchema },
          { name: 'Notification', schema: NotificationSchema },
        ]),
        PassportModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: [NotificationService]
})
export class NotificationModule {}
