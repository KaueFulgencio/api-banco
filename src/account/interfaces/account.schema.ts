import * as mongoose from 'mongoose'

export const AccountSchema = new mongoose.Schema({
    email: { type: String, unique: true},
    telefone: { type: String, unique: true},
    nome: { type: String},
    senha: { type: String},
    ocupacao: { type: String},
    endereco: { type: String},
    tipo: { type: String},
    urlFotoAccount: { type: String},
}, {timestamps: true, collection: 'account'})
