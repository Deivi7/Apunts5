import fs from 'node:fs'
import path from 'node:path'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
}

/** Serveix l'arrel del repo sota /legacy/ en `vite dev`. */
export function serveLegacyHub(repoRoot) {
  const root = path.resolve(repoRoot)
  return {
    name: 'serve-legacy-hub',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/legacy')) return next()
        const raw = decodeURIComponent(req.url.split('?')[0].slice('/legacy'.length) || '/')
        let rel = raw === '' || raw === '/' ? '/index.html' : raw
        let file = path.normalize(path.join(root, rel))
        if (!file.startsWith(root)) return next()
        if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
          file = path.join(file, 'index.html')
        }
        if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return next()
        const ext = path.extname(file).toLowerCase()
        res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
        fs.createReadStream(file).pipe(res)
      })
    },
  }
}
