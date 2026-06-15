# Documentação Backend Node.js — API Express

## Objetivo

A API é responsável por autenticar usuários, validar tokens, expor endpoints de livros e persistir os dados no PostgreSQL.

## Stack

- Node.js.
- Express.
- TypeScript.
- PostgreSQL via pacote `pg`.
- JWT via `jsonwebtoken`.
- Firebase Admin para validar ID token emitido pelo Firebase Authentication.
- Helmet, CORS e Morgan.
- Swagger/OpenAPI para documentação interativa.

## Arquivos principais

```txt
api/src/server.ts
api/src/openapi.ts
api/src/db.ts
api/src/routes/auth.ts
api/src/routes/livros.ts
api/src/middleware/auth.ts
api/src/types.ts
```

## Inicialização da API

Arquivo:

```txt
api/src/server.ts
```

Responsabilidades:

1. Carregar variáveis de ambiente.
2. Configurar middlewares.
3. Criar rota `/health`.
4. Expor `/api-docs` e `/api-docs/openapi.json`.
5. Registrar rotas `/api/auth` e `/api/livros`.
6. Esperar PostgreSQL ficar disponível.
7. Criar tabelas se não existirem.
8. Subir servidor na porta 4000.

## Autenticação

### Login Firebase/Google

Endpoint:

```txt
POST /api/auth/firebase
```

Payload:

```json
{
  "idToken": "id-token-firebase"
}
```

Fluxo:

1. Recebe o ID token gerado pelo Firebase Auth no frontend.
2. Valida o token com Firebase Admin.
3. Cria ou atualiza usuário em `users`.
4. Gera JWT interno da API.
5. Retorna `{ token, user }`.

### Login demonstração

Endpoint:

```txt
POST /api/auth/demo
```

Serve para o professor testar sem credenciais Firebase configuradas.

## Middleware JWT

Arquivo:

```txt
api/src/middleware/auth.ts
```

Responsabilidades:

- Ler header `Authorization: Bearer <token>`.
- Validar JWT.
- Buscar usuário no banco.
- Inserir `req.user` para as próximas rotas.

## Rotas de livros

Arquivo:

```txt
api/src/routes/livros.ts
```

Endpoints:

```txt
GET    /api/livros
POST   /api/livros
PUT    /api/livros/:id
DELETE /api/livros/:id
```

Todas exigem autenticação.

## Swagger / OpenAPI

Endpoints:

```txt
GET /api-docs
GET /api-docs/openapi.json
```

O arquivo `api/src/openapi.ts` concentra o contrato da API.

## Regras de segurança importantes

- O backend sempre filtra livros por `user_id`.
- Um usuário não consegue editar ou excluir livro de outro usuário.
- O token JWT expira em 7 dias.
- O login real só deve ser ativado com configuração Web App e Service Account do Firebase.
- `JWT_SECRET` deve ser trocado antes de publicar.

## Checklist Node/API

- [ ] `GET /health` responde 200.
- [ ] `POST /api/auth/demo` retorna token.
- [ ] Rotas de livros rejeitam requisições sem token.
- [ ] CRUD funciona com token.
- [ ] Validação rejeita título, autor ou gênero vazios.
- [ ] Validação rejeita ano inválido.
- [ ] Validação rejeita preço negativo.
- [ ] Build TypeScript passa.
- [ ] `/api-docs` abre no navegador.
- [ ] `/api-docs/openapi.json` retorna o contrato OpenAPI.

## Comandos úteis

```bash
cd api
bun install
bun run dev
bun run build
```

Com Docker:

```bash
docker compose up -d --build api
curl http://localhost:4000/health
```
