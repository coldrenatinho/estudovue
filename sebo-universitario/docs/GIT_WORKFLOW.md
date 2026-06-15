# Documentação Git

## Objetivo

Definir um fluxo simples com `main`, `develop`, `feat`, `fix` e `hotfix` para organizar o trabalho no Sebo Universitário.

## Modelo de branches

```txt
main
develop
feat/nome-da-funcionalidade
fix/nome-do-ajuste
hotfix/nome-da-correcao-urgente
```

## Função de cada branch

`main`
: versão estável, pronta para entrega ou publicação.

`develop`
: integração do trabalho em andamento antes de ir para `main`.

`feat/*`
: desenvolvimento de uma funcionalidade nova.

`fix/*`
: correção planejada de bug ou ajuste menor.

`hotfix/*`
: correção urgente partindo de `main`, para problema crítico em produção.

## Convenção de commits

Use commits pequenos e diretos:

```txt
feat: cria tela de login
feat: implementa cadastro de livros
fix: corrige redirecionamento apos salvar
hotfix: corrige erro critico na api em producao
docs: atualiza documentacao de git
chore: ajusta configuracao de deploy
```

## Fluxo recomendado

1. Ver estado atual:

```bash
git status --short --branch
```

2. Criar `develop` a partir de `main`, se ainda não existir:

```bash
git checkout main
git pull
git checkout -b develop
```

3. Criar branch de trabalho a partir de `develop`:

```bash
git checkout -b feat/login-google
```

4. Fazer a alteração e revisar:

```bash
git diff
git status
```

5. Commitar com mensagem semântica:

```bash
git add .
git commit -m "feat: implementa login com google"
```

6. Integrar em `develop`:

```bash
git checkout develop
git merge feat/login-google
```

7. Quando `develop` estiver estável, levar para `main`:

```bash
git checkout main
git merge develop
```

## Quando usar hotfix

Use `hotfix/*` quando um erro já estiver em `main` e precisar de correção rápida sem esperar o ciclo normal de `develop`.

Fluxo:

```bash
git checkout main
git checkout -b hotfix/erro-auth
git commit -m "fix: corrige falha na autenticacao"
git checkout main
git merge hotfix/erro-auth
git checkout develop
git merge main
```

## Automação

O repositório usa GitHub Actions para validar a base automaticamente em `push`
e `pull_request` nas branches `main` e `develop`.

O workflow em `.github/workflows/ci.yml` executa:

```txt
frontend: bun install, bun run lint, bun run build
api: bun install, bun run build
compose: docker compose config --services
```

## Antes de entregar

Rodar:

```bash
bun run lint
bun run build
cd api && bun run build
cd ..
docker compose config
```

## Gerar ZIP de entrega

A partir da pasta acima de `sebo-universitario`:

```bash
cd /home/renatoas/Projetos/estudovue
zip -r sebo-universitario-fullstack.zip sebo-universitario \
  -x "*/node_modules/*" \
  -x "*/dist/*" \
  -x "*/.env" \
  -x "*/.git/*"
```

## Checklist Git

- [ ] `main` e `develop` definidos.
- [ ] Branch de trabalho segue `feat/*`, `fix/*` ou `hotfix/*`.
- [ ] Mensagens de commit usam prefixo semântico.
- [ ] Arquivos sensíveis `.env` não entraram no commit.
- [ ] `node_modules` não entrou no commit.
- [ ] `dist` não precisa entrar se o professor rodar build local.
- [ ] README atualizado.
- [ ] Documentação em `docs/` adicionada.
- [ ] Commit final criado.
