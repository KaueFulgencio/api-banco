import * as mongoose from 'mongoose';

export const PixKeySchema = new mongoose.Schema({
    type: { type: String, enum: ['CPF', 'QR_CODE', 'TELEFONE', 'CHAVE_ALEATORIA'], required: true },
    key: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
