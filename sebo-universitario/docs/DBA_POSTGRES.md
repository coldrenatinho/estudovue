# Documentação DBA — PostgreSQL

## Objetivo

O papel de DBA neste projeto é garantir que o banco PostgreSQL esteja correto, persistente, seguro e fácil de testar.

## Serviço do banco

Configurado em:

```txt
docker-compose.yml
```

Serviço:

```txt
db
```

Imagem:

```txt
postgres:16-alpine
```

Volume persistente:

```txt
postgres_data:/var/lib/postgresql/data
```

## Banco e usuário local

```txt
POSTGRES_USER=sebo
POSTGRES_DB=sebo_universitario
```

Senha local de desenvolvimento:

```txt
sebo123
```

Observação: para produção, trocar a senha e mover credenciais para `.env` ou secrets.

## Tabelas

As tabelas são criadas automaticamente no arquivo:

```txt
api/src/db.ts
```

### users

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  google_sub TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### livros

```sql
CREATE TABLE IF NOT EXISTS livros (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  ano INTEGER NOT NULL,
  preco NUMERIC(10, 2) NOT NULL,
  genero TEXT NOT NULL,
  disponivel BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Índice:

```sql
CREATE INDEX IF NOT EXISTS idx_livros_user_id ON livros(user_id);
```

## Comandos úteis

Entrar no banco pelo container:

```bash
docker compose exec db psql -U sebo -d sebo_universitario
```

Listar tabelas:

```sql
\dt
```

Ver usuários:

```sql
SELECT id, name, email, created_at FROM users ORDER BY id DESC;
```

Ver livros:

```sql
SELECT id, user_id, titulo, autor, ano, preco, genero, disponivel FROM livros ORDER BY id DESC;
```

Contar livros por usuário:

```sql
SELECT u.email, COUNT(l.id) AS total_livros
FROM users u
LEFT JOIN livros l ON l.user_id = u.id
GROUP BY u.email
ORDER BY total_livros DESC;
```

## Backup local simples

```bash
docker compose exec db pg_dump -U sebo sebo_universitario > backup_sebo.sql
```

Restaurar:

```bash
cat backup_sebo.sql | docker compose exec -T db psql -U sebo -d sebo_universitario
```

## Checklist DBA

- [ ] Container `sebo_postgres` está healthy.
- [ ] Volume `postgres_data` existe.
- [ ] Tabelas `users` e `livros` existem.
- [ ] FK `livros.user_id -> users.id` existe.
- [ ] Índice `idx_livros_user_id` existe.
- [ ] Ao excluir usuário, livros são removidos por cascade.
- [ ] Preço está como `NUMERIC(10,2)`.
- [ ] Dados persistem após `docker compose restart`.
