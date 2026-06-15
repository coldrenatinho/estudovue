---
name: sebo-traefik-deploy
description: Use esta skill ao preparar, revisar ou corrigir o deploy remoto do Sebo Universitário em servidor Linux com Docker Compose e Traefik, especialmente quando o projeto for clonado em ~/projects.
---

# Sebo Traefik Deploy

## Objetivo

Preparar o Sebo Universitário para rodar em servidor remoto atrás do Traefik, sem expor portas diretas da aplicação quando o override de produção estiver ativo.

## Premissas

- O projeto deve ficar em `~/projects/sebo-universitario`.
- O Traefik já deve estar rodando no servidor.
- A rede Docker externa deve existir, normalmente `traefik`.
- Domínios devem vir do `.env`, não hardcoded no Compose.

## Arquivos principais

- `docker-compose.yml`: serviços base para `db`, `api` e `web`.
- `docker-compose.traefik.yml`: labels e rede externa do Traefik.
- `.env.example`: modelo de variáveis.
- `nginx.conf`: serve o frontend e encaminha `/api` para a API.

## Checklist de produção

1. `APP_DOMAIN` aponta para o frontend.
2. `API_DOMAIN` aponta para a API ou healthcheck externo.
3. `JWT_SECRET` foi trocado por valor forte.
4. `POSTGRES_PASSWORD` foi trocado por valor forte.
5. `ENABLE_DEMO_LOGIN=false` em produção real.
6. `FIREBASE_SERVICE_ACCOUNT_BASE64` usa chave nova e não vazada.
7. `.env` não aparece em `git status`.
8. O override Traefik remove portas diretas com `ports: !reset []`.

## Comandos esperados no servidor

```bash
mkdir -p ~/projects
cd ~/projects
git clone URL_DO_REPOSITORIO sebo-universitario
cd sebo-universitario
cp .env.example .env
docker network create traefik
docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --build
```

## Validação

```bash
docker compose -f docker-compose.yml -f docker-compose.traefik.yml ps
curl https://API_DOMAIN/health
```

