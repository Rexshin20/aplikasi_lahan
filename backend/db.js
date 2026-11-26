import 'dotenv/config'
import mysql from 'mysql2/promise'

export const isDbConfigured = Boolean(process.env.DB_HOST)

export const pool = isDbConfigured
  ? mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'aplikasi_lahan',
      waitForConnections: true,
      connectionLimit: 10,
    })
  : null

export async function query(sql, params = []) {
  if (!pool) throw new Error('Database belum dikonfigurasi. Isi file backend/.env')
  const [rows] = await pool.query(sql, params)
  return rows
}
