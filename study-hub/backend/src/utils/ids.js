import { createHash, randomBytes, randomUUID } from 'node:crypto'

export function newId() {
  return randomUUID()
}

export function nowSql() {
  return new Date().toISOString().slice(0, 23).replace('T', ' ')
}

export function hashToken(token) {
  return createHash('sha256').update(token).digest('hex')
}

export function newSessionToken() {
  return randomBytes(32).toString('hex')
}
