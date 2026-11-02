/**
 * Després del build Vite: copia el portal HTML clàssic a dist/legacy/
 * perquè GitHub Pages serveixi Vue a l'arrel i el hub antic a /legacy/.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const studyHub = path.resolve(__dirname, '..')
const repoRoot = path.resolve(studyHub, '..')
const dist = path.join(studyHub, 'frontend/dist')
const legacyOut = path.join(dist, 'legacy')

const SKIP = new Set([
  '.git',
  '.github',
  '.cursor',
  'node_modules',
  'study-hub',
  'docs',
  '.vscode',
  'coverage',
])

if (!fs.existsSync(dist)) {
  console.error('No existeix frontend/dist. Executa abans: npm run build')
  process.exit(1)
}

fs.rmSync(legacyOut, { recursive: true, force: true })
fs.mkdirSync(legacyOut, { recursive: true })

function copyRecursive(src, dest) {
  const st = fs.statSync(src)
  if (st.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })
    for (const name of fs.readdirSync(src)) {
      if (name === 'node_modules' || name === '.git') continue
      copyRecursive(path.join(src, name), path.join(dest, name))
    }
  } else {
    fs.copyFileSync(src, dest)
  }
}

for (const name of fs.readdirSync(repoRoot)) {
  if (SKIP.has(name)) continue
  if (name.startsWith('.')) continue
  const src = path.join(repoRoot, name)
  copyRecursive(src, path.join(legacyOut, name))
}

console.log('Portal clàssic copiat a', legacyOut)
