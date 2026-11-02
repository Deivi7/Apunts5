import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const topicsRoot = path.resolve(__dirname, '../content-packages/topics')

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else acc.push(p)
  }
  return acc
}

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function basenameUrl(u) {
  try {
    return decodeURIComponent(String(u).split('/').pop().split('?')[0])
  } catch {
    return String(u).split('/').pop()
  }
}

function extractPairs(html) {
  const pairs = []
  const reLocalDrive =
    /href="([^"]+\.pdf[^"]*)"[\s\S]{0,1200}?href="(https:\/\/drive\.google\.com[^"]+)"/gi
  const reDriveLocal =
    /href="(https:\/\/drive\.google\.com[^"]+)"[\s\S]{0,1200}?href="([^"]+\.pdf[^"]*)"/gi
  let m
  while ((m = reLocalDrive.exec(html))) pairs.push({ local: m[1], drive: m[2] })
  while ((m = reDriveLocal.exec(html))) pairs.push({ local: m[2], drive: m[1] })

  // doc-shelf style: title then Local + Drive buttons
  const shelf =
    /<(?:h4|strong|span)[^>]*>([^<]{4,140})<\/(?:h4|strong|span)>[\s\S]{0,600}?href="(https:\/\/drive\.google\.com[^"]+)"/gi
  while ((m = shelf.exec(html))) {
    pairs.push({ title: m[1].replace(/\s+/g, ' ').trim(), drive: m[2] })
  }
  return pairs
}

const filled = []
const still = []

for (const manPath of walk(topicsRoot).filter((p) => p.endsWith('manifest.json'))) {
  const dir = path.dirname(manPath)
  const key = path.relative(topicsRoot, dir).replace(/\\/g, '/')
  const man = JSON.parse(fs.readFileSync(manPath, 'utf8'))
  if (!man.documents?.length) continue

  const html = walk(dir)
    .filter((p) => p.endsWith('.html'))
    .map((p) => fs.readFileSync(p, 'utf8'))
    .join('\n')
  const pairs = extractPairs(html)

  let changed = false
  for (const d of man.documents) {
    if (d.driveUrl) continue
    const base = norm(basenameUrl(d.localUrl || d.title))
    const titleN = norm(d.title)
    let found = null
    for (const p of pairs) {
      const pb = norm(basenameUrl(p.local || ''))
      const pt = norm(p.title || '')
      if (pb && (pb === base || base.includes(pb) || pb.includes(base))) {
        found = p.drive
        break
      }
      if (pt && (pt === titleN || titleN.includes(pt) || pt.includes(titleN))) {
        found = p.drive
        break
      }
    }
    if (found) {
      d.driveUrl = found
      changed = true
      filled.push({ key, title: d.title, drive: found })
    } else {
      still.push({ key, title: d.title })
    }
  }
  if (changed) fs.writeFileSync(manPath, JSON.stringify(man, null, 2))
}

console.log('Filled', filled.length)
for (const x of filled) console.log(' +', x.key, '|', x.title)
console.log('Still missing', still.length)
for (const x of still) console.log(' -', x.key, '|', x.title)
