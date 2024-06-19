import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class SendPixDto {
  @IsString()
  @IsNotEmpty()
  readonly fromAccount: string;

  @IsString()
  @IsNotEmpty()
  readonly toAccount: string;

  @IsNumber()
  @Min(0.01)
  readonly amount: number;
}
