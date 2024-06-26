import { Document } from 'mongoose';
import { Transaction } from './transaction.interface';

export interface Account extends Document {
    password: string;
    email: string;
    telefone: string;
    nome: string;
    senha: string;
    ocupacao: string;
    endereco: string;
    tipo: string;
    urlFotoAccount: string;
    saldo: number;
    transacoes: Transaction[];
    pixKeys: string[];
}
