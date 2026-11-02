import { Hono } from 'hono'
import { LoginSchema } from '../validators/auth.js'
import { rateLimit } from '../middleware/rateLimit.js'
import { createAuthMiddleware } from '../middleware/auth.js'

export function createAuthRoutes(authService) {
  const app = new Hono()
  const requireAuth = createAuthMiddleware(authService)

  app.post(
    '/login',
    rateLimit({
      windowMs: 60_000,
      max: 20,
      keyFn: (c) => `login:${c.req.header('x-forwarded-for') || 'local'}`,
    }),
    async (c) => {
      const body = await c.req.json().catch(() => null)
      const parsed = LoginSchema.safeParse(body)
      if (!parsed.success) {
        return c.json({ error: 'Datos inválidos', details: parsed.error.flatten() }, 400)
      }
      try {
        const result = await authService.login(parsed.data.email, parsed.data.password)
        return c.json(result)
      } catch (err) {
        return c.json({ error: err.message || 'Error de autenticación' }, err.status || 500)
      }
    },
  )

  app.post('/logout', requireAuth, async (c) => {
    await authService.logout(c.get('token'))
    return c.json({ ok: true })
  })

  app.get('/me', requireAuth, async (c) => {
    return c.json({ user: c.get('user') })
  })

  return app
}
