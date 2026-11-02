import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mysql from 'mysql2/promise'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function parseDatabaseUrl(url) {
  if (!url) return null
  const u = new URL(url)
  return {
    host: u.hostname,
    port: Number(u.port || 3306),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ''),
  }
}

export function createMysqlAdapter(config) {
  const fromUrl = parseDatabaseUrl(config.databaseUrl)
  const conf = fromUrl || config.db
  let pool

  return {
    driver: config.dbDriver,
    async init() {
      pool = mysql.createPool({
        host: conf.host,
        port: conf.port,
        user: conf.user,
        password: conf.password,
        database: conf.database,
        waitForConnections: true,
        connectionLimit: 10,
        namedPlaceholders: true,
        dateStrings: true,
      })
      await pool.query('SELECT 1')
    },
    async query(sql, params = {}) {
      const [rows] = await pool.query(sql, params)
      return rows
    },
    async execute(sql, params = {}) {
      const [result] = await pool.execute(sql, params)
      return result
    },
    async withTransaction(fn) {
      const conn = await pool.getConnection()
      try {
        await conn.beginTransaction()
        const tx = {
          query: async (sql, params = {}) => {
            const [rows] = await conn.query(sql, params)
            return rows
          },
          execute: async (sql, params = {}) => {
            const [result] = await conn.execute(sql, params)
            return result
          },
        }
        const out = await fn(tx)
        await conn.commit()
        return out
      } catch (err) {
        await conn.rollback()
        throw err
      } finally {
        conn.release()
      }
    },
    async migrate() {
      const migrationsDir = path.resolve(__dirname, '../../migrations')
      const files = (await fs.readdir(migrationsDir)).filter((f) => f.endsWith('.sql')).sort()
      await pool.query(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
          id VARCHAR(64) PRIMARY KEY,
          applied_at DATETIME(3) NOT NULL
        )
      `)
      for (const file of files) {
        const id = file
        const [existing] = await pool.query('SELECT id FROM schema_migrations WHERE id = ?', [id])
        if (existing.length) continue
        const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8')
        const statements = sql
          .split(/;\s*\n/)
          .map((s) => s.trim())
          .filter((s) => s && !s.startsWith('--'))
        const conn = await pool.getConnection()
        try {
          await conn.beginTransaction()
          for (const stmt of statements) {
            await conn.query(stmt)
          }
          await conn.query('INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)', [
            id,
            new Date().toISOString().slice(0, 23).replace('T', ' '),
          ])
          await conn.commit()
          console.log(`[migrate] applied ${id}`)
        } catch (err) {
          await conn.rollback()
          throw err
        } finally {
          conn.release()
        }
      }
    },
    async close() {
      if (pool) await pool.end()
    },
  }
}
