import { config } from '../config.js'
import { hashPassword, verifyPassword } from '../auth/password.js'
import { hashToken, newId, newSessionToken, nowSql } from '../utils/ids.js'

function publicUser(user, roles = [], permissions = []) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.display_name,
    roles: roles.map((r) => r.code),
    permissions: permissions.map((p) => p.code),
  }
}

export function createAuthService({ users, sessions }) {
  return {
    async login(email, password) {
      const user = await users.findByEmail(email)
      if (!user || !user.is_active) {
        const err = new Error('Credenciales inválidas')
        err.status = 401
        throw err
      }
      const ok = await verifyPassword(user.password_hash, password)
      if (!ok) {
        const err = new Error('Credenciales inválidas')
        err.status = 401
        throw err
      }

      const token = newSessionToken()
      const createdAt = nowSql()
      const expires = new Date(Date.now() + config.sessionTtlHours * 3600 * 1000)
      const expiresAt = expires.toISOString().slice(0, 23).replace('T', ' ')
      await sessions.create({
        id: newId(),
        user_id: user.id,
        token_hash: hashToken(token),
        expires_at: expiresAt,
        created_at: createdAt,
        revoked_at: null,
      })

      const roles = await users.listRoles(user.id)
      const permissions = await users.listPermissions(user.id)
      return {
        token,
        expiresAt,
        user: publicUser(user, roles, permissions),
      }
    },

    async logout(token) {
      if (!token) return
      const session = await sessions.findValidByTokenHash(hashToken(token), nowSql())
      if (session) await sessions.revoke(session.id, nowSql())
    },

    async me(token) {
      if (!token) return null
      const session = await sessions.findValidByTokenHash(hashToken(token), nowSql())
      if (!session) return null
      const user = await users.findById(session.user_id)
      if (!user || !user.is_active) return null
      const roles = await users.listRoles(user.id)
      const permissions = await users.listPermissions(user.id)
      return publicUser(user, roles, permissions)
    },

    async ensureRole(dbLike, { id, code, name }) {
      if (dbLike.driver === 'memory') {
        const existing = await dbLike.findOne('roles', (r) => r.code === code)
        if (existing) return existing
        return dbLike.insert('roles', { id, code, name, created_at: nowSql() })
      }
      await dbLike.execute(
        `INSERT INTO roles (id, code, name, created_at)
         VALUES (:id, :code, :name, :created_at)
         ON DUPLICATE KEY UPDATE name = VALUES(name)`,
        { id, code, name, created_at: nowSql() },
      )
      const rows = await dbLike.query('SELECT * FROM roles WHERE code = :code LIMIT 1', { code })
      return rows[0]
    },

    async ensurePermission(dbLike, { id, code, description }) {
      if (dbLike.driver === 'memory') {
        const existing = await dbLike.findOne('permissions', (p) => p.code === code)
        if (existing) return existing
        return dbLike.insert('permissions', { id, code, description, created_at: nowSql() })
      }
      await dbLike.execute(
        `INSERT INTO permissions (id, code, description, created_at)
         VALUES (:id, :code, :description, :created_at)
         ON DUPLICATE KEY UPDATE description = VALUES(description)`,
        { id, code, description, created_at: nowSql() },
      )
      const rows = await dbLike.query('SELECT * FROM permissions WHERE code = :code LIMIT 1', {
        code,
      })
      return rows[0]
    },

    async linkRolePermission(dbLike, roleId, permissionId) {
      if (dbLike.driver === 'memory') {
        const exists = await dbLike.findOne(
          'role_permissions',
          (rp) => rp.role_id === roleId && rp.permission_id === permissionId,
        )
        if (!exists) {
          await dbLike.insert('role_permissions', {
            role_id: roleId,
            permission_id: permissionId,
          })
        }
        return
      }
      await dbLike.execute(
        `INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (:roleId, :permissionId)`,
        { roleId, permissionId },
      )
    },

    hashPassword,
  }
}
