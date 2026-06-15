import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { esperarBanco, iniciarBanco, pool } from './db.js'
import authRoutes from './routes/auth.js'
import livrosRoutes from './routes/livros.js'
import 'dotenv/config'

const app = express()
const port = Number(process.env.PORT || 4000)
const allowedOrigins = new Set((process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:5173,http://localhost:8080')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean))

app.use(helmet())
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has('*') || allowedOrigins.has(origin)) {
      callback(null, true)
      return
    }

    callback(null, false)
  },
}))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/health', async (_req, res) => {
  await pool.query('SELECT 1')
  res.json({ status: 'ok', database: 'connected' })
})

app.get('/api', (_req, res) => {
  res.json({ name: 'Sebo Universitário API', version: '1.0.0' })
})

app.use('/api/auth', authRoutes)
app.use('/api/livros', livrosRoutes)

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error)
  res.status(500).json({ message: 'Erro interno do servidor.' })
})

await esperarBanco()
await iniciarBanco()

app.listen(port, '0.0.0.0', () => {
  console.log(`API do Sebo Universitário rodando na porta ${port}`)
})
