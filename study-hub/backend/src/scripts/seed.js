import { createDb } from '../adapters/createDb.js'
import { createUserRepository } from '../repositories/userRepository.js'
import { createCatalogRepository } from '../repositories/catalogRepository.js'
import { createAuthService } from '../services/authService.js'
import { createSessionRepository } from '../repositories/sessionRepository.js'
import { seedDatabase } from '../services/seedService.js'

const db = await createDb()
if (db.migrate) await db.migrate()
const users = createUserRepository(db)
const sessions = createSessionRepository(db)
const catalog = createCatalogRepository(db)
const auth = createAuthService({ users, sessions })
const result = await seedDatabase({ db, users, catalog, auth })
console.log('[seed]', result)
await db.close?.()
