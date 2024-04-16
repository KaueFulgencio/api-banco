import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateTransactionRequest {
    @IsString()
    fromAccount: string;

    @IsString()
    toAccount: string;

    @IsNumber()
    amount: number;

    @IsString()
    type: string;

    @IsDate()
    timestamp: Date;
}
