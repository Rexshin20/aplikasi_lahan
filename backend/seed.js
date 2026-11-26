import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { isDbConfigured, query } from './db.js'

if (!isDbConfigured) {
  console.error('Isi dulu backend/.env dari .env.example sebelum menjalankan seed.')
  process.exit(1)
}

const stats = [
  ['clients', '236', '+18,33%'],
  ['earnings', '$18.306', null],
  ['newProjects', '1538', '-18,33%'],
  ['projects', '864', null],
]

const leaders = [
  ['Hanna Gover', 'hgover@gmail.com', '/images/leader-1.jpg', 'Elite Admin', 'DS,SS,RP', 'Sedang Diuji', 'bg-brand', 35, '$96K'],
  ['Daniel Kristeen', 'Kristeen@gmail.com', '/images/leader-2.jpg', 'Real Homes WP Theme', 'DS,SS', 'Selesai', 'bg-success', 32, '$85K'],
  ['Julian Josephs', 'Josephs@gmail.com', '/images/leader-3.jpg', 'MedicalPro WP Theme', 'DS,SS,RP', 'Selesai', 'bg-brand', 29, '$81K'],
  ['Jan Petrovic', 'hgover@gmail.com', '/images/leader-4.jpg', 'Hosting Press HTML', 'DS,SS', 'Sedang Berjalan', 'bg-danger', 23, '$80K'],
]

async function main() {
  const password = await bcrypt.hash('admin123', 10)

  await query(
    `INSERT INTO users (username, password, name) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE password = VALUES(password), name = VALUES(name)`,
    ['admin', password, 'Jason Doe'],
  )

  for (const [stat_key, value, change_value] of stats) {
    await query(
      `INSERT INTO dashboard_stats (stat_key, value, change_value) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE value = VALUES(value), change_value = VALUES(change_value)`,
      [stat_key, value, change_value],
    )
  }

  for (const [name, email, photo, project, members, status, status_color, weeks, budget] of leaders) {
    await query(
      `INSERT INTO leaders (name, email, photo, project, members, status, status_color, weeks, budget)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE project = VALUES(project), weeks = VALUES(weeks), budget = VALUES(budget)`,
      [name, email, photo, project, members, status, status_color, weeks, budget],
    )
  }

  console.log('Seed selesai. Akun demo: admin / admin123')
}

main().catch((error) => {
  console.error('Seed gagal:', error.message)
  process.exitCode = 1
})
