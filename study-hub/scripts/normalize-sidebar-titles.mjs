import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const topicsRoot = path.resolve(__dirname, '../content-packages/topics')
const emojiOnly = /^(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*)$/u

let fixed = 0
for (const subject of fs.readdirSync(topicsRoot)) {
  const sDir = path.join(topicsRoot, subject)
  if (!fs.statSync(sDir).isDirectory()) continue
  for (const topic of fs.readdirSync(sDir)) {
    const manPath = path.join(sDir, topic, 'manifest.json')
    if (!fs.existsSync(manPath)) continue
    const man = JSON.parse(fs.readFileSync(manPath, 'utf8'))
    let changed = false
    for (const sec of man.sections || []) {
      if (emojiOnly.test(String(sec.title || '').trim()) && sec.desc) {
        const icon = sec.icon || sec.title.trim()
        const title = String(sec.desc).trim()
        sec.icon = icon
        sec.title = title
        // Extraer badge si el desc era solo el título; limpiar desc corta genérica
        sec.desc = ''
        changed = true
      }
    }
    if (changed) {
      fs.writeFileSync(manPath, `${JSON.stringify(man, null, 2)}\n`)
      fixed++
      console.log('normalized', `${subject}/${topic}`)
    }
  }
}
console.log('fixed', fixed)
