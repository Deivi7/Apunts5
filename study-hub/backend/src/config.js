import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })

function csv(value, fallback = []) {
  if (!value) return fallback
  return String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export const config = {
  port: Number(process.env.PORT || 8787),
  corsOrigins: csv(process.env.CORS_ORIGIN, [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
  ]),
  dbDriver: (process.env.DB_DRIVER || 'memory').toLowerCase(),
  databaseUrl: process.env.DATABASE_URL || '',
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'study',
    password: process.env.DB_PASSWORD || 'study',
    database: process.env.DB_NAME || 'study_hub',
  },
  sessionTtlHours: Number(process.env.SESSION_TTL_HOURS || 168),
  seed: {
    adminEmail: process.env.SEED_ADMIN_EMAIL || 'admin@studyhub.local',
    adminPassword: process.env.SEED_ADMIN_PASSWORD || 'CambiaEsto123!',
    studentEmail: process.env.SEED_STUDENT_EMAIL || 'alumno@studyhub.local',
    studentPassword: process.env.SEED_STUDENT_PASSWORD || 'Alumno123!',
  },
}
