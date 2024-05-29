import { IsString, IsEmail, IsOptional, IsUrl } from 'class-validator';

export class CreateAccountDto {
    @IsOptional()
    @IsString()
    readonly _id?: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly telefone: string;

    @IsString()
    nome: string;

    @IsString()
    senha: string;

    @IsString()
    ocupacao: string;

    @IsString()
    endereco: string;

    @IsString()
    tipo: string;

    @IsOptional()
    @IsUrl()
    urlFotoAccount?: string;
}
