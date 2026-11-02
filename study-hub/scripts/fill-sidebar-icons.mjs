import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const topicsRoot = path.resolve(__dirname, '../content-packages/topics')

function extractFromLegacy(html) {
  const map = {}
  // Pattern A: sidebar-btn-icon
  const reA =
    /sidebar-btn-icon[^>]*>\s*([^<]+?)\s*<\/span>[\s\S]{0,500}?switch(?:Sidebar)?Tab\(\s*['"]([^'"]+)['"]/gi
  let m
  while ((m = reA.exec(html))) map[m[2]] = m[1].trim()

  // Pattern B: sidebar-tab-btn with emoji in first span
  const reB =
    /switchTab\(\s*['"]([^'"]+)['"]\s*\)[\s\S]{0,40}?>[\s\S]{0,120}?<span>\s*([^<]+?)\s*<\/span>/gi
  // Better: button contains switchTab id then emoji span
  const reB2 =
    /onclick="switchTab\('([^']+)'\)"[\s\S]*?<span>([^<]{1,8})<\/span>/gi
  while ((m = reB2.exec(html))) {
    const id = m[1]
    const icon = m[2].trim()
    if (icon && !/^\d/.test(icon) && icon.length <= 4) map[id] = icon
  }

  // Pattern C: icon then title (btn content)
  const reC =
    /<button[^>]*onclick="switchTab\('([^']+)'\)"[^>]*>[\s\S]*?<div class="tab-btn-content">\s*<span>([^<]+)<\/span>/gi
  while ((m = reC.exec(html))) map[m[1]] = m[2].trim()

  void reB
  return map
}

/** Manual fallbacks when HTML structure is odd */
const MANUAL = {
  'mates/romanos': {
    'tab-teoria': '📖',
    'tab-conversor': '🔮',
    'tab-practica': '✍️',
    'tab-detective': '🕵️',
    'tab-siglos': '⏳',
    'tab-coliseo': '⚔️',
    'tab-print': '🖨️',
  },
  'projecte/pasdeltemps': {
    'tab-teoria': '📖',
    'tab-romans': '🏛️',
    'tab-segles': '⏳',
    'tab-edats-h5p': '🏰',
    'tab-peninsula': '🇪🇸',
    'tab-documents': '📁',
  },
  'mates/posat_a_prova_1': {
    'tab-teoria': '📖',
    'tab-examen': '📝',
    'tab-pro': '🚀',
    'tab-generator': '⚡',
  },
  'catala/posat_a_prova_1': {
    'tab-teoria': '📖',
    'tab-examen': '📝',
    'tab-pro': '🚀',
    'tab-generator': '⚡',
  },
  'curie/wordslist': {
    flashcards: '🎴',
    memory: '🧩',
    quiz: '🧪',
    spelling: '✍️',
    sorter: '🎯',
    cheatsheet: '📋',
  },
}

const repoRoot = path.resolve(__dirname, '../..')
const subjects = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../content-packages/catalog/subjects.json'), 'utf8'),
)

for (const s of subjects.subjects || []) {
  for (const t of s.topics || []) {
    if (!t.vueModule) continue
    const manPath = path.join(topicsRoot, t.vueModule, 'manifest.json')
    if (!fs.existsSync(manPath)) continue
    const man = JSON.parse(fs.readFileSync(manPath, 'utf8'))
    const htmlPath = path.join(repoRoot, t.vueModule, 'Apuntes.html')
    const fromHtml = fs.existsSync(htmlPath)
      ? extractFromLegacy(fs.readFileSync(htmlPath, 'utf8'))
      : {}
    const manual = MANUAL[t.vueModule] || {}
    let n = 0
    for (const sec of man.sections || []) {
      const icon = sec.icon || fromHtml[sec.id] || manual[sec.id] || null
      if (icon && sec.icon !== icon) {
        sec.icon = icon
        n++
      } else if (icon && !sec.icon) {
        sec.icon = icon
        n++
      }
    }
    fs.writeFileSync(manPath, JSON.stringify(man, null, 2))
    const list = (man.sections || []).map((x) => `${x.id}:${x.icon || '?'}`).join(' | ')
    console.log(`${t.vueModule} (+${n}) ${list}`)
  }
}
