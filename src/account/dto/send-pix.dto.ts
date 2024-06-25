import { IsEmail, IsNumber, Min } from 'class-validator';

export class SendPixDto {
    @IsEmail()
    fromEmail: string;

    @IsEmail()
    toEmail: string;

    @IsNumber()
    @Min(0.01)
    amount: number;
}
