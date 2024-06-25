import { Document } from 'mongoose';
import { Transaction } from './transaction.interface';

export interface UpdateAccountDto extends Partial<Document> {
    password?: string;
    email?: string;
    telefone?: string;
    nome?: string;
    senha?: string;
    ocupacao?: string;
    endereco?: string;
    tipo?: string;
    urlFotoAccount?: string;
    saldo?: number;
    transacoes?: Transaction[];
    pixKeys?: { type: string, key: string, createdAt: Date }[];
}
