import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const studyHub = path.resolve(__dirname, '..')
const repoRoot = path.resolve(studyHub, '..')
const subjects = JSON.parse(
  fs.readFileSync(path.join(studyHub, 'content-packages/catalog/subjects.json'), 'utf8'),
)

/**
 * Extract sidebar icons from legacy Apuntes.html:
 * <span class="sidebar-btn-icon">🚀</span> ... switchSidebarTab('radar'
 * or onclick with tab id nearby.
 */
function extractIcons(html) {
  const map = {}
  // Pattern: sidebar-btn-icon emoji then later switchSidebarTab('id'
  const re =
    /sidebar-btn-icon[^>]*>\s*([^<]+?)\s*<\/span>[\s\S]{0,400}?switch(?:Sidebar)?Tab\(\s*['"]([^'"]+)['"]/gi
  let m
  while ((m = re.exec(html))) {
    const icon = m[1].trim()
    const id = m[2].trim()
    if (icon && id) map[id] = icon
  }
  // Also: button onclick first then icon (less common)
  const re2 =
    /switch(?:Sidebar)?Tab\(\s*['"]([^'"]+)['"][\s\S]{0,300}?sidebar-btn-icon[^>]*>\s*([^<]+?)\s*<\/span>/gi
  while ((m = re2.exec(html))) {
    const id = m[1].trim()
    const icon = m[2].trim()
    if (icon && id && !map[id]) map[id] = icon
  }
  // Fallback: title starts with emoji in section buttons
  const re3 =
    /sidebar-btn-title[^>]*>\s*(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*)\s*/gu
  // skip - titles are numbered
  return map
}

const report = {}
for (const s of subjects.subjects || []) {
  for (const t of s.topics || []) {
    if (!t.vueModule) continue
    const htmlPath = path.join(repoRoot, t.vueModule, 'Apuntes.html')
    const manPath = path.join(studyHub, 'content-packages/topics', t.vueModule, 'manifest.json')
    if (!fs.existsSync(manPath)) continue
    const man = JSON.parse(fs.readFileSync(manPath, 'utf8'))
    const html = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf8') : ''
    const icons = html ? extractIcons(html) : {}
    let changed = 0
    for (const sec of man.sections || []) {
      // match by id or panel-id strip
      const candidates = [
        sec.id,
        sec.id.replace(/^(panel-|tab-|view-)/, ''),
        `tab-${sec.id}`,
        `panel-${sec.id}`,
        `view-${sec.id}`,
      ]
      let icon = sec.icon || null
      for (const c of candidates) {
        if (icons[c]) {
          icon = icons[c]
          break
        }
      }
      // Also try fuzzy: icons keys ending with sec.id
      if (!icon) {
        for (const [k, v] of Object.entries(icons)) {
          if (k === sec.id || k.endsWith(sec.id) || sec.id.endsWith(k)) {
            icon = v
            break
          }
        }
      }
      if (icon && sec.icon !== icon) {
        sec.icon = icon
        changed++
      }
    }
    if (changed) {
      fs.writeFileSync(manPath, JSON.stringify(man, null, 2))
    }
    report[t.vueModule] = { icons, sections: (man.sections || []).map((x) => ({ id: x.id, icon: x.icon || null })) }
  }
}

const out = path.join(studyHub, 'content-packages/topics/sidebar-icons-report.json')
fs.writeFileSync(out, JSON.stringify(report, null, 2))
console.log('Wrote', out)
for (const [k, v] of Object.entries(report)) {
  console.log(k, '→', v.sections.map((s) => `${s.id}:${s.icon || '?'}`).join(' | '))
}
