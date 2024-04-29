import { IsString, IsNumber, IsDate } from 'class-validator';

export class TransferRequest {
    @IsString()
    fromAccount: string;

    @IsString()
    toAccount: string;

    @IsNumber()
    amount: number;

    @IsString()
    type: string;

    timestamp: Date;
}
