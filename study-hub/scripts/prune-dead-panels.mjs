import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../content-packages/topics')

const shellTargets = {
  'mates/operaciones/panels/view-sprint.html': {
    title: '⚡ Sprint mental',
    body: '2 minutos de cálculo mental. El entrenador interactivo está debajo.',
  },
  'mates/operaciones/panels/view-multiplication.html': {
    title: '✖️ Multiplicación',
    body: 'Practica con la pizarra de multiplicación de abajo.',
  },
  'mates/operaciones/panels/view-division.html': {
    title: '➗ División con prueba',
    body: 'Recuerda: D = d × q + r. Completa los huecos debajo.',
  },
  'mates/operaciones/panels/view-worksheet.html': {
    title: '🧾 Ficha de operaciones',
    body: 'Multiplicaciones y divisiones de clase. Ejercicios debajo.',
  },
  'mates/operaciones/panels/view-parentheses.html': {
    title: '﹙﹚ Paréntesis',
    body: 'Primero el paréntesis. Practica debajo.',
  },
  'mates/operaciones/panels/view-problems.html': {
    title: '🧩 Problemas razonados',
    body: 'Lee con atención y responde en los ejercicios de abajo.',
  },
  'mates/romanos/panels/tab-siglos.html': {
    title: '📅 Siglos & reloj romano',
    body: 'Calcula siglos y lee la hora en la esfera romana. Labs debajo.',
  },
  'mates/romanos/panels/tab-print.html': {
    title: '🖨️ Ficha imprimible A4',
    body: 'Genera una ficha nueva, practícala e imprime con Ctrl+P si quieres.',
  },
  'mates/romanos/panels/tab-practica.html': {
    title: '✍️ Práctica romana',
    body: 'Conversiones decimal ↔ romano. Ejercicios debajo.',
  },
  'mates/romanos/panels/tab-conversor.html': {
    title: '🔄 Conversor mágico',
    body: 'Convierte cifras en ambos sentidos con el conversor de abajo.',
  },
  'mates/romanos/panels/tab-detective.html': {
    title: '🕵️ Detective de errores',
    body: 'Formas correctas o errores típicos generados al azar. Laboratorio debajo.',
  },
  'projecte/pasdeltemps/panels/tab-segles.html': {
    title: '📅 Anys, segles i cronologia',
    body: 'Calculadora + reixeta oficial de segles. Exercicis a sota.',
  },
  'projecte/pasdeltemps/panels/tab-peninsula.html': {
    title: '🗺️ Història de la Península',
    body: 'Quiz de 8 preguntes + crono-repte de 6 fets. Tot interactiu a sota.',
  },
  'projecte/pasdeltemps/panels/tab-romans.html': {
    title: '🏛️ Nombres romans',
    body: 'Conversor màgic + taller oficial (23 reptes). Activitats Vue a sota.',
  },
  'projecte/pasdeltemps/panels/tab-edats-h5p.html': {
    title: '⏳ Les 5 edats de la història',
    body: 'Classifica les 18 targetes H5P, ordena etapes i repàs V/F a sota.',
  },
  'projecte/coordenadas/panels/panel-mapa-punts.html': {
    title: '📍 Mapa & Generador Dinàmic',
    body: 'Generador aleatori, fitxa A–E, continents/oceans i esfera. Laboratori complet a sota.',
  },
  'projecte/coordenadas/panels/panel-radar.html': {
    title: '📡 Radar Pokémon — Team Rocket',
    body: 'Selecciona el Pokémon i escriu latitud, longitud (±6°) i ubicació. Formulari a sota (el clic només selecciona).',
  },
  'projecte/coordenadas/panels/panel-llegendaris.html': {
    title: '⭐ Constel·lació Pikachu (23 punts)',
    body: 'Traça els 23 punts al canvas amb snap de 10°. Laboratori a sota.',
  },
  'projecte/coordenadas/panels/panel-test.html': {
    title: '🧪 Test oficial (20 preguntes)',
    body: 'Banc oficial d’examen. Respon les 20 preguntes a sota.',
  },
  'projecte/coordenadas/panels/panel-teoria.html': {
    title: '🌍 Teoria de coordenades',
    body: 'Paral·lels, meridians i conceptes. Rosa dels vents (TTS) i V/F interactius a sota.',
  },
  'curie/wordslist/panels/panel-quiz.html': {
    title: '🧪 Lab quiz',
    body: '12 key questions about tools, verbs, areas and jobs. Interactive quiz below.',
  },
  'curie/wordslist/panels/panel-memory.html': {
    title: '🧠 Memory pairs',
    body: 'Match lab words with meanings. Game below.',
  },
  'curie/wordslist/panels/panel-spelling.html': {
    title: '✍️ Spelling challenge',
    body: 'Type the lab terms carefully. Blanks below.',
  },
  'curie/wordslist/panels/panel-sorter.html': {
    title: '⚡ Category sorter',
    body: '90-second timed classifier for all 35 lab words. Lab below.',
  },
  'castellano/tema2/panels/tab-verbo.html': {
    title: '📚 Formas no personales del verbo',
    body: 'Infinitivo, gerundio y participio. Practica debajo.',
  },
  'castellano/tema2/panels/tab-acentuacion.html': {
    title: '✍️ Acentuación',
    body: 'Agudas, llanas y esdrújulas. Clasifica y responde debajo.',
  },
  'castellano/tema2/panels/tab-vocabulario.html': {
    title: '🔤 Vocabulario',
    body: 'Tecnicismos y parónimas. Ejercicios debajo.',
  },
  'castellano/tema2/panels/tab-taller.html': {
    title: '🛠️ Taller',
    body: 'Práctica mixta del tema. Actividades debajo.',
  },
  'castellano/tema2/panels/tab-quiz.html': {
    title: '🏆 Quiz',
    body: 'Autoevaluación del Tema 2. Quiz debajo.',
  },
  'catala/tema2/panels/tab-polisemia.html': {
    title: '🔀 Polisèmia',
    body: 'Una paraula, diversos sentits. Practica a sota.',
  },
  'catala/tema2/panels/tab-accentuacio.html': {
    title: '✍️ Accentuació',
    body: 'Agudes, planes i esdrúixoles. Classifica a sota.',
  },
  'catala/tema2/panels/tab-adjectiu.html': {
    title: '🧩 Adjectius',
    body: 'Concordança de gènere i nombre. Exercicis a sota.',
  },
  'catala/tema2/panels/tab-quiz.html': {
    title: '🏆 Autoavaluació',
    body: '10 preguntes del tema. Quiz a sota.',
  },
  'catala/tema2/panels/tab-mail.html': {
    title: '📧 Correu electrònic',
    body: 'Simulador de mail + protocol. Completa l’exercici a sota.',
  },
  'catala/sant_baldiri/panels/tab-sinonims.html': {
    title: '🔁 Sinònims',
    body: 'Emparella sinònims, prefixos, antònims i sinònims en context. Exercicis a sota.',
  },
  'mates/posat_a_prova_1/panels/tab-pro.html': {
    title: '🚀 Nivell Pro',
    body: 'Reptes avançats EMAT. Exercicis tipats a sota.',
  },
  'mates/posat_a_prova_1/panels/tab-generator.html': {
    title: '♾️ Entrenador infinit',
    body: 'Sprint mental i ronda mixta. A sota.',
  },
  'catala/posat_a_prova_1/panels/tab-pro.html': {
    title: '🚀 Nivell Pro',
    body: 'Morfologia, antònims i comprensió. Exercicis a sota.',
  },
  'catala/posat_a_prova_1/panels/tab-generator.html': {
    title: '♾️ Entrenador',
    body: 'Rondes ràpides de repàs. A sota.',
  },
}

/** Keep narrative text; drop dead interactive exercise boxes. */
const stripExerciseBoxes = [
  'castellano/tema2/panels/tab-lectura.html',
  'catala/tema2/panels/tab-lectura.html',
  'catala/sant_baldiri/panels/tab-lectura.html',
]

function htmlFor({ title, body }) {
  return `<div class="section-header">
                <div>
                    <h2 class="section-title">${title}</h2>
                    <p class="section-subtitle">${body}</p>
                </div>
            </div>
`
}

function stripBoxes(html) {
  // Remove exercise-box blocks and trailing dead quiz UI; keep story/header.
  let out = html.replace(/<div class="exercise-box"[\s\S]*?(?=<div class="exercise-box"|$)/gi, '')
  out = out.replace(/<div class="exercise-box"[\s\S]*?<\/div>\s*(?=<div class="|$)/gi, '')
  // Fallback: cut from first exercise-box / exercise-question-card to end of card content
  const cutMarkers = [
    '<!-- Activitat',
    '<!-- Actividad',
    'class="exercise-box"',
    'id="q-lectura',
    'Comprensión lectora interactiva',
    'Comprensió Lectora Interactiva',
  ]
  for (const marker of cutMarkers) {
    const idx = out.indexOf(marker)
    if (idx > 0) {
      // Find closing of outer content-card roughly: keep text, append note
      const before = out.slice(0, idx).trimEnd()
      out = `${before}
                    <p class="section-subtitle" style="margin-top:1rem;">Les preguntes interactives són a sota / Las preguntas interactivas están debajo.</p>
                </div>
`
      break
    }
  }
  return out
}

let pruned = 0
let stripped = 0
let missing = 0

for (const [rel, meta] of Object.entries(shellTargets)) {
  const file = path.join(root, rel)
  if (!fs.existsSync(file)) {
    console.warn('missing', rel)
    missing += 1
    continue
  }
  fs.writeFileSync(file, htmlFor(meta), 'utf8')
  pruned += 1
}

for (const rel of stripExerciseBoxes) {
  const file = path.join(root, rel)
  if (!fs.existsSync(file)) {
    console.warn('missing', rel)
    missing += 1
    continue
  }
  const raw = fs.readFileSync(file, 'utf8')
  const next = stripBoxes(raw)
  fs.writeFileSync(file, next, 'utf8')
  stripped += 1
}

console.log(`pruned ${pruned} shells, stripped ${stripped} lectura panels, missing ${missing}`)
