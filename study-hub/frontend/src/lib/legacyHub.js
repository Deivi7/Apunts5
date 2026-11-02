/** URL del portal HTML clàssic (arrel del repo sota /legacy/). */
export function legacyHubUrl(path = '') {
  const base = String(import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')
  const suffix = String(path || '').replace(/^\//, '')
  return `${base}legacy/${suffix}`
}
