import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')
const topics = [
  'mates/romanos',
  'mates/posat_a_prova_1',
  'projecte/pasdeltemps',
  'catala/posat_a_prova_1',
]

let fail = 0
for (const t of topics) {
  const h = fs.readFileSync(path.join(root, t, 'Apuntes.html'), 'utf8')
  const icons = [...h.matchAll(/class="sidebar-tab-btn[^"]*"[\s\S]*?<span>([^<]+)<\/span>\s*<span>/g)]
    .map((m) => m[1].trim())
  const man = JSON.parse(
    fs.readFileSync(path.join(__dirname, `../content-packages/topics/${t}/manifest.json`), 'utf8'),
  )
  const vue = (man.sections || []).map((s) => s.icon)
  const match = icons.join('|') === vue.join('|')
  console.log(t, match ? 'MATCH' : 'DIFF', { legacy: icons, vue })
  if (!match) fail++
}
process.exit(fail ? 1 : 0)
