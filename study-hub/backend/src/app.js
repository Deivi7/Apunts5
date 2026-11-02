import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { config } from './config.js'
import { createAuthRoutes } from './routes/auth.js'
import { createCatalogRoutes } from './routes/catalog.js'

export function createApp(deps) {
  const app = new Hono()

  app.use(
    '*',
    cors({
      origin: config.corsOrigins,
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  )

  app.get('/', (c) =>
    c.json({
      name: 'Álvaro Study Hub API',
      version: '0.6.0',
      health: '/api/health',
      auth: ['/api/auth/login', '/api/auth/logout', '/api/auth/me'],
    }),
  )

  app.get('/api/health', async (c) => {
    let dbOk = true
    let dbError = null
    try {
      if (deps.db.driver === 'memory') {
        dbOk = true
      } else {
        await deps.db.query('SELECT 1 AS ok')
      }
    } catch (err) {
      dbOk = false
      dbError = err.message
    }

    return c.json({
      status: dbOk ? 'ok' : 'degraded',
      service: 'study-hub-backend',
      dbDriver: deps.db.driver,
      sqlEnginesV1: ['mysql', 'mariadb'],
      dbOk,
      dbError,
      time: new Date().toISOString(),
      note: 'Modo local del frontend no debe persistir resultados académicos.',
    })
  })

  app.route('/api/auth', createAuthRoutes(deps.authService))
  app.route('/api', createCatalogRoutes({ catalog: deps.catalog, authService: deps.authService }))

  app.onError((err, c) => {
    console.error('[api]', err)
    return c.json({ error: err.message || 'Error interno' }, err.status || 500)
  })

  return app
}
