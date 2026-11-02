export function createAuthMiddleware(authService) {
  return async function requireAuth(c, next) {
    const header = c.req.header('authorization') || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    const user = await authService.me(token)
    if (!user) {
      return c.json({ error: 'No autenticado' }, 401)
    }
    c.set('user', user)
    c.set('token', token)
    await next()
  }
}

export function requirePermission(code) {
  return async function permissionGuard(c, next) {
    const user = c.get('user')
    if (!user?.permissions?.includes(code) && !user?.roles?.includes('admin')) {
      return c.json({ error: 'Permiso denegado' }, 403)
    }
    await next()
  }
}
