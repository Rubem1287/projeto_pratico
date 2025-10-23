# projeto_pratico

#Cadastra um administrador e um colaborador

---

## Objetivo

É uma Api que cadastra um Colaborador e o mesmo consegue logar, cadastrar, atualizar visualizar seu perfil e visualizar todos perfis no banco de dados isso também vale para o administrador.

---

## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota ("/users", getAllUsers), retorna todos usuários cadastrado no banco de dados ;

2. ✅ Envia uma requisição Post para salvar um usuário no banco ("/cadastrar", createUser), cria um usuário e salva no banco de dados;

3. ✅ Envia uma requisição Get para logar na API, ("/login", login).
4. ✅ Envia uma requisição Put  para atualizar o usuário, ("/:id", updateUser)

5. ✅ Em uma requisição Get para pegar o usuário por ID, ("/:id", getUserById).


---

## Parâmetros da Rota **/calculate**

| Parâmetro        | Tipo   | Obrigatório | Descrição                                     |
|-------------------------|--------------|-------------|-------------------------------------|
| **getUserById**  | ID | ✅  | Retorna o usuário com ID informado.           |
| **updateUser **      | ID| ✅   | Atualiza o usuário com o ID informado.          |
| **deleteUser**   | ID | ✅   | Deleta o usuário com o ID informado.      |


---

## Exemplo de Requisição

### URL

```plaintext
GET http://localhost:3000/login
```

### Resposta

```json
{
“Usuário logado com sucesso”
}
```
##  Erros comuns

- Usuário não encontrado.

- Senha incorreta

---

## Exceções

### Erro 400

Ocorre quando qualquer um dos seguintes parâmetros obrigatórios está ausente ou inválido:

- ID.
- Usuário.
- algum campo do banco de dados

```json
{
  "error": "Parâmetros ausentes ou inválidos"
}
```

### Erro 500

Retorna quando tem algum problema no servidor ou relacionado

```json
{
  "error": "Erro de servidor"
}
```

---

- Tratamento de erros: O tratamento de erros é limitado.

---


# Como executar o projeto

```bash
npm install
```

```bash
node –watch src/server.js

```bash
"docker-up": "docker-compose -f docker-compose-dev.yml up -d"


```bash
"Criar Migration": "npx sequelize-cli migration:generate --name create-users-table"

```bash 
"run-migration": "npx sequelize db:migrate"

Vercel: https://projeto-pratico-one.vercel.app/
A API estará disponível em `http://localhost:3000`.
