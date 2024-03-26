import { Account } from "src/account/interfaces/account.interface";

export class CreateAccountResponse {
    success: boolean;
    message: string;
    account: Account; 
}
