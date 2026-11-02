import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')
const subjects = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../content-packages/catalog/subjects.json'), 'utf8'),
)

const mismatches = []
const ok = []
const skipped = []

for (const s of subjects.subjects || []) {
  for (const t of s.topics || []) {
    if (!t.vueModule || !t.migrated) continue
    const manPath = path.resolve(__dirname, `../content-packages/topics/${t.vueModule}/manifest.json`)
    // folder name may differ from topic id (e.g. projecte/coordenadas)
    const legacyCandidates = [
      path.join(root, `${t.vueModule}/Apuntes.html`),
      path.join(root, s.localFolder || '', t.id, 'Apuntes.html'),
    ]
    const legacyPath = legacyCandidates.find((p) => fs.existsSync(p))
    if (!fs.existsSync(manPath) || !legacyPath) {
      skipped.push({ topic: t.vueModule, reason: !legacyPath ? 'no-legacy' : 'no-manifest' })
      continue
    }
    const man = JSON.parse(fs.readFileSync(manPath, 'utf8'))
    const html = fs.readFileSync(legacyPath, 'utf8')
    const legacyIcons = [...html.matchAll(/class="sidebar-btn-icon"[^>]*>([^<]+)</g)].map((m) => m[1].trim())
    if (!legacyIcons.length) {
      skipped.push({ topic: t.vueModule, reason: 'no-sidebar-icons-in-legacy' })
      continue
    }

    let vueCmp = (man.sections || []).map((sec) => sec.icon)
    // Vue often adds didactic theory section first
    if (vueCmp.length === legacyIcons.length + 1 && (man.sections || [])[0]?.role === 'theory') {
      vueCmp = vueCmp.slice(1)
    }

    const diff = []
    const n = Math.max(vueCmp.length, legacyIcons.length)
    for (let i = 0; i < n; i++) {
      if (vueCmp[i] !== legacyIcons[i]) diff.push({ i, vue: vueCmp[i], legacy: legacyIcons[i] })
    }
    if (diff.length) mismatches.push({ topic: t.vueModule, legacyIcons, vueCmp, diff })
    else ok.push(t.vueModule)
  }
}

console.log('OK', ok)
console.log('SKIPPED', skipped)
console.log('MISMATCHES', JSON.stringify(mismatches, null, 2))
process.exit(mismatches.length ? 1 : 0)
