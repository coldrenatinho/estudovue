# Sebo Universitário

<p align="center">
  <strong>Uma vitrine completa para livros usados, com frontend moderno, backend organizado e foco em experiência de aprendizado.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3-42b883?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/Vuetify-4-1867c0?style=for-the-badge&logo=vuetify&logoColor=white" alt="Vuetify">
  <img src="https://img.shields.io/badge/Bun-FEBC2E?style=for-the-badge&logo=bun&logoColor=000" alt="Bun">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
</p>

## Visão geral

O **Sebo Universitário** é um projeto acadêmico fullstack para cadastro, listagem, edição e exclusão de livros usados.

A proposta do sistema é unir uma interface bonita com uma base técnica realista, permitindo estudar:

- Vue 3 com Composition API
- Vuetify para interface
- Vue Router para navegação
- CRUD de livros
- Fastify/Node.js no backend
- PostgreSQL para persistência
- Swagger/OpenAPI para documentação
- Firebase Authentication com Google
- Deploy com Docker e Traefik

## Funcionalidades

- Cadastro de livros
- Listagem com cards e estatísticas
- Edição de registros
- Exclusão com confirmação
- Tela de login com Google
- Modo demonstração para testes locais
- Tema visual personalizado
- Documentação da API

## Stack principal

### Frontend

- Vue 3
- Vite
- Vuetify
- Vue Router
- Pinia

### Backend

- Node.js
- Express
- TypeScript
- Firebase Admin

### Banco e infraestrutura

- PostgreSQL
- Docker Compose
- Nginx
- Traefik

## Estrutura do projeto

```txt
sebo-universitario/
├── api/                  # Backend Node.js
├── src/                  # Frontend Vue
│   ├── components/       # Componentes reutilizáveis
│   ├── pages/            # Telas da aplicação
│   ├── router/           # Rotas do frontend
│   └── stores/           # Estado compartilhado
├── docs/                 # Documentação técnica e guias
├── docker-compose.yml    # Ambiente local
├── docker-compose.traefik.yml
└── README.md
```

## Como executar

### Ambiente local com Docker

```bash
docker compose up -d --build
```

Abra no navegador:

```txt
http://localhost:8080
```

API local:

```txt
http://localhost:4000/health
http://localhost:4000/api
http://localhost:4000/api-docs
```

Para parar:

```bash
docker compose down
```

### Desenvolvimento do frontend

```bash
bun install
bun dev
```

### Desenvolvimento do backend

```bash
cd api
bun install
bun run dev
```

## Login com Google

O projeto pode operar com autenticação Firebase ou em modo demonstração.

Para ativar o login real:

1. Crie um projeto no Firebase Console.
2. Habilite o provedor Google em Authentication.
3. Configure as variáveis `VITE_FIREBASE_*` no arquivo `.env`.
4. Configure as credenciais do Firebase Admin para o backend.
5. Recrie os containers.

Se as credenciais não estiverem configuradas, o botão de demonstração permite testar a aplicação mesmo assim.

## Deploy

O projeto já está preparado para deploy com:

- build do frontend
- API separada
- proxy reverso com Traefik
- variáveis de ambiente

Consulte a pasta `docs/` para detalhes de configuração e publicação.

## Documentação

- [Documentação técnica](docs/README_TECNICO.md)
- [Guia do frontend](docs/FRONTEND.md)
- [Guia da API Node](docs/NODE_API.md)
- [Guia do Firebase](docs/FIREBASE.md)
- [Guia do PostgreSQL](docs/DBA_POSTGRES.md)
- [Checklist de QA](docs/QA.md)
- [Workflow Git](docs/GIT_WORKFLOW.md)
- [Checklist de entrega](docs/CHECKLIST_ENTREGA.md)

## Integrante

- Renato

## Tecnologias em destaque

- JavaScript moderno
- Componentização
- Organização por camadas
- Boas práticas de Git
- Interface responsiva

## Commit sugerido

```bash
git add README.md
git commit -m "docs: melhora a apresentação do README"
```
