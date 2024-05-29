import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kauemf:ccrh2OsywqgXQPeb@cluster0.bziub7c.mongodb.net/'),
    AccountModule,
    TransactionsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService, AuthService],
})
export class AppModule {}
