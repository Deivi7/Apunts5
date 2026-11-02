import { Hono } from 'hono'
import { createAuthMiddleware } from '../middleware/auth.js'

export function createCatalogRoutes({ catalog, authService }) {
  const app = new Hono()
  const requireAuth = createAuthMiddleware(authService)

  // Catálogo de lectura: autenticado en modo online
  app.use('*', requireAuth)

  app.get('/stages', async (c) => {
    const stages = await catalog.listStages()
    return c.json({ items: stages })
  })

  app.get('/courses', async (c) => {
    const stageId = c.req.query('stageId') || null
    const courses = await catalog.listCourses(stageId)
    return c.json({ items: courses })
  })

  app.get('/subjects', async (c) => {
    const subjects = await catalog.listSubjects()
    return c.json({ items: subjects })
  })

  app.get('/topics', async (c) => {
    const subjectId = c.req.query('subjectId') || null
    const topics = await catalog.listTopics(subjectId)
    return c.json({ items: topics })
  })

  app.get('/subjects/:subjectCode/topics/:topicCode', async (c) => {
    const found = await catalog.getTopic(c.req.param('subjectCode'), c.req.param('topicCode'))
    if (!found) return c.json({ error: 'Tema no encontrado' }, 404)
    return c.json(found)
  })

  app.get('/activities', async (c) => {
    const topicId = c.req.query('topicId')
    if (!topicId) return c.json({ error: 'topicId requerido' }, 400)
    const items = await catalog.listActivities(topicId)
    return c.json({ items })
  })

  app.get('/activities/:id', async (c) => {
    const item = await catalog.getActivity(c.req.param('id'))
    if (!item) return c.json({ error: 'Actividad no encontrada' }, 404)
    return c.json({ item })
  })

  return app
}
