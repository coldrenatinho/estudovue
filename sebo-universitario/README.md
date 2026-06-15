# Sebo Universitário

Projeto acadêmico fullstack para gerenciar livros usados em um sebo universitário.

## Stack usada

- Frontend: Vue 3, Vite, Vuetify, Vue Router e Pinia
- Backend: Node.js, Express, JWT e Firebase Admin
- Banco de dados: PostgreSQL
- Infra local: Docker Compose com serviços `web`, `api` e `db`

## Funcionalidades

- Login com Google usando Firebase Authentication
- Modo demonstração para teste local sem credenciais Firebase
- Cadastrar livro
- Listar livros
- Editar livro
- Excluir livro com confirmação
- Estatísticas na Home
- Dados salvos em PostgreSQL por usuário logado
- Tema visual personalizado com Vuetify

## Documentação do projeto

A documentação técnica e os prompts dos agentes autônomos estão em:

```txt
docs/README_TECNICO.md
docs/FRONTEND.md
docs/NODE_API.md
docs/DBA_POSTGRES.md
docs/QA.md
docs/GIT_WORKFLOW.md
docs/CHECKLIST_ENTREGA.md
docs/skills/
docs/agentes-autonomos/
```

Os agentes autônomos foram separados por especialidade: Frontend, Node/API, DBA PostgreSQL, QA e Git/Release.
As skills locais em `docs/skills/` documentam fluxos reutilizáveis para manutenção fullstack, deploy com Traefik e tutoria/revisão do projeto.

## Como rodar com Docker Compose

Na pasta do projeto:

```bash
docker compose up -d --build
```

Depois abra:

```txt
http://localhost:8080
```

A API também fica disponível em:

```txt
http://localhost:4000/health
http://localhost:4000/api
```

Para parar:

```bash
docker compose down
```

Para apagar também o banco local criado no volume Docker:

```bash
docker compose down -v
```

## Deploy em servidor com Traefik

No servidor remoto, clone o projeto dentro de `~/projects`:

```bash
mkdir -p ~/projects
cd ~/projects
git clone URL_DO_REPOSITORIO sebo-universitario
cd sebo-universitario
cp .env.example .env
```

No `.env`, preencha pelo menos:

```env
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

O Traefik precisa estar rodando no servidor e a rede externa precisa existir:

```bash
docker network create traefik
```

Suba a aplicação usando o Compose base mais o override do Traefik:

```bash
docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --build
```

Verifique:

```bash
docker compose -f docker-compose.yml -f docker-compose.traefik.yml ps
curl https://api-sebo.seudominio.com.br/health
```

Para atualizar depois de um novo commit:

```bash
cd ~/projects/sebo-universitario
git pull
docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --build
```

## Login com Firebase Authentication

Para ativar o login real com Google via Firebase:

1. Acesse o Firebase Console.
2. Crie um projeto Firebase.
3. Em Authentication, habilite o provedor Google.
4. Em Project settings, crie/copie a configuração de Web App.
5. Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

6. Preencha as variáveis `VITE_FIREBASE_*` com a configuração Web App.
7. Em Project settings > Service accounts, gere uma chave privada do Firebase Admin.
8. Preencha `FIREBASE_SERVICE_ACCOUNT_BASE64` ou `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` e `FIREBASE_PRIVATE_KEY`.
9. Recrie os containers:

```bash
docker compose up -d --build
```

Se as variáveis Firebase estiverem vazias, o projeto ainda pode ser testado pelo botão "Entrar em modo demonstração".

## Como rodar em modo desenvolvimento

### Frontend

```bash
bun install
bun dev
```

Frontend local:

```txt
http://localhost:3000
```

### Backend

Suba um PostgreSQL local ou use o banco do Docker Compose. Depois rode:

```bash
cd api
bun install
bun run dev
```

API local:

```txt
http://localhost:4000/health
```

## Estrutura principal

```txt
sebo-universitario/
├── api/                  # Backend Node.js + Express
├── src/                  # Frontend Vue 3
│   ├── components/       # Componentes reutilizáveis
│   ├── pages/            # Telas da aplicação
│   ├── router/           # Rotas
│   ├── services/         # Cliente HTTP da API
│   └── stores/           # Stores Pinia
├── docker-compose.yml
├── docker-compose.traefik.yml
├── Dockerfile
├── nginx.conf
└── README.md
```

## Integrantes

- Renato — preencha aqui sua matrícula antes da entrega.

## Commit sugerido

```bash
git add .
git commit -m "feat: cria projeto fullstack com login google e postgres"
```
