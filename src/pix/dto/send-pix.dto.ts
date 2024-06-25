import { IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class SendPixByEmailDto {
  @IsEmail()
  @IsNotEmpty()
  readonly toAccountEmail: string;

  @IsNumber()
  @Min(0.01)
  readonly amount: number;
}
