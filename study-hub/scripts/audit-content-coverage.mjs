import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const studyHub = path.resolve(__dirname, '..')
const repoRoot = path.resolve(studyHub, '..')
const subjects = JSON.parse(
  fs.readFileSync(path.join(studyHub, 'content-packages/catalog/subjects.json'), 'utf8'),
)

/** Secciones que pueden no tener ejercicios (docs/cheatsheet). */
const SECTION_ALLOWLIST = new Set([
  'docs', 'fitxes', 'documentos', 'documents', 'recursos', 'tab-print', 'tab-documents',
  'cheatsheet', 'xulla', 'print',
])

/**
 * Temas con deuda conocida (fase 2+). Documentados en docs/MIGRATION_QA.md.
 * Mientras estén aquí, noEx/orphan no hacen fallar el audit global;
 * sí fallan missingCustoms y missingPanels.
 */
const TOPIC_DEBT_ALLOWLIST = new Set([
  'mates/romanos',
  'mates/posat_a_prova_1',
  'projecte/pasdeltemps',
  'catala/posat_a_prova_1',
  'catala/tema2',
  'tutoria/calendario',
  'curie/wordslist',
])

const INTERACTION_PATTERNS = [
  { name: 'onclick', re: /onclick\s*=/gi },
  { name: 'checkFns', re: /\bfunction\s+check[A-Z]\w*/g },
  { name: 'canvas', re: /<canvas\b/gi },
  { name: 'inputs', re: /<input\b/gi },
  { name: 'selects', re: /<select\b/gi },
]

function extractPanelIds(html) {
  return [...html.matchAll(/<section[^>]*id="((?:panel|tab|view)-[^"]+)"/gi)].map((m) => m[1])
}

function countInteractions(html) {
  const out = {}
  for (const p of INTERACTION_PATTERNS) {
    out[p.name] = (html.match(p.re) || []).length
  }
  out.total = Object.values(out).reduce((a, b) => a + b, 0)
  return out
}

function extractExerciseKeys(src) {
  const keys = new Set()
  for (const m of src.matchAll(/^\s{2,6}(?:['"]([A-Za-z0-9_-]+)['"]|([A-Za-z0-9_-]+)):\s*\[/gm)) {
    keys.add(m[1] || m[2])
  }
  return [...keys]
}

function extractCustomComponents(src) {
  return [...src.matchAll(/component:\s*['"]([A-Za-z0-9_]+)['"]/g)].map((m) => m[1])
}

const registryPath = path.join(studyHub, 'frontend/src/modules/customRegistry.js')
const registrySrc = fs.existsSync(registryPath) ? fs.readFileSync(registryPath, 'utf8') : ''
const registeredCustoms = new Set(
  [...registrySrc.matchAll(/^\s{2}([A-Za-z0-9_]+):\s*\(\)\s*=>/gm)].map((m) => m[1]),
)

const report = []
const failures = []

for (const s of subjects.subjects || []) {
  for (const t of s.topics || []) {
    if (!t.vueModule) continue
    const htmlPath = path.join(repoRoot, t.vueModule, 'Apuntes.html')
    const manPath = path.join(studyHub, 'content-packages/topics', t.vueModule, 'manifest.json')
    const panelsDir = path.join(studyHub, 'content-packages/topics', t.vueModule, 'panels')
    const modPath = path.join(studyHub, 'frontend/src/modules', `${t.vueModule}.js`)

    if (!fs.existsSync(htmlPath)) {
      report.push({ key: t.vueModule, issue: 'NO_SOURCE_HTML' })
      if (!TOPIC_DEBT_ALLOWLIST.has(t.vueModule)) {
        failures.push(`${t.vueModule}: NO_SOURCE_HTML`)
      }
      continue
    }
    const html = fs.readFileSync(htmlPath, 'utf8')
    const panelIds = extractPanelIds(html)
    const interactions = countInteractions(html)
    const man = fs.existsSync(manPath) ? JSON.parse(fs.readFileSync(manPath, 'utf8')) : null
    const diskPanels = fs.existsSync(panelsDir)
      ? fs.readdirSync(panelsDir).filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/i, ''))
      : []
    const missingPanels = panelIds.filter((id) => !diskPanels.includes(id))
    const panelSizes = Object.fromEntries(
      diskPanels.map((id) => {
        const p = path.join(panelsDir, `${id}.html`)
        return [id, fs.statSync(p).size]
      }),
    )

    let exerciseKeys = []
    let customComponents = []
    if (fs.existsSync(modPath)) {
      const src = fs.readFileSync(modPath, 'utf8')
      exerciseKeys = extractExerciseKeys(src)
      customComponents = extractCustomComponents(src)
    }

    const sectionIds = (man?.sections || []).map((x) => x.id)
    const sectionsWithoutExercises = sectionIds.filter((id) => {
      if (SECTION_ALLOWLIST.has(id)) return false
      const sec = (man?.sections || []).find((x) => x.id === id)
      if (sec?.role === 'theory' || sec?.role === 'docs') return false
      return !exerciseKeys.includes(id)
    })

    const missingCustoms = customComponents.filter((c) => !registeredCustoms.has(c))

    const orphanRisk = interactions.total > 20
      && exerciseKeys.length === 0
      && customComponents.length === 0

    const entry = {
      key: t.vueModule,
      sectionIds,
      panelIds,
      missingPanels,
      panelSizes,
      theoryLen: (man?.theoryHtml || '').length,
      resources: (man?.resources || []).length,
      documents: (man?.documents || []).length,
      exerciseKeys,
      customComponents,
      missingCustoms,
      sectionsWithoutExercises,
      interactions,
      orphanRisk,
      firstSectionRole: man?.sections?.[0]?.role || null,
    }
    report.push(entry)

    const inDebt = TOPIC_DEBT_ALLOWLIST.has(t.vueModule)
    if (missingPanels.length) failures.push(`${t.vueModule}: missingPanels=${missingPanels.join(',')}`)
    if (missingCustoms.length) {
      failures.push(`${t.vueModule}: missingCustoms=${missingCustoms.join(',')}`)
    }
    if (!inDebt && sectionsWithoutExercises.length) {
      failures.push(`${t.vueModule}: noEx=${sectionsWithoutExercises.join(',')}`)
    }
    if (!inDebt && orphanRisk) {
      failures.push(`${t.vueModule}: orphanInteractions (legacy rich, no Vue exercises)`)
    }
  }
}

const out = path.join(studyHub, 'content-packages/topics/coverage-report.json')
fs.writeFileSync(out, JSON.stringify(report, null, 2))
console.log('Wrote', out)

for (const r of report) {
  const flags = []
  if (r.missingPanels?.length) flags.push(`missingPanels=${r.missingPanels.join(',')}`)
  if (r.theoryLen === 0) flags.push('NO_THEORY')
  if (r.sectionsWithoutExercises?.length) flags.push(`noEx=${r.sectionsWithoutExercises.join(',')}`)
  if (r.missingCustoms?.length) flags.push(`missingCustoms=${r.missingCustoms.join(',')}`)
  if (r.orphanRisk) flags.push('ORPHAN_INTERACTIONS')
  if (r.firstSectionRole === 'interactive') flags.push('FIRST_NOT_THEORY')
  const ix = r.interactions
    ? `ix(onclick=${r.interactions.onclick},check=${r.interactions.checkFns},canvas=${r.interactions.canvas})`
    : ''
  console.log(`${r.key}: theory=${r.theoryLen} secs=${(r.sectionIds || []).length} ${ix} ${flags.join(' | ') || 'ok'}`)
}

if (failures.length) {
  console.error('\ncontent:audit FAILED:')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}

console.log('\ncontent:audit OK')
