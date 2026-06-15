import type { Usuario } from '../types.js'
import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { mapUsuario, pool } from '../db.js'

declare global {
  // Express usa namespace para permitir aumentar o tipo Request.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: Usuario
    }
  }
}

function jwtSecret () {
  return process.env.JWT_SECRET || 'troque-este-segredo-em-producao'
}

export function assinarToken (user: Usuario) {
  return jwt.sign(
    { email: user.email, name: user.name },
    jwtSecret(),
    { subject: String(user.id), expiresIn: '7d' },
  )
}

export async function autenticar (req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token de autenticação não enviado.' })
    return
  }

  try {
    const token = header.replace('Bearer ', '')
    const payload = jwt.verify(token, jwtSecret())
    const userId = Number(payload.sub)

    if (!userId) {
      res.status(401).json({ message: 'Token inválido.' })
      return
    }

    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId])
    if (result.rowCount === 0) {
      res.status(401).json({ message: 'Usuário não encontrado.' })
      return
    }

    req.user = mapUsuario(result.rows[0])
    next()
  } catch {
    res.status(401).json({ message: 'Sessão expirada ou inválida.' })
  }
}
