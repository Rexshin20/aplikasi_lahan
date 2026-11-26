import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isDbConfigured, query } from './db.js'

const app = express()
const PORT = Number(process.env.PORT || 5000)
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

app.use(cors())
app.use(express.json())

const fallbackStats = {
  clients: { value: '236', change: '+18,33%' },
  earnings: { value: '$18.306' },
  newProjects: { value: '1538', change: '-18,33%' },
  projects: { value: '864' },
}

const fallbackLeaders = [
  { name: 'Hanna Gover', email: 'hgover@gmail.com', photo: '/images/leader-1.jpg', project: 'Elite Admin', team: ['DS', 'SS', 'RP'], status: 'Sedang Diuji', statusColor: 'bg-brand', weeks: 35, budget: '$96K' },
  { name: 'Daniel Kristeen', email: 'Kristeen@gmail.com', photo: '/images/leader-2.jpg', project: 'Real Homes WP Theme', team: ['DS', 'SS'], status: 'Selesai', statusColor: 'bg-success', weeks: 32, budget: '$85K' },
  { name: 'Julian Josephs', email: 'Josephs@gmail.com', photo: '/images/leader-3.jpg', project: 'MedicalPro WP Theme', team: ['DS', 'SS', 'RP'], status: 'Selesai', statusColor: 'bg-brand', weeks: 29, budget: '$81K' },
  { name: 'Jan Petrovic', email: 'hgover@gmail.com', photo: '/images/leader-4.jpg', project: 'Hosting Press HTML', team: ['DS', 'SS'], status: 'Sedang Berjalan', statusColor: 'bg-danger', weeks: 23, budget: '$80K' },
]

function signToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' })
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Belum masuk. Silakan masuk terlebih dahulu.' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Sesi berakhir. Silakan masuk kembali.' })
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, database: isDbConfigured ? 'terkonfigurasi' : 'mode demo' })
})

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body || {}

  if (!username || !password) {
    return res.status(400).json({ message: 'Nama pengguna dan kata sandi wajib diisi.' })
  }

  if (!isDbConfigured) {
    if (username === 'admin' && password === 'admin123') {
      const user = { id: 1, username: 'admin', name: 'Jason Doe' }
      return res.json({ token: signToken(user), user })
    }
    return res.status(401).json({ message: 'Nama pengguna atau kata sandi salah.' })
  }

  try {
    const rows = await query('SELECT * FROM users WHERE username = ?', [username])
    const user = rows[0]
    const valid = user && (await bcrypt.compare(password, user.password))
    if (!valid) return res.status(401).json({ message: 'Nama pengguna atau kata sandi salah.' })

    const safe = { id: user.id, username: user.username, name: user.name }
    res.json({ token: signToken(safe), user: safe })
  } catch (error) {
    res.status(500).json({ message: 'Gagal memeriksa akun.', detail: error.message })
  }
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

app.get('/api/dashboard/stats', async (_req, res) => {
  try {
    const rows = await query('SELECT stat_key, value, change_value FROM dashboard_stats')
    const stats = {}
    for (const row of rows) {
      stats[row.stat_key] = {
        value: row.value,
        ...(row.change_value ? { change: row.change_value } : {}),
      }
    }
    res.json(Object.keys(stats).length ? stats : fallbackStats)
  } catch {
    res.json(fallbackStats)
  }
})

app.get('/api/dashboard/leaders', async (_req, res) => {
  try {
    const rows = await query('SELECT * FROM leaders ORDER BY id ASC')
    res.json(
      rows.length
        ? rows.map((row) => ({
            name: row.name,
            email: row.email,
            photo: row.photo,
            project: row.project,
            team: String(row.members).split(','),
            status: row.status,
            statusColor: row.status_color,
            weeks: row.weeks,
            budget: row.budget,
          }))
        : fallbackLeaders,
    )
  } catch {
    res.json(fallbackLeaders)
  }
})

app.use((_req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan.' })
})

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ message: 'Terjadi kesalahan pada server.' })
})

app.listen(PORT, () => {
  console.log(`Backend siap di http://localhost:${PORT} (${isDbConfigured ? 'MySQL' : 'mode demo'})`)
})
