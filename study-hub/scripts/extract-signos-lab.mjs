import fs from 'node:fs'

const h = fs.readFileSync(
  new URL('../../castellano/signo_puntuacion/Apuntes.html', import.meta.url),
  'utf8',
)

function extract(name) {
  const re = new RegExp(`const ${name} = (\\[[\\s\\S]*?\\]);`)
  const m = h.match(re)
  if (!m) throw new Error(`no ${name}`)
  return m[1]
}

const out = `export const WORKSHOP_SENTENCES = ${extract('WORKSHOP_SENTENCES')}

export const SORTER_CASES = ${extract('SORTER_CASES')}

export const ALPHA_LEVELS = ${extract('ALPHA_LEVELS')}
`

const dest = new URL('../frontend/src/modules/castellano/signosLabData.js', import.meta.url)
fs.writeFileSync(dest, out)
console.log('wrote', dest.pathname)