import { Router } from 'express'
import { mapLivro, pool } from '../db.js'
import { autenticar } from '../middleware/auth.js'

const router = Router()

router.use(autenticar)

function validarLivro (body: any) {
  const titulo = String(body.titulo || '').trim()
  const autor = String(body.autor || '').trim()
  const genero = String(body.genero || '').trim()
  const ano = Number(body.ano)
  const preco = Number(body.preco)
  const disponivel = Boolean(body.disponivel)

  if (!titulo || !autor || !genero) {
    return { error: 'Título, autor e gênero são obrigatórios.' }
  }

  if (!Number.isInteger(ano) || ano < 1000 || ano > 2100) {
    return { error: 'Ano deve ser um número inteiro entre 1000 e 2100.' }
  }

  if (!Number.isFinite(preco) || preco < 0) {
    return { error: 'Preço deve ser um número maior ou igual a zero.' }
  }

  return { data: { titulo, autor, genero, ano, preco, disponivel } }
}

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM livros WHERE user_id = $1 ORDER BY id DESC',
      [req.user!.id],
    )

    res.json(result.rows.map(row => mapLivro(row)))
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const validacao = validarLivro(req.body)
    if ('error' in validacao) {
      res.status(400).json({ message: validacao.error })
      return
    }

    const livro = validacao.data
    const result = await pool.query(
      `
        INSERT INTO livros (user_id, titulo, autor, ano, preco, genero, disponivel)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `,
      [req.user!.id, livro.titulo, livro.autor, livro.ano, livro.preco, livro.genero, livro.disponivel],
    )

    res.status(201).json(mapLivro(result.rows[0]))
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const validacao = validarLivro(req.body)

    if (!id) {
      res.status(400).json({ message: 'ID inválido.' })
      return
    }

    if ('error' in validacao) {
      res.status(400).json({ message: validacao.error })
      return
    }

    const livro = validacao.data
    const result = await pool.query(
      `
        UPDATE livros
        SET titulo = $1, autor = $2, ano = $3, preco = $4, genero = $5, disponivel = $6
        WHERE id = $7 AND user_id = $8
        RETURNING *
      `,
      [livro.titulo, livro.autor, livro.ano, livro.preco, livro.genero, livro.disponivel, id, req.user!.id],
    )

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Livro não encontrado.' })
      return
    }

    res.json(mapLivro(result.rows[0]))
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    if (!id) {
      res.status(400).json({ message: 'ID inválido.' })
      return
    }

    const result = await pool.query(
      'DELETE FROM livros WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user!.id],
    )

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Livro não encontrado.' })
      return
    }

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default router
