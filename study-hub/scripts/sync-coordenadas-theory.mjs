import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../content-packages/topics/projecte/coordenadas')
const theoryPath = path.join(root, 'theory.html')
const manPath = path.join(root, 'manifest.json')

const theoryHtml = fs.readFileSync(theoryPath, 'utf8')
const man = JSON.parse(fs.readFileSync(manPath, 'utf8'))
man.theoryHtml = theoryHtml
fs.writeFileSync(manPath, `${JSON.stringify(man, null, 2)}\n`)
console.log('synced theoryHtml length=', theoryHtml.length)
console.log('has VF dead buttons=', /answerTF\(/.test(theoryHtml))
console.log('has speakText=', /speakText\(/.test(theoryHtml))
