import { serve } from '@hono/node-server'
import { config } from './config.js'
import { createDb } from './adapters/createDb.js'
import { createUserRepository } from './repositories/userRepository.js'
import { createSessionRepository } from './repositories/sessionRepository.js'
import { createCatalogRepository } from './repositories/catalogRepository.js'
import { createAuthService } from './services/authService.js'
import { seedDatabase } from './services/seedService.js'
import { createApp } from './app.js'

async function main() {
  const db = await createDb()
  if (db.migrate) await db.migrate()

  const users = createUserRepository(db)
  const sessions = createSessionRepository(db)
  const catalog = createCatalogRepository(db)
  const authService = createAuthService({ users, sessions })

  const seeded = await seedDatabase({ db, users, catalog, auth: authService })
  console.log(
    `[seed] usuarios listos · admin=${seeded.adminEmail} · alumno=${seeded.studentEmail}`,
  )

  const app = createApp({ db, authService, catalog })

  serve({ fetch: app.fetch, port: config.port })
  console.log(`[study-hub-backend] ${db.driver} · http://127.0.0.1:${config.port}`)
}

main().catch((err) => {
  console.error('[fatal]', err)
  process.exit(1)
})
