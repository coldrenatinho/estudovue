import type { Livro, Usuario } from './types.js'
import pg from 'pg'

const { Pool } = pg

const databaseUrl = process.env.DATABASE_URL || 'postgres://sebo:sebo123@localhost:5432/sebo_universitario'

export const pool = new Pool({
  connectionString: databaseUrl,
})

const esperar = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function esperarBanco (tentativas = 30) {
  for (let tentativa = 1; tentativa <= tentativas; tentativa += 1) {
    try {
      await pool.query('SELECT 1')
      return
    } catch (error) {
      if (tentativa === tentativas) {
        throw error
      }
      await esperar(1000)
    }
  }
}

export async function iniciarBanco () {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      google_sub TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      avatar_url TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

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

    CREATE INDEX IF NOT EXISTS idx_livros_user_id ON livros(user_id);
  `)
}

export function mapUsuario (row: any): Usuario {
  return {
    id: Number(row.id),
    googleSub: row.google_sub,
    name: row.name,
    email: row.email,
    avatarUrl: row.avatar_url,
  }
}

export function mapLivro (row: any): Livro {
  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    titulo: row.titulo,
    autor: row.autor,
    ano: Number(row.ano),
    preco: Number(row.preco),
    genero: row.genero,
    disponivel: Boolean(row.disponivel),
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
  }
}
