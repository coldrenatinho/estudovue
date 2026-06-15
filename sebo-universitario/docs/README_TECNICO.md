# Documentação técnica — Sebo Universitário

## 1. Visão geral

O Sebo Universitário é um projeto acadêmico fullstack para gerenciar livros usados por estudantes.

A aplicação possui:

- Frontend em Vue 3 + Vite + Vuetify + Vue Router + Pinia.
- Backend em Node.js + Express + TypeScript.
- Autenticação via Firebase Authentication no frontend, com validação do ID token via Firebase Admin no backend.
- Modo demonstração para teste local sem credenciais Firebase.
- Banco PostgreSQL em Docker Compose.
- CRUD completo de livros por usuário logado.
- Swagger/OpenAPI disponível em `/api-docs`.

## 2. Arquitetura

```txt
Navegador
  |
  | http://localhost:8080
  v
Nginx / Frontend Vue
  |
  | /api/*
  v
Backend Node.js / Express
  |
  | DATABASE_URL
  v
PostgreSQL
```

Em produção no servidor remoto, o acesso externo fica atrás do Traefik:

```txt
Navegador
  |
  | https://APP_DOMAIN
  v
Traefik
  |
  | rede Docker externa TRAEFIK_NETWORK
  v
web / Nginx / Vue
  |
  | VITE_API_BASE_URL
  v
api / Express
  |
  | DATABASE_URL
  v
db / PostgreSQL
```

## 3. Serviços Docker

Arquivo principal:

```txt
docker-compose.yml
```

Serviços:

| Serviço | Função | Porta |
|---|---|---|
| web | Serve o frontend Vue compilado via Nginx | 8080 |
| api | API Node.js/Express | 4000 |
| db | Banco PostgreSQL | interna |

## 4. Principais pastas

```txt
api/                  Backend Node.js
api/src/server.ts     Inicialização da API
api/src/db.ts         Conexão e criação das tabelas
api/src/routes/       Rotas da API
api/src/middleware/   Middleware de autenticação JWT
src/                  Frontend Vue
src/pages/            Telas do sistema
src/components/       Componentes reutilizáveis
src/stores/           Stores Pinia
src/services/api.ts   Cliente HTTP do frontend
src/router/index.ts   Rotas do frontend
docs/                 Documentação técnica e agentes
docs/skills/          Skills locais reutilizáveis do projeto
```

## 5. Modelo de dados

### users

Guarda usuários autenticados.

Campos principais:

- id
- google_sub
- name
- email
- avatar_url
- created_at

### livros

Guarda livros cadastrados por usuário.

Campos principais:

- id
- user_id
- titulo
- autor
- ano
- preco
- genero
- disponivel
- created_at

## 6. Endpoints principais

### Saúde

```txt
GET /health
```

### Autenticação

```txt
POST /api/auth/firebase
POST /api/auth/demo
GET  /api/auth/me
```

### Livros

```txt
GET    /api/livros
POST   /api/livros
PUT    /api/livros/:id
DELETE /api/livros/:id
```

### Documentação interativa

```txt
GET /api-docs
GET /api-docs/openapi.json
```

## 7. Como rodar

```bash
docker compose up -d --build
```

Abrir:

```txt
http://localhost:8080
```

Verificar API:

```bash
curl http://localhost:4000/health
```

Parar:

```bash
docker compose down
```

## 7.1. Deploy remoto com Traefik

Clone no servidor dentro de `~/projects`:

```bash
mkdir -p ~/projects
cd ~/projects
git clone URL_DO_REPOSITORIO sebo-universitario
cd sebo-universitario
cp .env.example .env
```

Configure o `.env`:

```txt
APP_DOMAIN=sebo.seudominio.com.br
API_DOMAIN=api-sebo.seudominio.com.br
JWT_SECRET=troque-por-um-segredo-forte
POSTGRES_PASSWORD=troque-por-uma-senha-forte
CORS_ORIGIN=https://sebo.seudominio.com.br,https://api-sebo.seudominio.com.br
TRAEFIK_NETWORK=traefik
TRAEFIK_ENTRYPOINT=websecure
TRAEFIK_CERT_RESOLVER=letsencrypt
ENABLE_DEMO_LOGIN=false
```

Suba usando o override de produção:

```bash
docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --build
```

Valide:

```bash
docker compose -f docker-compose.yml -f docker-compose.traefik.yml ps
curl https://api-sebo.seudominio.com.br/health
```

## 8. Variáveis de ambiente

Copiar exemplo:

```bash
cp .env.example .env
```

Variáveis principais:

```txt
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
FIREBASE_SERVICE_ACCOUNT_BASE64=
JWT_SECRET=
ENABLE_DEMO_LOGIN=true
POSTGRES_USER=sebo
POSTGRES_PASSWORD=
POSTGRES_DB=sebo_universitario
CORS_ORIGIN=
APP_DOMAIN=
API_DOMAIN=
TRAEFIK_NETWORK=traefik
```

Se as variáveis `VITE_FIREBASE_*` e a credencial do Firebase Admin ficarem vazias, o login real não funciona, mas o botão de demonstração continua funcionando.

## 9. Comandos de validação

```bash
bun install
bun run lint
bun run build
cd api && bun install && bun run build
cd .. && docker compose config
```

## 10. Critérios de pronto

- Frontend abre em `http://localhost:8080`.
- Login demonstração funciona.
- CRUD completo funciona.
- API responde `GET /health` com banco conectado.
- `bun run lint` passa sem erro.
- `bun run build` passa sem erro.
- `cd api && bun run build` passa sem erro.
