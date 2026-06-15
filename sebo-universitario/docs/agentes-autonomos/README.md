# Agentes autônomos especialistas — Sebo Universitário

## Objetivo

Esta pasta contém prompts prontos para agentes autônomos especialistas revisarem ou evoluírem o projeto por área.

Especialistas criados:

```txt
00-orquestrador.md
01-frontend-vue-vuetify-pinia.md
02-node-api-express.md
03-dba-postgresql.md
04-qa.md
05-git-release.md
```

## Como usar

Você pode copiar o prompt do especialista e colar em um agente como Codex, Claude Code, OpenCode ou outro agente de programação.

Exemplo com Codex CLI, dentro da pasta do projeto:

```bash
codex exec "$(cat docs/agentes-autonomos/01-frontend-vue-vuetify-pinia.md)"
```

Para execução segura, recomenda-se criar uma branch antes:

```bash
git checkout -b review/frontend-agent
```

Depois que o agente terminar:

```bash
git diff
bun run lint
bun run build
```

## Regra de ouro

Nunca aceite automaticamente o resumo do agente. Sempre valide:

- arquivos alterados;
- diff;
- comandos executados;
- testes/build/lint;
- se o escopo foi respeitado.

## Contrato de resposta esperado

Todo agente deve responder com:

1. O que encontrou.
2. O que alterou.
3. Arquivos modificados.
4. Comandos executados.
5. Resultado dos comandos.
6. Riscos restantes.
7. Próximo commit sugerido.
