import { Document } from 'mongoose';

export interface Account extends Document {
    email: string;
    telefone: string;
    nome: string;
    senha: string;
    ocupacao: string;
    endereco: string;
    tipo: string;
    urlFotoAccount: string;
    saldo: number; 
}
