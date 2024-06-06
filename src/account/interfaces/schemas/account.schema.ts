import * as mongoose from 'mongoose';
import { PixKeySchema } from './pix-key.schema';

export const AccountSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  telefone: { type: String, unique: true },
  nome: { type: String },
  senha: { type: String },
  ocupacao: { type: String },
  endereco: { type: String },
  tipo: { type: String },
  urlFotoAccount: { type: String },
  saldo: { type: Number, default: 0 },
  pixKeys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pix' }],
  /*
  pixKeys: {
    type: [PixKeySchema],
    default: [],
    validate: [(val: any[]) => val.length <= 5, '{PATH} exceeds the limit of 5']
  },*/
  transacoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
}, { timestamps: true, collection: 'account' });
