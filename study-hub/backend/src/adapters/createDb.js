import { config } from '../config.js'
import { createMysqlAdapter } from './mysqlAdapter.js'
import { createMemoryAdapter } from './memoryAdapter.js'

export async function createDb() {
  if (config.dbDriver === 'memory') {
    const db = createMemoryAdapter()
    await db.init()
    return db
  }

  if (config.dbDriver === 'mysql' || config.dbDriver === 'mariadb') {
    const db = createMysqlAdapter(config)
    await db.init()
    return db
  }

  throw new Error(`DB_DRIVER no soportado en v1: ${config.dbDriver}. Usa memory | mysql | mariadb`)
}
