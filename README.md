API do Banco
Esta é uma API para gerenciamento de contas bancárias, incluindo operações como criação, recuperação, atualização e exclusão de contas.

Instalação
Clone o repositório:

bash
Copy code
git clone https://github.com/KaueFulgencio/api-banco
Navegue até o diretório do projeto:

bash
Copy code
cd api-banco
Instale as dependências do projeto:

bash
Copy code
npm install
Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente conforme necessário.

Inicie o servidor:

bash
Copy code
npm start
Endpoints
Criar uma nova conta
URL: POST /accounts

Corpo da Requisição:

json
Copy code
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
Resposta de Exemplo:

json
Copy code
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
Recuperar uma conta por ID
URL: GET /accounts/:id

Parâmetros de URL:

id (string): O ID da conta a ser recuperada.
Resposta de Exemplo:

json
Copy code
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
Atualizar uma conta existente
URL: PUT /accounts/:id

Parâmetros de URL:

id (string): O ID da conta a ser atualizada.
Corpo da Requisição:

json
Copy code
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
Resposta de Exemplo:

json
Copy code
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
Excluir uma conta existente
URL: DELETE /accounts/:id

Parâmetros de URL:

id (string): O ID da conta a ser excluída.
Resposta de Exemplo:

json
Copy code
true