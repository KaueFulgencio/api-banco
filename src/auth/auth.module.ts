import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './JwtStrategy'; 

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'root', // substitua por sua chave secreta real
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule], // Exporte o JwtModule se precisar usá-lo fora do AppModule
})
export class AuthModule {}
