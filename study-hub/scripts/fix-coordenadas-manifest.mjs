import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const p = path.resolve(__dirname, '../content-packages/topics/projecte/coordenadas/manifest.json')
const man = JSON.parse(fs.readFileSync(p, 'utf8'))

for (const d of man.documents || []) {
  if (!d.localUrl) continue
  // Undo double-encoding: %2520 -> %20, etc.
  d.localUrl = d.localUrl
    .replace(/%2520/g, '%20')
    .replace(/%25C3%25A9/g, '%C3%A9')
    .replace(/%25C3%25A9/gi, '%C3%A9')
}

let html = man.theoryHtml || ''
const rosaStart = html.indexOf('<!-- Rosa dels Vents')
if (rosaStart !== -1) {
  const replacement = `
            <div class="content-card">
                <h3 class="card-title"><span>🧭</span> Rosa dels vents, línies clau i V/F</h3>
                <p class="card-subtitle">La interactivitat (TTS + Veritat/Fals amb explicacions) està als laboratoris Vue just a sota d'aquesta teoria.</p>
                <div style="margin-top:1rem;text-align:center;">
                  <img src="img/rosa_dels_vents.png" alt="Rosa dels Vents" style="max-width:170px;height:auto;">
                </div>
            </div>
`
  html = html.slice(0, rosaStart) + replacement
  man.theoryHtml = html
}

fs.writeFileSync(p, JSON.stringify(man, null, 2))
console.log('OK theoryHtml=', html.length, 'docs=', man.documents.map((d) => d.localUrl))
