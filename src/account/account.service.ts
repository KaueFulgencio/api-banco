// account.service.ts
import { Injectable } from '@nestjs/common';
import { CreateAccountRequest } from '../account/Models/request/create-account.request';
import { CreateAccountResponse } from '../account/Models/response/create-account.response';
import { Account } from '../account/interfaces/account.interface';

@Injectable()
export class AccountService {
    private accounts: Account[] = [];

    create(createAccountRequest: CreateAccountRequest): CreateAccountResponse {
        const account: Account = {
            _id: createAccountRequest._id,
            email: createAccountRequest.email,
            telefone: createAccountRequest.telefone,
            nome: createAccountRequest.nome,
            senha: createAccountRequest.senha,
            ocupacao: createAccountRequest.ocupacao,
            endereco: createAccountRequest.endereco,
            tipo: createAccountRequest.tipo,
            urlFotoAccount: createAccountRequest.urlFotoAccount
        };
        return {
            success: true,
            message: 'Conta criada com sucesso',
            account: account
        };
    }
}
