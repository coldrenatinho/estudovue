# Documentação Git — Fluxo de trabalho

## Objetivo

Organizar commits, branches e entrega final do projeto.

## Branch principal

```txt
main
```

## Branches recomendadas

```txt
feature/frontend-ajustes
feature/api-node
feature/postgres-dba
feature/qa-checklist
chore/docs-agentes
fix/correcao-entrega
```

## Convenção de commits

Use commits pequenos e claros:

```txt
feat: implementa login com google
feat: cria api de livros
feat: adiciona banco postgres no docker compose
fix: corrige redirecionamento apos login
style: ajusta tema visual do vuetify
docs: adiciona documentação técnica
test: adiciona checklist de qa
chore: prepara entrega do projeto
```

## Fluxo recomendado

1. Ver estado atual:

```bash
git status
```

2. Criar branch:

```bash
git checkout -b chore/docs-agentes
```

3. Adicionar arquivos:

```bash
git add .
```

4. Conferir o que será commitado:

```bash
git status
git diff --cached
```

5. Commit:

```bash
git commit -m "docs: adiciona documentação e agentes autônomos"
```

6. Ver histórico:

```bash
git log --oneline --decorate -5
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

- [ ] `git status` revisado.
- [ ] Arquivos sensíveis `.env` não entraram no commit.
- [ ] `node_modules` não entrou no commit.
- [ ] `dist` não precisa entrar se o professor rodar build local.
- [ ] README atualizado.
- [ ] Documentação em `docs/` adicionada.
- [ ] Commit final criado.
