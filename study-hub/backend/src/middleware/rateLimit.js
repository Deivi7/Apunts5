const buckets = new Map()

export function rateLimit({ windowMs = 60_000, max = 30, keyFn } = {}) {
  return async (c, next) => {
    const key = keyFn ? keyFn(c) : c.req.header('x-forwarded-for') || 'local'
    const now = Date.now()
    const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs }
    if (now > bucket.resetAt) {
      bucket.count = 0
      bucket.resetAt = now + windowMs
    }
    bucket.count += 1
    buckets.set(key, bucket)
    if (bucket.count > max) {
      return c.json({ error: 'Demasiadas peticiones' }, 429)
    }
    await next()
  }
}
