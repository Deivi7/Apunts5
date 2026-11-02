import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const studyHub = path.resolve(__dirname, '..')
const repoRoot = path.resolve(studyHub, '..')
const subjects = JSON.parse(
  fs.readFileSync(path.join(studyHub, 'content-packages/catalog/subjects.json'), 'utf8'),
)

function read(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : ''
}

function extractExerciseKeys(src) {
  const keys = new Set()
  for (const m of src.matchAll(/^\s{2,6}(?:['"]([A-Za-z0-9_-]+)['"]|([A-Za-z0-9_-]+)):\s*\[/gm)) {
    keys.add(m[1] || m[2])
  }
  return [...keys]
}

function extractCustoms(src) {
  return [...new Set([...src.matchAll(/component:\s*['"]([A-Za-z0-9_]+)['"]/g)].map((m) => m[1]))]
}

function extractTypes(src) {
  return [...new Set([...src.matchAll(/type:\s*['"]([a-z_]+)['"]/g)].map((m) => m[1]))]
}

function extractPanels(html) {
  return [...new Set(
    [...html.matchAll(/<(?:section|div)[^>]*id=["']((?:panel|tab|view)-[^"']+)["']/gi)].map((m) => m[1]),
  )]
}

function interactionCounts(html) {
  return {
    onclick: (html.match(/onclick\s*=/gi) || []).length,
    checks: (html.match(/\bfunction\s+check[A-Z]\w*/g) || []).length,
    canvas: (html.match(/<canvas\b/gi) || []).length,
    inputs: (html.match(/<input\b/gi) || []).length,
    selects: (html.match(/<select\b/gi) || []).length,
    speakText: (html.match(/speakText\s*\(/g) || []).length,
  }
}

const rows = []
for (const s of subjects.subjects || []) {
  for (const t of s.topics || []) {
    if (!t.vueModule) continue
    const manPath = path.join(studyHub, 'content-packages/topics', t.vueModule, 'manifest.json')
    const modPath = path.join(studyHub, 'frontend/src/modules', `${t.vueModule}.js`)
    const htmlPath = path.join(repoRoot, t.vueModule, 'Apuntes.html')
    const man = fs.existsSync(manPath) ? JSON.parse(fs.readFileSync(manPath, 'utf8')) : null
    const mod = read(modPath)
    const html = read(htmlPath)
    const secs = man?.sections || []
    const docs = man?.documents || []
    rows.push({
      subjectId: s.id,
      subjectTitle: s.title || s.name,
      topicId: t.id,
      vueModule: t.vueModule,
      title: t.title || man?.title || t.id,
      language: man?.language || null,
      sections: secs.map((x) => ({ id: x.id, title: x.title, role: x.role || null, desc: x.desc || '' })),
      exerciseKeys: extractExerciseKeys(mod),
      customs: extractCustoms(mod),
      types: extractTypes(mod),
      legacyPanels: extractPanels(html),
      interactions: interactionCounts(html),
      docsCount: docs.length,
      docsNoDrive: docs.filter((d) => !d.driveUrl).length,
      docsMissing: docs.filter((d) => !d.driveUrl).map((d) => d.title),
      theoryLen: (man?.theoryHtml || '').length,
      hasLegacyHtml: fs.existsSync(htmlPath),
      hasModule: fs.existsSync(modPath),
    })
  }
}

const out = path.join(studyHub, 'content-packages/topics/parity-inventory.json')
fs.writeFileSync(out, JSON.stringify(rows, null, 2))
console.log('Wrote', out)
for (const r of rows) {
  console.log(
    `${r.vueModule} | secs=${r.sections.length} ex=[${r.exerciseKeys.join(',')}] customs=[${r.customs.join(',')}] ` +
    `onclick=${r.interactions.onclick} check=${r.interactions.checks} canvas=${r.interactions.canvas} noDrive=${r.docsNoDrive}`,
  )
}
