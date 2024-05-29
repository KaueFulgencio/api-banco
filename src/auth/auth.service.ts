import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.accountService.findByEmail(email);
    if (user && await bcrypt.compare(senha, user.senha)) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}