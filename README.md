## API do Banco

Esta é uma API para gerenciamento de contas bancárias, incluindo operações como criação, recuperação, atualização e exclusão de contas.

### Instalação

Certifique-se de ter o Node.js instalado em sua máquina. Em seguida, siga estas etapas:

1. Clone este repositório para o seu ambiente local:
    ```bash
    git clone https://github.com/KaueFulgencio/api-banco
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd api-banco
    ```

3. Instale as dependências do projeto:
    ```bash
    npm install
    ```

4. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário.

5. Inicie o servidor:
    ```bash
    npm start
    ```

### Endpoints

Sempre utilize o `localhost:3001` como `base_url`.

#### Criar uma nova conta

- **URL:** `POST /accounts`
- **Body:** JSON
    ```json
    {
        "nome": "Jo da Silva",
        "cpf": "12345678901",
        "email": "joao.wilva@exeple.com",
        "senha": "senha123",
        "telefone": "11217654321",
        "ocupacao": "Engenheiro",
        "tipo": "MEI"
    }

    ```
- **Resposta de Exemplo:**
    ```json
    {
	"success": true,
	"message": "Conta criada com sucesso",
	"account": {
		"email": "joao.wilva@exeple.com",
		"telefone": "11217654321",
		"nome": "Jo da Silva",
		"senha": "senha123",
		"ocupacao": "Engenheiro",
		"tipo": "MEI",
		"saldo": 0,
		"transacoes": [],
		"_id": "6660aab794fddd007ab7e331",
		"pixKeys": [],
		"createdAt": "2024-06-05T18:13:11.040Z",
		"updatedAt": "2024-06-05T18:13:11.040Z",
		"__v": 0
	    }
    }
    ```

#### Recuperar uma conta por ID

- **URL:** `GET /accounts/:id`
- **Request:** 
    - `id` (string): O ID da conta a ser recuperada.
- **Resposta de Exemplo:**
    ```json
    {
      "_id": "5fec7c6a6df1475f42e91f32",
      "email": "exemplo@email.com",
      "telefone": "(00) 12345-6789",
      "nome": "Fulano de Tal",
      "senha": "senha123",
      "ocupacao": "Desenvolvedor",
      "endereco": "Rua Exemplo, 123",
      "tipo": "cliente",
      "urlFotoAccount": "https://exemplo.com/foto.jpg",
      "__v": 0
    }
    ```

#### Atualizar uma conta existente

- **URL:** `PUT /accounts/:id`
- **Parâmetros de URL:**
    - `id` (string): O ID da conta a ser atualizada.
- **Request:**
    ```json
    {
      "email": "novoemail@email.com",
      "telefone": "(00) 98765-4321",
      "nome": "Novo Nome",
      "senha": "novasenha456",
      "ocupacao": "Designer",
      "endereco": "Nova Rua, 456",
      "tipo": "admin",
      "urlFotoAccount": "https://exemplo.com/novafoto.jpg"
    }
    ```
- **Resposta de Exemplo:**
    ```json
    {
      "_id": "5fec7c6a6df1475f42e91f32",
      "email": "novoemail@email.com",
      "telefone": "(00) 98765-4321",
      "nome": "Novo Nome",
      "senha": "novasenha456",
      "ocupacao": "Designer",
      "endereco": "Nova Rua, 456",
      "tipo": "admin",
      "urlFotoAccount": "https://exemplo.com/novafoto.jpg",
      "__v": 0
    }
    ```

#### Excluir uma conta existente

- **URL:** `DELETE /accounts/:id`
- **Parâmetros de URL:**
    - `id` (string): O ID da conta a ser excluída.
- **Response:**
    ```json
    true
    ```

PIX
#### Criar chave pix
- **URL:** `POST /pix/:id`
id: 6660aab794fddd007ab7e331
- **Parâmetros de URL:**
    - `id`: 6660aab794fddd007ab7e331
- **Request:**
    ```json
    {
        "type": "TELEFONE",
        "key": "12991670492"
    }

    ```
- **Resposta de Exemplo:**
    ```json
    {
        "type": "TELEFONE",
        "key": "12991670492",
        "account": "6660aab794fddd007ab7e331",
        "_id": "6661c66f58d5c71aee0a81bb",
        "createdAt": "2024-06-06T14:23:43.938Z",
        "__v": 0
    }
    ```
#### Listar chave pix
- **URL:** `GET /pix/:id`
id: 6660aab794fddd007ab7e331
- **Parâmetros de URL:**
    - `id`: 6660aab794fddd007ab7e331

    ```
- **Resposta de Exemplo:**
    ```json
        [
        {
            "_id": "6661c4cb35ed73f6ac91951d",
            "type": "TELEFONE",
            "key": "12991670492",
            "account": "6660aab794fddd007ab7e331",
            "createdAt": "2024-06-06T14:16:43.094Z",
            "__v": 0
        }
    ]
    ```

#### Excluir chave pix
- **URL:** `DELETE /pix/:id/:id_chave_pix`
id: 6660aab794fddd007ab7e331
- **Parâmetros de URL:**
    - `id`: 6660aab794fddd007ab7e331
    - `id_chave_pix`: 6661c66f58d5c71aee0a81bb

    ```
- **Resposta de Exemplo:**
    ```json
    200 OK
    ```

Segurança - Autenticação - Autenticação Multifator (MFA) e Gerenciamento de Sessão.
#### Registrar usuario

- **URL:** `POST http://localhost:3001/auth/register`
- **Body:** JSON
    ```json
    {
        "email": "kaue@gmail.com",
        "password": "senha"
    }


    ```
#### Gerar token

- **URL:** `POST /auth/login`
- **Body:** JSON
    ```json
    {
        "email": "kaue@gmail.com",
        "password": "senha"
    }

    **Resposta de Exemplo:**
    ```json
    {
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcxNzYzMTI4OSwiZXhwIjoxNzE3NjM0ODg5fQ.   VrJaj73JRP9Thi383vpLcTd14HG-KzqkePuwc-jqrkE"
    }
    ```

    ```

Notificações
Autenticação
#### Enviar notificação

- **URL:** `POST /notifications`
- **Body:** JSON
    ```json
    {
        "userId": "60b8c0b8f8d5a12c4c8e4e10", 
        "type": "info", 
        "message": "Sua conta foi atualizada com sucesso.", 
        "read": false
    }

    **Resposta de Exemplo:**
    ```json
    {
        "userId": "60b8c0b8f8d5a12c4c8e4e10",
        "message": "Sua conta foi atualizada com sucesso.",
        "read": false,
        "_id": "6660ef54d8d324c578035ceb",
        "date": "2024-06-05T23:05:56.585Z",
        "__v": 0
    }
    ```

    ```