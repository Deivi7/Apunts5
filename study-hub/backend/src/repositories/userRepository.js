export function createUserRepository(db) {
  if (db.driver === 'memory') {
    return {
      async findByEmail(email) {
        return db.findOne('users', (u) => u.email.toLowerCase() === email.toLowerCase())
      },
      async findById(id) {
        return db.findOne('users', (u) => u.id === id)
      },
      async create(user) {
        return db.insert('users', user)
      },
      async listRoles(userId) {
        const links = await db.findBy('user_roles', (r) => r.user_id === userId)
        const roles = []
        for (const link of links) {
          const role = await db.findOne('roles', (r) => r.id === link.role_id)
          if (role) roles.push(role)
        }
        return roles
      },
      async listPermissions(userId) {
        const roles = await this.listRoles(userId)
        const permIds = new Set()
        for (const role of roles) {
          const links = await db.findBy('role_permissions', (rp) => rp.role_id === role.id)
          links.forEach((l) => permIds.add(l.permission_id))
        }
        const permissions = []
        for (const id of permIds) {
          const p = await db.findOne('permissions', (x) => x.id === id)
          if (p) permissions.push(p)
        }
        return permissions
      },
      async assignRole(userId, roleId) {
        const exists = await db.findOne(
          'user_roles',
          (r) => r.user_id === userId && r.role_id === roleId,
        )
        if (!exists) await db.insert('user_roles', { user_id: userId, role_id: roleId })
      },
    }
  }

  return {
    async findByEmail(email) {
      const rows = await db.query('SELECT * FROM users WHERE email = :email LIMIT 1', { email })
      return rows[0] || null
    },
    async findById(id) {
      const rows = await db.query('SELECT * FROM users WHERE id = :id LIMIT 1', { id })
      return rows[0] || null
    },
    async create(user) {
      await db.execute(
        `INSERT INTO users (id, email, password_hash, display_name, is_active, created_at, updated_at)
         VALUES (:id, :email, :password_hash, :display_name, :is_active, :created_at, :updated_at)`,
        user,
      )
      return user
    },
    async listRoles(userId) {
      return db.query(
        `SELECT r.* FROM roles r
         INNER JOIN user_roles ur ON ur.role_id = r.id
         WHERE ur.user_id = :userId`,
        { userId },
      )
    },
    async listPermissions(userId) {
      return db.query(
        `SELECT DISTINCT p.* FROM permissions p
         INNER JOIN role_permissions rp ON rp.permission_id = p.id
         INNER JOIN user_roles ur ON ur.role_id = rp.role_id
         WHERE ur.user_id = :userId`,
        { userId },
      )
    },
    async assignRole(userId, roleId) {
      await db.execute(
        `INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (:userId, :roleId)`,
        { userId, roleId },
      )
    },
  }
}
