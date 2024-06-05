import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kauemf:ccrh2OsywqgXQPeb@cluster0.bziub7c.mongodb.net/'),
    AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
