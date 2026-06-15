# Checklist de entrega — Sebo Universitário Fullstack

## Antes de enviar ao professor

- [ ] Preencher nome e matrícula em `src/pages/Sobre.vue`.
- [ ] Conferir README.
- [ ] Conferir documentação em `docs/`.
- [ ] Rodar Docker Compose.
- [ ] Testar login demonstração.
- [ ] Testar CRUD completo.
- [ ] Rodar lint e builds.
- [ ] Criar commit final.
- [ ] Gerar ZIP sem `node_modules`, `.env`, `.git` e `dist`.

## Comandos finais

```bash
cd /home/renatoas/Projetos/estudovue/sebo-universitario
bun run lint
bun run build
cd api && bun run build
cd ..
docker compose config
docker compose up -d --build
```

Testar no navegador:

```txt
http://localhost:8080
```

Health check:

```bash
curl http://localhost:4000/health
```

Commit:

```bash
git add .
git commit -m "feat: entrega projeto fullstack sebo universitario"
```

ZIP:

```bash
cd /home/renatoas/Projetos/estudovue
zip -r sebo-universitario-fullstack.zip sebo-universitario \
  -x "*/node_modules/*" \
  -x "*/dist/*" \
  -x "*/.env" \
  -x "*/.git/*"
```
