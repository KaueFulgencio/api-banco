import { IsString, IsEmail } from 'class-validator';

export class VerifyMfaDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}
