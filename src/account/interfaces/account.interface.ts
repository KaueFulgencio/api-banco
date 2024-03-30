import { Document } from "mongoose";

export interface Account extends Document{
    readonly telefone: string;
    nome: string;
    email: string;
    senha: string;
    ocupacao: string;
    endereco: string;
    tipo: string;
    urlFotoAccount: string;
}