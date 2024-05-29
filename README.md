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

Sempre utilize o `localhost:3000` como `base_url`.

#### Criar uma nova conta

- **URL:** `POST /accounts`
- **Body:** JSON
    ```json
    {
      "email": "exemplo@email.com",
      "telefone": "(00) 12345-6789",
      "nome": "Fulano de Tal",
      "senha": "senha123",
      "ocupacao": "Desenvolvedor",
      "endereco": "Rua Exemplo, 123",
      "tipo": "cliente",
      "urlFotoAccount": "https://exemplo.com/foto.jpg"
    }
    ```
- **Resposta de Exemplo:**
    ```json
    {
      "success": true,
      "message": "Conta criada com sucesso",
      "account": {
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
