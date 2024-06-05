import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyMfaDto } from './dto/verify-mfa.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateMfa(user: any) {
    const mfaCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.mfaCode = mfaCode;
    user.mfaCodeExpire = new Date(new Date().getTime() + 10 * 60000); 
    await user.save();
    return { message: 'MFA code generated and sent' };
  }

  async verifyMfa(verifyMfaDto: VerifyMfaDto) {
    const user = await this.userModel.findOne({ email: verifyMfaDto.email }).exec();
    if (user && user.mfaCode === verifyMfaDto.code && new Date() < new Date(user.mfaCodeExpire)) {
      return { message: 'MFA verification successful' };
    }
    throw new UnauthorizedException('Invalid MFA code');
  }
}
