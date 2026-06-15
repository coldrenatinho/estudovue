---
name: sebo-fullstack-maintenance
description: Use esta skill ao alterar ou revisar o projeto Sebo Universitário fullstack, incluindo Vue 3, Vuetify, Pinia, Vue Router, API Express, PostgreSQL, Docker Compose, Firebase Authentication e integração frontend/backend.
---

# Sebo Fullstack Maintenance

## Objetivo

Manter o projeto Sebo Universitário funcionando de ponta a ponta, preservando organização, tipagem e validações antes de concluir qualquer mudança.

## Fluxo padrão

1. Verifique o escopo da alteração e leia os arquivos diretamente relacionados.
2. Proteja segredos: nunca commit `.env`, service account Firebase, tokens ou senhas reais.
3. No frontend, siga os padrões de Vue 3 Composition API, Vuetify, Pinia e Vue Router já usados em `src/`.
4. No backend, siga os padrões de Express + TypeScript em `api/src/`.
5. Para banco, mantenha a inicialização idempotente em `api/src/db.ts`.
6. Para Docker, mantenha o Compose local simples e use overrides para produção.

## Validação mínima

Execute conforme o escopo:

```bash
bun run lint
bun run build
cd api && bun run build
cd .. && docker compose config --services
```

Para mudanças Traefik:

```bash
APP_DOMAIN=sebo.example.com API_DOMAIN=api-sebo.example.com docker compose -f docker-compose.yml -f docker-compose.traefik.yml config --services
```

## Commits

Separe commits semânticos por intenção:

- `feat:` nova funcionalidade.
- `fix:` correção de bug.
- `docs:` documentação.
- `chore:` infraestrutura, ignore, scripts e configuração.
- `style:` tema visual ou ajustes sem mudança de regra.
- `refactor:` reorganização sem mudar comportamento.

