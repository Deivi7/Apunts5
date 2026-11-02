import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../frontend/src/modules')
const reg = fs.readFileSync(path.join(root, 'customRegistry.js'), 'utf8')
const registered = [...reg.matchAll(/^\s{2}([A-Za-z0-9_]+):\s*\(\)/gm)].map((m) => m[1])
const customsDir = fs
  .readdirSync(path.join(root, 'customs'))
  .filter((f) => f.endsWith('.vue'))
  .map((f) => f.replace('.vue', ''))

const missingFiles = registered.filter((c) => !customsDir.includes(c))
const orphanFiles = customsDir.filter((c) => !registered.includes(c))

const mods = []
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) {
      if (e.name === 'customs') continue
      walk(p)
    } else if (e.name.endsWith('.js') && e.name !== 'createModule.js' && !e.name.includes('Data') && !e.name.includes('Cards') && e.name !== 'customRegistry.js' && e.name !== 'registry.js') {
      mods.push(p)
    }
  }
}
walk(root)

const issues = []
for (const p of mods) {
  const src = fs.readFileSync(p, 'utf8')
  const used = [...src.matchAll(/component:\s*['"]([A-Za-z0-9_]+)['"]/g)].map((m) => m[1])
  for (const c of used) {
    if (!registered.includes(c)) issues.push(`${path.relative(root, p)} uses unregistered ${c}`)
  }
}

console.log('registered', registered.length, 'vueFiles', customsDir.length)
console.log('missingFiles', missingFiles)
console.log('orphanFiles', orphanFiles)
console.log('unregisteredUses', issues)

// Manifest icons completeness
const topicsRoot = path.resolve(__dirname, '../content-packages/topics')
const subjects = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../content-packages/catalog/subjects.json'), 'utf8'),
)
const noIcon = []
for (const s of subjects.subjects || []) {
  for (const t of s.topics || []) {
    if (!t.vueModule) continue
    const manPath = path.join(topicsRoot, t.vueModule, 'manifest.json')
    if (!fs.existsSync(manPath)) continue
    const man = JSON.parse(fs.readFileSync(manPath, 'utf8'))
    for (const sec of man.sections || []) {
      if (!sec.icon) noIcon.push(`${t.vueModule}/${sec.id}`)
    }
  }
}
console.log('sectionsWithoutIcon', noIcon)
process.exit(missingFiles.length || issues.length || noIcon.length ? 1 : 0)
