# Documentação QA — Plano de testes

## Objetivo

Garantir que o Sebo Universitário funcione de ponta a ponta antes da entrega ao professor.

## Escopo dos testes

- Frontend.
- Login demonstração.
- Login Firebase/Google quando configurado.
- API Node.
- Banco PostgreSQL.
- Docker Compose.
- CRUD de livros.

## Teste 1 — Subir aplicação

Comando:

```bash
docker compose up -d --build
```

Critérios:

- `sebo_postgres` healthy.
- `sebo_api` up.
- `sebo_web` up.
- Frontend abre em `http://localhost:8080`.

Verificar:

```bash
docker compose ps
curl http://localhost:4000/health
```

Resultado esperado de `/health`:

```json
{
  "status": "ok",
  "database": "connected"
}
```

## Teste 2 — Login demonstração

Passos:

1. Abrir `http://localhost:8080`.
2. Clicar em `Entrar`.
3. Clicar em `Entrar em modo demonstração`.

Resultado esperado:

- Usuário `Aluno Demonstração` aparece no topo.
- Rotas `/lista` e `/cadastro` ficam acessíveis.

## Teste 3 — Cadastrar livro

Passos:

1. Ir para `/cadastro`.
2. Preencher:
   - Título: Clean Code
   - Autor: Robert C. Martin
   - Ano: 2008
   - Preço: 89.90
   - Gênero: Computação
   - Disponível: marcado
3. Clicar em cadastrar.

Resultado esperado:

- Sistema redireciona para `/lista`.
- Livro aparece na listagem.

## Teste 4 — Editar livro

Passos:

1. Na lista, clicar em `Editar`.
2. Alterar preço ou disponibilidade.
3. Salvar.

Resultado esperado:

- Volta para `/lista`.
- Dados alterados aparecem no card.

## Teste 5 — Excluir livro

Passos:

1. Na lista, clicar em `Excluir`.
2. Confirmar.

Resultado esperado:

- Livro some da lista.
- Se não houver outros livros, aparece mensagem de lista vazia.

## Teste 6 — Rotas protegidas

Passos:

1. Sair do sistema.
2. Abrir `/lista` diretamente.

Resultado esperado:

- Sistema redireciona para `/login`.

## Teste 7 — API sem token

Comando:

```bash
curl -i http://localhost:4000/api/livros
```

Resultado esperado:

```txt
HTTP/1.1 401 Unauthorized
```

## Teste 8 — Qualidade de código

Comandos:

```bash
bun run lint
bun run build
cd api && bun run build
```

Resultado esperado:

- Todos terminam com código 0.

## Checklist final QA

- [ ] Docker sobe sem erro.
- [ ] `/health` retorna banco conectado.
- [ ] Frontend abre em 8080.
- [ ] Login demo funciona.
- [ ] Create funciona.
- [ ] Read funciona.
- [ ] Update funciona.
- [ ] Delete funciona.
- [ ] Lista vazia tratada.
- [ ] Rotas protegidas funcionam.
- [ ] Console do navegador sem erro vermelho.
- [ ] Build frontend passa.
- [ ] Build backend passa.
- [ ] Lint passa.
