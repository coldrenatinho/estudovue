import type { Usuario } from '../types.js'
import { Router } from 'express'
import { mapUsuario, pool } from '../db.js'
import { assinarToken, autenticar } from '../middleware/auth.js'
import { firebaseAdminConfigurado, verificarFirebaseIdToken } from '../services/firebase-admin.js'

const router = Router()

async function salvarUsuario (input: {
  authSub: string
  name: string
  email: string
  avatarUrl: string | null
}): Promise<Usuario> {
  const result = await pool.query(
    `
      INSERT INTO users (google_sub, name, email, avatar_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email)
      DO UPDATE SET google_sub = EXCLUDED.google_sub, name = EXCLUDED.name, avatar_url = EXCLUDED.avatar_url
      RETURNING *
    `,
    [input.authSub, input.name, input.email, input.avatarUrl],
  )

  return mapUsuario(result.rows[0])
}

router.post('/firebase', async (req, res, next) => {
  try {
    const idToken = String(req.body?.idToken || '')

    if (!idToken) {
      res.status(400).json({ message: 'ID token do Firebase não enviado.' })
      return
    }

    if (!firebaseAdminConfigurado()) {
      res.status(400).json({ message: 'Firebase Admin não foi configurado no backend.' })
      return
    }

    const decodedToken = await verificarFirebaseIdToken(idToken)

    if (!decodedToken.uid || !decodedToken.email) {
      res.status(401).json({ message: 'Token do Firebase inválido.' })
      return
    }

    if (decodedToken.email_verified === false) {
      res.status(401).json({ message: 'E-mail do Firebase não verificado.' })
      return
    }

    const user = await salvarUsuario({
      authSub: `firebase:${decodedToken.uid}`,
      name: decodedToken.name || decodedToken.email,
      email: decodedToken.email,
      avatarUrl: decodedToken.picture || null,
    })

    res.json({ token: assinarToken(user), user })
  } catch (error) {
    next(error)
  }
})

router.post('/demo', async (_req, res, next) => {
  try {
    if (process.env.ENABLE_DEMO_LOGIN === 'false') {
      res.status(403).json({ message: 'Modo demonstração desativado.' })
      return
    }

    const user = await salvarUsuario({
      authSub: 'demo-local',
      name: 'Aluno Demonstração',
      email: 'demo@sebo.local',
      avatarUrl: null,
    })

    res.json({ token: assinarToken(user), user })
  } catch (error) {
    next(error)
  }
})

router.get('/me', autenticar, (req, res) => {
  res.json({ user: req.user })
})

export default router
