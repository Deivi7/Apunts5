import { createDb } from '../adapters/createDb.js'

const db = await createDb()
await db.migrate()
console.log(`[migrate] driver=${db.driver} ok`)
await db.close?.()
