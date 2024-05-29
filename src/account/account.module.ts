import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountSchema } from './interfaces/account.schema';
import { JwtStrategy } from '../auth/JwtStrategy';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService, JwtStrategy, JwtAuthGuard],
  exports: [AccountService],
})
export class AccountModule {}
