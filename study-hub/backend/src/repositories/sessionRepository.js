export function createSessionRepository(db) {
  if (db.driver === 'memory') {
    return {
      async create(session) {
        return db.insert('sessions', session)
      },
      async findValidByTokenHash(tokenHash, now) {
        return db.findOne(
          'sessions',
          (s) => s.token_hash === tokenHash && !s.revoked_at && s.expires_at >= now,
        )
      },
      async revoke(sessionId, revokedAt) {
        await db.update('sessions', (s) => s.id === sessionId, { revoked_at: revokedAt })
      },
    }
  }

  return {
    async create(session) {
      await db.execute(
        `INSERT INTO sessions (id, user_id, token_hash, expires_at, created_at, revoked_at)
         VALUES (:id, :user_id, :token_hash, :expires_at, :created_at, :revoked_at)`,
        { ...session, revoked_at: session.revoked_at ?? null },
      )
      return session
    },
    async findValidByTokenHash(tokenHash, now) {
      const rows = await db.query(
        `SELECT * FROM sessions
         WHERE token_hash = :tokenHash
           AND revoked_at IS NULL
           AND expires_at >= :now
         LIMIT 1`,
        { tokenHash, now },
      )
      return rows[0] || null
    },
    async revoke(sessionId, revokedAt) {
      await db.execute(
        `UPDATE sessions SET revoked_at = :revokedAt WHERE id = :sessionId`,
        { sessionId, revokedAt },
      )
    },
  }
}
