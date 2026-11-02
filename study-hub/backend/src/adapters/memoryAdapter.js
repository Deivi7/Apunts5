import { nowSql } from '../utils/ids.js'

function clone(value) {
  return structuredClone(value)
}

export function createMemoryAdapter() {
  const state = {
    roles: [],
    permissions: [],
    role_permissions: [],
    users: [],
    user_profiles: [],
    user_roles: [],
    sessions: [],
    educational_stages: [],
    courses: [],
    subjects: [],
    course_subjects: [],
    topics: [],
    topic_subjects: [],
    activities: [],
    activity_versions: [],
    exercises: [],
    exercise_versions: [],
    documents: [],
    resources: [],
    activity_attempts: [],
    exercise_attempts: [],
    attempt_answers: [],
    activity_results: [],
    achievements: [],
    user_achievements: [],
    xp_transactions: [],
    schema_migrations: [{ id: 'memory-bootstrap', applied_at: nowSql() }],
  }

  return {
    driver: 'memory',
    state,
    async init() {
      /* ready */
    },
    async migrate() {
      /* schema is in-memory already */
    },
    table(name) {
      if (!state[name]) state[name] = []
      return state[name]
    },
    async findBy(table, predicate) {
      return this.table(table).filter(predicate).map(clone)
    },
    async findOne(table, predicate) {
      const row = this.table(table).find(predicate)
      return row ? clone(row) : null
    },
    async insert(table, row) {
      this.table(table).push(clone(row))
      return clone(row)
    },
    async update(table, predicate, patch) {
      const rows = this.table(table)
      let count = 0
      for (let i = 0; i < rows.length; i++) {
        if (predicate(rows[i])) {
          rows[i] = { ...rows[i], ...patch }
          count += 1
        }
      }
      return count
    },
    async withTransaction(fn) {
      return fn(this)
    },
    async close() {
      /* noop */
    },
  }
}
